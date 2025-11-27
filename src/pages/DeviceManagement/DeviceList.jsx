// src/pages/management/DeviceList.jsx
import { Pencil, Trash, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress,
  FormHelperText,
  Stack,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";
import { fetchAllDevices, updateDevice, deleteDevice } from "../../slices/DeviceSlice";
import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

const DeviceList = ({ onDeviceSelect, selectedDevice }) => {
  const dispatch = useDispatch();
  const { DeviceArray = [], isLoading, error } = useSelector((state) => state.Device || {});
  const { Venues = [] } = useSelector((state) => state.Venue || {});
  const [working, setWorking] = useState(false);

  const isDesktop = useMediaQuery("(min-width:768px)");
  const isMobile = !isDesktop;
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Edit dialog state (now uses temperature, humidity)
  const [editOpen, setEditOpen] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [editForm, setEditForm] = useState({
    deviceId: "",
    venueId: "",
    temperatureOp: ">",
    temperatureVal: "",
    humidityOp: ">",
    humidityVal: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete confirm dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" });

  useEffect(() => {
    dispatch(fetchAllDevices());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Device error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: String(error),
      });
    }
  }, [error]);

  // Delete flow
  const openDeleteConfirm = (id, displayName) => {
    setDeleteTarget({ id, name: displayName });
    setDeleteOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteOpen(false);
    setDeleteTarget({ id: null, name: "" });
  };

  const handleDeleteConfirm = async () => {
    const id = deleteTarget.id;
    setDeleteOpen(false);
    if (!id) return;
    try {
      setWorking(true);
      await dispatch(deleteDevice(id)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Device deleted.",
        timer: 1800,
        showConfirmButton: false,
      });
      dispatch(fetchAllDevices());
      if (isMobile) setDrawerOpen(false);
    } catch (err) {
      console.error("Delete device error:", err);
      Swal.fire({
        icon: "error",
        title: "Delete failed",
        text: err?.toString() || "Delete failed",
      });
    } finally {
      setWorking(false);
      setDeleteTarget({ id: null, name: "" });
    }
  };

  // Helper: safely get condition object by type, also map legacy 'ambient'/'freezer' to 'temperature'
  // const findCondition = (conditionsArray = [], wantedType) => {
  //   if (!Array.isArray(conditionsArray)) return undefined;
  //   // Normalize types to check: if wantedType === 'temperature', accept 'ambient' and 'freezer' too.
  //   if (wantedType === "temperature") {
  //     const byType = conditionsArray.find((c) => ["temperature", "ambient", "freezer"].includes(c.type));
  //     return byType;
  //   }
  //   return conditionsArray.find((c) => c.type === wantedType);
  // };


  // only temperature and humidity
const findCondition = (conditionsArray = [], wantedType) => {
  if (!Array.isArray(conditionsArray)) return undefined;
  return conditionsArray.find((c) => c.type === wantedType);
};


  // Edit flow
  const handleEdit = (device) => {
    const currentDeviceId = device.deviceId || "";
    const currentVenueId = device.venue?._id ?? device.venue ?? "";

    const temperatureCond = findCondition(device.conditions, "temperature") || {};
    const humidityCond = findCondition(device.conditions, "humidity") || {};
   

    setEditingDeviceId(device._id ?? device.id ?? null);
    setEditForm({
      deviceId: currentDeviceId,
      venueId: currentVenueId,
      temperatureOp: temperatureCond.operator ?? "=",
      temperatureVal:
        temperatureCond.value === undefined || temperatureCond.value === null ? "" : String(temperatureCond.value),
      humidityOp: humidityCond.operator ?? "=",
      humidityVal:
        humidityCond.value === undefined || humidityCond.value === null ? "" : String(humidityCond.value),
    });
    setFormErrors({});
    setEditOpen(true);
  };

  const handleEditChange = (field) => (e) => {
    const v = e?.target?.value ?? "";
    setEditForm((s) => ({ ...s, [field]: v }));
    setFormErrors((s) => ({ ...s, [field]: undefined }));
  };

  const handleEditCancel = () => {
    setEditOpen(false);
    setFormErrors({});
    setEditingDeviceId(null);
  };

  const handleEditSave = async () => {
    const {
      deviceId,
      venueId,
      temperatureOp,
      temperatureVal,
      humidityOp,
      humidityVal,
    } = editForm;

    const errors = {};
    if (!deviceId || !deviceId.toString().trim()) errors.deviceId = "Device ID is required";
    if (!venueId) errors.venueId = "Venue is required";

    // Basic local validation
    if (temperatureVal !== "" && Number.isNaN(Number(temperatureVal))) errors.temperatureVal = "Must be a number";
    if (humidityVal !== "" && Number.isNaN(Number(humidityVal))) errors.humidityVal = "Must be a number";
    

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Build conditions following backend shape and validation
    const validOps = [">", "<"];
    const conditionsToSend = [];

    // Temperature
    if (temperatureVal !== "") {
      if (!validOps.includes(temperatureOp)) {
        setFormErrors({ temperatureOp: "Invalid operator" });
        return;
      }
      conditionsToSend.push({
        type: "temperature",
        operator: temperatureOp,
        value: Number(temperatureVal),
      });
    }

    // Humidity
    if (humidityVal !== "") {
      if (!validOps.includes(humidityOp)) {
        setFormErrors({ humidityOp: "Invalid operator" });
        return;
      }
      conditionsToSend.push({
        type: "humidity",
        operator: humidityOp,
        value: Number(humidityVal),
      });
    }


    try {
      setWorking(true);
      await dispatch(
        updateDevice({
          id: editingDeviceId,
          deviceId: deviceId.toString().trim(),
          venueId,
          conditions: conditionsToSend,
        })
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Device updated.",
        timer: 1600,
        showConfirmButton: false,
      });

      setEditOpen(false);
      dispatch(fetchAllDevices());
      if (isMobile) setDrawerOpen(false);
    } catch (err) {
      console.error("Update device error:", err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err?.toString() || "Update failed",
      });
    } finally {
      setWorking(false);
    }
  };

  const displayDevices = DeviceArray || [];

  const renderListMarkup = () => (
    <div className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
      {isDesktop ? (
        <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Venue Management</h1>
      ) : (
          <div className="flex justify-end">
          <IconButton
            onClick={() => {
              setDrawerOpen(!drawerOpen); // guard, then call
            }}
            edge="start"
            aria-label="close-details"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
      <div className="mb-4">
        <h2 className="device-list-header text-center font-semibold text-gray-800">Device List</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 font-bold text-gray-800">Device ID</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
        </table>

        <div className="pr-1 user-table-scroll md:h-[50vh] h-[60vh]">
          <table className="w-full table-auto text-left overflow-y-auto">
            <tbody>
              {isLoading && <TableSkeleton />}

              {!isLoading &&
                displayDevices.map((d, idx) => {
                  const id = d._id ?? idx;
                  const deviceIdDisplay = d.deviceId ?? `Device ${idx + 1}`;

                  return (
                    <tr
                      key={id}
                      className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
                        selectedDevice?._id === id || selectedDevice?.id === id ? "bg-blue-50 border-blue-300" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeviceSelect?.(d);
                        if (isMobile) setDrawerOpen(false);
                      }}
                    >
                      <td className="py-2 sm:py-3 px-2 sm:px-4">{deviceIdDisplay}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleEdit(d)}
                            className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-2 cursor-pointer"
                            disabled={working}
                          >
                            <Pencil className="text-green-600" size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteConfirm(id, deviceIdDisplay)}
                            className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-2 cursor-pointer"
                            disabled={working}
                          >
                            <Trash className="text-red-600" size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {!isLoading && displayDevices.length === 0 && <tr><td className="p-4 text-center text-gray-500">No devices found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isDesktop ? (
        renderListMarkup()
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="device-list-title font-semibold text-gray-800">Device Management</h1>
            <IconButton size="small" onClick={() => setDrawerOpen(true)}>
              <Menu size={20} />
            </IconButton>
          </div>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{ style: { width: "100%" } }}
          >
            <div className="p-4">{renderListMarkup()}</div>
          </Drawer>
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditCancel} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Device</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} alignItems="center" justifyContent="center">
            <FormControl sx={{ width: "83%" }} error={!!formErrors.deviceId}>
              <TextField
                label="Device ID"
                value={editForm.deviceId}
                fullWidth
                error={!!formErrors.deviceId}
                helperText={formErrors.deviceId}
                onChange={(e) => setEditForm({ ...editForm, deviceId: e.target.value })}
                size="small"
              />
            </FormControl>

            <FormControl sx={{ width: "83%" }} error={!!formErrors.venueId}>
              <InputLabel id="venue-select-label">Venue</InputLabel>
              <Select
                labelId="venue-select-label"
                label="Venue"
                value={editForm.venueId}
                onChange={handleEditChange("venueId")}
                fullWidth
                sx={{ minWidth: 0 }}
                size="small"
              >
                <MenuItem value="">Select venue</MenuItem>
                {Venues.map((v) => (
                  <MenuItem key={v._id ?? v.id} value={v._id ?? v.id}>
                    {v.name ?? v._id ?? v.id}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
            </FormControl>

            {/* Temperature row */}
            <Grid container spacing={1} alignItems="center" sx={{ width: "83%" }}>
              <Grid item xs="auto" sm={3}>
                <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
                  <InputLabel id="temp-op-label">Op</InputLabel>
                  <Select
                    labelId="temp-op-label"
                    value={editForm.temperatureOp}
                    label="Op"
                    onChange={handleEditChange("temperatureOp")}
                    sx={{ width: "100%" }}
                    size="small"
                  >
                    <MenuItem value=">">&gt;</MenuItem>
                    <MenuItem value="<">&lt;</MenuItem>
               
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs>
                <TextField
                  label="Temperature"
                  type="number"
                  inputProps={{ step: 0.1 }}
                  value={editForm.temperatureVal}
                  onChange={handleEditChange("temperatureVal")}
                  fullWidth
                  error={!!formErrors.temperatureVal}
                  helperText={formErrors.temperatureVal}
                  size="small"
                  sx={{
                    maxWidth: { xs: 120, sm: "100%" },
                    "& .MuiInputBase-root": { height: 36 },
                  }}
                />
              </Grid>
            </Grid>

            {/* Humidity row */}
            <Grid container spacing={1} alignItems="center" sx={{ mt: 1, width: "83%" }}>
              <Grid item xs="auto" sm={3}>
                <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
                  <InputLabel id="hum-op-label">Op</InputLabel>
                  <Select
                    labelId="hum-op-label"
                    value={editForm.humidityOp}
                    label="Op"
                    onChange={handleEditChange("humidityOp")}
                    sx={{ width: "100%" }}
                    size="small"
                  >
                    <MenuItem value=">">&gt;</MenuItem>
                    <MenuItem value="<">&lt;</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs>
                <TextField
                  label="Humidity (%)"
                  type="number"
                  inputProps={{ step: 0.1 }}
                  value={editForm.humidityVal}
                  onChange={handleEditChange("humidityVal")}
                  fullWidth
                  error={!!formErrors.humidityVal}
                  helperText={formErrors.humidityVal}
                  size="small"
                  sx={{
                    maxWidth: { xs: 120, sm: "100%" },
                    "& .MuiInputBase-root": { height: 36 },
                  }}
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleEditCancel} disabled={working}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete {deleteTarget.name ? `"${deleteTarget.name}"` : "device"}?</DialogTitle>
        <DialogContent dividers>This action cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={working}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeviceList;

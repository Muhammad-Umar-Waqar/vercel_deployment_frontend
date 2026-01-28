// // src/pages/management/DeviceList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   CircularProgress,
//   FormHelperText,
//   Stack,
//   IconButton,
//   Drawer,
//   useMediaQuery,
// } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import Swal from "sweetalert2";
// import { fetchAllDevices, updateDevice, deleteDevice } from "../../slices/DeviceSlice";
// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";

// const DeviceList = ({ onDeviceSelect, selectedDevice }) => {
//   const dispatch = useDispatch();
//   const { DeviceArray = [], isLoading, error } = useSelector((state) => state.Device || {});
//   const { Venues = [] } = useSelector((state) => state.Venue || {});
//   const [working, setWorking] = useState(false);

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Edit dialog state (now uses temperature, humidity)
//   const [editOpen, setEditOpen] = useState(false);
//   const [editingDeviceId, setEditingDeviceId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     deviceId: "",
//     venueId: "",
//     temperatureOp: ">",
//     temperatureVal: "",
//     humidityOp: ">",
//     humidityVal: "",
//   });
//   const [formErrors, setFormErrors] = useState({});

//   // Delete confirm dialog state
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" });

//   useEffect(() => {
//     dispatch(fetchAllDevices());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       console.error("Device error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: String(error),
//       });
//     }
//   }, [error]);

//   // Delete flow
//   const openDeleteConfirm = (id, displayName) => {
//     setDeleteTarget({ id, name: displayName });
//     setDeleteOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setDeleteOpen(false);
//     setDeleteTarget({ id: null, name: "" });
//   };

//   const handleDeleteConfirm = async () => {
//     const id = deleteTarget.id;
//     setDeleteOpen(false);
//     if (!id) return;
//     try {
//       setWorking(true);
//       await dispatch(deleteDevice(id)).unwrap();
//       Swal.fire({
//         icon: "success",
//         title: "Deleted",
//         text: "Device deleted.",
//         timer: 1800,
//         showConfirmButton: false,
//       });
//       dispatch(fetchAllDevices());
//       if (isMobile) setDrawerOpen(false);
//     } catch (err) {
//       console.error("Delete device error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Delete failed",
//         text: err?.toString() || "Delete failed",
//       });
//     } finally {
//       setWorking(false);
//       setDeleteTarget({ id: null, name: "" });
//     }
//   };

//   // Helper: safely get condition object by type, also map legacy 'ambient'/'freezer' to 'temperature'
//   // const findCondition = (conditionsArray = [], wantedType) => {
//   //   if (!Array.isArray(conditionsArray)) return undefined;
//   //   // Normalize types to check: if wantedType === 'temperature', accept 'ambient' and 'freezer' too.
//   //   if (wantedType === "temperature") {
//   //     const byType = conditionsArray.find((c) => ["temperature", "ambient", "freezer"].includes(c.type));
//   //     return byType;
//   //   }
//   //   return conditionsArray.find((c) => c.type === wantedType);
//   // };


//   // only temperature and humidity
// const findCondition = (conditionsArray = [], wantedType) => {
//   if (!Array.isArray(conditionsArray)) return undefined;
//   return conditionsArray.find((c) => c.type === wantedType);
// };


//   // Edit flow
//   const handleEdit = (device) => {
//     console.log("device", device);
    
//     const currentDeviceId = device.deviceId || "";
//     const currentVenueId = device.venue?._id ?? device.venue ?? "";

//     const temperatureCond = findCondition(device.conditions, "temperature") || {};
//     const humidityCond = findCondition(device.conditions, "humidity") || {};
   
    
//     setEditingDeviceId(device._id ?? device.id ?? null);
//     setEditForm({
//       deviceId: currentDeviceId,
//       venueId: currentVenueId,
//       temperatureOp: temperatureCond.operator ?? "=",
//       temperatureVal:
//         temperatureCond.value === undefined || temperatureCond.value === null ? "" : String(temperatureCond.value),
//       humidityOp: humidityCond.operator ?? "=",
//       humidityVal:
//         humidityCond.value === undefined || humidityCond.value === null ? "" : String(humidityCond.value),
//     });
//     setFormErrors({});
//     setEditOpen(true);
//   };

//   const handleEditChange = (field) => (e) => {
//     const v = e?.target?.value ?? "";
//     setEditForm((s) => ({ ...s, [field]: v }));
//     setFormErrors((s) => ({ ...s, [field]: undefined }));
//   };

//   const handleEditCancel = () => {
//     setEditOpen(false);
//     setFormErrors({});
//     setEditingDeviceId(null);
//   };

//   const handleEditSave = async () => {
//     const {
//       deviceId,
//       venueId,
//       temperatureOp,
//       temperatureVal,
//       humidityOp,
//       humidityVal,
//     } = editForm;

//     const errors = {};
//     if (!deviceId || !deviceId.toString().trim()) errors.deviceId = "Device ID is required";
//     if (!venueId) errors.venueId = "Venue is required";

//     // Basic local validation
//     if (temperatureVal !== "" && Number.isNaN(Number(temperatureVal))) errors.temperatureVal = "Must be a number";
//     if (humidityVal !== "" && Number.isNaN(Number(humidityVal))) errors.humidityVal = "Must be a number";
    

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     // Build conditions following backend shape and validation
//     const validOps = [">", "<"];
//     const conditionsToSend = [];

//     // Temperature
//     if (temperatureVal !== "") {
//       if (!validOps.includes(temperatureOp)) {
//         setFormErrors({ temperatureOp: "Invalid operator" });
//         return;
//       }
//       conditionsToSend.push({
//         type: "temperature",
//         operator: temperatureOp,
//         value: Number(temperatureVal),
//       });
//     }

//     // Humidity
//     if (humidityVal !== "") {
//       if (!validOps.includes(humidityOp)) {
//         setFormErrors({ humidityOp: "Invalid operator" });
//         return;
//       }
//       conditionsToSend.push({
//         type: "humidity",
//         operator: humidityOp,
//         value: Number(humidityVal),
//       });
//     }


//     try {
//       setWorking(true);
//       await dispatch(
//         updateDevice({
//           id: editingDeviceId,
//           deviceId: deviceId.toString().trim(),
//           venueId,
//           conditions: conditionsToSend,
//         })
//       ).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Saved",
//         text: "Device updated.",
//         timer: 1600,
//         showConfirmButton: false,
//       });

//       setEditOpen(false);
//       dispatch(fetchAllDevices());
//       if (isMobile) setDrawerOpen(false);
//     } catch (err) {
//       console.error("Update device error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Update failed",
//         text: err?.toString() || "Update failed",
//       });
//     } finally {
//       setWorking(false);
//     }
//   };

//   const displayDevices = DeviceArray || [];

//   const renderListMarkup = () => (
//     <div className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
//       {isDesktop ? (
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Device Management</h1>
//       ) : (
//           <div className="flex justify-end">
//           <IconButton
//             onClick={() => {
//               setDrawerOpen(!drawerOpen); // guard, then call
//             }}
//             edge="start"
//             aria-label="close-details"
//             size="small"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}
//       <div className="mb-4">
//         <h2 className="device-list-header text-center font-semibold text-gray-800">Device List</h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 font-bold text-gray-800">Device ID</th>
//               <th className="py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="pr-1 user-table-scroll md:h-[50vh] h-[60vh]">
//           <table className="w-full table-auto text-left overflow-y-auto">
//             <tbody>
//               {isLoading && <TableSkeleton />}

//               {!isLoading &&
//                 displayDevices.map((d, idx) => {
//                   const id = d._id ?? idx;
//                   const deviceIdDisplay = d.deviceId ?? `Device ${idx + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedDevice?._id === id || selectedDevice?.id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onDeviceSelect?.(d);
//                         if (isMobile) setDrawerOpen(false);
//                       }}
//                     >
//                       <td className="py-2 sm:py-3 px-2 sm:px-4">{deviceIdDisplay}</td>
//                       <td className="py-2 sm:py-3 px-2 sm:px-4">
//                         <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                           <button
//                             onClick={() => handleEdit(d)}
//                             className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-2 cursor-pointer"
//                             disabled={working}
//                           >
//                             <Pencil className="text-green-600" size={16} />
//                           </button>
//                           <button
//                             onClick={() => openDeleteConfirm(id, deviceIdDisplay)}
//                             className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-2 cursor-pointer"
//                             disabled={working}
//                           >
//                             <Trash className="text-red-600" size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading && displayDevices.length === 0 && <tr><td className="p-4 text-center text-gray-500">No devices found.</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="device-list-title font-semibold text-gray-800">Device Management</h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             PaperProps={{ style: { width: "100%" } }}
//           >
//             <div className="p-4">{renderListMarkup()}</div>
//           </Drawer>
//         </>
//       )}

//       {/* Edit Dialog */}
//       <Dialog open={editOpen} onClose={handleEditCancel} maxWidth="xs" fullWidth>
//         <DialogTitle>Edit Device</DialogTitle>
//         <DialogContent dividers>
//           <Stack spacing={2} alignItems="center" justifyContent="center">
//             <FormControl sx={{ width: "83%" }} error={!!formErrors.deviceId}>
//               <TextField
//                 label="Device ID"
//                 value={editForm.deviceId}
//                 fullWidth
//                 error={!!formErrors.deviceId}
//                 helperText={formErrors.deviceId}
//                 onChange={(e) => setEditForm({ ...editForm, deviceId: e.target.value })}
//                 size="small"
//               />
//             </FormControl>

//             <FormControl sx={{ width: "83%" }} error={!!formErrors.venueId}>
//               <InputLabel id="venue-select-label">Venue</InputLabel>
//               <Select
//                 labelId="venue-select-label"
//                 label="Venue"
//                 value={editForm.venueId}
//                 onChange={handleEditChange("venueId")}
//                 fullWidth
//                 sx={{ minWidth: 0 }}
//                 size="small"
//               >
//                 <MenuItem value="">Select venue</MenuItem>
//                 {Venues.map((v) => (
//                   <MenuItem key={v._id ?? v.id} value={v._id ?? v.id}>
//                     {v.name ?? v._id ?? v.id}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
//             </FormControl>

//             {/* Temperature row */}
//             <Grid container spacing={1} alignItems="center" sx={{ width: "83%" }}>
//               <Grid item xs="auto" sm={3}>
//                 <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
//                   <InputLabel id="temp-op-label">Op</InputLabel>
//                   <Select
//                     labelId="temp-op-label"
//                     value={editForm.temperatureOp}
//                     label="Op"
//                     onChange={handleEditChange("temperatureOp")}
//                     sx={{ width: "100%" }}
//                     size="small"
//                   >
//                     <MenuItem value=">">&gt;</MenuItem>
//                     <MenuItem value="<">&lt;</MenuItem>
               
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs>
//                 <TextField
//                   label="Temperature"
//                   type="number"
//                   inputProps={{ step: 0.1 }}
//                   value={editForm.temperatureVal}
//                   onChange={handleEditChange("temperatureVal")}
//                   fullWidth
//                   error={!!formErrors.temperatureVal}
//                   helperText={formErrors.temperatureVal}
//                   size="small"
//                   sx={{
//                     maxWidth: { xs: 120, sm: "100%" },
//                     "& .MuiInputBase-root": { height: 36 },
//                   }}
//                 />
//               </Grid>
//             </Grid>

//             {/* Humidity row */}
//             <Grid container spacing={1} alignItems="center" sx={{ mt: 1, width: "83%" }}>
//               <Grid item xs="auto" sm={3}>
//                 <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
//                   <InputLabel id="hum-op-label">Op</InputLabel>
//                   <Select
//                     labelId="hum-op-label"
//                     value={editForm.humidityOp}
//                     label="Op"
//                     onChange={handleEditChange("humidityOp")}
//                     sx={{ width: "100%" }}
//                     size="small"
//                   >
//                     <MenuItem value=">">&gt;</MenuItem>
//                     <MenuItem value="<">&lt;</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs>
//                 <TextField
//                   label="Humidity (%)"
//                   type="number"
//                   inputProps={{ step: 0.1 }}
//                   value={editForm.humidityVal}
//                   onChange={handleEditChange("humidityVal")}
//                   fullWidth
//                   error={!!formErrors.humidityVal}
//                   helperText={formErrors.humidityVal}
//                   size="small"
//                   sx={{
//                     maxWidth: { xs: 120, sm: "100%" },
//                     "& .MuiInputBase-root": { height: 36 },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Stack>
//         </DialogContent>

//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button onClick={handleEditCancel} disabled={working}>Cancel</Button>
//           <Button variant="contained" onClick={handleEditSave} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
//         <DialogTitle>Delete {deleteTarget.name ? `"${deleteTarget.name}"` : "device"}?</DialogTitle>
//         <DialogContent dividers>This action cannot be undone.</DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteCancel} disabled={working}>Cancel</Button>
//           <Button variant="contained" color="error" onClick={handleDeleteConfirm} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>
//             Yes, delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default DeviceList;



// // src/pages/management/DeviceList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   CircularProgress,
//   FormHelperText,
//   Stack,
//   IconButton,
//   Drawer,
//   useMediaQuery,
// } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import Swal from "sweetalert2";
// import { fetchAllDevices, updateDevice, deleteDevice } from "../../slices/DeviceSlice";
// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// // add these imports
// import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
// import { fetchVenuesByOrganization } from "../../slices/VenueSlice";



// const DeviceList = ({ onDeviceSelect, selectedDevice }) => {
//   const dispatch = useDispatch();
//   const { DeviceArray = [], isLoading, error } = useSelector((state) => state.Device || {});
//   const { Venues = [] } = useSelector((state) => state.Venue || {});

//     // new: organizations + venuesByOrg (cached)
//   const { Organizations = [], isLoading: orgsLoading } = useSelector((s) => s.Organization || {});
//   const { venuesByOrg = {}, loading: venueLoading, error: venueError } = useSelector((s) => s.Venue || {});


//   const [working, setWorking] = useState(false);

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Edit dialog state (now uses temperature, humidity)
//   const [editOpen, setEditOpen] = useState(false);
//   const [editingDeviceId, setEditingDeviceId] = useState(null);
//   // const [editForm, setEditForm] = useState({
//   //   deviceId: "",
//   //   venueId: "",
//   //   temperatureOp: ">",
//   //   temperatureVal: "",
//   //   humidityOp: ">",
//   //   humidityVal: "",
//   // });
//     const [editForm, setEditForm] = useState({
//     deviceId: "",
//     organization: "", // <-- added
//     venueId: "",
//     temperatureOp: ">",
//     temperatureVal: "",
//     humidityOp: ">",
//     humidityVal: "",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   // Delete confirm dialog state
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" });

//   useEffect(() => {
//     dispatch(fetchAllDevices());
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       console.error("Device error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: String(error),
//       });
//     }
//   }, [error]);

//   // Delete flow
//   const openDeleteConfirm = (id, displayName) => {
//     setDeleteTarget({ id, name: displayName });
//     setDeleteOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setDeleteOpen(false);
//     setDeleteTarget({ id: null, name: "" });
//   };

//   const handleDeleteConfirm = async () => {
//     const id = deleteTarget.id;
//     setDeleteOpen(false);
//     if (!id) return;
//     try {
//       setWorking(true);
//       await dispatch(deleteDevice(id)).unwrap();
//       Swal.fire({
//         icon: "success",
//         title: "Deleted",
//         text: "Device deleted.",
//         timer: 1800,
//         showConfirmButton: false,
//       });
//       dispatch(fetchAllDevices());
//       if (isMobile) setDrawerOpen(false);
//     } catch (err) {
//       console.error("Delete device error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Delete failed",
//         text: err?.toString() || "Delete failed",
//       });
//     } finally {
//       setWorking(false);
//       setDeleteTarget({ id: null, name: "" });
//     }
//   };

//   // Helper: safely get condition object by type, also map legacy 'ambient'/'freezer' to 'temperature'
//   // const findCondition = (conditionsArray = [], wantedType) => {
//   //   if (!Array.isArray(conditionsArray)) return undefined;
//   //   // Normalize types to check: if wantedType === 'temperature', accept 'ambient' and 'freezer' too.
//   //   if (wantedType === "temperature") {
//   //     const byType = conditionsArray.find((c) => ["temperature", "ambient", "freezer"].includes(c.type));
//   //     return byType;
//   //   }
//   //   return conditionsArray.find((c) => c.type === wantedType);
//   // };


//   // only temperature and humidity
// const findCondition = (conditionsArray = [], wantedType) => {
//   if (!Array.isArray(conditionsArray)) return undefined;
//   return conditionsArray.find((c) => c.type === wantedType);
// };


//   // // Edit flow
//   // const handleEdit = (device) => {
//   //   console.log("device", device);
    
//   //   const currentDeviceId = device.deviceId || "";
//   //   const currentVenueId = device.venue?._id ?? device.venue ?? "";

//   //   const temperatureCond = findCondition(device.conditions, "temperature") || {};
//   //   const humidityCond = findCondition(device.conditions, "humidity") || {};
   
    
//   //   setEditingDeviceId(device._id ?? device.id ?? null);
//   //   setEditForm({
//   //     deviceId: currentDeviceId,
//   //     venueId: currentVenueId,
//   //     temperatureOp: temperatureCond.operator ?? "=",
//   //     temperatureVal:
//   //       temperatureCond.value === undefined || temperatureCond.value === null ? "" : String(temperatureCond.value),
//   //     humidityOp: humidityCond.operator ?? "=",
//   //     humidityVal:
//   //       humidityCond.value === undefined || humidityCond.value === null ? "" : String(humidityCond.value),
//   //   });
//   //   setFormErrors({});
//   //   setEditOpen(true);
//   // };

//     const handleEdit = (device) => {
//     console.log("device", device);

//     const currentDeviceId = device.deviceId || "";

//     // device.venue might be an object or id; try to extract venue id & name & org id:
//     const currentVenueObj = device.venue && typeof device.venue === "object" ? device.venue : null;
//     const currentVenueId = currentVenueObj?._id ?? device.venue ?? "";

//     // organization id is nested at device.venue.organization._id in your object
//     const currentOrgId = currentVenueObj?.organization?._id ?? currentVenueObj?.organization ?? "";

//     const temperatureCond = findCondition(device.conditions, "temperature") || {};
//     const humidityCond = findCondition(device.conditions, "humidity") || {};

//     // set edit form and request org's venues (so venue list is available)
//     setEditingDeviceId(device._id ?? device.id ?? null);
//     setEditForm({
//       deviceId: currentDeviceId,
//       organization: currentOrgId,
//       venueId: currentVenueId,
//       temperatureOp: temperatureCond.operator ?? "=",
//       temperatureVal:
//         temperatureCond.value === undefined || temperatureCond.value === null ? "" : String(temperatureCond.value),
//       humidityOp: humidityCond.operator ?? "=",
//       humidityVal:
//         humidityCond.value === undefined || humidityCond.value === null ? "" : String(humidityCond.value),
//     });
//     setFormErrors({});

//     // fetch venues for the organization so the select shows them
//     if (currentOrgId) {
//       dispatch(fetchVenuesByOrganization(currentOrgId));
//     }

//     setEditOpen(true);
//   };


//     const handleEditOrgChange = (e) => {
//     const newOrgId = e.target.value;
//     setEditForm((s) => ({ ...s, organization: newOrgId, venueId: "" }));
//     setFormErrors((s) => ({ ...s, organization: undefined, venueId: undefined }));
//     if (newOrgId) {
//       dispatch(fetchVenuesByOrganization(newOrgId));
//     }
//   };


//   const handleEditChange = (field) => (e) => {
//     const v = e?.target?.value ?? "";
//     setEditForm((s) => ({ ...s, [field]: v }));
//     setFormErrors((s) => ({ ...s, [field]: undefined }));
//   };

//   const handleEditCancel = () => {
//     setEditOpen(false);
//     setFormErrors({});
//     setEditingDeviceId(null);
//   };

//   const handleEditSave = async () => {
//     const {
//       deviceId,
//       venueId,
//       temperatureOp,
//       temperatureVal,
//       humidityOp,
//       humidityVal,
//     } = editForm;

//     const errors = {};
//     if (!deviceId || !deviceId.toString().trim()) errors.deviceId = "Device ID is required";
//     if (!venueId) errors.venueId = "Venue is required";

//     // Basic local validation
//     if (temperatureVal !== "" && Number.isNaN(Number(temperatureVal))) errors.temperatureVal = "Must be a number";
//     if (humidityVal !== "" && Number.isNaN(Number(humidityVal))) errors.humidityVal = "Must be a number";
    

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     // Build conditions following backend shape and validation
//     const validOps = [">", "<"];
//     const conditionsToSend = [];

//     // Temperature
//     if (temperatureVal !== "") {
//       if (!validOps.includes(temperatureOp)) {
//         setFormErrors({ temperatureOp: "Invalid operator" });
//         return;
//       }
//       conditionsToSend.push({
//         type: "temperature",
//         operator: temperatureOp,
//         value: Number(temperatureVal),
//       });
//     }

//     // Humidity
//     if (humidityVal !== "") {
//       if (!validOps.includes(humidityOp)) {
//         setFormErrors({ humidityOp: "Invalid operator" });
//         return;
//       }
//       conditionsToSend.push({
//         type: "humidity",
//         operator: humidityOp,
//         value: Number(humidityVal),
//       });
//     }


//     try {
//       setWorking(true);
//       await dispatch(
//         updateDevice({
//           id: editingDeviceId,
//           deviceId: deviceId.toString().trim(),
//           venueId,
//           conditions: conditionsToSend,
//         })
//       ).unwrap();

//       Swal.fire({
//         icon: "success",
//         title: "Saved",
//         text: "Device updated.",
//         timer: 1600,
//         showConfirmButton: false,
//       });

//       setEditOpen(false);
//       dispatch(fetchAllDevices());
//       if (isMobile) setDrawerOpen(false);
//     } catch (err) {
//       console.error("Update device error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Update failed",
//         text: err?.toString() || "Update failed",
//       });
//     } finally {
//       setWorking(false);
//     }
//   };

//   const displayDevices = DeviceArray || [];

//   const renderListMarkup = () => (
//     <div className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
//       {isDesktop ? (
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Device Management</h1>
//       ) : (
//           <div className="flex justify-end">
//           <IconButton
//             onClick={() => {
//               setDrawerOpen(!drawerOpen); // guard, then call
//             }}
//             edge="start"
//             aria-label="close-details"
//             size="small"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}
//       <div className="mb-4">
//         <h2 className="device-list-header text-center font-semibold text-gray-800">Device List</h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 font-bold text-gray-800">Device ID</th>
//               <th className="py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="pr-1 user-table-scroll md:h-[50vh] h-[60vh]">
//           <table className="w-full table-auto text-left overflow-y-auto">
//             <tbody>
//               {isLoading && <TableSkeleton />}

//               {!isLoading &&
//                 displayDevices.map((d, idx) => {
//                   const id = d._id ?? idx;
//                   const deviceIdDisplay = d.deviceId ?? `Device ${idx + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedDevice?._id === id || selectedDevice?.id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onDeviceSelect?.(d);
//                         if (isMobile) setDrawerOpen(false);
//                       }}
//                     >
//                       <td className="py-2 sm:py-3 px-2 sm:px-4">{deviceIdDisplay}</td>
//                       <td className="py-2 sm:py-3 px-2 sm:px-4">
//                         <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                           <button
//                             onClick={() => handleEdit(d)}
//                             className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-2 cursor-pointer"
//                             disabled={working}
//                           >
//                             <Pencil className="text-green-600" size={16} />
//                           </button>
//                           <button
//                             onClick={() => openDeleteConfirm(id, deviceIdDisplay)}
//                             className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-2 cursor-pointer"
//                             disabled={working}
//                           >
//                             <Trash className="text-red-600" size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading && displayDevices.length === 0 && <tr><td className="p-4 text-center text-gray-500">No devices found.</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="device-list-title font-semibold text-gray-800">Device Management</h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             PaperProps={{ style: { width: "100%" } }}
//           >
//             <div className="p-4">{renderListMarkup()}</div>
//           </Drawer>
//         </>
//       )}

//       {/* Edit Dialog */}
//       <Dialog open={editOpen} onClose={handleEditCancel} maxWidth="xs" fullWidth>
//         <DialogTitle>Edit Device</DialogTitle>
//         <DialogContent dividers>
//           <Stack spacing={2} alignItems="center" justifyContent="center">
//             <FormControl sx={{ width: "83%" }} error={!!formErrors.deviceId}>
//               <TextField
//                 label="Device ID"
//                 value={editForm.deviceId}
//                 fullWidth
//                 error={!!formErrors.deviceId}
//                 helperText={formErrors.deviceId}
//                 onChange={(e) => setEditForm({ ...editForm, deviceId: e.target.value })}
//                 size="small"
//               />
//             </FormControl>

//             {/* <FormControl sx={{ width: "83%" }} error={!!formErrors.venueId}>
//               <InputLabel id="venue-select-label">Venue</InputLabel>
//               <Select
//                 labelId="venue-select-label"
//                 label="Venue"
//                 value={editForm.venueId}
//                 onChange={handleEditChange("venueId")}
//                 fullWidth
//                 sx={{ minWidth: 0 }}
//                 size="small"
//               >
//                 <MenuItem value="">Select venue</MenuItem>
//                 {Venues.map((v) => (
//                   <MenuItem key={v._id ?? v.id} value={v._id ?? v.id}>
//                     {v.name ?? v._id ?? v.id}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
//             </FormControl> */}


// {/* Organization Select */}
// <FormControl sx={{ width: "83%" }}>
//   <InputLabel id="org-select-label">Organization</InputLabel>
//   <Select
//     labelId="org-select-label"
//     label="Organization"
//     value={editForm.organization ?? ""}
//     onChange={handleEditOrgChange}
//     fullWidth
//     size="small"
//   >
//     <MenuItem value="">Select organization</MenuItem>
//     {Organizations.map((org) => (
//       <MenuItem key={org._id ?? org.id} value={org._id ?? org.id}>
//         {org.name ?? org._id ?? org.id}
//       </MenuItem>
//     ))}
//   </Select>
// </FormControl>

// {/* Venue Select */}
// <FormControl sx={{ width: "83%" }} error={!!formErrors.venueId}>
//   <InputLabel id="venue-select-label">Venue</InputLabel>
//   <Select
//     labelId="venue-select-label"
//     label="Venue"
//     value={editForm.venueId ?? ""}
//     onChange={handleEditChange("venueId")}
//     fullWidth
//     size="small"
//   >
//     <MenuItem value="">Select venue</MenuItem>

//     {/*
//       compute available venues for currently selected org (from venuesByOrg cache)
//       and if current venue not present, show it at top so the preselected venue appears.
//     */}
//     {(() => {
//       const orgId = editForm.organization;
//       const available = orgId ? (venuesByOrg[orgId] || []) : Venues || [];
//       // ensure currentVenue (editForm.venueId) is included even if not loaded yet:
//       const merged = Array.isArray(available) ? [...available] : [];
//       const currentVenueId = editForm.venueId;
//       if (currentVenueId && !merged.find((v) => String(v._id ?? v.id) === String(currentVenueId))) {
//         // try to create a simple entry from Venues global or use a placeholder name:
//         const fromGlobal = (Venues || []).find((v) => String(v._id ?? v.id) === String(currentVenueId));
//         if (fromGlobal) merged.unshift(fromGlobal);
//         else merged.unshift({ _id: currentVenueId, name: "Current venue" });
//       }

//       return merged.map((v) => (
//         <MenuItem key={v._id ?? v.id} value={v._id ?? v.id}>
//           {v.name ?? v._id ?? v.id}
//         </MenuItem>
//       ));
//     })()}
//   </Select>
//   {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
// </FormControl>


            
//             {/* Temperature row */}
//             <Grid container spacing={1} alignItems="center" sx={{ width: "83%" }}>
//               <Grid item xs="auto" sm={3}>
//                 <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
//                   <InputLabel id="temp-op-label">Op</InputLabel>
//                   <Select
//                     labelId="temp-op-label"
//                     value={editForm.temperatureOp}
//                     label="Op"
//                     onChange={handleEditChange("temperatureOp")}
//                     sx={{ width: "100%" }}
//                     size="small"
//                   >
//                     <MenuItem value=">">&gt;</MenuItem>
//                     <MenuItem value="<">&lt;</MenuItem>
               
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs>
//                 <TextField
//                   label="Temperature"
//                   type="number"
//                   inputProps={{ step: 0.1 }}
//                   value={editForm.temperatureVal}
//                   onChange={handleEditChange("temperatureVal")}
//                   fullWidth
//                   error={!!formErrors.temperatureVal}
//                   helperText={formErrors.temperatureVal}
//                   size="small"
//                   sx={{
//                     maxWidth: { xs: 120, sm: "100%" },
//                     "& .MuiInputBase-root": { height: 36 },
//                   }}
//                 />
//               </Grid>
//             </Grid>

//             {/* Humidity row */}
//             <Grid container spacing={1} alignItems="center" sx={{ mt: 1, width: "83%" }}>
//               <Grid item xs="auto" sm={3}>
//                 <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
//                   <InputLabel id="hum-op-label">Op</InputLabel>
//                   <Select
//                     labelId="hum-op-label"
//                     value={editForm.humidityOp}
//                     label="Op"
//                     onChange={handleEditChange("humidityOp")}
//                     sx={{ width: "100%" }}
//                     size="small"
//                   >
//                     <MenuItem value=">">&gt;</MenuItem>
//                     <MenuItem value="<">&lt;</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs>
//                 <TextField
//                   label="Humidity (%)"
//                   type="number"
//                   inputProps={{ step: 0.1 }}
//                   value={editForm.humidityVal}
//                   onChange={handleEditChange("humidityVal")}
//                   fullWidth
//                   error={!!formErrors.humidityVal}
//                   helperText={formErrors.humidityVal}
//                   size="small"
//                   sx={{
//                     maxWidth: { xs: 120, sm: "100%" },
//                     "& .MuiInputBase-root": { height: 36 },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Stack>

//         </DialogContent>

//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button onClick={handleEditCancel} disabled={working}>Cancel</Button>
//           <Button variant="contained" onClick={handleEditSave} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
//         <DialogTitle>Delete {deleteTarget.name ? `"${deleteTarget.name}"` : "device"}?</DialogTitle>
//         <DialogContent dividers>This action cannot be undone.</DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteCancel} disabled={working}>Cancel</Button>
//           <Button variant="contained" color="error" onClick={handleDeleteConfirm} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>
//             Yes, delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default DeviceList;






// // Adding 
// // src/pages/management/DeviceList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   CircularProgress,
//   FormHelperText,
//   Stack,
//   IconButton,
//   Drawer,
//   useMediaQuery,
// } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import Swal from "sweetalert2";
// import { fetchAllDevices, updateDevice, deleteDevice } from "../../slices/DeviceSlice";
// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// // add these imports
// import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
// import { fetchVenuesByOrganization } from "../../slices/VenueSlice";



// const DeviceList = ({ onDeviceSelect, selectedDevice }) => {
//   const dispatch = useDispatch();
//   const { DeviceArray = [], isLoading, error } = useSelector((state) => state.Device || {});
//   const { Venues = [] } = useSelector((state) => state.Venue || {});

//     // new: organizations + venuesByOrg (cached)
//   const { Organizations = [], isLoading: orgsLoading } = useSelector((s) => s.Organization || {});
//   const { venuesByOrg = {}, loading: venueLoading, error: venueError } = useSelector((s) => s.Venue || {});


//   const [working, setWorking] = useState(false);

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Edit dialog state (now uses temperature, humidity)
//   const [editOpen, setEditOpen] = useState(false);
//   const [editingDeviceId, setEditingDeviceId] = useState(null);
//   // const [editForm, setEditForm] = useState({
//   //   deviceId: "",
//   //   venueId: "",
//   //   temperatureOp: ">",
//   //   temperatureVal: "",
//   //   humidityOp: ">",
//   //   humidityVal: "",
//   // });
//     const [editForm, setEditForm] = useState({
//     deviceId: "",
//     organization: "", // <-- added
//     venueId: "",
//     temperatureOp: ">",
//     temperatureVal: "",
//     humidityOp: ">",
//     humidityVal: "",
//     apiKey: "",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   // Delete confirm dialog state
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" });

//   useEffect(() => {
//     dispatch(fetchAllDevices());
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       console.error("Device error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: String(error),
//       });
//     }
//   }, [error]);

//   // Delete flow
//   const openDeleteConfirm = (id, displayName) => {
//     setDeleteTarget({ id, name: displayName });
//     setDeleteOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setDeleteOpen(false);
//     setDeleteTarget({ id: null, name: "" });
//   };

//   const handleDeleteConfirm = async () => {
//     const id = deleteTarget.id;
//     setDeleteOpen(false);
//     if (!id) return;
//     try {
//       setWorking(true);
//       await dispatch(deleteDevice(id)).unwrap();
//       Swal.fire({
//         icon: "success",
//         title: "Deleted",
//         text: "Device deleted.",
//         timer: 1800,
//         showConfirmButton: false,
//       });
//       dispatch(fetchAllDevices());
//       if (isMobile) setDrawerOpen(false);
//     } catch (err) {
//       console.error("Delete device error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Delete failed",
//         text: err?.toString() || "Delete failed",
//       });
//     } finally {
//       setWorking(false);
//       setDeleteTarget({ id: null, name: "" });
//     }
//   };

//   // Helper: safely get condition object by type, also map legacy 'ambient'/'freezer' to 'temperature'
//   // const findCondition = (conditionsArray = [], wantedType) => {
//   //   if (!Array.isArray(conditionsArray)) return undefined;
//   //   // Normalize types to check: if wantedType === 'temperature', accept 'ambient' and 'freezer' too.
//   //   if (wantedType === "temperature") {
//   //     const byType = conditionsArray.find((c) => ["temperature", "ambient", "freezer"].includes(c.type));
//   //     return byType;
//   //   }
//   //   return conditionsArray.find((c) => c.type === wantedType);
//   // };


//   // only temperature and humidity
// const findCondition = (conditionsArray = [], wantedType) => {
//   if (!Array.isArray(conditionsArray)) return undefined;
//   return conditionsArray.find((c) => c.type === wantedType);
// };


//   // // Edit flow
//   // const handleEdit = (device) => {
//   //   console.log("device", device);
    
//   //   const currentDeviceId = device.deviceId || "";
//   //   const currentVenueId = device.venue?._id ?? device.venue ?? "";

//   //   const temperatureCond = findCondition(device.conditions, "temperature") || {};
//   //   const humidityCond = findCondition(device.conditions, "humidity") || {};
   
    
//   //   setEditingDeviceId(device._id ?? device.id ?? null);
//   //   setEditForm({
//   //     deviceId: currentDeviceId,
//   //     venueId: currentVenueId,
//   //     temperatureOp: temperatureCond.operator ?? "=",
//   //     temperatureVal:
//   //       temperatureCond.value === undefined || temperatureCond.value === null ? "" : String(temperatureCond.value),
//   //     humidityOp: humidityCond.operator ?? "=",
//   //     humidityVal:
//   //       humidityCond.value === undefined || humidityCond.value === null ? "" : String(humidityCond.value),
//   //   });
//   //   setFormErrors({});
//   //   setEditOpen(true);
//   // };

//     const handleEdit = (device) => {
//     console.log("device", device);

//     const currentDeviceId = device.deviceId || "";

//     // device.venue might be an object or id; try to extract venue id & name & org id:
//     const currentVenueObj = device.venue && typeof device.venue === "object" ? device.venue : null;
//     const currentVenueId = currentVenueObj?._id ?? device.venue ?? "";

//     // organization id is nested at device.venue.organization._id in your object
//     const currentOrgId = currentVenueObj?.organization?._id ?? currentVenueObj?.organization ?? "";

//     const temperatureCond = findCondition(device.conditions, "temperature") || {};
//     const humidityCond = findCondition(device.conditions, "humidity") || {};

//     // set edit form and request org's venues (so venue list is available)
//     setEditingDeviceId(device._id ?? device.id ?? null);
//     setEditForm({
//       deviceId: currentDeviceId,
//       organization: currentOrgId,
//       venueId: currentVenueId,
//       temperatureOp: temperatureCond.operator ?? "=",
//       temperatureVal:
//         temperatureCond.value === undefined || temperatureCond.value === null ? "" : String(temperatureCond.value),
//       humidityOp: humidityCond.operator ?? "=",
//       humidityVal:
//         humidityCond.value === undefined || humidityCond.value === null ? "" : String(humidityCond.value),
//       apiKey: device.apiKey ?? device?.apiKey ?? "",
//       });
//     setFormErrors({});

//     // fetch venues for the organization so the select shows them
//     if (currentOrgId) {
//       dispatch(fetchVenuesByOrganization(currentOrgId));
//     }

//     setEditOpen(true);
//   };


//     const handleEditOrgChange = (e) => {
//     const newOrgId = e.target.value;
//     setEditForm((s) => ({ ...s, organization: newOrgId, venueId: "" }));
//     setFormErrors((s) => ({ ...s, organization: undefined, venueId: undefined }));
//     if (newOrgId) {
//       dispatch(fetchVenuesByOrganization(newOrgId));
//     }
//   };


//   const handleEditChange = (field) => (e) => {
//     const v = e?.target?.value ?? "";
//     setEditForm((s) => ({ ...s, [field]: v }));
//     setFormErrors((s) => ({ ...s, [field]: undefined }));
//   };

//   const handleEditCancel = () => {
//     setEditOpen(false);
//     setFormErrors({});
//     setEditingDeviceId(null);
//   };

//   // const handleEditSave = async () => {
//   //   const {
//   //     deviceId,
//   //     venueId,
//   //     temperatureOp,
//   //     temperatureVal,
//   //     humidityOp,
//   //     humidityVal,
//   //   } = editForm;

//   //   const errors = {};
//   //   if (!deviceId || !deviceId.toString().trim()) errors.deviceId = "Device ID is required";
//   //   if (!venueId) errors.venueId = "Venue is required";

//   //   // Basic local validation
//   //   if (temperatureVal !== "" && Number.isNaN(Number(temperatureVal))) errors.temperatureVal = "Must be a number";
//   //   if (humidityVal !== "" && Number.isNaN(Number(humidityVal))) errors.humidityVal = "Must be a number";
    

//   //   if (Object.keys(errors).length > 0) {
//   //     setFormErrors(errors);
//   //     return;
//   //   }

//   //   // Build conditions following backend shape and validation
//   //   const validOps = [">", "<"];
//   //   const conditionsToSend = [];

//   //   // Temperature
//   //   if (temperatureVal !== "") {
//   //     if (!validOps.includes(temperatureOp)) {
//   //       setFormErrors({ temperatureOp: "Invalid operator" });
//   //       return;
//   //     }
//   //     conditionsToSend.push({
//   //       type: "temperature",
//   //       operator: temperatureOp,
//   //       value: Number(temperatureVal),
//   //     });
//   //   }

//   //   // Humidity
//   //   if (humidityVal !== "") {
//   //     if (!validOps.includes(humidityOp)) {
//   //       setFormErrors({ humidityOp: "Invalid operator" });
//   //       return;
//   //     }
//   //     conditionsToSend.push({
//   //       type: "humidity",
//   //       operator: humidityOp,
//   //       value: Number(humidityVal),
//   //     });
//   //   }


//   //   try {
//   //     setWorking(true);
//   //     await dispatch(
//   //       updateDevice({
//   //         id: editingDeviceId,
//   //         deviceId: deviceId.toString().trim(),
//   //         venueId,
//   //         conditions: conditionsToSend,
//   //       })
//   //     ).unwrap();

//   //     Swal.fire({
//   //       icon: "success",
//   //       title: "Saved",
//   //       text: "Device updated.",
//   //       timer: 1600,
//   //       showConfirmButton: false,
//   //     });

//   //     setEditOpen(false);
//   //     dispatch(fetchAllDevices());
//   //     if (isMobile) setDrawerOpen(false);
//   //   } catch (err) {
//   //     console.error("Update device error:", err);
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Update failed",
//   //       text: err?.toString() || "Update failed",
//   //     });
//   //   } finally {
//   //     setWorking(false);
//   //   }
//   // };


//   const handleEditSave = async () => {
//   const {
//     deviceId,
//     venueId,
//     temperatureOp,
//     temperatureVal,
//     humidityOp,
//     humidityVal,
//   } = editForm;

//   const errors = {};
//   if (!deviceId || !deviceId.toString().trim()) errors.deviceId = "Device ID is required";
//   if (!venueId) errors.venueId = "Venue is required";

//   if (temperatureVal !== "" && Number.isNaN(Number(temperatureVal))) errors.temperatureVal = "Must be a number";
//   if (humidityVal !== "" && Number.isNaN(Number(humidityVal))) errors.humidityVal = "Must be a number";

//   if (Object.keys(errors).length > 0) {
//     setFormErrors(errors);
//     return;
//   }

//   const validOps = [">", "<"];
//   const conditionsToSend = [];

//   if (temperatureVal !== "") {
//     if (!validOps.includes(temperatureOp)) {
//       setFormErrors({ temperatureOp: "Invalid operator" });
//       return;
//     }
//     conditionsToSend.push({
//       type: "temperature",
//       operator: temperatureOp,
//       value: Number(temperatureVal),
//     });
//   }

//   if (humidityVal !== "") {
//     if (!validOps.includes(humidityOp)) {
//       setFormErrors({ humidityOp: "Invalid operator" });
//       return;
//     }
//     conditionsToSend.push({
//       type: "humidity",
//       operator: humidityOp,
//       value: Number(humidityVal),
//     });
//   }

//   try {
//     setWorking(true);

//     // IMPORTANT: capture response from updateDevice
//     const res = await dispatch(
//       updateDevice({
//         id: editingDeviceId,
//         deviceId: deviceId.toString().trim(),
//         venueId,
//         conditions: conditionsToSend,
//       })
//     ).unwrap();

//     console.log("res>>", res)

//     // Determine if backend generated a new API key and extract it
//     const newApiKeyGenerated =
//       Boolean(res?.newApiKeyGenerated) ||
//       (typeof res?.message === "string" && res.message.toLowerCase().includes("new api key")) ||
//       false;

//     // Try common places API might be returned
//     const apiKeyFromRes = res?.apiKey ?? res?.newApiKey ?? res?.device?.apiKey ?? null;

//     if (newApiKeyGenerated && apiKeyFromRes) {
//       // Update form so API key is visible in the dialog
//       setEditForm((s) => ({ ...s, apiKey: apiKeyFromRes }));

//       // Inform user and allow easy copying
//       const swalResult = await Swal.fire({
//         icon: "warning",
//         title: "New API key generated!",
//         html: `<p>Please reconfigure your device to use the new API key:</p>
//                <pre style="white-space:break-spaces; background:#f6f6f6; padding:8px; border-radius:6px;">${apiKeyFromRes}</pre>`,
//         showCancelButton: true,
//         confirmButtonText: "Copy key",
//         cancelButtonText: "Close",
//         allowOutsideClick: false,
//       });

//       if (swalResult.isConfirmed) {
//         try {
//           await navigator.clipboard.writeText(apiKeyFromRes);
//           await Swal.fire({ icon: "success", title: "Copied", text: "API key copied to clipboard", timer: 1400, showConfirmButton: false });
//         } catch (copyErr) {
//           // fallback if clipboard not available
//           await Swal.fire({ icon: "info", title: "Copy failed", text: "Please copy the API key manually." });
//         }
//       }

//       // Keep the edit dialog open so the user can see / copy the key later.
//       // Refresh device list to fetch updated data
//       dispatch(fetchAllDevices());
//       if (isMobile) setDrawerOpen(false);
//       setWorking(false);
//       return; // early return; don't close dialog automatically
//     }

//     // Normal success path (no new api key)
//     Swal.fire({
//       icon: "success",
//       title: "Saved",
//       text: "Device updated.",
//       timer: 1600,
//       showConfirmButton: false,
//     });

//     setEditOpen(false);
//     dispatch(fetchAllDevices());
//     if (isMobile) setDrawerOpen(false);
//   } catch (err) {
//     console.error("Update device error:", err);
//     Swal.fire({
//       icon: "error",
//       title: "Update failed",
//       text: err?.toString() || "Update failed",
//     });
//   } finally {
//     setWorking(false);
//   }
// };

//   const handleCopyApiKey = (apiKey) => {
//     if (!apiKey) return;

//     navigator.clipboard.writeText(apiKey)
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Copied!",
//           timer: 1200,
//           width: 150,
//           showConfirmButton: false,
//           position: "top-end",
//           toast: true,
//           customClass: { popup: "small-toast" },
//         });
//       })
//       .catch(() => {
//         Swal.fire({ icon: "error", title: "Copy failed" });
//       });
//   };



//   const displayDevices = DeviceArray || [];

//   const renderListMarkup = () => (
//     <div className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
//       {isDesktop ? (
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Device Management</h1>
//       ) : (
//           <div className="flex justify-end">
//           <IconButton
//             onClick={() => {
//               setDrawerOpen(!drawerOpen); // guard, then call
//             }}
//             edge="start"
//             aria-label="close-details"
//             size="small"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}
//       <div className="mb-4">
//         <h2 className="device-list-header text-center font-semibold text-gray-800">Device List</h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 font-bold text-gray-800">Device ID</th>
//               <th className="py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="pr-1 user-table-scroll md:h-[50vh] h-[60vh]">
//           <table className="w-full table-auto text-left overflow-y-auto">
//             <tbody>
//               {isLoading && <TableSkeleton />}

//               {!isLoading &&
//                 displayDevices.map((d, idx) => {
//                   const id = d._id ?? idx;
//                   const deviceIdDisplay = d.deviceId ?? `Device ${idx + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedDevice?._id === id || selectedDevice?.id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onDeviceSelect?.(d);
//                         if (isMobile) setDrawerOpen(false);
//                       }}
//                     >
//                       <td className="py-2 sm:py-3 px-2 sm:px-4">{deviceIdDisplay}</td>
//                       <td className="py-2 sm:py-3 px-2 sm:px-4">
//                         <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                           <button
//                             onClick={() => handleEdit(d)}
//                             className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-2 cursor-pointer"
//                             disabled={working}
//                           >
//                             <Pencil className="text-green-600" size={16} />
//                           </button>
//                           <button
//                             onClick={() => openDeleteConfirm(id, deviceIdDisplay)}
//                             className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-2 cursor-pointer"
//                             disabled={working}
//                           >
//                             <Trash className="text-red-600" size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading && displayDevices.length === 0 && <tr><td className="p-4 text-center text-gray-500">No devices found.</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="device-list-title font-semibold text-gray-800">Device Management</h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             PaperProps={{ style: { width: "100%" } }}
//           >
//             <div className="p-4">{renderListMarkup()}</div>
//           </Drawer>
//         </>
//       )}

//       {/* Edit Dialog */}
//       <Dialog open={editOpen} onClose={handleEditCancel} maxWidth="xs" fullWidth>
//         <DialogTitle>Edit Device</DialogTitle>
//         <DialogContent dividers>
//           <Stack spacing={2} alignItems="center" justifyContent="center">
//             <FormControl sx={{ width: "83%" }} error={!!formErrors.deviceId}>
//               <TextField
//                 label="Device ID"
//                 value={editForm.deviceId}
//                 fullWidth
//                 error={!!formErrors.deviceId}
//                 helperText={formErrors.deviceId}
//                 onChange={(e) => setEditForm({ ...editForm, deviceId: e.target.value })}
//                 size="small"
//               />
//             </FormControl>

//             {/* <FormControl sx={{ width: "83%" }} error={!!formErrors.venueId}>
//               <InputLabel id="venue-select-label">Venue</InputLabel>
//               <Select
//                 labelId="venue-select-label"
//                 label="Venue"
//                 value={editForm.venueId}
//                 onChange={handleEditChange("venueId")}
//                 fullWidth
//                 sx={{ minWidth: 0 }}
//                 size="small"
//               >
//                 <MenuItem value="">Select venue</MenuItem>
//                 {Venues.map((v) => (
//                   <MenuItem key={v._id ?? v.id} value={v._id ?? v.id}>
//                     {v.name ?? v._id ?? v.id}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
//             </FormControl> */}


// {/* Organization Select */}
// <FormControl sx={{ width: "83%" }}>
//   <InputLabel id="org-select-label">Organization</InputLabel>
//   <Select
//     labelId="org-select-label"
//     label="Organization"
//     value={editForm.organization ?? ""}
//     onChange={handleEditOrgChange}
//     fullWidth
//     size="small"
//   >
//     <MenuItem value="">Select organization</MenuItem>
//     {Organizations.map((org) => (
//       <MenuItem key={org._id ?? org.id} value={org._id ?? org.id}>
//         {org.name ?? org._id ?? org.id}
//       </MenuItem>
//     ))}
//   </Select>
// </FormControl>

// {/* Venue Select */}
// <FormControl sx={{ width: "83%" }} error={!!formErrors.venueId}>
//   <InputLabel id="venue-select-label">Venue</InputLabel>
//   <Select
//     labelId="venue-select-label"
//     label="Venue"
//     value={editForm.venueId ?? ""}
//     onChange={handleEditChange("venueId")}
//     fullWidth
//     size="small"
//   >
//     <MenuItem value="">Select venue</MenuItem>

//     {/*
//       compute available venues for currently selected org (from venuesByOrg cache)
//       and if current venue not present, show it at top so the preselected venue appears.
//     */}
//     {(() => {
//       const orgId = editForm.organization;
//       const available = orgId ? (venuesByOrg[orgId] || []) : Venues || [];
//       // ensure currentVenue (editForm.venueId) is included even if not loaded yet:
//       const merged = Array.isArray(available) ? [...available] : [];
//       const currentVenueId = editForm.venueId;
//       if (currentVenueId && !merged.find((v) => String(v._id ?? v.id) === String(currentVenueId))) {
//         // try to create a simple entry from Venues global or use a placeholder name:
//         const fromGlobal = (Venues || []).find((v) => String(v._id ?? v.id) === String(currentVenueId));
//         if (fromGlobal) merged.unshift(fromGlobal);
//         else merged.unshift({ _id: currentVenueId, name: "Current venue" });
//       }

//       return merged.map((v) => (
//         <MenuItem key={v._id ?? v.id} value={v._id ?? v.id}>
//           {v.name ?? v._id ?? v.id}
//         </MenuItem>
//       ));
//     })()}
//   </Select>
//   {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
// </FormControl>


            
//             {/* Temperature row */}
//             <Grid container spacing={1} alignItems="center" sx={{ width: "83%" }}>
//               <Grid item xs="auto" sm={3}>
//                 <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
//                   <InputLabel id="temp-op-label">Op</InputLabel>
//                   <Select
//                     labelId="temp-op-label"
//                     value={editForm.temperatureOp}
//                     label="Op"
//                     onChange={handleEditChange("temperatureOp")}
//                     sx={{ width: "100%" }}
//                     size="small"
//                   >
//                     <MenuItem value=">">&gt;</MenuItem>
//                     <MenuItem value="<">&lt;</MenuItem>
               
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs>
//                 <TextField
//                   label="Temperature"
//                   type="number"
//                   inputProps={{ step: 0.1 }}
//                   value={editForm.temperatureVal}
//                   onChange={handleEditChange("temperatureVal")}
//                   fullWidth
//                   error={!!formErrors.temperatureVal}
//                   helperText={formErrors.temperatureVal}
//                   size="small"
//                   sx={{
//                     maxWidth: { xs: 120, sm: "100%" },
//                     "& .MuiInputBase-root": { height: 36 },
//                   }}
//                 />
//               </Grid>
//             </Grid>
                



//             {/* Humidity row */}
//             <Grid container spacing={1} alignItems="center" sx={{ mt: 1, width: "83%" }}>
//               <Grid item xs="auto" sm={3}>
//                 <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
//                   <InputLabel id="hum-op-label">Op</InputLabel>
//                   <Select
//                     labelId="hum-op-label"
//                     value={editForm.humidityOp}
//                     label="Op"
//                     onChange={handleEditChange("humidityOp")}
//                     sx={{ width: "100%" }}
//                     size="small"
//                   >
//                     <MenuItem value=">">&gt;</MenuItem>
//                     <MenuItem value="<">&lt;</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs>
//                 <TextField
//                   label="Humidity (%)"
//                   type="number"
//                   inputProps={{ step: 0.1 }}
//                   value={editForm.humidityVal}
//                   onChange={handleEditChange("humidityVal")}
//                   fullWidth
//                   error={!!formErrors.humidityVal}
//                   helperText={formErrors.humidityVal}
//                   size="small"
//                   sx={{
//                     maxWidth: { xs: 120, sm: "100%" },
//                     "& .MuiInputBase-root": { height: 36 },
//                   }}
//                 />
//               </Grid>
//             </Grid>

//                         {/* API Key display (compact) */}
//           {editForm.apiKey ? (
//             <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-5 w-full">
//               <div className="flex items-start justify-between gap-3">
//                 <div className="flex-1 min-w-0">
//                   <div className="font-semibold text-sm">API Key:</div>
//                   <div
//                     className="mt-2 text-sm font-mono truncate"
//                     title={editForm.apiKey}
//                     style={{ maxWidth: "100%" }}
//                   >
//                     {/* show truncated key; full key is visible on hover via title */}
//                     {editForm.apiKey ? `${String(editForm.apiKey).slice(0, 20)}...` : ""}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   {/* Copy icon/button */}
//                   <button
//                     onClick={()=>handleCopyApiKey(editForm?.apiKey)}
//                     className="p-1 rounded hover:bg-gray-100 border border-transparent"
//                     title="Copy API key"
//                     type="button"
//                   >
//                     <img src="/copyicon.svg" alt="Copy API KEY Icon" className="w-[20px] h-[20px]" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : null}


//           </Stack>

//         </DialogContent>

//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button onClick={handleEditCancel} disabled={working}>Cancel</Button>
//           <Button variant="contained" onClick={handleEditSave} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
//         <DialogTitle>Delete {deleteTarget.name ? `"${deleteTarget.name}"` : "device"}?</DialogTitle>
//         <DialogContent dividers>This action cannot be undone.</DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteCancel} disabled={working}>Cancel</Button>
//           <Button variant="contained" color="error" onClick={handleDeleteConfirm} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>
//             Yes, delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default DeviceList;
// Adding 



// // src/pages/management/DeviceList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   CircularProgress,
//   FormHelperText,
//   Stack,
//   IconButton,
//   Drawer,
//   useMediaQuery,
// } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import Swal from "sweetalert2";
// import { fetchAllDevices, updateDevice, deleteDevice } from "../../slices/DeviceSlice";
// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// // add these imports
// import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
// import { fetchVenuesByOrganization } from "../../slices/VenueSlice";



// const DeviceList = ({ onDeviceSelect, selectedDevice }) => {
//   const dispatch = useDispatch();
//   const { DeviceArray = [], isLoading, error } = useSelector((state) => state.Device || {});
//   const { Venues = [] } = useSelector((state) => state.Venue || {});

//     // new: organizations + venuesByOrg (cached)
//   const { Organizations = [], isLoading: orgsLoading } = useSelector((s) => s.Organization || {});
//   const { venuesByOrg = {}, loading: venueLoading, error: venueError } = useSelector((s) => s.Venue || {});


//   const [working, setWorking] = useState(false);

//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Edit dialog state (now uses temperature, humidity)
//   const [editOpen, setEditOpen] = useState(false);
//   const [editingDeviceId, setEditingDeviceId] = useState(null);
//   // const [editForm, setEditForm] = useState({
//   //   deviceId: "",
//   //   venueId: "",
//   //   temperatureOp: ">",
//   //   temperatureVal: "",
//   //   humidityOp: ">",
//   //   humidityVal: "",
//   // });
//     const [editForm, setEditForm] = useState({
//     deviceId: "",
//     organization: "", // <-- added
//     venueId: "",
//     temperatureOp: ">",
//     temperatureVal: "",
//     humidityOp: ">",
//     humidityVal: "",
//     apiKey: "",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   // Delete confirm dialog state
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" });

//   useEffect(() => {
//     dispatch(fetchAllDevices());
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       console.error("Device error:", error);
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Error",
//     //     text: String(error),
//     //   });
//     }
//   }, [error]);

//   // Delete flow
//   const openDeleteConfirm = (id, displayName) => {
//     setDeleteTarget({ id, name: displayName });
//     setDeleteOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setDeleteOpen(false);
//     setDeleteTarget({ id: null, name: "" });
//   };

//   const handleDeleteConfirm = async () => {
//     const id = deleteTarget.id;
//     setDeleteOpen(false);
//     if (!id) return;
//     try {
//       setWorking(true);
//       await dispatch(deleteDevice(id)).unwrap();
//       Swal.fire({
//         icon: "success",
//         title: "Deleted",
//         text: "Device deleted.",
//         timer: 1800,
//         showConfirmButton: false,
//       });
//       dispatch(fetchAllDevices());
//       if (isMobile) setDrawerOpen(false);
//     } catch (err) {
//       console.error("Delete device error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Delete failed",
//         text: err?.toString() || "Delete failed",
//       });
//     } finally {
//       setWorking(false);
//       setDeleteTarget({ id: null, name: "" });
//     }
//   };

//   // Helper: safely get condition object by type, also map legacy 'ambient'/'freezer' to 'temperature'
//   // const findCondition = (conditionsArray = [], wantedType) => {
//   //   if (!Array.isArray(conditionsArray)) return undefined;
//   //   // Normalize types to check: if wantedType === 'temperature', accept 'ambient' and 'freezer' too.
//   //   if (wantedType === "temperature") {
//   //     const byType = conditionsArray.find((c) => ["temperature", "ambient", "freezer"].includes(c.type));
//   //     return byType;
//   //   }
//   //   return conditionsArray.find((c) => c.type === wantedType);
//   // };


//   // only temperature and humidity
// const findCondition = (conditionsArray = [], wantedType) => {
//   if (!Array.isArray(conditionsArray)) return undefined;
//   return conditionsArray.find((c) => c.type === wantedType);
// };


//   // // Edit flow
//   // const handleEdit = (device) => {
//   //   console.log("device", device);
    
//   //   const currentDeviceId = device.deviceId || "";
//   //   const currentVenueId = device.venue?._id ?? device.venue ?? "";

//   //   const temperatureCond = findCondition(device.conditions, "temperature") || {};
//   //   const humidityCond = findCondition(device.conditions, "humidity") || {};
   
    
//   //   setEditingDeviceId(device._id ?? device.id ?? null);
//   //   setEditForm({
//   //     deviceId: currentDeviceId,
//   //     venueId: currentVenueId,
//   //     temperatureOp: temperatureCond.operator ?? "=",
//   //     temperatureVal:
//   //       temperatureCond.value === undefined || temperatureCond.value === null ? "" : String(temperatureCond.value),
//   //     humidityOp: humidityCond.operator ?? "=",
//   //     humidityVal:
//   //       humidityCond.value === undefined || humidityCond.value === null ? "" : String(humidityCond.value),
//   //   });
//   //   setFormErrors({});
//   //   setEditOpen(true);
//   // };

//     const handleEdit = (device) => {
//     console.log("device", device);

//     const currentDeviceId = device.deviceId || "";

//     // device.venue might be an object or id; try to extract venue id & name & org id:
//     const currentVenueObj = device.venue && typeof device.venue === "object" ? device.venue : null;
//     const currentVenueId = currentVenueObj?._id ?? device.venue ?? "";

//     // organization id is nested at device.venue.organization._id in your object
//     const currentOrgId = currentVenueObj?.organization?._id ?? currentVenueObj?.organization ?? "";

//     const temperatureCond = findCondition(device.conditions, "temperature") || {};
//     const humidityCond = findCondition(device.conditions, "humidity") || {};

//     // set edit form and request org's venues (so venue list is available)
//     setEditingDeviceId(device._id ?? device.id ?? null);
//     setEditForm({
//       deviceId: currentDeviceId,
//       organization: currentOrgId,
//       venueId: currentVenueId,
//       temperatureOp: temperatureCond.operator ?? "=",
//       temperatureVal:
//         temperatureCond.value === undefined || temperatureCond.value === null ? "" : String(temperatureCond.value),
//       humidityOp: humidityCond.operator ?? "=",
//       humidityVal:
//         humidityCond.value === undefined || humidityCond.value === null ? "" : String(humidityCond.value),
//       apiKey: device.apiKey ?? device?.apiKey ?? "",
//       });
//     setFormErrors({});

//     // fetch venues for the organization so the select shows them
//     if (currentOrgId) {
//       dispatch(fetchVenuesByOrganization(currentOrgId));
//     }

//     setEditOpen(true);
//   };


//     const handleEditOrgChange = (e) => {
//     const newOrgId = e.target.value;
//     setEditForm((s) => ({ ...s, organization: newOrgId, venueId: "" }));
//     setFormErrors((s) => ({ ...s, organization: undefined, venueId: undefined }));
//     if (newOrgId) {
//       dispatch(fetchVenuesByOrganization(newOrgId));
//     }
//   };


//   const handleEditChange = (field) => (e) => {
//     const v = e?.target?.value ?? "";
//     setEditForm((s) => ({ ...s, [field]: v }));
//     setFormErrors((s) => ({ ...s, [field]: undefined }));
//   };

//   const handleEditCancel = () => {
//     setEditOpen(false);
//     setFormErrors({});
//     setEditingDeviceId(null);
//   };

//   // const handleEditSave = async () => {
//   //   const {
//   //     deviceId,
//   //     venueId,
//   //     temperatureOp,
//   //     temperatureVal,
//   //     humidityOp,
//   //     humidityVal,
//   //   } = editForm;

//   //   const errors = {};
//   //   if (!deviceId || !deviceId.toString().trim()) errors.deviceId = "Device ID is required";
//   //   if (!venueId) errors.venueId = "Venue is required";

//   //   // Basic local validation
//   //   if (temperatureVal !== "" && Number.isNaN(Number(temperatureVal))) errors.temperatureVal = "Must be a number";
//   //   if (humidityVal !== "" && Number.isNaN(Number(humidityVal))) errors.humidityVal = "Must be a number";
    

//   //   if (Object.keys(errors).length > 0) {
//   //     setFormErrors(errors);
//   //     return;
//   //   }

//   //   // Build conditions following backend shape and validation
//   //   const validOps = [">", "<"];
//   //   const conditionsToSend = [];

//   //   // Temperature
//   //   if (temperatureVal !== "") {
//   //     if (!validOps.includes(temperatureOp)) {
//   //       setFormErrors({ temperatureOp: "Invalid operator" });
//   //       return;
//   //     }
//   //     conditionsToSend.push({
//   //       type: "temperature",
//   //       operator: temperatureOp,
//   //       value: Number(temperatureVal),
//   //     });
//   //   }

//   //   // Humidity
//   //   if (humidityVal !== "") {
//   //     if (!validOps.includes(humidityOp)) {
//   //       setFormErrors({ humidityOp: "Invalid operator" });
//   //       return;
//   //     }
//   //     conditionsToSend.push({
//   //       type: "humidity",
//   //       operator: humidityOp,
//   //       value: Number(humidityVal),
//   //     });
//   //   }


//   //   try {
//   //     setWorking(true);
//   //     await dispatch(
//   //       updateDevice({
//   //         id: editingDeviceId,
//   //         deviceId: deviceId.toString().trim(),
//   //         venueId,
//   //         conditions: conditionsToSend,
//   //       })
//   //     ).unwrap();

//   //     Swal.fire({
//   //       icon: "success",
//   //       title: "Saved",
//   //       text: "Device updated.",
//   //       timer: 1600,
//   //       showConfirmButton: false,
//   //     });

//   //     setEditOpen(false);
//   //     dispatch(fetchAllDevices());
//   //     if (isMobile) setDrawerOpen(false);
//   //   } catch (err) {
//   //     console.error("Update device error:", err);
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Update failed",
//   //       text: err?.toString() || "Update failed",
//   //     });
//   //   } finally {
//   //     setWorking(false);
//   //   }
//   // };


//   const handleEditSave = async () => {
//   const {
//     deviceId,
//     venueId,
//     temperatureOp,
//     temperatureVal,
//     humidityOp,
//     humidityVal,
//   } = editForm;

//   const errors = {};
//   if (!deviceId || !deviceId.toString().trim()) errors.deviceId = "Device ID is required";
//   if (!venueId) errors.venueId = "Venue is required";

//   if (temperatureVal !== "" && Number.isNaN(Number(temperatureVal))) errors.temperatureVal = "Must be a number";
//   if (humidityVal !== "" && Number.isNaN(Number(humidityVal))) errors.humidityVal = "Must be a number";

//   if (Object.keys(errors).length > 0) {
//     setFormErrors(errors);
//     return;
//   }

//   const validOps = [">", "<"];
//   const conditionsToSend = [];

//   if (temperatureVal !== "") {
//     if (!validOps.includes(temperatureOp)) {
//       setFormErrors({ temperatureOp: "Invalid operator" });
//       return;
//     }
//     conditionsToSend.push({
//       type: "temperature",
//       operator: temperatureOp,
//       value: Number(temperatureVal),
//     });
//   }

//   if (humidityVal !== "") {
//     if (!validOps.includes(humidityOp)) {
//       setFormErrors({ humidityOp: "Invalid operator" });
//       return;
//     }
//     conditionsToSend.push({
//       type: "humidity",
//       operator: humidityOp,
//       value: Number(humidityVal),
//     });
//   }

//   try {
//     setWorking(true);

//     // IMPORTANT: capture response from updateDevice
//     const res = await dispatch(
//       updateDevice({
//         id: editingDeviceId,
//         deviceId: deviceId.toString().trim(),
//         venueId,
//         conditions: conditionsToSend,
//       })
//     ).unwrap();

//     console.log("res>>", res)

//     // Determine if backend generated a new API key and extract it
//     const newApiKeyGenerated =
//       Boolean(res?.newApiKeyGenerated) ||
//       (typeof res?.message === "string" && res.message.toLowerCase().includes("new api key")) ||
//       false;

//     // Try common places API might be returned
//     const apiKeyFromRes = res?.apiKey ?? res?.newApiKey ?? res?.device?.apiKey ?? null;

//     if (newApiKeyGenerated && apiKeyFromRes) {
//       // Update form so API key is visible in the dialog
//       setEditForm((s) => ({ ...s, apiKey: apiKeyFromRes }));

//       // Inform user and allow easy copying
//       const swalResult = await Swal.fire({
//         icon: "warning",
//         title: "New API key generated!",
//         html: `<p>Please reconfigure your device to use the new API key:</p>
//                <pre style="white-space:break-spaces; background:#f6f6f6; padding:8px; border-radius:6px;">${apiKeyFromRes}</pre>`,
//         showCancelButton: true,
//         confirmButtonText: "Copy key",
//         cancelButtonText: "Close",
//         allowOutsideClick: false,
//       });

//       if (swalResult.isConfirmed) {
//         try {
//           await navigator.clipboard.writeText(apiKeyFromRes);
//           await Swal.fire({ icon: "success", title: "Copied", text: "API key copied to clipboard", timer: 1400, showConfirmButton: false });
//         } catch (copyErr) {
//           // fallback if clipboard not available
//           await Swal.fire({ icon: "info", title: "Copy failed", text: "Please copy the API key manually." });
//         }
//       }

//       // Keep the edit dialog open so the user can see / copy the key later.
//       // Refresh device list to fetch updated data
//       dispatch(fetchAllDevices());
//       if (isMobile) setDrawerOpen(false);
//       setWorking(false);
//       return; // early return; don't close dialog automatically
//     }

//     // Normal success path (no new api key)
//     Swal.fire({
//       icon: "success",
//       title: "Saved",
//       text: "Device updated.",
//       timer: 1600,
//       showConfirmButton: false,
//     });

//     setEditOpen(false);
//     dispatch(fetchAllDevices());
//     if (isMobile) setDrawerOpen(false);
//   } catch (err) {
//     console.error("Update device error:", err);
//     Swal.fire({
//       icon: "error",
//       title: "Update failed",
//       text: err?.toString() || "Update failed",
//     });
//   } finally {
//     setWorking(false);
//   }
// };

//   const handleCopyApiKey = (apiKey) => {
//     if (!apiKey) return;

//     navigator.clipboard.writeText(apiKey)
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Copied!",
//           timer: 1200,
//           width: 150,
//           showConfirmButton: false,
//           position: "top-end",
//           toast: true,
//           customClass: { popup: "small-toast" },
//         });
//       })
//       .catch(() => {
//         Swal.fire({ icon: "error", title: "Copy failed" });
//       });
//   };



//   const displayDevices = DeviceArray || [];

//   const renderListMarkup = () => (
//     <div className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB]">
//       {isDesktop ? (
//         <h1 className="organization-list-title font-semibold text-gray-800 mb-4">Device Management</h1>
//       ) : (
//           <div className="flex justify-end">
//           <IconButton
//             onClick={() => {
//               setDrawerOpen(!drawerOpen); // guard, then call
//             }}
//             edge="start"
//             aria-label="close-details"
//             size="small"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}
//       <div className="mb-4">
//         <h2 className="device-list-header text-center font-semibold text-gray-800">Device List</h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 font-bold text-gray-800">Device ID</th>
//               <th className="py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="pr-1 user-table-scroll md:h-[50vh] h-[60vh]">
//           <table className="w-full table-auto text-left overflow-y-auto">
//             <tbody>
//               {isLoading && <TableSkeleton />}

//               {!isLoading &&
//                 displayDevices.map((d, idx) => {
//                   const id = d._id ?? idx;
//                   const deviceIdDisplay = d.deviceId ?? `Device ${idx + 1}`;

//                   return (
//                     <tr
//                       key={id}
//                       className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                         selectedDevice?._id === id || selectedDevice?.id === id ? "bg-blue-50 border-blue-300" : ""
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onDeviceSelect?.(d);
//                         if (isMobile) setDrawerOpen(false);
//                       }}
//                     >
//                       <td className="py-2 sm:py-3 px-2 sm:px-4">{deviceIdDisplay}</td>
//                       <td className="py-2 sm:py-3 px-2 sm:px-4">
//                         <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                           <button
//                             onClick={() => handleEdit(d)}
//                             className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-2 cursor-pointer"
//                             disabled={working}
//                           >
//                             <Pencil className="text-green-600" size={16} />
//                           </button>
//                           <button
//                             onClick={() => openDeleteConfirm(id, deviceIdDisplay)}
//                             className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-2 cursor-pointer"
//                             disabled={working}
//                           >
//                             <Trash className="text-red-600" size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//               {!isLoading && displayDevices.length === 0 && <tr><td className="p-4 text-center text-gray-500">No devices found.</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <img src="/logo-half.png" className="w-auto h-[30px]"/>
//             <h1 className="device-list-title font-semibold text-gray-800">Device Management</h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}>
//               <Menu size={20} />
//             </IconButton>
//           </div>

//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             PaperProps={{ style: { width: "100%" } }}
//           >
//             <div className="p-4">{renderListMarkup()}</div>
//           </Drawer>
//         </>
//       )}

//       {/* Edit Dialog */}
//       <Dialog open={editOpen} onClose={handleEditCancel} maxWidth="xs" fullWidth>
//         <DialogTitle>Edit Device</DialogTitle>
//         <DialogContent dividers>
//           <Stack spacing={2} alignItems="center" justifyContent="center">
//             <FormControl sx={{ width: "83%" }} error={!!formErrors.deviceId}>
//               <TextField
//                 label="Device ID"
//                 value={editForm.deviceId}
//                 fullWidth
//                 error={!!formErrors.deviceId}
//                 helperText={formErrors.deviceId}
//                 onChange={(e) => setEditForm({ ...editForm, deviceId: e.target.value })}
//                 size="small"
//               />
//             </FormControl>

//             {/* <FormControl sx={{ width: "83%" }} error={!!formErrors.venueId}>
//               <InputLabel id="venue-select-label">Venue</InputLabel>
//               <Select
//                 labelId="venue-select-label"
//                 label="Venue"
//                 value={editForm.venueId}
//                 onChange={handleEditChange("venueId")}
//                 fullWidth
//                 sx={{ minWidth: 0 }}
//                 size="small"
//               >
//                 <MenuItem value="">Select venue</MenuItem>
//                 {Venues.map((v) => (
//                   <MenuItem key={v._id ?? v.id} value={v._id ?? v.id}>
//                     {v.name ?? v._id ?? v.id}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
//             </FormControl> */}


// {/* Organization Select */}
// <FormControl sx={{ width: "83%" }}>
//   <InputLabel id="org-select-label">Organization</InputLabel>
//   <Select
//     labelId="org-select-label"
//     label="Organization"
//     value={editForm.organization ?? ""}
//     onChange={handleEditOrgChange}
//     fullWidth
//     size="small"
//   >
//     <MenuItem value="">Select organization</MenuItem>
//     {Organizations.map((org) => (
//       <MenuItem key={org._id ?? org.id} value={org._id ?? org.id}>
//         {org.name ?? org._id ?? org.id}
//       </MenuItem>
//     ))}
//   </Select>
// </FormControl>

// {/* Venue Select */}
// <FormControl sx={{ width: "83%" }} error={!!formErrors.venueId}>
//   <InputLabel id="venue-select-label">Venue</InputLabel>
//   <Select
//     labelId="venue-select-label"
//     label="Venue"
//     value={editForm.venueId ?? ""}
//     onChange={handleEditChange("venueId")}
//     fullWidth
//     size="small"
//   >
//     <MenuItem value="">Select venue</MenuItem>

//     {/*
//       compute available venues for currently selected org (from venuesByOrg cache)
//       and if current venue not present, show it at top so the preselected venue appears.
//     */}
//     {(() => {
//       const orgId = editForm.organization;
//       const available = orgId ? (venuesByOrg[orgId] || []) : Venues || [];
//       // ensure currentVenue (editForm.venueId) is included even if not loaded yet:
//       const merged = Array.isArray(available) ? [...available] : [];
//       const currentVenueId = editForm.venueId;
//       if (currentVenueId && !merged.find((v) => String(v._id ?? v.id) === String(currentVenueId))) {
//         // try to create a simple entry from Venues global or use a placeholder name:
//         const fromGlobal = (Venues || []).find((v) => String(v._id ?? v.id) === String(currentVenueId));
//         if (fromGlobal) merged.unshift(fromGlobal);
//         else merged.unshift({ _id: currentVenueId, name: "Current venue" });
//       }

//       return merged.map((v) => (
//         <MenuItem key={v._id ?? v.id} value={v._id ?? v.id}>
//           {v.name ?? v._id ?? v.id}
//         </MenuItem>
//       ));
//     })()}
//   </Select>
//   {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
// </FormControl>


            
//             {/* Temperature row */}
//             <Grid container spacing={1} alignItems="center" sx={{ width: "83%" }}>
//               <Grid item xs="auto" sm={3}>
//                 <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
//                   <InputLabel id="temp-op-label">Op</InputLabel>
//                   <Select
//                     labelId="temp-op-label"
//                     value={editForm.temperatureOp}
//                     label="Op"
//                     onChange={handleEditChange("temperatureOp")}
//                     sx={{ width: "100%" }}
//                     size="small"
//                   >
//                     <MenuItem value=">">&gt;</MenuItem>
//                     <MenuItem value="<">&lt;</MenuItem>
               
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs>
//                 <TextField
//                   label="Temperature"
//                   type="number"
//                   inputProps={{ step: 0.1 }}
//                   value={editForm.temperatureVal}
//                   onChange={handleEditChange("temperatureVal")}
//                   fullWidth
//                   error={!!formErrors.temperatureVal}
//                   helperText={formErrors.temperatureVal}
//                   size="small"
//                   sx={{
//                     maxWidth: { xs: 120, sm: "100%" },
//                     "& .MuiInputBase-root": { height: 36 },
//                   }}
//                 />
//               </Grid>
//             </Grid>
                



//             {/* Humidity row */}
//             <Grid container spacing={1} alignItems="center" sx={{ mt: 1, width: "83%" }}>
//               <Grid item xs="auto" sm={3}>
//                 <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
//                   <InputLabel id="hum-op-label">Op</InputLabel>
//                   <Select
//                     labelId="hum-op-label"
//                     value={editForm.humidityOp}
//                     label="Op"
//                     onChange={handleEditChange("humidityOp")}
//                     sx={{ width: "100%" }}
//                     size="small"
//                   >
//                     <MenuItem value=">">&gt;</MenuItem>
//                     <MenuItem value="<">&lt;</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs>
//                 <TextField
//                   label="Humidity (%)"
//                   type="number"
//                   inputProps={{ step: 0.1 }}
//                   value={editForm.humidityVal}
//                   onChange={handleEditChange("humidityVal")}
//                   fullWidth
//                   error={!!formErrors.humidityVal}
//                   helperText={formErrors.humidityVal}
//                   size="small"
//                   sx={{
//                     maxWidth: { xs: 120, sm: "100%" },
//                     "& .MuiInputBase-root": { height: 36 },
//                   }}
//                 />
//               </Grid>
//             </Grid>

//                         {/* API Key display (compact) */}
//           {editForm.apiKey ? (
//             <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-5 w-full">
//               <div className="flex items-start justify-between gap-3">
//                 <div className="flex-1 min-w-0">
//                   <div className="font-semibold text-sm">API Key:</div>
//                   <div
//                     className="mt-2 text-sm font-mono truncate"
//                     title={editForm.apiKey}
//                     style={{ maxWidth: "100%" }}
//                   >
//                     {/* show truncated key; full key is visible on hover via title */}
//                     {editForm.apiKey ? `${String(editForm.apiKey).slice(0, 20)}...` : ""}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   {/* Copy icon/button */}
//                   <button
//                     onClick={()=>handleCopyApiKey(editForm?.apiKey)}
//                     className="p-1 rounded hover:bg-gray-100 border border-transparent"
//                     title="Copy API key"
//                     type="button"
//                   >
//                     <img src="/copyicon.svg" alt="Copy API KEY Icon" className="w-[20px] h-[20px]" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : null}


//           </Stack>

//         </DialogContent>

//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button onClick={handleEditCancel} disabled={working}>Cancel</Button>
//           <Button variant="contained" onClick={handleEditSave} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
//         <DialogTitle>Delete {deleteTarget.name ? `"${deleteTarget.name}"` : "device"}?</DialogTitle>
//         <DialogContent dividers>This action cannot be undone.</DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteCancel} disabled={working}>Cancel</Button>
//           <Button variant="contained" color="error" onClick={handleDeleteConfirm} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>
//             Yes, delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default DeviceList;





















// // src/pages/management/DeviceList.jsx
// import { Pencil, Trash, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   CircularProgress,
//   FormHelperText,
//   Stack,
//   IconButton,
//   Drawer,
//   useMediaQuery,
//   Box,
//   ToggleButton,
//   ToggleButtonGroup,
//   Chip,
//   Typography,
// } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import Swal from "sweetalert2";
// import { fetchAllDevices, updateDevice, deleteDevice } from "../../slices/DeviceSlice";
// import "../../styles/pages/management-pages.css";
// import TableSkeleton from "../../components/skeletons/TableSkeleton";
// import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
// import { fetchVenuesByOrganization } from "../../slices/VenueSlice";

// const DEVICE_TYPE_META = {
//   "": { label: "All", color: "default" },
//   OMD: { label: "Odour (OMD)", color: "warning" },
//   TMD: { label: "Temperature (TMD)", color: "primary" },
//   AQIMD: { label: "Air Quality (AQIMD)", color: "success" },
//   GLMD: { label: "Leakage (GLMD)", color: "error" },
// };

// const DeviceList = ({ onDeviceSelect, selectedDevice }) => {
//   const dispatch = useDispatch();
//   const { DeviceArray = [], isLoading, error } = useSelector((state) => state.Device || {});
//   const { Venues = [] } = useSelector((state) => state.Venue || {});
//   const { Organizations = [], isLoading: orgsLoading } = useSelector((s) => s.Organization || {});
//   const { venuesByOrg = {}, loading: venueLoading, error: venueError } = useSelector((s) => s.Venue || {});

//   const [working, setWorking] = useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isMobile = !isDesktop;
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Edit dialog state
//   const [editOpen, setEditOpen] = useState(false);
//   const [editingDeviceId, setEditingDeviceId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     deviceId: "",
//     organization: "",
//     venueId: "",
//     temperatureOp: ">",
//     temperatureVal: "",
//     humidityOp: ">",
//     humidityVal: "",
//     apiKey: "",
//   });
//   const [formErrors, setFormErrors] = useState({});

//   // Delete confirm
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" });

//   // Device type filter state
//   const [typeFilter, setTypeFilter] = useState(""); // "" = all

//   useEffect(() => {
//     dispatch(fetchAllDevices());
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) console.error("Device error:", error);
//   }, [error]);

//   // Helpers
//   const findCondition = (conditionsArray = [], wantedType) => {
//     if (!Array.isArray(conditionsArray)) return undefined;
//     return conditionsArray.find((c) => c.type === wantedType);
//   };

//   const openDeleteConfirm = (id, displayName) => {
//     setDeleteTarget({ id, name: displayName });
//     setDeleteOpen(true);
//   };
//   const handleDeleteCancel = () => {
//     setDeleteOpen(false);
//     setDeleteTarget({ id: null, name: "" });
//   };
//   const handleDeleteConfirm = async () => {
//     const id = deleteTarget.id;
//     setDeleteOpen(false);
//     if (!id) return;
//     try {
//       setWorking(true);
//       await dispatch(deleteDevice(id)).unwrap();
//       Swal.fire({ icon: "success", title: "Deleted", text: "Device deleted.", timer: 1400, showConfirmButton: false });
//       dispatch(fetchAllDevices());
//       if (isMobile) setDrawerOpen(false);
//     } catch (err) {
//       console.error("Delete device error:", err);
//       Swal.fire({ icon: "error", title: "Delete failed", text: String(err) || "Delete failed" });
//     } finally {
//       setWorking(false);
//       setDeleteTarget({ id: null, name: "" });
//     }
//   };

//   // Edit flows (kept your logic; we only ensure venue list is fetched)
//   const handleEdit = (device) => {
//     const currentDeviceId = device.deviceId || "";
//     const currentVenueObj = device.venue && typeof device.venue === "object" ? device.venue : null;
//     const currentVenueId = currentVenueObj?._id ?? device.venue ?? "";
//     const currentOrgId = currentVenueObj?.organization?._id ?? currentVenueObj?.organization ?? "";

//     const temperatureCond = findCondition(device.conditions, "temperature") || {};
//     const humidityCond = findCondition(device.conditions, "humidity") || {};

//     setEditingDeviceId(device._id ?? device.id ?? null);
//     setEditForm({
//       deviceId: currentDeviceId,
//       organization: currentOrgId,
//       venueId: currentVenueId,
//       temperatureOp: temperatureCond.operator ?? ">",
//       temperatureVal: temperatureCond.value === undefined || temperatureCond.value === null ? "" : String(temperatureCond.value),
//       humidityOp: humidityCond.operator ?? ">",
//       humidityVal: humidityCond.value === undefined || humidityCond.value === null ? "" : String(humidityCond.value),
//       apiKey: device.apiKey ?? device?.apiKey ?? "",
//     });
//     setFormErrors({});
//     if (currentOrgId) dispatch(fetchVenuesByOrganization(currentOrgId));
//     setEditOpen(true);
//   };

//   const handleEditOrgChange = (e) => {
//     const newOrgId = e.target.value;
//     setEditForm((s) => ({ ...s, organization: newOrgId, venueId: "" }));
//     setFormErrors((s) => ({ ...s, organization: undefined, venueId: undefined }));
//     if (newOrgId) dispatch(fetchVenuesByOrganization(newOrgId));
//   };
//   const handleEditChange = (field) => (e) => {
//     const v = e?.target?.value ?? "";
//     setEditForm((s) => ({ ...s, [field]: v }));
//     setFormErrors((s) => ({ ...s, [field]: undefined }));
//   };
//   const handleEditCancel = () => {
//     setEditOpen(false);
//     setFormErrors({});
//     setEditingDeviceId(null);
//   };

//   const handleEditSave = async () => {
//     const { deviceId, venueId, temperatureOp, temperatureVal, humidityOp, humidityVal } = editForm;
//     const errors = {};
//     if (!deviceId || !deviceId.toString().trim()) errors.deviceId = "Device ID is required";
//     if (!venueId) errors.venueId = "Venue is required";
//     if (temperatureVal !== "" && Number.isNaN(Number(temperatureVal))) errors.temperatureVal = "Must be a number";
//     if (humidityVal !== "" && Number.isNaN(Number(humidityVal))) errors.humidityVal = "Must be a number";
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     const validOps = [">", "<"];
//     const conditionsToSend = [];
//     if (temperatureVal !== "") {
//       if (!validOps.includes(temperatureOp)) { setFormErrors({ temperatureOp: "Invalid operator" }); return; }
//       conditionsToSend.push({ type: "temperature", operator: temperatureOp, value: Number(temperatureVal) });
//     }
//     if (humidityVal !== "") {
//       if (!validOps.includes(humidityOp)) { setFormErrors({ humidityOp: "Invalid operator" }); return; }
//       conditionsToSend.push({ type: "humidity", operator: humidityOp, value: Number(humidityVal) });
//     }

//     try {
//       setWorking(true);
//       const res = await dispatch(updateDevice({
//         id: editingDeviceId,
//         deviceId: deviceId.toString().trim(),
//         venueId,
//         conditions: conditionsToSend,
//       })).unwrap();

//       // check for possible new API key
//       const apiKeyFromRes = res?.apiKey ?? res?.newApiKey ?? res?.device?.apiKey ?? null;
//       const newApiKeyGenerated = Boolean(res?.newApiKeyGenerated) || (typeof res?.message === "string" && res.message.toLowerCase().includes("new api key"));

//       if (newApiKeyGenerated && apiKeyFromRes) {
//         setEditForm((s) => ({ ...s, apiKey: apiKeyFromRes }));
//         const swalResult = await Swal.fire({
//           icon: "warning",
//           title: "New API key generated!",
//           html: `<p>Please reconfigure your device to use the new API key:</p>
//                  <pre style="white-space:break-spaces; background:#f6f6f6; padding:8px; border-radius:6px;">${apiKeyFromRes}</pre>`,
//           showCancelButton: true,
//           confirmButtonText: "Copy key",
//         });
//         if (swalResult.isConfirmed) {
//           try { await navigator.clipboard.writeText(apiKeyFromRes); await Swal.fire({ icon: "success", title: "Copied", timer: 1400, showConfirmButton: false }); }
//           catch { await Swal.fire({ icon: "info", title: "Copy failed", text: "Please copy manually." }); }
//         }
//         dispatch(fetchAllDevices());
//         if (isMobile) setDrawerOpen(false);
//         setWorking(false);
//         return;
//       }

//       Swal.fire({ icon: "success", title: "Saved", text: "Device updated.", timer: 1400, showConfirmButton: false });
//       setEditOpen(false);
//       dispatch(fetchAllDevices());
//       if (isMobile) setDrawerOpen(false);
//     } catch (err) {
//       console.error("Update device error:", err);
//       Swal.fire({ icon: "error", title: "Update failed", text: String(err) || "Update failed" });
//     } finally {
//       setWorking(false);
//     }
//   };

//   const handleCopyApiKey = (apiKey) => {
//     if (!apiKey) return;
//     navigator.clipboard.writeText(apiKey)
//       .then(() => Swal.fire({ icon: "success", title: "Copied!", timer: 1200, showConfirmButton: false }))
//       .catch(() => Swal.fire({ icon: "error", title: "Copy failed" }));
//   };

//   // Filtering logic: in-memory filter by deviceType
//   const rawDevices = DeviceArray || [];
//   const filteredDevices = (typeFilter && typeFilter !== "")
//     ? rawDevices.filter((d) => String(d?.deviceType ?? "") === String(typeFilter))
//     : rawDevices;

//   // UI: toggle/select handler
//   const handleTypeFilterToggle = (_, newVal) => {
//     // ToggleButtonGroup returns array when multiple; we only want single selection
//     setTypeFilter(newVal ?? "");
//   };
//   const handleTypeFilterSelect = (e) => {
//     setTypeFilter(e.target.value ?? "");
//   };

//   // Render
//   const renderListMarkup = () => (
//     <div className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] p-4">
//       <div className="flex items-center justify-between gap-3 mb-3">
//         <div className="flex items-center gap-3">
//           <Typography variant="h6" component="div">Device List</Typography>

//           {/* Desktop: Toggle pill group */}
        
//             {/* /* Mobile: Select for compactness */}
//             <FormControl size="small" sx={{ minWidth: 140 }}>
//               <Select value={typeFilter} onChange={handleTypeFilterSelect}>
//                 {Object.entries(DEVICE_TYPE_META).map(([val, meta]) => (
//                   <MenuItem key={val} value={val}>
//                     {meta.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
        
//         </div>

//         <div>
//           <Button size="small" onClick={() => { dispatch(fetchAllDevices()); }}>
//             Refresh
//           </Button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 font-bold text-gray-800">Device ID</th>
//               <th className="py-2 px-4 text-center">Type</th>
//               <th className="py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//         </table>

//         <div className="pr-1 user-table-scroll md:h-[50vh] h-[60vh]">
//           <table className="w-full table-auto text-left overflow-y-auto">
//             <tbody>
//               {isLoading && <TableSkeleton />}

//               {!isLoading && filteredDevices.map((d, idx) => {
//                 const id = d._id ?? idx;
//                 const deviceIdDisplay = d.deviceId ?? `Device ${idx + 1}`;
//                 const dtype = String(d.deviceType ?? "");
//                 const meta = DEVICE_TYPE_META[dtype] ?? { label: dtype || "N/A", color: "default" };

//                 return (
//                   <tr
//                     key={id}
//                     className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${
//                       selectedDevice?._id === id || selectedDevice?.id === id ? "bg-blue-50 border-blue-300" : ""
//                     }`}
//                     onClick={(e) => { e.stopPropagation(); onDeviceSelect?.(d); if (isMobile) setDrawerOpen(false); }}
//                   >
//                     <td className="py-2 sm:py-3 px-2 sm:px-4">{deviceIdDisplay}</td>

//                     <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                       <Chip label={meta.label} size="small" color={meta.color === "default" ? undefined : meta.color} />
//                     </td>

//                     <td className="py-2 sm:py-3 px-2 sm:px-4">
//                       <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
//                         <button
//                           onClick={() => handleEdit(d)}
//                           className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-2 cursor-pointer"
//                           disabled={working}
//                           title="Edit"
//                         >
//                           <Pencil className="text-green-600" size={16} />
//                         </button>
//                         <button
//                           onClick={() => openDeleteConfirm(id, deviceIdDisplay)}
//                           className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-2 cursor-pointer"
//                           disabled={working}
//                           title="Delete"
//                         >
//                           <Trash className="text-red-600" size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}

//               {!isLoading && filteredDevices.length === 0 && (
//                 <tr><td colSpan={3} className="p-4 text-center text-gray-500">No devices found.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   // main return (desktop vs mobile)
//   return (
//     <>
//       {isDesktop ? (
//         renderListMarkup()
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <img src="/logo-half.png" className="w-auto h-[30px]" />
//             <h1 className="device-list-title font-semibold text-gray-800">Device Management</h1>
//             <IconButton size="small" onClick={() => setDrawerOpen(true)}><Menu size={20} /></IconButton>
//           </div>

//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
//             <div className="p-4">{renderListMarkup()}</div>
//           </Drawer>
//         </>
//       )}

//       {/* Edit Dialog (unchanged layout) */}
//       <Dialog open={editOpen} onClose={handleEditCancel} maxWidth="xs" fullWidth>
//         <DialogTitle>Edit Device</DialogTitle>
//         <DialogContent dividers>
//           <Stack spacing={2} alignItems="center" justifyContent="center">
//             <FormControl sx={{ width: "83%" }} error={!!formErrors.deviceId}>
//               <TextField label="Device ID" value={editForm.deviceId} fullWidth error={!!formErrors.deviceId}
//                 helperText={formErrors.deviceId} onChange={(e) => setEditForm({ ...editForm, deviceId: e.target.value })} size="small" />
//             </FormControl>

//             <FormControl sx={{ width: "83%" }}>
//               <InputLabel id="org-select-label">Organization</InputLabel>
//               <Select labelId="org-select-label" label="Organization" value={editForm.organization ?? ""} onChange={handleEditOrgChange} fullWidth size="small">
//                 <MenuItem value="">Select organization</MenuItem>
//                 {Organizations.map((org) => <MenuItem key={org._id ?? org.id} value={org._id ?? org.id}>{org.name}</MenuItem>)}
//               </Select>
//             </FormControl>

//             <FormControl sx={{ width: "83%" }} error={!!formErrors.venueId}>
//               <InputLabel id="venue-select-label">Venue</InputLabel>
//               <Select labelId="venue-select-label" label="Venue" value={editForm.venueId ?? ""} onChange={handleEditChange("venueId")} fullWidth size="small">
//                 <MenuItem value="">Select venue</MenuItem>
//                 {(() => {
//                   const orgId = editForm.organization;
//                   const available = orgId ? (venuesByOrg[orgId] || []) : Venues || [];
//                   const merged = Array.isArray(available) ? [...available] : [];
//                   const currentVenueId = editForm.venueId;
//                   if (currentVenueId && !merged.find((v) => String(v._id ?? v.id) === String(currentVenueId))) {
//                     const fromGlobal = (Venues || []).find((v) => String(v._id ?? v.id) === String(currentVenueId));
//                     if (fromGlobal) merged.unshift(fromGlobal);
//                     else merged.unshift({ _id: currentVenueId, name: "Current venue" });
//                   }
//                   return merged.map((v) => <MenuItem key={v._id ?? v.id} value={v._id ?? v.id}>{v.name}</MenuItem>);
//                 })()}
//               </Select>
//               {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
//             </FormControl>

//             <Grid container spacing={1} alignItems="center" sx={{ width: "83%" }}>
//               <Grid item xs="auto" sm={3}>
//                 <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
//                   <InputLabel id="temp-op-label">Op</InputLabel>
//                   <Select labelId="temp-op-label" value={editForm.temperatureOp} label="Op" onChange={handleEditChange("temperatureOp")} size="small">
//                     <MenuItem value=">">&gt;</MenuItem>
//                     <MenuItem value="<">&lt;</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs>
//                 <TextField label="Temperature" type="number" inputProps={{ step: 0.1 }} value={editForm.temperatureVal}
//                   onChange={handleEditChange("temperatureVal")} fullWidth error={!!formErrors.temperatureVal}
//                   helperText={formErrors.temperatureVal} size="small" sx={{ maxWidth: { xs: 120, sm: "100%" }, "& .MuiInputBase-root": { height: 36 } }} />
//               </Grid>
//             </Grid>

//             <Grid container spacing={1} alignItems="center" sx={{ mt: 1, width: "83%" }}>
//               <Grid item xs="auto" sm={3}>
//                 <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
//                   <InputLabel id="hum-op-label">Op</InputLabel>
//                   <Select labelId="hum-op-label" value={editForm.humidityOp} label="Op" onChange={handleEditChange("humidityOp")} size="small">
//                     <MenuItem value=">">&gt;</MenuItem>
//                     <MenuItem value="<">&lt;</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs>
//                 <TextField label="Humidity (%)" type="number" inputProps={{ step: 0.1 }} value={editForm.humidityVal}
//                   onChange={handleEditChange("humidityVal")} fullWidth error={!!formErrors.humidityVal}
//                   helperText={formErrors.humidityVal} size="small" sx={{ maxWidth: { xs: 120, sm: "100%" }, "& .MuiInputBase-root": { height: 36 } }} />
//               </Grid>
//             </Grid>

//             {editForm.apiKey ? (
//               <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-5 w-full">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1 min-w-0">
//                     <div className="font-semibold text-sm">API Key:</div>
//                     <div className="mt-2 text-sm font-mono truncate" title={editForm.apiKey}>{editForm.apiKey ? `${String(editForm.apiKey).slice(0, 20)}...` : ""}</div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => handleCopyApiKey(editForm?.apiKey)} className="p-1 rounded hover:bg-gray-100 border border-transparent" title="Copy API key" type="button">
//                       <img src="/copyicon.svg" alt="Copy API KEY Icon" className="w-[20px] h-[20px]" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : null}
//           </Stack>
//         </DialogContent>

//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button onClick={handleEditCancel} disabled={working}>Cancel</Button>
//           <Button variant="contained" onClick={handleEditSave} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
//         <DialogTitle>Delete {deleteTarget.name ? `"${deleteTarget.name}"` : "device"}?</DialogTitle>
//         <DialogContent dividers>This action cannot be undone.</DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteCancel} disabled={working}>Cancel</Button>
//           <Button variant="contained" color="error" onClick={handleDeleteConfirm} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>Yes, delete</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default DeviceList;





















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
  Chip,
  Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";
import { fetchAllDevices, updateDevice, deleteDevice } from "../../slices/DeviceSlice";
import "../../styles/pages/management-pages.css";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
import { fetchVenuesByOrganization } from "../../slices/VenueSlice";

const DEVICE_TYPE_META = {
  "": { label: "All", color: "default" },
  OMD: { label: "Odour (OMD)", color: "warning" },
  TMD: { label: "Temperature (TMD)", color: "primary" },
  AQIMD: { label: "Air Quality (AQIMD)", color: "success" },
  GLMD: { label: "Leakage (GLMD)", color: "error" },
};

export default function DeviceList({ onDeviceSelect, selectedDevice }) {
  const dispatch = useDispatch();
  const { DeviceArray = [], isLoading, error } = useSelector((state) => state.Device || {});
  const { Venues = [] } = useSelector((state) => state.Venue || {});
  const { Organizations = [], isLoading: orgsLoading } = useSelector((s) => s.Organization || {});
  const { venuesByOrg = {}, loading: venueLoading, error: venueError } = useSelector((s) => s.Venue || {});

  const [working, setWorking] = useState(false);
  const isDesktop = useMediaQuery("(min-width:768px)");
  const isMobile = !isDesktop;
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [editForm, setEditForm] = useState({
    deviceId: "",
    deviceType: "TMD", // default to TMD
    organization: "",
    venueId: "",
    // temperature & humidity common
    temperatureOp: ">",
    temperatureVal: "",
    humidityOp: ">",
    humidityVal: "",
    // extra fields (type-specific)
    odourOp: ">",
    odourVal: "",
    aqiOp: ">",
    aqiVal: "",
    gassOp: ">",
    gassVal: "",
    apiKey: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete confirm
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" });

  // Device type filter
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAllDevices());
    dispatch(fetchAllOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (error) console.error("Device error:", error);
  }, [error]);

  // helpers
  const findCondition = (conditionsArray = [], wantedType) => {
    if (!Array.isArray(conditionsArray)) return undefined;
    return conditionsArray.find((c) => c.type === wantedType);
  };

  // delete flows
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
      Swal.fire({ icon: "success", title: "Deleted", text: "Device deleted.", timer: 1400, showConfirmButton: false });
      dispatch(fetchAllDevices());
      if (isMobile) setDrawerOpen(false);
    } catch (err) {
      console.error("Delete device error:", err);
      Swal.fire({ icon: "error", title: "Delete failed", text: String(err) || "Delete failed" });
    } finally {
      setWorking(false);
      setDeleteTarget({ id: null, name: "" });
    }
  };

  // Edit flow - populate fields from backend device
  const handleEdit = (device) => {
    const currentDeviceId = device.deviceId || "";
    const currentVenueObj = device.venue && typeof device.venue === "object" ? device.venue : null;
    const currentVenueId = currentVenueObj?._id ?? device.venue ?? "";
    const currentOrgId = currentVenueObj?.organization?._id ?? currentVenueObj?.organization ?? "";

    // deviceType from backend
    const currentType = device.deviceType ?? "TMD";

    // common conditions
    const temperatureCond = findCondition(device.conditions, "temperature") || {};
    const humidityCond = findCondition(device.conditions, "humidity") || {};

    // extra conditions
    const odourCond = findCondition(device.conditions, "odour") || {};
    const aqiCond = findCondition(device.conditions, "AQI") || {};
    const gassCond = findCondition(device.conditions, "gass") || {};

    setEditingDeviceId(device._id ?? device.id ?? null);
    setEditForm((s) => ({
      ...s,
      deviceId: currentDeviceId,
      deviceType: currentType,
      organization: currentOrgId,
      venueId: currentVenueId,
      temperatureOp: temperatureCond.operator ?? ">",
      temperatureVal: temperatureCond.value === undefined || temperatureCond.value === null ? "" : String(temperatureCond.value),
      humidityOp: humidityCond.operator ?? ">",
      humidityVal: humidityCond.value === undefined || humidityCond.value === null ? "" : String(humidityCond.value),
      odourOp: odourCond.operator ?? ">",
      odourVal: odourCond.value === undefined || odourCond.value === null ? "" : String(odourCond.value),
      aqiOp: aqiCond.operator ?? ">",
      aqiVal: aqiCond.value === undefined || aqiCond.value === null ? "" : String(aqiCond.value),
      gassOp: gassCond.operator ?? ">",
      gassVal: gassCond.value === undefined || gassCond.value === null ? "" : String(gassCond.value),
      apiKey: device.apiKey ?? device?.apiKey ?? "",
    }));
    setFormErrors({});
    if (currentOrgId) dispatch(fetchVenuesByOrganization(currentOrgId));
    setEditOpen(true);
  };

  const handleEditOrgChange = (e) => {
    const newOrgId = e.target.value;
    setEditForm((s) => ({ ...s, organization: newOrgId, venueId: "" }));
    setFormErrors((s) => ({ ...s, organization: undefined, venueId: undefined }));
    if (newOrgId) dispatch(fetchVenuesByOrganization(newOrgId));
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

  // Save handler now includes per-type conditions and optional deviceType change
  const handleEditSave = async () => {
    const {
      deviceId,
      venueId,
      deviceType,
      temperatureOp,
      temperatureVal,
      humidityOp,
      humidityVal,
      odourOp,
      odourVal,
      aqiOp,
      aqiVal,
      gassOp,
      gassVal,
    } = editForm;

    const errors = {};
    if (!deviceId || !deviceId.toString().trim()) errors.deviceId = "Device ID is required";
    if (!venueId) errors.venueId = "Venue is required";

    const numericChecks = [
      { key: "temperatureVal", val: temperatureVal },
      { key: "humidityVal", val: humidityVal },
      { key: "odourVal", val: odourVal },
      { key: "aqiVal", val: aqiVal },
      { key: "gassVal", val: gassVal },
    ];
    numericChecks.forEach((c) => {
      if (c.val !== "" && Number.isNaN(Number(c.val))) errors[c.key] = "Must be a number";
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const validOps = [">", "<"];
    const conditionsToSend = [];

    // temperature (always available for all devices)
    if (temperatureVal !== "") {
      if (!validOps.includes(temperatureOp)) { setFormErrors({ temperatureOp: "Invalid operator" }); return; }
      conditionsToSend.push({ type: "temperature", operator: temperatureOp, value: Number(temperatureVal) });
    }

    // humidity (always available)
    if (humidityVal !== "") {
      if (!validOps.includes(humidityOp)) { setFormErrors({ humidityOp: "Invalid operator" }); return; }
      conditionsToSend.push({ type: "humidity", operator: humidityOp, value: Number(humidityVal) });
    }

    // per-type extra conditions
    if (deviceType === "OMD") {
      if (odourVal !== "") {
        if (!validOps.includes(odourOp)) { setFormErrors({ odourOp: "Invalid operator" }); return; }
        conditionsToSend.push({ type: "odour", operator: odourOp, value: Number(odourVal) });
      } else {
        // OMD requires odour condition — you can decide to enforce strictly; here we just warn if missing
        // If you want to enforce: uncomment next lines
        // setFormErrors({ odourVal: "Odour value is required for OMD" });
        // return;
      }
    } else if (deviceType === "AQIMD") {
      if (aqiVal !== "") {
        if (!validOps.includes(aqiOp)) { setFormErrors({ aqiOp: "Invalid operator" }); return; }
        conditionsToSend.push({ type: "AQI", operator: aqiOp, value: Number(aqiVal) });
      }
    } else if (deviceType === "GLMD") {
      if (gassVal !== "") {
        if (!validOps.includes(gassOp)) { setFormErrors({ gassOp: "Invalid operator" }); return; }
        conditionsToSend.push({ type: "gass", operator: gassOp, value: Number(gassVal) });
      }
    }

    try {
      setWorking(true);

      // send deviceType too (so backend can change type if allowed)
      const payload = {
        id: editingDeviceId,
        deviceId: deviceId.toString().trim(),
        venueId,
        deviceType, // optional - backend should accept/ignore if not supported
        conditions: conditionsToSend,
      };

      const res = await dispatch(updateDevice(payload)).unwrap();

      const apiKeyFromRes = res?.apiKey ?? res?.newApiKey ?? res?.device?.apiKey ?? null;
      const newApiKeyGenerated = Boolean(res?.newApiKeyGenerated) || (typeof res?.message === "string" && res.message.toLowerCase().includes("new api key"));

      if (newApiKeyGenerated && apiKeyFromRes) {
        setEditForm((s) => ({ ...s, apiKey: apiKeyFromRes }));
        const swalResult = await Swal.fire({
          icon: "warning",
          title: "New API key generated!",
          html: `<p>Please reconfigure your device to use the new API key:</p>
                 <pre style="white-space:break-spaces; background:#f6f6f6; padding:8px; border-radius:6px;">${apiKeyFromRes}</pre>`,
          showCancelButton: true,
          confirmButtonText: "Copy key",
        });
        if (swalResult.isConfirmed) {
          try { await navigator.clipboard.writeText(apiKeyFromRes); await Swal.fire({ icon: "success", title: "Copied", timer: 1400, showConfirmButton: false }); }
          catch { await Swal.fire({ icon: "info", title: "Copy failed", text: "Please copy manually." }); }
        }
        dispatch(fetchAllDevices());
        if (isMobile) setDrawerOpen(false);
        setWorking(false);
        return;
      }

      Swal.fire({ icon: "success", title: "Saved", text: "Device updated.", timer: 1400, showConfirmButton: false });
      setEditOpen(false);
      dispatch(fetchAllDevices());
      if (isMobile) setDrawerOpen(false);
    } catch (err) {
      console.error("Update device error:", err);
      Swal.fire({ icon: "error", title: "Update failed", text: String(err) || "Update failed" });
    } finally {
      setWorking(false);
    }
  };

  const handleCopyApiKey = (apiKey) => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey)
      .then(() => Swal.fire({ icon: "success", title: "Copied!", timer: 1200, showConfirmButton: false }))
      .catch(() => Swal.fire({ icon: "error", title: "Copy failed" }));
  };

  // Filtering logic
  const rawDevices = DeviceArray || [];
  const filteredDevices = (typeFilter && typeFilter !== "")
    ? rawDevices.filter((d) => String(d?.deviceType ?? "") === String(typeFilter))
    : rawDevices;

  const handleTypeFilterSelect = (e) => setTypeFilter(e.target.value ?? "");

  // UI render
  const renderListMarkup = () => (
    <div className="ListPage device-list-container bg-white rounded-xl shadow-sm w-full h-full border border-[#E5E7EB] p-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <Typography variant="h6" component="div">Device List</Typography>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select value={typeFilter} onChange={handleTypeFilterSelect}>
              {Object.entries(DEVICE_TYPE_META).map(([val, meta]) => (
                <MenuItem key={val} value={val}>{meta.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button size="small" onClick={() => { dispatch(fetchAllDevices()); }}>Refresh</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 font-bold text-gray-800">Device ID</th>
              <th className="py-2 px-4 text-center">Type</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
        </table>

        <div className="pr-1 user-table-scroll md:h-[50vh] h-[60vh]">
          <table className="w-full table-auto text-left overflow-y-auto">
            <tbody>
              {isLoading && <TableSkeleton />}
              {!isLoading && filteredDevices.map((d, idx) => {
                const id = d._id ?? idx;
                const deviceIdDisplay = d.deviceId ?? `Device ${idx + 1}`;
                const dtype = String(d.deviceType ?? "");
                const meta = DEVICE_TYPE_META[dtype] ?? { label: dtype || "N/A", color: "default" };

                return (
                  <tr
                    key={id}
                    className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-blue-50/60 ${selectedDevice?._id === id || selectedDevice?.id === id ? "bg-blue-50 border-blue-300" : ""}`}
                    onClick={(e) => { e.stopPropagation(); onDeviceSelect?.(d); if (isMobile) setDrawerOpen(false); }}
                  >
                    <td className="py-2 sm:py-3 px-2 sm:px-4">{deviceIdDisplay}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                      <Chip label={meta.label} size="small" color={meta.color === "default" ? undefined : meta.color} />
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <div className="flex justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleEdit(d)} className="rounded-full border border-green-500/50 bg-white flex items-center justify-center hover:bg-green-50 p-2 cursor-pointer" disabled={working} title="Edit">
                          <Pencil className="text-green-600" size={16} />
                        </button>
                        <button onClick={() => openDeleteConfirm(id, deviceIdDisplay)} className="rounded-full border border-red-500/50 bg-white flex items-center justify-center hover:bg-red-50 p-2 cursor-pointer" disabled={working} title="Delete">
                          <Trash className="text-red-600" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!isLoading && filteredDevices.length === 0 && <tr><td colSpan={3} className="p-4 text-center text-gray-500">No devices found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isDesktop ? renderListMarkup() : (
        <>
          <div className="flex items-center justify-between mb-4">
            <img src="/logo-half.png" className="w-auto h-[30px]" />
            <h1 className="device-list-title font-semibold text-gray-800">Device Management</h1>
            <IconButton size="small" onClick={() => setDrawerOpen(true)}><Menu size={20} /></IconButton>
          </div>
          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ style: { width: "100%" } }}>
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

            {/* Device Type select (shows current type and allows change) */}
            <FormControl sx={{ width: "83%" }}>
              <InputLabel id="device-type-label">Device Type</InputLabel>
              <Select
                labelId="device-type-label"
                label="Device Type"
                value={editForm.deviceType ?? "TMD"}
                onChange={(e) => setEditForm((s) => ({ ...s, deviceType: e.target.value }))}
                size="small"
              >
                <MenuItem value="TMD">Temperature (TMD)</MenuItem>
                <MenuItem value="OMD">Odour (OMD)</MenuItem>
                <MenuItem value="AQIMD">Air Quality (AQIMD)</MenuItem>
                <MenuItem value="GLMD">Leakage (GLMD)</MenuItem>
              </Select>
            </FormControl>

            {/* Organization & Venue */}
            <FormControl sx={{ width: "83%" }}>
              <InputLabel id="org-select-label">Organization</InputLabel>
              <Select labelId="org-select-label" label="Organization" value={editForm.organization ?? ""} onChange={handleEditOrgChange} fullWidth size="small">
                <MenuItem value="">Select organization</MenuItem>
                {Organizations.map((org) => <MenuItem key={org._id ?? org.id} value={org._id ?? org.id}>{org.name}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl sx={{ width: "83%" }} error={!!formErrors.venueId}>
              <InputLabel id="venue-select-label">Venue</InputLabel>
              <Select labelId="venue-select-label" label="Venue" value={editForm.venueId ?? ""} onChange={handleEditChange("venueId")} fullWidth size="small">
                <MenuItem value="">Select venue</MenuItem>
                {(() => {
                  const orgId = editForm.organization;
                  const available = orgId ? (venuesByOrg[orgId] || []) : Venues || [];
                  const merged = Array.isArray(available) ? [...available] : [];
                  const currentVenueId = editForm.venueId;
                  if (currentVenueId && !merged.find((v) => String(v._id ?? v.id) === String(currentVenueId))) {
                    const fromGlobal = (Venues || []).find((v) => String(v._id ?? v.id) === String(currentVenueId));
                    if (fromGlobal) merged.unshift(fromGlobal);
                    else merged.unshift({ _id: currentVenueId, name: "Current venue" });
                  }
                  return merged.map((v) => <MenuItem key={v._id ?? v.id} value={v._id ?? v.id}>{v.name}</MenuItem>);
                })()}
              </Select>
              {formErrors.venueId && <FormHelperText>{formErrors.venueId}</FormHelperText>}
            </FormControl>

            {/* Temperature */}
            <Grid container spacing={1} alignItems="center" sx={{ width: "83%" }}>
              <Grid item xs="auto" sm={3}>
                <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
                  <InputLabel id="temp-op-label">Op</InputLabel>
                  <Select labelId="temp-op-label" value={editForm.temperatureOp} label="Op" onChange={handleEditChange("temperatureOp")} size="small">
                    <MenuItem value=">">&gt;</MenuItem>
                    <MenuItem value="<">&lt;</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <TextField label="Temperature (°C)" type="number" inputProps={{ step: 0.1 }} value={editForm.temperatureVal} onChange={handleEditChange("temperatureVal")} fullWidth error={!!formErrors.temperatureVal} helperText={formErrors.temperatureVal} size="small" sx={{ maxWidth: { xs: 120, sm: "100%" }, "& .MuiInputBase-root": { height: 36 } }} />
              </Grid>
            </Grid>

            {/* Humidity */}
            <Grid container spacing={1} alignItems="center" sx={{ mt: 1, width: "83%" }}>
              <Grid item xs="auto" sm={3}>
                <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
                  <InputLabel id="hum-op-label">Op</InputLabel>
                  <Select labelId="hum-op-label" value={editForm.humidityOp} label="Op" onChange={handleEditChange("humidityOp")} size="small">
                    <MenuItem value=">">&gt;</MenuItem>
                    <MenuItem value="<">&lt;</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <TextField label="Humidity (%)" type="number" inputProps={{ step: 0.1 }} value={editForm.humidityVal} onChange={handleEditChange("humidityVal")} fullWidth error={!!formErrors.humidityVal} helperText={formErrors.humidityVal} size="small" sx={{ maxWidth: { xs: 120, sm: "100%" }, "& .MuiInputBase-root": { height: 36 } }} />
              </Grid>
            </Grid>

            {/* Conditional fields based on deviceType */}
            {editForm.deviceType === "OMD" && (
              <Grid container spacing={1} alignItems="center" sx={{ mt: 1, width: "83%" }}>
                <Grid item xs="auto" sm={3}>
                  <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
                    <InputLabel id="odour-op-label">Op</InputLabel>
                    <Select labelId="odour-op-label" value={editForm.odourOp} label="Op" onChange={handleEditChange("odourOp")} size="small">
                      <MenuItem value=">">&gt;</MenuItem>
                      <MenuItem value="<">&lt;</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <TextField label="Odour (%)" type="number" inputProps={{ step: 0.1 }} value={editForm.odourVal} onChange={handleEditChange("odourVal")} fullWidth error={!!formErrors.odourVal} helperText={formErrors.odourVal} size="small" sx={{ maxWidth: { xs: 120, sm: "100%" }, "& .MuiInputBase-root": { height: 36 } }} />
                </Grid>
              </Grid>
            )}

            {editForm.deviceType === "AQIMD" && (
              <Grid container spacing={1} alignItems="center" sx={{ mt: 1, width: "83%" }}>
                <Grid item xs="auto" sm={3}>
                  <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
                    <InputLabel id="aqi-op-label">Op</InputLabel>
                    <Select labelId="aqi-op-label" value={editForm.aqiOp} label="Op" onChange={handleEditChange("aqiOp")} size="small">
                      <MenuItem value=">">&gt;</MenuItem>
                      <MenuItem value="<">&lt;</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <TextField label="AQI" type="number" inputProps={{ step: 1 }} value={editForm.aqiVal} onChange={handleEditChange("aqiVal")} fullWidth error={!!formErrors.aqiVal} helperText={formErrors.aqiVal} size="small" sx={{ maxWidth: { xs: 120, sm: "100%" }, "& .MuiInputBase-root": { height: 36 } }} />
                </Grid>
              </Grid>
            )}

            {editForm.deviceType === "GLMD" && (
              <Grid container spacing={1} alignItems="center" sx={{ mt: 1, width: "83%" }}>
                <Grid item xs="auto" sm={3}>
                  <FormControl sx={{ width: { xs: 60, sm: "100%" }, minWidth: 60 }}>
                    <InputLabel id="gass-op-label">Op</InputLabel>
                    <Select labelId="gass-op-label" value={editForm.gassOp} label="Op" onChange={handleEditChange("gassOp")} size="small">
                      <MenuItem value=">">&gt;</MenuItem>
                      <MenuItem value="<">&lt;</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <TextField label="Leakage (%)" type="number" inputProps={{ step: 0.1 }} value={editForm.gassVal} onChange={handleEditChange("gassVal")} fullWidth error={!!formErrors.gassVal} helperText={formErrors.gassVal} size="small" sx={{ maxWidth: { xs: 120, sm: "100%" }, "& .MuiInputBase-root": { height: 36 } }} />
                </Grid>
              </Grid>
            )}

            {/* API Key compact display */}
            {editForm.apiKey ? (
              <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-5 w-full">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">API Key:</div>
                    <div className="mt-2 text-sm font-mono truncate" title={editForm.apiKey}>{editForm.apiKey ? `${String(editForm.apiKey).slice(0, 20)}...` : ""}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleCopyApiKey(editForm?.apiKey)} className="p-1 rounded hover:bg-gray-100 border border-transparent" title="Copy API key" type="button">
                      <img src="/copyicon.svg" alt="Copy API KEY Icon" className="w-[20px] h-[20px]" />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleEditCancel} disabled={working}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete {deleteTarget.name ? `"${deleteTarget.name}"` : "device"}?</DialogTitle>
        <DialogContent dividers>This action cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={working}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm} disabled={working} endIcon={working ? <CircularProgress size={18} /> : null}>Yes, delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

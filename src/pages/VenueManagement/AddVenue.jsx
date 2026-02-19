// // src/pages/management/AddVenue.jsx
// import  { useState, useEffect } from "react";
// import { Box } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { createVenue, fetchAllVenues } from "../../slices/VenueSlice";
// import { fetchAllOrganizations } from "../../slices/OrganizationSlice"; // ensure OrganizationSlice exists
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";

// import { setVenuePriority } from "../../utils/venuePriorities";

// import "../../styles/pages/management-pages.css";

// const AddVenue = () => {
//   const [form, setForm] = useState({ name: "", organization: "", priority: "medium" });
//   const dispatch = useDispatch();
//   const { isLoading } = useSelector((s) => s.Venue || { isLoading: false });
//   const { Organizations } = useSelector((s) => s.Organization || { Organizations: [] });
//   const [formLoading, setFormLoading] = useState();



//   // constants (put near top of component)
// const SELECT_HEIGHT = 48;
// const ITEM_HEIGHT = 48;
// const VISIBLE_ITEMS = 4;

// const menuProps = {
//   PaperProps: {
//     sx: {
//       maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
//       mt: 1,
//     },
//   },
//   MenuListProps: {
//     disablePadding: true,
//   },
// };


//   useEffect(() => {
//     // ensure organizations are loaded for the select dropdown
//     if (!Organizations || Organizations.length === 0) {
//       dispatch(fetchAllOrganizations());
//     }
//   }, [dispatch]);

//   const onchange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const handleVenue = async (e) => {
//     e.preventDefault();

  

//     const name = (form.name || "").trim();
//     const organization = form.organization;

//     if (!name || !organization) {
//       return Swal.fire({ icon: "warning", title: "Missing field", text: "Name and organization are required." });
//     }
    
//       setFormLoading(true);
//     try {
//       const created = await dispatch(createVenue({ name, organization })).unwrap();
//       const createdId = created?._id ?? created?.id ?? created?.venueId ?? null;
//       if (createdId) {
//     setVenuePriority(createdId, form.priority);
//   }
//       Swal.fire({ icon: "success", title: "Created", text: `Venue "${created.name}" created.` });
//       setForm({ name: "", organization: "",  priority: "medium" });
//       // refresh list
//       dispatch(fetchAllVenues());
//       window.dispatchEvent(new Event("venue:updated"));

//     } catch (err) {
//       Swal.fire({ icon: "error", title: "Create failed", text: err || "Unable to create venue." });
//       console.error("create venue error:", err);
//     } finally{
//     setFormLoading(false);
//     }
//   };

//   return (
//     <div className="AddingPage venue-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
//       <h2 className="venue-add-title font-semibold mb-1 text-center">Add Venues</h2>
//       <p className="venue-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add venue</p>

//       <form className="space-y-4 max-w-sm mx-auto w-full" onSubmit={handleVenue}>
//         <div className="relative bg-white">
//           <Box className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter venue name"
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={form.name}
//             onChange={onchange}
//           />
//         </div>

//         <div>
   
// <label className="block text-sm font-medium mb-1">Select Organization</label>

// {/* wrap only the select area so absolute positioning is relative to the select */}
//     <div className="relative">
//       {/* icon centered vertically relative to the select input */}
//       <img
//         src="/OrganizationChecklist.svg"
//         alt="org icon"
//         className="absolute left-3 top-1/2 -translate-y-1/2 z-30 h-[25px] w-[25px] pointer-events-none"
//       />

//       <FormControl fullWidth>
//         <Select
//           displayEmpty
//           value={form.organization}
//           onChange={onchange}
//           inputProps={{ name: "organization" }}
//           MenuProps={menuProps}
//           renderValue={(selected) => {
//             if (!selected) return <span className="text-gray-500">Select Organization</span>;
//             const org = Organizations?.find((o) => (o._id ?? o.id) === selected);
//             return org?.name ?? selected;
//           }}
//           sx={{
//             pl: "1.5rem",               // space for the icon
//             height: `${SELECT_HEIGHT}px`,
//             backgroundColor: "white",
//             borderRadius: "0.375rem",
//           }}
//         >
//           {(Organizations || []).length === 0 ? (
//             <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>
//               No organizations found
//             </MenuItem>
//           ) : (
//             (Organizations || []).map((org) => {
//               const id = org._id ?? org.id;
//               return (
//                 <MenuItem key={id} value={id} sx={{ height: ITEM_HEIGHT }}>
//                   {org.name}
//                 </MenuItem>
//               );
//             })
//           )}
//         </Select>
//       </FormControl>
//     </div>
//         </div>

//         {/* <button
//           type="submit"
//           className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md transition duration-300 shadow-md ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Saving..." : "Save"}
//         </button> */}

//         <div>
//         <label className="block text-sm font-medium mb-1">Priority (frontend only)</label>
//         <select
//           name="priority"
//           value={form.priority}
//           onChange={onchange}
//           className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
//         >
//           <option value="high">High</option>
//           <option value="medium">Medium</option>
//           <option value="low">Low</option>
//         </select>
//         {/* <p className="text-xs text-gray-500 mt-1">Saved locally — affects order in selects on this browser only.</p> */}
//       </div>

//         <button
//           type="submit"
//           className={`w-full bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md transition duration-300 shadow-md ${
//             formLoading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//           disabled={formLoading} // disables button when loading
//         >
//           {formLoading ? "Saving..." : "Save"} 
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddVenue;














// src/pages/management/AddVenue.jsx
import { useState, useEffect } from "react";
import { Box as LucideBox } from "lucide-react"; // keep your lucide Box name
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createVenue, fetchAllVenues, fetchVenuesByOrganization  } from "../../slices/VenueSlice";
import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  setVenuePriority,
  getVenueWithPriority,
  removeVenuePriority,
} from "../../utils/venuePriorities";

import "../../styles/pages/management-pages.css";

const AddVenue = () => {
  // const [form, setForm] = useState({ name: "", organization: "", priority: null });
  const [form, setForm] = useState({ name: "", organization: "", priority: null });

  const dispatch = useDispatch();
  const { isLoading, Venues = [] } = useSelector((s) => s.Venue || { isLoading: false, Venues: [] });
  const { Organizations = [] } = useSelector((s) => s.Organization || { Organizations: [] });
  const [formLoading, setFormLoading] = useState(false);
  const [currentHighId, setCurrentHighId] = useState(null);

  // constants for select sizing (kept)
  const SELECT_HEIGHT = 48;
  const ITEM_HEIGHT = 48;
  const VISIBLE_ITEMS = 4;

  const menuProps = {
    PaperProps: {
      sx: {
        maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
        mt: 1,
      },
    },
    MenuListProps: {
      disablePadding: true,
    },
  };

  useEffect(() => {
    // ensure organizations & venues are loaded for selects and to show high venue name
    dispatch(fetchAllOrganizations());
    dispatch(fetchAllVenues());
    // initial read of local priority
    setCurrentHighId(getVenueWithPriority("high"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // if Venues list changes, re-evaluate the currentHighId (so name shows correctly)
  useEffect(() => {
    setCurrentHighId(getVenueWithPriority("high"));
  }, [Venues]);

  const onchange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // helper when selecting priority via checkbox — make them mutually exclusive in UI
  const handlePriorityClick = (priority) => {
    setForm((p) => ({ ...p, priority }));
  };

  const handleVenue = async (e) => {
    e.preventDefault();

    const name = (form.name || "").trim();
    const organization = form.organization;

    if (!name || !organization) {
      return Swal.fire({ icon: "warning", title: "Missing field", text: "Name and organization are required." });
    }

    setFormLoading(true);
    try {
      const created = await dispatch(createVenue({ name, organization })).unwrap();
      const createdId = created?._id ?? created?.id ?? created?.venueId ?? null;

      if (createdId && form.priority === "high") {
  setVenuePriority(createdId, "high");
}

      // if (createdId) {
      //   // This enforces uniqueness (setVenuePriority clears previous 'high' if needed)
      //   setVenuePriority(createdId, form.priority);
      // }

      Swal.fire({ icon: "success", title: "Created", text: `Venue "${created.name}" created.` });
      // setForm({ name: "", organization: "", priority: "medium" });
      setForm({ name: "", organization: "", priority: null });


      // refresh list + notify selects in the same tab
     // refresh list + notify selects in the same tab
      await dispatch(fetchAllVenues());

      // ALSO refresh the per-organization cache so VenueList (when filtered) updates immediately
      if (organization) {
        // dispatch the per-org fetch so venuesByOrg[organization] contains the new venue
        dispatch(fetchVenuesByOrganization(organization)).catch(() => {});
      }

      // notify other listeners (keeps your existing event)
      window.dispatchEvent(new Event("venue:updated"));

      // update local view of current high
      setCurrentHighId(getVenueWithPriority("high"));
    } catch (err) {
      Swal.fire({ icon: "error", title: "Create failed", text: err || "Unable to create venue." });
      console.error("create venue error:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleClearHigh = () => {
    if (!currentHighId) {
      Swal.fire({ icon: "info", title: "No high priority", text: "There is no venue with high priority." });
      return;
    }

    removeVenuePriority(currentHighId);
    dispatch(fetchAllVenues());
    window.dispatchEvent(new Event("venue:updated"));
    setCurrentHighId(null);
    Swal.fire({ icon: "success", title: "Cleared", text: "High priority removed." });
  };

  // find the name of the current high-priority venue (if any)
  const currentHighVenue = Venues.find((v) => String(v._id ?? v.id ?? v.venueId) === String(currentHighId));
  const currentHighName = currentHighVenue ? (currentHighVenue.name ?? currentHighVenue.venueName ?? currentHighId) : null;

  return (
    <div className="AddingPage venue-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
      <h2 className="venue-add-title font-semibold mb-1 text-center">Add Venues</h2>
      <p className="venue-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add venue</p>

      <form className="space-y-4 max-w-sm mx-auto w-full" onSubmit={handleVenue}>
        <div className="relative bg-white">
          <LucideBox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="name"
            placeholder="Enter venue name"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={onchange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Organization</label>

          <div className="relative">
            <img
              src="/OrganizationChecklist.svg"
              alt="org icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 h-[25px] w-[25px] pointer-events-none"
            />

            <FormControl fullWidth>
              <Select
                displayEmpty
                value={form.organization}
                onChange={onchange}
                inputProps={{ name: "organization" }}
                MenuProps={menuProps}
                renderValue={(selected) => {
                  if (!selected) return <span className="text-gray-500">Select Organization</span>;
                  const org = Organizations?.find((o) => (o._id ?? o.id) === selected);
                  return org?.name ?? selected;
                }}
                sx={{
                  pl: "1.5rem",
                  height: `${SELECT_HEIGHT}px`,
                  backgroundColor: "white",
                  borderRadius: "0.375rem",
                }}
              >
                {(Organizations || []).length === 0 ? (
                  <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>
                    No organizations found
                  </MenuItem>
                ) : (
                  (Organizations || []).map((org) => {
                    const id = org._id ?? org.id;
                    return (
                      <MenuItem key={id} value={id} sx={{ height: ITEM_HEIGHT }}>
                        {org.name}
                      </MenuItem>
                    );
                  })
                )}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Priority using MUI checkboxes (mutually exclusive selection) */}
        <div>
          {/* <label className="block text-sm font-medium mb-2">Priority</label> */}

          {/* <div className="flex gap-2 items-center"> */}
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={form.priority === "high"}
                  onChange={() => handlePriorityClick("high")}
                  // disable the high checkbox if another venue already has high
                  disabled={Boolean(currentHighId)}
                />
              }
              label="High"
            /> */}
          {/* <FormControlLabel
              control={
                <Checkbox
                  checked={form.priority === "high"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handlePriorityClick("high");
                    } else {
                      handlePriorityClick(null); // uncheck → remove priority
                    }
                  }}
                />
              }
              label="High"
            /> */}

{/* <FormControlLabel
  control={
    <Checkbox
      checked={form.priority === "high"}
      disabled={Boolean(currentHighId) && form.priority !== "high"}
      onChange={(e) => {
        if (e.target.checked) {
          handlePriorityClick("high");
        } else {
          handlePriorityClick(null);
        }
      }}
    />
  }
  label="High"
/> */}

            
          {/* </div> */}

          {/* <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            Saved locally — affects order in selects on this browser only.
          </Typography> */}

          {/* Show current high and allow removing it */}
          {/* {currentHighId ? (
            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-gray-600">Current high priority</div>
                <div className="text-sm font-medium">{currentHighName}</div>
              </div>
              <Button variant="outlined" color="error" size="small" onClick={handleClearHigh}>
                Remove high priority
              </Button>
            </div>
          ) : null} */}
        </div>

        <button
          type="submit"
          className={`w-full bg-[#1E64D9] cursor-pointer hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md transition duration-300 shadow-md ${
            formLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={formLoading}
        >
          {formLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddVenue;

// // src/pages/management/AddDevice.jsx
// import React, { useEffect, useState } from "react";
// import { Box, Building, Thermometer } from "lucide-react";
// import InputField from "../../components/Inputs/InputField";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllVenues } from "../../slices/VenueSlice";
// import { createDevice } from "../../slices/DeviceSlice";
// import Swal from "sweetalert2";
// import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import "../../styles/pages/management-pages.css";

// const defaultConditions = [
//   // UI labels + backend types
//   { id: "temperature", type: "temperature", label: "Temperature", operator: ">", value: "" },
//   { id: "humidity", type: "humidity", label: "Humidity", operator: ">", value: "" },
  
// ];

// const AddDevice = () => {
//   const [formData, setFormData] = useState({
//     deviceId: "",
//     venue: "",
//     brand: "",
//   });

//   const SELECT_HEIGHT = 48; // height of the Select field itself
//   const ITEM_HEIGHT = 48; // height of each dropdown item
//   const VISIBLE_ITEMS = 4; // how many visible items before scroll

//   const menuProps = {
//     PaperProps: {
//       sx: {
//         maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
//         mt: 1,
//       },
//     },
//     MenuListProps: {
//       disablePadding: true,
//     },
//   };

//   // three fixed conditions: temperature, humidity, 
//   const [conditions, setConditions] = useState(defaultConditions);

//   const [createdDevice, setCreatedDevice] = useState(null);

//   const dispatch = useDispatch();
//   const { Venues = [], loading = false, error = null } =
//     useSelector((state) => state.Venue || {});

//   useEffect(() => {
//     dispatch(fetchAllVenues());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleConditionChange = (index, key, value) => {
//     setConditions((prev) => {
//       const next = [...prev];
//       next[index] = { ...next[index], [key]: value };
//       return next;
//     });
//   };

//   const handleSaveDevice = async () => {
//     if (!formData.deviceId?.trim()) {
//       return Swal.fire({ icon: "warning", title: "Enter Device ID" });
//     }
//     if (!formData.venue) {
//       return Swal.fire({ icon: "warning", title: "Select Venue" });
//     }

//     // Map current UI conditions to payload shape
//     const payloadConditions = Array.isArray(conditions)
//       ? conditions.map((c) => ({
//           type: c.type,
//           operator: (c.operator || "").toString().trim(),
//           value: c.value === "" || c.value === undefined ? "" : c.value,
//         }))
//       : [];

//     // filter out completely empty entries? backend accepts [] but if a row has empty value, we should skip
//     const filtered = payloadConditions.filter((c) => c.type && c.operator && c.value !== "");

//     // validation rules (match backend)
//     const validTypes = ["temperature", "humidity"];
//     const validOps = [">", "<"];

//     for (const c of filtered) {
//       if (!validTypes.includes(c.type)) {
//         return Swal.fire({
//           icon: "warning",
//           title: "Invalid condition type",
//           text: `Type "${c.type}" not allowed. Allowed types: ${validTypes.join(", ")}`,
//         });
//       }

//       if (!validOps.includes(c.operator)) {
//         return Swal.fire({
//           icon: "warning",
//           title: "Invalid operator",
//           text: `Operator "${c.operator}" not allowed. Use >, <, =`,
//         });
//       }
      
//        else {
//         // temperature & humidity must be numbers
//         const num = Number(c.value);
//         if (!Number.isFinite(num)) {
//           return Swal.fire({
//             icon: "warning",
//             title: "Invalid condition value",
//             text: `Value for ${c.type} must be a number.`,
//           });
//         }
//         c.value = num;
//       }
//     }

//     // final payload: send filtered array (could be empty [] if user left all fields blank)
//     const finalConditions = filtered;

//     try {
//       const device = await dispatch(
//         createDevice({
//           deviceId: formData.deviceId.trim(),
//           venueId: formData.venue,
//           conditions: finalConditions,
//         })
//       ).unwrap();

//       setCreatedDevice(device);

     
//       Swal.fire({
//         icon: "success",
//         title: "Device Created",
//       });

//       setFormData({ deviceId: "", venue: "", brand: "" });
//       setConditions(defaultConditions.map((c) => ({ ...c, value: "" })));
//     } catch (err) {
//       console.error("Create device error:", err);
//       const text = (err && (err.message || err)) || "Something went wrong while creating device";
//       Swal.fire({
//         icon: "error",
//         title: "Create failed",
//         text,
//       });
//     }
//   };

//   const handleCopyApiKey = () => {
//     if (!createdDevice?.apiKey) return;

//     navigator.clipboard.writeText(createdDevice.apiKey)
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Copied!",
//           timer: 1200,
//           width: 150,
//           showConfirmButton: false,
//           position: "top-end",
//           toast: true,
//           customClass: {
//             popup: "small-toast",
//           },
//         });
//       })
//       .catch(() => {
//         Swal.fire({
//           icon: "error",
//           title: "Copy failed",
//         });
//       });
//   };

//   return (
//     <div className="AddingPage device-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
//       <h2 className="device-add-title font-semibold mb-1 text-center">Add Devices</h2>
//       <p className="device-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add device</p>

//       <div className="device-add-form space-y-4 max-w-md mx-auto w-full">
//         {/* Device ID Input */}
//         <InputField
//           id="deviceId"
//           name="deviceId"
//           label="Device ID"
//           type="text"
//           value={formData.deviceId}
//           onchange={handleChange}
//           placeholder="Device ID"
//           icon={<Box size={20} />}
//         />

//         {/* Conditions Section */}
//         <div className="mt-2">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-[12px] font-semibold text-gray-600">Conditions</p>
//           </div>

//           <div className="space-y-3">
//             {conditions.map((cond, idx) => (
//               <div key={cond.id} className="flex items-center gap-2">
//                 {/* Left label */}
//                 <div className="relative flex-1">
//                   <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="text"
//                     value={cond.label}
//                     readOnly
//                     className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent outline-none border-none text-gray-600 text-sm"
//                   />
//                 </div>

//                 {/* Operator select (only >, <, =) */}
//                 <div className="relative flex-[0.5]">
//                   <select
//                     value={cond.operator}
//                     onChange={(e) => handleConditionChange(idx, "operator", e.target.value)}
//                     className="w-full pl-3 pr-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                     aria-label={`operator-${idx}`}
//                   >
//                     <option value=">">&gt;</option>
//                     <option value="<">&lt;</option>
//                   </select>
//                 </div>

//                 {/* Value input */}
                
//                   <div className="relative flex-[1]">
//                     <input
//                       type="number"
//                       placeholder={cond.type === "temperature" ? "25" : "50"}
//                       value={cond.value}
//                       onChange={(e) => handleConditionChange(idx, "value", e.target.value)}
//                       className="w-full pl-3 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                     />
//                     {/* show unit for temperature/humidity */}
//                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
//                       {cond.type === "temperature" ? "°C" : "%"}
//                     </span>
//                   </div>
                
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="relative">
//           <Building
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-30"
//             size={20}
//           />

//           <FormControl fullWidth>
//             <Select
//               displayEmpty
//               value={formData.venue}
//               onChange={handleChange}
//               inputProps={{ name: "venue" }}
//               MenuProps={menuProps}
//               renderValue={(selected) => {
//                 if (!selected) return <span className="text-gray-500">Select a venue</span>;
//                 const v = Venues.find((x) => (x._id ?? x.id) === selected);
//                 return v?.name ?? selected;
//               }}
//               sx={{
//                 pl: "1.5rem",
//                 height: SELECT_HEIGHT,
//                 backgroundColor: "white",
//                 borderRadius: "0.375rem",
//               }}
//             >
//               {loading ? (
//                 <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>
//                   Loading venues...
//                 </MenuItem>
//               ) : error ? (
//                 <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>
//                   {error}
//                 </MenuItem>
//               ) : Venues.length === 0 ? (
//                 <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>
//                   No venues
//                 </MenuItem>
//               ) : (
//                 Venues.map((venue, index) => {
//                   const id = venue._id ?? venue.id ?? index;
//                   const name = venue.name ?? `Venue ${index + 1}`;
//                   return (
//                     <MenuItem
//                       key={id}
//                       value={id}
//                       sx={{
//                         height: ITEM_HEIGHT,
//                         display: "flex",
//                         alignItems: "center",
//                       }}
//                     >
//                       {name}
//                     </MenuItem>
//                   );
//                 })
//               )}
//             </Select>
//           </FormControl>
//         </div>

//         {/* Save Button */}
//         <div className="mt-6">
//           <button
//             onClick={handleSaveDevice}
//             className="bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md w-full cursor-pointer"
//           >
//             Save
//           </button>
//         </div>

//         {/* Optionally show API key of last created device */}
//         {createdDevice?.apiKey && (
//           <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-5">
//             <strong>API Key:</strong>
//             <div className="flex items-center justify-between ">
//               <div>
//                 <div
//                   className="mt-2 text-sm font-mono"
//                   title={createdDevice.apiKey}
//                 >
//                   {createdDevice.apiKey
//                     ? `${createdDevice.apiKey.slice(0, 25)}...`
//                     : ""}
//                 </div>
//               </div>
//               <img
//                 src="/copyicon.svg"
//                 alt="Copy API KEY Icon"
//                 className="w-[20px] h-[30px] cursor-pointer"
//                 onClick={handleCopyApiKey}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddDevice;







// // src/pages/management/AddDevice.jsx
// import React, { useEffect, useState } from "react";
// import { Box, Building, Thermometer } from "lucide-react";
// import InputField from "../../components/Inputs/InputField";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
// import { fetchVenuesByOrganization } from "../../slices/VenueSlice";
// import { createDevice } from "../../slices/DeviceSlice";
// import Swal from "sweetalert2";
// import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import "../../styles/pages/management-pages.css";

// const defaultConditions = [
//   { id: "temperature", type: "temperature", label: "Temperature", operator: ">", value: "" },
//   { id: "humidity", type: "humidity", label: "Humidity", operator: ">", value: "" },
// ];

// const AddDevice = () => {
//   const [formData, setFormData] = useState({
//     deviceId: "",
//     organization: "", // <-- added
//     venue: "",
//     brand: "",
//   });

//   const SELECT_HEIGHT = 48;
//   const ITEM_HEIGHT = 48;
//   const VISIBLE_ITEMS = 4;

//   const menuProps = {
//     PaperProps: {
//       sx: {
//         maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
//         mt: 1,
//       },
//     },
//     MenuListProps: {
//       disablePadding: true,
//     },
//   };

//   const [conditions, setConditions] = useState(defaultConditions);
//   const [createdDevice, setCreatedDevice] = useState(null);
//   const [deviceLoading, setDeviceLoading] = useState(false);

//   const dispatch = useDispatch();
//   // organization state
//   const { Organizations = [], isLoading: orgsLoading, error: orgError } = useSelector(
//     (s) => s.Organization || {}
//   );

//   // venue state (we will use per-org cache if present)
//   const { Venues = [], loading: venueLoading, error: venueError, venuesByOrg = {} } =
//     useSelector((s) => s.Venue || {});

//   useEffect(() => {
//     // load organizations on mount
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   // compute venues available for selected organization (cached in venuesByOrg)
//   const availableVenues = formData.organization
//     ? venuesByOrg[formData.organization] ?? []
//     : [];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // when organization changes, clear venue selection and fetch venues for that org
//     if (name === "organization") {
//       setFormData((prev) => ({ ...prev, organization: value, venue: "" }));
//       if (value) {
//         dispatch(fetchVenuesByOrganization(value));
//       }
//       return;
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleConditionChange = (index, key, value) => {
//     setConditions((prev) => {
//       const next = [...prev];
//       next[index] = { ...next[index], [key]: value };
//       return next;
//     });
//   };

//   const handleSaveDevice = async () => {
//     if (!formData.deviceId?.trim()) {
//       return Swal.fire({ icon: "warning", title: "Enter Device ID" });
//     }
//     if (!formData.venue) {
//       return Swal.fire({ icon: "warning", title: "Select Venue" });
//     }

//     const payloadConditions = Array.isArray(conditions)
//       ? conditions.map((c) => ({
//           type: c.type,
//           operator: (c.operator || "").toString().trim(),
//           value: c.value === "" || c.value === undefined ? "" : c.value,
//         }))
//       : [];

//     const filtered = payloadConditions.filter((c) => c.type && c.operator && c.value !== "");

//     const validTypes = ["temperature", "humidity"];
//     const validOps = [">", "<"];

//     for (const c of filtered) {
//       if (!validTypes.includes(c.type)) {
//         return Swal.fire({
//           icon: "warning",
//           title: "Invalid condition type",
//           text: `Type "${c.type}" not allowed. Allowed types: ${validTypes.join(", ")}`,
//         });
//       }

//       if (!validOps.includes(c.operator)) {
//         return Swal.fire({
//           icon: "warning",
//           title: "Invalid operator",
//           text: `Operator "${c.operator}" not allowed. Use >, <`,
//         });
//       } else {
//         const num = Number(c.value);
//         if (!Number.isFinite(num)) {
//           return Swal.fire({
//             icon: "warning",
//             title: "Invalid condition value",
//             text: `Value for ${c.type} must be a number.`,
//           });
//         }
//         c.value = num;
//       }
//     }

//     const finalConditions = filtered;

//     setDeviceLoading(true);

//     try {

//       console.log("formData>AddDevice", formData)
//       const device = await dispatch(
//         createDevice({
//           deviceId: formData.deviceId.trim(),
//           venueId: formData.venue,
//           conditions: finalConditions,
//         })
//       ).unwrap();

//       setCreatedDevice(device);

//       Swal.fire({
//         icon: "success",
//         title: "Device Created",
//       });

//       setFormData({ deviceId: "", organization: "", venue: "", brand: "" });
//       setConditions(defaultConditions.map((c) => ({ ...c, value: "" })));
//     } catch (err) {
//       console.error("Create device error:", err);
//       const text = (err && (err.message || err)) || "Something went wrong while creating device";
//       Swal.fire({
//         icon: "error",
//         title: "Create failed",
//         text,
//       });
//     } finally{
//       setDeviceLoading(false);
//     }
//   };

//   const handleCopyApiKey = () => {
//     if (!createdDevice?.apiKey) return;

//     navigator.clipboard.writeText(createdDevice.apiKey)
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

//   return (
//     <div className="AddingPage device-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
//       <h2 className="device-add-title font-semibold mb-2 text-center ">Add Devices</h2>
//       {/* <p className="device-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add device</p> */}

//       <div className="device-add-form space-y-4 max-w-md mx-auto w-full">
//         {/* Device ID Input */}
//         <InputField
//           id="deviceId"
//           name="deviceId"
//           label="Device ID"
//           type="text"
//           value={formData.deviceId}
//           onchange={handleChange}
//           placeholder="Device ID"
//           icon={<Box size={20} />}
//         />

//         {/* Organization Select (shown first) */}
//         <div className="relative">
//           <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-30" size={20} />
//           <FormControl fullWidth>
//             <Select
//               displayEmpty
//               value={formData.organization}
//               onChange={handleChange}
//               inputProps={{ name: "organization" }}
//               MenuProps={menuProps}
//               sx={{ pl: "1.5rem", height: SELECT_HEIGHT, backgroundColor: "white", borderRadius: "0.375rem" }}
//               renderValue={(selected) => {
//                 if (!selected) return <span className="text-gray-500">Select an organization</span>;
//                 const org = Organizations.find((o) => String(o._id ?? o.id) === String(selected));
//                 return org?.name ?? selected;
//               }}
//             >
//               {orgsLoading ? (
//                 <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>Loading orgs...</MenuItem>
//               ) : orgError ? (
//                 <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>{String(orgError)}</MenuItem>
//               ) : Organizations.length === 0 ? (
//                 <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>No organizations</MenuItem>
//               ) : (
//                 Organizations.map((org, idx) => {
//                   const id = org._id ?? org.id ?? idx;
//                   return (
//                     <MenuItem key={id} value={id} sx={{ height: ITEM_HEIGHT, display: "flex", alignItems: "center" }}>
//                       {org.name}
//                     </MenuItem>
//                   );
//                 })
//               )}
//             </Select>
//           </FormControl>
//         </div>

//           {/* Venue Select — only shown after organization selected */}
//         {formData.organization && (
//           <div className="relative">
//             <FormControl fullWidth>
//               <Select
//                 displayEmpty
//                 value={formData.venue}
//                 onChange={handleChange}
//                 inputProps={{ name: "venue" }}
//                 MenuProps={menuProps}
//                 sx={{ pl: "1.5rem", height: SELECT_HEIGHT, backgroundColor: "white", borderRadius: "0.375rem" }}
//                 renderValue={(selected) => {
//                   if (!selected) return <span className="text-gray-500">Select a venue</span>;
//                   const v = (availableVenues || []).find((x) => String(x._id ?? x.id) === String(selected));
//                   return v?.name ?? selected;
//                 }}
//               >
//                 {venueLoading ? (
//                   <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>Loading venues...</MenuItem>
//                 ) : venueError ? (
//                   <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>{String(venueError)}</MenuItem>
//                 ) : (availableVenues || []).length === 0 ? (
//                   <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>No venues for this organization</MenuItem>
//                 ) : (
//                   (availableVenues || []).map((venue, index) => {
//                     const id = venue._id ?? venue.id ?? index;
//                     const name = venue.name ?? `Venue ${index + 1}`;
//                     return (
//                       <MenuItem key={id} value={id} sx={{ height: ITEM_HEIGHT, display: "flex", alignItems: "center" }}>
//                         {name}
//                       </MenuItem>
//                     );
//                   })
//                 )}
//               </Select>
//             </FormControl>
//           </div>
//         )}

//         {/* Conditions Section */}
//         <div className="mt-2">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-[12px] font-semibold text-gray-600">Conditions</p>
//           </div>

//           <div className="space-y-3">
//             {conditions.map((cond, idx) => (
//               <div key={cond.id} className="flex items-center gap-2">
//                 <div className="relative flex-1">
//                   <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="text"
//                     value={cond.label}
//                     readOnly
//                     className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent outline-none border-none text-gray-600 text-sm"
//                   />
//                 </div>

//                 <div className="relative flex-[0.5]">
//                   <select
//                     value={cond.operator}
//                     onChange={(e) => handleConditionChange(idx, "operator", e.target.value)}
//                     className="w-full pl-3 pr-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                     aria-label={`operator-${idx}`}
//                   >
//                     <option value=">">&gt;</option>
//                     <option value="<">&lt;</option>
//                   </select>
//                 </div>

//                 <div className="relative flex-[0.6] sm:flex-[1]">
//                   <input
//                     type="number"
//                     placeholder={cond.type === "temperature" ? "25" : "50"}
//                     value={cond.value}
//                     onChange={(e) => handleConditionChange(idx, "value", e.target.value)}
//                     className="w-full pl-3 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                   />
//                   <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
//                     {cond.type === "temperature" ? "°C" : "%"}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

      

//         {/* Save Button */}
//         <div className="mt-6">
//           {/* <button
//             onClick={handleSaveDevice}
//             className="bg-[#1E64D9] hover:bg-[#1557C7] text-white font-semibold py-2.5 px-4 rounded-md w-full cursor-pointer"
//           >
//             Save
//           </button> */}

//           <button
//             onClick={handleSaveDevice}
//             disabled={deviceLoading}
//             className={`
//             w-full py-2.5 px-4 rounded-md font-semibold text-white
//             transition-all
//             ${deviceLoading
//                 ? "bg-[#1E64D9]/70 cursor-not-allowed"
//                 : "bg-[#1E64D9] hover:bg-[#1557C7] cursor-pointer"}
//              `}
//           >
//             {deviceLoading ? "Saving..." : "Save"}
//           </button>



//         </div>

//         {/* API key display */}
//         {createdDevice?.apiKey && (
//           <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-5">
//             <strong>API Key:</strong>



//             <div className="flex items-center justify-between">
//               <div>
//                 {/* Mobile: slice 0–15 */}
//                 <div
//                   className="mt-2 text-sm font-mono md:hidden"
//                   title={createdDevice.apiKey}
//                 >
//                   {createdDevice.apiKey ? `${createdDevice.apiKey.slice(0, 15)}...` : ""}
//                 </div>

//                 {/* md and above: slice 0–25 */}
//                 <div
//                   className="mt-2 text-sm font-mono hidden md:block"
//                   title={createdDevice.apiKey}
//                 >
//                   {createdDevice.apiKey ? `${createdDevice.apiKey.slice(0, 25)}...` : ""}
//                 </div>
//               </div>

//               <img
//                 src="/copyicon.svg"
//                 alt="Copy API KEY Icon"
//                 className="w-[20px] h-[30px] cursor-pointer"
//                 onClick={handleCopyApiKey}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddDevice;






















// // src/pages/management/AddDevice.jsx
// import React, { useEffect, useState } from "react";
// import { Box, Building, Thermometer } from "lucide-react";
// import InputField from "../../components/Inputs/InputField";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
// import { fetchVenuesByOrganization } from "../../slices/VenueSlice";
// import { createDevice } from "../../slices/DeviceSlice";
// import Swal from "sweetalert2";
// import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import "../../styles/pages/management-pages.css";

// const DEVICE_CONDITIONS_MAP = {
//   OMD: ["temperature", "humidity", "odour"],
//   TMD: ["temperature", "humidity"],
//   AQIMD: ["AQI", "temperature", "humidity"],
//   GLMD: ["gass", "temperature", "humidity"],
// };

// const CONDITION_LABEL = {
//   temperature: "Temperature",
//   humidity: "Humidity",
//   odour: "Odour",
//   AQI: "AQI",
//   gass: "Leakage",
// };

// const CONDITION_UNIT = {
//   temperature: "°C",
//   humidity: "%",
//   odour: "%",
//   AQI: "AQI",
//   gass: "%",
// };

// const DEVICE_TYPE_LABEL = {
//   OMD: "Odour Monitoring Device",
//   TMD: "Temperature Monitoring Device",
//   AQIMD: "Air Quality Index Monitoring Device",
//   GLMD: "Leakage Monitoring Device",
// };

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

// const makeConditionsFor = (deviceType) => {
//   const types = DEVICE_CONDITIONS_MAP[deviceType] || ["temperature", "humidity"];
//   return types.map((t) => ({
//     id: t,
//     type: t,
//     label: CONDITION_LABEL[t] || t,
//     operator: ">",
//     value: "",
//   }));
// };

// const AddDevice = () => {
//   const [formData, setFormData] = useState({
//     deviceId: "",
//     organization: "",
//     venue: "",
//     brand: "",
//     deviceType: "", // new field
//   });

//   const dispatch = useDispatch();
//   const { Organizations = [], isLoading: orgsLoading, error: orgError } = useSelector(
//     (s) => s.Organization || {}
//   );
//   const { Venues = [], loading: venueLoading, error: venueError, venuesByOrg = {} } =
//     useSelector((s) => s.Venue || {});

//   useEffect(() => {
//     dispatch(fetchAllOrganizations());
//   }, [dispatch]);

//   const availableVenues = formData.organization ? venuesByOrg[formData.organization] ?? [] : [];

//   // conditions depend on deviceType
//   const [conditions, setConditions] = useState(makeConditionsFor("TMD")); // default temp+hum
//   const [createdDevice, setCreatedDevice] = useState(null);
//   const [deviceLoading, setDeviceLoading] = useState(false);

//   useEffect(() => {
//     // when organization changes, clear venue and fetch
//     if (formData.organization) {
//       dispatch(fetchVenuesByOrganization(formData.organization));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [formData.organization]);

//   // update conditions when deviceType changes
//   useEffect(() => {
//     if (formData.deviceType) {
//       setConditions(makeConditionsFor(formData.deviceType));
//     } else {
//       setConditions(makeConditionsFor("TMD"));
//     }
//   }, [formData.deviceType]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // organization change: clear venue and fetch
//     if (name === "organization") {
//       setFormData((prev) => ({ ...prev, organization: value, venue: "" }));
//       return;
//     }

//     // deviceType change handled above via effect
//     if (name === "deviceType") {
//       setFormData((prev) => ({ ...prev, deviceType: value }));
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleConditionChange = (index, key, value) => {
//     setConditions((prev) => {
//       const next = [...prev];
//       next[index] = { ...next[index], [key]: value };
//       return next;
//     });
//   };

//   const handleSaveDevice = async () => {
//     if (!formData.deviceId?.trim()) {
//       return Swal.fire({ icon: "warning", title: "Enter Device ID" });
//     }
//     if (!formData.organization) {
//       return Swal.fire({ icon: "warning", title: "Select Organization" });
//     }
//     if (!formData.venue) {
//       return Swal.fire({ icon: "warning", title: "Select Venue" });
//     }
//     if (!formData.deviceType) {
//       return Swal.fire({ icon: "warning", title: "Select Device Type" });
//     }

//     // build payload conditions
//     const payloadConditions = Array.isArray(conditions)
//       ? conditions.map((c) => ({
//           type: c.type,
//           operator: (c.operator || "").toString().trim(),
//           value: c.value === "" || c.value === undefined ? "" : c.value,
//         }))
//       : [];

//     const filtered = payloadConditions.filter((c) => c.type && c.operator && c.value !== "");

//     // Validate types present for selected deviceType
//     const requiredTypes = DEVICE_CONDITIONS_MAP[formData.deviceType] || ["temperature", "humidity"];
//     const providedTypes = filtered.map((c) => c.type);
//     for (const t of requiredTypes) {
//       if (!providedTypes.includes(t)) {
//         return Swal.fire({
//           icon: "warning",
//           title: "Missing condition",
//           text: `${DEVICE_TYPE_LABEL[formData.deviceType]} requires "${CONDITION_LABEL[t] || t}" condition.`,
//         });
//       }
//     }

//     // validate each cond
//     const validTypes = ["temperature", "humidity", "odour", "AQI", "gass"];
//     const validOps = [">", "<"];

//     for (const c of filtered) {
//       if (!validTypes.includes(c.type)) {
//         return Swal.fire({
//           icon: "warning",
//           title: "Invalid condition type",
//           text: `Type "${c.type}" not allowed`,
//         });
//       }

//       if (!validOps.includes(c.operator)) {
//         return Swal.fire({
//           icon: "warning",
//           title: "Invalid operator",
//           text: `Operator "${c.operator}" not allowed. Use > or <`,
//         });
//       }

//       const num = Number(c.value);
//       if (!Number.isFinite(num)) {
//         return Swal.fire({
//           icon: "warning",
//           title: "Invalid condition value",
//           text: `Value for ${CONDITION_LABEL[c.type] || c.type} must be a number.`,
//         });
//       }
//       c.value = num;
//     }

//     const finalConditions = filtered;

//     setDeviceLoading(true);
//     try {
//       const device = await dispatch(
//         createDevice({
//           deviceId: formData.deviceId.trim(),
//           venueId: formData.venue,
//           deviceType: formData.deviceType,
//           conditions: finalConditions,
//         })
//       ).unwrap();

//       setCreatedDevice(device);
//       Swal.fire({ icon: "success", title: "Device Created" });

//       setFormData({ deviceId: "", organization: "", venue: "", brand: "", deviceType: "" });
//       setConditions(makeConditionsFor("TMD"));
//     } catch (err) {
//       console.error("Create device error:", err);
//       const text =
//         (err && (err.message || err)) || "Something went wrong while creating device";
//       Swal.fire({ icon: "error", title: "Create failed", text });
//     } finally {
//       setDeviceLoading(false);
//     }
//   };

//   const handleCopyApiKey = () => {
//     if (!createdDevice?.apiKey) return;
//     navigator.clipboard.writeText(createdDevice.apiKey)
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
//       .catch(() => Swal.fire({ icon: "error", title: "Copy failed" }));
//   };

//   return (
//     <div className="AddingPage device-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
//       <h2 className="device-add-title font-semibold mb-2 text-center ">Add Devices</h2>

//       <div className="device-add-form space-y-4 max-w-md mx-auto w-full">
//         <InputField
//           id="deviceId"
//           name="deviceId"
//           label="Device ID"
//           type="text"
//           value={formData.deviceId}
//           onchange={(e) => handleChange(e)}
//           placeholder="Device ID"
//           icon={<Box size={20} />}
//         />

//         <div className="relative">
//           <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-30" size={20} />
//           <FormControl fullWidth>
//             <Select
//               displayEmpty
//               value={formData.organization}
//               onChange={handleChange}
//               inputProps={{ name: "organization" }}
//               MenuProps={menuProps}
//               sx={{ pl: "1.5rem", height: SELECT_HEIGHT, backgroundColor: "white", borderRadius: "0.375rem" }}
//               renderValue={(selected) => {
//                 if (!selected) return <span className="text-gray-500">Select an organization</span>;
//                 const org = Organizations.find((o) => String(o._id ?? o.id) === String(selected));
//                 return org?.name ?? selected;
//               }}
//             >
//               {orgsLoading ? (
//                 <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>Loading orgs...</MenuItem>
//               ) : orgError ? (
//                 <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>{String(orgError)}</MenuItem>
//               ) : Organizations.length === 0 ? (
//                 <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>No organizations</MenuItem>
//               ) : (
//                 Organizations.map((org, idx) => {
//                   const id = org._id ?? org.id ?? idx;
//                   return (
//                     <MenuItem key={id} value={id} sx={{ height: ITEM_HEIGHT, display: "flex", alignItems: "center" }}>
//                       {org.name}
//                     </MenuItem>
//                   );
//                 })
//               )}
//             </Select>
//           </FormControl>
//         </div>

//         {formData.organization && (
//           <div className="relative">
//             <FormControl fullWidth>
//               <Select
//                 displayEmpty
//                 value={formData.venue}
//                 onChange={handleChange}
//                 inputProps={{ name: "venue" }}
//                 MenuProps={menuProps}
//                 sx={{ pl: "1.5rem", height: SELECT_HEIGHT, backgroundColor: "white", borderRadius: "0.375rem" }}
//                 renderValue={(selected) => {
//                   if (!selected) return <span className="text-gray-500">Select a venue</span>;
//                   const v = (availableVenues || []).find((x) => String(x._id ?? x.id) === String(selected));
//                   return v?.name ?? selected;
//                 }}
//               >
//                 {venueLoading ? (
//                   <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>Loading venues...</MenuItem>
//                 ) : venueError ? (
//                   <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>{String(venueError)}</MenuItem>
//                 ) : (availableVenues || []).length === 0 ? (
//                   <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>No venues for this organization</MenuItem>
//                 ) : (
//                   (availableVenues || []).map((venue, index) => {
//                     const id = venue._id ?? venue.id ?? index;
//                     const name = venue.name ?? `Venue ${index + 1}`;
//                     return (
//                       <MenuItem key={id} value={id} sx={{ height: ITEM_HEIGHT, display: "flex", alignItems: "center" }}>
//                         {name}
//                       </MenuItem>
//                     );
//                   })
//                 )}
//               </Select>
//             </FormControl>
//           </div>
//         )}

//         {/* Device Type select (shown after venue selected) */}
//         {formData.venue && (
//           <div>
//             <FormControl fullWidth>
//               <InputLabel id="device-type-label">Device Type</InputLabel>
//               <Select
//                 labelId="device-type-label"
//                 value={formData.deviceType || ""}
//                 label="Device Type"
//                 name="deviceType"
//                 onChange={handleChange}
//                 MenuProps={menuProps}
//                 sx={{ height: SELECT_HEIGHT, borderRadius: "0.375rem" }}
//               >
//                 <MenuItem value="">Select Device Type</MenuItem>
//                 <MenuItem value="OMD">{DEVICE_TYPE_LABEL.OMD}</MenuItem>
//                 <MenuItem value="TMD">{DEVICE_TYPE_LABEL.TMD}</MenuItem>
//                 <MenuItem value="AQIMD">{DEVICE_TYPE_LABEL.AQIMD}</MenuItem>
//                 <MenuItem value="GLMD">{DEVICE_TYPE_LABEL.GLMD}</MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//         )}

//         {/* Conditions */}
//         <div className="mt-2">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-[12px] font-semibold text-gray-600">Conditions</p>
//           </div>

//           <div className="space-y-3">
//             {conditions.map((cond, idx) => (
//               <div key={cond.id} className="flex items-center gap-2">
//                 <div className="relative flex-1">
//                   <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="text"
//                     value={cond.label}
//                     readOnly
//                     className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent outline-none border-none text-gray-600 text-sm"
//                   />
//                 </div>

//                 <div className="relative flex-[0.5]">
//                   <select
//                     value={cond.operator}
//                     onChange={(e) => handleConditionChange(idx, "operator", e.target.value)}
//                     className="w-full pl-3 pr-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                     aria-label={`operator-${idx}`}
//                   >
//                     <option value=">">&gt;</option>
//                     <option value="<">&lt;</option>
//                   </select>
//                 </div>

//                 <div className="relative flex-[0.6] sm:flex-[1]">
//                   <input
//                     type="number"
//                     placeholder={cond.type === "temperature" ? "25" : cond.type === "AQI" ? "50" : "50"}
//                     value={cond.value}
//                     onChange={(e) => handleConditionChange(idx, "value", e.target.value)}
//                     className="w-full pl-3 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
//                   />
//                   <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
//                     {CONDITION_UNIT[cond.type] ?? ""}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-6">
//           <button
//             onClick={handleSaveDevice}
//             disabled={deviceLoading}
//             className={`
//               w-full py-2.5 px-4 rounded-md font-semibold text-white
//               ${deviceLoading ? "bg-[#1E64D9]/70 cursor-not-allowed" : "bg-[#1E64D9] hover:bg-[#1557C7] cursor-pointer"}
//             `}
//           >
//             {deviceLoading ? "Saving..." : "Save"}
//           </button>
//         </div>

//         {createdDevice?.apiKey && (
//           <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-5">
//             <strong>API Key:</strong>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="mt-2 text-sm font-mono md:hidden" title={createdDevice.apiKey}>
//                   {createdDevice.apiKey ? `${createdDevice.apiKey.slice(0, 15)}...` : ""}
//                 </div>
//                 <div className="mt-2 text-sm font-mono hidden md:block" title={createdDevice.apiKey}>
//                   {createdDevice.apiKey ? `${createdDevice.apiKey.slice(0, 25)}...` : ""}
//                 </div>
//               </div>
//               <img
//                 src="/copyicon.svg"
//                 alt="Copy API KEY Icon"
//                 className="w-[20px] h-[30px] cursor-pointer"
//                 onClick={handleCopyApiKey}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddDevice;


























// src/pages/management/AddDevice.jsx
import React, { useEffect, useState } from "react";
import { Box, Building, Thermometer } from "lucide-react";
import InputField from "../../components/Inputs/InputField";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
import { fetchVenuesByOrganization } from "../../slices/VenueSlice";
import { createDevice } from "../../slices/DeviceSlice";
import Swal from "sweetalert2";
import { Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "../../styles/pages/management-pages.css";

const DEVICE_CONDITIONS_MAP = {
  OMD: ["temperature", "humidity", "odour"],
  TMD: ["temperature", "humidity"],
  AQIMD: ["AQI", "temperature", "humidity"],
  GLMD: ["gass", "temperature", "humidity"],
};

const CONDITION_LABEL = {
  temperature: "Temperature",
  humidity: "Humidity",
  odour: "Odour",
  AQI: "AQI",
  gass: "Leakage",
};

const CONDITION_UNIT = {
  temperature: "°C",
  humidity: "%",
  odour: "%",
  AQI: "AQI",
  gass: "%",
};

const DEVICE_TYPE_LABEL = {
  OMD: "Odour Monitoring Device",
  TMD: "Temperature Monitoring Device",
  AQIMD: "Air Quality Index Monitoring Device",
  GLMD: "Leakage Monitoring Device",
};

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

const makeConditionsFor = (deviceType) => {
  const types = DEVICE_CONDITIONS_MAP[deviceType] || ["temperature", "humidity"];
  return types.map((t) => ({
    id: t,
    type: t,
    label: CONDITION_LABEL[t] || t,
    operator: ">",
    value: "",
  }));
};

const AddDevice = () => {
  const [formData, setFormData] = useState({
    deviceId: "",
    organization: "",
    venue: "",
    brand: "",
    deviceType: "", // new field
  });

  const dispatch = useDispatch();
  const { Organizations = [], isLoading: orgsLoading, error: orgError } = useSelector(
    (s) => s.Organization || {}
  );
  const { Venues = [], loading: venueLoading, error: venueError, venuesByOrg = {} } =
    useSelector((s) => s.Venue || {});

  useEffect(() => {
    dispatch(fetchAllOrganizations());
  }, [dispatch]);

  const availableVenues = formData.organization ? venuesByOrg[formData.organization] ?? [] : [];

  // conditions depend on deviceType
  const [conditions, setConditions] = useState(makeConditionsFor("TMD")); // default temp+hum
  const [createdDevice, setCreatedDevice] = useState(null);
  const [deviceLoading, setDeviceLoading] = useState(false);

  useEffect(() => {
    // when organization changes, clear venue and fetch
    if (formData.organization) {
      dispatch(fetchVenuesByOrganization(formData.organization));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.organization]);

  // update conditions when deviceType changes
  useEffect(() => {
    if (formData.deviceType) {
      setConditions(makeConditionsFor(formData.deviceType));
    } else {
      setConditions(makeConditionsFor("TMD"));
    }
  }, [formData.deviceType]);

  // --- NEW: modal state & auto-open when deviceType selected
  const [condModalOpen, setCondModalOpen] = useState(false);
  useEffect(() => {
    // open modal automatically when user selects a device type (non-empty)
    if (formData.deviceType) {
      setCondModalOpen(true);
    }
  }, [formData.deviceType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // organization change: clear venue and fetch
    if (name === "organization") {
      setFormData((prev) => ({ ...prev, organization: value, venue: "" }));
      return;
    }

    // deviceType change handled above via effect
    if (name === "deviceType") {
      setFormData((prev) => ({ ...prev, deviceType: value }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (index, key, value) => {
    setConditions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const handleSaveDevice = async () => {
    if (!formData.deviceId?.trim()) {
      return Swal.fire({ icon: "warning", title: "Enter Device ID" });
    }
    if (!formData.organization) {
      return Swal.fire({ icon: "warning", title: "Select Organization" });
    }
    if (!formData.venue) {
      return Swal.fire({ icon: "warning", title: "Select Venue" });
    }
    if (!formData.deviceType) {
      return Swal.fire({ icon: "warning", title: "Select Device Type" });
    }

    // build payload conditions
    const payloadConditions = Array.isArray(conditions)
      ? conditions.map((c) => ({
          type: c.type,
          operator: (c.operator || "").toString().trim(),
          value: c.value === "" || c.value === undefined ? "" : c.value,
        }))
      : [];

    const filtered = payloadConditions.filter((c) => c.type && c.operator && c.value !== "");

    // Validate types present for selected deviceType
    const requiredTypes = DEVICE_CONDITIONS_MAP[formData.deviceType] || ["temperature", "humidity"];
    const providedTypes = filtered.map((c) => c.type);
    for (const t of requiredTypes) {
      if (!providedTypes.includes(t)) {
        return Swal.fire({
          icon: "warning",
          title: "Missing condition",
          text: `${DEVICE_TYPE_LABEL[formData.deviceType]} requires "${CONDITION_LABEL[t] || t}" condition.`,
        });
      }
    }

    // validate each cond
    const validTypes = ["temperature", "humidity", "odour", "AQI", "gass"];
    const validOps = [">", "<"];

    for (const c of filtered) {
      if (!validTypes.includes(c.type)) {
        return Swal.fire({
          icon: "warning",
          title: "Invalid condition type",
          text: `Type "${c.type}" not allowed`,
        });
      }

      if (!validOps.includes(c.operator)) {
        return Swal.fire({
          icon: "warning",
          title: "Invalid operator",
          text: `Operator "${c.operator}" not allowed. Use > or <`,
        });
      }

      const num = Number(c.value);
      if (!Number.isFinite(num)) {
        return Swal.fire({
          icon: "warning",
          title: "Invalid condition value",
          text: `Value for ${CONDITION_LABEL[c.type] || c.type} must be a number.`,
        });
      }
      c.value = num;
    }

    const finalConditions = filtered;

    setDeviceLoading(true);
    try {
      const device = await dispatch(
        createDevice({
          deviceId: formData.deviceId.trim(),
          venueId: formData.venue,
          deviceType: formData.deviceType,
          conditions: finalConditions,
        })
      ).unwrap();

      setCreatedDevice(device);
      Swal.fire({ icon: "success", title: "Device Created" });

      setFormData({ deviceId: "", organization: "", venue: "", brand: "", deviceType: "" });
      setConditions(makeConditionsFor("TMD"));
      setCondModalOpen(false);
    } catch (err) {
      console.error("Create device error:", err);
      const text =
        (err && (err.message || err)) || "Something went wrong while creating device";
      Swal.fire({ icon: "error", title: "Create failed", text });
    } finally {
      setDeviceLoading(false);
    }
  };

  const handleCopyApiKey = () => {
    if (!createdDevice?.apiKey) return;
    navigator.clipboard.writeText(createdDevice.apiKey)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Copied!",
          timer: 1200,
          width: 150,
          showConfirmButton: false,
          position: "top-end",
          toast: true,
          customClass: { popup: "small-toast" },
        });
      })
      .catch(() => Swal.fire({ icon: "error", title: "Copy failed" }));
  };

  return (
    <div className="AddingPage device-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
      <h2 className="device-add-title font-semibold mb-2 text-center ">Add Devices</h2>

      <div className="device-add-form space-y-4 max-w-md mx-auto w-full">
        <InputField
          id="deviceId"
          name="deviceId"
          label="Device ID"
          type="text"
          value={formData.deviceId}
          onchange={(e) => handleChange(e)}
          placeholder="Device ID"
          icon={<Box size={20} />}
        />

        <div className="relative">
          <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-30" size={20} />
          <FormControl fullWidth>
            <Select
              displayEmpty
              value={formData.organization}
              onChange={handleChange}
              inputProps={{ name: "organization" }}
              MenuProps={menuProps}
              sx={{ pl: "1.5rem", height: SELECT_HEIGHT, backgroundColor: "white", borderRadius: "0.375rem" }}
              renderValue={(selected) => {
                if (!selected) return <span className="text-gray-500">Select an organization</span>;
                const org = Organizations.find((o) => String(o._id ?? o.id) === String(selected));
                return org?.name ?? selected;
              }}
            >
              {orgsLoading ? (
                <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>Loading orgs...</MenuItem>
              ) : orgError ? (
                <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>{String(orgError)}</MenuItem>
              ) : Organizations.length === 0 ? (
                <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>No organizations</MenuItem>
              ) : (
                Organizations.map((org, idx) => {
                  const id = org._id ?? org.id ?? idx;
                  return (
                    <MenuItem key={id} value={id} sx={{ height: ITEM_HEIGHT, display: "flex", alignItems: "center" }}>
                      {org.name}
                    </MenuItem>
                  );
                })
              )}
            </Select>
          </FormControl>
        </div>

        {formData.organization && (
          <div className="relative">
            <FormControl fullWidth>
              <Select
                displayEmpty
                value={formData.venue}
                onChange={handleChange}
                inputProps={{ name: "venue" }}
                MenuProps={menuProps}
                sx={{ pl: "1.5rem", height: SELECT_HEIGHT, backgroundColor: "white", borderRadius: "0.375rem" }}
                renderValue={(selected) => {
                  if (!selected) return <span className="text-gray-500">Select a venue</span>;
                  const v = (availableVenues || []).find((x) => String(x._id ?? x.id) === String(selected));
                  return v?.name ?? selected;
                }}
              >
                {venueLoading ? (
                  <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>Loading venues...</MenuItem>
                ) : venueError ? (
                  <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>{String(venueError)}</MenuItem>
                ) : (availableVenues || []).length === 0 ? (
                  <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>No venues for this organization</MenuItem>
                ) : (
                  (availableVenues || []).map((venue, index) => {
                    const id = venue._id ?? venue.id ?? index;
                    const name = venue.name ?? `Venue ${index + 1}`;
                    return (
                      <MenuItem key={id} value={id} sx={{ height: ITEM_HEIGHT, display: "flex", alignItems: "center" }}>
                        {name}
                      </MenuItem>
                    );
                  })
                )}
              </Select>
            </FormControl>
          </div>
        )}

        {/* Device Type select (shown after venue selected) */}
        {formData.venue && (
          <div>
            <FormControl fullWidth>
              <InputLabel id="device-type-label">Device Type</InputLabel>
              <Select
                labelId="device-type-label"
                value={formData.deviceType || ""}
                label="Device Type"
                name="deviceType"
                onChange={handleChange}
                MenuProps={menuProps}
                sx={{ height: SELECT_HEIGHT, borderRadius: "0.375rem" }}
              >
                <MenuItem value="">Select Device Type</MenuItem>
                <MenuItem value="OMD">{DEVICE_TYPE_LABEL.OMD}</MenuItem>
                <MenuItem value="TMD">{DEVICE_TYPE_LABEL.TMD}</MenuItem>
                <MenuItem value="AQIMD">{DEVICE_TYPE_LABEL.AQIMD}</MenuItem>
                <MenuItem value="GLMD">{DEVICE_TYPE_LABEL.GLMD}</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}

        {/* Conditions header + quick edit button (modal is the primary editor) */}
    

        {/* small preview of conditions (keeps compact UI without modal open) */}
        {/* <div className="space-y-3">
          {conditions.map((cond) => (
            <div key={cond.id} className="flex items-center gap-2 text-sm text-gray-700">
              <div className="flex-1 truncate">
                <strong>{cond.label}</strong>
                <span className="ml-2 text-gray-500">{cond.operator} {cond.value === "" ? <em className="text-gray-400">—</em> : `${cond.value}${CONDITION_UNIT[cond.type] ?? ""}`}</span>
              </div>
            </div>
          ))}
        </div> */}

        <div className="mt-6">
          <button
            onClick={handleSaveDevice}
            disabled={deviceLoading}
            className={`
              w-full py-2.5 px-4 rounded-md font-semibold text-white
              ${deviceLoading ? "bg-[#1E64D9]/70 cursor-not-allowed" : "bg-[#1E64D9] hover:bg-[#1557C7] cursor-pointer"}
            `}
          >
            {deviceLoading ? "Saving..." : "Save"}
          </button>
        </div>

        {createdDevice?.apiKey && (
          <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-5">
            <strong>API Key:</strong>
            <div className="flex items-center justify-between">
              <div>
                <div className="mt-2 text-sm font-mono md:hidden" title={createdDevice.apiKey}>
                  {createdDevice.apiKey ? `${createdDevice.apiKey.slice(0, 15)}...` : ""}
                </div>
                <div className="mt-2 text-sm font-mono hidden md:block" title={createdDevice.apiKey}>
                  {createdDevice.apiKey ? `${createdDevice.apiKey.slice(0, 25)}...` : ""}
                </div>
              </div>
              <img
                src="/copyicon.svg"
                alt="Copy API KEY Icon"
                className="w-[20px] h-[30px] cursor-pointer"
                onClick={handleCopyApiKey}
              />
            </div>
          </div>
        )}
      </div>

      {/* -----------------------------
          Conditions Modal (MUI Dialog)
         ----------------------------- */}
      <Dialog open={condModalOpen} onClose={() => setCondModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle className="flex items-center justify-between">
          <span>Configure Conditions</span>
          <IconButton onClick={() => setCondModalOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <div className="space-y-3">
            {conditions.map((cond, idx) => (
              <div key={cond.id} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={cond.label}
                    readOnly
                    className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent outline-none border-none text-gray-600 text-sm"
                  />
                </div>

                <div className="relative flex-[0.5]">
                  <select
                    value={cond.operator}
                    onChange={(e) => handleConditionChange(idx, "operator", e.target.value)}
                    className="w-full pl-3 pr-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
                    aria-label={`operator-${idx}`}
                  >
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                  </select>
                </div>

                <div className="relative flex-[0.6] sm:flex-[1]">
                  <input
                    type="number"
                    placeholder={cond.type === "temperature" ? "25" : cond.type === "AQI" ? "50" : "50"}
                    value={cond.value}
                    onChange={(e) => handleConditionChange(idx, "value", e.target.value)}
                    className="w-full pl-3 pr-10 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                    {CONDITION_UNIT[cond.type] ?? ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setCondModalOpen(false)} variant="outlined">Cancel</Button>
          <Button
            onClick={() => {
              // keep it simple: close modal (conditions already edited in `conditions` state)
              setCondModalOpen(false);
            }}
            variant="contained"
          >
            Save conditions
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDevice;

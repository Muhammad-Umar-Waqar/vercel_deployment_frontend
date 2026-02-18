// import AlertsChart from "./AlertsChart";
// import { useDispatch, useSelector } from "react-redux";
// import { useStore } from "../../contexts/storecontexts";
// import { useEffect, useState } from "react";
// import QRCode from "./QrCode";
// import { useLocation } from "react-router-dom";
// import CloseIcon from '@mui/icons-material/Close';
// import { IconButton, Skeleton } from "@mui/material";
// import { fetchVenuesByOrganization } from "../../slices/VenueSlice";
// import { Download } from "lucide-react";
// import Swal from "sweetalert2";
// import DownloadModal from "./DownloadModal";

// export default function VenueDetailsPanel({
//   organizationId = null,
//   venueName = "Karim Korangi Branch",
//   freezerTemperature = false,
//   ambientTemperature = 25,
//   batteryLow = true,
//   needMaintenance = true,
//   apiKey = "",
//   closeIcon = false,
//   onClose = undefined,
//   humidity=0,
//   espOdour=0,
//   odourAlert = false,
//   temperatureAlert = false,
//   humidityAlert = false,
//   deviceId = "",
//   lastUpdateTime=null
// }) {
//   const dispatch = useDispatch();
//   const { user } = useStore();
//   const orgId = organizationId || user?.organization || null;

  
// const location = useLocation();
// const params = new URLSearchParams(location.search);
// const venueId = params.get("venue"); // gives the ID
// const [downloadOpen, setDownloadOpen] = useState(false);

// // const venuesFromSlice = useSelector((state) => state.Venue.Venues || []);

// // const currentVenueSlice = venuesFromSlice.find(v => v._id === venueId) || null;

//  // --- select cached venues for this org
//   const orgVenues = useSelector(
//     (state) => (orgId ? state.Venue.venuesByOrg[orgId] || [] : [])
//   );

//   // --- fallback to global Venues
//   const globalVenues = useSelector((state) => state.Venue.Venues || []);

//     // --- merged array: org venues preferred, fallback to global
//   const venuesFromSlice = orgVenues.length ? orgVenues : globalVenues;

//   console.log("ORGID", orgId)
//   // --- Redux selector: get all alerts for this org
//   const orgAlerts = useSelector((s) =>
//     orgId
//       ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null }
//       : { venues: [], loading: false, error: null }
//   );

//   // // --- Fetch alerts on mount
//   // useEffect(() => {
//   //   if (orgId) dispatch(fetchAlertsByOrg(orgId));
//   // }, [orgId, dispatch]);

//    // --- fetch venues by org if needed
//   useEffect(() => {
//     if (orgId && !orgVenues.length) {
//       dispatch(fetchVenuesByOrganization(orgId));
//     }
//   }, [orgId, orgVenues.length, dispatch]);

//   const venues = orgAlerts?.venues || [];
 
//   // const handleDownload = () => {
//   //   Swal.fire({
//   //       icon: "info", // or "warning"
//   //       title: "Coming Soon!",
//   //       text: "This feature is not available yet. Stay tuned!",
//   //       confirmButtonText: "OK"
//   //     });
//   // };


// const handleDownload = () => {
//   setDownloadOpen(true);
// };

// const sameId = (a, b) => String(a) === String(b);

//    const toInt = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? Math.trunc(n) : null;
//   };

// // --- find current venue
//   const currentVenueSlice =
//     venuesFromSlice.find((v) => sameId(v._id, venueId) || sameId(v.id, venueId)) || null;

//   // --- computed display name
//   const displayVenueName =
//     currentVenueSlice?.name ||
//     currentVenueSlice?.venueName ||
//     venueName ||
//     "Venue";



//     // computed display values (only integer part)
//   const displayTemp = toInt(ambientTemperature);
//   const displayHumidity = toInt(humidity);


//   // helper to format backend timestamp
// const formatLastUpdate = (time) => {
//   if (!time) return null; // handle null

//   const date = new Date(time);

//   // Example: 11 Dec 2025, 19:11
//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return date.toLocaleString(undefined, options); // uses user's locale
// };




//   return (
//     <div
//       className="w-full rounded-lg p-6 shadow-sm space-y-6"
//       style={{ backgroundColor: "#07518D12" }}
//     >
//      {closeIcon && (
//         // only render button when `closeIcon` true (mobile drawer)
//         <div className="flex justify-between items-center">
//           <img src="/iotfiy_logo_rpanel.svg" alt="IOTFIY LOGO" className="h-[30px] w-auto" />

//           <IconButton
//             onClick={() => {
//               if (typeof onClose === "function") onClose(); // guard, then call
//             }}
//             edge="start"
//             aria-label="close-details"
//             size="small"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}
      
//       {/* A. Venue Info Section */}
//       <div className="flex justify-between items-center pb-4 border-b border-[#E5E7EB]/40 mb-6">
//         <div>
//           <p className="text-sm text-[#64748B] font-medium">Device ID </p>
//           {/* <h2 className="text-sm text-[#1E293B] font-bold">{displayVenueName}</h2> */}
//           <h2 className="text-sm text-[#1E293B] font-bold">{deviceId || <Skeleton variant="text" width={70}  />}</h2>
//         </div>
//         <button
//           onClick={handleDownload}
//           className="inline-flex items-center gap-2 px-3 py-2 bg-[#0D5CA4] text-white rounded-full text-xs font-semibold hover:bg-[#0b4e8a]  active:scale-[.98] transition shadow-sm cursor-pointer "
//           aria-label="Download"
//         >
//           <span className="leading-none">Download</span>
//           <Download className="w-3.5 h-3.5" />
//         </button>
//       </div>

    
//       {/* C. Temperature Section */}
//       <div className="relative w-full overflow-hidden mb-6 bg-[#07518D]/[0.05] rounded-xl">
//         <div className="flex flex-col-3 justify-around items-center py-1 ">
//           <div className="flex flex-col-2 items-center justify-center ">
//             <img src="/odour-alert.svg" className="h-[70px] w-[35px]" />
          
//             <p className="text-md md:text-md lg:text-lg xl:text-xl font-semibold">
//               {/* {freezerTemperature ? "Detected" : "Normal"} */}
//               {espOdour}%
//           </p>

            
//           </div>

//           <div className="flex flex-col-2 items-center justify-center ">
//             <img src="/temperature-icon.svg" className="h-[60px] w-[35px]" />
//             <div className="flex flex-col items-end justify-end">
              
//               <p className="text-sm md:text-md lg:text-lg 2xl:text-2xl font-semibold">
//                 {displayTemp}
//                 <span className="xs:text-sm md:text-md 2xl:text-lg font-thin">C</span>
//               </p>
//             </div>
//           </div>

//            <div className="flex flex-col-2 items-center justify-center">
//             <img src="/humidity-alert.svg" className="h-[60px] w-[35px]" />
//             <div className="flex flex-col items-end justify-end">
             
//               <p className="text-sm md:text-md lg:text-lg 2xl:text-2xl font-semibold">
//                 {displayHumidity}
//                 <span className="xs:text-sm md:text-md  2xl:text-lg font-thin">%</span>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* <div>
//           <h3><span></span>Alert Detected</h3>
//         </div> */}

//         {/* <img
//           src="red-alert-icon"
//           alt="Freezer and Ambient Combo"
//           className="w-full h-auto object-cover"
//         /> */}
//       </div>

//         <div className="flex items-end  justify-center sm:justify-start   ">
//             <img src="/yellow-alert.svg" alt="Alert" className="w-auto h-[1.5rem]" />
//         <span className=" font-bold text-xs text-black block sm:hidden">Status</span>
//             {/* <span className="text-[#0D5CA4] text-sm font-medium underline  decoration-[#0D5CA4] decoration-[0.5px] ">Alerts Status</span> */}
//         </div>
      
     

//       {/* <div className="grid grid-cols-3 gap-1 "> */}
//       <div className="grid md:grid-cols-3 gap-1">
//         <div className={`flex items-center  justify-center md:justify-start  gap-4 border border-1 rounded-sm py-0.5 ${odourAlert ? "border-red-500": "border-gray-400"}`}>
//             <img src="/odour-alert.svg" alt="Alert" className="w-6 h-6 " />
//             <span className="text-[#1E293B] text-sm sm:text-xs ">{odourAlert ? (
//         <>
//           <span className="md:hidden">Alert Detected</span>
//           <span className="hidden md:inline">Alert Det.</span>
//         </>
//       ) : (
//               <>
//           <span className="md:hidden">Not Detected</span>
//           <span className="hidden md:inline">Not Det.</span>
//         </>
//       )}</span>
//         </div>
//         <div className={`flex items-center justify-center md:justify-start   gap-4 border border-1 rounded-sm py-0.5 ${temperatureAlert ? "border-green-500": "border-gray-400"}`}>
//             <img src="/temperature-icon.svg" alt="Alert" className="w-6 h-6 " />
//             <span className="text-[#1E293B] text-sm sm:text-xs ">  {temperatureAlert ? (
//         <>
//           <span className="md:hidden">Alert Detected</span>
//           <span className="hidden md:inline">Alert Det.</span>
//         </>
//       ) : (
//                <>
//           <span className="md:hidden">Not Detected</span>
//           <span className="hidden md:inline">Not Det.</span>
//         </>
      
//       )}</span>
//         </div>
//         <div className={`flex items-center  justify-center md:justify-start  gap-4 border border-1 rounded-sm py-0.5  ${humidityAlert ? "border-green-500": "border-gray-400"}`}>
//             <img src="/humidity-alert.svg" alt="Alert" className="w-6 h-6 " />
//             <span className="text-[#1E293B] text-sm sm:text-xs ">
//               {humidityAlert ? (
//         <>
//           <span className="md:hidden">Alert Detected</span>
//           <span className="hidden md:inline">Alert Det.</span>
//         </>
//       ) : (
//                <>
//           <span className="md:hidden">Not Detected</span>
//           <span className="hidden md:inline">Not Det.</span>
//         </>
//       )}
//             </span>
//         </div>
//       </div>
        

        
//       {/* D. Alerts Chart */}
//       {/* <div className="mb-6">
//         {venues.length > 0 ? (
//           <AlertsChart venues={venues} defaultMode="battery" />
//         ) : (
//           <p className="text-sm text-gray-500 text-center">
//             No alert data available
//           </p>
//         )}
//       </div> */}
//       <div>
//     {/* {apiKey && (
//       <div className="mt-3  p-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-2">
//         <div className="flex items-center justify-between ">
//           <div>
//         <strong>API Key:</strong>
//             <div className="mt-2 text-sm " title={apiKey}>
//               {apiKey ? `${apiKey.slice(0, 15)}...` : ""}
//             </div>
//           </div>

//           <QRCode apiKey={apiKey} baseUrl={import.meta.env.VITE_REACT_URI || 'http://localhost:5173'} />
//         </div>
//       </div>
//     )} */}



// {apiKey ? (
//   <div className="mt-3 p-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-2">
//     <div className="flex items-center justify-between">
//       <div>
//         <strong>API Key:</strong>
//         <div className="mt-2 text-sm" title={apiKey}>
//           {apiKey ? `${apiKey.slice(0, 15)}...` : ""}
//         </div>
//       </div>

//       <QRCode apiKey={apiKey} baseUrl={import.meta.env.VITE_REACT_URI || 'http://localhost:5173'} />
//     </div>
//   </div>
// ) : (
//   <div className="mt-3 p-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-2">
//     <div className="flex items-center justify-between">
//       <div>
//         {/* <strong>API Key:</strong> */}
//         <Skeleton variant="text" width={50} height={20} className="mb-2" />
//         <Skeleton variant="text" width={120} height={20} className="mb-2" />
//       </div>
//     <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: "10%" }}  />
//   </div>
//   </div>
// )}

// {
//   lastUpdateTime ? <div  className="text-center mt-3 p-2  rounded-xl bg-[#07518D]/[0.05] font-thin text-xs sm:text-md ">Last Update: {formatLastUpdate(lastUpdateTime)}</div>: ""
// }

//       </div>
//       <DownloadModal
//         open={downloadOpen}
//         onClose={() => setDownloadOpen(false)}
//         measurement={deviceId}
//         bucket="Odour"
//       />

//     </div>
//   );
// }

























// // src/pages/Dashboard/VenueDetailsPanel.jsx
// import AlertsChart from "./AlertsChart";
// import { useDispatch, useSelector } from "react-redux";
// import { useStore } from "../../contexts/storecontexts";
// import { useEffect, useState } from "react";
// import QRCode from "./QrCode";
// import { useLocation } from "react-router-dom";
// import CloseIcon from '@mui/icons-material/Close';
// import { IconButton, Skeleton } from "@mui/material";
// import { fetchVenuesByOrganization } from "../../slices/VenueSlice";
// import { Download, Cloud, Zap } from "lucide-react";
// import Swal from "sweetalert2";
// import DownloadModal from "./DownloadModal";

// export default function VenueDetailsPanel({
//   organizationId = null,
//   venueName = "Karim Korangi Branch",
//   deviceType = null,           // OMD / TMD / AQIMD / GLMD
//   espTemprature = 0,
//   ambientTemperature = 25,    // kept for compatibility
//   espHumidity = 0,
//   batteryLow = true,
//   needMaintenance = true,
//   apiKey = "",
//   closeIcon = false,
//   onClose = undefined,
//   odourAlert = false,
//   temperatureAlert = false,
//   humidityAlert = false,
//   aqiAlert = false,
//   glAlert = false,
//   deviceId = "",
//   espOdour = 0,
//   espAQI = null,
//   espGL = null,
//   lastUpdateTime = null
// }) {
//   const dispatch = useDispatch();
//   const { user } = useStore();
//   const orgId = organizationId || user?.organization || null;

//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const venueId = params.get("venue"); // gives the ID
//   const [downloadOpen, setDownloadOpen] = useState(false);

//   // --- select cached venues for this org
//   const orgVenues = useSelector(
//     (state) => (orgId ? state.Venue.venuesByOrg[orgId] || [] : [])
//   );

//   // --- fallback to global Venues
//   const globalVenues = useSelector((state) => state.Venue.Venues || []);

//   // --- merged array: org venues preferred, fallback to global
//   const venuesFromSlice = orgVenues.length ? orgVenues : globalVenues;

//   useEffect(() => {
//     if (orgId && !orgVenues.length) {
//       dispatch(fetchVenuesByOrganization(orgId));
//     }
//   }, [orgId, orgVenues.length, dispatch]);

//   // small helpers
//   const sameId = (a, b) => String(a) === String(b);
//   const toInt = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? Math.trunc(n) : null;
//   };

//   // computed display values
//   const displayTemp = toInt(espTemprature ?? ambientTemperature);
//   const displayHumidity = toInt(espHumidity);
//   const displayOdour = toInt(espOdour);
//   const displayAQI = espAQI === null || espAQI === undefined ? null : toInt(espAQI);
//   const displayGL = espGL === null || espGL === undefined ? null : toInt(espGL);

//   // find venue name fallback
//   const currentVenueSlice =
//     venuesFromSlice.find((v) => sameId(v._id, venueId) || sameId(v.id, venueId)) || null;

//   const displayVenueName =
//     currentVenueSlice?.name ||
//     currentVenueSlice?.venueName ||
//     venueName ||
//     "Venue";

//   const handleDownload = () => setDownloadOpen(true);

//   const formatLastUpdate = (time) => {
//     if (!time) return null;
//     const date = new Date(time);
//     const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
//     return date.toLocaleString(undefined, options);
//   };

//   // Determine label + icon for the left-most specialized metric
//   const specialized = (() => {
//     const t = deviceType ?? "";
//     if (t === "OMD") {
//       return { label: "Odour", unit: "%", value: displayOdour ?? 0, img: "/odour-alert.svg" };
//     }
//     if (t === "AQIMD") {
//       return { label: "AQI", unit: "AQI", value: displayAQI ?? "--", img: null, lucideIcon: <Cloud size={36} /> };
//     }
//     if (t === "GLMD") {
//       // leakage/gass
//       return { label: "Gas", unit: "%", value: displayGL ?? "--", img: null, lucideIcon: <Zap size={36} /> };
//     }
//     // TMD or unknown: prefer showing odour only if present, otherwise blank
//     return { label: "Odour", unit: "%", value: displayOdour ?? 0, img: "/odour-alert.svg" };
//   })();

//   // status text helpers
//   const statusText = (flag) => (flag ? "Alert Det." : "Not Det.");
//   const statusClass = (flag, color = "green") => {
//     if (flag) {
//       if (color === "red") return "border-red-500";
//       if (color === "purple") return "border-purple-600";
//       return "border-green-500";
//     }
//     return "border-gray-300";
//   };

//   return (
//     <div className="w-full rounded-lg p-6 shadow-sm space-y-6" style={{ backgroundColor: "#07518D12" }}>
//       {closeIcon && (
//         <div className="flex justify-between items-center">
//           <img src="/iotfiy_logo_rpanel.svg" alt="IOTFIY LOGO" className="h-[30px] w-auto" />
//           <IconButton onClick={() => typeof onClose === "function" && onClose()} edge="start" aria-label="close-details" size="small">
//             <CloseIcon />
//           </IconButton>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex justify-between items-center pb-4 border-b border-[#E5E7EB]/40 mb-6">
//         <div>
//           <p className="text-sm text-[#64748B] font-medium">Device ID</p>
//           <h2 className="text-sm text-[#1E293B] font-bold">{deviceId || <Skeleton variant="text" width={70} />}</h2>
//           <div className="text-xs text-gray-600">{displayVenueName}</div>
//         </div>

//         <button
//           onClick={handleDownload}
//           className="inline-flex items-center gap-2 px-3 py-2 bg-[#0D5CA4] text-white rounded-full text-xs font-semibold hover:bg-[#0b4e8a] active:scale-[.98] transition shadow-sm cursor-pointer "
//           aria-label="Download"
//         >
//           <span className="leading-none">Download</span>
//           <Download className="w-3.5 h-3.5" />
//         </button>
//       </div>

//       {/* Middle section: specialized metric, temperature, humidity */}
//       <div className="relative w-full overflow-hidden mb-6 bg-[#07518D]/[0.05] rounded-xl p-3">
//         <div className="flex items-center justify-between gap-4">
//           {/* specialized metric */}
//           <div className="flex-1 flex flex-col items-center justify-center">
//             <div className="mb-2">
//               {specialized.img ? (
//                 <img src={specialized.img} className="h-[66px] w-auto" alt={specialized.label} />
//               ) : specialized.lucideIcon ? (
//                 <div className="text-[#0D5CA4]">{specialized.lucideIcon}</div>
//               ) : (
//                 <img src="/odour-alert.svg" className="h-[66px] w-auto" alt={specialized.label} />
//               )}
//             </div>
//             <div className="text-sm text-gray-600">{specialized.label}</div>
//             <div className="text-xl font-semibold">
//               {specialized.value ?? "--"}{specialized.unit ? <span className="text-sm font-thin ml-1">{specialized.unit}</span> : ""}
//             </div>
//           </div>

//           {/* temperature */}
//           <div className="flex-1 flex flex-col items-center justify-center">
//             <img src="/temperature-icon.svg" className="h-[60px] w-auto" />
//             <div className="text-sm text-gray-600">Temperature</div>
//             <div className="text-xl font-semibold">{displayTemp !== null ? `${displayTemp}°C` : "--"}</div>
//           </div>

//           {/* humidity */}
//           <div className="flex-1 flex flex-col items-center justify-center">
//             <img src="/humidity-alert.svg" className="h-[60px] w-auto" />
//             <div className="text-sm text-gray-600">Humidity</div>
//             <div className="text-xl font-semibold">{displayHumidity !== null ? `${displayHumidity}%` : "--"}</div>
//           </div>
//         </div>
//       </div>

//       {/* Status badges for each alert type */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//         <div className={`flex items-center gap-3 p-2 border rounded ${statusClass(odourAlert, "red")}`}>
//           <img src="/odour-alert.svg" alt="odour" className="w-6 h-6" />
//           <div>
//             <div className="text-xs text-gray-600">Odour</div>
//             <div className="text-sm font-medium">{statusText(odourAlert)}</div>
//           </div>
//         </div>

//         <div className={`flex items-center gap-3 p-2 border rounded ${statusClass(temperatureAlert, "green")}`}>
//           <img src="/temperature-icon.svg" alt="temp" className="w-6 h-6" />
//           <div>
//             <div className="text-xs text-gray-600">Temperature</div>
//             <div className="text-sm font-medium">{statusText(temperatureAlert)}</div>
//           </div>
//         </div>

//         <div className={`flex items-center gap-3 p-2 border rounded ${statusClass(humidityAlert, "green")}`}>
//           <img src="/humidity-alert.svg" alt="humidity" className="w-6 h-6" />
//           <div>
//             <div className="text-xs text-gray-600">Humidity</div>
//             <div className="text-sm font-medium">{statusText(humidityAlert)}</div>
//           </div>
//         </div>

//         <div className={`flex items-center gap-3 p-2 border rounded ${statusClass(aqiAlert, "purple")}`}>
//           <div className="w-6 h-6 flex items-center justify-center">
//             <Cloud size={20} />
//           </div>
//           <div>
//             <div className="text-xs text-gray-600">AQI</div>
//             <div className="text-sm font-medium">{statusText(aqiAlert)}</div>
//           </div>
//         </div>

//         <div className={`flex items-center gap-3 p-2 border rounded ${statusClass(glAlert, "red")}`}>
//           <div className="w-6 h-6 flex items-center justify-center">
//             <Zap size={20} />
//           </div>
//           <div>
//             <div className="text-xs text-gray-600">Leakage</div>
//             <div className="text-sm font-medium">{statusText(glAlert)}</div>
//           </div>
//         </div>

//       </div>

//       {/* API key / QR */}
//       <div>
//         {apiKey ? (
//           <div className="mt-3 p-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-2">
//             <div className="flex items-center justify-between">
//               <div>
//                 <strong>API Key:</strong>
//                 <div className="mt-2 text-sm" title={apiKey}>
//                   {apiKey ? `${apiKey.slice(0, 15)}...` : ""}
//                 </div>
//               </div>

//               <QRCode apiKey={apiKey} baseUrl={import.meta.env.VITE_REACT_URI || "http://localhost:5173"} />
//             </div>
//           </div>
//         ) : (
//           <div className="mt-3 p-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-2">
//             <div className="flex items-center justify-between">
//               <div>
//                 <Skeleton variant="text" width={50} height={20} className="mb-2" />
//                 <Skeleton variant="text" width={120} height={20} className="mb-2" />
//               </div>
//               <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: "10%" }} />
//             </div>
//           </div>
//         )}

//         {lastUpdateTime ? <div className="text-center mt-3 p-2 rounded-xl bg-[#07518D]/[0.05] font-thin text-xs sm:text-md">Last Update: {formatLastUpdate(lastUpdateTime)}</div> : null}
//       </div>

//       <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} measurement={deviceId} bucket={deviceType === "OMD" ? "Odour" : "General"} />
//     </div>
//   );
// }



























// src/pages/Dashboard/VenueDetailsPanel.jsx
import AlertsChart from "./AlertsChart";
import { useDispatch, useSelector } from "react-redux";
import { useStore } from "../../contexts/storecontexts";
import { useEffect, useState } from "react";
import QRCode from "./QrCode";
import { useLocation } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Skeleton } from "@mui/material";
import { fetchVenuesByOrganization } from "../../slices/VenueSlice";
import { Download, Cloud, Zap } from "lucide-react";
import Swal from "sweetalert2";
import DownloadModal from "./DownloadModal";

export default function VenueDetailsPanel({
  organizationId = null,
  venueName = "Karim Korangi Branch",
  deviceType = null,           // OMD / TMD / AQIMD / GLMD
  espTemprature = 0,
  ambientTemperature = 0,
  espHumidity = 0,
  batteryLow = true,
  needMaintenance = true,
  apiKey = "",
  closeIcon = false,
  onClose = undefined,
  odourAlert = false,
  temperatureAlert = false,
  humidityAlert = false,
  aqiAlert = false,
  glAlert = false,
  deviceId = "",
  espOdour = 0,
  espAQI = null,
  espGL = null,
  lastUpdateTime = null
}) {
  const dispatch = useDispatch();
  const { user } = useStore();
  const orgId = organizationId || user?.organization || null;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const venueId = params.get("venue"); // gives the ID
  const [downloadOpen, setDownloadOpen] = useState(false);

  // --- select cached venues for this org
  const orgVenues = useSelector((state) => (orgId ? state.Venue.venuesByOrg[orgId] || [] : []));
  const globalVenues = useSelector((state) => state.Venue.Venues || []);
  const venuesFromSlice = orgVenues.length ? orgVenues : globalVenues;
  
  
  
  useEffect(() => {
    if (orgId && !orgVenues.length) {
      dispatch(fetchVenuesByOrganization(orgId));
    }
   
  }, [orgId, orgVenues.length, dispatch]);

  // helpers
  const sameId = (a, b) => String(a) === String(b);
  const toInt = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : null;
  };

  // computed display values
  const displayTemp = toInt(espTemprature ?? ambientTemperature);
  const displayHumidity = toInt(espHumidity);
  const displayOdour = toInt(espOdour);
  const displayAQI = espAQI === null || espAQI === undefined ? null : toInt(espAQI);
  const displayGL = espGL === null || espGL === undefined ? null : toInt(espGL);

  // find venue name fallback
  const currentVenueSlice =
    venuesFromSlice.find((v) => sameId(v._id, venueId) || sameId(v.id, venueId)) || null;

  const displayVenueName =
    currentVenueSlice?.name ||
    currentVenueSlice?.venueName ||
    venueName ||
    "Venue";

  const handleDownload = () => setDownloadOpen(true);

  const formatLastUpdate = (time) => {
    if (!time) return null;
    const date = new Date(time);
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleString(undefined, options);
  };

  // Build the set of metrics to display based on deviceType
  // Each metric: { key, label, unit, value, img, lucideIcon, alertFlag }
  const metrics = (() => {
    const tempMetric = {
      key: "temperature",
      label: "Temperature",
      unit: "°C",
      value: displayTemp !== null ? displayTemp : "--",
      img: "/temperature-icon.svg",
      lucideIcon: null,
      alertFlag: !!temperatureAlert,
      color: "green"
    };
    const humMetric = {
      key: "humidity",
      label: "Humidity",
      unit: "%",
      value: displayHumidity !== null ? displayHumidity : "--",
      img: "/humidity-alert.svg",
      lucideIcon: null,
      alertFlag: !!humidityAlert,
      color: "green"
    };
    if (String(deviceType) === "TMD") {
  return [
    {
      ...tempMetric,
      color: "red",  
    },
    humMetric,
  ];
}

    if (String(deviceType) === "OMD") {
      return [
        { key: "odour", label: "Odour", unit: "%", value: displayOdour ?? 0, img: "/odour-alert.svg", lucideIcon: null, alertFlag: !!odourAlert, color: "red" },
        tempMetric,
        humMetric,
      ];
    }
    if (String(deviceType) === "TMD") {
      return [ tempMetric, humMetric ];
    }
    if (String(deviceType) === "AQIMD") {
      return [
        { key: "aqi", label: "AQI", unit: "AQI", value: displayAQI ?? "--", img: null, lucideIcon: <Cloud size={36} />, alertFlag: !!aqiAlert, color: "red" },
        tempMetric,
        humMetric,
      ];
    }
    if (String(deviceType) === "GLMD") {
      return [
        { key: "gas", label: "Gas", unit: "%", value: displayGL ?? "--", img: null, lucideIcon: <Zap size={36} />, alertFlag: !!glAlert, color: "red" },
        tempMetric,
        humMetric,
      ];
    }
    // fallback: show temp & humidity
    return [ tempMetric, humMetric ];
  })();

   console.log("deviceType", deviceType);


  const statusText = (flag) => (flag ? "Alert Det." : "Not Det.");
  const statusClass = (flag, color = "green") => {
    if (flag) {
      if (color === "red") return "border-red-500";
      if (color === "purple") return "border-purple-600";
      return "border-green-500";
    }
    return "border-gray-300";
  };

  return (
    <div className="w-full rounded-lg p-6 shadow-sm space-y-6" style={{ backgroundColor: "#07518D12" }}>
      {closeIcon && (
        <div className="flex justify-between items-center">
          <img src="/iotfiy_logo_rpanel.svg" alt="IOTFIY LOGO" className="h-[30px] w-auto" />
          <IconButton onClick={() => typeof onClose === "function" && onClose()} edge="start" aria-label="close-details" size="small">
            <CloseIcon />
          </IconButton>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-[#E5E7EB]/40 mb-6">
        <div>
          <p className="text-sm text-[#64748B] font-medium">Device ID</p>
          <h2 className="text-sm text-[#1E293B] font-bold">{deviceId || <Skeleton variant="text" width={70} />}</h2>
          <div className="text-xs text-gray-600">{displayVenueName}</div>
        </div>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-3 py-2 bg-[#0D5CA4] text-white rounded-full text-xs font-semibold hover:bg-[#0b4e8a] active:scale-[.98] transition shadow-sm cursor-pointer "
          aria-label="Download"
        >
          <span className="leading-none">Download</span>
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Middle section: render exactly 3 columns if metrics length === 3, otherwise render each metric evenly */}
      <div className="relative w-full overflow-hidden mb-6 bg-[#07518D]/[0.05] rounded-xl p-3">
        <div
          className={`flex items-center justify-between gap-4 ${metrics.length === 2 ? "sm:justify-around" : ""}`}
        >
          {metrics.map((m) => (
            <div key={m.key} className="flex-1 flex flex-col items-center justify-center">
              <div className="mb-2">
                {m.img ? (
                  <img src={m.img} className="h-[30px] w-auto" alt={m.label} />
                ) : m.lucideIcon ? (
                  <div className="text-[#0D5CA4]">{m.lucideIcon}</div>
                ) : (
                  <img src="/odour-alert.svg" className="h-[66px] w-auto" alt={m.label} />
                )}
              </div>
              <div className="text-sm text-gray-600">{m.label}</div>
              <div className="text-xl font-semibold">
                {m.value ?? "--"}{m.unit ? <span className="text-sm font-thin ml-1">{m.unit}</span> : ""}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status badges: render only the same metrics (keeps your desktop grid classes intact) */}
      <div className={`grid ${metrics.length === 2 ? "grid-cols-2 md:grid-cols-2" : "grid-cols-2 md:grid-cols-2"} gap-2`}>
        {metrics.map((m) => {
          // pick color and flag
          const flag = !!m.alertFlag;
          const color = m.color ?? "green";
          return (
            <div key={m.key} className={`flex items-center gap-3 p-1 border rounded ${statusClass(flag, color)}`}>
              {m.img ? (
                <img src={m.img} alt={m.label} className="w-6 h-6" />
              ) : m.lucideIcon ? (
                <div className="w-6 h-6 flex items-center justify-center">{m.lucideIcon}</div>
              ) : (
                <img src="/alert-icon.png" alt={m.label} className="w-6 h-6" />
              )}
              <div>
                <div className="text-xs text-gray-600">{m.label}</div>
                <div className="text-sm font-medium">{statusText(flag)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* API key / QR */}
      <div>
        {apiKey ? (
          <div className="mt-3 p-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-2">
            <div className="flex items-center justify-between">
              <div>
                <strong>API Key:</strong>
                <div className="mt-2 text-sm" title={apiKey}>
                  {apiKey ? `${apiKey.slice(0, 15)}...` : ""}
                </div>
              </div>

              <QRCode apiKey={apiKey} baseUrl={import.meta.env.VITE_REACT_URI || "http://localhost:5173"} />
            </div>
          </div>
        ) : (
          <div className="mt-3 p-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-2">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton variant="text" width={50} height={20} className="mb-2" />
                <Skeleton variant="text" width={120} height={20} className="mb-2" />
              </div>
              <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: "10%" }} />
            </div>
          </div>
        )}

        {lastUpdateTime ? <div className="text-center mt-3 p-2 rounded-xl bg-[#07518D]/[0.05] font-thin text-xs sm:text-md">Last Update: {formatLastUpdate(lastUpdateTime)}</div> : null}
      </div>

      {/* <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} measurement={deviceId} bucket={deviceType === "OMD" ? "Odour" : "General"} /> */}
      {/* deviceType: 'GLMD' 'TMD' 'OMD' 'AQIMD' */}
            <DownloadModal
            open={downloadOpen}
            onClose={() => setDownloadOpen(false)}
            measurement={deviceId}
            bucket="Odour"
            deviceType={deviceType}
      />
    </div>
  );
}

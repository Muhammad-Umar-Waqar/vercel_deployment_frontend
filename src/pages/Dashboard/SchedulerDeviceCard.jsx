// import React, { useMemo } from "react";
// import { Clock3, CalendarDays, Power, ThermometerSun, Droplets, Calendar, Sunrise, Sun, Sunset } from "lucide-react";
// import "../../styles/pages/Dashboard/dashboard-styles.css";
// import TemperatureRangeMeter from "./TemperatureRangeMeter";

// function formatSmartNumber(v, maxDecimals = 3) {
//   if (v === undefined || v === null || v === "") return "--";
//   const n = Number(v);
//   if (!Number.isFinite(n)) return "--";
//   return parseFloat(n.toFixed(maxDecimals)).toString();
// }

// function formatTime(value) {
//   if (!value) return "--";
//   return String(value);
// }

// function formatDuration(duration) {
//   if (duration === undefined || duration === null || duration === "") return "--";

//   const n = Number(duration);
//   if (!Number.isFinite(n)) return String(duration);

//   const hours = Math.floor(n / 60);
//   const mins = n % 60;

//   if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
//   if (hours > 0) return `${hours}h`;
//   return `${mins}m`;
// }

// function formatRepeat(days = []) {
//   if (!Array.isArray(days) || days.length === 0) return "--";
//   if (days.length === 7) return "Every day";
//   if (days.length <= 3) return days.join(" ");
//   return `${days.slice(0, 2).join(" ")} ... ${days[days.length - 1]}`;
// }

// const SchedulerDeviceCard = React.memo(function SchedulerDeviceCard({
//   deviceId,
//   espTemprature,
//   espHumidity,
//   isOnline,
//   lastUpdateISO,
//   onCardSelect,
//   isSelected,
//   temperatureAlert = false,
//   humidityAlert = false,


//   // schedule props
//   startingOn,
//   duration,
//   repeatDays = [],
//   command = "ON",
//   enabled = true,
//   pollHitTime = { pollHitTime },
// }) {

//   const toNumberOrNull = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : null;
//   };


//   const commandStateClass = useMemo(() => {
//     if (!enabled) return "bg-slate-200 text-slate-600";
//     return String(command).toUpperCase() === "ON"
//       ? "bg-emerald-500 text-white"
//       : "bg-rose-500 text-white";
//   }, [command, enabled]);

//   const commandStateLabel = useMemo(() => {
//     if (!enabled) return "Disabled";
//     return String(command).toUpperCase();
//   }, [command, enabled]);

//   const hour = useMemo(() => {
//     return new Date(pollHitTime).getHours();
//   }, [pollHitTime]);

//   // const timeOfDay = "sunset"
//   const timeOfDay =
//     hour >= 5 && hour <= 8
//       ? "sunrise"
//       : hour >= 9 && hour <= 16
//         ? "day"
//         : hour >= 17 && hour <= 19
//           ? "sunset"
//           : "night";

//   const temp = toNumberOrNull(espTemprature);
//   const hum = toNumberOrNull(espHumidity);

//   const statusColorClass = (hasAlert) =>
//     hasAlert ? "bg-rose-300" : "bg-emerald-200";


//   return (
//     <div
//       onClick={onCardSelect}
//       className={`freezer-card-container rounded-4xl bg-white ${isSelected ? "shadow-lg ring-1 ring-[#0D5CA4]/15" : ""
//         } min-h-[175px] cursor-pointer transition hover:shadow-md`}
//     >
//       <div className="px-4 py-3 h-full flex flex-col justify-between">
//         <div className="flex justify-between items-start gap-3">
//           <div>
//             <div className="flex items-center">
//               <span
//                 aria-hidden
//                 className={`inline-block h-2 w-2 rounded-full mr-2 shadow-sm ${isOnline ? "bg-green-300" : "bg-gray-300"
//                   }`}
//                 style={{ boxShadow: isOnline ? "0 0 6px rgba(34,197,94,0.45)" : "none" }}
//               />
//               <div className="text-xs text-gray-500">Device ID</div>
//             </div>
//             <div className="text-lg font-bold text-gray-900">{deviceId}</div>
//           </div>
//           <label className="inline-flex items-center cursor-pointer bg-green-500 rounded-full">
//             <input type="checkbox" value="" className="sr-only peer" />
//             <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
//           </label>
//         </div>

//         <div className="flex justify-between ">         
//           <div className="flex flex-col">
//             <div className="flex items-center justify-start gap-3 mt-2 flex-nowrap overflow-hidden   border-b-2 border-[#C3C1C1] pb-2 ">
//               <div className={`p-2 rounded-full border ${timeOfDay === "sunrise" ? "border-1 border-gray-600" : "border-transparent"}`}>
//                 <Sunrise size={18} className={`${timeOfDay === "sunrise" ? "text-yellow-600" : "text-gray-500"}`} />
//               </div>
//               <div className={`p-2 rounded-full border ${timeOfDay === "day" ? "border-1 border-gray-600" : "border-transparent"}`}>
//                 <Sun size={18} className={`${timeOfDay === "day" ? "text-yellow-500" : "text-gray-500"}`} />
//               </div>
//               <div className={`p-2 rounded-full border ${(timeOfDay === "sunset" || timeOfDay === "night") ? "border-1 border-gray-600" : "border-transparent"}`}>
//                 <Sunset size={18} className={`${timeOfDay === "sunset" ? "text-orange-500" : "text-gray-500"}`} />
//               </div>
//             </div>
//             <TemperatureRangeMeter value={12 !== null ? Math.round(23) : 0} />
//           </div>

//           <div className="flex flex-col justify-around">

//             <div className=" flex flex-col items-center justify-around ">
              
//               <div className="text-right">
//                 <div className="text-sm text-gray-500">Humidity</div>
//                 <div className="text-xl font-bold">
//                   {hum !== null ? `${Math.round(hum)}%` : "--"}
//                 </div>

//                 <div className=" ">
//                   <div className="h-2 rounded-full overflow-hidden bg-gray-100">
//                     <div className={`h-2 ${statusColorClass(humidityAlert)}`} />
//                   </div>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <div className="text-xs text-gray-500">Temperature</div>
//                 <div className="text-xl font-bold">
//                   {temp !== null ? `${Math.round(temp)}` : "--"}<span className="font-normal">°C</span>
//                 </div>

//                 <div >
//                   <div className="h-2 rounded-full overflow-hidden bg-gray-100">

//                     <div className={`h-2 ${statusColorClass(temperatureAlert)}`} />
//                   </div>
//                 </div>
//               </div>


//             </div>

//             <div />
//           </div>


//         </div>




//         <div className="flex justify-between items-center gap-4">
//           <div className="flex items-center justify-center gap-2 ">
//             <CalendarDays className="w-6 h-6 text-gray-600" />
//             <div className="flex flex-col ">
//               <p className="text-[11px] text-gray-500">Starting On</p>
//               <div className="text-sm font-bold text-gray-900 ">{formatDuration(duration)}</div>
//             </div>
//           </div>


//           <div>
//             <div className="flex items-center gap-1 text-[11px] text-gray-500">
//               <Power className="w-3 h-3" />
//               Duration
//             </div>
//             <div className="text-sm font-bold text-gray-900 ">{formatDuration(duration)}</div>
//           </div>

//           <div>
//             <div className="flex items-center gap-1 text-[11px] text-gray-500">

//               Status
//             </div>
//             <div className="text-sm font-bold text-gray-900 ">On</div>
//           </div>
//         </div>


//       </div>
//     </div>
//   );
// });


// export default SchedulerDeviceCard;



// import React, { useMemo } from "react";
// import { Clock3, CalendarDays, Power, ThermometerSun, Droplets, Calendar, Sunrise, Sun, Sunset, TimerIcon } from "lucide-react";
// import "../../styles/pages/Dashboard/dashboard-styles.css";
// import TemperatureRangeMeter from "./TemperatureRangeMeter";

// function formatSmartNumber(v, maxDecimals = 3) {
//   if (v === undefined || v === null || v === "") return "--";
//   const n = Number(v);
//   if (!Number.isFinite(n)) return "--";
//   return parseFloat(n.toFixed(maxDecimals)).toString();
// }

// function formatTime(value) {
//   if (!value) return "--";
//   return String(value);
// }

// function formatDuration(duration) {
//   if (duration === undefined || duration === null || duration === "") return "--";

//   const n = Number(duration);
//   if (!Number.isFinite(n)) return String(duration);

//   const hours = Math.floor(n / 60);
//   const mins = n % 60;

//   if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
//   if (hours > 0) return `${hours}h`;
//   return `${mins}m`;
// }

// function formatRepeat(days = []) {
//   if (!Array.isArray(days) || days.length === 0) return "--";
//   if (days.length === 7) return "Every day";
//   if (days.length <= 3) return days.join(" ");
//   return `${days.slice(0, 2).join(" ")} ... ${days[days.length - 1]}`;
// }

// const SchedulerDeviceCard = React.memo(function SchedulerDeviceCard({
//   deviceId,
//   espTemprature,
//   espHumidity,
//   isOnline,
//   lastUpdateISO,
//   onCardSelect,
//   isSelected,
//   temperatureAlert = false,
//   humidityAlert = false,


//   // schedule props
//   startingOn,
//   duration,
//   repeatDays = [],
//   command = "ON",
//   enabled = true,
//   pollHitTime = { pollHitTime },
// }) {

//   const toNumberOrNull = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : null;
//   };


//   const commandStateClass = useMemo(() => {
//     if (!enabled) return "bg-slate-200 text-slate-600";
//     return String(command).toUpperCase() === "ON"
//       ? "bg-emerald-500 text-white"
//       : "bg-rose-500 text-white";
//   }, [command, enabled]);

//   const commandStateLabel = useMemo(() => {
//     if (!enabled) return "Disabled";
//     return String(command).toUpperCase();
//   }, [command, enabled]);

//   const hour = useMemo(() => {
//     return new Date(pollHitTime).getHours();
//   }, [pollHitTime]);

//   // const timeOfDay = "sunset"
//   const timeOfDay =
//     hour >= 5 && hour <= 8
//       ? "sunrise"
//       : hour >= 9 && hour <= 16
//         ? "day"
//         : hour >= 17 && hour <= 19
//           ? "sunset"
//           : "night";

//   const temp = toNumberOrNull(espTemprature);
//   const hum = toNumberOrNull(espHumidity);

//   const statusColorClass = (hasAlert) =>
//     hasAlert ? "bg-rose-300" : "bg-emerald-200";


//   return (
//     <div
//       onClick={onCardSelect}
//       className={`freezer-card-container rounded-4xl bg-white ${isSelected ? "shadow-lg ring-1 ring-[#0D5CA4]/15" : ""
//         } min-h-[175px] cursor-pointer transition hover:shadow-md px-4 py-2 flex flex-col justify-around`}
//     >
//       {/* <div className="px-4 py-3 h-full flex flex-col justify-between">
//         <div className="flex justify-between items-start gap-3">
//           <div>
//             <div className="flex items-center">
//               <span
//                 aria-hidden
//                 className={`inline-block h-2 w-2 rounded-full mr-2 shadow-sm ${isOnline ? "bg-green-300" : "bg-gray-300"
//                   }`}
//                 style={{ boxShadow: isOnline ? "0 0 6px rgba(34,197,94,0.45)" : "none" }}
//               />
//               <div className="text-xs text-gray-500">Device ID</div>
//             </div>
//             <div className="text-lg font-bold text-gray-900">{deviceId}</div>
//           </div>
//           <label className="inline-flex items-center cursor-pointer bg-green-500 rounded-full">
//             <input type="checkbox" value="" className="sr-only peer" />
//             <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
//           </label>
//         </div>

//         <div className="flex justify-between ">         
//           <div className="flex flex-col">
//             <div className="flex items-center justify-start gap-3 mt-2 flex-nowrap overflow-hidden   border-b-2 border-[#C3C1C1] pb-2 ">
//               <div className={`p-2 rounded-full border ${timeOfDay === "sunrise" ? "border-1 border-gray-600" : "border-transparent"}`}>
//                 <Sunrise size={18} className={`${timeOfDay === "sunrise" ? "text-yellow-600" : "text-gray-500"}`} />
//               </div>
//               <div className={`p-2 rounded-full border ${timeOfDay === "day" ? "border-1 border-gray-600" : "border-transparent"}`}>
//                 <Sun size={18} className={`${timeOfDay === "day" ? "text-yellow-500" : "text-gray-500"}`} />
//               </div>
//               <div className={`p-2 rounded-full border ${(timeOfDay === "sunset" || timeOfDay === "night") ? "border-1 border-gray-600" : "border-transparent"}`}>
//                 <Sunset size={18} className={`${timeOfDay === "sunset" ? "text-orange-500" : "text-gray-500"}`} />
//               </div>
//             </div>
//             <TemperatureRangeMeter value={12 !== null ? Math.round(23) : 0} />
//           </div>

//           <div className="flex flex-col justify-around">

//             <div className=" flex flex-col items-center justify-around ">
              
//               <div className="text-right">
//                 <div className="text-sm text-gray-500">Humidity</div>
//                 <div className="text-xl font-bold">
//                   {hum !== null ? `${Math.round(hum)}%` : "--"}
//                 </div>

//                 <div className=" ">
//                   <div className="h-2 rounded-full overflow-hidden bg-gray-100">
//                     <div className={`h-2 ${statusColorClass(humidityAlert)}`} />
//                   </div>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <div className="text-xs text-gray-500">Temperature</div>
//                 <div className="text-xl font-bold">
//                   {temp !== null ? `${Math.round(temp)}` : "--"}<span className="font-normal">°C</span>
//                 </div>

//                 <div >
//                   <div className="h-2 rounded-full overflow-hidden bg-gray-100">

//                     <div className={`h-2 ${statusColorClass(temperatureAlert)}`} />
//                   </div>
//                 </div>
//               </div>


//             </div>

//             <div />
//           </div>


//         </div>




//         <div className="flex justify-between items-center gap-4">
//           <div className="flex items-center justify-center gap-2 ">
//             <CalendarDays className="w-6 h-6 text-gray-600" />
//             <div className="flex flex-col ">
//               <p className="text-[11px] text-gray-500">Starting On</p>
//               <div className="text-sm font-bold text-gray-900 ">{formatDuration(duration)}</div>
//             </div>
//           </div>


//           <div>
//             <div className="flex items-center gap-1 text-[11px] text-gray-500">
//               <Power className="w-3 h-3" />
//               Duration
//             </div>
//             <div className="text-sm font-bold text-gray-900 ">{formatDuration(duration)}</div>
//           </div>

//           <div>
//             <div className="flex items-center gap-1 text-[11px] text-gray-500">

//               Status
//             </div>
//             <div className="text-sm font-bold text-gray-900 ">On</div>
//           </div>
//         </div>


//       </div> */}
    
// <div className="flex items-center justify-between ">

//   {/* LEFT SIDE */}
//   <div className="flex flex-col items-start">

//     {/* Device ID */}
//     <div>
//       <div className="flex items-center">
//         <span
//           className={`inline-block h-2 w-2 rounded-full mr-2 ${
//             isOnline ? "bg-green-300" : "bg-gray-300"
//           }`}
//         />
//         <div className="text-xs text-gray-500">Device ID</div>
//       </div>

//       <div className="text-lg font-bold text-gray-900">
//         {deviceId}
//       </div>
//     </div>

//     {/* Sunrise + Meter */}
//     <div className="flex flex-col mt-2  border-b-2 border-[#C3C1C1] ">

//       <div className="flex items-center gap-3">
//         <div className={`p-2 rounded-full ${timeOfDay==="sunrise" ? "border border-gray-600":""}`}>
//           <Sunrise size={18}/>
//         </div>

//         <div className={`p-2 rounded-full ${timeOfDay==="day" ? "border border-gray-600":""}`}>
//           <Sun size={18}/>
//         </div>

//         <div className={`p-2 rounded-full ${(timeOfDay==="sunset" || timeOfDay==="night") ? "border border-gray-600":""}`}>
//           <Sunset size={18}/>
//         </div>
//       </div>

//       <TemperatureRangeMeter
//         value={temp !== null ? Math.round(temp) : 0}
//       />
//     </div>

//   </div>


//   {/* RIGHT SIDE */}
//   <div className="flex flex-col items-end gap-1">

//     {/* Toggle (UNCHANGED) */}
//     <label className="inline-flex items-center cursor-pointer bg-green-500 rounded-full">
//       <input type="checkbox" className="sr-only peer" />
//       <div className="relative w-9 h-5 bg-neutral-quaternary rounded-full
//         after:content-[''] after:absolute after:top-[2px] after:start-[2px]
//         after:bg-white after:h-4 after:w-4 after:rounded-full
//         after:transition-all peer-checked:after:translate-x-full
//         peer-checked:bg-brand"/>
//     </label>

//     {/* Humidity + Temperature (YOUR EXACT CODE) */}
//     <div className="flex flex-col items-end">

//       <div className="text-right">
//         <div className="text-xs text-gray-500">Humidity</div>
//         <div className="text-xl font-bold">
//           {hum !== null ? `${Math.round(hum)}%` : "--"}
//         </div>

//         <div className="h-2 rounded-full overflow-hidden bg-gray-100">
//           <div className={`h-2 ${statusColorClass(humidityAlert)}`} />
//         </div>
//       </div>

//       <div className="text-right mt-2">
//         <div className="text-xs text-gray-500">Temperature</div>
//         <div className="text-xl font-bold">
//           {temp !== null ? `${Math.round(temp)}` : "--"}°C
//         </div>

//         <div className="h-2 rounded-full overflow-hidden bg-gray-100">
//           <div className={`h-2 ${statusColorClass(temperatureAlert)}`} />
//         </div>
//       </div>

//     </div>

//   </div>

// </div>



//         <div className="flex justify-between items-center ">
//           <div className="flex items-center justify-center gap-2 ">
//             <CalendarDays className="w-6 h-6 text-gray-600" />
//             <div className="flex flex-col ">
//               <p className="text-xs text-gray-500 font-semibold">Starting</p>
//               <div className="text-xs font-bold text-[#178D8F]  ">{formatDuration(duration)}</div>
//             </div>
//           </div>


//           <div>
//             <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
//               <TimerIcon className="w-3 h-3" />
//               Duration
//             </div>
//             <div className="text-xs font-bold text-[#178D8F] ">{formatDuration(duration)}</div>
//           </div>

//           <div>
//             <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">

//               Status
//             </div>
//             <div className="text-xs font-bold text-[#178D8F] ">On</div>
//             {/* For Off use this color  */}
//             {/* <div className="text-xs font-bold text-[#96181B] ">Off</div> */}
//           </div>
//         </div>

//     </div>
    
//   );
// });

// export default SchedulerDeviceCard;













// import React, { useMemo } from "react";
// import { Clock3, CalendarDays, Power, ThermometerSun, Droplets, Calendar, Sunrise, Sun, Sunset, TimerIcon } from "lucide-react";
// import "../../styles/pages/Dashboard/dashboard-styles.css";
// import TemperatureRangeMeter from "./TemperatureRangeMeter";

// function formatSmartNumber(v, maxDecimals = 3) {
//   if (v === undefined || v === null || v === "") return "--";
//   const n = Number(v);
//   if (!Number.isFinite(n)) return "--";
//   return parseFloat(n.toFixed(maxDecimals)).toString();
// }

// function formatTime(value) {
//   if (!value) return "--";
//   return String(value);
// }

// function formatDuration(duration) {
//   if (duration === undefined || duration === null || duration === "") return "--";

//   const n = Number(duration);
//   if (!Number.isFinite(n)) return String(duration);

//   const hours = Math.floor(n / 60);
//   const mins = n % 60;

//   if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
//   if (hours > 0) return `${hours}h`;
//   return `${mins}m`;
// }

// function formatRepeat(days = []) {
//   if (!Array.isArray(days) || days.length === 0) return "--";
//   if (days.length === 7) return "Every day";
//   if (days.length <= 3) return days.join(" ");
//   return `${days.slice(0, 2).join(" ")} ... ${days[days.length - 1]}`;
// }

// const SchedulerDeviceCard = React.memo(function SchedulerDeviceCard({
//   deviceId,
//   espTemprature,
//   espHumidity,
//   isOnline,
//   lastUpdateISO,
//   onCardSelect,
//   isSelected,
//   temperatureAlert = false,
//   humidityAlert = false,


//   // schedule props
//   startingOn,
//   duration,
//   repeatDays = [],
//   command = "ON",
//   enabled = true,
//   pollHitTime = { pollHitTime },
// }) {

//   const toNumberOrNull = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : null;
//   };


//   const commandStateClass = useMemo(() => {
//     if (!enabled) return "bg-slate-200 text-slate-600";
//     return String(command).toUpperCase() === "ON"
//       ? "bg-emerald-500 text-white"
//       : "bg-rose-500 text-white";
//   }, [command, enabled]);

//   const commandStateLabel = useMemo(() => {
//     if (!enabled) return "Disabled";
//     return String(command).toUpperCase();
//   }, [command, enabled]);

//   const hour = useMemo(() => {
//     return new Date(pollHitTime).getHours();
//   }, [pollHitTime]);

//   // const timeOfDay = "sunset"
//   const timeOfDay =
//     hour >= 5 && hour <= 8
//       ? "sunrise"
//       : hour >= 9 && hour <= 16
//         ? "day"
//         : hour >= 17 && hour <= 19
//           ? "sunset"
//           : "night";

//   const temp = toNumberOrNull(espTemprature);
//   const hum = toNumberOrNull(espHumidity);

//   const statusColorClass = (hasAlert) =>
//     hasAlert ? "bg-rose-300" : "bg-emerald-200";


//   return (
//     <div
//       onClick={onCardSelect}
//       className={`freezer-card-container rounded-4xl bg-white ${isSelected ? "shadow-lg ring-1 ring-[#0D5CA4]/15" : ""
//         } min-h-[175px] cursor-pointer transition hover:shadow-md px-4 py-2 flex flex-col justify-around`}
//     >

    
// <div className="flex items-center justify-between ">

//   {/* LEFT SIDE */}
//   <div className="flex flex-col items-start">

//     {/* Device ID */}
//     <div>
//       <div className="flex items-center">
//         <span
//           className={`inline-block h-2 w-2 rounded-full mr-2 ${
//             isOnline ? "bg-green-300" : "bg-gray-300"
//           }`}
//         />
//         <div className="text-xs text-gray-500">Device ID</div>
//       </div>

//       <div className="text-lg font-bold text-gray-900">
//         {deviceId}
//       </div>
//     </div>

//     {/* Sunrise + Meter */}
//     <div className="flex flex-col mt-2  border-b-2 border-[#C3C1C1] ">

//       <div className="flex items-center gap-3">
//         <div className={`p-2 rounded-full ${timeOfDay==="sunrise" ? "border border-gray-600":""}`}>
//           <Sunrise size={18}/>
//         </div>

//         <div className={`p-2 rounded-full ${timeOfDay==="day" ? "border border-gray-600":""}`}>
//           <Sun size={18}/>
//         </div>

//         <div className={`p-2 rounded-full ${(timeOfDay==="sunset" || timeOfDay==="night") ? "border border-gray-600":""}`}>
//           <Sunset size={18}/>
//         </div>
//       </div>

//       <TemperatureRangeMeter
//         value={temp !== null ? Math.round(temp) : 0}
//       />
//     </div>

//   </div>


//   {/* RIGHT SIDE */}
//   <div className="flex flex-col items-end gap-1">

    
//     <label className="inline-flex items-center cursor-pointer bg-green-500 rounded-full">
//       <input type="checkbox" className="sr-only peer" />
//       <div className="relative w-9 h-5 bg-neutral-quaternary rounded-full
//         after:content-[''] after:absolute after:top-[2px] after:start-[2px]
//         after:bg-white after:h-4 after:w-4 after:rounded-full
//         after:transition-all peer-checked:after:translate-x-full
//         peer-checked:bg-brand"/>
//     </label>

//     {/* Humidity + Temperature (YOUR EXACT CODE) */}
//     <div className="flex flex-col items-end">

//       <div className="text-right">
//         <div className="text-xs text-gray-500">Humidity</div>
//         <div className="text-xl font-bold">
//           {hum !== null ? `${Math.round(hum)}%` : "--"}
//         </div>

//         <div className="h-2 rounded-full overflow-hidden bg-gray-100">
//           <div className={`h-2 ${statusColorClass(humidityAlert)}`} />
//         </div>
//       </div>

//       <div className="text-right mt-2">
//         <div className="text-xs text-gray-500">Temperature</div>
//         <div className="text-xl font-bold">
//           {temp !== null ? `${Math.round(temp)}` : "--"}°C
//         </div>

//         <div className="h-2 rounded-full overflow-hidden bg-gray-100">
//           <div className={`h-2 ${statusColorClass(temperatureAlert)}`} />
//         </div>
//       </div>

//     </div>

//   </div>

// </div>



        // <div className="flex justify-between items-center ">
        //   <div className="flex items-center justify-center gap-2 ">
        //     <CalendarDays className="w-6 h-6 text-gray-600" />
        //     <div className="flex flex-col ">
        //       <p className="text-xs text-gray-500 font-semibold">Starting</p>
        //       <div className="text-xs font-bold text-[#178D8F]  ">{formatDuration(duration)}</div>
        //     </div>
        //   </div>


        //   <div>
        //     <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
        //       <TimerIcon className="w-3 h-3" />
        //       Duration
        //     </div>
        //     <div className="text-xs font-bold text-[#178D8F] ">{formatDuration(duration)}</div>
        //   </div>

        //   <div>
        //     <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">

        //       Status
        //     </div>
        //     <div className="text-xs font-bold text-[#178D8F] ">On</div>
        //     {/* For Off use this color  */}
        //     {/* <div className="text-xs font-bold text-[#96181B] ">Off</div> */}
        //   </div>
        // </div>

    // </div>
    
//   );
// });

// export default SchedulerDeviceCard;






// import React, { useMemo, useState, useEffect  } from "react";
// import { CalendarDays, Sunrise, Sun, Sunset, TimerIcon } from "lucide-react";
// import "../../styles/pages/Dashboard/dashboard-styles.css";
// import TemperatureRangeMeter from "./TemperatureRangeMeter";
// import Swal from "sweetalert2";


// function formatDuration(duration) {
//   if (duration === undefined || duration === null || duration === "") return "--";
//   const n = Number(duration);
//   if (!Number.isFinite(n)) return String(duration);
//   const hours = Math.floor(n / 60);
//   const mins = n % 60;
//   if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
//   if (hours > 0) return `${hours}h`;
//   return `${mins}m`;
// }

// // ── Helpers ─────────────────────────────────────────────────────────────────
// // const toMinutes = (t = "") => {
// //   const [h, m] = t.split(":").map(Number);
// //   return h * 60 + (m || 0);
// // };



// // const getCurrentRunningEvent = (events = []) => {
// //   const now = new Date();
// //   const nowM = now.getHours() * 60 + now.getMinutes();
// //   return (
// //     events.find((e) => {
// //       if (!e.enabled || !e.start || !e.end) return false;
// //       const s = toMinutes(e.start);
// //       const en = toMinutes(e.end);
// //       return en > s ? nowM >= s && nowM < en : nowM >= s || nowM < en; // handles overnight
// //     }) ?? null
// //   );
// // };



// const toMinutes = (t = "") => {
//   const [h, m] = t.split(":").map(Number);
//   return h * 60 + (m || 0);
// };

// const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const getCurrentRunningEvent = (events = []) => {
//   const now = new Date();
//   const nowM = now.getHours() * 60 + now.getMinutes();
//   const currentDay = DAY_NAMES[now.getDay()]; // "Mon", "Tue", etc.

//   return (
//     events.find((e) => {
//       if (!e.enabled || !e.start || !e.end) return false;

//       // Support both field names
//       const repeatDays = e.days || e.repeatDays || [];
//       // empty days array = runs every day
//       const dayMatches = repeatDays.length === 0 || repeatDays.includes(currentDay);
//       if (!dayMatches) return false;

//       const s = toMinutes(e.start);
//       const en = toMinutes(e.end);
//       // handles overnight spans (e.g. 23:00 → 01:00)
//       return en > s ? nowM >= s && nowM < en : nowM >= s || nowM < en;
//     }) ?? null
//   );
// };

// // ── Toggle UI ────────────────────────────────────────────────────────────────
// const PowerToggle = ({ displayState, onClick }) => {
//   // displayState: "on" | "off" | "gray"
//   const bgClass =
//     displayState === "on"   ? "bg-emerald-500" :
//     displayState === "off"  ? "bg-rose-500"    :
//                               "bg-gray-400";     // gray = running event

//   const knobClass =
//     displayState === "on"  ? "translate-x-7" :
//     displayState === "off" ? "translate-x-0"  :
//                              "translate-x-3.5"; // center for gray

//   const label =
//     displayState === "on"  ? "ON"  :
//     displayState === "off" ? "OFF" :
//                              "···";

//   const labelPos   = displayState === "on" ? "left-2" : displayState === "off" ? "right-1.5" : "left-1/2 -translate-x-1/2";
//   const labelColor = "text-white";

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       title={
//         displayState === "gray" ? "Event running — click to disable"
//         : displayState === "on" ? "Turn Off"
//         : "Turn On"
//       }
//       className={`relative w-12 h-5 rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none ${bgClass}`}
//     >
//       <span
//         className={`absolute top-1/2 -translate-y-1/2 text-[9px] font-bold tracking-wide pointer-events-none ${labelPos} ${labelColor}`}
//       >
//         {label}
//       </span>
//       <div
//         className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300 ${knobClass}`}
//       />
//     </button>
//   );
// };

// // ────────────────────────────────────────────────────────────────────────────

// const SchedulerDeviceCard = React.memo(function SchedulerDeviceCard({
//   deviceId,
//   espTemprature,
//   espHumidity,
//   isOnline,
//   lastUpdateISO,
//   onCardSelect,
//   isSelected,
//   temperatureAlert = false,
//   humidityAlert = false,
//   startingOn,
//   duration,
//   repeatDays = [],
//   command = "ON",
//   enabled = true,
//   pollHitTime,
//     // ADD THESE TWO:
//   events = [],
//   onEventsChange,

//     toggleState,          // ← controlled from parent: "on"|"off"|null
//   onToggleChange,       // ← callback to parent
// }) {


//    // ── Derive initial state once from props if not yet set by parent ──
//   // const resolvedToggle = toggleState ?? (enabled ? (String(command).toUpperCase() === "ON" ? "on" : "off") : "off");

//   // // ── Detect running event ──
//   // const runningEvent = useMemo(() => getCurrentRunningEvent(events), [events, pollHitTime]);

//   // // ── Display state ──
//   // const displayState = runningEvent ? "gray" : resolvedToggle;

//   // // ── Handle toggle click ──
//   // const handleToggleClick = async (e) => {
//   //   e.stopPropagation();

//   //   if (runningEvent) {
//   //     const result = await Swal.fire({
//   //       title: "Event Currently Running",
//   //       html: `The <b>${runningEvent.command}</b> event (${runningEvent.start} – ${runningEvent.end}) is currently active.<br><br>Do you want to <b>disable</b> this event?`,
//   //       icon: "warning",
//   //       showCancelButton: true,
//   //       confirmButtonText: "Yes, disable it",
//   //       cancelButtonText: "Keep running",
//   //       confirmButtonColor: "#EF4444",
//   //       cancelButtonColor: "#64748B",
//   //       background: "#ffffff",
//   //       color: "#1e293b",
//   //       customClass: {
//   //         popup: "rounded-2xl shadow-xl",
//   //         title: "text-base font-semibold",
//   //         htmlContainer: "text-sm text-slate-500",
//   //         confirmButton: "rounded-lg text-sm font-semibold px-5 py-2",
//   //         cancelButton: "rounded-lg text-sm font-semibold px-5 py-2",
//   //       },
//   //       buttonsStyling: true,
//   //     });

//   //     if (result.isConfirmed) {
//   //       // Disable the event in the events list
//   //       const updated = events.map((ev) =>
//   //         ev.id === runningEvent.id ? { ...ev, enabled: false } : ev
//   //       );
//   //       onEventsChange?.(updated);
//   //       // Move toggle to OFF
//   //       onToggleChange?.("off");
//   //     }
//   //     return;
//   //   }

//   //   // Normal manual toggle
//   //   const next = resolvedToggle === "on" ? "off" : "on";
//   //   onToggleChange?.(next);
//   // };



//   // ── Minute ticker so running-event detection updates in real time ──
//   const [, setTick] = useState(0);
//   useEffect(() => {
//     const id = setInterval(() => setTick((t) => t + 1), 30_000); // every 30s
//     return () => clearInterval(id);
//   }, []);

//   const resolvedToggle = toggleState ?? (enabled
//     ? (String(command).toUpperCase() === "ON" ? "on" : "off")
//     : "off");

//   // ── Detect running event — reruns every 30s + on events/poll change ──
//   const runningEvent = useMemo(
//     () => getCurrentRunningEvent(events),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [events, pollHitTime, /* tick implicitly via re-render */]
//   );

//   const displayState = runningEvent ? "gray" : resolvedToggle;

//   // ── Handle toggle click ──
//   const handleToggleClick = async (e) => {
//     e.stopPropagation();

//     if (runningEvent) {
//       const result = await Swal.fire({
//         title: "Event Currently Running",
//         html: `
//           The <b>${runningEvent.command}</b> event is currently active.<br/>
//           <span style="color:#64748b;font-size:13px">${runningEvent.start} → ${runningEvent.end}</span>
//           <br/><br/>
//           Do you want to <b>disable</b> this event?
//         `,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, disable it",
//         cancelButtonText: "Keep running",
//         confirmButtonColor: "#EF4444",
//         cancelButtonColor: "#64748B",
//         background: "#ffffff",
//         color: "#1e293b",
//         customClass: {
//           popup: "rounded-2xl shadow-xl",
//           title: "text-base font-semibold",
//           htmlContainer: "text-sm text-slate-500",
//           confirmButton: "rounded-lg text-sm font-semibold px-5 py-2",
//           cancelButton: "rounded-lg text-sm font-semibold px-5 py-2",
//         },
//         buttonsStyling: true,
//       });

//       if (result.isConfirmed) {
//         // 1. Disable the specific event → EventCard reflects this immediately
//         const updated = events.map((ev) =>
//           ev.id === runningEvent.id ? { ...ev, enabled: false } : ev
//         );
//         onEventsChange?.(updated);   // updates context → EventCard re-renders as disabled

//         // 2. Move toggle to OFF
//         onToggleChange?.("off");
//       }
//       return; // always return after swal — don't fall through to manual toggle
//     }

//     // ── Normal manual toggle (no event running) ──
//     const next = resolvedToggle === "on" ? "off" : "on";
//     onToggleChange?.(next);
//   };



// // const getNextEvent = (events = []) => {
// //   if (!events.length) return null;

// //   const enabled = events.filter((e) => e.enabled && e.start);
// //   if (!enabled.length) return null;

// //   const now = new Date();
// //   const nowMinutes = now.getHours() * 60 + now.getMinutes();

// //   // const toMinutes = (t) => {
// //   //   const parts = t.split(":");
// //   //   return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
// //   // };

// // //   const toMinutes = (t = "") => {
// // //   const [h, m] = t.split(":").map(Number);
// // //   return h * 60 + (m || 0);
// // // };

// //   // First: find the next upcoming event later today
// //   const futureToday = enabled
// //     .filter((e) => toMinutes(e.start) > nowMinutes)
// //     .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

// //   if (futureToday.length) return futureToday[0];

// //   // Fallback: wrap around — show the earliest event of the next cycle
// //   const sorted = [...enabled].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
// //   return sorted[0];
// // };



// const getNextEvent = (events = []) => {
//   if (!events.length) return null;

//   const enabled = events.filter((e) => e.enabled && e.start);
//   if (!enabled.length) return null;

//   const now = new Date();
//   const nowMinutes = now.getHours() * 60 + now.getMinutes();
//   const currentDay = now.toLocaleString("en-US", { weekday: "short" });

//   const toMinutesLocal = (t) => {
//     const parts = t.split(":");
//     return parseInt(parts[0], 10) * 60 + parseInt(parts[1] || "0", 10);
//   };

//   const dayMatches = (e, day) => {
//     const repeatDays = e.days || e.repeatDays || [];
//     return repeatDays.length === 0 || repeatDays.includes(day);
//   };

//   // 1. Next event LATER TODAY that matches repeat days
//   const futureToday = enabled
//     .filter((e) => dayMatches(e, currentDay) && toMinutesLocal(e.start) > nowMinutes)
//     .sort((a, b) => toMinutesLocal(a.start) - toMinutesLocal(b.start));

//   if (futureToday.length) return futureToday[0];

//   // 2. Fallback: earliest event in the next cycle (will run on its next matching day)
//   const sorted = [...enabled].sort((a, b) => toMinutesLocal(a.start) - toMinutesLocal(b.start));
//   return sorted[0] ?? null;
// };



//   const toNumberOrNull = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : null;
//   };

//   const temp = toNumberOrNull(espTemprature);
//   const hum  = toNumberOrNull(espHumidity);


//   const hour = useMemo(() => new Date(pollHitTime).getHours(), [pollHitTime]);
//   const timeOfDay =
//     hour >= 5  && hour <= 8  ? "sunrise" :
//     hour >= 9  && hour <= 16 ? "day"     :
//     hour >= 17 && hour <= 19 ? "sunset"  :
//                                "night";

//   const statusColorClass = (hasAlert) =>
//     hasAlert ? "bg-rose-300" : "bg-emerald-200";

//   // const nextEvent = getNextEvent(events);   // ← pass events prop from parent
//   const nextEvent = useMemo(() => getNextEvent(events), [events, pollHitTime]);
  
//   const displayStart = nextEvent?.start ?? "--";
// const displayDuration = nextEvent
//   ? formatDuration(nextEvent.duration)
//   : "--";

// const displayCommand = nextEvent?.command ?? "OFF";
// const isCommandOn = displayCommand === "ON";


//   return (
//     <div
//       onClick={onCardSelect}
//       className={`freezer-card-container rounded-4xl bg-white ${
//         isSelected ? "shadow-lg ring-1 ring-[#0D5CA4]/15" : ""
//       } min-h-[175px] cursor-pointer transition hover:shadow-md px-4 py-2 flex flex-col justify-around`}
//     >
//       {/* ── Top section ── */}
//       <div className="flex items-center justify-between">

//         {/* LEFT */}
//         <div className="flex flex-col items-start">
//           {/* Device ID */}
//           <div>
//             <div className="flex items-center">
//               <span className={`inline-block h-2 w-2 rounded-full mr-2 ${isOnline ? "bg-green-300" : "bg-gray-300"}`} />
//               <div className="text-xs text-gray-500">Device ID</div>
//             </div>
//             <div className="text-lg font-bold text-gray-900">{deviceId}</div>
//           </div>

//           {/* Time-of-day icons + meter */}
//           <div className="flex flex-col mt-2 border-b-2 border-[#C3C1C1]">
//             <div className="flex items-center gap-3">
//               <div className={`p-2 rounded-full ${timeOfDay === "sunrise" ? "border border-gray-600" : ""}`}>
//                 <Sunrise size={18} />
//               </div>
//               <div className={`p-2 rounded-full ${timeOfDay === "day" ? "border border-gray-600" : ""}`}>
//                 <Sun size={18} />
//               </div>
//               <div className={`p-2 rounded-full ${(timeOfDay === "sunset" || timeOfDay === "night") ? "border border-gray-600" : ""}`}>
//                 <Sunset size={18} />
//               </div>
//             </div>
//             <TemperatureRangeMeter value={temp !== null ? Math.round(temp) : 0} />
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="flex flex-col items-end gap-2">
//           {/* ── Power toggle with ON/OFF/idle states ── */}
//           {/* <PowerToggle state={powerState} onToggle={handlePowerToggle} /> */}

//           <PowerToggle displayState={displayState} onClick={handleToggleClick} />

//           {/* Humidity + Temperature */}
//           <div className="flex flex-col items-end">
//             <div className="text-right">
//               <div className="text-xs text-gray-500">Humidity</div>
//               <div className="text-xl font-bold">
//                 {hum !== null ? `${Math.round(hum)}%` : "--"}
//               </div>
//               <div className="h-2 rounded-full overflow-hidden bg-gray-100">
//                 <div className={`h-2 ${statusColorClass(humidityAlert)}`} />
//               </div>
//             </div>

//             <div className="text-right mt-2">
//               <div className="text-xs text-gray-500">Temperature</div>
//               <div className="text-xl font-bold">
//                 {temp !== null ? `${Math.round(temp)}` : "--"}°C
//               </div>
//               <div className="h-2 rounded-full overflow-hidden bg-gray-100">
//                 <div className={`h-2 ${statusColorClass(temperatureAlert)}`} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
// <div className="flex justify-between items-center">
//   {/* Starting */}
//   <div className="flex items-center justify-center gap-2">
//     <CalendarDays className="w-6 h-6 text-gray-600" />
//     <div className="flex flex-col">
//       <p className="text-xs text-gray-500 font-semibold">Starting</p>
//       <div className="text-xs font-bold text-[#178D8F]">
//         {displayStart}
//       </div>
//     </div>
//   </div>

//   {/* Duration */}
//   <div>
//     <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
//       <TimerIcon className="w-3 h-3" />
//       Duration
//     </div>
//     <div className="text-xs font-bold text-[#178D8F]">
//       {displayDuration}
//     </div>
//   </div>

//   {/* Status */}
//   <div>
//     <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
//       Status
//     </div>

//     <div
//       className={`text-xs font-bold ${
//         isCommandOn ? "text-[#178D8F]" : "text-[#96181B]"
//       }`}
//     >
//       {displayCommand}
//     </div>
//   </div>
// </div>
//       </div>
//   );
// });

// export default SchedulerDeviceCard;





















import React, { useMemo, useState, useEffect } from "react";
import { CalendarDays, Sunrise, Sun, Sunset, TimerIcon } from "lucide-react";
import "../../styles/pages/Dashboard/dashboard-styles.css";
import TemperatureRangeMeter from "./TemperatureRangeMeter";
import Swal from "sweetalert2";

// ── Helpers (module-level, no shadowing) ────────────────────────────────────
function formatDuration(duration) {
  if (duration === undefined || duration === null || duration === "") return "--";
  const n = Number(duration);
  if (!Number.isFinite(n)) return String(duration);
  const hours = Math.floor(n / 60);
  const mins = n % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toMinutes = (t = "") => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
};

const dayMatches = (event, day) => {
  const days = event.days || event.repeatDays || [];
  return days.length === 0 || days.includes(day); // empty = runs every day
};

const getCurrentRunningEvent = (events = []) => {
  const now = new Date();
  const nowM = now.getHours() * 60 + now.getMinutes();
  const today = DAY_NAMES[now.getDay()];

  
  // 🔍 ADD THESE:
  console.log("📅 events received by card:", events);
  console.log("🕐 current time (minutes):", nowM, "| today:", today);


  return (
    events.find((e) => {
      if (!e.enabled || !e.start || !e.end) return false;
      if (!dayMatches(e, today)) return false;
      const s = toMinutes(e.start);
      const en = toMinutes(e.end);
      // handles overnight spans e.g. 23:00 → 01:00
      return en > s ? nowM >= s && nowM < en : nowM >= s || nowM < en;
    }) ?? null
  );
};

const getNextEvent = (events = []) => {
  const enabledEvents = events.filter((e) => e.enabled && e.start);
  if (!enabledEvents.length) return null;

  const now = new Date();
  const nowM = now.getHours() * 60 + now.getMinutes();
  const today = DAY_NAMES[now.getDay()];

  // First: next event later today that matches repeat days
  const futureToday = enabledEvents
    .filter((e) => dayMatches(e, today) && toMinutes(e.start) > nowM)
    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

  if (futureToday.length) return futureToday[0];

  // Fallback: earliest event in next cycle
  return [...enabledEvents].sort((a, b) => toMinutes(a.start) - toMinutes(b.start))[0] ?? null;
};

// ── Toggle UI ────────────────────────────────────────────────────────────────
// const PowerToggle = ({ displayState, onClick }) => {
//   const bgClass =
//     displayState === "on"  ? "bg-emerald-500" :
//     displayState === "off" ? "bg-rose-500"    :
//                              "bg-gray-400";

//   const knobClass =
//     displayState === "on"  ? "translate-x-7"   :
//     displayState === "off" ? "translate-x-0"   :
//                              "translate-x-3.5";

//   const label =
//     displayState === "on"  ? "ON"  :
//     displayState === "off" ? "OFF" :
//                              "···";

//   const labelPos =
//     displayState === "on"  ? "left-2" :
//     displayState === "off" ? "right-1.5" :
//                              "left-1/2 -translate-x-1/2";

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       title={
//         displayState === "gray" ? "Event running — click to disable"
//         : displayState === "on" ? "Turn Off"
//         : "Turn On"
//       }
//       className={`relative w-12 h-5 rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none ${bgClass}`}
//     >
//       <span
//         className={`absolute top-1/2 -translate-y-1/2 text-[9px] font-bold tracking-wide pointer-events-none text-white ${labelPos}`}
//       >
//         {label}
//       </span>
//       <div
//         className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300 ${knobClass}`}
//       />
//     </button>
//   );
// };


const PowerToggle = ({ displayState, onClick }) => {

  const isGray = displayState.includes("gray");

  // ── background color ──
  const bgClass =
    displayState.startsWith("on")  ? (isGray ? "bg-gray-400" : "bg-emerald-500") :
    displayState.startsWith("off") ? (isGray ? "bg-gray-400" : "bg-rose-500") :
                                     "bg-gray-400";

  // ── knob position ──
  const knobClass =
    displayState.startsWith("on")
      ? "translate-x-7"
      : "translate-x-0";

  // ── label ──
  const label =
    displayState.startsWith("on") ? "ON" : "OFF";

  const labelPos =
    displayState.startsWith("on") ? "left-2" : "right-1.5";

  return (
    <button
      type="button"
      onClick={onClick}
      title={isGray ? "Event running — click to manage event" : ""}
      className={`relative w-12 h-5 rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none ${bgClass}`}
    >
      <span
        className={`absolute top-1/2 -translate-y-1/2 text-[9px] font-bold tracking-wide pointer-events-none text-white ${labelPos}`}
      >
        {label}
      </span>

      <div
        className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300 ${knobClass}`}
      />
    </button>
  );
};

// ── Main Card ────────────────────────────────────────────────────────────────
const SchedulerDeviceCard = React.memo(function SchedulerDeviceCard({
  deviceId,
  espTemprature,
  espHumidity,
  isOnline,
  lastUpdateISO,
  onCardSelect,
  isSelected,
  temperatureAlert = false,
  humidityAlert = false,
  command = "ON",
  enabled = true,
  pollHitTime,
  events = [],
  onEventsChange,
  toggleState,       // controlled: "on" | "off" | null
  onToggleChange,    // callback to parent
}) {

  // ── 30-second ticker so running-event check stays fresh ──
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  // ── Resolve toggle: prefer parent-controlled state, fall back to device props ──
  // const resolvedToggle =
  //   toggleState !== null && toggleState !== undefined
  //     ? toggleState
  //     : enabled && String(command).toUpperCase() === "ON"
  //       ? "on"
  //       : "off";

  // const resolvedToggle = toggleState !== null && toggleState !== undefined
  // ? toggleState
  // : enabled && String(command).toUpperCase() === "ON" ? "on" : "off";

  const resolvedToggle =
  toggleState !== null && toggleState !== undefined
    ? toggleState
    : "off";


  // ── Detect running event — tick IS in deps so it recomputes every 30s ──
  const runningEvent = useMemo(
    () => getCurrentRunningEvent(events),
    [events, pollHitTime, tick] // ← tick here is what makes the 30s refresh actually work
  );

  // ── Detect next upcoming event ──
  const nextEvent = useMemo(
    () => getNextEvent(events),
    [events, pollHitTime, tick]
  );

  // ── Display state ──
  // const displayState = runningEvent ? "gray" : resolvedToggle;
  const displayState = runningEvent
  ? (String(runningEvent.command).toUpperCase() === "ON" ? "on-gray" : "off-gray")
  : resolvedToggle;

  // ── Toggle click handler ──
  const handleToggleClick = async (e) => {
    e.stopPropagation();

    if (runningEvent) {
      const result = await Swal.fire({
        title: "Event Currently Running",
        html: `
          The <b>${runningEvent.command}</b> event is currently active.<br/>
          <span style="color:#64748b;font-size:13px">${runningEvent.start} → ${runningEvent.end}</span>
          <br/><br/>
          Do you want to <b>disable</b> this event?
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, disable it",
        cancelButtonText: "Keep running",
        confirmButtonColor: "#EF4444",
        cancelButtonColor: "#64748B",
        background: "#ffffff",
        color: "#1e293b",
        customClass: {
          popup: "rounded-2xl shadow-xl",
          title: "text-base font-semibold",
          htmlContainer: "text-sm text-slate-500",
          confirmButton: "rounded-lg text-sm font-semibold px-5 py-2",
          cancelButton: "rounded-lg text-sm font-semibold px-5 py-2",
        },
        buttonsStyling: true,
      });

      if (result.isConfirmed) {
        // Disable the event → EventCard in right panel reflects immediately
        const updated = events.map((ev) =>
          ev.id === runningEvent.id ? { ...ev, enabled: false } : ev
        );
        onEventsChange?.(updated);
        // Move toggle to OFF
        onToggleChange?.("off");
      }
      return; // always return — never fall through to manual toggle
    }

    // ── No running event: plain manual toggle ──
    onToggleChange?.(resolvedToggle === "on" ? "off" : "on");
  };

  // ── Derived display values ──
  const toNumberOrNull = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const temp = toNumberOrNull(espTemprature);
  const hum  = toNumberOrNull(espHumidity);

  const hour = useMemo(() => new Date(pollHitTime).getHours(), [pollHitTime]);
  const timeOfDay =
    hour >= 5  && hour <= 8  ? "sunrise" :
    hour >= 9  && hour <= 16 ? "day"     :
    hour >= 17 && hour <= 19 ? "sunset"  :
                               "night";

  const statusColorClass = (hasAlert) => hasAlert ? "bg-rose-300" : "bg-emerald-200";

  const displayStart    = nextEvent?.start ?? "--";
  const displayDuration = nextEvent ? formatDuration(nextEvent.duration) : "--";
  const displayCommand  = nextEvent?.command ?? "OFF";
  const isCommandOn     = displayCommand === "ON";

  return (
    <div
      onClick={onCardSelect}
      className={`freezer-card-container rounded-4xl bg-white ${
        isSelected ? "shadow-lg ring-1 ring-[#0D5CA4]/15" : ""
      } min-h-[175px] cursor-pointer transition hover:shadow-md px-4 py-2 flex flex-col justify-around`}
    >
      {/* ── Top section ── */}
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex flex-col items-start">
          <div>
            <div className="flex items-center">
              <span className={`inline-block h-2 w-2 rounded-full mr-2 ${isOnline ? "bg-green-300" : "bg-gray-300"}`} />
              <div className="text-xs text-gray-500">Device ID</div>
            </div>
            <div className="text-lg font-bold text-gray-900">{deviceId}</div>
          </div>

          <div className="flex flex-col mt-2 border-b-2 border-[#C3C1C1]">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${timeOfDay === "sunrise" ? "border border-gray-600" : ""}`}>
                <Sunrise size={18} />
              </div>
              <div className={`p-2 rounded-full ${timeOfDay === "day" ? "border border-gray-600" : ""}`}>
                <Sun size={18} />
              </div>
              <div className={`p-2 rounded-full ${(timeOfDay === "sunset" || timeOfDay === "night") ? "border border-gray-600" : ""}`}>
                <Sunset size={18} />
              </div>
            </div>
            <TemperatureRangeMeter value={temp !== null ? Math.round(temp) : 0} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end gap-2">
          <PowerToggle displayState={displayState} onClick={handleToggleClick} />

          <div className="flex flex-col items-end">
            <div className="text-right">
              <div className="text-xs text-gray-500">Humidity</div>
              <div className="text-xl font-bold">
                {hum !== null ? `${Math.round(hum)}%` : "--"}
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                <div className={`h-2 ${statusColorClass(humidityAlert)}`} />
              </div>
            </div>

            <div className="text-right mt-2">
              <div className="text-xs text-gray-500">Temperature</div>
              <div className="text-xl font-bold">
                {temp !== null ? `${Math.round(temp)}` : "--"}°C
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                <div className={`h-2 ${statusColorClass(temperatureAlert)}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <CalendarDays className="w-6 h-6 text-gray-600" />
          <div className="flex flex-col">
            <p className="text-xs text-gray-500 font-semibold">Starting</p>
            <div className="text-xs font-bold text-[#178D8F]">{displayStart}</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
            <TimerIcon className="w-3 h-3" />
            Duration
          </div>
          <div className="text-xs font-bold text-[#178D8F]">{displayDuration}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 font-semibold">Status</div>
          <div className={`text-xs font-bold ${isCommandOn ? "text-[#178D8F]" : "text-[#96181B]"}`}>
            {displayCommand}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SchedulerDeviceCard;
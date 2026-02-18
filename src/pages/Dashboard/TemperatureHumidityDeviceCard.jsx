// import React, { useMemo } from "react";
// import PropTypes from "prop-types";
// import { Sun, Sunrise, Sunset, Moon } from "lucide-react";

// export default function TemperatureHumidityDeviceCard({
//   deviceId,
//   espTemprature = null,
//   espHumidity = null,
//   temperatureAlert = false,
//   humidityAlert = false,
//   isSelected = false,
//   onCardSelect,
//   lastUpdateTime = null, // ISO string or number (ms) — optional
// }) {
//   // helpers
//   const toNumberOrNull = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : null;
//   };

//   const temp = toNumberOrNull(espTemprature);
//   const hum = toNumberOrNull(espHumidity);

//   // pick time-of-day icon from lastUpdateTime or current time
//   const hour = useMemo(() => {
//     try {
//       if (lastUpdateTime) {
//         const d = new Date(lastUpdateTime);
//         if (!Number.isNaN(d.getTime())) return d.getHours();
//       }
//     } catch (e) {}
//     return new Date().getHours();
//   }, [lastUpdateTime]);

//   // simple mapping: sunrise: 5-8, day: 9-16, sunset: 17-19, night: else
//   const timeOfDay = hour >= 5 && hour <= 8
//     ? "sunrise"
//     : hour >= 9 && hour <= 16
//     ? "day"
//     : hour >= 17 && hour <= 19
//     ? "sunset"
//     : "night";

//   // status bar colors (green when ok, light red when alert)
//   const statusColorClass = (hasAlert) =>
//     hasAlert ? "bg-rose-200" : "bg-emerald-200";

//   // determine knob position on gradient bar for a value
//   // map temperature (assume -10..50) to 0..100%
//   const knobPosPercent = (value, min = -10, max = 50) => {
//     if (value === null) return 0;
//     const clamped = Math.max(min, Math.min(max, value));
//     const pct = ((clamped - min) / (max - min)) * 100;
//     return Math.round(pct);
//   };

//   const tempKnob = knobPosPercent(temp);
//   const humKnob = knobPosPercent(hum, 0, 100);

//   const cardSelectedClass = isSelected ? "shadow-lg transform scale-[1.01]" : "";

//   return (
//     <div
//       onClick={() => onCardSelect && onCardSelect()}
//       className={`freezer-card-container relative rounded-4xl bg-white min-h-[160px] p-4 ${cardSelectedClass} cursor-pointer`}
//     >
//       {/* top-right alert small pill */}
//       <div className="absolute top-3 right-3 flex items-center space-x-2">
//         {(temperatureAlert || humidityAlert) ? (
//           <div className="flex items-center gap-2 bg-rose-100 text-rose-700 rounded-xl px-2 py-1 text-xs font-semibold">
//             <svg width="14" height="14" viewBox="0 0 24 24" className="inline-block">
//               <path fill="currentColor" d="M6 22h12L12 2 6 22z"/> 
//             </svg>
//             <span>Alert</span>
//           </div>
//         ) : (
//           <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-xl px-2 py-1 text-xs font-semibold">
//             <svg width="14" height="14" viewBox="0 0 24 24" className="inline-block">
//               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
//             </svg>
//             <span>OK</span>
//           </div>
//         )}
//       </div>

//       <div className="flex h-full justify-between">
//         {/* Left column: icons row + small gradient bar w/knob */}
//         <div className="flex flex-col justify-between w-1/3">
//           <div>
//             <div className="text-xs text-gray-500">Device ID</div>
//             <div className="text-lg font-bold">{deviceId}</div>
//           </div>

//           {/* icons row (sunrise/day/sunset/night) */}
//           <div className="flex items-center justify-start gap-3 mt-2">
//             <div className={`p-2 rounded-full border ${timeOfDay === "sunrise" ? "border-2" : "border-transparent"}`}>
//               <Sunrise size={18} className={`${timeOfDay === "sunrise" ? "text-yellow-600" : "text-gray-300"}`} />
//             </div>
//             <div className={`p-2 rounded-full border ${timeOfDay === "day" ? "border-2" : "border-transparent"}`}>
//               <Sun size={18} className={`${timeOfDay === "day" ? "text-yellow-500" : "text-gray-300"}`} />
//             </div>
//             <div className={`p-2 rounded-full border ${timeOfDay === "sunset" ? "border-2" : "border-transparent"}`}>
//               <Sunset size={18} className={`${timeOfDay === "sunset" ? "text-orange-500" : "text-gray-300"}`} />
//             </div>
//             <div className={`p-2 rounded-full border ${timeOfDay === "night" ? "border-2" : "border-transparent"}`}>
//               <Moon size={18} className={`${timeOfDay === "night" ? "text-sky-600" : "text-gray-300"}`} />
//             </div>
//           </div>

//           {/* thin separator */}
//           <div className="my-2 border-b border-gray-200" />

//           {/* gradient bar + knob (visual indicator) */}
//           <div className="mt-2">
//             <div className="text-xs text-gray-500 mb-2">Comfort meter</div>
//             <div className="w-full relative h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right,#16A34A,#A3E635,#F59E0B,#EF4444)" }}>
//               {/* knob positioned relative to temp (use tempKnob) */}
//               <div
//                 className="absolute -top-2 w-3 h-3 rounded-full border-2 border-white shadow-md bg-black"
//                 style={{ left: `${Math.max(0, Math.min(100, tempKnob))}%`, transform: "translateX(-50%)" }}
//                 title={temp !== null ? `${temp}°C` : "No data"}
//               />
//             </div>
//           </div>
//         </div>

//         {/* center column: humidity & temperature small labels */}
        // <div className="flex flex-col justify-around">
        //   {/* top spacing */}
        //   <div />
        //   <div className="flex flex-col items-center justify-between ">
        //     <div className="">
        //       <div className="text-sm text-gray-500">Temperature</div>
        //       <div className="text-3xl font-bold">
        //         {temp !== null ? `${Math.round(temp)}°C` : "--"}
        //       </div>
        //       {/* status bar below temperature */}
        //       <div className=" mt-2">
        //         <div className="h-2 rounded-full overflow-hidden bg-gray-100">
        //           {/* <div className={`h-2 ${statusColorClass(temperatureAlert)}`} style={{ width: `${temp !== null ? Math.max(6, Math.min(100, tempKnob)) : 10}%` }} /> */}
        //           <div className={`h-2 ${statusColorClass(temperatureAlert)}`}  />
        //         </div>
        //       </div>
        //     </div>

        //     <div className="text-right">
        //       <div className="text-sm text-gray-500">Humidity</div>
        //       <div className="text-2xl font-bold">
        //         {hum !== null ? `${Math.round(hum)}%` : "--"}
        //       </div>
        //       {/* status bar below humidity */}
        //       <div className=" mt-2">
        //         <div className="h-2 rounded-full overflow-hidden bg-gray-100">
        //           <div className={`h-2 ${statusColorClass(humidityAlert)}` } />
        //         </div>
        //       </div>
        //     </div>
        //   </div>

        //   <div />
        // </div>

//         {/* right column: large temperature big numeric (visual) */}
 
//       </div>
//     </div>
//   );
// }

// TemperatureHumidityDeviceCard.propTypes = {
//   deviceId: PropTypes.string,
//   espTemprature: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   espHumidity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   temperatureAlert: PropTypes.bool,
//   humidityAlert: PropTypes.bool,
//   lastUpdateTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onCardSelect: PropTypes.func,
//   isSelected: PropTypes.bool,
// };






// import React, { useMemo } from "react";
// import PropTypes from "prop-types";
// import { Sun, Sunrise, Sunset, Moon } from "lucide-react";

// export default function TemperatureHumidityDeviceCard({
//   deviceId,
//   espTemprature = null,
//   espHumidity = null,
//   temperatureAlert = false,
//   humidityAlert = false,
//   isSelected = false,
//   onCardSelect,
//   lastUpdateTime = null,
//   pollHitTime={pollHitTime}
// }) {
//   const toNumberOrNull = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : null;
//   };

//   const temp = toNumberOrNull(espTemprature);
//   const hum = toNumberOrNull(espHumidity);

//   const hasAnyAlert = temperatureAlert || humidityAlert;

// //   const hour = useMemo(() => {
// //     try {
// //       if (lastUpdateTime) {
// //         const d = new Date(lastUpdateTime);
// //         if (!Number.isNaN(d.getTime())) return d.getHours();
// //       }
// //     } catch (e) {}
// //     return new Date().getHours();
// //   }, [lastUpdateTime]);

// const hour = useMemo(() => {
//   return new Date(pollHitTime).getHours();
// }, [pollHitTime]);


// // const timeOfDay = "sunset"
// const timeOfDay =
//   hour >= 5 && hour <= 8
//     ? "sunrise"
//     : hour >= 9 && hour <= 16
//     ? "day"
//     : hour >= 17 && hour <= 19
//     ? "sunset"
//     : "night";

//   const statusColorClass = (hasAlert) =>
//     hasAlert ? "bg-rose-300" : "bg-emerald-200";

//   const knobPosPercent = (value, min = -10, max = 50) => {
//     if (value === null) return 0;
//     const clamped = Math.max(min, Math.min(max, value));
//     const pct = ((clamped - min) / (max - min)) * 100;
//     return Math.round(pct);
//   };

//   const tempKnob = knobPosPercent(temp);
//   const humKnob = knobPosPercent(hum, 0, 100);

//   const cardSelectedClass = isSelected ? "shadow-lg transform scale-[1.01]" : "";

//   return (
//     <div
//       onClick={() => onCardSelect && onCardSelect()}
//       className={`freezer-card-container  relative rounded-4xl bg-white min-h-[160px] p-4 ${cardSelectedClass} cursor-pointer`}
//     >
//       {/* top-right alert small pill */}
//       {/* <div className="absolute top-0 right-0 flex items-center space-x-2 z-10">
//         {(temperatureAlert || humidityAlert) ? (
//           <div className="flex items-center gap-2 bg-rose-100 text-rose-700 rounded-xl px-2 py-1 text-xs font-semibold">
//             <svg width="14" height="14" viewBox="0 0 24 24" className="inline-block">
//               <path fill="currentColor" d="M6 22h12L12 2 6 22z"/>
//             </svg>
//             <span>Alert</span>
//           </div>
//         ) : (
//           <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-xl px-2 py-1 text-xs font-semibold">
//             <svg width="14" height="14" viewBox="0 0 24 24" className="inline-block">
//               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
//             </svg>
//             <span>OK</span>
//           </div>
//         )}
      
//       </div> */}

//         {/* top-right status pill */}
//         <div className="absolute top-0 right-0 flex items-center z-10 ">
//             <div className="flex bg-[#DCE8F4]/50 rounded-bl-2xl ">
//                 <p className="px-2 pr-4 py-1 text-sm text-[#020F24]">Alert</p>
//         {hasAnyAlert && (
//             <div className="flex items-center  rounded-xl px-2 py-1">
//             {temperatureAlert && (
//                 <img
//                 src="/temp-alert.svg"
//                 alt="Temperature Alert"
//                 className="w-4 h-4"
//                 />
//             )}

//             {humidityAlert && (
//                 <img
//                 src="/hum-alert.svg"
//                 alt="Humidity Alert"
//                 className="w-4 h-4"
//                 />
//             )}
//             </div>
//         )}
//         </div>
      

//         </div>



//       {/* MAIN ROW */}
//       {/* Use responsive: row on sm+, stack on xs. Prevent unwanted shrinking with flex-shrink-0 and min-w. */}
//       <div className="flex flex-row h-full justify-between items-start ">
//         {/* LEFT: icons + meter */}
//         <div className="h-full flex flex-col justify-between flex-shrink-0 min-w-[140px] w-1/3">
//         {/* <div className="flex flex-col justify-between flex-shrink-0 "> */}
//           <div>
//             <div className="text-xs text-gray-500">Device ID</div>
//             <div className="text-lg font-bold truncate">{deviceId}</div>
            
//           </div>

//           {/* icons row - force no wrap and don't allow it to push other content */}
//           <div className="flex items-center justify-start gap-3 mt-2 flex-nowrap overflow-hidden  border-b border-gray-200 pb-2 ">
//             <div className={`p-2 rounded-full border ${timeOfDay === "sunrise" ? "border-1 border-gray-600" : "border-transparent"}`}>
//               <Sunrise size={18} className={`${timeOfDay === "sunrise" ? "text-yellow-600" : "text-gray-500"}`} />
//             </div>
//             <div className={`p-2 rounded-full border ${timeOfDay === "day" ? "border-1 border-gray-600" : "border-transparent"}`}>
//               <Sun size={18} className={`${timeOfDay === "day" ? "text-yellow-500" : "text-gray-500"}`} />
//             </div>
//             <div className={`p-2 rounded-full border ${(timeOfDay === "sunset" || timeOfDay === "night") ? "border-1 border-gray-600" : "border-transparent"}`}>
//               <Sunset size={18} className={`${timeOfDay === "sunset" ? "text-orange-500" : "text-gray-500"}`} />
//             </div>
//             {/* <div className={`p-2 rounded-full border ${timeOfDay === "night" ? "border-2" : "border-transparent"}`}>
//               <Moon size={18} className={`${timeOfDay === "night" ? "text-sky-600" : "text-gray-300"}`} />
//             </div> */}
//           {/* <div className="my-2 border-b border-gray-200" /> */}
//           </div>


//           {/* gradient bar + knob */}
//           {/* Ensure bar has enough width and doesn't wrap beneath other columns by giving left column min width & flex-shrink-0 */}
//           <div className="mt-2">
//             {/* <div className="text-xs text-gray-500 mb-2">Comfort meter</div> */}
//             <div className="w-full relative h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right,#16A34A,#A3E635,#F59E0B,#EF4444)" }}>
//               <div
//                 className="absolute -top-2 w-3 h-3 rounded-full border-2 border-white shadow-md bg-black"
//                 style={{ left: `${Math.max(0, Math.min(100, tempKnob))}%`, transform: "translateX(-50%)" }}
//                 title={temp !== null ? `${temp}°C` : "No data"}
//               />
//             </div>
//           </div>
//         </div>

//         {/* CENTER: flex-1 so it takes remaining space and doesn't collapse */}
//          <div className="h-full flex flex-col justify-around">
//           {/* top spacing */}
//           <div />
//           <div className="h-full flex flex-col items-center justify-around mt-5 ">
//             <div className="">
//               <div className="text-sm text-gray-500">Temperature</div>
//               <div className="text-3xl font-bold">
//                 {temp !== null ? `${Math.round(temp)}°C` : "--"}
//               </div>
//               {/* status bar below temperature */}
//               <div className=" mt-2">
//                 <div className="h-2 rounded-full overflow-hidden bg-gray-100">
//                   {/* <div className={`h-2 ${statusColorClass(temperatureAlert)}`} style={{ width: `${temp !== null ? Math.max(6, Math.min(100, tempKnob)) : 10}%` }} /> */}
//                   <div className={`h-2 ${statusColorClass(temperatureAlert)}`}  />
//                 </div>
//               </div>
//             </div>

//             <div className="text-right">
//               <div className="text-sm text-gray-500">Humidity</div>
//               <div className="text-2xl font-bold">
//                 {hum !== null ? `${Math.round(hum)}%` : "--"}
//               </div>
//               {/* status bar below humidity */}
//               <div className=" mt-2">
//                 <div className="h-2 rounded-full overflow-hidden bg-gray-100">
//                   <div className={`h-2 ${statusColorClass(humidityAlert)}` } />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div />
//         </div>

       
//       </div>
//     </div>
//   );
// }

// TemperatureHumidityDeviceCard.propTypes = {
//   deviceId: PropTypes.string,
//   espTemprature: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   espHumidity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   temperatureAlert: PropTypes.bool,
//   humidityAlert: PropTypes.bool,
//   lastUpdateTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onCardSelect: PropTypes.func,
//   isSelected: PropTypes.bool,
// };










import { useMemo } from "react";
import PropTypes from "prop-types";
import { Sun, Sunrise, Sunset, Moon } from "lucide-react";
import TemperatureRangeMeter from "./TemperatureRangeMeter";

export default function TemperatureHumidityDeviceCard({
  deviceId,
  espTemprature = null,
  espHumidity = null,
  temperatureAlert = false,
  humidityAlert = false,
  isSelected = false,
  onCardSelect,
  lastUpdateTime = null,
  pollHitTime={pollHitTime},
   isOnline = false,         // NEW
  lastUpdateISO = null,
  
}) {
  const toNumberOrNull = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

    // format last update for title/tooltip
  const lastUpdateStr = lastUpdateISO ? new Date(lastUpdateISO).toLocaleString() : "";


  const temp = toNumberOrNull(espTemprature);
  const hum = toNumberOrNull(espHumidity);

  const hasAnyAlert = temperatureAlert || humidityAlert;

//   const hour = useMemo(() => {
//     try {
//       if (lastUpdateTime) {
//         const d = new Date(lastUpdateTime);
//         if (!Number.isNaN(d.getTime())) return d.getHours();
//       }
//     } catch (e) {}
//     return new Date().getHours();
//   }, [lastUpdateTime]);

const hour = useMemo(() => {
  return new Date(pollHitTime).getHours();
}, [pollHitTime]);


// const timeOfDay = "sunset"
const timeOfDay =
  hour >= 5 && hour <= 8
    ? "sunrise"
    : hour >= 9 && hour <= 16
    ? "day"
    : hour >= 17 && hour <= 19
    ? "sunset"
    : "night";

  const statusColorClass = (hasAlert) =>
    hasAlert ? "bg-rose-300" : "bg-emerald-200";

  // const knobPosPercent = (value, min = -10, max = 50) => {
  //   if (value === null) return 0;
  //   const clamped = Math.max(min, Math.min(max, value));
  //   const pct = ((clamped - min) / (max - min)) * 100;
  //   return Math.round(pct);
  // };

  // const tempKnob = knobPosPercent(temp);
  // const humKnob = knobPosPercent(hum, 0, 100);

  const cardSelectedClass = isSelected ? "shadow-lg transform scale-[1.01]" : "";

  return (
    <div
      onClick={() => onCardSelect && onCardSelect()}
      className={`freezer-card-container  relative rounded-4xl bg-white min-h-[160px] p-4 ${cardSelectedClass} cursor-pointer`}
    >
      {/* top-right alert small pill */}
      {/* <div className="absolute top-0 right-0 flex items-center space-x-2 z-10">
        {(temperatureAlert || humidityAlert) ? (
          <div className="flex items-center gap-2 bg-rose-100 text-rose-700 rounded-xl px-2 py-1 text-xs font-semibold">
            <svg width="14" height="14" viewBox="0 0 24 24" className="inline-block">
              <path fill="currentColor" d="M6 22h12L12 2 6 22z"/>
            </svg>
            <span>Alert</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-xl px-2 py-1 text-xs font-semibold">
            <svg width="14" height="14" viewBox="0 0 24 24" className="inline-block">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
            <span>OK</span>
          </div>
        )}
      
      </div> */}

        {/* top-right status pill */}
        <div className="absolute top-0 right-0 flex items-center z-10 ">
            <div className={`flex  rounded-bl-2xl ${temperatureAlert ? "bg-rose-100" : "bg-[#DCE8F4]/50"}`} >
                <p className="px-2 pr-4 py-1 text-sm text-[#020F24]">Alert</p>
        {hasAnyAlert && (
            <div className="flex items-center  rounded-xl px-2 py-1">
            {temperatureAlert && (
                <img
                src="/temp-alert.svg"
                alt="Temperature Alert"
                className="w-4 h-4"
                />
            )}

            {humidityAlert && (
                <img
                src="/hum-alert.svg"
                alt="Humidity Alert"
                className="w-4 h-4"
                />
            )}
            </div>
        )}
        </div>
      

        </div>



      {/* MAIN ROW */}
      {/* Use responsive: row on sm+, stack on xs. Prevent unwanted shrinking with flex-shrink-0 and min-w. */}
      <div className="flex flex-row h-full justify-between items-start ">
        {/* LEFT: icons + meter */}
        <div className="h-full flex flex-col justify-between flex-shrink-0 min-w-[140px] w-1/3">
        {/* <div className="flex flex-col justify-between flex-shrink-0 "> */}
          {/* <div>
            <div className="text-xs text-gray-500">Device ID</div>
            <div className="text-lg font-bold truncate">{deviceId}</div>
            
          </div> */}


      {/* <div>
        <div className="text-xs text-gray-500">Device ID</div>
        <div className="text-lg font-bold truncate flex items-center" title={lastUpdateISO ? new Date(lastUpdateISO).toLocaleString() : ""}>
          <span
            aria-hidden
            className={`inline-block h-3 w-3 rounded-full mr-2 shadow-sm ${isOnline ? "bg-green-500" : "bg-gray-300"}`}
            style={{ boxShadow: isOnline ? "0 0 6px rgba(34,197,94,0.45)" : "none" }}
          />
          <span className="truncate">{deviceId}</span>
        </div>
      </div> */}


   <div title={lastUpdateStr}>
            <div className="flex items-center">
                <span
                  aria-hidden
                  className={`inline-block h-1.5 w-1.5 rounded-full mr-2 shadow-sm ${isOnline ? "bg-green-300" : "bg-gray-300"}`}
                  style={{ boxShadow: isOnline ? "0 0 6px rgba(34,197,94,0.45)" : "none" }}
                />
            <div className="text-xs text-gray-500">Device ID</div>
            </div>
            <div className="text-lg font-bold">{deviceId}</div>
          </div>
          







          {/* icons row - force no wrap and don't allow it to push other content */}
          <div className="flex items-center justify-start gap-3 mt-2 flex-nowrap overflow-hidden   border-b-2 border-[#C3C1C1] pb-2 ">
            <div className={`p-2 rounded-full border ${timeOfDay === "sunrise" ? "border-1 border-gray-600" : "border-transparent"}`}>
              <Sunrise size={18} className={`${timeOfDay === "sunrise" ? "text-yellow-600" : "text-gray-500"}`} />
            </div>
            <div className={`p-2 rounded-full border ${timeOfDay === "day" ? "border-1 border-gray-600" : "border-transparent"}`}>
              <Sun size={18} className={`${timeOfDay === "day" ? "text-yellow-500" : "text-gray-500"}`} />
            </div>
            <div className={`p-2 rounded-full border ${(timeOfDay === "sunset" || timeOfDay === "night") ? "border-1 border-gray-600" : "border-transparent"}`}>
              <Sunset size={18} className={`${timeOfDay === "sunset" ? "text-orange-500" : "text-gray-500"}`} />
            </div>
            {/* <div className={`p-2 rounded-full border ${timeOfDay === "night" ? "border-2" : "border-transparent"}`}>
              <Moon size={18} className={`${timeOfDay === "night" ? "text-sky-600" : "text-gray-300"}`} />
            </div> */}
          {/* <div className="my-2 border-b border-gray-200" /> */}
          </div>


          {/* gradient bar + knob */}
          {/* Ensure bar has enough width and doesn't wrap beneath other columns by giving left column min width & flex-shrink-0 */}
          {/* <div className="mt-2">
           
            <div className="w-full relative h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right,#16A34A,#A3E635,#F59E0B,#EF4444)" }}>
              <div
                className="absolute -top-2 w-3 h-3 rounded-full border-2 border-white shadow-md bg-black"
                style={{ left: `${Math.max(0, Math.min(100, tempKnob))}%`, transform: "translateX(-50%)" }}
                title={temp !== null ? `${temp}°C` : "No data"}
              />
            </div>
          </div> */}
{/* 
         <TemperatureRangeMeter value={temp !== null ? Math.round(temp) : 0} /> */}

        <TemperatureRangeMeter value={temp !== null ? Math.round(temp) : 0} />


        </div>

        {/* CENTER: flex-1 so it takes remaining space and doesn't collapse */}
         <div className="h-full flex flex-col justify-around">
          {/* top spacing */}
          <div />
          <div className="h-full flex flex-col items-center justify-around mt-5 ">
            <div className="">
              <div className="text-sm text-gray-500">Temperature</div>
              <div className="text-3xl font-bold">
                {temp !== null ? `${Math.round(temp)}` : "--"}<span className="font-normal">°C</span>
              </div>
              {/* status bar below temperature */}
              <div className=" mt-2">
                <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                  {/* <div className={`h-2 ${statusColorClass(temperatureAlert)}`} style={{ width: `${temp !== null ? Math.max(6, Math.min(100, tempKnob)) : 10}%` }} /> */}
                  <div className={`h-2 ${statusColorClass(temperatureAlert)}`}  />
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500">Humidity</div>
              <div className="text-2xl font-bold">
                {hum !== null ? `${Math.round(hum)}%` : "--"}
              </div>
              {/* status bar below humidity */}
              <div className=" mt-2">
                <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                  <div className={`h-2 ${statusColorClass(humidityAlert)}` } />
                </div>
              </div>
            </div>
          </div>

          <div />
        </div>

       
      </div>
    </div>
  );
}

TemperatureHumidityDeviceCard.propTypes = {
  deviceId: PropTypes.string,
  espTemprature: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  espHumidity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  temperatureAlert: PropTypes.bool,
  humidityAlert: PropTypes.bool,
  lastUpdateTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onCardSelect: PropTypes.func,
  isSelected: PropTypes.bool,
  isOnline: PropTypes.bool,
  lastUpdateISO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};


// const formatDays = (days) => {
//   if (days.length === 7) return "Mon Tue ... Sun";
//   return days.join(" ");
// };

// const EventCard = ({ event, onToggle }) => {
//   return (
//     <div className="min-w-[240px]  rounded-2xl shadow-md p-4 border">
      
//       {/* TIME */}
//       <div className="flex justify-between text-lg font-semibold">
//         <span>{event.start}</span>
//         <span>{event.end}</span>
//       </div>

//       <div className="flex justify-between text-xs text-gray-500">
//         <span>Start Time</span>
//         <span>End Time</span>
//       </div>

//       {/* DAYS */}
//       <p className="mt-4 text-sm text-gray-600">
//         {formatDays(event.days)}
//       </p>

//       {/* ENABLE BUTTON */}
//       <div className="mt-3 flex justify-end">
//         <button
//           onClick={onToggle}
//           className={`px-4 py-1 rounded-full text-white text-sm
//           ${event.enabled ? "bg-green-500" : "bg-gray-400"}`}
//         >
//           {event.enabled ? "Enabled" : "Disabled"}
//         </button>
//       </div>

//     </div>

    
//   );
// };

// export default EventCard;






// import React from "react";
// import './eventcard.css';

// const EventCard = ({ event, onToggle }) => {
//   return (
    // <div className="min-w-[270px] bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">

    //   {/* TIME + COMMAND */}
    //   <div className="flex justify-between items-center">
    //     <div className="flex items-baseline gap-3">
    //       <span className="text-3xl font-semibold text-gray-900 tracking-tighter">
    //         {event.start}
    //       </span>
    //       <span className="text-gray-300 text-2xl font-light">-</span>
    //       <span className="text-3xl font-semibold text-gray-900 tracking-tighter">
    //         {event.end}
    //       </span>
    //     </div>

    //     {/* ON / OFF Badge */}
    //     <div
    //       className={`px-5 py-1.5 text-xs font-semibold rounded-3xl tracking-wider uppercase
    //         ${
    //           event.command === "ON"
    //             ? "bg-emerald-100 text-emerald-700"
    //             : "bg-red-100 text-red-700"
    //         }`}
    //     >
    //       {event.command}
    //     </div>
    //   </div>

    //   {/* DAYS - Beautiful chips */}
    //   <div className="mt-6 flex flex-wrap gap-2">
    //     {event.days.map((day) => (
    //       <span
    //         key={day}
    //         className="px-4 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-3xl transition-colors"
    //       >
    //         {day}
    //       </span>
    //     ))}
    //   </div>

    //   {/* STATUS TOGGLE */}
    //   <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
    //     <span className="text-sm text-gray-500 font-medium">Active</span>

    //     <label className="relative inline-flex cursor-pointer">
    //       <input
    //         type="checkbox"
    //         checked={event.enabled}
    //         onChange={onToggle}
    //         className="sr-only peer"
    //       />
    //       <div
    //         className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 
    //                    peer-focus:ring-emerald-200 transition-colors
    //                    peer peer-checked:bg-emerald-500
    //                    after:content-[''] after:absolute after:top-0.5 after:left-0.5 
    //                    after:bg-white after:rounded-full after:h-5 after:w-5 
    //                    after:shadow-sm after:transition-all peer-checked:after:translate-x-5"
    //       />
    //     </label>
    //   </div>

    //   <div class="inv-rad inv-rad-b-r-10 bg-green-400 size-32"></div>
    // </div>

//     <div className="relative bg-blue-300 clip-path-trying  ">

//       <div className="absolute -bottom-10 -right-10 bg-blue-500 rounded-full">
//         Enable 
//       </div>
//     </div>
//     // <></>
//   );
// };

// export default EventCard;




// import Tooltip from "@mui/material/Tooltip";
// import { Clock, Power } from "lucide-react";

// const cardClip = {
//   clipPath:
//     'path("M 20,0 L 200,0 A 20,20 0,0,1 220,20 L 220,90 A 20,20 0,0,1 200,110 L 150,110 A 20,20 0,0,0 140,120 L 140,130 L 140,140 A 20,20 0,0,1 130,150 L 20,150 A 20,20 0,0,1 0,130 L 0,20 A 20,20 0,0,1 20,0 Z")',
//   WebkitClipPath:
//     'path("M 20,0 L 200,0 A 20,20 0,0,1 220,20 L 220,90 A 20,20 0,0,1 200,110 L 150,110 A 20,20 0,0,0 140,120 L 140,130 L 140,140 A 20,20 0,0,1 130,150 L 20,150 A 20,20 0,0,1 0,130 L 0,20 A 20,20 0,0,1 20,0 Z")',
// };

// const EventCard = ({ event, onToggle }) => {
//   const isOn = event.command === "ON" || event.enabled;


//   // formatDays 


// const formatDays = (days = []) => {
//   if (days.length <= 2) {
//     return {
//       display: days,
//       tooltip: null,
//     };
//   }

//   return {
//     display: [days[0], "…", days[days.length - 1]],
//     tooltip: days.join(", "),
//   };
// };

// return (
//     // <div className="relative flex-shrink-0 w-[min(92vw,220px)] h-[150px] overflow-visible ">
//     <div className="relative flex-shrink-0 w-[min(92vw,220px)] h-[150px] overflow-visible ">
//       {/* Main clipped card */}
//       <div
//         style={cardClip}
//         className="absolute inset-0 bg-white "
//       >
//         <div className="relative h-full p-3 flex flex-col justify-between ">
//           {/* Top row */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2 text-slate-400">
//               <Clock size={14} strokeWidth={2} />
//               <span className="text-xs font-medium tracking-wide">Schedule</span>
//             </div>

//             <span
//               className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.18em] ${
//                 isOn
//                   ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
//                   : "bg-slate-100 text-slate-500 border border-slate-200"
//               }`}
//             >
//               {event.command}
//             </span>
//           </div>

//           {/* Time */}
        
//             <div className="flex flex-wrap items-center justify-center gap-x-3 ">
//               <div className="flex flex-col items-center gap-0.5 ">
//               <span className="text-md font-extrabold tracking-tight text-slate-900 tabular-nums leading-none">
//                 {event.start || "--:--"}
//               </span>
//                <span className="text-xs font-semibold text-gray-500">Start Time</span>
//               </div>
//               <span className="text-2xl font-semibold text-slate-400 leading-none">
//                 –
//               </span>
//                <div className="flex flex-col items-center gap-0.5 ">
//               <span className="text-md font-extrabold tracking-tight text-slate-900 tabular-nums leading-none">
//                 {event.end || "--:--"}
//               </span>
//               <span  className="text-xs font-semibold text-gray-500">End Time</span>
//              </div>
//             </div>

//             {/* <div className="mt-1 flex items-center justify-around max-w-[240px] text-sm text-slate-500">
             
              
//             </div> */}
         

//           {/* Days */}
//           <div>
//             {/* {event.days?.length ? (
//               <div className="flex flex-wrap gap-1.5">
//                 {event.days.map((day) => (
//                   <span
//                     key={day}
//                     className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold"
//                   >
//                     {day}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <span className="text-xs italic text-slate-300">
//                 No repeat days selected
//               </span>
//             )} */}


//             {/* Days */}
// <div>
//   {event.days?.length ? (
//     (() => {
//       const { display, tooltip } = formatDays(event.days);

//       const content = (
//         <div className="flex flex-wrap gap-1.5">
//           {display.map((d, i) =>
//             d === "…" ? (
//               <span
//                 key={i}
//                 className="px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[11px] font-semibold"
//               >
//                 …
//               </span>
//             ) : (
//               <span
//                 key={d}
//                 className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold"
//               >
//                 {d}
//               </span>
//             )
//           )}
//         </div>
//       );

//       return tooltip ? (
//         <Tooltip
//           title={tooltip}
//           arrow
//           enterTouchDelay={0}
//           leaveTouchDelay={3000}
//         >
//           <div className="cursor-default">{content}</div>
//         </Tooltip>
//       ) : (
//         content
//       );
//     })()
//   ) : (
//     <span className="text-xs italic text-slate-300">
//       No repeat days selected
//     </span>
//   )}
// </div>


//           </div>
//         </div>
//       </div>

//       {/* Enable button sits outside the clipped area */}
//       <button
//         type="button"
//         onClick={onToggle}
//         aria-pressed={!!event.enabled}
//         className={`absolute -right-0 bottom-0  z-20 inline-flex items-center gap-1 px-2 py-2 rounded-xl  text-xs  font-semibold shadow-lg transition-all duration-200 active:scale-[0.98] ${
//           isOn
//             ? "bg-emerald-500 text-white hover:bg-emerald-600"
//             : "bg-slate-900 text-white hover:bg-slate-800"
//         }`}
//       >
//         <Power size={14} strokeWidth={2} />
//         {event.enabled ? "Disable" : "Enable"}
//       </button>
//     </div>
//   );
// };

// export default EventCard;







import Tooltip from "@mui/material/Tooltip";
import { Clock, Power } from "lucide-react";

const cardClip = {
  clipPath:
    'path("M 20,0 L 200,0 A 20,20 0,0,1 220,20 L 220,90 A 20,20 0,0,1 200,110 L 150,110 A 20,20 0,0,0 140,120 L 140,130 L 140,140 A 20,20 0,0,1 130,150 L 20,150 A 20,20 0,0,1 0,130 L 0,20 A 20,20 0,0,1 20,0 Z")',
  WebkitClipPath:
    'path("M 20,0 L 200,0 A 20,20 0,0,1 220,20 L 220,90 A 20,20 0,0,1 200,110 L 150,110 A 20,20 0,0,0 140,120 L 140,130 L 140,140 A 20,20 0,0,1 130,150 L 20,150 A 20,20 0,0,1 0,130 L 0,20 A 20,20 0,0,1 20,0 Z")',
};

const EventCard = ({ event, onToggle }) => {

  const formatDays = (days = []) => {
    if (days.length <= 2) return { display: days, tooltip: null };
    return {
      display: [days[0], "…", days[days.length - 1]],
      tooltip: days.join(", "),
    };
  };

  return (
    <div className="relative flex-shrink-0 w-[min(92vw,220px)] h-[150px] overflow-visible">
      {/* Main clipped card */}
      <div style={cardClip} className="absolute inset-0 bg-white">
        <div className="relative h-full p-3 flex flex-col justify-between">

          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock size={14} strokeWidth={2} />
              <span className="text-xs font-medium tracking-wide">Schedule</span>
            </div>

            {/* Command badge — ON=emerald, OFF=rose */}
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.18em] ${
                event.command === "ON"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "bg-rose-50 text-rose-600 border border-rose-200"
              }`}
            >
              {event.command}
            </span>
          </div>

          {/* Time */}
          <div className="flex flex-wrap items-center justify-center gap-x-3">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-md font-extrabold tracking-tight text-slate-900 tabular-nums leading-none">
                {event.start || "--:--"}
              </span>
              <span className="text-xs font-semibold text-gray-500">Start Time</span>
            </div>
            <span className="text-2xl font-semibold text-slate-400 leading-none">-</span>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-md font-extrabold tracking-tight text-slate-900 tabular-nums leading-none">
                {event.end || "--:--"}
              </span>
              <span className="text-xs font-semibold text-gray-500">End Time</span>
            </div>
          </div>

          {/* Days */}
          <div>
            {event.days?.length ? (
              (() => {
                const { display, tooltip } = formatDays(event.days);
                const content = (
                  <div className="flex flex-wrap gap-1.5">
                    {display.map((d, i) =>
                      d === "…" ? (
                        <span key={i} className="px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[11px] font-semibold">…</span>
                      ) : (
                        <span key={d} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold">{d}</span>
                      )
                    )}
                  </div>
                );
                return tooltip ? (
                  <Tooltip title={tooltip} arrow enterTouchDelay={0} leaveTouchDelay={3000}>
                    <div className="cursor-default">{content}</div>
                  </Tooltip>
                ) : content;
              })()
            ) : (
              <span className="text-xs italic text-slate-300">No repeat days selected</span>
            )}
          </div>
        </div>
      </div>

      {/* Enable / Disable button — indigo when enabled (action = disable), emerald when disabled (action = enable) */}
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={!!event.enabled}
        className={`absolute -right-0 bottom-0 z-20 inline-flex items-center gap-1 px-2 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all duration-200 active:scale-[0.98] ${
          event.enabled
            ? "bg-indigo-500 text-white hover:bg-indigo-600"
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        }`}
      >
        <Power size={14} strokeWidth={2} />
        {event.enabled ? "Disable" : "Enable"}
      </button>
    </div>
  );
};

export default EventCard;




// import { useState } from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { X } from "lucide-react";
// import dayjs from "dayjs";

// const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// const EventModal = ({ open, onClose, onSave }) => {
//   const [start, setStart] = useState(null);
//   const [end, setEnd] = useState(null);
//   const [command, setCommand] = useState("ON");
//   const [days, setDays] = useState([]);

//   if (!open) return null;

//   const toggleDay = (day) => {
//     setDays((prev) =>
//       prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//     );
//   };

//   const handleSave = () => {
//     onSave({
//       id: crypto.randomUUID(),
//       start: start ? start.format("HH:mm") : "",
//       end: end ? end.format("HH:mm") : "",
//       command,
//       days,
//       enabled: true,
//     });
//     onClose();
//   };

//   const timePickerSx = {
//     width: "100%",
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "10px",
//       backgroundColor: "#F8FAFC",
//       fontSize: "0.9rem",
//       "& fieldset": { borderColor: "#E2E8F0" },
//       "&:hover fieldset": { borderColor: "#94A3B8" },
//       "&.Mui-focused fieldset": { borderColor: "#3B82F6", borderWidth: "1.5px" },
//     },
//     "& .MuiInputLabel-root": { fontSize: "0.85rem", color: "#64748B" },
//     "& .MuiInputLabel-root.Mui-focused": { color: "#3B82F6" },
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-50 flex items-center justify-center"
//         style={{ backgroundColor: "rgba(15, 23, 42, 0.45)", backdropFilter: "blur(3px)" }}
//       >
//         {/* Card */}
//         <div
//           className="relative bg-white rounded-2xl shadow-2xl w-full"
//           style={{ maxWidth: "440px", margin: "16px" }}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
//             <div>
//               <h2 className="text-base font-semibold text-slate-800 tracking-tight">
//                 New Schedule Event
//               </h2>
//               <p className="text-xs text-slate-400 mt-0.5">
//                 Set a time range and repeat days
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
//             >
//               <X size={15} />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="px-6 py-5 space-y-5">

//             {/* Time Row */}
//             <div>
//               <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
//                 Time Range
//               </label>
//               <div className="flex items-center gap-3">
//                 <TimePicker
//                   label="Start"
//                   value={start}
//                   onChange={setStart}
//                   ampm={false}
//                   sx={timePickerSx}
//                 />
//                 <div className="text-slate-300 font-light text-lg flex-shrink-0">→</div>
//                 <TimePicker
//                   label="End"
//                   value={end}
//                   onChange={setEnd}
//                   ampm={false}
//                   sx={timePickerSx}
//                 />
//               </div>
//             </div>

//             {/* Days */}
//             <div>
//               <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
//                 Repeat Days
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {daysList.map((d) => (
//                   <button
//                     key={d}
//                     onClick={() => toggleDay(d)}
//                     className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
//                       days.includes(d)
//                         ? "bg-blue-500 border-blue-500 text-white shadow-sm"
//                         : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
//                     }`}
//                   >
//                     {d}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Command */}
//             <div>
//               <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
//                 Command
//               </label>
//               <div
//                 className="flex rounded-xl border border-slate-200 overflow-hidden"
//                 style={{ width: "fit-content" }}
//               >
//                 {["ON", "OFF"].map((cmd) => (
//                   <button
//                     key={cmd}
//                     onClick={() => setCommand(cmd)}
//                     className={`px-6 py-2 text-sm font-semibold transition-all duration-150 ${
//                       command === cmd
//                         ? cmd === "ON"
//                           ? "bg-emerald-500 text-white"
//                           : "bg-red-500 text-white"
//                         : "bg-white text-slate-400 hover:bg-slate-50"
//                     }`}
//                   >
//                     {cmd}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex items-center justify-end gap-2 px-6 pb-6 pt-2 border-t border-slate-100">
//             <button
//               onClick={onClose}
//               className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-500 rounded-lg hover:bg-slate-100 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="cursor-pointer  px-5 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-sm"
//             >
//               Save Event
//             </button>
//           </div>
//         </div>
//       </div>
//     </LocalizationProvider>
//   );
// };

// export default EventModal;







// import React from "react";
// import { Clock } from "lucide-react";

// const EventCard = ({ event, onToggle }) => {
//   const isOn = event.command === "ON";

//   return (
//     <div className="min-w-[260px] max-w-[280px] bg-white rounded-2xl   hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex-shrink-0">

//       {/* Top accent bar */}
//       <div
//         className={`h-1 w-full ${isOn ? "bg-emerald-400" : "bg-red-400"}`}
//       />

//       <div className="p-5">
//         {/* Command badge + clock icon */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2 text-slate-400">
//             <Clock size={13} strokeWidth={2} />
//             <span className="text-xs font-medium text-slate-400">Schedule</span>
//           </div>
//           <span
//             className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${
//               isOn
//                 ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
//                 : "bg-red-50 text-red-500 border border-red-200"
//             }`}
//           >
//             {event.command}
//           </span>
//         </div>

//         {/* Time display */}
//         <div className="flex items-baseline gap-2 mb-1">
//           <span className="text-2xl font-bold text-slate-800 tracking-tight tabular-nums">
//             {event.start}
//           </span>
//           <span className="text-slate-300 text-sm">to</span>
//           <span className="text-2xl font-bold text-slate-800 tracking-tight tabular-nums">
//             {event.end}
//           </span>
//         </div>

//         {/* Days */}
//         <div className="flex flex-wrap gap-1.5 mt-4">
//           {event.days.length > 0 ? (
//             event.days.map((day) => (
//               <span
//                 key={day}
//                 className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-500 rounded-md"
//               >
//                 {day}
//               </span>
//             ))
//           ) : (
//             <span className="text-xs text-slate-300 italic">No days selected</span>
//           )}
//         </div>

//         {/* Divider + Toggle */}
    
//       </div>

//           <div className="flex items-center justify-end ">
        
//           <label
//             style={{
//                 backgroundColor: "rgba(7, 81, 141, 0.07)"
//             }}
//             className="relative inline-flex cursor-pointer items-center p-4 border-slate-100 border-tl-2 rounded-tl-2xl" 
//             >
//             <input
//               type="checkbox"
//               checked={event.enabled}
//               onChange={onToggle}
//               className="sr-only peer"
//             />
//             <div
//               className={`w-10 h-5 rounded-full transition-colors duration-200 relative
//                 ${event.enabled ? "bg-emerald-500" : "bg-slate-200"}
//                 after:content-[''] after:absolute after:top-0.5 after:left-0.5
//                 after:bg-white after:rounded-full after:h-4 after:w-4
//                 after:shadow-sm after:transition-all after:duration-200
//                 ${event.enabled ? "after:translate-x-5" : "after:translate-x-0"}`}
//             />
//           </label>
//         </div>
//     </div>
//   );
// };

// export default EventCard;






// import React from "react";
// import { Clock } from "lucide-react";

// const EventCard = ({ event, onToggle }) => {
//   const isOn = event.command === "ON";

//   return (
//     // 🔥 OUTER WRAPPER (handles border properly)
//     <div className="min-w-[260px] max-w-[280px] rounded-2xl bg-[#f4f4f4] p-[1px]">
      
//       {/* 🔥 INNER CARD */}
//       <div className="relative bg-white rounded-2xl overflow-hidden hover:-translate-y-0.5 transition-all duration-200">

//         {/* Top accent bar */}
//         <div
//           className={`h-1 w-full ${isOn ? "bg-emerald-400" : "bg-red-400"}`}
//         />

//         <div className="p-5 pb-8">
//           {/* Header */}
//           {/* <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2 text-slate-400">
//               <Clock size={13} strokeWidth={2} />
//               <span className="text-xs font-medium">Schedule</span>
//             </div>

//             <span
//               className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${
//                 isOn
//                   ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
//                   : "bg-red-50 text-red-500 border border-red-200"
//               }`}
//             >
//               {event.command}
//             </span>
//           </div> */}

//           {/* Time */}
//           <div className="flex items-baseline gap-2 mb-1">
//             <span className="text-2xl font-bold text-slate-800 tabular-nums">
//               {event.start}
//             </span>
//             <span className="text-slate-300 text-sm">to</span>
//             <span className="text-2xl font-bold text-slate-800 tabular-nums">
//               {event.end}
//             </span>
//           </div>

//           {/* Days */}
//           <div className="flex flex-wrap gap-1.5 mt-4">
//             {event.days.length > 0 ? (
//               event.days.map((day) => (
//                 <span
//                   key={day}
//                   className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-500 rounded-md"
//                 >
//                   {day}
//                 </span>
//               ))
//             ) : (
//               <span className="text-xs text-slate-300 italic">
//                 No days selected
//               </span>
//             )}
//           </div>
//         </div>

//         {/* 🔥 CUT-OUT SHAPE */}
//         {/* <div className="absolute bottom-0 right-0 w-20 h-16 bg-[#07518D12] border-t-3 border-l-3 border-slate-200 rounded-tl-[50px]" /> */}
        
//         <div className="absolute -bottom-10 -right-10 w-28 h-20 bg-[#07518D12] rounded-full" />

//         {/* 🔥 TOGGLE BUTTON (inside cut-out) */}
//         <div className="absolute bottom-1 right-1.5">
//           <label className="relative inline-flex cursor-pointer items-center">
//             <input
//               type="checkbox"
//               checked={event.enabled}
//               onChange={onToggle}
//               className="sr-only peer"
//             />
//             <div
//               className={`w-10 h-5 rounded-full transition-all duration-200 relative
//               ${event.enabled ? "bg-emerald-500" : "bg-slate-300"}
//               after:content-[''] after:absolute after:top-0.5 after:left-0.5
//               after:bg-white after:rounded-full after:h-4 after:w-4
//               after:transition-all
//               ${event.enabled ? "after:translate-x-5" : ""}`}
//             />
//           </label>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default EventCard;













// import React from "react";

// const EventCard = ({ event, onToggle }) => {
//   const isOn = event.command === "ON";

//   // Radial gradient circle at bottom-right, blending into white.
//   // Since it's a single CSS background there is no clip edge —
//   // the curve is mathematically smooth with no extra elements needed.
//   const blobGradient = `radial-gradient(
//     circle 72px at calc(100% + 28px) calc(100% + 28px),
//     rgba(7, 81, 141, 0.08) 0%,
//     rgba(7, 81, 141, 0.08) 70%,
//     white 100%
//   )`;

//   return (
//     <div className="min-w-[260px] max-w-[280px] flex-shrink-0 rounded-2xl bg-[#e8edf2] p-[1px]">

//       <div
//         className="relative rounded-2xl hover:-translate-y-0.5 transition-all duration-200"
//         style={{ background: blobGradient }}
//       >

//         {/* Top accent bar */}
//         <div
//           className={`h-1 w-full rounded-t-2xl ${
//             isOn ? "bg-emerald-400" : "bg-red-400"
//           }`}
//         />

//         <div className="p-5 pb-8">

//           {/* Time */}
//           <div className="flex items-baseline gap-2 mb-1">
//             <span className="text-2xl font-bold text-slate-800 tabular-nums">
//               {event.start}
//             </span>
//             <span className="text-slate-300 text-sm">to</span>
//             <span className="text-2xl font-bold text-slate-800 tabular-nums">
//               {event.end}
//             </span>
//           </div>

//           {/* Days */}
//           <div className="flex flex-wrap gap-1.5 mt-4">
//             {event.days.length > 0 ? (
//               event.days.map((day) => (
//                 <span
//                   key={day}
//                   className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-500 rounded-md"
//                 >
//                   {day}
//                 </span>
//               ))
//             ) : (
//               <span className="text-xs text-slate-300 italic">
//                 No days selected
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Toggle — sits inside the gradient blob area */}
//         <div className="absolute bottom-2 right-2">
//           <label className="relative inline-flex cursor-pointer items-center">
//             <input
//               type="checkbox"
//               checked={event.enabled}
//               onChange={onToggle}
//               className="sr-only peer"
//             />
//             <div
//               className={`w-10 h-5 rounded-full transition-all duration-200 relative
//                 ${event.enabled ? "bg-emerald-500" : "bg-slate-300"}
//                 after:content-[''] after:absolute after:top-0.5 after:left-0.5
//                 after:bg-white after:rounded-full after:h-4 after:w-4
//                 after:transition-all after:duration-200
//                 ${event.enabled ? "after:translate-x-5" : "after:translate-x-0"}`}
//             />
//           </label>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default EventCard;
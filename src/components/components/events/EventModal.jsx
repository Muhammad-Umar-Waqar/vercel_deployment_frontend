// import { useState } from "react";

// const daysList = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// const EventModal = ({ open, onClose, onSave }) => {
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [command, setCommand] = useState("ON");
//   const [days, setDays] = useState([]);

//   if (!open) return null;

//   const toggleDay = (day) => {
//     setDays((prev) =>
//       prev.includes(day)
//         ? prev.filter((d) => d !== day)
//         : [...prev, day]
//     );
//   };

//   const handleSave = () => {
//     onSave({
//       id: crypto.randomUUID(),
//       start,
//       end,
//       command,
//       days,
//       enabled: true,
//     });

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//       <div className="bg-white rounded-xl p-6 w-[420px] shadow-lg">

//         <h2 className="text-lg font-semibold mb-4">
//           Create Event
//         </h2>

//         {/* TIME */}
//         <div className="flex gap-3">
//           <input type="time" onChange={(e)=>setStart(e.target.value)} />
//           <input type="time" onChange={(e)=>setEnd(e.target.value)} />
//         </div>

//         {/* DAYS */}
//         <div className="flex flex-wrap gap-2 mt-4">
//           {daysList.map((d) => (
//             <button
//               key={d}
//               onClick={()=>toggleDay(d)}
//               className={`px-3 py-1 rounded-full border
//               ${days.includes(d) ? "bg-blue-500 text-white" : ""}`}
//             >
//               {d}
//             </button>
//           ))}
//         </div>

//         {/* COMMAND */}
//         <div className="mt-4 flex gap-4">
//           <button
//             onClick={()=>setCommand("ON")}
//             className={command==="ON" ? "font-bold" : ""}
//           >
//             ON
//           </button>

//           <button
//             onClick={()=>setCommand("OFF")}
//             className={command==="OFF" ? "font-bold" : ""}
//           >
//             OFF
//           </button>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button onClick={onClose}>Cancel</button>
//           <button
//             onClick={handleSave}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Save
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default EventModal;














// import { useState } from "react";

// const daysList = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// const EventModal = ({ open, onClose, onSave }) => {
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [command, setCommand] = useState("ON");
//   const [days, setDays] = useState([]);

//   if (!open) return null;

//   const toggleDay = (day) => {
//     setDays((prev) =>
//       prev.includes(day)
//         ? prev.filter((d) => d !== day)
//         : [...prev, day]
//     );
//   };

//   const handleSave = () => {
//     onSave({
//       id: crypto.randomUUID(),
//       start,
//       end,
//       command,
//       days,
//       enabled: true,
//     });

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//       <div className="bg-white rounded-xl p-6 w-[420px] shadow-lg">

//         <h2 className="text-lg font-semibold mb-4">
//           Create Event
//         </h2>

//         {/* TIME */}
//         <div className="flex gap-3">
//           <input type="time" onChange={(e)=>setStart(e.target.value)} />
//           <input type="time" onChange={(e)=>setEnd(e.target.value)} />
//         </div>

//         {/* DAYS */}
//         <div className="flex flex-wrap gap-2 mt-4">
//           {daysList.map((d) => (
//             <button
//               key={d}
//               onClick={()=>toggleDay(d)}
//               className={`px-3 py-1 rounded-full border
//               ${days.includes(d) ? "bg-blue-500 text-white" : ""}`}
//             >
//               {d}
//             </button>
//           ))}
//         </div>

//         {/* COMMAND */}
//         <div className="mt-4 flex gap-4">
//           <button
//             onClick={()=>setCommand("ON")}
//             className={command==="ON" ? "font-bold" : ""}
//           >
//             ON
//           </button>

//           <button
//             onClick={()=>setCommand("OFF")}
//             className={command==="OFF" ? "font-bold" : ""}
//           >
//             OFF
//           </button>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button onClick={onClose}>Cancel</button>
//           <button
//             onClick={handleSave}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Save
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default EventModal;






import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { X } from "lucide-react";
import dayjs from "dayjs";

const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EventModal = ({ open, onClose, onSave }) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [command, setCommand] = useState("ON");
  const [days, setDays] = useState([]);

  if (!open) return null;

  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // const handleSave = () => {
  //   onSave({
  //     id: crypto.randomUUID(),
  //     start: start ? start.format("HH:mm") : "",
  //     end: end ? end.format("HH:mm") : "",
  //     command,
  //     days,
  //     enabled: true,
  //   });
  //   onClose();
  // };


  const handleSave = () => {
  if (!start || !end) return;

  // duration in minutes
  let duration = end.diff(start, "minute");

  // handle overnight events (e.g. 23:00 → 02:00)
  if (duration < 0) {
    duration += 24 * 60;
  }

  onSave({
    id: crypto.randomUUID(),
    start: start.format("HH:mm"),
    end: end.format("HH:mm"),
    duration, // ⭐ IMPORTANT
    command,
    days,
    enabled: true,
  });

  onClose();
};

  const timePickerSx = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#F8FAFC",
      fontSize: "0.9rem",
      "& fieldset": { borderColor: "#E2E8F0" },
      "&:hover fieldset": { borderColor: "#94A3B8" },
      "&.Mui-focused fieldset": { borderColor: "#3B82F6", borderWidth: "1.5px" },
    },
    "& .MuiInputLabel-root": { fontSize: "0.85rem", color: "#64748B" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#3B82F6" },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "rgba(15, 23, 42, 0.45)", backdropFilter: "blur(3px)" }}
      >
        {/* Card */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full"
          style={{ maxWidth: "440px", margin: "16px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-800 tracking-tight">
                New Schedule Event
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Set a time range and repeat days
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-5">

            {/* Time Row */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
                Time Range
              </label>
              <div className="flex items-center gap-3">
                <TimePicker
                  label="Start"
                  value={start}
                  onChange={setStart}
                  ampm={false}
                  sx={timePickerSx}
                />
                <div className="text-slate-300 font-light text-lg flex-shrink-0">→</div>
                <TimePicker
                  label="End"
                  value={end}
                  onChange={setEnd}
                  ampm={false}
                  sx={timePickerSx}
                />
              </div>
            </div>

            {/* Days */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
                Repeat Days
              </label>
              <div className="flex flex-wrap gap-2">
                {daysList.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleDay(d)}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                      days.includes(d)
                        ? "bg-blue-500 border-blue-500 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Command */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
                Command
              </label>
              <div
                className="flex rounded-xl border border-slate-200 overflow-hidden"
                style={{ width: "fit-content" }}
              >
                {["ON", "OFF"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => setCommand(cmd)}
                    className={`px-6 py-2 text-sm font-semibold transition-all duration-150 ${
                      command === cmd
                        ? cmd === "ON"
                          ? "bg-emerald-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-white text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 px-6 pb-6 pt-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-500 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="cursor-pointer  px-5 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-sm"
            >
              Save Event
            </button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default EventModal;
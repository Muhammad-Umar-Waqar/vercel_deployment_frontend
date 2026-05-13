// import React, { useMemo, useState, useEffect } from "react";
// import { CalendarDays, Sunrise, Sun, Sunset, TimerIcon } from "lucide-react";
// import "../../styles/pages/Dashboard/dashboard-styles.css";
// import TemperatureRangeMeter from "./TemperatureRangeMeter";
// import Swal from "sweetalert2";
// import { useScheduler } from "../../contexts/SchedulerContext";

// // ── Helpers (module-level, no shadowing) ────────────────────────────────────
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

// const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const toMinutes = (t = "") => {
//   const [h, m] = t.split(":").map(Number);
//   return h * 60 + (m || 0);
// };

// const dayMatches = (event, day) => {
//   const days = event.days || event.repeatDays || [];
//   //FaRaZ 
//   // return days.length === 0 || days.includes(day); 
//   const normalizedDays = days.map(d => d.toLowerCase());
//   return days.length === 0 || normalizedDays.includes(day.toLowerCase());
// };

// const getCurrentRunningEvent = (events = []) => {
//   const now = new Date();
//   const nowM = now.getHours() * 60 + now.getMinutes();
//   const today = DAY_NAMES[now.getDay()];


//   // 🔍 ADD THESE:
//   console.log("📅 events received by card:", events);
//   console.log("🕐 current time (minutes):", nowM, "| today:", today);


//   return (
//     events.find((e) => {
//       //FaRaZ
//       // if (!e.enabled || !e.start || !e.end) return false;
//       // if (!dayMatches(e, today)) return false;
//       // const s = toMinutes(e.start);
//       // const en = toMinutes(e.end);
//       if (e.status !== "ACTIVE" || !e.startTime || !e.endTime) return false;
//       if (!dayMatches(e, today)) return false;
//       const s = toMinutes(e.startTime);
//       const en = toMinutes(e.endTime);
//       // handles overnight spans e.g. 23:00 → 01:00
//       return en > s ? nowM >= s && nowM < en : nowM >= s || nowM < en;
//     }) ?? null
//   );
// };

// const getNextEvent = (events = []) => {
//   //FaRaZ
//   // const enabledEvents = events.filter((e) => e.enabled && e.start);
//   const enabledEvents = events.filter((e) => e.status === "ACTIVE" && e.startTime);
//   if (!enabledEvents.length) return null;

//   const now = new Date();
//   const nowM = now.getHours() * 60 + now.getMinutes();
//   const today = DAY_NAMES[now.getDay()];

//   // First: next event later today that matches repeat days
//   const futureToday = enabledEvents
//     .filter((e) => dayMatches(e, today) && toMinutes(e.startTime) > nowM)
//     .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
//   //FaRaZ
//   // .filter((e) => dayMatches(e, today) && toMinutes(e.start) > nowM)
//   // .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

//   if (futureToday.length) return futureToday[0];

//   // Fallback: earliest event in next cycle
//   return [...enabledEvents].sort((a, b) => toMinutes(a.start) - toMinutes(b.start))[0] ?? null;
// };

// // ── Toggle UI ────────────────────────────────────────────────────────────────
// // const PowerToggle = ({ displayState, onClick }) => {
// //   const bgClass =
// //     displayState === "on"  ? "bg-emerald-500" :
// //     displayState === "off" ? "bg-rose-500"    :
// //                              "bg-gray-400";

// //   const knobClass =
// //     displayState === "on"  ? "translate-x-7"   :
// //     displayState === "off" ? "translate-x-0"   :
// //                              "translate-x-3.5";

// //   const label =
// //     displayState === "on"  ? "ON"  :
// //     displayState === "off" ? "OFF" :
// //                              "···";

// //   const labelPos =
// //     displayState === "on"  ? "left-2" :
// //     displayState === "off" ? "right-1.5" :
// //                              "left-1/2 -translate-x-1/2";

// //   return (
// //     <button
// //       type="button"
// //       onClick={onClick}
// //       title={
// //         displayState === "gray" ? "Event running — click to disable"
// //         : displayState === "on" ? "Turn Off"
// //         : "Turn On"
// //       }
// //       className={`relative w-12 h-5 rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none ${bgClass}`}
// //     >
// //       <span
// //         className={`absolute top-1/2 -translate-y-1/2 text-[9px] font-bold tracking-wide pointer-events-none text-white ${labelPos}`}
// //       >
// //         {label}
// //       </span>
// //       <div
// //         className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300 ${knobClass}`}
// //       />
// //     </button>
// //   );
// // };


// const PowerToggle = ({ displayState, onClick }) => {

//   const isGray = displayState.includes("gray");

//   // ── background color ──
//   const bgClass =
//     displayState.startsWith("on") ? (isGray ? "bg-gray-400" : "bg-emerald-500") :
//       displayState.startsWith("off") ? (isGray ? "bg-gray-400" : "bg-rose-500") :
//         "bg-gray-400";

//   // ── knob position ──
//   const knobClass =
//     displayState.startsWith("on")
//       ? "translate-x-7"
//       : "translate-x-0";

//   // ── label ──
//   const label =
//     displayState.startsWith("on") ? "ON" : "OFF";

//   const labelPos =
//     displayState.startsWith("on") ? "left-2" : "right-1.5";

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       title={isGray ? "Event running — click to manage event" : ""}
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


// // ── Main Card ────────────────────────────────────────────────────────────────
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
//   command = "ON",
//   enabled = true,
//   pollHitTime,
//   events = [],
//   onEventsChange,
//   toggleState,       // controlled: "on" | "off" | null
//   onToggleChange,    // callback to parent
//   onRefreshScheduler,
// }) {

//   const { triggerDevice, skipEvent, fetchToggleStatus } = useScheduler();

//   useEffect(() => {
//     if (!deviceId) return;

//     const timeout = setTimeout(() => {
//       fetchToggleStatus(deviceId);
//     }, 800); // ⬅️ small delay to let backend settle

//     return () => clearTimeout(timeout);
//   }, [deviceId]);

//   // ── 30-second ticker so running-event check stays fresh ──
//   const [tick, setTick] = useState(0);
//   useEffect(() => {
//     const id = setInterval(() => setTick((t) => t + 1), 30_000);
//     return () => clearInterval(id);
//   }, []);



//   // ── Resolve toggle: prefer parent-controlled state, fall back to device props ──
//   // const resolvedToggle =
//   //   toggleState !== null && toggleState !== undefined
//   //     ? toggleState
//   //     : enabled && String(command).toUpperCase() === "ON"
//   //       ? "on"
//   //       : "off";

//   // const resolvedToggle = toggleState !== null && toggleState !== undefined
//   // ? toggleState
//   // : enabled && String(command).toUpperCase() === "ON" ? "on" : "off";

//   // const resolvedToggle =
//   //   toggleState !== null && toggleState !== undefined
//   //     ? toggleState
//   //     : "off";

//   // const resolvedToggle =
//   //   toggleState ?? (enabled && String(command).toUpperCase() === "ON" ? "on" : "off");

//   // ── Detect running event — tick IS in deps so it recomputes every 30s ──
//   const runningEvent = useMemo(
//     () => getCurrentRunningEvent(events),
//     [events, pollHitTime, tick] // ← tick here is what makes the 30s refresh actually work
//   );

//   // ── Detect next upcoming event ──
//   const nextEvent = useMemo(
//     () => getNextEvent(events),
//     [events, pollHitTime, tick]
//   );

//   // ── Display state ──
//   // const displayState = runningEvent ? "gray" : resolvedToggle;
//   // const displayState = runningEvent

//   //FaRaZ
//   // ? (String(runningEvent.command).toUpperCase() === "ON" ? "on-gray" : "off-gray")
//   // ? (String(runningEvent.command || "ON").toUpperCase() === "ON" ? "on-gray" : "off-gray")
//   // : resolvedToggle;

//   const resolvedState =
//     toggleState ??
//     (String(command).toUpperCase() === "ON" ? "on" : "off");

//   const displayState = useMemo(() => {
//     if (runningEvent) return "gray";
//     return toggleState ?? "off";        // always trust context toggleMap
//   }, [runningEvent, toggleState]);

//   // ── Toggle click handler ──
//   // const handleToggleClick = async (e) => {
//   //   e.stopPropagation();
//   //   // ${runningEvent.start} → ${runningEvent.end}
//   //   if (runningEvent) {
//   //     const result = await Swal.fire({
//   //       title: "Event Currently Running",
//   //       html: `
//   //         The <b>${runningEvent.command}</b> event is currently active.<br/>
//   //         <span style="color:#64748b;font-size:13px">${runningEvent.startTime} → ${runningEvent.endTime}</span>
//   //         <br/><br/>
//   //         Do you want to <b>disable</b> this event?
//   //       `,
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

//   //     //FaRaZ
//   //     // if (result.isConfirmed) {
//   //     //   // Disable the event → EventCard in right panel reflects immediately
//   //     //   const updated = events.map((ev) =>
//   //     //     ev.id === runningEvent.id ? { ...ev, enabled: false } : ev
//   //     //   );
//   //     //   onEventsChange?.(updated);
//   //     //   // Move toggle to OFF
//   //     //   onToggleChange?.("off");
//   //     // }
//   //     if (result.isConfirmed) {
//   //       try {
//   //         const data = await skipEvent(deviceId);

//   //         console.log("⛔ Event skipped:", data);

//   //         onRefreshScheduler?.();
//   //         onToggleChange?.("off");
//   //         onEventsChange?.([]);

//   //         Swal.fire({
//   //           icon: "success",
//   //           title: "Event Skipped",
//   //           text: data.message,
//   //         });

//   //       } catch (err) {
//   //         console.error("❌ Skip error:", err);

//   //         Swal.fire({
//   //           icon: "error",
//   //           title: "Failed",
//   //           text: err.message || "Could not skip event",
//   //         });
//   //       }
//   //     }
//   //     return; // always return — never fall through to manual toggle
//   //   }

//   //   // ── No running event: plain manual toggle ──
//   //   //FaRaZ
//   //   // onToggleChange?.(resolvedToggle === "on" ? "off" : "on");
//   //   // ── No running event: call trigger API ──

//   //   // try {
//   //   //   const nextState = resolvedToggle === "on" ? "off" : "on";
//   //   //   const action = nextState === "on" ? "ON" : "OFF";

//   //   //   const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/event/trigger`, {
//   //   //     method: "POST",
//   //   //     headers: {
//   //   //       "Content-Type": "application/json",
//   //   //     },
//   //   //     credentials: "include",
//   //   //     body: JSON.stringify({
//   //   //       deviceId,
//   //   //       action,
//   //   //     }),
//   //   //   });

//   //   //   const data = await res.json();

//   //   //   if (!res.ok) {
//   //   //     throw new Error(data.message || "Trigger failed");
//   //   //   }

//   //   //   console.log("✅ Trigger success:", data);

//   //   //   // ✅ update UI immediately
//   //   //   onToggleChange?.(nextState);

//   //   //   // optional refresh
//   //   //   onRefreshScheduler?.();

//   //   // } catch (err) {
//   //   //   console.error("❌ Trigger error:", err);

//   //   //   Swal.fire({
//   //   //     icon: "error",
//   //   //     title: "Failed",
//   //   //     text: err.message || "Failed to send command",
//   //   //   });
//   //   // }
//   //   // const triggerDevice = async (deviceId, action) => {
//   //   //   const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/event/trigger`, {
//   //   //     method: "POST",
//   //   //     headers: {
//   //   //       "Content-Type": "application/json",
//   //   //     },
//   //   //     credentials: "include",
//   //   //     body: JSON.stringify({ deviceId, action }),
//   //   //   });

//   //   //   const data = await res.json();

//   //   //   if (!res.ok) {
//   //   //     throw new Error(data.message || "Trigger failed");
//   //   //   }

//   //   //   return data;
//   //   // };

//   //   try {
//   //     const nextState = resolvedToggle === "on" ? "off" : "on";
//   //     const action = nextState === "on" ? "ON" : "OFF";

//   //     const data = await triggerDevice(deviceId, action);

//   //     console.log("✅ Trigger success:", data);

//   //     // update UI once
//   //     // onToggleChange?.(nextState);
//   //     // onRefreshScheduler?.();

//   //     // REMOVE onToggleChange
//   //     // JUST CALL triggerDevice
//   //     // await triggerDevice(deviceId, action);

//   //     // optional refresh
//   //     await triggerDevice(deviceId, action);

//   //     // wait a bit before refresh
//   //     setTimeout(() => {
//   //       onRefreshScheduler?.();
//   //     }, 800);

//   //   } catch (err) {
//   //     console.error("❌ Trigger error:", err);

//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Failed",
//   //       text: err.message || "Failed to send command",
//   //     });
//   //   }

//   // };

//   // const handleToggleClick = async (e) => {
//   //   e.stopPropagation();

//   //   // CASE 1: running event → show modal ONLY
//   //   if (runningEvent) {
//   //     const result = await Swal.fire({
//   //       title: "Event Currently Running",
//   //       html: `
//   //       The <b>${runningEvent.command}</b> event is currently active.<br/>
//   //       <span style="color:#64748b;font-size:13px">
//   //         ${runningEvent.startTime} → ${runningEvent.endTime}
//   //       </span>
//   //       <br/><br/>
//   //       Do you want to disable this event?
//   //     `,
//   //       icon: "warning",
//   //       showCancelButton: true,
//   //       confirmButtonText: "Yes, disable it",
//   //       cancelButtonText: "Keep running",
//   //     });

//   //     if (result.isConfirmed) {
//   //       await skipEvent(deviceId);
//   //       onRefreshScheduler?.(); // ONLY refresh backend state
//   //     }

//   //     return;
//   //   }

//   //   // CASE 2: NO EVENT → normal toggle (backend decides final state)
//   //   try {
//   //     const action = command === "on" ? "OFF" : "ON";

//   //     await triggerDevice(deviceId, action);
//   //     onToggleChange?.(action);
//   //     onRefreshScheduler?.();
//   //   } catch (err) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Failed",
//   //       text: err.message,
//   //     });
//   //   }
//   // };

//   // Inside SchedulerDeviceCard component — replace handleToggleClick only

//   const handleToggleClick = async (e) => {
//     e.stopPropagation();

//     const isRunning = !!runningEvent;

//     if (isRunning) {
//       // CASE 1: Running Event → Show modal to skip
//       const result = await Swal.fire({
//         title: "Event Currently Running",
//         html: `
//         The <b>${runningEvent.command}</b> event is currently active.<br/>
//         <span style="color:#64748b;font-size:13px">
//           ${runningEvent.startTime} → ${runningEvent.endTime}
//         </span>
//         <br/><br/>
//         Do you want to disable this event?
//       `,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, disable it",
//         cancelButtonText: "Keep running",
//         confirmButtonColor: "#EF4444",
//       });

//       if (result.isConfirmed) {
//         try {
//           await skipEvent(deviceId);           // already integrated
//           await onRefreshScheduler?.();        // refresh events
//           // After skip, fetch real toggle state from backend
//           await fetchToggleStatus(deviceId);
//         } catch (err) {
//           Swal.fire({
//             icon: "error",
//             title: "Failed",
//             text: err.message || "Could not skip event",
//           });
//         }
//       }
//       return;
//     }

//     // CASE 2: No running event → Manual toggle with optimistic gray + backend sync
//     const currentState = toggleState ?? "off";           // from context
//     const nextAction = currentState === "on" ? "OFF" : "ON";

//     // Immediate feedback: show gray while processing
//     // We temporarily force gray via local state if needed, but here we rely on context + small delay
//     try {
//       await triggerDevice(deviceId, nextAction);   // this already does optimistic + retry inside context

//       // After API success, let context fetch the real final state
//       setTimeout(() => {
//         onRefreshScheduler?.();
//       }, 600);

//     } catch (err) {
//       console.error("❌ Trigger error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Failed",
//         text: err.message || "Failed to send command",
//       });
//       // On error, context will still have old state (no change)
//     }
//   };

//   // ── Derived display values ──
//   const toNumberOrNull = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : null;
//   };

//   const temp = toNumberOrNull(espTemprature);
//   const hum = toNumberOrNull(espHumidity);

//   const hour = useMemo(() => new Date(pollHitTime).getHours(), [pollHitTime]);
//   const timeOfDay =
//     hour >= 5 && hour <= 8 ? "sunrise" :
//       hour >= 9 && hour <= 16 ? "day" :
//         hour >= 17 && hour <= 19 ? "sunset" :
//           "night";

//   const statusColorClass = (hasAlert) => hasAlert ? "bg-rose-300" : "bg-emerald-200";

//   //FaRaZ
//   // const displayStart = nextEvent?.start ?? "--";
//   // const displayDuration = nextEvent ? formatDuration(nextEvent.duration) : "--";
//   // const displayStart = nextEvent?.startTime ?? "--";
//   const formatTime = (time) => {
//     if (!time) return "--:--";

//     const [hours, minutes] = time.split(":").map(Number);

//     // ✅ Create UTC date
//     const date = new Date();
//     date.setUTCHours(hours);
//     date.setUTCMinutes(minutes);
//     date.setUTCSeconds(0);

//     // ✅ Convert to LOCAL automatically
//     let h = date.getHours() % 12;
//     if (h === 0) h = 12;

//     const m = String(date.getMinutes()).padStart(2, "0");

//     return `${String(h).padStart(2, "0")}:${m}`;
//   };

//   const displayStart = nextEvent?.startTime
//     ? formatTime(nextEvent.startTime)
//     : "--";

//   const eventType = nextEvent?.type ?? "--";

//   // compute duration from startTime → endTime
//   const displayDuration = nextEvent
//     ? formatDuration(
//       toMinutes(nextEvent.endTime) - toMinutes(nextEvent.startTime)
//     )
//     : "--";
//   const displayCommand = nextEvent?.command ?? "OFF";
//   const isCommandOn = displayCommand === "ON";



//   return (
//     <div
//       onClick={onCardSelect}
//       className={`freezer-card-container rounded-4xl bg-white ${isSelected ? "shadow-lg ring-1 ring-[#0D5CA4]/15" : ""
//         } min-h-[175px] cursor-pointer transition hover:shadow-md px-4 py-2 flex flex-col justify-around`}
//     >
//       {/* ── Top section ── */}
//       <div className="flex items-center justify-between">

//         {/* LEFT */}
//         <div className="flex flex-col items-start">
//           <div>
//             <div className="flex items-center">
//               <span className={`inline-block h-2 w-2 rounded-full mr-2 ${isOnline ? "bg-green-300" : "bg-gray-300"}`} />
//               <div className="text-xs text-gray-500">Device ID</div>
//             </div>
//             <div className="text-lg font-bold text-gray-900">{deviceId}</div>
//           </div>

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
//           <PowerToggle displayState={displayState} onClick={handleToggleClick} />

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

//       {/* ── Bottom bar ── */}
//       <div className="flex justify-between items-center">
//         <div className="flex items-center justify-center gap-2">
//           <CalendarDays className="w-6 h-6 text-gray-600" />
//           <div className="flex flex-col">
//             <p className="text-xs text-gray-500 font-semibold">Starting</p>
//             <div className="text-xs font-bold text-[#178D8F]">{displayStart}</div>
//           </div>
//         </div>

//         <div>
//           <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
//             <TimerIcon className="w-3 h-3" />
//             Duration
//           </div>
//           <div className="text-xs font-bold text-[#178D8F]">{displayDuration}</div>
//         </div>

//         <div>
//           {/* FaRaZ */}
//           {/* <div className="text-xs text-gray-500 font-semibold">Status</div>
//           <div className={`text-xs font-bold ${isCommandOn ? "text-[#178D8F]" : "text-[#96181B]"}`}>
//             {displayCommand}
//           </div> */}
//           <div>
//             <div className="text-xs text-gray-500 font-semibold">Event Type</div>

//             <div
//               className={`text-xs font-bold ${eventType === "CURRENT"
//                 ? "text-emerald-600"
//                 : eventType === "NEXT"
//                   ? "text-[#178D8F]"
//                   : "text-gray-500"
//                 }`}
//             >
//               {eventType}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default SchedulerDeviceCard;







import React, { useMemo, useState, useEffect, useRef } from "react";
import { CalendarDays, Sunrise, Sun, Sunset, TimerIcon } from "lucide-react";
import "../../styles/pages/Dashboard/dashboard-styles.css";
import TemperatureRangeMeter from "./TemperatureRangeMeter";
import Swal from "sweetalert2";
import { useScheduler } from "../../contexts/SchedulerContext";

// ── Helpers ─────────────────────────────────────────────────────
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

const toMinutes = (t = "") => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
};

// ✅ NEW: Calculate milliseconds until next event transition
const calculateNextTransitionTime = (events = [], isOnline = true) => {
  if (!events || events.length === 0) return null;
  if (!isOnline) return null; // Don't schedule if device is offline

  const now = new Date();
  const nowMs = now.getTime();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const todayDay = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][now.getDay()];

  let nearestTransitionMs = null;

  events.forEach(event => {
    if (event.status !== "ACTIVE") return;

    const eventDays = (event.days || []).map(d => d.toLowerCase());

    // Check if event applies today
    if (eventDays.length > 0 && !eventDays.includes(todayDay)) {
      // TODO: Could calculate next occurrence on a future day
      return;
    }

    const startMinutes = toMinutes(event.startTime);
    const endMinutes = toMinutes(event.endTime);

    // Handle overnight events (e.g., 13:00 → 01:00 next day)
    const isOvernight = endMinutes < startMinutes;

    // Calculate transition times for today
    const startMs = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
      Math.floor(startMinutes / 60), startMinutes % 60, 0).getTime();

    let endMs = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
      Math.floor(endMinutes / 60), endMinutes % 60, 0).getTime();

    if (isOvernight && nowMinutes < endMinutes) {
      // We're in the early morning part of an overnight event
      // End time is today
    } else if (isOvernight) {
      // End time is tomorrow
      endMs += 24 * 60 * 60 * 1000;
    }

    // Check if start time is in the future
    if (startMs > nowMs) {
      if (!nearestTransitionMs || startMs < nearestTransitionMs) {
        nearestTransitionMs = startMs;
      }
    }

    // Check if end time is in the future
    if (endMs > nowMs) {
      if (!nearestTransitionMs || endMs < nearestTransitionMs) {
        nearestTransitionMs = endMs;
      }
    }
  });

  return nearestTransitionMs;
};

// Convert UTC time string (HH:MM) to local time string in 12-hour format with AM/PM
const convertUTCToLocal = (utcTimeString) => {
  if (!utcTimeString) return utcTimeString;

  try {
    const [hours, minutes] = utcTimeString.split(':').map(Number);

    // Create a UTC date with today's date + the UTC time
    const utcDate = new Date();
    utcDate.setUTCHours(hours, minutes, 0, 0);

    // Get local hours and minutes
    let localHours = utcDate.getHours();
    const localMinutes = utcDate.getMinutes();

    // Convert to 12-hour format
    const period = localHours >= 12 ? 'PM' : 'AM';
    localHours = localHours % 12 || 12; // Convert 0 to 12, and 13-23 to 1-11

    // Format as H:MM AM/PM (no leading zero for hours in 12-hour format)
    return `${localHours}:${String(localMinutes).padStart(2, '0')} ${period}`;
  } catch (err) {
    console.error('Error converting UTC to local:', err);
    return utcTimeString; // Return original if conversion fails
  }
};

// Trust backend 'type' field strictly
const getCurrentRunningEvent = (events = []) => {
  if (!events || events.length === 0) return null;

  // Find the event marked as CURRENT by backend
  const currentEvent = events.find(e => e.type === "CURRENT");

  console.log(`🔍 [getCurrentRunningEvent] Searching for CURRENT event in ${events.length} events`);
  console.log(`🔍 [getCurrentRunningEvent] Found:`, currentEvent);

  return currentEvent || null;
};

const getNextEvent = (events = []) => {
  if (!events || events.length === 0) return null;

  // Find the event marked as NEXT by backend
  const nextEvent = events.find(e => e.type === "NEXT");

  console.log(`🔍 [getNextEvent] Searching for NEXT event in ${events.length} events`);
  console.log(`🔍 [getNextEvent] Found:`, nextEvent);

  return nextEvent || null;
};

// Power Toggle
// const PowerToggle = ({ displayState, onClick }) => {
//   const isGray = displayState === "gray";

//   let bgClass = "bg-gray-400";
//   let label = "...";
//   let knobClass = "translate-x-3.5";

//   if (!isGray) {
//     if (displayState === "on") {
//       bgClass = "bg-emerald-500";
//       label = "ON";
//       knobClass = "translate-x-7";
//     } else {
//       bgClass = "bg-rose-500";
//       label = "OFF";
//       knobClass = "translate-x-0";
//     }
//   }

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       title={isGray ? "Event is currently running" : ""}
//       className={`relative w-12 h-5 rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none ${bgClass}`}
//     >
//       <span className={`absolute top-1/2 -translate-y-1/2 text-[9px] font-bold tracking-wide pointer-events-none text-white ${displayState === "on" ? "left-2" : "right-1.5"}`}>
//         {label}
//       </span>
//       <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300 ${knobClass}`} />
//     </button>
//   );
// };

// const PowerToggle = ({ displayState = "off", disabled = false, onClick }) => {

//   // ---- derive UI strictly from ON/OFF ----
//   const isOn = displayState === "on";

//   const bgClass = disabled
//     ? "bg-gray-400"
//     : isOn
//       ? "bg-emerald-500"
//       : "bg-rose-500";

//   const label = isOn ? "ON" : "OFF";

//   const knobClass = isOn
//     ? "translate-x-7"
//     : "translate-x-0";

//   return (
//     <button
//       type="button"
//       disabled={disabled}
//       onClick={disabled ? undefined : onClick}
//       title={disabled ? "Event is currently running" : ""}
//       className={`
//         relative w-12 h-5 rounded-full
//         transition-all duration-300
//         flex-shrink-0 focus:outline-none
//         ${bgClass}
//         ${disabled ? "cursor-not-allowed opacity-80" : ""}
//       `}
//     >
//       {/* LABEL */}
//       <span
//         className={`
//           absolute top-1/2 -translate-y-1/2
//           text-[9px] font-bold tracking-wide
//           text-white pointer-events-none
//           ${isOn ? "left-2" : "right-1.5"}
//         `}
//       >
//         {label}
//       </span>

//       {/* KNOB */}
//       <div
//         className={`
//           absolute top-1 left-1
//           w-3 h-3 bg-white rounded-full shadow-sm
//           transition-transform duration-300
//           ${knobClass}
//         `}
//       />
//     </button>
//   );
// };


const PowerToggle = ({ displayState = "off", isLocked = false, loading = false, onClick }) => {

  const isOn = displayState === "on";

  // FORCE gray styling when locked (even if ON/OFF)
  const bgClass = isLocked
    ? "bg-gray-400"
    : isOn
      ? "bg-emerald-500"
      : "bg-rose-500";

  const label = isOn ? "ON" : "OFF";

  const knobClass = isOn ? "translate-x-7" : "translate-x-0";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}  // Disable during loading
      className={`
        relative w-12 h-5 rounded-full
        transition-all duration-300
        flex-shrink-0 focus:outline-none

        ${bgClass}

        ${loading
          ? "opacity-70 "
          : isLocked
            ? "opacity-50 cursor-pointer ring-1 ring-gray-300"
            : "cursor-pointer hover:scale-[1.02]"
        }
      `}
    >
      {/* LOADING SPINNER */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      {/* LABEL - hide when loading */}
      {!loading && (
        <span
          className={`
            absolute top-1/2 -translate-y-1/2
            text-[9px] font-bold tracking-wide
            text-white pointer-events-none
            ${isOn ? "left-2" : "right-1.5"}
          `}
        >
          {label}
        </span>
      )}

      {/* KNOB - hide when loading */}
      {!loading && (
        <div
          className={`
            absolute top-1 left-1
            w-3 h-3 bg-white rounded-full shadow-sm
            transition-transform duration-300
            ${knobClass}
          `}
        />
      )}
    </button>
  );
};

// ================== MAIN CARD ==================
const SchedulerDeviceCard = React.memo(function SchedulerDeviceCard({
  deviceId,
  espTemprature,
  espHumidity,
  isOnline,
  onCardSelect,
  isSelected,
  temperatureAlert = false,
  humidityAlert = false,
  pollHitTime,
  events = [],
  onRefreshScheduler,
}) {

  const { triggerDevice, skipEvent, fetchToggleStatus, toggleMap, eventsMap } = useScheduler();
  const toggleState = toggleMap?.[deviceId] ?? "off";
  const [loading, setLoading] = useState(false);

  // ✅ Read events from global context instead of props
  const contextEvents = eventsMap?.[deviceId] ?? [];
  const displayEvents = contextEvents.length > 0 ? contextEvents : events;

  console.log(`🔵 [SchedulerDeviceCard ${deviceId}] Context events:`, contextEvents);
  console.log(`🔵 [SchedulerDeviceCard ${deviceId}] Display events:`, displayEvents);
  console.log(`🔵 [SchedulerDeviceCard ${deviceId}] Toggle state:`, toggleState);

  // ✅ Smart Timer: Schedule refresh at exact event transition times
  const timerRef = useRef(null);

  useEffect(() => {
    console.log(`⏰ [SchedulerDeviceCard ${deviceId}] Smart timer effect triggered`);

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      console.log(`🧹 [SchedulerDeviceCard ${deviceId}] Cleared existing timer`);
    }

    // Calculate next transition time
    const nextTransitionMs = calculateNextTransitionTime(displayEvents, isOnline);

    if (nextTransitionMs) {
      const now = Date.now();
      const delayMs = nextTransitionMs - now;

      // Only set timer if transition is within next 24 hours
      if (delayMs > 0 && delayMs < 24 * 60 * 60 * 1000) {
        console.log(`⏰ [SchedulerDeviceCard ${deviceId}] Setting timer for ${Math.round(delayMs / 1000)}s from now`);

        timerRef.current = setTimeout(() => {
          console.log(`🔔 [SchedulerDeviceCard ${deviceId}] Timer fired! Fetching toggle status...`);
          fetchToggleStatus(deviceId);
          onRefreshScheduler?.(); // Also refresh events
          console.log(`✅ [SchedulerDeviceCard ${deviceId}] Timer completed refresh`);
        }, delayMs);
      } else {
        console.log(`⚠️ [SchedulerDeviceCard ${deviceId}] Timer delay out of range: ${delayMs}ms`);
      }
    } else {
      console.log(`⚠️ [SchedulerDeviceCard ${deviceId}] No next transition time calculated`);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        console.log(`🧹 [SchedulerDeviceCard ${deviceId}] Cleanup: cleared timer`);
      }
    };
  }, [displayEvents, deviceId, isOnline, fetchToggleStatus, onRefreshScheduler]);

  const runningEvent = useMemo(() => {
    const result = getCurrentRunningEvent(displayEvents);
    console.log(`🎯 [SchedulerDeviceCard ${deviceId}] Running event:`, result);
    return result;
  }, [displayEvents, deviceId]);

  const nextEvent = useMemo(() => {
    const result = getNextEvent(displayEvents);
    console.log(`⏭️ [SchedulerDeviceCard ${deviceId}] Next event:`, result);
    return result;
  }, [displayEvents, deviceId]);

  // const displayState = runningEvent ? "gray" : toggleState;

  const displayState = toggleState;
  const isDisabled = !!runningEvent || !isOnline;  // Disable if event running OR device offline

  console.log(`[TSD ${deviceId}] Final displayState:`, displayState, "| Is Running:", !!runningEvent, "| Is Online:", isOnline);

  useEffect(() => {
    if (deviceId) fetchToggleStatus(deviceId);
  }, [deviceId, fetchToggleStatus]);

  // const handleToggleClick = async (e) => {
  //   e.stopPropagation();

  //   if (runningEvent) {
  //     const result = await Swal.fire({
  //       title: "Event Currently Running",
  //       html: `The <b>${runningEvent.command || "Scheduled"}</b> event is active.<br/>
  //              <span style="color:#64748b;font-size:13px">${runningEvent.startTime} → ${runningEvent.endTime}</span><br/><br/>
  //              Do you want to disable this event?`,
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, disable it",
  //       cancelButtonText: "Keep running",
  //       confirmButtonColor: "#EF4444",
  //     });

  //     if (result.isConfirmed) {
  //       try {
  //         await skipEvent(deviceId);
  //         await onRefreshScheduler?.();
  //       } catch (err) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Failed",
  //           text: err.message || "Could not skip event",
  //         });
  //       }
  //     }
  //     return;
  //   }

  //   const nextAction = toggleState === "on" ? "OFF" : "ON";
  //   try {
  //     await triggerDevice(deviceId, nextAction);
  //     // setTimeout(onRefreshScheduler, 800);
  //   } catch (err) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Failed",
  //       text: err.message || "Command failed",
  //     });
  //   }
  // };


  const handleToggleClick = async (e) => {
  e.stopPropagation();

  // ✅ Check if event is running FIRST (higher priority)
  if (runningEvent) {
    // Convert UTC times to local 24-hour format
    const localStartTime = convertUTCToLocal(runningEvent.startTime);
    const localEndTime = convertUTCToLocal(runningEvent.endTime);

    const result = await Swal.fire({
      title: "Event Currently Running",
      html: `
        The <b>${runningEvent.command || "Scheduled"}</b> event is active.<br/>
        <span style="color:#64748b;font-size:13px">
          ${localStartTime} → ${localEndTime}
        </span><br/><br/>
        Do you want to disable this event?
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Disable Event",
      cancelButtonText: "Close",
      confirmButtonColor: "#EF4444",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await skipEvent(deviceId);
        await onRefreshScheduler?.();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: err.message || "Could not skip event",
        });
      } finally {
        setLoading(false);
      }
    }

    return;
  }

  // ✅ For TSD: No isOnline check - let API decide via /event/toggle-switch response
  const nextAction = toggleState === "on" ? "OFF" : "ON";

  try {
    setLoading(true);
    await triggerDevice(deviceId, nextAction);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: err.message || "Command failed",
    });
  } finally {
    setLoading(false);
  }
};


  const temp = Number(espTemprature) || 0;
  const hum = Number(espHumidity) || 0;

  const hour = useMemo(() => new Date(pollHitTime).getHours(), [pollHitTime]);
  const timeOfDay = hour >= 5 && hour <= 8 ? "sunrise"
    : hour >= 9 && hour <= 16 ? "day"
      : hour >= 17 && hour <= 19 ? "sunset" : "night";

  const statusColorClass = (hasAlert) => hasAlert ? "bg-rose-300" : "bg-emerald-200";

  const formatTime = (time) => {
    if (!time) return "--:--";

    // Parse UTC time from backend (24-hour format)
    const [h, m] = time.split(":").map(Number);
    const date = new Date();
    date.setUTCHours(h, m, 0);

    // Convert to local time
    const localHours = date.getHours();
    const localMinutes = date.getMinutes();

    // Convert to 12-hour format with AM/PM
    const hour12 = localHours % 12 || 12;
    const ampm = localHours >= 12 ? "PM" : "AM";

    return `${String(hour12).padStart(2, "0")}:${String(localMinutes).padStart(2, "0")} ${ampm}`;
  };

  // Show CURRENT event if running, otherwise show NEXT event
  const displayEvent = runningEvent || nextEvent;

  const displayStart = displayEvent?.startTime ? formatTime(displayEvent.startTime) : "--";

  // ✅ Use duration from API response instead of calculating
  const displayDuration = displayEvent?.duration || "--";

  const eventType = runningEvent ? "CURRENT" : (nextEvent ? "NEXT" : "--");

  return (
    <div
      onClick={onCardSelect}
      className={`freezer-card-container rounded-4xl bg-white ${isSelected ? "shadow-lg ring-1 ring-[#0D5CA4]/15" : ""} min-h-[175px] cursor-pointer transition hover:shadow-md px-4 py-2 flex flex-col justify-around`}
    >
      <div className="flex items-center justify-between">
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
              <div className={`p-2 rounded-full ${timeOfDay === "sunrise" ? "border border-gray-600" : ""}`}><Sunrise size={18} /></div>
              <div className={`p-2 rounded-full ${timeOfDay === "day" ? "border border-gray-600" : ""}`}><Sun size={18} /></div>
              <div className={`p-2 rounded-full ${(timeOfDay === "sunset" || timeOfDay === "night") ? "border border-gray-600" : ""}`}><Sunset size={18} /></div>
            </div>
            <TemperatureRangeMeter value={Math.round(temp)} />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <PowerToggle displayState={displayState} isLocked={isDisabled} loading={loading} onClick={handleToggleClick} />

          <div className="flex flex-col items-end">
            <div className="text-right">
              <div className="text-xs text-gray-500">Humidity</div>
              <div className="text-xl font-bold">{Math.round(hum)}%</div>
              <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                <div className={`h-2 ${statusColorClass(humidityAlert)}`} />
              </div>
            </div>
            <div className="text-right mt-2">
              <div className="text-xs text-gray-500">Temperature</div>
              <div className="text-xl font-bold">{Math.round(temp)}°C</div>
              <div className="h-2 rounded-full overflow-hidden bg-gray-100">
                <div className={`h-2 ${statusColorClass(temperatureAlert)}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

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
            <TimerIcon className="w-3 h-3" /> Duration
          </div>
          <div className="text-xs font-bold text-[#178D8F]">{displayDuration}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 font-semibold">Event Type</div>
          <div className={`text-xs font-bold ${runningEvent ? "text-emerald-600" : "text-gray-500"}`}>
            {eventType}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SchedulerDeviceCard;
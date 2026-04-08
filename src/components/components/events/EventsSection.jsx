
// import EventCard from "./EventCard";
// import EventModal from "./EventModal";
// import { hasCollision } from "./eventUtils";
// import { Plus } from "lucide-react";

// const EventsSection = ({ selectedDevice }) => {
//   const [events, setEvents] = useState([]);
//   const [openModal, setOpenModal] = useState(false);

//   const addEvent = (newEvent) => {
//     const collision = hasCollision(events, newEvent);

//     if (collision) {
//       alert("Event already exists in this time range");
//       return;
//     }

//     setEvents((prev) => [...prev, newEvent]);
//   };

//   const toggleEvent = (id) => {
//     setEvents((prev) =>
//       prev.map((e) =>
//         e.id === id ? { ...e, enabled: !e.enabled } : e
//       )
//     );
//   };

//   if (!selectedDevice) return null;

//   return (
//     <div>
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">EVENTS</h2>

//  <button
//   onClick={() => setOpenModal(true)}
//   className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-200"
// >
//   <Plus size={18} strokeWidth={2.5} />
// </button>
//       </div>

//       {/* EVENTS LIST */}
//       <div className="flex gap-4 overflow-x-auto pb-2">
//         {events.map((event) => (
//           <EventCard
//             key={event.id}
//             event={event}
//             onToggle={() => toggleEvent(event.id)}
//           />
//         ))}
//       </div>

//       <EventModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         onSave={addEvent}
//       />
//     </div>
//   );
// };

// export default EventsSection;




// import React, { useState } from "react";
// import EventCard from "./EventCard";
// import EventModal from "./EventModal";
// import { hasCollision } from "./eventUtils";
// import { Plus, CalendarClock } from "lucide-react";

// const EventsSection = ({ selectedDevice }) => {
//   const [events, setEvents] = useState([]);
//   const [openModal, setOpenModal] = useState(false);

//   const addEvent = (newEvent) => {
//     const collision = hasCollision(events, newEvent);
//     if (collision) {
//       alert("Event already exists in this time range");
//       return;
//     }
//     setEvents((prev) => [...prev, newEvent]);
//   };

//   const toggleEvent = (id) => {
//     setEvents((prev) =>
//       prev.map((e) => (e.id === id ? { ...e, enabled: !e.enabled } : e))
//     );
//   };

//   if (!selectedDevice) return null;

//   return (
//     <div className="mt-2">
//       {/* Section Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <CalendarClock size={16} className="text-slate-400" strokeWidth={2} />
//           <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-widest">
//             Events
//           </h2>
//           {events.length > 0 && (
//             <span className="text-[11px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
//               {events.length}
//             </span>
//           )}
//         </div>

//         <button
//           onClick={() => setOpenModal(true)}
//           className="cursor-pointer  flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-150"
//         >
//           <Plus size={13} strokeWidth={2.5} />
//           Add Event
//         </button>
//       </div>

//       {/* Events List */}
//       {events.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-10 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
//           <CalendarClock size={28} className="text-slate-300 mb-2" strokeWidth={1.5} />
//           <p className="text-sm font-medium text-slate-400">No events yet</p>
//           <p className="text-xs text-slate-300 mt-0.5">
//             Click "Add Event" to create a schedule
//           </p>
//         </div>
//       ) : (
//         <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
//           {events.map((event) => (
//             <EventCard
//               key={event.id}
//               event={event}
//               onToggle={() => toggleEvent(event.id)}
//             />
//           ))}
//         </div>
//       )}

//       <EventModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         onSave={addEvent}
//       />
//     </div>
//   );
// };

// export default EventsSection;












// import { useState } from "react";
// import EventCard from "./EventCard";
// import EventModal from "./EventModal";
// import { hasCollision } from "./eventUtils";
// import { Plus, CalendarClock } from "lucide-react";
// import Swal from "sweetalert2";
// // Add useRef import
// import { useRef } from "react";


// const EventsSection = ({ selectedDevice }) => {
//   const [events, setEvents] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
// // Add ref inside the component
// const scrollContainerRef = useRef(null);


//   const addEvent = (newEvent) => {
//     const collision = hasCollision(events, newEvent);

//     if (collision) {
//       Swal.fire({
//         icon: "warning",
//         title: "Time Conflict",
//         text: "An event already exists within this time range. Please choose a different time slot.",
//         confirmButtonText: "Got it",
//         confirmButtonColor: "#3B82F6",
//         background: "#ffffff",
//         color: "#1e293b",
//         customClass: {
//           popup: "rounded-2xl shadow-xl",
//           title: "text-base font-semibold",
//           htmlContainer: "text-sm text-slate-500",
//           confirmButton: "rounded-lg text-sm font-semibold px-5 py-2",
//         },
//         buttonsStyling: true,
//       });
//       return;
//     }

//     setEvents((prev) => [newEvent, ...prev ]);

//     // Auto-scroll to the newly added first event
//     setTimeout(() => {
//       scrollContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
//     }, 50);

//     Swal.fire({
//       icon: "success",
//       title: "Event Created",
//       text: `Scheduled ${newEvent.command} from ${newEvent.start} to ${newEvent.end}.`,
//       timer: 2000,
//       timerProgressBar: true,
//       showConfirmButton: false,
//       toast: true,
//       position: "bottom-end",
//       background: "#ffffff",
//       color: "#1e293b",
//       customClass: {
//         popup: "rounded-xl shadow-lg border border-slate-100",
//         title: "text-sm font-semibold",
//         htmlContainer: "text-xs text-slate-400",
//       },
//     });
//   };

//   const toggleEvent = (id) => {
//     const target = events.find((e) => e.id === id);
//     if (!target) return;

//     const newState = !target.enabled;

//     setEvents((prev) =>
//       prev.map((e) => (e.id === id ? { ...e, enabled: newState } : e))
//     );

//     Swal.fire({
//       toast: true,
//       position: "bottom-end",
//       icon: newState ? "success" : "info",
//       title: newState ? "Event Activated" : "Event Deactivated",
//       timer: 1500,
//       timerProgressBar: true,
//       showConfirmButton: false,
//       background: "#ffffff",
//       color: "#1e293b",
//       customClass: {
//         popup: "rounded-xl shadow-lg border border-slate-100",
//         title: "text-sm font-semibold",
//       },
//     });
//   };

//   if (!selectedDevice) return null;

//   return (
//     <div className="mt-2">
//       {/* Section Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <CalendarClock size={16} className="text-slate-400" strokeWidth={2} />
//           <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-widest">
//             Events
//           </h2>
//           {events.length > 0 && (
//             <span className="text-[11px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
//               {events.length}
//             </span>
//           )}
//         </div>

//         <button
//           onClick={() => setOpenModal(true)}
//           className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-150"
//         >
//           <Plus size={13} strokeWidth={2.5} />
//           Add Event
//         </button>
//       </div>

//       {/* Events List */}
//       {events.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-10 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
//           <CalendarClock size={28} className="text-slate-300 mb-2" strokeWidth={1.5} />
//           <p className="text-sm font-medium text-slate-400">No events yet</p>
//           <p className="text-xs text-slate-300 mt-0.5">
//             Click "Add Event" to create a schedule
//           </p>
//         </div>
//       ) : (
//         <div   ref={scrollContainerRef} className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
//           {events.map((event) => (
//             <EventCard
//               key={event.id}
//               event={event}
//               onToggle={() => toggleEvent(event.id)}
//             />
//           ))}
//         </div>
//       )}

//       <EventModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         onSave={addEvent}
//       />
//     </div>
//   );
// };

// export default EventsSection;





// import { useState, useRef } from "react";
// import EventCard from "./EventCard";
// import EventModal from "./EventModal";
// import { hasCollision } from "./eventUtils";
// import { Plus, CalendarClock } from "lucide-react";
// import Swal from "sweetalert2";

// const EventsSection = ({
//   // Allow a parent (e.g. VenueDetailsPanel Power button) to open the modal externally
//   externalOpen = false,
//   onExternalClose,
//   selectedDevice,
//   // NEW controlled props
//   events = [],
//   onEventsChange,
// }) => {
//   const [events, setEvents] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const scrollContainerRef = useRef(null);

//   // Modal open state: either locally triggered or externally triggered
//   const isModalOpen = openModal || externalOpen;

//   const handleModalClose = () => {
//     setOpenModal(false);
//     onExternalClose?.();
//   };

//   const addEvent = (newEvent) => {
//     const collision = hasCollision(events, newEvent);

//     if (collision) {
//       Swal.fire({
//         icon: "warning",
//         title: "Time Conflict",
//         text: "An event already exists within this time range. Please choose a different time slot.",
//         confirmButtonText: "Got it",
//         confirmButtonColor: "#3B82F6",
//         background: "#ffffff",
//         color: "#1e293b",
//         customClass: {
//           popup: "rounded-2xl shadow-xl",
//           title: "text-base font-semibold",
//           htmlContainer: "text-sm text-slate-500",
//           confirmButton: "rounded-lg text-sm font-semibold px-5 py-2",
//         },
//         buttonsStyling: true,
//       });
//       return;
//     }

//     // Prepend so newest event appears at the left
//     setEvents((prev) => [newEvent, ...prev]);

//     const updated = [newEvent, ...events];
//     onEventsChange?.(updated);


//     // Auto-scroll to the newly added first card
//     setTimeout(() => {
//       scrollContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
//     }, 50);

//     Swal.fire({
//       icon: "success",
//       title: "Event Created",
//       text: `Scheduled ${newEvent.command} from ${newEvent.start} to ${newEvent.end}.`,
//       timer: 2000,
//       timerProgressBar: true,
//       showConfirmButton: false,
//       toast: true,
//       position: "bottom-end",
//       background: "#ffffff",
//       color: "#1e293b",
//       customClass: {
//         popup: "rounded-xl shadow-lg border border-slate-100",
//         title: "text-sm font-semibold",
//         htmlContainer: "text-xs text-slate-400",
//       },
//     });
//   };

//   const toggleEvent = (id) => {
    
//     const updated = events.map((e) =>
//       e.id === id ? { ...e, enabled: !e.enabled } : e
//     );
//     onEventsChange?.(updated);


//     const target = events.find((e) => e.id === id);
//     if (!target) return;

//     const newState = !target.enabled;

//     setEvents((prev) =>
//       prev.map((e) => (e.id === id ? { ...e, enabled: newState } : e))
//     );

//     Swal.fire({
//       toast: true,
//       position: "bottom-end",
//       icon: newState ? "success" : "info",
//       title: newState ? "Event Activated" : "Event Deactivated",
//       timer: 1500,
//       timerProgressBar: true,
//       showConfirmButton: false,
//       background: "#ffffff",
//       color: "#1e293b",
//       customClass: {
//         popup: "rounded-xl shadow-lg border border-slate-100",
//         title: "text-sm font-semibold",
//       },
//     });
//   };

//   if (!selectedDevice) return null;

//   return (
//     <div className="mt-2">
//       {/* Section Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <CalendarClock size={16} className="text-slate-400" strokeWidth={2} />
//           <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-widest">
//             Events
//           </h2>
//           {events.length > 0 && (
//             <span className="text-[11px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
//               {events.length}
//             </span>
//           )}
//         </div>

//         <button
//           onClick={() => setOpenModal(true)}
//           className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-150"
//         >
//           <Plus size={13} strokeWidth={2.5} />
//           Add Event
//         </button>
//       </div>

//       {/* Events List */}
//       {events.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-10 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
//           <CalendarClock size={28} className="text-slate-300 mb-2" strokeWidth={1.5} />
//           <p className="text-sm font-medium text-slate-400">No events yet</p>
//           <p className="text-xs text-slate-300 mt-0.5">
//             Click "Add Event" to create a schedule
//           </p>
//         </div>
//       ) : (
//         <div
//           ref={scrollContainerRef}
//           className="flex gap-3 overflow-x-auto pb-2"
//           style={{ scrollbarWidth: "thin" }}
//         >
//           {events.map((event) => (
//             <EventCard
//               key={event.id}
//               event={event}
//               onToggle={() => toggleEvent(event.id)}
//             />
//           ))}
//         </div>
//       )}

//       <EventModal
//         open={isModalOpen}
//         onClose={handleModalClose}
//         onSave={addEvent}
//       />
//     </div>
//   );
// };

// export default EventsSection;













import { useState, useRef } from "react";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import { hasCollision } from "./eventUtils";
import { Plus, CalendarClock } from "lucide-react";
import Swal from "sweetalert2";

const EventsSection = ({
  selectedDevice,
  externalOpen = false,
  onExternalClose,
  events = [],
  onEventsChange,
  onToggleChange,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const scrollContainerRef = useRef(null);

  const isModalOpen = openModal || externalOpen;

  const handleModalClose = () => {
    setOpenModal(false);
    onExternalClose?.();
  };

  const addEvent = (newEvent) => {
    const collision = hasCollision(events, newEvent);

    if (collision) {
      Swal.fire({
        icon: "warning",
        title: "Time Conflict",
        text: "An event already exists within this time range. Please choose a different time slot.",
        confirmButtonText: "Got it",
        confirmButtonColor: "#3B82F6",
        background: "#ffffff",
        color: "#1e293b",
        customClass: {
          popup: "rounded-2xl shadow-xl",
          title: "text-base font-semibold",
          htmlContainer: "text-sm text-slate-500",
          confirmButton: "rounded-lg text-sm font-semibold px-5 py-2",
        },
        buttonsStyling: true,
      });
      return;
    }

    const updated = [newEvent, ...events];
    onEventsChange?.(updated);

    setTimeout(() => {
      scrollContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    }, 50);

    Swal.fire({
      icon: "success",
      title: "Event Created",
      text: `Scheduled ${newEvent.command} from ${newEvent.start} to ${newEvent.end}.`,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: "bottom-end",
      background: "#ffffff",
      color: "#1e293b",
      customClass: {
        popup: "rounded-xl shadow-lg border border-slate-100",
        title: "text-sm font-semibold",
        htmlContainer: "text-xs text-slate-400",
      },
    });
  };


  //   const toggleEvent = (id) => {
  //   const target = events.find((e) => e.id === id);
  //   if (!target) return;

  //   const updated = events.map((e) =>
  //     e.id === id ? { ...e, enabled: !e.enabled } : e
  //   );
  //   onEventsChange?.(updated);

  //   // If we just disabled a currently-running event, move toggle to OFF
  //   if (target.enabled) {
  //     const now = new Date();
  //     const nowM = now.getHours() * 60 + now.getMinutes();
  //     const s = toMinutes(target.start);
  //     const en = toMinutes(target.end);
  //     const wasRunning = en > s ? nowM >= s && nowM < en : nowM >= s || nowM < en;
  //     if (wasRunning) onToggleChange?.("off");
  //   }

  //   // ... Swal toast unchanged
  // };


// ── Helpers ─────────────────────────────────────────────────────────────────
const toMinutes = (t = "") => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
};



  const toggleEvent = (id) => {
    const target = events.find((e) => e.id === id);
    if (!target) return;

    const updated = events.map((e) =>
      e.id === id ? { ...e, enabled: !e.enabled } : e
    );
    onEventsChange?.(updated);


        // If we just disabled a currently-running event, move toggle to OFF
    if (target.enabled) {
      const now = new Date();
      const nowM = now.getHours() * 60 + now.getMinutes();
      const s = toMinutes(target.start);
      const en = toMinutes(target.end);
      const wasRunning = en > s ? nowM >= s && nowM < en : nowM >= s || nowM < en;
      if (wasRunning) onToggleChange?.("off");
    }

    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: !target.enabled ? "success" : "info",
      title: !target.enabled ? "Event Activated" : "Event Deactivated",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      background: "#ffffff",
      color: "#1e293b",
      customClass: {
        popup: "rounded-xl shadow-lg border border-slate-100",
        title: "text-sm font-semibold",
      },
    });
  };

  if (!selectedDevice) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarClock size={16} className="text-slate-400" strokeWidth={2} />
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-widest">
            Events
          </h2>
          {events.length > 0 && (
            <span className="text-[11px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              {events.length}
            </span>
          )}
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-150"
        >
          <Plus size={13} strokeWidth={2.5} />
          Add Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
          <CalendarClock size={28} className="text-slate-300 mb-2" strokeWidth={1.5} />
          <p className="text-sm font-medium text-slate-400">No events yet</p>
          <p className="text-xs text-slate-300 mt-0.5">
            Click "Add Event" to create a schedule
          </p>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onToggle={() => toggleEvent(event.id)}
            />
          ))}
        </div>
      )}

      <EventModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={addEvent}
      />
    </div>
  );
};

export default EventsSection;
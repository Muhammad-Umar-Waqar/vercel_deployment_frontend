// import { createContext, useContext, useState } from "react";

// // SchedulerContext.jsx
// const SchedulerContext = createContext(null);

// export function SchedulerProvider({ children }) {
//   const [eventsMap, setEventsMap] = useState({});
//   const [toggleMap, setToggleMap] = useState({});

//   const setEvents = (deviceId, updated) =>
//     setEventsMap(prev => ({ ...prev, [deviceId]: updated }));

//   const setToggle = (deviceId, val) =>
//     setToggleMap(prev => ({ ...prev, [deviceId]: val }));

//   return (
//     <SchedulerContext.Provider value={{ eventsMap, toggleMap, setEvents, setToggle }}>
//       {children}
//     </SchedulerContext.Provider>
//   );
// }

// export const useScheduler = () => useContext(SchedulerContext);


import { createContext, useContext, useState } from "react";

const SchedulerContext = createContext(null);

export function SchedulerProvider({ children }) {
  const [eventsMap, setEventsMap] = useState({});
  const [toggleMap, setToggleMap] = useState({});

  const setEvents = (deviceId, updated) =>
    setEventsMap(prev => ({
      ...prev,
      [deviceId]: updated || [],
    }));

  const setToggle = (deviceId, val) =>
    setToggleMap(prev => ({
      ...prev,
      [deviceId]: val ?? "off",   // ← FORCE DEFAULT OFF
    }));

  return (
    <SchedulerContext.Provider
      value={{ eventsMap, toggleMap, setEvents, setToggle }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}

export const useScheduler = () => useContext(SchedulerContext);
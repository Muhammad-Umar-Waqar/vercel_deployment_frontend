// // AlertsPanel.jsx
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import AlertList from "./AlertList";
// import { useStore } from "../../contexts/storecontexts";
// import { fetchAlertsByOrg } from "../../slices/alertsSlice";

// export default function AlertsPanel({ organizationId = null, pollInterval = null }) {
//   const dispatch = useDispatch();
//   const { user, getToken } = useStore();
//   const token = getToken();
//   const orgId = organizationId || user?.organization || null;

//   const orgAlerts = useSelector((s) =>
//     orgId ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null } : { venues: [], loading: false, error: null }
//   );

//   useEffect(() => {
//     if (!orgId) return;
//     dispatch(fetchAlertsByOrg(orgId, token));
//   }, [orgId, dispatch]);

//   useEffect(() => {
//     if (!orgId || !pollInterval) return;
//     const id = setInterval(() => {
//       dispatch(fetchAlertsByOrg(orgId, token));
//     }, pollInterval);
//     return () => clearInterval(id);
//   }, [orgId, pollInterval, dispatch]);

//   const venues = orgAlerts?.venues || [];

//   const odourItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.odourAlertCount || 0,
//     nestedItems: (v.odourAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const temperatureItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.temperatureAlertCount || 0,
//     nestedItems: (v.temperatureAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const humidityItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.humidityAlertCount || 0,
//     nestedItems: (v.humidityAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   return (
//     <div className="flex-shrink-0 mb-16 md:mb-auto">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <AlertList title="Odour Alert" iconSrc="/odour-alert.svg" items={odourItems} />
//         </div>
//         <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <AlertList title="Temperature Alert" iconSrc="/temperature.svg" items={temperatureItems} />
//         </div>
//         <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <AlertList title="Humidity Alert" iconSrc="/humidity-alert.svg" items={humidityItems} />
//         </div>
//       </div>
//     </div>
//   );
// }










// // src/pages/Dashboard/AlertsPanel.jsx
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import AlertList from "./AlertList";
// import { useStore } from "../../contexts/storecontexts";
// import { fetchAlertsByOrg } from "../../slices/alertsSlice";

// export default function AlertsPanel({ organizationId = null, pollInterval = null }) {
//   const dispatch = useDispatch();
//   const { user, getToken } = useStore();
//   const token = getToken();
//   const orgId = organizationId || user?.organization || null;
//   console.log("orgId", orgId)

//   const orgAlerts = useSelector((s) =>
//     orgId ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null } : { venues: [], loading: false, error: null }
//   );

//   console.log("OrgAlerts>>>", orgAlerts)
//   // initial fetch (when org changes)
//   useEffect(() => {
//     if (!orgId) return;
//     dispatch(fetchAlertsByOrg(orgId));
//   }, [orgId, dispatch]);

//   // polling - restart when orgId or pollInterval changes
//   useEffect(() => {
//     if (!orgId || !pollInterval) return;
//     const id = setInterval(() => {
//       dispatch(fetchAlertsByOrg(orgId));
//     }, pollInterval);
//     // fetch immediately as well (optional)
//     // dispatch(fetchAlertsByOrg(orgId));
//     return () => clearInterval(id);
//   }, [orgId, pollInterval, dispatch]);

//   const venues = orgAlerts?.venues || [];
//   console.log("Org>Alerts", orgAlerts);

//   const odourItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.odourAlertCount || 0,
//     nestedItems: (v.odourAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const temperatureItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.temperatureAlertCount || 0,
//     nestedItems: (v.temperatureAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const humidityItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.humidityAlertCount || 0,
//     nestedItems: (v.humidityAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   // NEW: AQI items
//   const aqiItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.aqiAlertCount || 0,
//     nestedItems: (v.aqiAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   // NEW: Leakage (GL) items
//   const glItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.glAlertCount || 0,
//     nestedItems: (v.glAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   return (
//     <div className="flex-shrink-0 mb-16 md:mb-auto">
//       {/* responsive: on large screens show 5 columns, on smaller fallback to 2/3 */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//         <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <AlertList title="Odour Alert" iconSrc="/odour-alert.svg" items={odourItems} />
//         </div>

//         <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <AlertList title="Temperature Alert" iconSrc="/temperature.svg" items={temperatureItems} />
//         </div>

//         <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <AlertList title="Humidity Alert" iconSrc="/humidity-alert.svg" items={humidityItems} />
//         </div>

//         <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           {/* <AlertList title="Air Quality Alert" iconSrc="/aqi-icon.svg" items={aqiItems} /> */}
//           <AlertList title="AQI Alert" iconSrc="/wind.svg" items={aqiItems} />
//         </div>

//         <div className="p-2 md:p-4 " style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//           <AlertList title="Leakage Alert" iconSrc="/zap.svg" items={glItems} />
//         </div>
//       </div>
//     </div>
//   );
// }







// // src/pages/Dashboard/AlertsPanel.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Box, IconButton, useMediaQuery, Stack, Chip } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import AlertList from "./AlertList";
// import { useStore } from "../../contexts/storecontexts";
// import { fetchAlertsByOrg } from "../../slices/alertsSlice";

// export default function AlertsPanel({ organizationId = null, pollInterval = null }) {
//   const dispatch = useDispatch();
//   const { user, getToken } = useStore();
//   const token = getToken();
//   const orgId = organizationId || user?.organization || null;

//   const orgAlerts = useSelector((s) =>
//     orgId ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null } : { venues: [], loading: false, error: null }
//   );

//   // fetch + polling (unchanged behaviour)
//   useEffect(() => {
//     if (!orgId) return;
//     dispatch(fetchAlertsByOrg(orgId));
//   }, [orgId, dispatch]);

//   useEffect(() => {
//     if (!orgId || !pollInterval) return;
//     const id = setInterval(() => {
//       dispatch(fetchAlertsByOrg(orgId));
//     }, pollInterval);
//     return () => clearInterval(id);
//   }, [orgId, pollInterval, dispatch]);

//   const venues = orgAlerts?.venues || [];

//   // Build items arrays for each alert type (same shape your AlertList expects)
//   const odourItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.odourAlertCount || 0,
//     nestedItems: (v.odourAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const temperatureItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.temperatureAlertCount || 0,
//     nestedItems: (v.temperatureAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const humidityItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.humidityAlertCount || 0,
//     nestedItems: (v.humidityAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const aqiItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.aqiAlertCount || 0,
//     nestedItems: (v.aqiAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const glItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.glAlertCount || 0,
//     nestedItems: (v.glAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   // define the available alert "cards" in desired order
//   const alertCards = useMemo(
//     () => [
//       { key: "odour", title: "Odour Alert", icon: "/odour-alert.svg", items: odourItems },
//       { key: "temperature", title: "Temperature Alert", icon: "/temperature.svg", items: temperatureItems },
//       { key: "humidity", title: "Humidity Alert", icon: "/humidity-alert.svg", items: humidityItems },
//       { key: "aqi", title: "AQI Alert", icon: "/wind.svg", items: aqiItems },
//       { key: "gl", title: "Leakage Alert", icon: "/zap.svg", items: glItems },
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orgAlerts]
//   );

//   // responsive behaviour
//   const isMobile = useMediaQuery("(max-width:767px)");
//   const visibleCount = isMobile ? 1 : 2; // show 1 on mobile, 2 on desktop

//   // carousel index (start index of visible window)
//   const [startIndex, setStartIndex] = useState(0);

//   // ensure startIndex stays valid when alertCards length or visibleCount changes
//   useEffect(() => {
//     if (startIndex > Math.max(0, alertCards.length - visibleCount)) {
//       setStartIndex(Math.max(0, alertCards.length - visibleCount));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [alertCards.length, visibleCount]);

//   // navigation helpers (wrap-around)
//   const canPrev = alertCards.length > visibleCount;
//   const canNext = alertCards.length > visibleCount;
//   const prev = () => {
//     if (!canPrev) return;
//     const nextIndex = (startIndex - visibleCount + alertCards.length) % alertCards.length;
//     setStartIndex(nextIndex);
//   };
//   const next = () => {
//     if (!canNext) return;
//     const nextIndex = (startIndex + visibleCount) % alertCards.length;
//     setStartIndex(nextIndex);
//   };

//   // compute the slice to display (wrap-aware)
//   const getVisible = () => {
//     if (alertCards.length <= visibleCount) return alertCards;
//     const out = [];
//     for (let i = 0; i < visibleCount; i += 1) {
//       const idx = (startIndex + i) % alertCards.length;
//       out.push(alertCards[idx]);
//     }
//     return out;
//   };

//   const visible = getVisible();

//   return (
//     <div className="flex-shrink-0 mb-16 md:mb-auto">
//       <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mb={2}>
//         <Box display="flex" gap={1}>
//           {/* Indicator chips for the types (click to jump) */}
//           {alertCards.map((c, i) => (
//             <Chip
//               key={c.key}
//               label={c.title.replace(" Alert", "")}
//               size="small"
//               clickable
//               onClick={() => {
//                 // jump so clicked card becomes the first visible
//                 const newStart = i;
//                 setStartIndex(newStart);
//               }}
//               sx={{
//                 bgcolor: (theme) =>
//                   (startIndex <= i && i < startIndex + visibleCount) || // simpler highlight rule
//                   (startIndex + visibleCount > alertCards.length && i < (startIndex + visibleCount) % alertCards.length)
//                     ? "#0D5CA4"
//                     : undefined,
//                 color: (theme) => ((startIndex <= i && i < startIndex + visibleCount) ? "white" : undefined),
//               }}
//             />
//           ))}
//         </Box>

//         <Box>
//           <IconButton size="small" onClick={prev} disabled={!canPrev}>
//             <ArrowBackIosNewIcon fontSize="small" />
//           </IconButton>
//           <IconButton size="small" onClick={next} disabled={!canNext}>
//             <ArrowForwardIosIcon fontSize="small" />
//           </IconButton>
//         </Box>
//       </Box>

//       {/* The visible alert panels (1 or 2) */}
//       <Box display="grid" gridTemplateColumns={isMobile ? "1fr" : `repeat(${visible.length}, 1fr)`} gap={6}>
//         {visible.map((card) => (
//           <Box key={card.key} className="p-2 md:p-4" sx={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//             <AlertList title={card.title} iconSrc={card.icon} items={card.items} />
//           </Box>
//         ))}
//       </Box>
//     </div>
//   );
// }












// // src/pages/Dashboard/AlertsPanel.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Box, IconButton, useMediaQuery } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import AlertList from "./AlertList";
// import { useStore } from "../../contexts/storecontexts";
// import { fetchAlertsByOrg } from "../../slices/alertsSlice";

// export default function AlertsPanel({ organizationId = null, pollInterval = null }) {
//   const dispatch = useDispatch();
//   const { user, getToken } = useStore();
//   const token = getToken();
//   const orgId = organizationId || user?.organization || null;

//   const orgAlerts = useSelector((s) =>
//     orgId ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null } : { venues: [], loading: false, error: null }
//   );

//   useEffect(() => {
//     if (!orgId) return;
//     dispatch(fetchAlertsByOrg(orgId));
//   }, [orgId, dispatch]);

//   useEffect(() => {
//     if (!orgId || !pollInterval) return;
//     const id = setInterval(() => {
//       dispatch(fetchAlertsByOrg(orgId));
//     }, pollInterval);
//     return () => clearInterval(id);
//   }, [orgId, pollInterval, dispatch]);

//   const venues = orgAlerts?.venues || [];

//   const odourItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.odourAlertCount || 0,
//     nestedItems: (v.odourAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const temperatureItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.temperatureAlertCount || 0,
//     nestedItems: (v.temperatureAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const humidityItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.humidityAlertCount || 0,
//     nestedItems: (v.humidityAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const aqiItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.aqiAlertCount || 0,
//     nestedItems: (v.aqiAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const glItems = venues.map((v) => ({
//     id: v.venueId,
//     name: v.venueName,
//     devices: v.glAlertCount || 0,
//     nestedItems: (v.glAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
//   }));

//   const alertCards = useMemo(
//     () => [
//       { key: "odour", title: "Odour Alert", icon: "/odour-alert.svg", items: odourItems },
//       { key: "temperature", title: "Temperature Alert", icon: "/temperature.svg", items: temperatureItems },
//       { key: "humidity", title: "Humidity Alert", icon: "/humidity-alert.svg", items: humidityItems },
//       { key: "aqi", title: "AQI Alert", icon: "/wind.svg", items: aqiItems },
//       { key: "gl", title: "Leakage Alert", icon: "/zap.svg", items: glItems },
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [orgAlerts]
//   );

//   const isMobile = useMediaQuery("(max-width:767px)");
//   const visibleCount = isMobile ? 1 : 2;

//   // carousel index (only used for desktop)
//   const [startIndex, setStartIndex] = useState(0);

//   // keep startIndex valid if length/visible changes
//   useEffect(() => {
//     if (startIndex > Math.max(0, alertCards.length - visibleCount)) {
//       setStartIndex(Math.max(0, alertCards.length - visibleCount));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [alertCards.length, visibleCount]);

//   const canNavigate = alertCards.length > visibleCount;
//   const prev = () => {
//     if (!canNavigate) return;
//     const nextIndex = (startIndex - visibleCount + alertCards.length) % alertCards.length;
//     setStartIndex(nextIndex);
//   };
//   const next = () => {
//     if (!canNavigate) return;
//     const nextIndex = (startIndex + visibleCount) % alertCards.length;
//     setStartIndex(nextIndex);
//   };

//   const getVisibleDesktop = () => {
//     if (alertCards.length <= visibleCount) return alertCards;
//     const out = [];
//     for (let i = 0; i < visibleCount; i += 1) {
//       const idx = (startIndex + i) % alertCards.length;
//       out.push(alertCards[idx]);
//     }
//     return out;
//   };

//   const visibleDesktop = getVisibleDesktop();

//   return (
//     <div className="flex-shrink-0 mb-16 md:mb-auto">
//       {/* Header area */}
//       {!isMobile ? (
//         // Desktop header: only arrows aligned to right (no chips / names)
//         <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1} mb={2}>
//           <IconButton size="small" onClick={prev} disabled={!canNavigate}>
//             <ArrowBackIosNewIcon fontSize="small" />
//           </IconButton>
//           <IconButton size="small" onClick={next} disabled={!canNavigate}>
//             <ArrowForwardIosIcon fontSize="small" />
//           </IconButton>
//         </Box>
//       ) : null}

//       {/* Content */}
//       {isMobile ? (
//         // MOBILE: horizontal swipeable slider (no arrows/chips)
//         <Box
//           component="div"
//           sx={{
//             display: "flex",
//             gap: 2,
//             overflowX: "auto",
//             px: 1,
//             pb: 1,
//             scrollSnapType: "x mandatory",
//             WebkitOverflowScrolling: "touch",
//             // hide scrollbar where possible
//             "&::-webkit-scrollbar": { display: "none" },
//             scrollbarWidth: "none",
//           }}
//         >
//           {alertCards.map((card) => (
//             <Box
//               key={card.key}
//               sx={{
//                 flex: "0 0 85%", // wide card so slide feels natural on mobile
//                 scrollSnapAlign: "center",
//                 backgroundColor: "#07518D12",
//                 borderRadius: "20px",
//                 p: 2,
//                 boxSizing: "border-box",
//                 // subtle shadow for a nicer mobile look
//                 boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
//               }}
//             >
//               <AlertList title={card.title} iconSrc={card.icon} items={card.items} />
//             </Box>
//           ))}
//         </Box>
//       ) : (
//         // DESKTOP: show grid of visibleDesktop items (2), with same card styling
//         <Box display="grid" gridTemplateColumns={`repeat(${visibleDesktop.length}, 1fr)`} gap={6}>
//           {visibleDesktop.map((card) => (
//             <Box key={card.key} className="p-2 md:p-4" sx={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
//               <AlertList title={card.title} iconSrc={card.icon} items={card.items} />
//             </Box>
//           ))}
//         </Box>
//       )}
//     </div>
//   );
// }









// src/pages/Dashboard/AlertsPanel.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AlertList from "./AlertList";
import { useStore } from "../../contexts/storecontexts";
import { fetchAlertsByOrg } from "../../slices/alertsSlice";

export default function AlertsPanel({ organizationId = null, pollInterval = null }) {
  const dispatch = useDispatch();
  const { user, getToken } = useStore();
  const token = getToken();
  const orgId = organizationId || user?.organization || null;

  const orgAlerts = useSelector((s) =>
    orgId ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null } : { venues: [], loading: false, error: null }
  );

  useEffect(() => {
    if (!orgId) return;
    dispatch(fetchAlertsByOrg(orgId));
  }, [orgId, dispatch]);

  useEffect(() => {
    if (!orgId || !pollInterval) return;
    const id = setInterval(() => {
      dispatch(fetchAlertsByOrg(orgId));
    }, pollInterval);
    return () => clearInterval(id);
  }, [orgId, pollInterval, dispatch]);

  const venues = orgAlerts?.venues || [];

  const odourItems = venues.map((v) => ({
    id: v.venueId,
    name: v.venueName,
    devices: v.odourAlertCount || 0,
    nestedItems: (v.odourAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
  }));

  const temperatureItems = venues.map((v) => ({
    id: v.venueId,
    name: v.venueName,
    devices: v.temperatureAlertCount || 0,
    nestedItems: (v.temperatureAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
  }));

  const humidityItems = venues.map((v) => ({
    id: v.venueId,
    name: v.venueName,
    devices: v.humidityAlertCount || 0,
    nestedItems: (v.humidityAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
  }));

  const aqiItems = venues.map((v) => ({
    id: v.venueId,
    name: v.venueName,
    devices: v.aqiAlertCount || 0,
    nestedItems: (v.aqiAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
  }));

  const glItems = venues.map((v) => ({
    id: v.venueId,
    name: v.venueName,
    devices: v.glAlertCount || 0,
    nestedItems: (v.glAlertDevices || []).map((d) => ({ id: d.id, name: d.name, date: d.date })),
  }));

  const alertCards = useMemo(
    () => [
      { key: "odour", title: "Odour Alert", icon: "/odour-alert.svg", items: odourItems },
      { key: "temperature", title: "Temperature Alert", icon: "/temperature.svg", items: temperatureItems },
      { key: "humidity", title: "Humidity Alert", icon: "/humidity-alert.svg", items: humidityItems },
      { key: "aqi", title: "AQI Alert", icon: "/wind.svg", items: aqiItems },
      { key: "gl", title: "Leakage Alert", icon: "/zap.svg", items: glItems },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orgAlerts]
  );

  const isMobile = useMediaQuery("(max-width:767px)");
  const visibleCount = isMobile ? 1 : 2;

  // carousel index (only used for desktop)
  const [startIndex, setStartIndex] = useState(0);

  // keep startIndex valid if length/visible changes
  useEffect(() => {
    if (startIndex > Math.max(0, alertCards.length - visibleCount)) {
      setStartIndex(Math.max(0, alertCards.length - visibleCount));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertCards.length, visibleCount]);

  const canNavigate = alertCards.length > visibleCount;
  const prev = () => {
    if (!canNavigate) return;
    const nextIndex = (startIndex - visibleCount + alertCards.length) % alertCards.length;
    setStartIndex(nextIndex);
  };
  const next = () => {
    if (!canNavigate) return;
    const nextIndex = (startIndex + visibleCount) % alertCards.length;
    setStartIndex(nextIndex);
  };

  const getVisibleDesktop = () => {
    if (alertCards.length <= visibleCount) return alertCards;
    const out = [];
    for (let i = 0; i < visibleCount; i += 1) {
      const idx = (startIndex + i) % alertCards.length;
      out.push(alertCards[idx]);
    }
    return out;
  };

  const visibleDesktop = getVisibleDesktop();

  return (
    <div className="flex-shrink-0 mb-16 md:mb-auto">
      {/* Header area */}
      {!isMobile ? (
        // Desktop header: only arrows aligned to right (no chips / names)
        <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1} mb={2}>
          <IconButton size="small" onClick={prev} disabled={!canNavigate}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={next} disabled={!canNavigate}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : null}

      {/* Content */}
      {isMobile ? (
        // MOBILE: horizontal swipeable slider (no arrows/chips)
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            // px: 2, // horizontal padding so cards have breathing room
            pb: 1,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            // hide scrollbar where possible
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            // ensure touch pan is horizontal
            touchAction: "pan-x",
          }}
        >
          {alertCards.map((card) => (
            <Box
              key={card.key}
              sx={{
                // Each card takes almost the full viewport width minus container padding.
                // This prevents half-cut cards and provides a nice peek on sides.
                flex: "0 0 calc(100% - 32px)",
                maxWidth: "calc(100% - 32px)",
                scrollSnapAlign: "center",
                backgroundColor: "#07518D12",
                borderRadius: "20px",
                p: 2,
                boxSizing: "border-box",
                boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
                // ensure the inner AlertList can shrink properly
                "& > .alert-list-wrapper": {
                  width: "100%",
                  minWidth: 0,
                },
              }}
            >
              {/* wrapper class ensures AlertList gets width:100% and minWidth:0 */}
              <div className="alert-list-wrapper">
                <AlertList title={card.title} iconSrc={card.icon} items={card.items} />
              </div>
            </Box>
          ))}
        </Box>
      ) : (
        // DESKTOP: show grid of visibleDesktop items (2), with same card styling
        <Box display="grid" gridTemplateColumns={`repeat(${visibleDesktop.length}, 1fr)`} gap={6}>
          {visibleDesktop.map((card) => (
            <Box key={card.key} className="p-2 md:p-4" sx={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
              <AlertList title={card.title} iconSrc={card.icon} items={card.items} />
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
}

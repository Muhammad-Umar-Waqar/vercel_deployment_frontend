// // // // After Polling Work and trying to show only changed fields not the reload of all devices
// // // src/pages/Dashboard.jsx
// // import React, { useState, useEffect, useMemo } from "react"
// // import FreezerDeviceCard from "./FreezerDeviceCard"
// // import OrganizationSelect from "./OrganizationSelect"
// // import VenueSelect from "./VenueSelect"
// // import AlertsPanel from "./AlertsPanel"
// // import "../../styles/pages/Dashboard/dashboard-styles.css"
// // import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
// // import { useStore } from "../../contexts/storecontexts"
// // import { useLocation, useNavigate } from "react-router-dom"
// // import DashboardRightPanel from "../../components/DashboardRightPanel"
// // import { Drawer, useMediaQuery } from "@mui/material";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchOrganizationByUserID } from "../../slices/OrganizationSlice";
// // import DeviceSkeleton from "./DeviceSkeleton"
// // import AQIDeviceCard from "./AQIDeviceCard"
// // import TemperatureHumidityDeviceCard from "./TemperatureHumidityDeviceCard"
// // import OdourDeviceCard from "./OdourDeviceCard"
// // import GasLeakageDeviceCard from "./GasLeakageDeviceCard"
// // // import AQIDeviceCard from "./AQIDeviceCard"
// // import { InfluxDB } from "@influxdata/influxdb-client";



// // const mockFreezerDevices = [
// // ]

// // const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050"

// // export default function Dashboard() {
// //   // -------------------------
// //   // top-level hooks (always called, stable order)
// //   // -------------------------
// //   const { user, getToken } = useStore()
// //   const location = useLocation()
// //   const navigate = useNavigate()

// //   const token = getToken();
// //   // -------------------------
// //   // minimal state for UI
// //   // -------------------------
// //   const [organizations, setOrganizations] = useState([]);
// //   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices);
// //   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedOrgId, setSelectedOrgId] = useState("");
// //   const [selectedVenueId, setSelectedVenueId] = useState("");
// //   const [orgNameForTop, setOrgNameForTop] = useState();
// //   const [open, setOpen] = React.useState(false);
// //   const isDesktop = useMediaQuery("(min-width:768px)");
// //   const isDesktopForIcon = useMediaQuery("(min-width:760px)");
// //   // add near the top of the component:
// //   const autoSelectedForVenueRef = React.useRef({}); // keys: venueId -> true
// //   // const [freezerDevicesLoading, setFreezerDevicesLoading] = useState(false);
// //   // const [hasFetchedForVenue, setHasFetchedForVenue] = useState(true);
// //   const [isInitialDevicesLoad, setIsInitialDevicesLoad] = useState(true);
// //   const [isContextChanging, setIsContextChanging] = useState(false);
// //   const [pollHitTime, setPollHitTime] = useState(Date.now());
// // // inside component top-level state declarations:
// // const [deviceOnlineMap, setDeviceOnlineMap] = useState({});       // { [deviceId]: boolean }
// // const [deviceLastUpdateMap, setDeviceLastUpdateMap] = useState({}); // { [deviceId]: lastISOstring }


// //   // -------------------------
// //   // helpers (pure utility, no hooks inside)
// //   // -------------------------
// //   const getAllDevicesInOrganization = (org) => {
// //     let devices = [...(org.devices || [])]
// //     if (org.subOrganizations) {
// //       org.subOrganizations.forEach((subOrg) => {
// //         devices = devices.concat(getAllDevicesInOrganization(subOrg))
// //       })
// //     }
// //     return devices
// //   }


// //   const findOrganizationById = (orgs, id) => {
// //     for (const org of orgs) {
// //       if (String(org.id) === String(id) || String(org._id) === String(id)) return org
// //       if (org.subOrganizations) {
// //         const found = findOrganizationById(org.subOrganizations, id)
// //         if (found) return found
// //       }
// //     }
// //     return null
// //   }

// //   // -------------------------
// //   // derived data (no useEffect)
// //   // -------------------------
// //   const selectedOrganizationData = useMemo(() => {
// //     if (!selectedOrgId || organizations.length === 0) return null
// //     const org = findOrganizationById(organizations, selectedOrgId)
// //     if (!org) return null
// //     const allDevices = getAllDevicesInOrganization(org)
// //     return {
// //       organizationName: org.name || org.organization_name || selectedOrgId,
// //       deviceCount: allDevices.length,
// //     }
// //   }, [selectedOrgId, organizations])

// //   // -------------------------
// //   // EFFECT #1: fetchOrganizations on mount (keeps your placeholder behavior)
// //   // -------------------------
// //   useEffect(() => {
// //     const fetchOrganizations = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);
// //         const mockOrgs = []
// //         setOrganizations(mockOrgs);
// //       } catch (err) {
// //         setError(err.message || "Failed to load organizations")
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchOrganizations()
// //   }, [])



// //   const dispatch = useDispatch();


// //   // -------------------------
// //   // determine polling interval
// //   // -------------------------
// //   const getPollingInterval = () => {
// //     if (!user?.timer) return 5 * 60 * 1000; // default 5 minutes

// //     const match = /^(\d+)(s|m)$/.exec(user.timer.trim());
// //     if (!match) return 5 * 60 * 1000; // fallback if invalid format

// //     const value = parseInt(match[1], 10);
// //     const unit = match[2];

// //     if (unit === "s") {
// //       return Math.min(Math.max(value, 0), 60) * 1000; // 0-60s
// //     } else if (unit === "m") {
// //       return Math.min(Math.max(value, 0), 60) * 60 * 1000; // 0-60m
// //     }

// //     return 5 * 60 * 1000; // fallback
// //   }

// //   const POLL_MS = getPollingInterval();



// //   useEffect(() => {
// //     if (user?.role !== "admin" && user?._id) {
// //       dispatch(fetchOrganizationByUserID(user._id))
// //         .unwrap()
// //         .then((org) => {
// //           console.log("Organization object:", org); // this is your actual organization
// //           setOrgNameForTop(org?.name);
// //         })
// //         .catch((err) => {
// //           console.log("Failed to fetch organization:", err);
// //         });
// //     }
// //   }, [dispatch, user]);



// //   useEffect(() => {
// //     const sp = new URLSearchParams(location.search)
// //     const venueFromUrl = sp.get("venue") || ""

// //     if (venueFromUrl === selectedVenueId) return

// //     setIsContextChanging(true);   // 🔥 ADD THIS

// //     if (!venueFromUrl) {
// //       setSelectedVenueId("")
// //     } else {
// //       setSelectedVenueId(venueFromUrl)
// //     }
// //   }, [location.search])


// //   useEffect(() => {


// //     if (!selectedVenueId) {
// //       setFreezerDevices([]);
// //       setSelectedFreezerDeviceId(null);
// //       autoSelectedForVenueRef.current = {};
// //       // no venue -> no loading; mark fetch as completed so spinner stops
// //       //  setFreezerDevicesLoading(false);
// //       //  setHasFetchedForVenue(true);
// //       return;
// //     }

// //     // IMPORTANT FIX:
// //     // setFreezerDevicesLoading(true);

// //     let mounted = true;
// //     let intervalId = null;
// //     const controller = new AbortController();
// //     const signal = controller.signal;

// //     const fetchDevices = async (isPolling = false) => {
// //       const hitTime = Date.now();      // 🔥 API HIT TIME
// //       setPollHitTime(hitTime);
// //       // setFreezerDevicesLoading(true);
// //       try {
// //         const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
// //           method: "GET",
// //           credentials: "include",
// //           signal,
// //           headers: {
// //             "Content-Type": "application/json",
// //             ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //           },
// //         });

// //         // if the request was aborted this will throw and be caught below
// //         const data = await res.json();

// //         console.log("Devices:::", data);
// //         if (!mounted) return;

// //         if (res.ok) {
// //           const devices = Array.isArray(data.devices)
// //             ? data.devices
// //             : (data.devices ? [data.devices] : []);

// //           // setFreezerDevices(devices || []);


// //           setFreezerDevices((prevDevices) => {
// //             const prevMap = new Map(
// //               prevDevices.map(d => [
// //                 String(d._id ?? d.id ?? d.deviceId),
// //                 d
// //               ])
// //             );

// //             return devices.map((newDevice) => {
// //               const id = String(newDevice._id ?? newDevice.id ?? newDevice.deviceId);
// //               const oldDevice = prevMap.get(id);

// //               console.log("NewDevice:>", newDevice);

// //               // New device → add
// //               if (!oldDevice) return newDevice;


// //               // Merge only changed fields
// //               return {
// //                 ...oldDevice,

// //                 ambientTemperature:
// //                   newDevice.ambientTemperature ?? oldDevice.ambientTemperature,

// //                 freezerTemperature:
// //                   newDevice.freezerTemperature ?? oldDevice.freezerTemperature,

// //                 espHumidity:
// //                   newDevice.espHumidity ?? oldDevice.espHumidity,

// //                 espTemprature:
// //                   newDevice.espTemprature ?? oldDevice.espTemprature,

// //                 espOdour:
// //                   newDevice.espOdour ?? oldDevice.espOdour,

// //                 // temperatureAlert:
// //                 //   newDevice.temperatureAlert ?? oldDevice.temperatureAlert,

// //                 // humidityAlert:
// //                 //   newDevice.humidityAlert ?? oldDevice.humidityAlert,

// //                 // odourAlert:
// //                 //   newDevice.odourAlert ?? oldDevice.odourAlert,

// //                 // batteryLow:
// //                 //   newDevice.batteryLow ?? oldDevice.batteryLow,

// //                 // refrigeratorAlert:
// //                 //   newDevice.refrigeratorAlert ?? oldDevice.refrigeratorAlert,

// //                 espAQI: newDevice.espAQI ?? oldDevice.espAQI,
// //                 espGL: newDevice.espGL ?? oldDevice.espGL,

// //                 temperatureAlert: newDevice.temperatureAlert ?? oldDevice.temperatureAlert,
// //                 humidityAlert: newDevice.humidityAlert ?? oldDevice.humidityAlert,
// //                 odourAlert: newDevice.odourAlert ?? oldDevice.odourAlert,

// //                 // add specialized alerts:
// //                 aqiAlert: newDevice.aqiAlert ?? oldDevice.aqiAlert,
// //                 glAlert: newDevice.glAlert ?? oldDevice.glAlert,

// //                 batteryLow: newDevice.batteryLow ?? oldDevice.batteryLow,
// //                 refrigeratorAlert: newDevice.refrigeratorAlert ?? oldDevice.refrigeratorAlert,
// //                 lastUpdateTime: newDevice.lastUpdateTime ?? oldDevice.lastUpdateTime,
// //               };
// //             });
// //           });


// //           // Auto-select first device ONLY ON DESKTOP and only once per venue load
// //           if (isDesktop && devices && devices.length > 0) {
// //             // hasn't been auto-selected yet for this venue?
// //             if (!autoSelectedForVenueRef.current[selectedVenueId]) {
// //               const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;
// //               if (firstId) {
// //                 setSelectedFreezerDeviceId(String(firstId));
// //                 // mark that we auto-selected for this venue so we don't repeat
// //                 autoSelectedForVenueRef.current[selectedVenueId] = true;
// //               }
// //             }
// //           }

// //           // If mobile (<768px), ensure no auto-selection
// //           if (!isDesktop && !isPolling) {
// //             setSelectedFreezerDeviceId(null);
// //           }

// //         } else {
// //           // error response
// //           setFreezerDevices([]);
// //           setSelectedFreezerDeviceId(null);
// //           console.error("Device fetch error:", data?.message);
// //         }
// //       } catch (err) {
// //         if (!mounted) return;
// //         if (err.name === "AbortError") {
// //           // request was aborted — no-op
// //           return;
// //         }
// //         console.error("Device fetch error:", err);
// //         setFreezerDevices([]);
// //         setSelectedFreezerDeviceId(null);
// //       } finally {
// //         // setFreezerDevicesLoading(false);
// //         // setHasFetchedForVenue(true);
// //         if (!isPolling) {
// //           setIsInitialDevicesLoad(false);
// //           setIsContextChanging(false);
// //         }
// //       }
// //     };

// //     fetchDevices(false); // initial / venue change fetch

// //     intervalId = setInterval(() => {
// //       fetchDevices(true); // polling fetch
// //     }, POLL_MS);

// //     return () => {
// //       mounted = false;
// //       if (intervalId) clearInterval(intervalId);
// //       controller.abort(); // cancel pending fetch
// //     };
// //     // intentionally not including selectedFreezerDeviceId to avoid effect loop when we set it
// //   }, [selectedVenueId, token, isDesktop]);

// //   // -------------------------
// //   // simple handlers (kept minimal)
// //   // -------------------------

// //   const toggleDrawer = (newOpen) => () => {
// //     setOpen(newOpen);
// //   };


// //   const handleFreezerDeviceSelect = (deviceId) => {
// //     console.log("Card Selected")
// //     setSelectedFreezerDeviceId(deviceId)
// //     if (!isDesktop) setOpen(true)
// //   }



// //   const onOrganizationChange = (id) => {

// //     const orgId = id || user?.organization;

// //     // If org hasn't changed, don't clear the venue or modify URL
// //     if (orgId && String(orgId) === String(selectedOrgId)) {
// //       return;
// //     }

// //     // Show loading and mark venue-fetch as not-done for the new org
// //     // setHasFetchedForVenue(false);
// //     // setFreezerDevicesLoading(true);
// //     setIsContextChanging(true);
// //     setSelectedOrgId(id || user?.organization)
// //     setSelectedVenueId("")
// //     // remove ?venue from URL
// //     const sp = new URLSearchParams(location.search)
// //     if (sp.get("venue")) {
// //       sp.delete("venue")
// //       navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true })
// //     }
// //   }

// //   const onVenueChange = (id) => {

// //     if (String(id) === String(selectedVenueId)) return;
// //     setIsContextChanging(true);   // 🔥 ADD THIS

// //     setSelectedVenueId(id)
// //     const basePath = location.pathname.split("?")[0]
// //     if (id) navigate(`${basePath}?venue=${id}`, { replace: false })
// //     else navigate(basePath, { replace: false })
// //   }


// //   // NEW EFFECT: poll Influx for the last timestamp of all devices (non-blocking)
// // useEffect(() => {
// //   let mounted = true;
// //   const controller = new AbortController();
// //   const signal = controller.signal;
// //   let intervalId = null;

// //   // if no devices, clear state
// //   if (!freezerDevices || freezerDevices.length === 0) {
// //     setDeviceOnlineMap({});
// //     setDeviceLastUpdateMap({});
// //     return () => {};
// //   }

// //   // Influx envs (same names used in DownloadModal)
// //   const influxUrl = import.meta.env.VITE_INFLUX_URL;
// //   const influxToken = import.meta.env.VITE_INFLUX_TOKEN;
// //   const influxOrg = import.meta.env.VITE_INFLUX_ORG;
// //   const influxBucket = "Odour";

// //   // Skip if Influx not configured — don't block main UI
// //   if (!influxUrl || !influxToken || !influxOrg || !influxBucket) {
// //     console.warn("Influx env vars not set; skipping LED polling.");
// //     return () => {};
// //   }

// //   const client = new InfluxDB({ url: influxUrl, token: influxToken });
// //   const queryApi = client.getQueryApi(influxOrg);

// //   const runQueryForAllDevices = async () => {
// //     try {
// //       // gather measurement names (assumes measurement names === deviceId)
// //       // const deviceIds = freezerDevices.map(d => String(d._id ?? d.id ?? d.deviceId)).filter(Boolean);
// //       // use deviceId only for Influx queries
// // const deviceIds = freezerDevices.map(d => String(d.deviceId).trim()).filter(Boolean);
// // console.log("LED DEBUG: deviceIds for influx:", deviceIds);

// //       if (!deviceIds.length) return;

// //       // build a filter "r._measurement == "id1" or r._measurement == "id2" ..."
// //       const measureFilter = deviceIds.map(id => `r._measurement == "${id}"`).join(" or ");

// //       console.log("LED DEBUG: measureFilter =", measureFilter);


// //       // Use a relative range which covers recent data (here we use 30d - safe fallback)
// //       // last() will return the last record per "group" (we'll group by _measurement implicitly)
// //       const flux = `
// // from(bucket: "${influxBucket}")
// //   |> range(start: -30d)
// //   |> filter(fn: (r) => ${measureFilter})
// //   |> last()
// //   |> keep(columns: ["_measurement", "_time"])
// // `;


// // console.log("LED DEBUG: flux query:\n", flux);

// //       // NOTE: collectRows returns an array of rows; each row should have _measurement and _time
// //       const rows = await queryApi.collectRows(flux);
// //       console.log("LED DEBUG: influx rows:", rows);
// //       if (!mounted) return;

// //       // build maps
// //       const lastMap = {};
// //       for (const r of rows) {
// //         // r._measurement and r._time expected
// //         const m = r._measurement || r.measurement || r._measurement;
// //         const t = r._time || r._time; // can be string or Date; we'll keep ISO
// //         if (!m) continue;
// //         // Normalize time to ISO string
// //         const timeISO = (typeof t === "string") ? t : (t instanceof Date ? t.toISOString() : String(t));
// //         lastMap[String(m)] = timeISO;
// //       }

// //       console.log("LED DEBUG: lastMap (measurement -> _time):", lastMap);


// //       // compute online/offline from threshold (1.5 hours)
// //       const thresholdMs = Date.now() - 1.5 * 60 * 60 * 1000; // now - 1.5 hours

// //       console.log("LED DEBUG: thresholdMs (ms) =", thresholdMs, " =>", new Date(thresholdMs).toISOString());
      
// //       const onlineMap = {};
// //       deviceIds.forEach((id) => {
// //         const timeISO = lastMap[id];
// //         if (!timeISO) {
// //           onlineMap[id] = false;
// //         } else {
// //           const ts = new Date(timeISO).getTime();
// //           onlineMap[id] = Number.isFinite(ts) && ts >= thresholdMs;
// //         }
// //       });

// //       // update state in a single set to minimize re-renders
// //       setDeviceLastUpdateMap(prev => ({ ...prev, ...lastMap }));
// //       console.log("LED DEBUG: onlineMap computed:", onlineMap);

// //       setDeviceOnlineMap(prev => ({ ...prev, ...onlineMap }));

// //     } catch (err) {
// //       // do not throw; only log. This should not affect device rendering.
// //       if (err.name === "AbortError") return;
// //       console.error("Influx LED polling error:", err);
// //     }
// //   };

// //   // Run immediately (but non-blocking) then start interval
// //   runQueryForAllDevices();
// //   intervalId = setInterval(() => {
// //     runQueryForAllDevices();
// //   }, POLL_MS); // reuse existing poll interval or change if you prefer

// //   return () => {
// //     mounted = false;
// //     if (intervalId) clearInterval(intervalId);
// //     controller.abort();
// //   };
// // }, [freezerDevices, POLL_MS]); // re-run when devices list changes


// //   // -------------------------
// //   // render states for loading / error
// //   // -------------------------
// //   if (loading) {
// //     return (
// //       <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
// //         <div className="flex justify-center items-center w-full h-64">
// //           {/* <div className="text-lg text-gray-600">Loading organizations...</div> */}
// //         </div>
// //       </div>
// //     )
// //   }





// //   // -------------------------
// //   // main JSX (kept same layout)
// //   // -------------------------
// //   return (
// //     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
// //       {/* Main Content Area */}
// //       <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">

// //         <>
// //           {/* Header */}
// //           <div className="flex justify-between items-center mb-6">
// //             {
// //               !isDesktopForIcon && <img src="/logo-half.png" alt="IOTFIY LOGO" className="w-auto h-[40px]" />
// //             }


// //             <div className="  sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[25rem]">
// //               {/* <p className="text-sm text-[#64748B] min-w-[250px] font-medium">Organization</p> */}
// //               {user?.role === "admin" ? (
// //                 <OrganizationSelect
// //                   value={selectedOrgId}
// //                   onChange={onOrganizationChange}
// //                   className="mt-1"
// //                 />
// //               ) : <>
// //                 <p className="text-gray-500">Organization</p>
// //                 <h3 className="text-gray-700 font-bold capitalize">{orgNameForTop || ""}</h3>
// //               </>}
// //             </div>

// //             <div className="flex items-center  ml-5 sm:ml-auto  ">
// //               <VenueSelect
// //                 organizationId={selectedOrgId || user?.organization}
// //                 value={selectedVenueId}
// //                 onChange={onVenueChange}
// //                 className=""
// //                 excludeFirstN={user?.role === "user" ? 3 : 0}
// //               />
// //             </div>
// //           </div>



// //           {/* Freezer Device Cards area */}
// //           <div className="flex-1 min-h-0">
// //             <div className="freezer-cards-container custom-scrollbar">
// //               {(isInitialDevicesLoad || isContextChanging) ? (
// //                 <div className="freezer-cards-grid freezer-cards-container">
// //                   {Array.from({ length: 4 }).map((_, index) => (
// //                     <DeviceSkeleton key={index} />
// //                   ))}
// //                 </div>
// //               ) : freezerDevices.length === 0 ? (
// //                 // No devices state (only shown when not loading)
// //                 <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
// //                   <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// //                   </svg>
// //                   <p className="text-lg font-medium">No Freezer Devices Found</p>
// //                   <p className="text-sm">Add some freezer devices to get started</p>
// //                 </div>
// //               ) : (
// //                 // Devices present
// //                 <div className="freezer-cards-grid freezer-cards-container">
// //                   {/* {freezerDevices.map((device) => (
          
// //                 <FreezerDeviceCard
// //                     key={device._id ?? device.id}
// //                     deviceId={device.deviceId}
// //                     ambientTemperature={device?.AmbientData?.temperature ?? device.ambientTemperature}
// //                     freezerTemperature={device?.FreezerData?.temperature ?? device.freezerTemperature}
// //                     batteryLow={device?.batteryAlert ?? device?.batteryLow ?? false}
// //                     refrigeratorAlert={device?.refrigeratorAlert ?? false}
// //                     onCardSelect={() => handleFreezerDeviceSelect(device._id ?? device.id)}
// //                     isSelected={(device._id ?? device.id) === selectedFreezerDeviceId}
// //                     espHumidity={device?.espHumidity}
// //                     espTemprature={device?.espTemprature}
// //                     temperatureAlert = {device?.temperatureAlert}
// //                     humidityAlert={device?.humidityAlert}
// //                     odourAlert={device?.odourAlert}
// //                     espOdour={device?.espOdour}
// //                     // NEW:
// //                     deviceType={device?.deviceType}
// //                     espAQI={device?.espAQI}
// //                     aqiAlert={device?.aqiAlert}
// //                     espGL={device?.espGL}
// //                     glAlert={device?.glAlert}
// //                   />



// //               ))} */}

// //                   {freezerDevices.map((device) => {
// //                     // const idKey = device._id ?? device.id ?? device.deviceId;
// //                     // const isOnline = Boolean(deviceOnlineMap[String(idKey)]); // default false if not found
// //                     // const lastUpdateISO = deviceLastUpdateMap[String(idKey)] || null;


// //                     // keep Mongo _id for React key/selection behaviour
// //                     const idKey = device._id ?? device.id ?? device.deviceId;

// //                     // use device.deviceId (Influx measurement) to look up the LED state
// //                     const influxKey = String(device.deviceId);
// //                     const isOnline = Boolean(deviceOnlineMap[influxKey]); // deviceOnlineMap keys are deviceId
// //                     const lastUpdateISO = deviceLastUpdateMap[influxKey] || null;

// //                     const commonProps = {
// //                       key: idKey,
// //                       deviceId: device.deviceId,
// //                       ambientTemperature: device?.AmbientData?.temperature ?? device.ambientTemperature,
// //                       freezerTemperature: device?.FreezerData?.temperature ?? device.freezerTemperature,
// //                       onCardSelect: () => handleFreezerDeviceSelect(idKey),
// //                       isSelected: String(idKey) === String(selectedFreezerDeviceId),
// //                       espHumidity: device?.espHumidity,
// //                       espTemprature: device?.espTemprature,
// //                       temperatureAlert: device?.temperatureAlert,
// //                       humidityAlert: device?.humidityAlert,
// //                       odourAlert: device?.odourAlert,
// //                       espOdour: device?.espOdour,
// //                       isOnline,
// //                       lastUpdateISO,
// //                     };

// //                     if (device?.deviceType === "AQIMD") {
// //                       // render the dedicated AQI card
// //                       return (
// //                         <AQIDeviceCard
// //                           {...commonProps}
// //                           espAQI={device?.espAQI}
// //                           aqiAlert={device?.aqiAlert}
// //                         />
// //                       );
// //                     }

// //                     if (device?.deviceType === "TMD") {
// //                       // render the dedicated AQI card
// //                       return (
// //                         <TemperatureHumidityDeviceCard
// //                           {...commonProps}
// //                           pollHitTime={pollHitTime}
// //                         />
// //                       );
// //                     }


// //                     if (device?.deviceType === "OMD") {
// //                       return (
// //                         <OdourDeviceCard
// //                           {...commonProps}
// //                           espOdour={device?.espOdour}
// //                           odourAlert={device?.odourAlert}
// //                         />
// //                       );
// //                     }

// //                     if (device?.deviceType === "GLMD") {
// //                       return (
// //                         <GasLeakageDeviceCard
// //                           {...commonProps}
// //                           espGL={device?.espGL}
// //                           glAlert={device?.glAlert}
// //                         />
// //                       );
// //                     }


// //                     // non-AQI types use the existing FreezerDeviceCard
// //                     return (
// //                       <FreezerDeviceCard
// //                         {...commonProps}
// //                         deviceType={device?.deviceType}
// //                         espAQI={device?.espAQI}
// //                         aqiAlert={device?.aqiAlert}
// //                         espGL={device?.espGL}
// //                         glAlert={device?.glAlert}
// //                         batteryLow={device?.batteryLow}
// //                         refrigeratorAlert={device?.refrigeratorAlert}
// //                       />
// //                     );
// //                   })}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <AlertsPanel organizationId={selectedOrgId} pollInterval={POLL_MS} />
// //           {/* <AlertsPanel organizationId={selectedOrgId} pollInterval={2 * 1000} /> */}
// //         </>
// //         {/* )} */}

// //       </div>

// //       {isDesktop ? (
// //         //     <DashboardRightPanel
// //         //   freezerDevices={freezerDevices}
// //         //   selectedFreezerDeviceId={selectedFreezerDeviceId}
// //         //   selectedOrgId={selectedOrgId}

// //         // />  

// //         <DashboardRightPanel
// //           freezerDevices={freezerDevices}
// //           selectedFreezerDeviceId={selectedFreezerDeviceId}
// //           selectedOrgId={selectedOrgId}
// //           pollInterval={POLL_MS}
// //         />

// //       ) : (
// //         <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
// //           {/* <DashboardRightPanel
// //       freezerDevices={freezerDevices}
// //       selectedFreezerDeviceId={selectedFreezerDeviceId}
// //       selectedOrgId={selectedOrgId}
// //       closeIcon={true}
// //        onClose={toggleDrawer(false)}
// //     /> */}

// //           <DashboardRightPanel
// //             freezerDevices={freezerDevices}
// //             selectedFreezerDeviceId={selectedFreezerDeviceId}
// //             selectedOrgId={selectedOrgId}
// //             closeIcon={true}
// //             onClose={toggleDrawer(false)}
// //             pollInterval={POLL_MS}
// //           />

// //         </Drawer>
// //       )}
// //     </div>
// //   )
// // }


































// // // After Polling Work and trying to show only changed fields not the reload of all devices
// // src/pages/Dashboard.jsx
// import React, { useState, useEffect, useMemo } from "react"
// import FreezerDeviceCard from "./FreezerDeviceCard"
// import OrganizationSelect from "./OrganizationSelect"
// import VenueSelect from "./VenueSelect"
// import AlertsPanel from "./AlertsPanel"
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
// import { useStore } from "../../contexts/storecontexts"
// import { useLocation, useNavigate } from "react-router-dom"
// import DashboardRightPanel from "../../components/DashboardRightPanel"
// import { Drawer, useMediaQuery } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrganizationByUserID } from "../../slices/OrganizationSlice";
// import DeviceSkeleton from "./DeviceSkeleton"
// import AQIDeviceCard from "./AQIDeviceCard"
// import TemperatureHumidityDeviceCard from "./TemperatureHumidityDeviceCard"
// import OdourDeviceCard from "./OdourDeviceCard"
// import GasLeakageDeviceCard from "./GasLeakageDeviceCard"
// // import AQIDeviceCard from "./AQIDeviceCard"
// import { InfluxDB } from "@influxdata/influxdb-client";



// const mockFreezerDevices = [
// ]

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050"

// export default function Dashboard() {
//   // -------------------------
//   // top-level hooks (always called, stable order)
//   // -------------------------
//   const { user, getToken } = useStore()
//   const location = useLocation()
//   const navigate = useNavigate()

//   const token = getToken();
//   // -------------------------
//   // minimal state for UI
//   // -------------------------
//   const [organizations, setOrganizations] = useState([]);
//   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices);
//   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrgId, setSelectedOrgId] = useState("");
//   const [selectedVenueId, setSelectedVenueId] = useState("");
//   const [orgNameForTop, setOrgNameForTop] = useState();
//   const [open, setOpen] = React.useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isDesktopForIcon = useMediaQuery("(min-width:760px)");
//   // add near the top of the component:
//   const autoSelectedForVenueRef = React.useRef({}); // keys: venueId -> true
//   // const [freezerDevicesLoading, setFreezerDevicesLoading] = useState(false);
//   // const [hasFetchedForVenue, setHasFetchedForVenue] = useState(true);
//   const [isInitialDevicesLoad, setIsInitialDevicesLoad] = useState(true);
//   const [isContextChanging, setIsContextChanging] = useState(false);
//   const [pollHitTime, setPollHitTime] = useState(Date.now());
// // inside component top-level state declarations:
// const [deviceOnlineMap, setDeviceOnlineMap] = useState({});       // { [deviceId]: boolean }
// const [deviceLastUpdateMap, setDeviceLastUpdateMap] = useState({}); // { [deviceId]: lastISOstring }

// const hasVenueInUrl = useMemo(() => {
//   const sp = new URLSearchParams(location.search);
//   return Boolean(sp.get("venue"));
// }, [location.search]);



//   // -------------------------
//   // helpers (pure utility, no hooks inside)
//   // -------------------------
//   const getAllDevicesInOrganization = (org) => {
//     let devices = [...(org.devices || [])]
//     if (org.subOrganizations) {
//       org.subOrganizations.forEach((subOrg) => {
//         devices = devices.concat(getAllDevicesInOrganization(subOrg))
//       })
//     }
//     return devices
//   }


//   const findOrganizationById = (orgs, id) => {
//     for (const org of orgs) {
//       if (String(org.id) === String(id) || String(org._id) === String(id)) return org
//       if (org.subOrganizations) {
//         const found = findOrganizationById(org.subOrganizations, id)
//         if (found) return found
//       }
//     }
//     return null
//   }

//   // -------------------------
//   // derived data (no useEffect)
//   // -------------------------
//   const selectedOrganizationData = useMemo(() => {
//     if (!selectedOrgId || organizations.length === 0) return null
//     const org = findOrganizationById(organizations, selectedOrgId)
//     if (!org) return null
//     const allDevices = getAllDevicesInOrganization(org)
//     return {
//       organizationName: org.name || org.organization_name || selectedOrgId,
//       deviceCount: allDevices.length,
//     }
//   }, [selectedOrgId, organizations])

//   // -------------------------
//   // EFFECT #1: fetchOrganizations on mount (keeps your placeholder behavior)
//   // -------------------------
//   useEffect(() => {
//     const fetchOrganizations = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const mockOrgs = []
//         setOrganizations(mockOrgs);
//       } catch (err) {
//         setError(err.message || "Failed to load organizations")
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchOrganizations()
//   }, [])



//   const dispatch = useDispatch();


//   // -------------------------
//   // determine polling interval
//   // -------------------------
//   const getPollingInterval = () => {
//     if (!user?.timer) return 5 * 60 * 1000; // default 5 minutes

//     const match = /^(\d+)(s|m)$/.exec(user.timer.trim());
//     if (!match) return 5 * 60 * 1000; // fallback if invalid format

//     const value = parseInt(match[1], 10);
//     const unit = match[2];

//     if (unit === "s") {
//       return Math.min(Math.max(value, 0), 60) * 1000; // 0-60s
//     } else if (unit === "m") {
//       return Math.min(Math.max(value, 0), 60) * 60 * 1000; // 0-60m
//     }

//     return 5 * 60 * 1000; // fallback
//   }

//   const POLL_MS = getPollingInterval();



//   useEffect(() => {
//     if (user?.role !== "admin" && user?._id) {
//       dispatch(fetchOrganizationByUserID(user._id))
//         .unwrap()
//         .then((org) => {
//           console.log("Organization object:", org); // this is your actual organization
//           setOrgNameForTop(org?.name);
//         })
//         .catch((err) => {
//           console.log("Failed to fetch organization:", err);
//         });
//     }
//   }, [dispatch, user]);



// useEffect(() => {
//   const sp = new URLSearchParams(location.search);
//   const venueFromUrl = sp.get("venue") || "";

//   if (venueFromUrl === selectedVenueId) return;

//   setIsContextChanging(true);

//   if (!venueFromUrl) {
//     setSelectedVenueId("");
//     return;
//   }

//   // set venue id immediately (so downstream effects run)
//   setSelectedVenueId(venueFromUrl);

//   // --- NEW: fetch venue to determine its organization and set selectedOrgId ---
//   (async () => {
//     try {
//       const res = await fetch(`${BASE}/venue/${venueFromUrl}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {})
//         }
//       });
//       if (!res.ok) return; // ignore if not found
//       const data = await res.json();
//       // try several shapes (backend may return { venue } or the venue object directly)
//       const venue = data?.venue ?? data;
//       const orgId = venue?.organization ?? venue?.org ?? venue?.organizationId ?? null;
//       if (orgId) {
//         // set parent-selected org so OrganizationSelect's auto-select won't override
//         setSelectedOrgId(String(orgId));
//       }
//     } catch (err) {
//       console.warn("Could not fetch venue->org", err);
//     } finally {
//       // leave selectedVenueId set
//       setIsContextChanging(false);
//     }
//   })();
// }, [location.search /* intentionally not adding selectedVenueId here */]);



//   useEffect(() => {


//     if (!selectedVenueId) {
//       setFreezerDevices([]);
//       setSelectedFreezerDeviceId(null);
//       autoSelectedForVenueRef.current = {};
//       // no venue -> no loading; mark fetch as completed so spinner stops
//       //  setFreezerDevicesLoading(false);
//       //  setHasFetchedForVenue(true);
//       return;
//     }

//     // IMPORTANT FIX:
//     // setFreezerDevicesLoading(true);

//     let mounted = true;
//     let intervalId = null;
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const fetchDevices = async (isPolling = false) => {
//       const hitTime = Date.now();      // 🔥 API HIT TIME
//       setPollHitTime(hitTime);
//       // setFreezerDevicesLoading(true);
//       try {
//         const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//           method: "GET",
//           credentials: "include",
//           signal,
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         // if the request was aborted this will throw and be caught below
//         const data = await res.json();

//         console.log("Devices:::", data);
//         if (!mounted) return;

//         if (res.ok) {
//           const devices = Array.isArray(data.devices)
//             ? data.devices
//             : (data.devices ? [data.devices] : []);

//           // setFreezerDevices(devices || []);


//           setFreezerDevices((prevDevices) => {
//             const prevMap = new Map(
//               prevDevices.map(d => [
//                 String(d._id ?? d.id ?? d.deviceId),
//                 d
//               ])
//             );

//             return devices.map((newDevice) => {
//               const id = String(newDevice._id ?? newDevice.id ?? newDevice.deviceId);
//               const oldDevice = prevMap.get(id);

//               console.log("NewDevice:>", newDevice);

//               // New device → add
//               if (!oldDevice) return newDevice;


//               // Merge only changed fields
//               return {
//                 ...oldDevice,

//                 ambientTemperature:
//                   newDevice.ambientTemperature ?? oldDevice.ambientTemperature,

//                 freezerTemperature:
//                   newDevice.freezerTemperature ?? oldDevice.freezerTemperature,

//                 espHumidity:
//                   newDevice.espHumidity ?? oldDevice.espHumidity,

//                 espTemprature:
//                   newDevice.espTemprature ?? oldDevice.espTemprature,

//                 espOdour:
//                   newDevice.espOdour ?? oldDevice.espOdour,

//                 // temperatureAlert:
//                 //   newDevice.temperatureAlert ?? oldDevice.temperatureAlert,

//                 // humidityAlert:
//                 //   newDevice.humidityAlert ?? oldDevice.humidityAlert,

//                 // odourAlert:
//                 //   newDevice.odourAlert ?? oldDevice.odourAlert,

//                 // batteryLow:
//                 //   newDevice.batteryLow ?? oldDevice.batteryLow,

//                 // refrigeratorAlert:
//                 //   newDevice.refrigeratorAlert ?? oldDevice.refrigeratorAlert,

//                 espAQI: newDevice.espAQI ?? oldDevice.espAQI,
//                 espGL: newDevice.espGL ?? oldDevice.espGL,

//                 temperatureAlert: newDevice.temperatureAlert ?? oldDevice.temperatureAlert,
//                 humidityAlert: newDevice.humidityAlert ?? oldDevice.humidityAlert,
//                 odourAlert: newDevice.odourAlert ?? oldDevice.odourAlert,

//                 // add specialized alerts:
//                 aqiAlert: newDevice.aqiAlert ?? oldDevice.aqiAlert,
//                 glAlert: newDevice.glAlert ?? oldDevice.glAlert,

//                 batteryLow: newDevice.batteryLow ?? oldDevice.batteryLow,
//                 refrigeratorAlert: newDevice.refrigeratorAlert ?? oldDevice.refrigeratorAlert,
//                 lastUpdateTime: newDevice.lastUpdateTime ?? oldDevice.lastUpdateTime,
//               };
//             });
//           });


//           // Auto-select first device ONLY ON DESKTOP and only once per venue load
//           if (isDesktop && devices && devices.length > 0) {
//             // hasn't been auto-selected yet for this venue?
//             if (!autoSelectedForVenueRef.current[selectedVenueId]) {
//               const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;
//               if (firstId) {
//                 setSelectedFreezerDeviceId(String(firstId));
//                 // mark that we auto-selected for this venue so we don't repeat
//                 autoSelectedForVenueRef.current[selectedVenueId] = true;
//               }
//             }
//           }

//           // If mobile (<768px), ensure no auto-selection
//           if (!isDesktop && !isPolling) {
//             setSelectedFreezerDeviceId(null);
//           }

//         } else {
//           // error response
//           setFreezerDevices([]);
//           setSelectedFreezerDeviceId(null);
//           console.error("Device fetch error:", data?.message);
//         }
//       } catch (err) {
//         if (!mounted) return;
//         if (err.name === "AbortError") {
//           // request was aborted — no-op
//           return;
//         }
//         console.error("Device fetch error:", err);
//         setFreezerDevices([]);
//         setSelectedFreezerDeviceId(null);
//       } finally {
//         // setFreezerDevicesLoading(false);
//         // setHasFetchedForVenue(true);
//         if (!isPolling) {
//           setIsInitialDevicesLoad(false);
//           setIsContextChanging(false);
//         }
//       }
//     };

//     fetchDevices(false); // initial / venue change fetch

//     intervalId = setInterval(() => {
//       fetchDevices(true); // polling fetch
//     }, POLL_MS);

//     return () => {
//       mounted = false;
//       if (intervalId) clearInterval(intervalId);
//       controller.abort(); // cancel pending fetch
//     };
//     // intentionally not including selectedFreezerDeviceId to avoid effect loop when we set it
//   }, [selectedVenueId, token, isDesktop]);

//   // -------------------------
//   // simple handlers (kept minimal)
//   // -------------------------

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };


//   const handleFreezerDeviceSelect = (deviceId) => {
//     console.log("Card Selected")
//     setSelectedFreezerDeviceId(deviceId)
//     if (!isDesktop) setOpen(true)
//   }



//   const onOrganizationChange = (id) => {

//     const orgId = id || user?.organization;

//     // If org hasn't changed, don't clear the venue or modify URL
//     if (orgId && String(orgId) === String(selectedOrgId)) {
//       return;
//     }

//     // Show loading and mark venue-fetch as not-done for the new org
//     // setHasFetchedForVenue(false);
//     // setFreezerDevicesLoading(true);
//     setIsContextChanging(true);
//     setSelectedOrgId(id || user?.organization)
//     setSelectedVenueId("")
//     // remove ?venue from URL
//     const sp = new URLSearchParams(location.search)
//     if (sp.get("venue")) {
//       sp.delete("venue")
//       navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true })
//     }
//   }

//   const onVenueChange = (id) => {

//     if (String(id) === String(selectedVenueId)) return;
//     setIsContextChanging(true);   // 🔥 ADD THIS

//     setSelectedVenueId(id)
//     const basePath = location.pathname.split("?")[0]
//     if (id) navigate(`${basePath}?venue=${id}`, { replace: false })
//     else navigate(basePath, { replace: false })
//   }


//   // NEW EFFECT: poll Influx for the last timestamp of all devices (non-blocking)
// useEffect(() => {
//   let mounted = true;
//   const controller = new AbortController();
//   const signal = controller.signal;
//   let intervalId = null;

//   // if no devices, clear state
//   if (!freezerDevices || freezerDevices.length === 0) {
//     setDeviceOnlineMap({});
//     setDeviceLastUpdateMap({});
//     return () => {};
//   }

//   // Influx envs (same names used in DownloadModal)
//   const influxUrl = import.meta.env.VITE_INFLUX_URL;
//   const influxToken = import.meta.env.VITE_INFLUX_TOKEN;
//   const influxOrg = import.meta.env.VITE_INFLUX_ORG;
//   const influxBucket = "Odour";

//   // Skip if Influx not configured — don't block main UI
//   if (!influxUrl || !influxToken || !influxOrg || !influxBucket) {
//     console.warn("Influx env vars not set; skipping LED polling.");
//     return () => {};
//   }

//   const client = new InfluxDB({ url: influxUrl, token: influxToken });
//   const queryApi = client.getQueryApi(influxOrg);

//   const runQueryForAllDevices = async () => {
//     try {
//       // gather measurement names (assumes measurement names === deviceId)
//       // const deviceIds = freezerDevices.map(d => String(d._id ?? d.id ?? d.deviceId)).filter(Boolean);
//       // use deviceId only for Influx queries
// const deviceIds = freezerDevices.map(d => String(d.deviceId).trim()).filter(Boolean);
// console.log("LED DEBUG: deviceIds for influx:", deviceIds);

//       if (!deviceIds.length) return;

//       // build a filter "r._measurement == "id1" or r._measurement == "id2" ..."
//       const measureFilter = deviceIds.map(id => `r._measurement == "${id}"`).join(" or ");

//       console.log("LED DEBUG: measureFilter =", measureFilter);


//       // Use a relative range which covers recent data (here we use 30d - safe fallback)
//       // last() will return the last record per "group" (we'll group by _measurement implicitly)
//       const flux = `
// from(bucket: "${influxBucket}")
//   |> range(start: -30d)
//   |> filter(fn: (r) => ${measureFilter})
//   |> last()
//   |> keep(columns: ["_measurement", "_time"])
// `;


// console.log("LED DEBUG: flux query:\n", flux);

//       // NOTE: collectRows returns an array of rows; each row should have _measurement and _time
//       const rows = await queryApi.collectRows(flux);
//       console.log("LED DEBUG: influx rows:", rows);
//       if (!mounted) return;

//       // build maps
//       const lastMap = {};
//       for (const r of rows) {
//         // r._measurement and r._time expected
//         const m = r._measurement || r.measurement || r._measurement;
//         const t = r._time || r._time; // can be string or Date; we'll keep ISO
//         if (!m) continue;
//         // Normalize time to ISO string
//         const timeISO = (typeof t === "string") ? t : (t instanceof Date ? t.toISOString() : String(t));
//         lastMap[String(m)] = timeISO;
//       }

//       console.log("LED DEBUG: lastMap (measurement -> _time):", lastMap);


//       // compute online/offline from threshold (1.5 hours)
//       const thresholdMs = Date.now() - 1.5 * 60 * 60 * 1000; // now - 1.5 hours

//       console.log("LED DEBUG: thresholdMs (ms) =", thresholdMs, " =>", new Date(thresholdMs).toISOString());
      
//       const onlineMap = {};
//       deviceIds.forEach((id) => {
//         const timeISO = lastMap[id];
//         if (!timeISO) {
//           onlineMap[id] = false;
//         } else {
//           const ts = new Date(timeISO).getTime();
//           onlineMap[id] = Number.isFinite(ts) && ts >= thresholdMs;
//         }
//       });

//       // update state in a single set to minimize re-renders
//       setDeviceLastUpdateMap(prev => ({ ...prev, ...lastMap }));
//       console.log("LED DEBUG: onlineMap computed:", onlineMap);

//       setDeviceOnlineMap(prev => ({ ...prev, ...onlineMap }));

//     } catch (err) {
//       // do not throw; only log. This should not affect device rendering.
//       if (err.name === "AbortError") return;
//       console.error("Influx LED polling error:", err);
//     }
//   };

//   // Run immediately (but non-blocking) then start interval
//   runQueryForAllDevices();
//   intervalId = setInterval(() => {
//     runQueryForAllDevices();
//   }, POLL_MS); // reuse existing poll interval or change if you prefer

//   return () => {
//     mounted = false;
//     if (intervalId) clearInterval(intervalId);
//     controller.abort();
//   };
// }, [freezerDevices, POLL_MS]); // re-run when devices list changes


//   // -------------------------
//   // render states for loading / error
//   // -------------------------
//   if (loading) {
//     return (
//       <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
//         <div className="flex justify-center items-center w-full h-64">
//           {/* <div className="text-lg text-gray-600">Loading organizations...</div> */}
//         </div>
//       </div>
//     )
//   }





//   // -------------------------
//   // main JSX (kept same layout)
//   // -------------------------
//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       {/* Main Content Area */}
//       <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">

//         <>
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             {
//               !isDesktopForIcon && <img src="/logo-half.png" alt="IOTFIY LOGO" className="w-auto h-[40px]" />
//             }


//             <div className="  sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[25rem]">
//               {/* <p className="text-sm text-[#64748B] min-w-[250px] font-medium">Organization</p> */}
//               {user?.role === "admin" ? (
//                 <OrganizationSelect
//                   value={selectedOrgId}
//                   onChange={onOrganizationChange}
//                   className="mt-1"
//                   disableAutoSelect={hasVenueInUrl}
//                 />
//               ) : <>
//                 <p className="text-gray-500">Organization</p>
//                 <h3 className="text-gray-700 font-bold capitalize">{orgNameForTop || ""}</h3>
//               </>}
//             </div>

//             <div className="flex items-center  ml-5 sm:ml-auto  ">
//               <VenueSelect
//                 organizationId={selectedOrgId || user?.organization}
//                 value={selectedVenueId}
//                 onChange={onVenueChange}
//                 className=""
//                 excludeFirstN={user?.role === "user" ? 3 : 0}
//               />
//             </div>
//           </div>



//           {/* Freezer Device Cards area */}
//           <div className="flex-1 min-h-0">
//             <div className="freezer-cards-container custom-scrollbar">
//               {(isInitialDevicesLoad || isContextChanging) ? (
//                 <div className="freezer-cards-grid freezer-cards-container">
//                   {Array.from({ length: 4 }).map((_, index) => (
//                     <DeviceSkeleton key={index} />
//                   ))}
//                 </div>
//               ) : freezerDevices.length === 0 ? (
//                 // No devices state (only shown when not loading)
//                 <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                   <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <p className="text-lg font-medium">No Freezer Devices Found</p>
//                   <p className="text-sm">Add some freezer devices to get started</p>
//                 </div>
//               ) : (
//                 // Devices present
//                 <div className="freezer-cards-grid freezer-cards-container">
//                   {/* {freezerDevices.map((device) => (
          
//                 <FreezerDeviceCard
//                     key={device._id ?? device.id}
//                     deviceId={device.deviceId}
//                     ambientTemperature={device?.AmbientData?.temperature ?? device.ambientTemperature}
//                     freezerTemperature={device?.FreezerData?.temperature ?? device.freezerTemperature}
//                     batteryLow={device?.batteryAlert ?? device?.batteryLow ?? false}
//                     refrigeratorAlert={device?.refrigeratorAlert ?? false}
//                     onCardSelect={() => handleFreezerDeviceSelect(device._id ?? device.id)}
//                     isSelected={(device._id ?? device.id) === selectedFreezerDeviceId}
//                     espHumidity={device?.espHumidity}
//                     espTemprature={device?.espTemprature}
//                     temperatureAlert = {device?.temperatureAlert}
//                     humidityAlert={device?.humidityAlert}
//                     odourAlert={device?.odourAlert}
//                     espOdour={device?.espOdour}
//                     // NEW:
//                     deviceType={device?.deviceType}
//                     espAQI={device?.espAQI}
//                     aqiAlert={device?.aqiAlert}
//                     espGL={device?.espGL}
//                     glAlert={device?.glAlert}
//                   />



//               ))} */}

//                   {freezerDevices.map((device) => {
//                     // const idKey = device._id ?? device.id ?? device.deviceId;
//                     // const isOnline = Boolean(deviceOnlineMap[String(idKey)]); // default false if not found
//                     // const lastUpdateISO = deviceLastUpdateMap[String(idKey)] || null;


//                     // keep Mongo _id for React key/selection behaviour
//                     const idKey = device._id ?? device.id ?? device.deviceId;

//                     // use device.deviceId (Influx measurement) to look up the LED state
//                     const influxKey = String(device.deviceId);
//                     const isOnline = Boolean(deviceOnlineMap[influxKey]); // deviceOnlineMap keys are deviceId
//                     const lastUpdateISO = deviceLastUpdateMap[influxKey] || null;

//                     const commonProps = {
//                       key: idKey,
//                       deviceId: device.deviceId,
//                       ambientTemperature: device?.AmbientData?.temperature ?? device.ambientTemperature,
//                       freezerTemperature: device?.FreezerData?.temperature ?? device.freezerTemperature,
//                       onCardSelect: () => handleFreezerDeviceSelect(idKey),
//                       isSelected: String(idKey) === String(selectedFreezerDeviceId),
//                       espHumidity: device?.espHumidity,
//                       espTemprature: device?.espTemprature,
//                       temperatureAlert: device?.temperatureAlert,
//                       humidityAlert: device?.humidityAlert,
//                       odourAlert: device?.odourAlert,
//                       espOdour: device?.espOdour,
//                       isOnline,
//                       lastUpdateISO,
//                     };

//                     if (device?.deviceType === "AQIMD") {
//                       // render the dedicated AQI card
//                       return (
//                         <AQIDeviceCard
//                           {...commonProps}
//                           espAQI={device?.espAQI}
//                           aqiAlert={device?.aqiAlert}
//                         />
//                       );
//                     }

//                     if (device?.deviceType === "TMD") {
//                       // render the dedicated AQI card
//                       return (
//                         <TemperatureHumidityDeviceCard
//                           {...commonProps}
//                           pollHitTime={pollHitTime}
//                         />
//                       );
//                     }


//                     if (device?.deviceType === "OMD") {
//                       return (
//                         <OdourDeviceCard
//                           {...commonProps}
//                           espOdour={device?.espOdour}
//                           odourAlert={device?.odourAlert}
//                         />
//                       );
//                     }

//                     if (device?.deviceType === "GLMD") {
//                       return (
//                         <GasLeakageDeviceCard
//                           {...commonProps}
//                           espGL={device?.espGL}
//                           glAlert={device?.glAlert}
//                         />
//                       );
//                     }


//                     // non-AQI types use the existing FreezerDeviceCard
//                     return (
//                       <FreezerDeviceCard
//                         {...commonProps}
//                         deviceType={device?.deviceType}
//                         espAQI={device?.espAQI}
//                         aqiAlert={device?.aqiAlert}
//                         espGL={device?.espGL}
//                         glAlert={device?.glAlert}
//                         batteryLow={device?.batteryLow}
//                         refrigeratorAlert={device?.refrigeratorAlert}
//                       />
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           <AlertsPanel organizationId={selectedOrgId} pollInterval={POLL_MS} />
//           {/* <AlertsPanel organizationId={selectedOrgId} pollInterval={2 * 1000} /> */}
//         </>
//         {/* )} */}

//       </div>

//       {isDesktop ? (
//         //     <DashboardRightPanel
//         //   freezerDevices={freezerDevices}
//         //   selectedFreezerDeviceId={selectedFreezerDeviceId}
//         //   selectedOrgId={selectedOrgId}

//         // />  

//         <DashboardRightPanel
//           freezerDevices={freezerDevices}
//           selectedFreezerDeviceId={selectedFreezerDeviceId}
//           selectedOrgId={selectedOrgId}
//           pollInterval={POLL_MS}
//         />

//       ) : (
//         <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
//           {/* <DashboardRightPanel
//       freezerDevices={freezerDevices}
//       selectedFreezerDeviceId={selectedFreezerDeviceId}
//       selectedOrgId={selectedOrgId}
//       closeIcon={true}
//        onClose={toggleDrawer(false)}
//     /> */}

//           <DashboardRightPanel
//             freezerDevices={freezerDevices}
//             selectedFreezerDeviceId={selectedFreezerDeviceId}
//             selectedOrgId={selectedOrgId}
//             closeIcon={true}
//             onClose={toggleDrawer(false)}
//             pollInterval={POLL_MS}
//           />

//         </Drawer>
//       )}
//     </div>
//   )
// }
























// // // After Polling Work and trying to show only changed fields not the reload of all devices
// // src/pages/Dashboard.jsx
// import React, { useState, useEffect, useMemo } from "react"
// import FreezerDeviceCard from "./FreezerDeviceCard"
// import OrganizationSelect from "./OrganizationSelect"
// import VenueSelect from "./VenueSelect"
// import AlertsPanel from "./AlertsPanel"
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
// import { useStore } from "../../contexts/storecontexts"
// import { useLocation, useNavigate } from "react-router-dom"
// import DashboardRightPanel from "../../components/DashboardRightPanel"
// import { Drawer, useMediaQuery } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrganizationByUserID } from "../../slices/OrganizationSlice";
// import DeviceSkeleton from "./DeviceSkeleton"
// import AQIDeviceCard from "./AQIDeviceCard"
// import TemperatureHumidityDeviceCard from "./TemperatureHumidityDeviceCard"
// import OdourDeviceCard from "./OdourDeviceCard"
// import GasLeakageDeviceCard from "./GasLeakageDeviceCard"
// // import AQIDeviceCard from "./AQIDeviceCard"
// import { InfluxDB } from "@influxdata/influxdb-client";



// const mockFreezerDevices = [
// ]

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050"

// export default function Dashboard() {
//   // -------------------------
//   // top-level hooks (always called, stable order)
//   // -------------------------
//   const { user, getToken } = useStore()
//   const location = useLocation()
//   const navigate = useNavigate()

//   const token = getToken();
//   // -------------------------
//   // minimal state for UI
//   // -------------------------
//   const [organizations, setOrganizations] = useState([]);
//   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices);
//   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrgId, setSelectedOrgId] = useState("");
//   const [selectedVenueId, setSelectedVenueId] = useState("");
//   const [orgNameForTop, setOrgNameForTop] = useState();
//   const [open, setOpen] = React.useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isDesktopForIcon = useMediaQuery("(min-width:760px)");
//   // add near the top of the component:
//   const autoSelectedForVenueRef = React.useRef({}); // keys: venueId -> true
//   // const [freezerDevicesLoading, setFreezerDevicesLoading] = useState(false);
//   // const [hasFetchedForVenue, setHasFetchedForVenue] = useState(true);
//   const [isInitialDevicesLoad, setIsInitialDevicesLoad] = useState(true);
//   const [isContextChanging, setIsContextChanging] = useState(false);
//   const [pollHitTime, setPollHitTime] = useState(Date.now());
// // inside component top-level state declarations:
// const [deviceOnlineMap, setDeviceOnlineMap] = useState({});       // { [deviceId]: boolean }
// const [deviceLastUpdateMap, setDeviceLastUpdateMap] = useState({}); // { [deviceId]: lastISOstring }


//   // -------------------------
//   // helpers (pure utility, no hooks inside)
//   // -------------------------
//   const getAllDevicesInOrganization = (org) => {
//     let devices = [...(org.devices || [])]
//     if (org.subOrganizations) {
//       org.subOrganizations.forEach((subOrg) => {
//         devices = devices.concat(getAllDevicesInOrganization(subOrg))
//       })
//     }
//     return devices
//   }


//   const findOrganizationById = (orgs, id) => {
//     for (const org of orgs) {
//       if (String(org.id) === String(id) || String(org._id) === String(id)) return org
//       if (org.subOrganizations) {
//         const found = findOrganizationById(org.subOrganizations, id)
//         if (found) return found
//       }
//     }
//     return null
//   }

//   // -------------------------
//   // derived data (no useEffect)
//   // -------------------------
//   const selectedOrganizationData = useMemo(() => {
//     if (!selectedOrgId || organizations.length === 0) return null
//     const org = findOrganizationById(organizations, selectedOrgId)
//     if (!org) return null
//     const allDevices = getAllDevicesInOrganization(org)
//     return {
//       organizationName: org.name || org.organization_name || selectedOrgId,
//       deviceCount: allDevices.length,
//     }
//   }, [selectedOrgId, organizations])

//   // -------------------------
//   // EFFECT #1: fetchOrganizations on mount (keeps your placeholder behavior)
//   // -------------------------
//   useEffect(() => {
//     const fetchOrganizations = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const mockOrgs = []
//         setOrganizations(mockOrgs);
//       } catch (err) {
//         setError(err.message || "Failed to load organizations")
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchOrganizations()
//   }, [])



//   const dispatch = useDispatch();


//   // -------------------------
//   // determine polling interval
//   // -------------------------
//   const getPollingInterval = () => {
//     if (!user?.timer) return 5 * 60 * 1000; // default 5 minutes

//     const match = /^(\d+)(s|m)$/.exec(user.timer.trim());
//     if (!match) return 5 * 60 * 1000; // fallback if invalid format

//     const value = parseInt(match[1], 10);
//     const unit = match[2];

//     if (unit === "s") {
//       return Math.min(Math.max(value, 0), 60) * 1000; // 0-60s
//     } else if (unit === "m") {
//       return Math.min(Math.max(value, 0), 60) * 60 * 1000; // 0-60m
//     }

//     return 5 * 60 * 1000; // fallback
//   }

//   const POLL_MS = getPollingInterval();



//   useEffect(() => {
//     if (user?.role !== "admin" && user?._id) {
//       dispatch(fetchOrganizationByUserID(user._id))
//         .unwrap()
//         .then((org) => {
//           console.log("Organization object:", org); // this is your actual organization
//           setOrgNameForTop(org?.name);
//         })
//         .catch((err) => {
//           console.log("Failed to fetch organization:", err);
//         });
//     }
//   }, [dispatch, user]);



//   useEffect(() => {
//     const sp = new URLSearchParams(location.search)
//     const venueFromUrl = sp.get("venue") || ""

//     if (venueFromUrl === selectedVenueId) return

//     setIsContextChanging(true);   // 🔥 ADD THIS

//     if (!venueFromUrl) {
//       setSelectedVenueId("")
//     } else {
//       setSelectedVenueId(venueFromUrl)
//     }
//   }, [location.search])


//   useEffect(() => {


//     if (!selectedVenueId) {
//       setFreezerDevices([]);
//       setSelectedFreezerDeviceId(null);
//       autoSelectedForVenueRef.current = {};
//       // no venue -> no loading; mark fetch as completed so spinner stops
//       //  setFreezerDevicesLoading(false);
//       //  setHasFetchedForVenue(true);
//       return;
//     }

//     // IMPORTANT FIX:
//     // setFreezerDevicesLoading(true);

//     let mounted = true;
//     let intervalId = null;
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const fetchDevices = async (isPolling = false) => {
//       const hitTime = Date.now();      // 🔥 API HIT TIME
//       setPollHitTime(hitTime);
//       // setFreezerDevicesLoading(true);
//       try {
//         const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//           method: "GET",
//           credentials: "include",
//           signal,
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         // if the request was aborted this will throw and be caught below
//         const data = await res.json();

//         console.log("Devices:::", data);
//         if (!mounted) return;

//         if (res.ok) {
//           const devices = Array.isArray(data.devices)
//             ? data.devices
//             : (data.devices ? [data.devices] : []);

//           // setFreezerDevices(devices || []);


//           setFreezerDevices((prevDevices) => {
//             const prevMap = new Map(
//               prevDevices.map(d => [
//                 String(d._id ?? d.id ?? d.deviceId),
//                 d
//               ])
//             );

//             return devices.map((newDevice) => {
//               const id = String(newDevice._id ?? newDevice.id ?? newDevice.deviceId);
//               const oldDevice = prevMap.get(id);

//               console.log("NewDevice:>", newDevice);

//               // New device → add
//               if (!oldDevice) return newDevice;


//               // Merge only changed fields
//               return {
//                 ...oldDevice,

//                 ambientTemperature:
//                   newDevice.ambientTemperature ?? oldDevice.ambientTemperature,

//                 freezerTemperature:
//                   newDevice.freezerTemperature ?? oldDevice.freezerTemperature,

//                 espHumidity:
//                   newDevice.espHumidity ?? oldDevice.espHumidity,

//                 espTemprature:
//                   newDevice.espTemprature ?? oldDevice.espTemprature,

//                 espOdour:
//                   newDevice.espOdour ?? oldDevice.espOdour,

//                 // temperatureAlert:
//                 //   newDevice.temperatureAlert ?? oldDevice.temperatureAlert,

//                 // humidityAlert:
//                 //   newDevice.humidityAlert ?? oldDevice.humidityAlert,

//                 // odourAlert:
//                 //   newDevice.odourAlert ?? oldDevice.odourAlert,

//                 // batteryLow:
//                 //   newDevice.batteryLow ?? oldDevice.batteryLow,

//                 // refrigeratorAlert:
//                 //   newDevice.refrigeratorAlert ?? oldDevice.refrigeratorAlert,

//                 espAQI: newDevice.espAQI ?? oldDevice.espAQI,
//                 espGL: newDevice.espGL ?? oldDevice.espGL,

//                 temperatureAlert: newDevice.temperatureAlert ?? oldDevice.temperatureAlert,
//                 humidityAlert: newDevice.humidityAlert ?? oldDevice.humidityAlert,
//                 odourAlert: newDevice.odourAlert ?? oldDevice.odourAlert,

//                 // add specialized alerts:
//                 aqiAlert: newDevice.aqiAlert ?? oldDevice.aqiAlert,
//                 glAlert: newDevice.glAlert ?? oldDevice.glAlert,

//                 batteryLow: newDevice.batteryLow ?? oldDevice.batteryLow,
//                 refrigeratorAlert: newDevice.refrigeratorAlert ?? oldDevice.refrigeratorAlert,
//                 lastUpdateTime: newDevice.lastUpdateTime ?? oldDevice.lastUpdateTime,
//               };
//             });
//           });


//           // Auto-select first device ONLY ON DESKTOP and only once per venue load
//           if (isDesktop && devices && devices.length > 0) {
//             // hasn't been auto-selected yet for this venue?
//             if (!autoSelectedForVenueRef.current[selectedVenueId]) {
//               const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;
//               if (firstId) {
//                 setSelectedFreezerDeviceId(String(firstId));
//                 // mark that we auto-selected for this venue so we don't repeat
//                 autoSelectedForVenueRef.current[selectedVenueId] = true;
//               }
//             }
//           }

//           // If mobile (<768px), ensure no auto-selection
//           if (!isDesktop && !isPolling) {
//             setSelectedFreezerDeviceId(null);
//           }

//         } else {
//           // error response
//           setFreezerDevices([]);
//           setSelectedFreezerDeviceId(null);
//           console.error("Device fetch error:", data?.message);
//         }
//       } catch (err) {
//         if (!mounted) return;
//         if (err.name === "AbortError") {
//           // request was aborted — no-op
//           return;
//         }
//         console.error("Device fetch error:", err);
//         setFreezerDevices([]);
//         setSelectedFreezerDeviceId(null);
//       } finally {
//         // setFreezerDevicesLoading(false);
//         // setHasFetchedForVenue(true);
//         if (!isPolling) {
//           setIsInitialDevicesLoad(false);
//           setIsContextChanging(false);
//         }
//       }
//     };

//     fetchDevices(false); // initial / venue change fetch

//     intervalId = setInterval(() => {
//       fetchDevices(true); // polling fetch
//     }, POLL_MS);

//     return () => {
//       mounted = false;
//       if (intervalId) clearInterval(intervalId);
//       controller.abort(); // cancel pending fetch
//     };
//     // intentionally not including selectedFreezerDeviceId to avoid effect loop when we set it
//   }, [selectedVenueId, token, isDesktop]);

//   // -------------------------
//   // simple handlers (kept minimal)
//   // -------------------------

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };


//   const handleFreezerDeviceSelect = (deviceId) => {
//     console.log("Card Selected")
//     setSelectedFreezerDeviceId(deviceId)
//     if (!isDesktop) setOpen(true)
//   }



//   const onOrganizationChange = (id) => {

//     const orgId = id || user?.organization;

//     // If org hasn't changed, don't clear the venue or modify URL
//     if (orgId && String(orgId) === String(selectedOrgId)) {
//       return;
//     }

//     // Show loading and mark venue-fetch as not-done for the new org
//     // setHasFetchedForVenue(false);
//     // setFreezerDevicesLoading(true);
//     setIsContextChanging(true);
//     setSelectedOrgId(id || user?.organization)
//     setSelectedVenueId("")
//     // remove ?venue from URL
//     const sp = new URLSearchParams(location.search)
//     if (sp.get("venue")) {
//       sp.delete("venue")
//       navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true })
//     }
//   }

//   const onVenueChange = (id) => {

//     if (String(id) === String(selectedVenueId)) return;
//     setIsContextChanging(true);   // 🔥 ADD THIS

//     setSelectedVenueId(id)
//     const basePath = location.pathname.split("?")[0]
//     if (id) navigate(`${basePath}?venue=${id}`, { replace: false })
//     else navigate(basePath, { replace: false })
//   }


//   // NEW EFFECT: poll Influx for the last timestamp of all devices (non-blocking)
// useEffect(() => {
//   let mounted = true;
//   const controller = new AbortController();
//   const signal = controller.signal;
//   let intervalId = null;

//   // if no devices, clear state
//   if (!freezerDevices || freezerDevices.length === 0) {
//     setDeviceOnlineMap({});
//     setDeviceLastUpdateMap({});
//     return () => {};
//   }

//   // Influx envs (same names used in DownloadModal)
//   const influxUrl = import.meta.env.VITE_INFLUX_URL;
//   const influxToken = import.meta.env.VITE_INFLUX_TOKEN;
//   const influxOrg = import.meta.env.VITE_INFLUX_ORG;
//   const influxBucket = "Odour";

//   // Skip if Influx not configured — don't block main UI
//   if (!influxUrl || !influxToken || !influxOrg || !influxBucket) {
//     console.warn("Influx env vars not set; skipping LED polling.");
//     return () => {};
//   }

//   const client = new InfluxDB({ url: influxUrl, token: influxToken });
//   const queryApi = client.getQueryApi(influxOrg);

//   const runQueryForAllDevices = async () => {
//     try {
//       // gather measurement names (assumes measurement names === deviceId)
//       // const deviceIds = freezerDevices.map(d => String(d._id ?? d.id ?? d.deviceId)).filter(Boolean);
//       // use deviceId only for Influx queries
// const deviceIds = freezerDevices.map(d => String(d.deviceId).trim()).filter(Boolean);
// console.log("LED DEBUG: deviceIds for influx:", deviceIds);

//       if (!deviceIds.length) return;

//       // build a filter "r._measurement == "id1" or r._measurement == "id2" ..."
//       const measureFilter = deviceIds.map(id => `r._measurement == "${id}"`).join(" or ");

//       console.log("LED DEBUG: measureFilter =", measureFilter);


//       // Use a relative range which covers recent data (here we use 30d - safe fallback)
//       // last() will return the last record per "group" (we'll group by _measurement implicitly)
//       const flux = `
// from(bucket: "${influxBucket}")
//   |> range(start: -30d)
//   |> filter(fn: (r) => ${measureFilter})
//   |> last()
//   |> keep(columns: ["_measurement", "_time"])
// `;


// console.log("LED DEBUG: flux query:\n", flux);

//       // NOTE: collectRows returns an array of rows; each row should have _measurement and _time
//       const rows = await queryApi.collectRows(flux);
//       console.log("LED DEBUG: influx rows:", rows);
//       if (!mounted) return;

//       // build maps
//       const lastMap = {};
//       for (const r of rows) {
//         // r._measurement and r._time expected
//         const m = r._measurement || r.measurement || r._measurement;
//         const t = r._time || r._time; // can be string or Date; we'll keep ISO
//         if (!m) continue;
//         // Normalize time to ISO string
//         const timeISO = (typeof t === "string") ? t : (t instanceof Date ? t.toISOString() : String(t));
//         lastMap[String(m)] = timeISO;
//       }

//       console.log("LED DEBUG: lastMap (measurement -> _time):", lastMap);


//       // compute online/offline from threshold (1.5 hours)
//       const thresholdMs = Date.now() - 1.5 * 60 * 60 * 1000; // now - 1.5 hours

//       console.log("LED DEBUG: thresholdMs (ms) =", thresholdMs, " =>", new Date(thresholdMs).toISOString());
      
//       const onlineMap = {};
//       deviceIds.forEach((id) => {
//         const timeISO = lastMap[id];
//         if (!timeISO) {
//           onlineMap[id] = false;
//         } else {
//           const ts = new Date(timeISO).getTime();
//           onlineMap[id] = Number.isFinite(ts) && ts >= thresholdMs;
//         }
//       });

//       // update state in a single set to minimize re-renders
//       setDeviceLastUpdateMap(prev => ({ ...prev, ...lastMap }));
//       console.log("LED DEBUG: onlineMap computed:", onlineMap);

//       setDeviceOnlineMap(prev => ({ ...prev, ...onlineMap }));

//     } catch (err) {
//       // do not throw; only log. This should not affect device rendering.
//       if (err.name === "AbortError") return;
//       console.error("Influx LED polling error:", err);
//     }
//   };

//   // Run immediately (but non-blocking) then start interval
//   runQueryForAllDevices();
//   intervalId = setInterval(() => {
//     runQueryForAllDevices();
//   }, POLL_MS); // reuse existing poll interval or change if you prefer

//   return () => {
//     mounted = false;
//     if (intervalId) clearInterval(intervalId);
//     controller.abort();
//   };
// }, [freezerDevices, POLL_MS]); // re-run when devices list changes


//   // -------------------------
//   // render states for loading / error
//   // -------------------------
//   if (loading) {
//     return (
//       <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
//         <div className="flex justify-center items-center w-full h-64">
//           {/* <div className="text-lg text-gray-600">Loading organizations...</div> */}
//         </div>
//       </div>
//     )
//   }





//   // -------------------------
//   // main JSX (kept same layout)
//   // -------------------------
//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       {/* Main Content Area */}
//       <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">

//         <>
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             {
//               !isDesktopForIcon && <img src="/logo-half.png" alt="IOTFIY LOGO" className="w-auto h-[40px]" />
//             }


//             <div className="  sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[25rem]">
//               {/* <p className="text-sm text-[#64748B] min-w-[250px] font-medium">Organization</p> */}
//               {user?.role === "admin" ? (
//                 <OrganizationSelect
//                   value={selectedOrgId}
//                   onChange={onOrganizationChange}
//                   className="mt-1"
//                 />
//               ) : <>
//                 <p className="text-gray-500">Organization</p>
//                 <h3 className="text-gray-700 font-bold capitalize">{orgNameForTop || ""}</h3>
//               </>}
//             </div>

//             <div className="flex items-center  ml-5 sm:ml-auto  ">
//               <VenueSelect
//                 organizationId={selectedOrgId || user?.organization}
//                 value={selectedVenueId}
//                 onChange={onVenueChange}
//                 className=""
//                 excludeFirstN={user?.role === "user" ? 3 : 0}
//               />
//             </div>
//           </div>



//           {/* Freezer Device Cards area */}
//           <div className="flex-1 min-h-0">
//             <div className="freezer-cards-container custom-scrollbar">
//               {(isInitialDevicesLoad || isContextChanging) ? (
//                 <div className="freezer-cards-grid freezer-cards-container">
//                   {Array.from({ length: 4 }).map((_, index) => (
//                     <DeviceSkeleton key={index} />
//                   ))}
//                 </div>
//               ) : freezerDevices.length === 0 ? (
//                 // No devices state (only shown when not loading)
//                 <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                   <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <p className="text-lg font-medium">No Freezer Devices Found</p>
//                   <p className="text-sm">Add some freezer devices to get started</p>
//                 </div>
//               ) : (
//                 // Devices present
//                 <div className="freezer-cards-grid freezer-cards-container">
//                   {/* {freezerDevices.map((device) => (
          
//                 <FreezerDeviceCard
//                     key={device._id ?? device.id}
//                     deviceId={device.deviceId}
//                     ambientTemperature={device?.AmbientData?.temperature ?? device.ambientTemperature}
//                     freezerTemperature={device?.FreezerData?.temperature ?? device.freezerTemperature}
//                     batteryLow={device?.batteryAlert ?? device?.batteryLow ?? false}
//                     refrigeratorAlert={device?.refrigeratorAlert ?? false}
//                     onCardSelect={() => handleFreezerDeviceSelect(device._id ?? device.id)}
//                     isSelected={(device._id ?? device.id) === selectedFreezerDeviceId}
//                     espHumidity={device?.espHumidity}
//                     espTemprature={device?.espTemprature}
//                     temperatureAlert = {device?.temperatureAlert}
//                     humidityAlert={device?.humidityAlert}
//                     odourAlert={device?.odourAlert}
//                     espOdour={device?.espOdour}
//                     // NEW:
//                     deviceType={device?.deviceType}
//                     espAQI={device?.espAQI}
//                     aqiAlert={device?.aqiAlert}
//                     espGL={device?.espGL}
//                     glAlert={device?.glAlert}
//                   />



//               ))} */}

//                   {freezerDevices.map((device) => {
//                     // const idKey = device._id ?? device.id ?? device.deviceId;
//                     // const isOnline = Boolean(deviceOnlineMap[String(idKey)]); // default false if not found
//                     // const lastUpdateISO = deviceLastUpdateMap[String(idKey)] || null;


//                     // keep Mongo _id for React key/selection behaviour
//                     const idKey = device._id ?? device.id ?? device.deviceId;

//                     // use device.deviceId (Influx measurement) to look up the LED state
//                     const influxKey = String(device.deviceId);
//                     const isOnline = Boolean(deviceOnlineMap[influxKey]); // deviceOnlineMap keys are deviceId
//                     const lastUpdateISO = deviceLastUpdateMap[influxKey] || null;

//                     const commonProps = {
//                       key: idKey,
//                       deviceId: device.deviceId,
//                       ambientTemperature: device?.AmbientData?.temperature ?? device.ambientTemperature,
//                       freezerTemperature: device?.FreezerData?.temperature ?? device.freezerTemperature,
//                       onCardSelect: () => handleFreezerDeviceSelect(idKey),
//                       isSelected: String(idKey) === String(selectedFreezerDeviceId),
//                       espHumidity: device?.espHumidity,
//                       espTemprature: device?.espTemprature,
//                       temperatureAlert: device?.temperatureAlert,
//                       humidityAlert: device?.humidityAlert,
//                       odourAlert: device?.odourAlert,
//                       espOdour: device?.espOdour,
//                       isOnline,
//                       lastUpdateISO,
//                     };

//                     if (device?.deviceType === "AQIMD") {
//                       // render the dedicated AQI card
//                       return (
//                         <AQIDeviceCard
//                           {...commonProps}
//                           espAQI={device?.espAQI}
//                           aqiAlert={device?.aqiAlert}
//                         />
//                       );
//                     }

//                     if (device?.deviceType === "TMD") {
//                       // render the dedicated AQI card
//                       return (
//                         <TemperatureHumidityDeviceCard
//                           {...commonProps}
//                           pollHitTime={pollHitTime}
//                         />
//                       );
//                     }


//                     if (device?.deviceType === "OMD") {
//                       return (
//                         <OdourDeviceCard
//                           {...commonProps}
//                           espOdour={device?.espOdour}
//                           odourAlert={device?.odourAlert}
//                         />
//                       );
//                     }

//                     if (device?.deviceType === "GLMD") {
//                       return (
//                         <GasLeakageDeviceCard
//                           {...commonProps}
//                           espGL={device?.espGL}
//                           glAlert={device?.glAlert}
//                         />
//                       );
//                     }


//                     // non-AQI types use the existing FreezerDeviceCard
//                     return (
//                       <FreezerDeviceCard
//                         {...commonProps}
//                         deviceType={device?.deviceType}
//                         espAQI={device?.espAQI}
//                         aqiAlert={device?.aqiAlert}
//                         espGL={device?.espGL}
//                         glAlert={device?.glAlert}
//                         batteryLow={device?.batteryLow}
//                         refrigeratorAlert={device?.refrigeratorAlert}
//                       />
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           <AlertsPanel organizationId={selectedOrgId} pollInterval={POLL_MS} />
//           {/* <AlertsPanel organizationId={selectedOrgId} pollInterval={2 * 1000} /> */}
//         </>
//         {/* )} */}

//       </div>

//       {isDesktop ? (
//         //     <DashboardRightPanel
//         //   freezerDevices={freezerDevices}
//         //   selectedFreezerDeviceId={selectedFreezerDeviceId}
//         //   selectedOrgId={selectedOrgId}

//         // />  

//         <DashboardRightPanel
//           freezerDevices={freezerDevices}
//           selectedFreezerDeviceId={selectedFreezerDeviceId}
//           selectedOrgId={selectedOrgId}
//           pollInterval={POLL_MS}
//         />

//       ) : (
//         <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
//           {/* <DashboardRightPanel
//       freezerDevices={freezerDevices}
//       selectedFreezerDeviceId={selectedFreezerDeviceId}
//       selectedOrgId={selectedOrgId}
//       closeIcon={true}
//        onClose={toggleDrawer(false)}
//     /> */}

//           <DashboardRightPanel
//             freezerDevices={freezerDevices}
//             selectedFreezerDeviceId={selectedFreezerDeviceId}
//             selectedOrgId={selectedOrgId}
//             closeIcon={true}
//             onClose={toggleDrawer(false)}
//             pollInterval={POLL_MS}
//           />

//         </Drawer>
//       )}
//     </div>
//   )
// }















// // Code for peresistency in Dashboard for Url and page not change on reload for selected org and venue assuring all cases for Admin, Manager, User 
// // src/pages/Dashboard.jsx
// import React, { useState, useEffect, useMemo } from "react";
// import FreezerDeviceCard from "./FreezerDeviceCard";
// import OrganizationSelect from "./OrganizationSelect";
// import VenueSelect from "./VenueSelect";
// import AlertsPanel from "./AlertsPanel";
// import "../../styles/pages/Dashboard/dashboard-styles.css";
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css";
// import { useStore } from "../../contexts/storecontexts";
// import { useLocation, useNavigate } from "react-router-dom";
// import DashboardRightPanel from "../../components/DashboardRightPanel";
// import { Drawer, useMediaQuery } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrganizationByUserID } from "../../slices/OrganizationSlice";
// import DeviceSkeleton from "./DeviceSkeleton";
// import AQIDeviceCard from "./AQIDeviceCard";
// import TemperatureHumidityDeviceCard from "./TemperatureHumidityDeviceCard";
// import OdourDeviceCard from "./OdourDeviceCard";
// import GasLeakageDeviceCard from "./GasLeakageDeviceCard";
// import { InfluxDB } from "@influxdata/influxdb-client";

// // NEW import
// import { useOrgVenue } from "../../contexts/OrgVenueContext";

// const mockFreezerDevices = [];

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// export default function Dashboard() {
//   const { user, getToken } = useStore();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = getToken();

//   // Context for org + venue
//   const { organization: ctxOrg, venue: ctxVenue, setOrganization, setVenue, clearVenue } = useOrgVenue();

//   // your existing state
//   const [organizations, setOrganizations] = useState([]);
//   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices);
//   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrgId, setSelectedOrgId] = useState("");
//   const [selectedVenueId, setSelectedVenueId] = useState("");
//   const [orgNameForTop, setOrgNameForTop] = useState();
//   const [open, setOpen] = React.useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isDesktopForIcon = useMediaQuery("(min-width:760px)");
//   const autoSelectedForVenueRef = React.useRef({});
//   const [isInitialDevicesLoad, setIsInitialDevicesLoad] = useState(true);
//   const [isContextChanging, setIsContextChanging] = useState(false);
//   const [pollHitTime, setPollHitTime] = useState(Date.now());
//   const [deviceOnlineMap, setDeviceOnlineMap] = useState({});
//   const [deviceLastUpdateMap, setDeviceLastUpdateMap] = useState({});

//   const hasVenueInUrl = useMemo(() => {
//     const sp = new URLSearchParams(location.search);
//     return Boolean(sp.get("venue"));
//   }, [location.search]);

//   // -------------------------
//   // existing helpers...
//   // -------------------------
//   const getAllDevicesInOrganization = (org) => {
//     let devices = [...(org.devices || [])];
//     if (org.subOrganizations) {
//       org.subOrganizations.forEach((subOrg) => {
//         devices = devices.concat(getAllDevicesInOrganization(subOrg));
//       });
//     }
//     return devices;
//   };

//   const findOrganizationById = (orgs, id) => {
//     for (const org of orgs) {
//       if (String(org.id) === String(id) || String(org._id) === String(id)) return org;
//       if (org.subOrganizations) {
//         const found = findOrganizationById(org.subOrganizations, id);
//         if (found) return found;
//       }
//     }
//     return null;
//   };

//   const selectedOrganizationData = useMemo(() => {
//     if (!selectedOrgId || organizations.length === 0) return null;
//     const org = findOrganizationById(organizations, selectedOrgId);
//     if (!org) return null;
//     const allDevices = getAllDevicesInOrganization(org);
//     return {
//       organizationName: org.name || org.organization_name || selectedOrgId,
//       deviceCount: allDevices.length,
//     };
//   }, [selectedOrgId, organizations]);

//   // EFFECT: fetchOrganizations placeholder (unchanged)
//   useEffect(() => {
//     const fetchOrganizations = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const mockOrgs = [];
//         setOrganizations(mockOrgs);
//       } catch (err) {
//         setError(err.message || "Failed to load organizations");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrganizations();
//   }, []);

//   const dispatch = useDispatch();

//   // polling interval helper (unchanged)
//   const getPollingInterval = () => {
//     if (!user?.timer) return 5 * 60 * 1000;
//     const match = /^(\d+)(s|m)$/.exec(user.timer.trim());
//     if (!match) return 5 * 60 * 1000;
//     const value = parseInt(match[1], 10);
//     const unit = match[2];
//     if (unit === "s") {
//       return Math.min(Math.max(value, 0), 60) * 1000;
//     } else if (unit === "m") {
//       return Math.min(Math.max(value, 0), 60) * 60 * 1000;
//     }
//     return 5 * 60 * 1000;
//   };

//   const POLL_MS = getPollingInterval();

//   useEffect(() => {
//     if (user?.role !== "admin" && user?._id) {
//       dispatch(fetchOrganizationByUserID(user._id))
//         .unwrap()
//         .then((org) => {
//           console.log("Organization object:", org);
//           setOrgNameForTop(org?.name);
//         })
//         .catch((err) => {
//           console.log("Failed to fetch organization:", err);
//         });
//     }
//   }, [dispatch, user]);

//   // -------------------------
//   // SYNC context -> local state on mount / context change
//   // This ensures after refresh we show labels immediately
//   // -------------------------
//   useEffect(() => {
//     if (ctxOrg?.id) {
//       if (String(ctxOrg.id) !== String(selectedOrgId)) setSelectedOrgId(String(ctxOrg.id));
//       if (ctxOrg.name && !orgNameForTop) setOrgNameForTop(ctxOrg.name);
//     }
//     // if context org was cleared, clear local
//     if (!ctxOrg && selectedOrgId) {
//       setSelectedOrgId("");
//       setOrgNameForTop(undefined);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [ctxOrg?.id, ctxOrg?.name]);

//   useEffect(() => {
//     if (ctxVenue?.id) {
//       if (String(ctxVenue.id) !== String(selectedVenueId)) setSelectedVenueId(String(ctxVenue.id));
//     }
//     if (!ctxVenue && selectedVenueId) {
//       setSelectedVenueId("");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [ctxVenue?.id]);

//   // -------------------------
//   // URL -> venue: when ?venue=... exists we fetch its org and set context (so selects show names)
//   // This is your existing effect, now setting context
//   // -------------------------
//   useEffect(() => {
//     const sp = new URLSearchParams(location.search);
//     const venueFromUrl = sp.get("venue") || "";

//     if (venueFromUrl === selectedVenueId) return;

//     setIsContextChanging(true);

//     if (!venueFromUrl) {
//       setSelectedVenueId("");
//       // also clear context venue
//       setVenue(null);
//       setIsContextChanging(false);
//       return;
//     }

//     setSelectedVenueId(venueFromUrl);

//     (async () => {
//       try {
//         const res = await fetch(`${BASE}/venue/${venueFromUrl}`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });
//         if (!res.ok) {
//           console.warn("Venue fetch failed", res.status);
//           setIsContextChanging(false);
//           return;
//         }
//         const data = await res.json();
//         const venue = data?.venue ?? data;
//         const orgId = venue?.organization ?? venue?.org ?? venue?.organizationId ?? null;
//         const venueName = venue?.name ?? venue?.venueName ?? venue?.venue_name ?? String(venueFromUrl);

//         // set venue in context (so VenueSelect can show name even before its own fetch completes)
//         setVenue({ id: String(venueFromUrl), name: venueName });

//         // if venue holds organization id, set that in context too
//         if (orgId) {
//           // try to get org name quickly (if you have organizations list)
//           const orgObj = organizations.find((o) => String(o._id ?? o.id ?? o) === String(orgId));
//           const orgName = orgObj?.name ?? org?.organization_name ?? orgNameForTop ?? undefined;
//           setOrganization({ id: String(orgId), name: orgName });
//           // also update local selectedOrgId so OrganizationSelect receives the correct value prop
//           setSelectedOrgId(String(orgId));
//         }
//       } catch (err) {
//         console.warn("Could not fetch venue->org", err);
//       } finally {
//         setIsContextChanging(false);
//       }
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.search]);

//   // -------------------------
//   // Devices fetch effect (unchanged)
//   // -------------------------
//   useEffect(() => {
//     if (!selectedVenueId) {
//       setFreezerDevices([]);
//       setSelectedFreezerDeviceId(null);
//       autoSelectedForVenueRef.current = {};
//       return;
//     }

//     let mounted = true;
//     let intervalId = null;
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const fetchDevices = async (isPolling = false) => {
//       const hitTime = Date.now();
//       setPollHitTime(hitTime);
//       try {
//         const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//           method: "GET",
//           credentials: "include",
//           signal,
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         const data = await res.json();

//         if (!mounted) return;

//         if (res.ok) {
//           const devices = Array.isArray(data.devices) ? data.devices : data.devices ? [data.devices] : [];

//           setFreezerDevices((prevDevices) => {
//             const prevMap = new Map(prevDevices.map((d) => [String(d._id ?? d.id ?? d.deviceId), d]));
//             return devices.map((newDevice) => {
//               const id = String(newDevice._id ?? newDevice.id ?? newDevice.deviceId);
//               const oldDevice = prevMap.get(id);
//               if (!oldDevice) return newDevice;
//               return {
//                 ...oldDevice,
//                 ambientTemperature: newDevice.ambientTemperature ?? oldDevice.ambientTemperature,
//                 freezerTemperature: newDevice.freezerTemperature ?? oldDevice.freezerTemperature,
//                 espHumidity: newDevice.espHumidity ?? oldDevice.espHumidity,
//                 espTemprature: newDevice.espTemprature ?? oldDevice.espTemprature,
//                 espOdour: newDevice.espOdour ?? oldDevice.espOdour,
//                 espAQI: newDevice.espAQI ?? oldDevice.espAQI,
//                 espGL: newDevice.espGL ?? oldDevice.espGL,
//                 temperatureAlert: newDevice.temperatureAlert ?? oldDevice.temperatureAlert,
//                 humidityAlert: newDevice.humidityAlert ?? oldDevice.humidityAlert,
//                 odourAlert: newDevice.odourAlert ?? oldDevice.odourAlert,
//                 aqiAlert: newDevice.aqiAlert ?? oldDevice.aqiAlert,
//                 glAlert: newDevice.glAlert ?? oldDevice.glAlert,
//                 batteryLow: newDevice.batteryLow ?? oldDevice.batteryLow,
//                 refrigeratorAlert: newDevice.refrigeratorAlert ?? oldDevice.refrigeratorAlert,
//                 lastUpdateTime: newDevice.lastUpdateTime ?? oldDevice.lastUpdateTime,
//               };
//             });
//           });

//           if (isDesktop && devices && devices.length > 0) {
//             if (!autoSelectedForVenueRef.current[selectedVenueId]) {
//               const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;
//               if (firstId) {
//                 setSelectedFreezerDeviceId(String(firstId));
//                 autoSelectedForVenueRef.current[selectedVenueId] = true;
//               }
//             }
//           }

//           if (!isDesktop && !isPolling) {
//             setSelectedFreezerDeviceId(null);
//           }
//         } else {
//           setFreezerDevices([]);
//           setSelectedFreezerDeviceId(null);
//           console.error("Device fetch error:", data?.message);
//         }
//       } catch (err) {
//         if (!mounted) return;
//         if (err.name === "AbortError") return;
//         console.error("Device fetch error:", err);
//         setFreezerDevices([]);
//         setSelectedFreezerDeviceId(null);
//       } finally {
//         if (!isPolling) {
//           setIsInitialDevicesLoad(false);
//           setIsContextChanging(false);
//         }
//       }
//     };

//     fetchDevices(false);

//     intervalId = setInterval(() => {
//       fetchDevices(true);
//     }, POLL_MS);

//     return () => {
//       mounted = false;
//       if (intervalId) clearInterval(intervalId);
//       controller.abort();
//     };
//   }, [selectedVenueId, token, isDesktop, POLL_MS]);

//   // -------------------------
//   // Event handlers (UPDATED to set context)
//   // -------------------------
//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const handleFreezerDeviceSelect = (deviceId) => {
//     console.log("Card Selected");
//     setSelectedFreezerDeviceId(deviceId);
//     if (!isDesktop) setOpen(true);
//   };

//   // onOrganizationChange now accepts (id, name) but will also work with old signature
//   const onOrganizationChange = (id, name) => {
//     const orgId = id || user?.organization;

//     if (orgId && String(orgId) === String(selectedOrgId)) {
//       return;
//     }

//     setIsContextChanging(true);
//     setSelectedOrgId(orgId || user?.organization);
//     setSelectedVenueId("");

//     // update context: setOrganization clears venue automatically if org changed
//     setOrganization({ id: String(orgId), name: name ?? undefined });
//     // also clear saved venue (context) so the new org takes effect
//     clearVenue();

//     // remove ?venue from URL
//     const sp = new URLSearchParams(location.search);
//     if (sp.get("venue")) {
//       sp.delete("venue");
//       navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true });
//     }

//     setIsContextChanging(false);
//   };

//   // onVenueChange accepts (id, name) — if name provided we set it directly in context (faster)
//   const onVenueChange = async (id, name) => {
//     if (String(id) === String(selectedVenueId)) return;
//     setIsContextChanging(true);

//     setSelectedVenueId(id);
//     const basePath = location.pathname.split("?")[0];
//     if (id) navigate(`${basePath}?venue=${id}`, { replace: false });
//     else navigate(basePath, { replace: false });

//     // If select passed name, use it; otherwise fetch venue name
//     if (name) {
//       setVenue({ id: String(id), name });
//       setIsContextChanging(false);
//       return;
//     }

//     try {
//       const res = await fetch(`${BASE}/venue/${id}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const venueObj = data?.venue ?? data;
//         const vName = venueObj?.name ?? venueObj?.venueName ?? String(id);
//         setVenue({ id: String(id), name: vName });
//         // optionally set org if returned
//         const orgId = venueObj?.organization ?? venueObj?.org ?? venueObj?.organizationId ?? null;
//         if (orgId) {
//           setOrganization({ id: String(orgId), name: undefined });
//           setSelectedOrgId(String(orgId));
//         }
//       } else {
//         setVenue({ id: String(id), name: String(id) });
//       }
//     } catch (err) {
//       console.warn("Failed to fetch venue details", err);
//       setVenue({ id: String(id), name: String(id) });
//     } finally {
//       setIsContextChanging(false);
//     }
//   };

//   // ======= rest of file: influx polling + render (unchanged) ========
//   // (I didn't change the Influx effect or device rendering code except to keep existing functionality)
//   useEffect(() => {
//     let mounted = true;
//     const controller = new AbortController();
//     const signal = controller.signal;
//     let intervalId = null;

//     if (!freezerDevices || freezerDevices.length === 0) {
//       setDeviceOnlineMap({});
//       setDeviceLastUpdateMap({});
//       return () => {};
//     }

//     const influxUrl = import.meta.env.VITE_INFLUX_URL;
//     const influxToken = import.meta.env.VITE_INFLUX_TOKEN;
//     const influxOrg = import.meta.env.VITE_INFLUX_ORG;
//     const influxBucket = "Odour";

//     if (!influxUrl || !influxToken || !influxOrg || !influxBucket) {
//       console.warn("Influx env vars not set; skipping LED polling.");
//       return () => {};
//     }

//     const client = new InfluxDB({ url: influxUrl, token: influxToken });
//     const queryApi = client.getQueryApi(influxOrg);

//     const runQueryForAllDevices = async () => {
//       try {
//         const deviceIds = freezerDevices.map((d) => String(d.deviceId).trim()).filter(Boolean);
//         if (!deviceIds.length) return;
//         const measureFilter = deviceIds.map((id) => `r._measurement == "${id}"`).join(" or ");
//         const flux = `
// from(bucket: "${influxBucket}")
//   |> range(start: -30d)
//   |> filter(fn: (r) => ${measureFilter})
//   |> last()
//   |> keep(columns: ["_measurement", "_time"])
// `;
//         const rows = await queryApi.collectRows(flux);
//         if (!mounted) return;
//         const lastMap = {};
//         for (const r of rows) {
//           const m = r._measurement || r.measurement || r._measurement;
//           const t = r._time || r._time;
//           if (!m) continue;
//           const timeISO = typeof t === "string" ? t : t instanceof Date ? t.toISOString() : String(t);
//           lastMap[String(m)] = timeISO;
//         }
//         const thresholdMs = Date.now() - 1.5 * 60 * 60 * 1000;
//         const onlineMap = {};
//         deviceIds.forEach((id) => {
//           const timeISO = lastMap[id];
//           if (!timeISO) {
//             onlineMap[id] = false;
//           } else {
//             const ts = new Date(timeISO).getTime();
//             onlineMap[id] = Number.isFinite(ts) && ts >= thresholdMs;
//           }
//         });
//         setDeviceLastUpdateMap((prev) => ({ ...prev, ...lastMap }));
//         setDeviceOnlineMap((prev) => ({ ...prev, ...onlineMap }));
//       } catch (err) {
//         if (err.name === "AbortError") return;
//         console.error("Influx LED polling error:", err);
//       }
//     };

//     runQueryForAllDevices();
//     intervalId = setInterval(() => {
//       runQueryForAllDevices();
//     }, POLL_MS);

//     return () => {
//       mounted = false;
//       if (intervalId) clearInterval(intervalId);
//       controller.abort();
//     };
//   }, [freezerDevices, POLL_MS]);

//   if (loading) {
//     return (
//       <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
//         <div className="flex justify-center items-center w-full h-64" />
//       </div>
//     );
//   }

//   // Render (unchanged except passing externalLabel props to selects)
//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">
//         <>
//           <div className="flex justify-between items-center mb-6">
//             {!isDesktopForIcon && <img src="/logo-half.png" alt="IOTFIY LOGO" className="w-auto h-[40px]" />}

//             <div className="  sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[25rem]">
//               {user?.role === "admin" ? (
//                 <OrganizationSelect
//                   value={selectedOrgId}
//                   onChange={onOrganizationChange}
//                   className="mt-1"
//                   disableAutoSelect={hasVenueInUrl}
//                   // show friendly label from context while org list loads
//                   externalLabel={ctxOrg?.name ?? orgNameForTop}
//                 />
//               ) : (
//                 <>
//                   <p className="text-gray-500">Organization</p>
//                   <h3 className="text-gray-700 font-bold capitalize">{orgNameForTop || ""}</h3>
//                 </>
//               )}
//             </div>

//             <div className="flex items-center  ml-5 sm:ml-auto  ">
//               <VenueSelect
//                 organizationId={selectedOrgId || user?.organization}
//                 value={selectedVenueId}
//                 onChange={onVenueChange}
//                 className=""
//                 excludeFirstN={user?.role === "user" ? 3 : 0}
//                 externalLabel={ctxVenue?.name}
//               />
//             </div>
//           </div>

//           <div className="flex-1 min-h-0">
//             <div className="freezer-cards-container custom-scrollbar">
//               {(isInitialDevicesLoad || isContextChanging) ? (
//                 <div className="freezer-cards-grid freezer-cards-container">
//                   {Array.from({ length: 4 }).map((_, index) => (
//                     <DeviceSkeleton key={index} />
//                   ))}
//                 </div>
//               ) : freezerDevices.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                   <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <p className="text-lg font-medium">No Freezer Devices Found</p>
//                   <p className="text-sm">Add some freezer devices to get started</p>
//                 </div>
//               ) : (
//                 <div className="freezer-cards-grid freezer-cards-container">
//                   {freezerDevices.map((device) => {
//                     const idKey = device._id ?? device.id ?? device.deviceId;
//                     const influxKey = String(device.deviceId);
//                     const isOnline = Boolean(deviceOnlineMap[influxKey]);
//                     const lastUpdateISO = deviceLastUpdateMap[influxKey] || null;

//                     const commonProps = {
//                       key: idKey,
//                       deviceId: device.deviceId,
//                       ambientTemperature: device?.AmbientData?.temperature ?? device.ambientTemperature,
//                       freezerTemperature: device?.FreezerData?.temperature ?? device.freezerTemperature,
//                       onCardSelect: () => handleFreezerDeviceSelect(idKey),
//                       isSelected: String(idKey) === String(selectedFreezerDeviceId),
//                       espHumidity: device?.espHumidity,
//                       espTemprature: device?.espTemprature,
//                       temperatureAlert: device?.temperatureAlert,
//                       humidityAlert: device?.humidityAlert,
//                       odourAlert: device?.odourAlert,
//                       espOdour: device?.espOdour,
//                       isOnline,
//                       lastUpdateISO,
//                     };

//                     if (device?.deviceType === "AQIMD") {
//                       return <AQIDeviceCard {...commonProps} espAQI={device?.espAQI} aqiAlert={device?.aqiAlert} />;
//                     }

//                     if (device?.deviceType === "TMD") {
//                       return <TemperatureHumidityDeviceCard {...commonProps} pollHitTime={pollHitTime} />;
//                     }

//                     if (device?.deviceType === "OMD") {
//                       return <OdourDeviceCard {...commonProps} espOdour={device?.espOdour} odourAlert={device?.odourAlert} />;
//                     }

//                     if (device?.deviceType === "GLMD") {
//                       return <GasLeakageDeviceCard {...commonProps} espGL={device?.espGL} glAlert={device?.glAlert} />;
//                     }

//                     return (
//                       <FreezerDeviceCard
//                         {...commonProps}
//                         deviceType={device?.deviceType}
//                         espAQI={device?.espAQI}
//                         aqiAlert={device?.aqiAlert}
//                         espGL={device?.espGL}
//                         glAlert={device?.glAlert}
//                         batteryLow={device?.batteryLow}
//                         refrigeratorAlert={device?.refrigeratorAlert}
//                       />
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           <AlertsPanel organizationId={selectedOrgId} pollInterval={POLL_MS} />
//         </>
//       </div>

//       {isDesktop ? (
//         <DashboardRightPanel freezerDevices={freezerDevices} selectedFreezerDeviceId={selectedFreezerDeviceId} selectedOrgId={selectedOrgId} pollInterval={POLL_MS} />
//       ) : (
//         <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
//           <DashboardRightPanel freezerDevices={freezerDevices} selectedFreezerDeviceId={selectedFreezerDeviceId} selectedOrgId={selectedOrgId} closeIcon={true} onClose={toggleDrawer(false)} pollInterval={POLL_MS} />
//         </Drawer>
//       )}
//     </div>
//   );
// }










// // Working on Three States of LED on Devices
// // Code for peresistency in Dashboard for Url and page not change on reload for selected org and venue assuring all cases for Admin, Manager, User 
// // src/pages/Dashboard.jsx
// import React, { useState, useEffect, useMemo } from "react";
// import FreezerDeviceCard from "./FreezerDeviceCard";
// import OrganizationSelect from "./OrganizationSelect";
// import VenueSelect from "./VenueSelect";
// import AlertsPanel from "./AlertsPanel";
// import "../../styles/pages/Dashboard/dashboard-styles.css";
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css";
// import { useStore } from "../../contexts/storecontexts";
// import { useLocation, useNavigate } from "react-router-dom";
// import DashboardRightPanel from "../../components/DashboardRightPanel";
// import { Drawer, useMediaQuery } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrganizationByUserID } from "../../slices/OrganizationSlice";
// import DeviceSkeleton from "./DeviceSkeleton";
// import AQIDeviceCard from "./AQIDeviceCard";
// import TemperatureHumidityDeviceCard from "./TemperatureHumidityDeviceCard";
// import OdourDeviceCard from "./OdourDeviceCard";
// import GasLeakageDeviceCard from "./GasLeakageDeviceCard";
// import { InfluxDB } from "@influxdata/influxdb-client";

// // NEW import
// import { useOrgVenue } from "../../contexts/OrgVenueContext";

// const mockFreezerDevices = [];

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// export default function Dashboard() {
//   const { user, getToken } = useStore();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = getToken();

//   // Context for org + venue
//   const { organization: ctxOrg, venue: ctxVenue, setOrganization, setVenue, clearVenue } = useOrgVenue();

//   // your existing state
//   const [organizations, setOrganizations] = useState([]);
//   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices);
//   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrgId, setSelectedOrgId] = useState("");
//   const [selectedVenueId, setSelectedVenueId] = useState("");
//   const [orgNameForTop, setOrgNameForTop] = useState();
//   const [open, setOpen] = React.useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   const isDesktopForIcon = useMediaQuery("(min-width:760px)");
//   const autoSelectedForVenueRef = React.useRef({});
//   const [isInitialDevicesLoad, setIsInitialDevicesLoad] = useState(true);
//   const [isContextChanging, setIsContextChanging] = useState(false);
//   const [pollHitTime, setPollHitTime] = useState(Date.now());
//   const [deviceOnlineMap, setDeviceOnlineMap] = useState({});
//   const [deviceLastUpdateMap, setDeviceLastUpdateMap] = useState({});

//   const hasVenueInUrl = useMemo(() => {
//     const sp = new URLSearchParams(location.search);
//     return Boolean(sp.get("venue"));
//   }, [location.search]);

//   // -------------------------
//   // existing helpers...
//   // -------------------------
//   const getAllDevicesInOrganization = (org) => {
//     let devices = [...(org.devices || [])];
//     if (org.subOrganizations) {
//       org.subOrganizations.forEach((subOrg) => {
//         devices = devices.concat(getAllDevicesInOrganization(subOrg));
//       });
//     }
//     return devices;
//   };

//   const findOrganizationById = (orgs, id) => {
//     for (const org of orgs) {
//       if (String(org.id) === String(id) || String(org._id) === String(id)) return org;
//       if (org.subOrganizations) {
//         const found = findOrganizationById(org.subOrganizations, id);
//         if (found) return found;
//       }
//     }
//     return null;
//   };

//   const selectedOrganizationData = useMemo(() => {
//     if (!selectedOrgId || organizations.length === 0) return null;
//     const org = findOrganizationById(organizations, selectedOrgId);
//     if (!org) return null;
//     const allDevices = getAllDevicesInOrganization(org);
//     return {
//       organizationName: org.name || org.organization_name || selectedOrgId,
//       deviceCount: allDevices.length,
//     };
//   }, [selectedOrgId, organizations]);

//   // EFFECT: fetchOrganizations placeholder (unchanged)
//   useEffect(() => {
//     const fetchOrganizations = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const mockOrgs = [];
//         setOrganizations(mockOrgs);
//       } catch (err) {
//         setError(err.message || "Failed to load organizations");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrganizations();
//   }, []);

//   const dispatch = useDispatch();

//   // polling interval helper (unchanged)
//   const getPollingInterval = () => {
//     if (!user?.timer) return 5 * 60 * 1000;
//     const match = /^(\d+)(s|m)$/.exec(user.timer.trim());
//     if (!match) return 5 * 60 * 1000;
//     const value = parseInt(match[1], 10);
//     const unit = match[2];
//     if (unit === "s") {
//       return Math.min(Math.max(value, 0), 60) * 1000;
//     } else if (unit === "m") {
//       return Math.min(Math.max(value, 0), 60) * 60 * 1000;
//     }
//     return 5 * 60 * 1000;
//   };

//   const POLL_MS = getPollingInterval();

//   useEffect(() => {
//     if (user?.role !== "admin" && user?._id) {
//       dispatch(fetchOrganizationByUserID(user._id))
//         .unwrap()
//         .then((org) => {
//           console.log("Organization object:", org);
//           setOrgNameForTop(org?.name);
//         })
//         .catch((err) => {
//           console.log("Failed to fetch organization:", err);
//         });
//     }
//   }, [dispatch, user]);

//   // -------------------------
//   // SYNC context -> local state on mount / context change
//   // This ensures after refresh we show labels immediately
//   // -------------------------
//   useEffect(() => {
//     if (ctxOrg?.id) {
//       if (String(ctxOrg.id) !== String(selectedOrgId)) setSelectedOrgId(String(ctxOrg.id));
//       if (ctxOrg.name && !orgNameForTop) setOrgNameForTop(ctxOrg.name);
//     }
//     // if context org was cleared, clear local
//     if (!ctxOrg && selectedOrgId) {
//       setSelectedOrgId("");
//       setOrgNameForTop(undefined);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [ctxOrg?.id, ctxOrg?.name]);

//   useEffect(() => {
//     if (ctxVenue?.id) {
//       if (String(ctxVenue.id) !== String(selectedVenueId)) setSelectedVenueId(String(ctxVenue.id));
//     }
//     if (!ctxVenue && selectedVenueId) {
//       setSelectedVenueId("");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [ctxVenue?.id]);

//   // -------------------------
//   // URL -> venue: when ?venue=... exists we fetch its org and set context (so selects show names)
//   // This is your existing effect, now setting context
//   // -------------------------
//   useEffect(() => {
//     const sp = new URLSearchParams(location.search);
//     const venueFromUrl = sp.get("venue") || "";

//     if (venueFromUrl === selectedVenueId) return;

//     setIsContextChanging(true);

//     if (!venueFromUrl) {
//       setSelectedVenueId("");
//       // also clear context venue
//       setVenue(null);
//       setIsContextChanging(false);
//       return;
//     }

//     setSelectedVenueId(venueFromUrl);

//     (async () => {
//       try {
//         const res = await fetch(`${BASE}/venue/${venueFromUrl}`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });
//         if (!res.ok) {
//           console.warn("Venue fetch failed", res.status);
//           setIsContextChanging(false);
//           return;
//         }
//         const data = await res.json();
//         const venue = data?.venue ?? data;
//         const orgId = venue?.organization ?? venue?.org ?? venue?.organizationId ?? null;
//         const venueName = venue?.name ?? venue?.venueName ?? venue?.venue_name ?? String(venueFromUrl);

//         // set venue in context (so VenueSelect can show name even before its own fetch completes)
//         setVenue({ id: String(venueFromUrl), name: venueName });

//         // if venue holds organization id, set that in context too
//         if (orgId) {
//           // try to get org name quickly (if you have organizations list)
//           const orgObj = organizations.find((o) => String(o._id ?? o.id ?? o) === String(orgId));
//           const orgName = orgObj?.name ?? org?.organization_name ?? orgNameForTop ?? undefined;
//           setOrganization({ id: String(orgId), name: orgName });
//           // also update local selectedOrgId so OrganizationSelect receives the correct value prop
//           setSelectedOrgId(String(orgId));
//         }
//       } catch (err) {
//         console.warn("Could not fetch venue->org", err);
//       } finally {
//         setIsContextChanging(false);
//       }
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.search]);

//   // -------------------------
//   // Devices fetch effect (unchanged)
//   // -------------------------
//   useEffect(() => {
//     if (!selectedVenueId) {
//       setFreezerDevices([]);
//       setSelectedFreezerDeviceId(null);
//       autoSelectedForVenueRef.current = {};
//       return;
//     }

//     let mounted = true;
//     let intervalId = null;
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const fetchDevices = async (isPolling = false) => {
//       const hitTime = Date.now();
//       setPollHitTime(hitTime);
//       try {
//         const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//           method: "GET",
//           credentials: "include",
//           signal,
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });

//         const data = await res.json();

//         if (!mounted) return;

//         if (res.ok) {
//           const devices = Array.isArray(data.devices) ? data.devices : data.devices ? [data.devices] : [];

//           setFreezerDevices((prevDevices) => {
//             const prevMap = new Map(prevDevices.map((d) => [String(d._id ?? d.id ?? d.deviceId), d]));
//             return devices.map((newDevice) => {
//               const id = String(newDevice._id ?? newDevice.id ?? newDevice.deviceId);
//               const oldDevice = prevMap.get(id);
//               if (!oldDevice) return newDevice;
//               return {
//                 ...oldDevice,
//                 ambientTemperature: newDevice.ambientTemperature ?? oldDevice.ambientTemperature,
//                 freezerTemperature: newDevice.freezerTemperature ?? oldDevice.freezerTemperature,
//                 espHumidity: newDevice.espHumidity ?? oldDevice.espHumidity,
//                 espTemprature: newDevice.espTemprature ?? oldDevice.espTemprature,
//                 espOdour: newDevice.espOdour ?? oldDevice.espOdour,
//                 espAQI: newDevice.espAQI ?? oldDevice.espAQI,
//                 espGL: newDevice.espGL ?? oldDevice.espGL,
//                 temperatureAlert: newDevice.temperatureAlert ?? oldDevice.temperatureAlert,
//                 humidityAlert: newDevice.humidityAlert ?? oldDevice.humidityAlert,
//                 odourAlert: newDevice.odourAlert ?? oldDevice.odourAlert,
//                 aqiAlert: newDevice.aqiAlert ?? oldDevice.aqiAlert,
//                 glAlert: newDevice.glAlert ?? oldDevice.glAlert,
//                 batteryLow: newDevice.batteryLow ?? oldDevice.batteryLow,
//                 refrigeratorAlert: newDevice.refrigeratorAlert ?? oldDevice.refrigeratorAlert,
//                 lastUpdateTime: newDevice.lastUpdateTime ?? oldDevice.lastUpdateTime,
//               };
//             });
//           });

//           if (isDesktop && devices && devices.length > 0) {
//             if (!autoSelectedForVenueRef.current[selectedVenueId]) {
//               const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;
//               if (firstId) {
//                 setSelectedFreezerDeviceId(String(firstId));
//                 autoSelectedForVenueRef.current[selectedVenueId] = true;
//               }
//             }
//           }

//           if (!isDesktop && !isPolling) {
//             setSelectedFreezerDeviceId(null);
//           }
//         } else {
//           setFreezerDevices([]);
//           setSelectedFreezerDeviceId(null);
//           console.error("Device fetch error:", data?.message);
//         }
//       } catch (err) {
//         if (!mounted) return;
//         if (err.name === "AbortError") return;
//         console.error("Device fetch error:", err);
//         setFreezerDevices([]);
//         setSelectedFreezerDeviceId(null);
//       } finally {
//         if (!isPolling) {
//           setIsInitialDevicesLoad(false);
//           setIsContextChanging(false);
//         }
//       }
//     };

//     fetchDevices(false);

//     intervalId = setInterval(() => {
//       fetchDevices(true);
//     }, POLL_MS);

//     return () => {
//       mounted = false;
//       if (intervalId) clearInterval(intervalId);
//       controller.abort();
//     };
//   }, [selectedVenueId, token, isDesktop, POLL_MS]);

//   // -------------------------
//   // Event handlers (UPDATED to set context)
//   // -------------------------
//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const handleFreezerDeviceSelect = (deviceId) => {
//     console.log("Card Selected");
//     setSelectedFreezerDeviceId(deviceId);
//     if (!isDesktop) setOpen(true);
//   };

//   // onOrganizationChange now accepts (id, name) but will also work with old signature
//   const onOrganizationChange = (id, name) => {
//     const orgId = id || user?.organization;

//     if (orgId && String(orgId) === String(selectedOrgId)) {
//       return;
//     }

//     setIsContextChanging(true);
//     setSelectedOrgId(orgId || user?.organization);
//     setSelectedVenueId("");

//     // update context: setOrganization clears venue automatically if org changed
//     setOrganization({ id: String(orgId), name: name ?? undefined });
//     // also clear saved venue (context) so the new org takes effect
//     clearVenue();

//     // remove ?venue from URL
//     const sp = new URLSearchParams(location.search);
//     if (sp.get("venue")) {
//       sp.delete("venue");
//       navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true });
//     }

//     setIsContextChanging(false);
//   };

//   // onVenueChange accepts (id, name) — if name provided we set it directly in context (faster)
//   const onVenueChange = async (id, name) => {
//     if (String(id) === String(selectedVenueId)) return;
//     setIsContextChanging(true);

//     setSelectedVenueId(id);
//     const basePath = location.pathname.split("?")[0];
//     if (id) navigate(`${basePath}?venue=${id}`, { replace: false });
//     else navigate(basePath, { replace: false });

//     // If select passed name, use it; otherwise fetch venue name
//     if (name) {
//       setVenue({ id: String(id), name });
//       setIsContextChanging(false);
//       return;
//     }

//     try {
//       const res = await fetch(`${BASE}/venue/${id}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const venueObj = data?.venue ?? data;
//         const vName = venueObj?.name ?? venueObj?.venueName ?? String(id);
//         setVenue({ id: String(id), name: vName });
//         // optionally set org if returned
//         const orgId = venueObj?.organization ?? venueObj?.org ?? venueObj?.organizationId ?? null;
//         if (orgId) {
//           setOrganization({ id: String(orgId), name: undefined });
//           setSelectedOrgId(String(orgId));
//         }
//       } else {
//         setVenue({ id: String(id), name: String(id) });
//       }
//     } catch (err) {
//       console.warn("Failed to fetch venue details", err);
//       setVenue({ id: String(id), name: String(id) });
//     } finally {
//       setIsContextChanging(false);
//     }
//   };

//   // ======= rest of file: influx polling + render (unchanged) ========
//   // (I didn't change the Influx effect or device rendering code except to keep existing functionality)
//   useEffect(() => {
//     let mounted = true;
//     const controller = new AbortController();
//     const signal = controller.signal;
//     let intervalId = null;

//     if (!freezerDevices || freezerDevices.length === 0) {
//       setDeviceOnlineMap({});
//       setDeviceLastUpdateMap({});
//       return () => {};
//     }

//     const influxUrl = import.meta.env.VITE_INFLUX_URL;
//     const influxToken = import.meta.env.VITE_INFLUX_TOKEN;
//     const influxOrg = import.meta.env.VITE_INFLUX_ORG;
//     const influxBucket = "Odour";

//     if (!influxUrl || !influxToken || !influxOrg || !influxBucket) {
//       console.warn("Influx env vars not set; skipping LED polling.");
//       return () => {};
//     }

//     const client = new InfluxDB({ url: influxUrl, token: influxToken });
//     const queryApi = client.getQueryApi(influxOrg);

//     const runQueryForAllDevices = async () => {
//       try {
//         const deviceIds = freezerDevices.map((d) => String(d.deviceId).trim()).filter(Boolean);
//         if (!deviceIds.length) return;
//         const measureFilter = deviceIds.map((id) => `r._measurement == "${id}"`).join(" or ");
//         const flux = `
// from(bucket: "${influxBucket}")
//   |> range(start: -30d)
//   |> filter(fn: (r) => ${measureFilter})
//   |> last()
//   |> keep(columns: ["_measurement", "_time"])
// `;
//         const rows = await queryApi.collectRows(flux);
//         if (!mounted) return;
//         const lastMap = {};
//         for (const r of rows) {
//           const m = r._measurement || r.measurement || r._measurement;
//           // const t = r._time || r._time;
//           const t = r._time ?? r.time ?? null;

//           if (!m) continue;
//           const timeISO = typeof t === "string" ? t : t instanceof Date ? t.toISOString() : String(t);
//           lastMap[String(m)] = timeISO;
//         }
//         const thresholdMs = Date.now() - 1.5 * 60 * 60 * 1000;
//         const onlineMap = {};
//         deviceIds.forEach((id) => {
//           const timeISO = lastMap[id];
//           if (!timeISO) {
//             onlineMap[id] = false;
//           } else {
//             const ts = new Date(timeISO).getTime();
//             onlineMap[id] = Number.isFinite(ts) && ts >= thresholdMs;
//           }
//         });
//         setDeviceLastUpdateMap((prev) => ({ ...prev, ...lastMap }));
//         setDeviceOnlineMap((prev) => ({ ...prev, ...onlineMap }));
//       } catch (err) {
//         if (err.name === "AbortError") return;
//         console.error("Influx LED polling error:", err);
//       }
//     };

//     runQueryForAllDevices();
//     intervalId = setInterval(() => {
//       runQueryForAllDevices();
//     }, POLL_MS);

//     return () => {
//       mounted = false;
//       if (intervalId) clearInterval(intervalId);
//       controller.abort();
//     };
//   }, [freezerDevices, POLL_MS]);

//   if (loading) {
//     return (
//       <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
//         <div className="flex justify-center items-center w-full h-64" />
//       </div>
//     );
//   }

//   // Render (unchanged except passing externalLabel props to selects)
//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">
//         <>
//           <div className="flex justify-between items-center mb-6">
//             {!isDesktopForIcon && <img src="/logo-half.png" alt="IOTFIY LOGO" className="w-auto h-[40px]" />}

//             <div className="  sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[25rem]">
//               {user?.role === "admin" ? (
//                 <OrganizationSelect
//                   value={selectedOrgId}
//                   onChange={onOrganizationChange}
//                   className="mt-1"
//                   disableAutoSelect={hasVenueInUrl}
//                   // show friendly label from context while org list loads
//                   externalLabel={ctxOrg?.name ?? orgNameForTop}
//                 />
//               ) : (
//                 <>
//                   <p className="text-gray-500">Organization</p>
//                   <h3 className="text-gray-700 font-bold capitalize">{orgNameForTop || ""}</h3>
//                 </>
//               )}
//             </div>

//             <div className="flex items-center  ml-5 sm:ml-auto  ">
//               <VenueSelect
//                 organizationId={selectedOrgId || user?.organization}
//                 value={selectedVenueId}
//                 onChange={onVenueChange}
//                 className=""
//                 excludeFirstN={user?.role === "user" ? 3 : 0}
//                 externalLabel={ctxVenue?.name}
//               />
//             </div>
//           </div>

//           <div className="flex-1 min-h-0">
//             <div className="freezer-cards-container custom-scrollbar">
//               {(isInitialDevicesLoad || isContextChanging) ? (
//                 <div className="freezer-cards-grid freezer-cards-container">
//                   {Array.from({ length: 4 }).map((_, index) => (
//                     <DeviceSkeleton key={index} />
//                   ))}
//                 </div>
//               ) : freezerDevices.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                   <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   <p className="text-lg font-medium">No Freezer Devices Found</p>
//                   <p className="text-sm">Add some freezer devices to get started</p>
//                 </div>
//               ) : (
//                 <div className="freezer-cards-grid freezer-cards-container">
//                   {freezerDevices.map((device) => {
//                     const idKey = device._id ?? device.id ?? device.deviceId;
//                     const influxKey = String(device.deviceId);
//                     const isOnline = Boolean(deviceOnlineMap[influxKey]);
//                     const lastUpdateISO = deviceLastUpdateMap[influxKey] || null;

//                     const commonProps = {
//                       key: idKey,
//                       deviceId: device.deviceId,
//                       ambientTemperature: device?.AmbientData?.temperature ?? device.ambientTemperature,
//                       freezerTemperature: device?.FreezerData?.temperature ?? device.freezerTemperature,
//                       onCardSelect: () => handleFreezerDeviceSelect(idKey),
//                       isSelected: String(idKey) === String(selectedFreezerDeviceId),
//                       espHumidity: device?.espHumidity,
//                       espTemprature: device?.espTemprature,
//                       temperatureAlert: device?.temperatureAlert,
//                       humidityAlert: device?.humidityAlert,
//                       odourAlert: device?.odourAlert,
//                       espOdour: device?.espOdour,
//                       isOnline,
//                       lastUpdateISO,
//                     };

//                     if (device?.deviceType === "AQIMD") {
//                       return <AQIDeviceCard {...commonProps} espAQI={device?.espAQI} aqiAlert={device?.aqiAlert} />;
//                     }

//                     if (device?.deviceType === "TMD") {
//                       return <TemperatureHumidityDeviceCard {...commonProps} pollHitTime={pollHitTime} />;
//                     }

//                     if (device?.deviceType === "OMD") {
//                       return <OdourDeviceCard {...commonProps} espOdour={device?.espOdour} odourAlert={device?.odourAlert} />;
//                     }

//                     if (device?.deviceType === "GLMD") {
//                       return <GasLeakageDeviceCard {...commonProps} espGL={device?.espGL} glAlert={device?.glAlert} />;
//                     }

//                     return (
//                       <FreezerDeviceCard
//                         {...commonProps}
//                         deviceType={device?.deviceType}
//                         espAQI={device?.espAQI}
//                         aqiAlert={device?.aqiAlert}
//                         espGL={device?.espGL}
//                         glAlert={device?.glAlert}
//                         batteryLow={device?.batteryLow}
//                         refrigeratorAlert={device?.refrigeratorAlert}
//                       />
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           <AlertsPanel organizationId={selectedOrgId} pollInterval={POLL_MS} />
//         </>
//       </div>

//       {isDesktop ? (
//         <DashboardRightPanel freezerDevices={freezerDevices} selectedFreezerDeviceId={selectedFreezerDeviceId} selectedOrgId={selectedOrgId} pollInterval={POLL_MS} />
//       ) : (
//         <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
//           <DashboardRightPanel freezerDevices={freezerDevices} selectedFreezerDeviceId={selectedFreezerDeviceId} selectedOrgId={selectedOrgId} closeIcon={true} onClose={toggleDrawer(false)} pollInterval={POLL_MS} />
//         </Drawer>
//       )}
//     </div>
//   );
// }


























// FIxing the Issue for first time not getting auto select if no venue and org in localstorage
// Working on Three States of LED on Devices
// Code for peresistency in Dashboard for Url and page not change on reload for selected org and venue assuring all cases for Admin, Manager, User 
// src/pages/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import FreezerDeviceCard from "./FreezerDeviceCard";
import OrganizationSelect from "./OrganizationSelect";
import VenueSelect from "./VenueSelect";
import AlertsPanel from "./AlertsPanel";
import "../../styles/pages/Dashboard/dashboard-styles.css";
import "../../styles/pages/Dashboard/freezer-cards-responsive.css";
import { useStore } from "../../contexts/storecontexts";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardRightPanel from "../../components/DashboardRightPanel";
import { Drawer, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizationByUserID } from "../../slices/OrganizationSlice";
import DeviceSkeleton from "./DeviceSkeleton";
import AQIDeviceCard from "./AQIDeviceCard";
import TemperatureHumidityDeviceCard from "./TemperatureHumidityDeviceCard";
import OdourDeviceCard from "./OdourDeviceCard";
import GasLeakageDeviceCard from "./GasLeakageDeviceCard";
import { InfluxDB } from "@influxdata/influxdb-client";

// NEW import
import { useOrgVenue } from "../../contexts/OrgVenueContext";

const mockFreezerDevices = [];

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

export default function Dashboard() {
  const { user, getToken } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const token = getToken();

  // Context for org + venue
  const { organization: ctxOrg, venue: ctxVenue, setOrganization, setVenue, clearVenue } = useOrgVenue();

  // your existing state
  const [organizations, setOrganizations] = useState([]);
  const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices);
  const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [selectedVenueId, setSelectedVenueId] = useState("");
  const [orgNameForTop, setOrgNameForTop] = useState();
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width:768px)");
  const isDesktopForIcon = useMediaQuery("(min-width:760px)");
  const autoSelectedForVenueRef = React.useRef({});
  const [isInitialDevicesLoad, setIsInitialDevicesLoad] = useState(true);
  const [isContextChanging, setIsContextChanging] = useState(false);
  const [pollHitTime, setPollHitTime] = useState(Date.now());
  const [deviceOnlineMap, setDeviceOnlineMap] = useState({});
  const [deviceLastUpdateMap, setDeviceLastUpdateMap] = useState({});

  const hasVenueInUrl = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return Boolean(sp.get("venue"));
  }, [location.search]);

  // -------------------------
  // existing helpers...
  // -------------------------
  const getAllDevicesInOrganization = (org) => {
    let devices = [...(org.devices || [])];
    if (org.subOrganizations) {
      org.subOrganizations.forEach((subOrg) => {
        devices = devices.concat(getAllDevicesInOrganization(subOrg));
      });
    }
    return devices;
  };

  const findOrganizationById = (orgs, id) => {
    for (const org of orgs) {
      if (String(org.id) === String(id) || String(org._id) === String(id)) return org;
      if (org.subOrganizations) {
        const found = findOrganizationById(org.subOrganizations, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedOrganizationData = useMemo(() => {
    if (!selectedOrgId || organizations.length === 0) return null;
    const org = findOrganizationById(organizations, selectedOrgId);
    if (!org) return null;
    const allDevices = getAllDevicesInOrganization(org);
    return {
      organizationName: org.name || org.organization_name || selectedOrgId,
      deviceCount: allDevices.length,
    };
  }, [selectedOrgId, organizations]);


  // ---- MOUNT: restore URL from stored context ----
useEffect(() => {
  const sp = new URLSearchParams(location.search);
  if (!sp.get("venue") && ctxVenue?.id) {
    navigate(`${location.pathname}?venue=${ctxVenue.id}`, { replace: true });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // run only once on mount

// ---- Initialize org for non-admin users from user object ----
useEffect(() => {
  if (user?.role !== "admin" && user?.organization && !selectedOrgId) {
    const orgId = String(user.organization);
    setSelectedOrgId(orgId);
    // if context has no org yet, seed it
    if (!ctxOrg?.id) {
      setOrganization({ id: orgId, name: orgNameForTop ?? undefined });
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [user?.organization]);

  // EFFECT: fetchOrganizations placeholder (unchanged)
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        setError(null);
        const mockOrgs = [];
        setOrganizations(mockOrgs);
      } catch (err) {
        setError(err.message || "Failed to load organizations");
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  const dispatch = useDispatch();

  // polling interval helper (unchanged)
  const getPollingInterval = () => {
    if (!user?.timer) return 5 * 60 * 1000;
    const match = /^(\d+)(s|m)$/.exec(user.timer.trim());
    if (!match) return 5 * 60 * 1000;
    const value = parseInt(match[1], 10);
    const unit = match[2];
    if (unit === "s") {
      return Math.min(Math.max(value, 0), 60) * 1000;
    } else if (unit === "m") {
      return Math.min(Math.max(value, 0), 60) * 60 * 1000;
    }
    return 5 * 60 * 1000;
  };

  const POLL_MS = getPollingInterval();

  useEffect(() => {
    if (user?.role !== "admin" && user?._id) {
      dispatch(fetchOrganizationByUserID(user._id))
        .unwrap()
        .then((org) => {
          console.log("Organization object:", org);
          setOrgNameForTop(org?.name);
        })
        .catch((err) => {
          console.log("Failed to fetch organization:", err);
        });
    }
  }, [dispatch, user]);

  // -------------------------
  // SYNC context -> local state on mount / context change
  // This ensures after refresh we show labels immediately
  // -------------------------
  useEffect(() => {
    if (ctxOrg?.id) {
      if (String(ctxOrg.id) !== String(selectedOrgId)) setSelectedOrgId(String(ctxOrg.id));
      if (ctxOrg.name && !orgNameForTop) setOrgNameForTop(ctxOrg.name);
    }
    // if context org was cleared, clear local
    if (!ctxOrg && selectedOrgId) {
      setSelectedOrgId("");
      setOrgNameForTop(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctxOrg?.id, ctxOrg?.name]);

  useEffect(() => {
    if (ctxVenue?.id) {
      if (String(ctxVenue.id) !== String(selectedVenueId)) setSelectedVenueId(String(ctxVenue.id));
    }
    if (!ctxVenue && selectedVenueId) {
      setSelectedVenueId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctxVenue?.id]);

  // -------------------------
  // URL -> venue: when ?venue=... exists we fetch its org and set context (so selects show names)
  // This is your existing effect, now setting context
  // -------------------------
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const venueFromUrl = sp.get("venue") || "";

    if (venueFromUrl === selectedVenueId) return;

    setIsContextChanging(true);

    if (!venueFromUrl) {
      setSelectedVenueId("");
      // also clear context venue
      setVenue(null);
      setIsContextChanging(false);
      return;
    }

    setSelectedVenueId(venueFromUrl);

    (async () => {
      try {
        const res = await fetch(`${BASE}/venue/${venueFromUrl}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) {
          console.warn("Venue fetch failed", res.status);
          setIsContextChanging(false);
          return;
        }
        const data = await res.json();
        const venue = data?.venue ?? data;
        const orgId = venue?.organization ?? venue?.org ?? venue?.organizationId ?? null;
        const venueName = venue?.name ?? venue?.venueName ?? venue?.venue_name ?? String(venueFromUrl);

        // set venue in context (so VenueSelect can show name even before its own fetch completes)
        setVenue({ id: String(venueFromUrl), name: venueName });

        // if venue holds organization id, set that in context too
        if (orgId) {
          // try to get org name quickly (if you have organizations list)
          const orgObj = organizations.find((o) => String(o._id ?? o.id ?? o) === String(orgId));
          const orgName = orgObj?.name ?? org?.organization_name ?? orgNameForTop ?? undefined;
          setOrganization({ id: String(orgId), name: orgName });
          // also update local selectedOrgId so OrganizationSelect receives the correct value prop
          setSelectedOrgId(String(orgId));
        }
      } catch (err) {
        console.warn("Could not fetch venue->org", err);
      } finally {
        setIsContextChanging(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // -------------------------
  // Devices fetch effect (unchanged)
  // -------------------------
  useEffect(() => {
    if (!selectedVenueId) {
      setFreezerDevices([]);
      setSelectedFreezerDeviceId(null);
      autoSelectedForVenueRef.current = {};
      return;
    }

    let mounted = true;
    let intervalId = null;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDevices = async (isPolling = false) => {
      const hitTime = Date.now();
      setPollHitTime(hitTime);
      try {
        const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
          method: "GET",
          credentials: "include",
          signal,
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const data = await res.json();

        if (!mounted) return;

        if (res.ok) {
          const devices = Array.isArray(data.devices) ? data.devices : data.devices ? [data.devices] : [];

          setFreezerDevices((prevDevices) => {
            const prevMap = new Map(prevDevices.map((d) => [String(d._id ?? d.id ?? d.deviceId), d]));
            return devices.map((newDevice) => {
              const id = String(newDevice._id ?? newDevice.id ?? newDevice.deviceId);
              const oldDevice = prevMap.get(id);
              if (!oldDevice) return newDevice;
              return {
                ...oldDevice,
                ambientTemperature: newDevice.ambientTemperature ?? oldDevice.ambientTemperature,
                freezerTemperature: newDevice.freezerTemperature ?? oldDevice.freezerTemperature,
                espHumidity: newDevice.espHumidity ?? oldDevice.espHumidity,
                espTemprature: newDevice.espTemprature ?? oldDevice.espTemprature,
                espOdour: newDevice.espOdour ?? oldDevice.espOdour,
                espAQI: newDevice.espAQI ?? oldDevice.espAQI,
                espGL: newDevice.espGL ?? oldDevice.espGL,
                temperatureAlert: newDevice.temperatureAlert ?? oldDevice.temperatureAlert,
                humidityAlert: newDevice.humidityAlert ?? oldDevice.humidityAlert,
                odourAlert: newDevice.odourAlert ?? oldDevice.odourAlert,
                aqiAlert: newDevice.aqiAlert ?? oldDevice.aqiAlert,
                glAlert: newDevice.glAlert ?? oldDevice.glAlert,
                batteryLow: newDevice.batteryLow ?? oldDevice.batteryLow,
                refrigeratorAlert: newDevice.refrigeratorAlert ?? oldDevice.refrigeratorAlert,
                lastUpdateTime: newDevice.lastUpdateTime ?? oldDevice.lastUpdateTime,
              };
            });
          });

          if (isDesktop && devices && devices.length > 0) {
            if (!autoSelectedForVenueRef.current[selectedVenueId]) {
              const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;
              if (firstId) {
                setSelectedFreezerDeviceId(String(firstId));
                autoSelectedForVenueRef.current[selectedVenueId] = true;
              }
            }
          }

          if (!isDesktop && !isPolling) {
            setSelectedFreezerDeviceId(null);
          }
        } else {
          setFreezerDevices([]);
          setSelectedFreezerDeviceId(null);
          console.error("Device fetch error:", data?.message);
        }
      } catch (err) {
        if (!mounted) return;
        if (err.name === "AbortError") return;
        console.error("Device fetch error:", err);
        setFreezerDevices([]);
        setSelectedFreezerDeviceId(null);
      } finally {
        if (!isPolling) {
          setIsInitialDevicesLoad(false);
          setIsContextChanging(false);
        }
      }
    };

    fetchDevices(false);

    intervalId = setInterval(() => {
      fetchDevices(true);
    }, POLL_MS);

    return () => {
      mounted = false;
      if (intervalId) clearInterval(intervalId);
      controller.abort();
    };
  }, [selectedVenueId, token, isDesktop, POLL_MS]);

  // -------------------------
  // Event handlers (UPDATED to set context)
  // -------------------------
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleFreezerDeviceSelect = (deviceId) => {
    console.log("Card Selected");
    setSelectedFreezerDeviceId(deviceId);
    if (!isDesktop) setOpen(true);
  };

  // onOrganizationChange now accepts (id, name) but will also work with old signature
  const onOrganizationChange = (id, name) => {
    const orgId = id || user?.organization;

    if (orgId && String(orgId) === String(selectedOrgId)) {
      return;
    }

    setIsContextChanging(true);
    setSelectedOrgId(orgId || user?.organization);
    setSelectedVenueId("");

    // update context: setOrganization clears venue automatically if org changed
    setOrganization({ id: String(orgId), name: name ?? undefined });
    // also clear saved venue (context) so the new org takes effect
    clearVenue();

    // remove ?venue from URL
    const sp = new URLSearchParams(location.search);
    if (sp.get("venue")) {
      sp.delete("venue");
      navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true });
    }

    setIsContextChanging(false);
  };

  // onVenueChange accepts (id, name) — if name provided we set it directly in context (faster)
  const onVenueChange = async (id, name) => {
    if (String(id) === String(selectedVenueId)) return;
    setIsContextChanging(true);

    setSelectedVenueId(id);
    const basePath = location.pathname.split("?")[0];
    if (id) navigate(`${basePath}?venue=${id}`, { replace: false });
    else navigate(basePath, { replace: false });

    // If select passed name, use it; otherwise fetch venue name
    if (name) {
      setVenue({ id: String(id), name });
      setIsContextChanging(false);
      return;
    }

    try {
      const res = await fetch(`${BASE}/venue/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (res.ok) {
        const data = await res.json();
        const venueObj = data?.venue ?? data;
        const vName = venueObj?.name ?? venueObj?.venueName ?? String(id);
        setVenue({ id: String(id), name: vName });
        // optionally set org if returned
        const orgId = venueObj?.organization ?? venueObj?.org ?? venueObj?.organizationId ?? null;
        if (orgId) {
          setOrganization({ id: String(orgId), name: undefined });
          setSelectedOrgId(String(orgId));
        }
      } else {
        setVenue({ id: String(id), name: String(id) });
      }
    } catch (err) {
      console.warn("Failed to fetch venue details", err);
      setVenue({ id: String(id), name: String(id) });
    } finally {
      setIsContextChanging(false);
    }
  };

  // ======= rest of file: influx polling + render (unchanged) ========
  // (I didn't change the Influx effect or device rendering code except to keep existing functionality)
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    let intervalId = null;

    if (!freezerDevices || freezerDevices.length === 0) {
      setDeviceOnlineMap({});
      setDeviceLastUpdateMap({});
      return () => {};
    }

    const influxUrl = import.meta.env.VITE_INFLUX_URL;
    const influxToken = import.meta.env.VITE_INFLUX_TOKEN;
    const influxOrg = import.meta.env.VITE_INFLUX_ORG;
    const influxBucket = "Odour";

    if (!influxUrl || !influxToken || !influxOrg || !influxBucket) {
      console.warn("Influx env vars not set; skipping LED polling.");
      return () => {};
    }

    const client = new InfluxDB({ url: influxUrl, token: influxToken });
    const queryApi = client.getQueryApi(influxOrg);

    const runQueryForAllDevices = async () => {
      try {
        const deviceIds = freezerDevices.map((d) => String(d.deviceId).trim()).filter(Boolean);
        if (!deviceIds.length) return;
        const measureFilter = deviceIds.map((id) => `r._measurement == "${id}"`).join(" or ");
        const flux = `
from(bucket: "${influxBucket}")
  |> range(start: -30d)
  |> filter(fn: (r) => ${measureFilter})
  |> last()
  |> keep(columns: ["_measurement", "_time"])
`;
        const rows = await queryApi.collectRows(flux);
        if (!mounted) return;
        const lastMap = {};
        for (const r of rows) {
          const m = r._measurement || r.measurement || r._measurement;
          // const t = r._time || r._time;
          const t = r._time ?? r.time ?? null;

          if (!m) continue;
          const timeISO = typeof t === "string" ? t : t instanceof Date ? t.toISOString() : String(t);
          lastMap[String(m)] = timeISO;
        }
        const thresholdMs = Date.now() - 1.5 * 60 * 60 * 1000;
        const onlineMap = {};
        deviceIds.forEach((id) => {
          const timeISO = lastMap[id];
          if (!timeISO) {
            onlineMap[id] = false;
          } else {
            const ts = new Date(timeISO).getTime();
            onlineMap[id] = Number.isFinite(ts) && ts >= thresholdMs;
          }
        });
        setDeviceLastUpdateMap((prev) => ({ ...prev, ...lastMap }));
        setDeviceOnlineMap((prev) => ({ ...prev, ...onlineMap }));
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Influx LED polling error:", err);
      }
    };

    runQueryForAllDevices();
    intervalId = setInterval(() => {
      runQueryForAllDevices();
    }, POLL_MS);

    return () => {
      mounted = false;
      if (intervalId) clearInterval(intervalId);
      controller.abort();
    };
  }, [freezerDevices, POLL_MS]);

  if (loading) {
    return (
      <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
        <div className="flex justify-center items-center w-full h-64" />
      </div>
    );
  }

  // Render (unchanged except passing externalLabel props to selects)
  return (
    <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
      <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">
        <>
          <div className="flex justify-between items-center mb-6">
            {!isDesktopForIcon && <img src="/logo-half.png" alt="IOTFIY LOGO" className="w-auto h-[40px]" />}

            <div className="  sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[25rem]">
              {user?.role === "admin" ? (
                <OrganizationSelect
                  value={selectedOrgId}
                  onChange={onOrganizationChange}
                  className="mt-1"
                  disableAutoSelect={hasVenueInUrl}
                  // show friendly label from context while org list loads
                  externalLabel={ctxOrg?.name ?? orgNameForTop}
                />
              ) : (
                <>
                  <p className="text-gray-500">Organization</p>
                  <h3 className="text-gray-700 font-bold capitalize">{orgNameForTop || ""}</h3>
                </>
              )}
            </div>

            <div className="flex items-center  ml-5 sm:ml-auto  ">
              <VenueSelect
              organizationId={selectedOrgId || ctxOrg?.id || user?.organization}
                // organizationId={selectedOrgId || user?.organization}
                value={selectedVenueId}
                onChange={onVenueChange}
                className=""
                excludeFirstN={user?.role === "user" ? 3 : 0}
                externalLabel={ctxVenue?.name}
              />
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <div className="freezer-cards-container custom-scrollbar">
              {(isInitialDevicesLoad || isContextChanging) ? (
                <div className="freezer-cards-grid freezer-cards-container">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <DeviceSkeleton key={index} />
                  ))}
                </div>
              ) : freezerDevices.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
                  <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-lg font-medium">No Freezer Devices Found</p>
                  <p className="text-sm">Add some freezer devices to get started</p>
                </div>
              ) : (
                <div className="freezer-cards-grid freezer-cards-container">
                  {freezerDevices.map((device) => {
                    const idKey = device._id ?? device.id ?? device.deviceId;
                    const influxKey = String(device.deviceId);
                    const isOnline = Boolean(deviceOnlineMap[influxKey]);
                    const lastUpdateISO = deviceLastUpdateMap[influxKey] || null;

                    const commonProps = {
                      key: idKey,
                      deviceId: device.deviceId,
                      ambientTemperature: device?.AmbientData?.temperature ?? device.ambientTemperature,
                      freezerTemperature: device?.FreezerData?.temperature ?? device.freezerTemperature,
                      onCardSelect: () => handleFreezerDeviceSelect(idKey),
                      isSelected: String(idKey) === String(selectedFreezerDeviceId),
                      espHumidity: device?.espHumidity,
                      espTemprature: device?.espTemprature,
                      temperatureAlert: device?.temperatureAlert,
                      humidityAlert: device?.humidityAlert,
                      odourAlert: device?.odourAlert,
                      espOdour: device?.espOdour,
                      isOnline,
                      lastUpdateISO,
                    };

                    if (device?.deviceType === "AQIMD") {
                      return <AQIDeviceCard {...commonProps} espAQI={device?.espAQI} aqiAlert={device?.aqiAlert} />;
                    }

                    if (device?.deviceType === "TMD") {
                      return <TemperatureHumidityDeviceCard {...commonProps} pollHitTime={pollHitTime} />;
                    }

                    if (device?.deviceType === "OMD") {
                      return <OdourDeviceCard {...commonProps} espOdour={device?.espOdour} odourAlert={device?.odourAlert} />;
                    }

                    if (device?.deviceType === "GLMD") {
                      return <GasLeakageDeviceCard {...commonProps} espGL={device?.espGL} glAlert={device?.glAlert} />;
                    }

                    return (
                      <FreezerDeviceCard
                        {...commonProps}
                        deviceType={device?.deviceType}
                        espAQI={device?.espAQI}
                        aqiAlert={device?.aqiAlert}
                        espGL={device?.espGL}
                        glAlert={device?.glAlert}
                        batteryLow={device?.batteryLow}
                        refrigeratorAlert={device?.refrigeratorAlert}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <AlertsPanel organizationId={selectedOrgId} pollInterval={POLL_MS} />
        </>
      </div>

      {isDesktop ? (
        <DashboardRightPanel freezerDevices={freezerDevices} selectedFreezerDeviceId={selectedFreezerDeviceId} selectedOrgId={selectedOrgId} pollInterval={POLL_MS} />
      ) : (
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          <DashboardRightPanel freezerDevices={freezerDevices} selectedFreezerDeviceId={selectedFreezerDeviceId} selectedOrgId={selectedOrgId} closeIcon={true} onClose={toggleDrawer(false)} pollInterval={POLL_MS} />
        </Drawer>
      )}
    </div>
  );
}


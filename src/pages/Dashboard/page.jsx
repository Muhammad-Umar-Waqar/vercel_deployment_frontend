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

// const mockFreezerDevices = [
//   /* keep if you want placeholder cards when empty; otherwise devices come from API */
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
//   const [organizations, setOrganizations] = useState([])
//   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices)
//   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedOrgId, setSelectedOrgId] = useState("")
//   const [selectedVenueId, setSelectedVenueId] = useState("")
//   // const [showDetailPage, setShowDetailPage] = useState(false)
//   // const [selectedDevice, setSelectedDevice] = useState(null)
//   const [open, setOpen] = React.useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   // add near the top of the component:
//   const autoSelectedForVenueRef = React.useRef({}); // keys: venueId -> true

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
//         setLoading(true)
//         setError(null)
//         // placeholder empty list for now (same behavior you had)
//         // Replace with API call when backend ready:
//         // const token = localStorage.getItem("token")
//         // const res = await fetch(`${BASE}/organization/fetch/hierarchical`, { headers: { Authorization: `Bearer ${token}` }, credentials: "include" })
//         // const data = await res.json()
//         const mockOrgs = []
//         setOrganizations(mockOrgs)
//       } catch (err) {
//         setError(err.message || "Failed to load organizations")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOrganizations()
//   }, [])

//   // -------------------------
//   // EFFECT #2: keep selectedVenueId synced with URL ?venue=
//   // -------------------------
//   useEffect(() => {
//     const sp = new URLSearchParams(location.search)
//     const venueFromUrl = sp.get("venue") || ""
//     if (venueFromUrl !== selectedVenueId) {
//       setSelectedVenueId(venueFromUrl)
//     }
//     // no dependencies other than location.search so this always runs when URL changes
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.search])

//   // -------------------------
//   // EFFECT #3: fetch devices when selectedVenueId changes
//   // -------------------------
//   // useEffect(() => {
//   //   if (!selectedVenueId) {
//   //     setFreezerDevices([]) // clear when no venue
//   //     return
//   //   }


//   //   let mounted = true
//   //   let intervalId = null
//   //   const POLL_MS = 10 * 60 * 1000 // 10 minutes
//   //   // const POLL_MS = 2 * 1000 // 10 minutes
//   //   const fetchDevices = async () => {
//   //     try {
//   //       // const token = localStorage.getItem("token")
        
//   //       const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//   //         method: "GET",
//   //         credentials: "include",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   //         },
//   //       })
//   //       const data = await res.json()
//   //       console.log(data.devices);
        
//   //       if (!mounted) return
//   //       if (res.ok) {
//   //         setFreezerDevices(data.devices || [])
//   //         console.log("data.devices", data.devices)
//   //       } else {
//   //         setFreezerDevices([])
//   //         console.error("Device fetch error:", data?.message)
//   //       }
//   //     } catch (err) {
//   //       if (!mounted) return
//   //       console.error("Device fetch error:", err)
//   //       setFreezerDevices([])
//   //     }
//   //   }

//   //   fetchDevices()

//   //     // start polling (only if venue present)
//   // intervalId = setInterval(() => {
//   //   fetchDevices()
//   // }, POLL_MS)

//   //   return () => {
//   //     mounted = false
//   //   }
//   // }, [selectedVenueId])

//   // -------------------------
// // EFFECT #3: fetch devices when selectedVenueId changes
// // -------------------------
// // useEffect(() => {
// //   if (!selectedVenueId) {
// //     setFreezerDevices([]);
// //     setSelectedFreezerDeviceId(null);
// //     return;
// //   }

// //   let mounted = true;
// //   let intervalId = null;
// //   const POLL_MS = 10 * 60 * 1000; // 10 minutes

// //   const fetchDevices = async () => {
// //     try {
// //       const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
// //         method: "GET",
// //         credentials: "include",
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //         },
// //       });

// //       const data = await res.json();

// //       if (!mounted) return;

// //       if (res.ok) {
// //         const devices = Array.isArray(data.devices)
// //           ? data.devices
// //           : (data.devices ? [data.devices] : []);

// //         setFreezerDevices(devices || []);

// //         // ----------------------------------------------
// //         // AUTO-SELECT FIRST DEVICE **ONLY ON DESKTOP**
// //         // ----------------------------------------------
// //         if (isDesktop && devices?.length > 0) {
// //           const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;

// //           // only set if user has NOT manually selected anything yet
// //           if (!selectedFreezerDeviceId) {
// //             setSelectedFreezerDeviceId(String(firstId));
// //           }
// //         }

// //         // If mobile (<768px), DO NOT auto-select
// //         if (!isDesktop) {
// //           setSelectedFreezerDeviceId(null);
// //         }

// //       } else {
// //         setFreezerDevices([]);
// //         setSelectedFreezerDeviceId(null);
// //       }
// //     } catch (err) {
// //       if (!mounted) return;
// //       console.error("Device fetch error:", err);
// //       setFreezerDevices([]);
// //       setSelectedFreezerDeviceId(null);
// //     }
// //   };

// //   // initial load
// //   fetchDevices();

// //   // start polling for device updates
// //   intervalId = setInterval(fetchDevices, POLL_MS);

// //   return () => {
// //     mounted = false;
// //     if (intervalId) clearInterval(intervalId);
// //   };
// // }, [selectedVenueId, token, isDesktop, selectedFreezerDeviceId]);


// useEffect(() => {
//   if (!selectedVenueId) {
//     setFreezerDevices([]);
//     setSelectedFreezerDeviceId(null);
//     // reset auto-select tracking for safety
//     autoSelectedForVenueRef.current = {};
//     return;
//   }

//   let mounted = true;
//   let intervalId = null;
//   const POLL_MS = 10 * 60 * 1000; // 10 minutes
//   const controller = new AbortController();
//   const signal = controller.signal;

//   const fetchDevices = async () => {
//     try {
//       const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//         method: "GET",
//         credentials: "include",
//         signal,
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });

//       // if the request was aborted this will throw and be caught below
//       const data = await res.json();

//       if (!mounted) return;

//       if (res.ok) {
//         const devices = Array.isArray(data.devices)
//           ? data.devices
//           : (data.devices ? [data.devices] : []);

//         setFreezerDevices(devices || []);

//         // Auto-select first device ONLY ON DESKTOP and only once per venue load
//         if (isDesktop && devices && devices.length > 0) {
//           // hasn't been auto-selected yet for this venue?
//           if (!autoSelectedForVenueRef.current[selectedVenueId]) {
//             const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;
//             if (firstId) {
//               setSelectedFreezerDeviceId(String(firstId));
//               // mark that we auto-selected for this venue so we don't repeat
//               autoSelectedForVenueRef.current[selectedVenueId] = true;
//             }
//           }
//         }

//         // If mobile (<768px), ensure no auto-selection
//         if (!isDesktop) {
//           // don't stomp an existing user selection if it belongs to some other venue;
//           // since we're fetching specifically for selectedVenueId, it's safe to clear here per requirement
//           setSelectedFreezerDeviceId(null);
//         }
//       } else {
//         // error response
//         setFreezerDevices([]);
//         setSelectedFreezerDeviceId(null);
//         console.error("Device fetch error:", data?.message);
//       }
//     } catch (err) {
//       if (!mounted) return;
//       if (err.name === "AbortError") {
//         // request was aborted — no-op
//         return;
//       }
//       console.error("Device fetch error:", err);
//       setFreezerDevices([]);
//       setSelectedFreezerDeviceId(null);
//     }
//   };

//   // initial fetch
//   fetchDevices();

//   // start polling for device updates
//   intervalId = setInterval(fetchDevices, POLL_MS);

//   return () => {
//     mounted = false;
//     if (intervalId) clearInterval(intervalId);
//     controller.abort(); // cancel pending fetch
//   };
//   // intentionally not including selectedFreezerDeviceId to avoid effect loop when we set it
// }, [selectedVenueId, token, isDesktop]);

//   // -------------------------
//   // simple handlers (kept minimal)
//   // -------------------------

//    const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };


//   const handleFreezerDeviceSelect = (deviceId) => {
//     console.log("Card Selected")
//     setSelectedFreezerDeviceId(deviceId)
//   if (!isDesktop) setOpen(true) 
//   }

//   // const handleBackToDashboard = () => {
//   //   // setShowDetailPage(false)
//   //   setSelectedDevice(null)
//   // }

//   // Admin: when org changes, reset venue selection (keeps URL clean)
//   const onOrganizationChange = (id) => {

//      const orgId = id || user?.organization;

//   // If org hasn't changed, don't clear the venue or modify URL
//   if (orgId && String(orgId) === String(selectedOrgId)) {
//     return;
//   }

  
//     setSelectedOrgId(id || user?.organization)
//     setSelectedVenueId("")
//     // remove ?venue from URL
//     const sp = new URLSearchParams(location.search)
//     if (sp.get("venue")) {
//       sp.delete("venue")
//       navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true })
//     }
//   }

//   // Update URL when VenueSelect is used (or you can dispatch to redux)
//   const onVenueChange = (id) => {
//     setSelectedVenueId(id)
//     const basePath = location.pathname.split("?")[0]
//     if (id) navigate(`${basePath}?venue=${id}`, { replace: false })
//     else navigate(basePath, { replace: false })
//   }

  

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

//   if (error) {
//     return (
//       <div className="flex w-full flex-col lg:flex-row h-full bg-gray-100  font-inter rounded-md overflow-hidden">
//         <div className="flex flex-col justify-center items-center w-full h-64 space-y-4">
//           {/* <div className="text-lg text-red-600">Error: {error}</div> */}
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
        
//           <>
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//               <div className="w-[11rem] sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[25rem]">
//                 {/* <p className="text-sm text-[#64748B] min-w-[250px] font-medium">Organization</p> */}
//                 {user?.role === "admin" && (
//                   <OrganizationSelect
//                     value={selectedOrgId}
//                     onChange={onOrganizationChange}
//                     className="mt-1"
//                   />
//                 )}
//               </div>

//               <div className="flex items-center ">
//                 <VenueSelect
//                   organizationId={selectedOrgId || user?.organization}
//                   value={selectedVenueId}
//                   onChange={onVenueChange}
//                   className="mt-1"
//                   excludeFirstN={user?.role === "user" ? 4 : 0}
//                 />
//               </div>
//             </div>

//             {/* Freezer Device Cards Grid */}
//             <div className="flex-1 min-h-0">
//               <div className="freezer-cards-container custom-scrollbar">
//                 {freezerDevices.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                     <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                     </svg>
//                     <p className="text-lg font-medium">No Freezer Devices Found</p>
//                     <p className="text-sm">Add some freezer devices to get started</p>
//                   </div>
//                 ) : (
//                   <div className="freezer-cards-grid freezer-cards-container">
//                     {freezerDevices.map((device) => (
//                       <FreezerDeviceCard
//                         key={device._id ?? device.id}
//                         deviceId={device.deviceId}
//                         ambientTemperature={device?.AmbientData?.temperature ?? device.ambientTemperature}
//                         freezerTemperature={device?.FreezerData?.temperature ?? device.freezerTemperature}
//                         batteryLow={device?.batteryAlert ?? device?.batteryLow ?? false}
//                         refrigeratorAlert={device?.refrigeratorAlert ?? false}
//                         onCardSelect={() => handleFreezerDeviceSelect(device._id ?? device.id)}
//                         isSelected={(device._id ?? device.id) === selectedFreezerDeviceId}
//                         espHumidity ={device?.espHumidity}
//                         espTemprature = {device?.espTemprature}
//                         humidityAlert = {device?.humidityAlert}
//                         odourAlert={device?.odourAlert} 
//                         temperatureAlert={device?.temperatureAlert}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <AlertsPanel organizationId={selectedOrgId} pollInterval={10 * 60 * 1000} />
//             {/* <AlertsPanel organizationId={selectedOrgId} pollInterval={2 * 1000} /> */}
//           </>
//         {/* )} */}

//       </div>

//       {/* Right Sidebar - Venue Details Panel */}
//       {/* <div className="dashboard-right-panel shadow-sm flex flex-col h-full overflow-y-auto custom-scrollbar p-4 lg:p-6 border-l border-[#E5E7EB]/40 bg-white flex-shrink-0">
//         {selectedFreezerDeviceId ? (
//           (() => {
//             const selected = freezerDevices.find((d) => (d._id ?? d.id) === selectedFreezerDeviceId)
//             return (
//               <VenueDetailsPanel
//                 venueName={ "Venue"}
//                 freezerTemperature={selected?.AmbientData?.temperature ?? 0}
//                 ambientTemperature={selected?.FreezerData?.temperature ?? 0}
//                 batteryLow={selected?.batteryLow ?? selected?.batteryAlert ?? false}
//                 needMaintenance={selected?.batteryLow ?? false}
//                 apiKey={selected?.apiKey}
//                 chartData={[]}
//                 organizationId={selectedOrgId}
//               />
//             )
//           })()
//         ) : (
//           <VenueDetailsPanel
//             venueName={"Venue"}
//             freezerTemperature={0}
//             ambientTemperature={0}
//             batteryLow={true}
//             needMaintenance={true}
//             apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
//             chartData={[]}
//             organizationId={selectedOrgId}
//           />
//         )}
//       </div> */}

// {isDesktop ? (
//         <DashboardRightPanel
//       freezerDevices={freezerDevices}
//       selectedFreezerDeviceId={selectedFreezerDeviceId}
//       selectedOrgId={selectedOrgId}
      
//     />  
//     ) : (
//       <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
//         <DashboardRightPanel
//       freezerDevices={freezerDevices}
//       selectedFreezerDeviceId={selectedFreezerDeviceId}
//       selectedOrgId={selectedOrgId}
//       closeIcon={true}
//        onClose={toggleDrawer(false)}
//     />
//       </Drawer>
//     )}
//     </div>
//   )
// }
























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


// const mockFreezerDevices = [
//   /* keep if you want placeholder cards when empty; otherwise devices come from API */
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
//   const [organizations, setOrganizations] = useState([])
//   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices)
//   const [freezerDevicesLoading, setFreezerDevicesLoading] = useState(false);
//   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedOrgId, setSelectedOrgId] = useState("")
//   const [selectedVenueId, setSelectedVenueId] = useState("")
//   // const [showDetailPage, setShowDetailPage] = useState(false)
//   // const [selectedDevice, setSelectedDevice] = useState(null)
//   const [orgNameForTop, setOrgNameForTop] = useState();
//   const [open, setOpen] = React.useState(false);
//   const isDesktop = useMediaQuery("(min-width:768px)");
//   // add near the top of the component:
//   const autoSelectedForVenueRef = React.useRef({}); // keys: venueId -> true
//   const [hasFetchedForVenue, setHasFetchedForVenue] = useState(true);

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
//         setLoading(true)
//         setError(null)
//         // placeholder empty list for now (same behavior you had)
//         // Replace with API call when backend ready:
//         // const token = localStorage.getItem("token")
//         // const res = await fetch(`${BASE}/organization/fetch/hierarchical`, { headers: { Authorization: `Bearer ${token}` }, credentials: "include" })
//         // const data = await res.json()
//         const mockOrgs = []
//         setOrganizations(mockOrgs)
//       } catch (err) {
//         setError(err.message || "Failed to load organizations")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOrganizations()
//   }, [])


//     // inside Dashboard component
// const dispatch = useDispatch();
// // const { Organizations } = useSelector((s) => s.Organization || { Organizations: [] });

// // console.log("Organizations", Organizations)
// // useEffect(() => {
// //   if (user?.role !== "admin" && user?._id) {
// //     const res = dispatch(fetchOrganizationByUserID(user._id));
// //     console.log("OrganizationS:", res)
// //   }
// // }, [dispatch, user]);

// useEffect(() => {
//   if (user?.role !== "admin" && user?._id) {
//     dispatch(fetchOrganizationByUserID(user._id))
//       .unwrap()
//       .then((org) => {
//         console.log("Organization object:", org); // this is your actual organization
//         setOrgNameForTop(org?.name); 
//       })
//       .catch((err) => {
//         console.log("Failed to fetch organization:", err);
//       });
//   }
// }, [dispatch, user]);


//   // -------------------------
//   // EFFECT #2: keep selectedVenueId synced with URL ?venue=
//   // -------------------------
//   // useEffect(() => {
//   //   const sp = new URLSearchParams(location.search)
//   //   const venueFromUrl = sp.get("venue") || ""
//   //   if (venueFromUrl !== selectedVenueId) {
//   //   setHasFetchedForVenue(false);
//   //   setFreezerDevicesLoading(true);
//   //   setSelectedVenueId(venueFromUrl);
//   //   }
//   //   // no dependencies other than location.search so this always runs when URL changes
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [location.search])

//   useEffect(() => {
//   const sp = new URLSearchParams(location.search)
//   const venueFromUrl = sp.get("venue") || ""

//   // if venueFromUrl unchanged, nothing to do
//   if (venueFromUrl === selectedVenueId) return

//   if (!venueFromUrl) {
//     // No venue in URL — make sure we stop any device-loading UI
//     setHasFetchedForVenue(true)
//     setFreezerDevicesLoading(false)
//     setSelectedVenueId("")
//   } else {
//     // There *is* a venue in URL — start fetch flow
//     setHasFetchedForVenue(false)
//     setFreezerDevicesLoading(true)
//     setSelectedVenueId(venueFromUrl)
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [location.search])


//   // -------------------------
//   // EFFECT #3: fetch devices when selectedVenueId changes
//   // -------------------------
//   // useEffect(() => {
//   //   if (!selectedVenueId) {
//   //     setFreezerDevices([]) // clear when no venue
//   //     return
//   //   }


//   //   let mounted = true
//   //   let intervalId = null
//   //   const POLL_MS = 10 * 60 * 1000 // 10 minutes
//   //   // const POLL_MS = 2 * 1000 // 10 minutes
//   //   const fetchDevices = async () => {
//   //     try {
//   //       // const token = localStorage.getItem("token")
        
//   //       const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//   //         method: "GET",
//   //         credentials: "include",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   //         },
//   //       })
//   //       const data = await res.json()
//   //       console.log(data.devices);
        
//   //       if (!mounted) return
//   //       if (res.ok) {
//   //         setFreezerDevices(data.devices || [])
//   //         console.log("data.devices", data.devices)
//   //       } else {
//   //         setFreezerDevices([])
//   //         console.error("Device fetch error:", data?.message)
//   //       }
//   //     } catch (err) {
//   //       if (!mounted) return
//   //       console.error("Device fetch error:", err)
//   //       setFreezerDevices([])
//   //     }
//   //   }

//   //   fetchDevices()

//   //     // start polling (only if venue present)
//   // intervalId = setInterval(() => {
//   //   fetchDevices()
//   // }, POLL_MS)

//   //   return () => {
//   //     mounted = false
//   //   }
//   // }, [selectedVenueId])

//   // -------------------------
// // EFFECT #3: fetch devices when selectedVenueId changes
// // -------------------------
// // useEffect(() => {
// //   if (!selectedVenueId) {
// //     setFreezerDevices([]);
// //     setSelectedFreezerDeviceId(null);
// //     return;
// //   }

// //   let mounted = true;
// //   let intervalId = null;
// //   const POLL_MS = 10 * 60 * 1000; // 10 minutes

// //   const fetchDevices = async () => {
// //     try {
// //       const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
// //         method: "GET",
// //         credentials: "include",
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //         },
// //       });

// //       const data = await res.json();

// //       if (!mounted) return;

// //       if (res.ok) {
// //         const devices = Array.isArray(data.devices)
// //           ? data.devices
// //           : (data.devices ? [data.devices] : []);

// //         setFreezerDevices(devices || []);

// //         // ----------------------------------------------
// //         // AUTO-SELECT FIRST DEVICE **ONLY ON DESKTOP**
// //         // ----------------------------------------------
// //         if (isDesktop && devices?.length > 0) {
// //           const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;

// //           // only set if user has NOT manually selected anything yet
// //           if (!selectedFreezerDeviceId) {
// //             setSelectedFreezerDeviceId(String(firstId));
// //           }
// //         }

// //         // If mobile (<768px), DO NOT auto-select
// //         if (!isDesktop) {
// //           setSelectedFreezerDeviceId(null);
// //         }

// //       } else {
// //         setFreezerDevices([]);
// //         setSelectedFreezerDeviceId(null);
// //       }
// //     } catch (err) {
// //       if (!mounted) return;
// //       console.error("Device fetch error:", err);
// //       setFreezerDevices([]);
// //       setSelectedFreezerDeviceId(null);
// //     }
// //   };

// //   // initial load
// //   fetchDevices();

// //   // start polling for device updates
// //   intervalId = setInterval(fetchDevices, POLL_MS);

// //   return () => {
// //     mounted = false;
// //     if (intervalId) clearInterval(intervalId);
// //   };
// // }, [selectedVenueId, token, isDesktop, selectedFreezerDeviceId]);


// useEffect(() => {
// // if (!selectedVenueId) {
// //   setFreezerDevices([]);
// //   setSelectedFreezerDeviceId(null);
// //   autoSelectedForVenueRef.current = {};
// //   return;
// // }

//  if (!selectedVenueId) {
//    setFreezerDevices([]);
//    setSelectedFreezerDeviceId(null);
//    autoSelectedForVenueRef.current = {};
//    // no venue -> no loading; mark fetch as completed so spinner stops
//    setFreezerDevicesLoading(false);
//    setHasFetchedForVenue(true);
//    return;
//  }

// // IMPORTANT FIX:
// setFreezerDevicesLoading(true);

//   let mounted = true;
//   let intervalId = null;
//   const POLL_MS = 10 * 60 * 1000; // 10 minutes
//   const controller = new AbortController();
//   const signal = controller.signal;

//   const fetchDevices = async () => {
//     setFreezerDevicesLoading(true);
//     try {
//       const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//         method: "GET",
//         credentials: "include",
//         signal,
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });

//       // if the request was aborted this will throw and be caught below
//       const data = await res.json();

//       if (!mounted) return;

//       if (res.ok) {
//         const devices = Array.isArray(data.devices)
//           ? data.devices
//           : (data.devices ? [data.devices] : []);

//         setFreezerDevices(devices || []);

//         // Auto-select first device ONLY ON DESKTOP and only once per venue load
//         if (isDesktop && devices && devices.length > 0) {
//           // hasn't been auto-selected yet for this venue?
//           if (!autoSelectedForVenueRef.current[selectedVenueId]) {
//             const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;
//             if (firstId) {
//               setSelectedFreezerDeviceId(String(firstId));
//               // mark that we auto-selected for this venue so we don't repeat
//               autoSelectedForVenueRef.current[selectedVenueId] = true;
//             }
//           }
//         }

//         // If mobile (<768px), ensure no auto-selection
//         if (!isDesktop) {
//           // don't stomp an existing user selection if it belongs to some other venue;
//           // since we're fetching specifically for selectedVenueId, it's safe to clear here per requirement
//           setSelectedFreezerDeviceId(null);
//         }
//       } else {
//         // error response
//         setFreezerDevices([]);
//         setSelectedFreezerDeviceId(null);
//         console.error("Device fetch error:", data?.message);
//       }
//     } catch (err) {
//       if (!mounted) return;
//       if (err.name === "AbortError") {
//         // request was aborted — no-op
//         return;
//       }
//       console.error("Device fetch error:", err);
//       setFreezerDevices([]);
//       setSelectedFreezerDeviceId(null);
//     } finally{
//       setFreezerDevicesLoading(false);
//       setHasFetchedForVenue(true);
//     }
//   };

//   // initial fetch
//   fetchDevices();

//   // start polling for device updates
//   intervalId = setInterval(fetchDevices, POLL_MS);

//   return () => {
//     mounted = false;
//     if (intervalId) clearInterval(intervalId);
//     controller.abort(); // cancel pending fetch
//   };
//   // intentionally not including selectedFreezerDeviceId to avoid effect loop when we set it
// }, [selectedVenueId, token, isDesktop]);

//   // -------------------------
//   // simple handlers (kept minimal)
//   // -------------------------

//    const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };


//   const handleFreezerDeviceSelect = (deviceId) => {
//     console.log("Card Selected")
//     setSelectedFreezerDeviceId(deviceId)
//   if (!isDesktop) setOpen(true) 
//   }

//   // const handleBackToDashboard = () => {
//   //   // setShowDetailPage(false)
//   //   setSelectedDevice(null)
//   // }

//   // Admin: when org changes, reset venue selection (keeps URL clean)
//   const onOrganizationChange = (id) => {
  
//      const orgId = id || user?.organization;
    
//   // If org hasn't changed, don't clear the venue or modify URL
//   if (orgId && String(orgId) === String(selectedOrgId)) {
//     return;
//   }

//   // Show loading and mark venue-fetch as not-done for the new org
//   setHasFetchedForVenue(false);
//   setFreezerDevicesLoading(true);
  
//     setSelectedOrgId(id || user?.organization)
//     setSelectedVenueId("")
//     // remove ?venue from URL
//     const sp = new URLSearchParams(location.search)
//     if (sp.get("venue")) {
//       sp.delete("venue")
//       navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true })
//     }
//   }

//   // Update URL when VenueSelect is used (or you can dispatch to redux)
//   const onVenueChange = (id) => {
//     setHasFetchedForVenue(false);
//     setFreezerDevicesLoading(true);
//     setSelectedVenueId(id)
//     const basePath = location.pathname.split("?")[0]
//     if (id) navigate(`${basePath}?venue=${id}`, { replace: false })
//     else navigate(basePath, { replace: false })
//   }

  

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

//   if (error) {
//     return (
//       <div className="flex w-full flex-col lg:flex-row h-full bg-gray-100  font-inter rounded-md overflow-hidden">
//         <div className="flex flex-col justify-center items-center w-full h-64 space-y-4">
//           {/* <div className="text-lg text-red-600">Error: {error}</div> */}
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
        
//           <>
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//               <div className="w-[11rem] sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[25rem]">
//                 {/* <p className="text-sm text-[#64748B] min-w-[250px] font-medium">Organization</p> */}
//                 {user?.role === "admin" ? (
//                   <OrganizationSelect
//                     value={selectedOrgId}
//                     onChange={onOrganizationChange}
//                     className="mt-1"
//                   />
//                 ): <>
//                   <p className="text-gray-500">Organization</p>
//                   <h3 className="text-gray-700 font-bold capitalize">{orgNameForTop || ""}</h3>
//                 </>} 
//               </div>

//               <div className="flex items-center ">
//                 <VenueSelect
//                   organizationId={selectedOrgId || user?.organization}
//                   value={selectedVenueId}
//                   onChange={onVenueChange}
//                   className="mt-1"
//                   excludeFirstN={user?.role === "user" ? 3 : 0}
//                 />
//               </div>
//             </div>

//             {/* Freezer Device Cards Grid */}
//             {/* <div className="flex-1 min-h-0">
//               <div className="freezer-cards-container custom-scrollbar">
//                 {freezerDevices.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                     <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                     </svg>
//                     <p className="text-lg font-medium">No Freezer Devices Found</p>
//                     <p className="text-sm">Add some freezer devices to get started</p>
//                   </div>
//                 ) : (
//                   <div className="freezer-cards-grid freezer-cards-container">
//                     {freezerDevices.map((device) => (
//                       <FreezerDeviceCard
//                         key={device._id ?? device.id}
//                         deviceId={device.deviceId}
//                         ambientTemperature={device?.AmbientData?.temperature ?? device.ambientTemperature}
//                         freezerTemperature={device?.FreezerData?.temperature ?? device.freezerTemperature}
//                         batteryLow={device?.batteryAlert ?? device?.batteryLow ?? false}
//                         refrigeratorAlert={device?.refrigeratorAlert ?? false}
//                         onCardSelect={() => handleFreezerDeviceSelect(device._id ?? device.id)}
//                         isSelected={(device._id ?? device.id) === selectedFreezerDeviceId}
//                         espHumidity ={device?.espHumidity}
//                         espTemprature = {device?.espTemprature}
//                         humidityAlert = {device?.humidityAlert}
//                         odourAlert={device?.odourAlert} 
//                         temperatureAlert={device?.temperatureAlert}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div> */}


// {/* Freezer Device Cards area */}
// <div className="flex-1 min-h-0">
//   <div className="freezer-cards-container custom-scrollbar">
//     {(freezerDevicesLoading || !hasFetchedForVenue) ? (
//       // Loading state: spinner + optional skeleton grid
//       <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//         {/* Spinner */}
//         <svg className="animate-spin h-12 w-12 mb-4" viewBox="0 0 24 24" fill="none" aria-hidden>
//           <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
//           <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
//         </svg>
//         <p className="text-lg font-medium mb-2">Loading devices…</p>
//       </div>
//     ) : freezerDevices.length === 0 ? (
//       // No devices state (only shown when not loading)
//       <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//         <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//         <p className="text-lg font-medium">No Freezer Devices Found</p>
//         <p className="text-sm">Add some freezer devices to get started</p>
//       </div>
//     ) : (
//       // Devices present
//       <div className="freezer-cards-grid freezer-cards-container">
//         {freezerDevices.map((device) => (
//           <FreezerDeviceCard
//             key={device._id ?? device.id}
//             deviceId={device.deviceId}
//             ambientTemperature={device?.AmbientData?.temperature ?? device.ambientTemperature}
//             freezerTemperature={device?.FreezerData?.temperature ?? device.freezerTemperature}
//             batteryLow={device?.batteryAlert ?? device?.batteryLow ?? false}
//             refrigeratorAlert={device?.refrigeratorAlert ?? false}
//             onCardSelect={() => handleFreezerDeviceSelect(device._id ?? device.id)}
//             isSelected={(device._id ?? device.id) === selectedFreezerDeviceId}
//             espHumidity={device?.espHumidity}
//             espTemprature={device?.espTemprature}
//             humidityAlert={device?.humidityAlert}
//             odourAlert={device?.odourAlert}
//             temperatureAlert={device?.temperatureAlert}
//           />
//         ))}
//       </div>
//     )}
//   </div>
// </div>

//             <AlertsPanel organizationId={selectedOrgId} pollInterval={10 * 60 * 1000} />
//             {/* <AlertsPanel organizationId={selectedOrgId} pollInterval={2 * 1000} /> */}
//           </>
//         {/* )} */}

//       </div>

//       {/* Right Sidebar - Venue Details Panel */}
//       {/* <div className="dashboard-right-panel shadow-sm flex flex-col h-full overflow-y-auto custom-scrollbar p-4 lg:p-6 border-l border-[#E5E7EB]/40 bg-white flex-shrink-0">
//         {selectedFreezerDeviceId ? (
//           (() => {
//             const selected = freezerDevices.find((d) => (d._id ?? d.id) === selectedFreezerDeviceId)
//             return (
//               <VenueDetailsPanel
//                 venueName={ "Venue"}
//                 freezerTemperature={selected?.AmbientData?.temperature ?? 0}
//                 ambientTemperature={selected?.FreezerData?.temperature ?? 0}
//                 batteryLow={selected?.batteryLow ?? selected?.batteryAlert ?? false}
//                 needMaintenance={selected?.batteryLow ?? false}
//                 apiKey={selected?.apiKey}
//                 chartData={[]}
//                 organizationId={selectedOrgId}
//               />
//             )
//           })()
//         ) : (
//           <VenueDetailsPanel
//             venueName={"Venue"}
//             freezerTemperature={0}
//             ambientTemperature={0}
//             batteryLow={true}
//             needMaintenance={true}
//             apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
//             chartData={[]}
//             organizationId={selectedOrgId}
//           />
//         )}
//       </div> */}

// {isDesktop ? (
//         <DashboardRightPanel
//       freezerDevices={freezerDevices}
//       selectedFreezerDeviceId={selectedFreezerDeviceId}
//       selectedOrgId={selectedOrgId}
      
//     />  
//     ) : (
//       <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
//         <DashboardRightPanel
//       freezerDevices={freezerDevices}
//       selectedFreezerDeviceId={selectedFreezerDeviceId}
//       selectedOrgId={selectedOrgId}
//       closeIcon={true}
//        onClose={toggleDrawer(false)}
//     />
//       </Drawer>
//     )}
//     </div>
//   )
// }



























// After Polling Work

// src/pages/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react"
import FreezerDeviceCard from "./FreezerDeviceCard"
import OrganizationSelect from "./OrganizationSelect"
import VenueSelect from "./VenueSelect"
import AlertsPanel from "./AlertsPanel"
import "../../styles/pages/Dashboard/dashboard-styles.css"
import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
import { useStore } from "../../contexts/storecontexts"
import { useLocation, useNavigate } from "react-router-dom"
import DashboardRightPanel from "../../components/DashboardRightPanel"
import { Drawer, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizationByUserID } from "../../slices/OrganizationSlice";


const mockFreezerDevices = [
  /* keep if you want placeholder cards when empty; otherwise devices come from API */
]

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050"

export default function Dashboard() {
  // -------------------------
  // top-level hooks (always called, stable order)
  // -------------------------
  const { user, getToken } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  const token = getToken();
  // -------------------------
  // minimal state for UI
  // -------------------------
  const [organizations, setOrganizations] = useState([])
  const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices)
  const [freezerDevicesLoading, setFreezerDevicesLoading] = useState(false);
  const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrgId, setSelectedOrgId] = useState("")
  const [selectedVenueId, setSelectedVenueId] = useState("")
  // const [showDetailPage, setShowDetailPage] = useState(false)
  // const [selectedDevice, setSelectedDevice] = useState(null)
  const [orgNameForTop, setOrgNameForTop] = useState();
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width:768px)");
  // add near the top of the component:
  const autoSelectedForVenueRef = React.useRef({}); // keys: venueId -> true
  const [hasFetchedForVenue, setHasFetchedForVenue] = useState(true);

  // -------------------------
  // helpers (pure utility, no hooks inside)
  // -------------------------
  const getAllDevicesInOrganization = (org) => {
    let devices = [...(org.devices || [])]
    if (org.subOrganizations) {
      org.subOrganizations.forEach((subOrg) => {
        devices = devices.concat(getAllDevicesInOrganization(subOrg))
      })
    }
    return devices
  }
  

  const findOrganizationById = (orgs, id) => {
    for (const org of orgs) {
      if (String(org.id) === String(id) || String(org._id) === String(id)) return org
      if (org.subOrganizations) {
        const found = findOrganizationById(org.subOrganizations, id)
        if (found) return found
      }
    }
    return null
  }

  // -------------------------
  // derived data (no useEffect)
  // -------------------------
  const selectedOrganizationData = useMemo(() => {
    if (!selectedOrgId || organizations.length === 0) return null
    const org = findOrganizationById(organizations, selectedOrgId)
    if (!org) return null
    const allDevices = getAllDevicesInOrganization(org)
    return {
      organizationName: org.name || org.organization_name || selectedOrgId,
      deviceCount: allDevices.length,
    }
  }, [selectedOrgId, organizations])

  // -------------------------
  // EFFECT #1: fetchOrganizations on mount (keeps your placeholder behavior)
  // -------------------------
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true)
        setError(null)
        // placeholder empty list for now (same behavior you had)
        // Replace with API call when backend ready:
        // const token = localStorage.getItem("token")
        // const res = await fetch(`${BASE}/organization/fetch/hierarchical`, { headers: { Authorization: `Bearer ${token}` }, credentials: "include" })
        // const data = await res.json()
        const mockOrgs = []
        setOrganizations(mockOrgs)
      } catch (err) {
        setError(err.message || "Failed to load organizations")
      } finally {
        setLoading(false)
      }
    }

    fetchOrganizations()
  }, [])




    // inside Dashboard component
const dispatch = useDispatch();
// const { Organizations } = useSelector((s) => s.Organization || { Organizations: [] });

// console.log("Organizations", Organizations)
// useEffect(() => {
//   if (user?.role !== "admin" && user?._id) {
//     const res = dispatch(fetchOrganizationByUserID(user._id));
//     console.log("OrganizationS:", res)
//   }
// }, [dispatch, user]);



// -------------------------
// determine polling interval
// -------------------------
const getPollingInterval = () => {
  if (!user?.timer) return 5 * 60 * 1000; // default 5 minutes

  const match = /^(\d+)(s|m)$/.exec(user.timer.trim());
  if (!match) return 5 * 60 * 1000; // fallback if invalid format

  const value = parseInt(match[1], 10);
  const unit = match[2];

  if (unit === "s") {
    return Math.min(Math.max(value, 0), 60) * 1000; // 0-60s
  } else if (unit === "m") {
    return Math.min(Math.max(value, 0), 60) * 60 * 1000; // 0-60m
  }

  return 5 * 60 * 1000; // fallback
}

const POLL_MS = getPollingInterval();



useEffect(() => {
  if (user?.role !== "admin" && user?._id) {
    dispatch(fetchOrganizationByUserID(user._id))
      .unwrap()
      .then((org) => {
        console.log("Organization object:", org); // this is your actual organization
        setOrgNameForTop(org?.name); 
      })
      .catch((err) => {
        console.log("Failed to fetch organization:", err);
      });
  }
}, [dispatch, user]);


  // -------------------------
  // EFFECT #2: keep selectedVenueId synced with URL ?venue=
  // -------------------------
  // useEffect(() => {
  //   const sp = new URLSearchParams(location.search)
  //   const venueFromUrl = sp.get("venue") || ""
  //   if (venueFromUrl !== selectedVenueId) {
  //   setHasFetchedForVenue(false);
  //   setFreezerDevicesLoading(true);
  //   setSelectedVenueId(venueFromUrl);
  //   }
  //   // no dependencies other than location.search so this always runs when URL changes
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location.search])

  useEffect(() => {
  const sp = new URLSearchParams(location.search)
  const venueFromUrl = sp.get("venue") || ""

  // if venueFromUrl unchanged, nothing to do
  if (venueFromUrl === selectedVenueId) return

  if (!venueFromUrl) {
    // No venue in URL — make sure we stop any device-loading UI
    setHasFetchedForVenue(true)
    setFreezerDevicesLoading(false)
    setSelectedVenueId("")
  } else {
    // There *is* a venue in URL — start fetch flow
    setHasFetchedForVenue(false)
    setFreezerDevicesLoading(true)
    setSelectedVenueId(venueFromUrl)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [location.search])


useEffect(() => {
// if (!selectedVenueId) {
//   setFreezerDevices([]);
//   setSelectedFreezerDeviceId(null);
//   autoSelectedForVenueRef.current = {};
//   return;
// }

 if (!selectedVenueId) {
   setFreezerDevices([]);
   setSelectedFreezerDeviceId(null);
   autoSelectedForVenueRef.current = {};
   // no venue -> no loading; mark fetch as completed so spinner stops
   setFreezerDevicesLoading(false);
   setHasFetchedForVenue(true);
   return;
 }

// IMPORTANT FIX:
setFreezerDevicesLoading(true);

  let mounted = true;
  let intervalId = null;
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchDevices = async () => {
    setFreezerDevicesLoading(true);
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

      // if the request was aborted this will throw and be caught below
      const data = await res.json();

      if (!mounted) return;

      if (res.ok) {
        const devices = Array.isArray(data.devices)
          ? data.devices
          : (data.devices ? [data.devices] : []);

        setFreezerDevices(devices || []);

        // Auto-select first device ONLY ON DESKTOP and only once per venue load
        if (isDesktop && devices && devices.length > 0) {
          // hasn't been auto-selected yet for this venue?
          if (!autoSelectedForVenueRef.current[selectedVenueId]) {
            const firstId = devices[0]._id ?? devices[0].id ?? devices[0].deviceId;
            if (firstId) {
              setSelectedFreezerDeviceId(String(firstId));
              // mark that we auto-selected for this venue so we don't repeat
              autoSelectedForVenueRef.current[selectedVenueId] = true;
            }
          }
        }

        // If mobile (<768px), ensure no auto-selection
        if (!isDesktop) {
          // don't stomp an existing user selection if it belongs to some other venue;
          // since we're fetching specifically for selectedVenueId, it's safe to clear here per requirement
          setSelectedFreezerDeviceId(null);
        }
      } else {
        // error response
        setFreezerDevices([]);
        setSelectedFreezerDeviceId(null);
        console.error("Device fetch error:", data?.message);
      }
    } catch (err) {
      if (!mounted) return;
      if (err.name === "AbortError") {
        // request was aborted — no-op
        return;
      }
      console.error("Device fetch error:", err);
      setFreezerDevices([]);
      setSelectedFreezerDeviceId(null);
    } finally{
      setFreezerDevicesLoading(false);
      setHasFetchedForVenue(true);
    }
  };

  // initial fetch
  fetchDevices();

  // start polling for device updates
  intervalId = setInterval(fetchDevices, POLL_MS);

  return () => {
    mounted = false;
    if (intervalId) clearInterval(intervalId);
    controller.abort(); // cancel pending fetch
  };
  // intentionally not including selectedFreezerDeviceId to avoid effect loop when we set it
}, [selectedVenueId, token, isDesktop]);

  // -------------------------
  // simple handlers (kept minimal)
  // -------------------------

   const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const handleFreezerDeviceSelect = (deviceId) => {
    console.log("Card Selected")
    setSelectedFreezerDeviceId(deviceId)
  if (!isDesktop) setOpen(true) 
  }

  // const handleBackToDashboard = () => {
  //   // setShowDetailPage(false)
  //   setSelectedDevice(null)
  // }

  // Admin: when org changes, reset venue selection (keeps URL clean)
  const onOrganizationChange = (id) => {
  
     const orgId = id || user?.organization;
    
  // If org hasn't changed, don't clear the venue or modify URL
  if (orgId && String(orgId) === String(selectedOrgId)) {
    return;
  }

  // Show loading and mark venue-fetch as not-done for the new org
  setHasFetchedForVenue(false);
  setFreezerDevicesLoading(true);
  
    setSelectedOrgId(id || user?.organization)
    setSelectedVenueId("")
    // remove ?venue from URL
    const sp = new URLSearchParams(location.search)
    if (sp.get("venue")) {
      sp.delete("venue")
      navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true })
    }
  }

  // Update URL when VenueSelect is used (or you can dispatch to redux)
  const onVenueChange = (id) => {
    setHasFetchedForVenue(false);
    setFreezerDevicesLoading(true);
    setSelectedVenueId(id)
    const basePath = location.pathname.split("?")[0]
    if (id) navigate(`${basePath}?venue=${id}`, { replace: false })
    else navigate(basePath, { replace: false })
  }

  

  // -------------------------
  // render states for loading / error
  // -------------------------
  if (loading) {
    return (
      <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
        <div className="flex justify-center items-center w-full h-64">
          {/* <div className="text-lg text-gray-600">Loading organizations...</div> */}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex w-full flex-col lg:flex-row h-full bg-gray-100  font-inter rounded-md overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full h-64 space-y-4">
          {/* <div className="text-lg text-red-600">Error: {error}</div> */}
        </div>
      </div>
    )
  }



  // -------------------------
  // main JSX (kept same layout)
  // -------------------------
  return (
    <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">
        
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="w-[11rem] sm:w-[25rem] md:w-[13rem] lg:w-[20rem] xl:w-[25rem]">
                {/* <p className="text-sm text-[#64748B] min-w-[250px] font-medium">Organization</p> */}
                {user?.role === "admin" ? (
                  <OrganizationSelect
                    value={selectedOrgId}
                    onChange={onOrganizationChange}
                    className="mt-1"
                  />
                ): <>
                  <p className="text-gray-500">Organization</p>
                  <h3 className="text-gray-700 font-bold capitalize">{orgNameForTop || ""}</h3>
                </>} 
              </div>

              <div className="flex items-center ">
                <VenueSelect
                  organizationId={selectedOrgId || user?.organization}
                  value={selectedVenueId}
                  onChange={onVenueChange}
                  className="mt-1"
                  excludeFirstN={user?.role === "user" ? 3 : 0}
                />
              </div>
            </div>

            {/* Freezer Device Cards Grid */}
            {/* <div className="flex-1 min-h-0">
              <div className="freezer-cards-container custom-scrollbar">
                {freezerDevices.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
                    <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-lg font-medium">No Freezer Devices Found</p>
                    <p className="text-sm">Add some freezer devices to get started</p>
                  </div>
                ) : (
                  <div className="freezer-cards-grid freezer-cards-container">
                    {freezerDevices.map((device) => (
                      <FreezerDeviceCard
                        key={device._id ?? device.id}
                        deviceId={device.deviceId}
                        ambientTemperature={device?.AmbientData?.temperature ?? device.ambientTemperature}
                        freezerTemperature={device?.FreezerData?.temperature ?? device.freezerTemperature}
                        batteryLow={device?.batteryAlert ?? device?.batteryLow ?? false}
                        refrigeratorAlert={device?.refrigeratorAlert ?? false}
                        onCardSelect={() => handleFreezerDeviceSelect(device._id ?? device.id)}
                        isSelected={(device._id ?? device.id) === selectedFreezerDeviceId}
                        espHumidity ={device?.espHumidity}
                        espTemprature = {device?.espTemprature}
                        humidityAlert = {device?.humidityAlert}
                        odourAlert={device?.odourAlert} 
                        temperatureAlert={device?.temperatureAlert}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div> */}


{/* Freezer Device Cards area */}
<div className="flex-1 min-h-0">
  <div className="freezer-cards-container custom-scrollbar">
    {(freezerDevicesLoading || !hasFetchedForVenue) ? (
      // Loading state: spinner + optional skeleton grid
      <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
        {/* Spinner */}
        <svg className="animate-spin h-12 w-12 mb-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
          <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <p className="text-lg font-medium mb-2">Loading devices…</p>
      </div>
    ) : freezerDevices.length === 0 ? (
      // No devices state (only shown when not loading)
      <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
        <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <p className="text-lg font-medium">No Freezer Devices Found</p>
        <p className="text-sm">Add some freezer devices to get started</p>
      </div>
    ) : (
      // Devices present
      <div className="freezer-cards-grid freezer-cards-container">
        {freezerDevices.map((device) => (
          <FreezerDeviceCard
            key={device._id ?? device.id}
            deviceId={device.deviceId}
            ambientTemperature={device?.AmbientData?.temperature ?? device.ambientTemperature}
            freezerTemperature={device?.FreezerData?.temperature ?? device.freezerTemperature}
            batteryLow={device?.batteryAlert ?? device?.batteryLow ?? false}
            refrigeratorAlert={device?.refrigeratorAlert ?? false}
            onCardSelect={() => handleFreezerDeviceSelect(device._id ?? device.id)}
            isSelected={(device._id ?? device.id) === selectedFreezerDeviceId}
            espHumidity={device?.espHumidity}
            espTemprature={device?.espTemprature}
            humidityAlert={device?.humidityAlert}
            odourAlert={device?.odourAlert}
            temperatureAlert={device?.temperatureAlert}
            espOdour={device?.espOdour}
          />
        ))}
      </div>
    )}
  </div>
</div>

            <AlertsPanel organizationId={selectedOrgId} pollInterval={POLL_MS} />
            {/* <AlertsPanel organizationId={selectedOrgId} pollInterval={2 * 1000} /> */}
          </>
        {/* )} */}

      </div>

      {/* Right Sidebar - Venue Details Panel */}
      {/* <div className="dashboard-right-panel shadow-sm flex flex-col h-full overflow-y-auto custom-scrollbar p-4 lg:p-6 border-l border-[#E5E7EB]/40 bg-white flex-shrink-0">
        {selectedFreezerDeviceId ? (
          (() => {
            const selected = freezerDevices.find((d) => (d._id ?? d.id) === selectedFreezerDeviceId)
            return (
              <VenueDetailsPanel
                venueName={ "Venue"}
                freezerTemperature={selected?.AmbientData?.temperature ?? 0}
                ambientTemperature={selected?.FreezerData?.temperature ?? 0}
                batteryLow={selected?.batteryLow ?? selected?.batteryAlert ?? false}
                needMaintenance={selected?.batteryLow ?? false}
                apiKey={selected?.apiKey}
                chartData={[]}
                organizationId={selectedOrgId}
              />
            )
          })()
        ) : (
          <VenueDetailsPanel
            venueName={"Venue"}
            freezerTemperature={0}
            ambientTemperature={0}
            batteryLow={true}
            needMaintenance={true}
            apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
            chartData={[]}
            organizationId={selectedOrgId}
          />
        )}
      </div> */}

{isDesktop ? (
        <DashboardRightPanel
      freezerDevices={freezerDevices}
      selectedFreezerDeviceId={selectedFreezerDeviceId}
      selectedOrgId={selectedOrgId}
      
    />  
    ) : (
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <DashboardRightPanel
      freezerDevices={freezerDevices}
      selectedFreezerDeviceId={selectedFreezerDeviceId}
      selectedOrgId={selectedOrgId}
      closeIcon={true}
       onClose={toggleDrawer(false)}
    />
      </Drawer>
    )}
    </div>
  )
}






















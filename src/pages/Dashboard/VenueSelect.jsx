// import { useEffect, useState, useRef } from "react";
// import { useStore } from "../../contexts/storecontexts";
// import { getVenuePriority, priorityWeight } from "../../utils/venuePriorities";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// // const getToken = () => localStorage.getItem("token");
// /**
//  * Props:
//  * - organizationId (required)
//  * - value : selected venue id
//  * - onChange : fn(id)
//  * - className
//  * - excludeFirstN : number of first venues to exclude from the select (default 0)
//  */

// export default function VenueSelect({ organizationId, value, onChange, className = "", excludeFirstN = 0 }) {
//   const { user, getToken } = useStore();

//   console.log("User>", user);
  
//   const [venues, setVenues] = useState([]);
//   const [visibleVenues, setVisibleVenues] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(value ?? "");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     setSelected(value ?? "");
//   }, [value]);

//   // useEffect(() => {
//   //   if (!organizationId) {
//   //     setVenues([]);
//   //     setVisibleVenues([]);
//   //     setSelected("");
//   //     setError(null);
//   //     return;
//   //   }

//   //   const abortCtrl = new AbortController();
//   //   const fetchVenues = async () => {
//   //     try {
//   //       setLoading(true);
//   //       setError(null);
//   //       const token = getToken();
//   //       const res = await fetch(`${BASE}/venue/venue-by-org/${organizationId}`, {
//   //         method: "GET",
//   //         credentials: "include",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   //         },
//   //         signal: abortCtrl.signal,
//   //       });

//   //       const data = await res.json();
//   //       if (!res.ok) {
//   //         const message = data?.message || "Failed to fetch venues";
//   //         setVenues([]);
//   //         setVisibleVenues([]);
//   //         setSelected("");
//   //         setError(message);
//   //         setLoading(false);
//   //         return;
//   //       }

//   //       const arr = Array.isArray(data) ? data : Array.isArray(data?.venues) ? data.venues : [];
//   //       setVenues(arr);

//   //       const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;
//   //       setVisibleVenues(filtered);

//   //       if ((!value || value === "") && filtered.length > 0) {
//   //         const firstId = String(filtered[0]._id ?? filtered[0].id ?? filtered[0]);
//   //         setSelected(firstId);
//   //         if (typeof onChange === "function") onChange(firstId);
//   //       } else if (value) {
//   //         setSelected(value);
//   //       }
//   //     } catch (err) {
//   //       if (err.name === "AbortError") return;
//   //       console.error("Venue fetch error:", err);
//   //       setError(err.message || "Network error");
//   //       setVenues([]);
//   //       setVisibleVenues([]);
//   //       setSelected("");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchVenues();
//   //   return () => abortCtrl.abort();
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [organizationId, excludeFirstN]);

//   // inside VenueSelect component, replace the fetch useEffect with this:

// useEffect(() => {
//   if (!organizationId){
//     setVenues([]);
//     setVisibleVenues([]);
//     setSelected("");
//     setError(null);
//     return;
//   }

//   const abortCtrl = new AbortController();
//   const fetchVenues = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = getToken();

//       // If this user was created by another user, fetch user-specific venues
//       // otherwise fetch organization venues
//       const isUserCreatedByUser = user?.createdBy && String(user.createdBy) === "user";
//       const url = isUserCreatedByUser
//         ? `${BASE}/venue/${user._id}`
//         : `${BASE}/venue/venue-by-org/${organizationId}`;

//       const res = await fetch(url, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         signal: abortCtrl.signal,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         const message = data?.message || "Failed to fetch venues";
//         setVenues([]);
//         setVisibleVenues([]);
//         setSelected("");
//         setError(message);
//         setLoading(false);
//         return;
//       }

//       // server might return either an array or { venues: [...] }
//       const arr = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.venues)
//         ? data.venues
//         : [];

//         console.log("arr", arr)

//       // If the user-specific endpoint returns objects like { venueId, venueName }
//       // keep them as-is: downstream code handles v._id or v.id or v.venueId
//       setVenues(arr);

//       const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;
//       setVisibleVenues(filtered);

//       // auto-select first visible if no explicit value
//       if ((!value || value === "") && filtered.length > 0) {
//         const firstId = String(filtered[0]._id ?? filtered[0].id ?? filtered[0].venueId ?? filtered[0]);
//         setSelected(firstId);
//         if (typeof onChange === "function") onChange(firstId);
//       } else if (value) {
//         setSelected(value);
//       }
//     } catch (err) {
//       if (err.name === "AbortError") return;
//       console.error("Venue fetch error:", err);
//       setError(err.message || "Network error");
//       setVenues([]);
//       setVisibleVenues([]);
//       setSelected("");
//     } finally {
//       if (!abortCtrl.signal.aborted) setLoading(false);
//     }
//   };

//   fetchVenues();
//   return () => abortCtrl.abort();
// // include user in deps because we read user.createdBy and user._id
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [organizationId, excludeFirstN, user]);



//   useEffect(() => {
//     function handleOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false);
//     }
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   const handleSelect = (id) => {
//     setSelected(String(id));
//     if (typeof onChange === "function") onChange(String(id));
//     setDropdownOpen(false);
//   };

//   const handleKeyboard = (e) => {
//     if (e.key === "Enter") setDropdownOpen((s) => !s);
//     if (e.key === "Escape") setDropdownOpen(false);
//   };

//   // keep hiding behavior: if user and total venues <= 3 => don't show control
//   if (user?.role === "user" && venues?.length <= 3) return null;
//   // if (venues?.length <= 3) return null;

//   const selectedVenue = visibleVenues.find((v) => String(v._id ?? v.id ?? v) === String(selected));
//   const label = loading ? "Loading venues..." : selectedVenue ? selectedVenue.name ?? selectedVenue.venueName ?? String(selected) : "Venue";

//   return (
//     <div className={className} ref={ref}>
//       {/* <div className="grid grid-cols-2 items-center gap-4 w-[6rem] sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]  "> */}
//           <div className="grid grid-cols-2 items-center gap-4 sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]">
//         {/* <label className="text-left font-medium text-gray-700">Venue</label> */}

//         <div className="relative col-span-2 ">
//           <div
//             role="button"
//             tabIndex={0}
//             onKeyDown={handleKeyboard}
//             onClick={() => !loading && organizationId && setDropdownOpen((s) => !s)}
//             className={`sm:rounded-full flex items-center justify-between pr-2 pl-3 py-2 border cursor-pointer bg-[#0D5CA4] text-white select-none  rounded-full`}
//           >
//             <span className="text-white truncate w-[90%] sm:max-w-[70%]">{label}</span>
//           <svg
//           className={`w-6 h-6 ml-2 bg-white rounded-full p-[2px] transform ${
//             dropdownOpen ? "rotate-180" : "rotate-0"
//           }`}
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M7 10c-.7 0-1 .8-.5 1.3l4.3 4.3c.7.7 1.9.7 2.6 0l4.3-4.3c.5-.5.2-1.3-.5-1.3H7z"
//             fill="#0D5CA4"
//             stroke="#0D5CA4"
//             strokeWidth="1.3"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//         </svg>


//           </div>

//           {/* Dropdown menu */}
//           {dropdownOpen && (
            
//             <div className=" absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
//               {loading ? (
//                 <div className="px-4 py-3 text-sm text-gray-500">venue</div>
//               ) : visibleVenues && visibleVenues.length > 0 ? (
//                 visibleVenues.map((v) => {
//                   const id = String(v._id ?? v.id ?? v);
//                   const name = v.name ?? v.venue_name ?? v.venueName ?? id;
//                   return (
//                     <div
//                       key={id}
//                       onClick={() => handleSelect(id)}
//                       className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm flex items-center justify-between ${String(selected) === id ? "bg-gray-50" : ""}`}
//                     >
//                       <div className="truncate">{name}</div>
//                       {String(selected) === id && (
//                         <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="px-4 py-3 text-sm text-gray-500">No venues found</div>
//               )}
              
//             </div>
            
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }







// import { useEffect, useState, useRef } from "react";
// import { useStore } from "../../contexts/storecontexts";
// import { getVenuePriority, priorityWeight } from "../../utils/venuePriorities";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// // const getToken = () => localStorage.getItem("token");
// /**
//  * Props:
//  * - organizationId (required)
//  * - value : selected venue id
//  * - onChange : fn(id)
//  * - className
//  * - excludeFirstN : number of first venues to exclude from the select (default 0)
//  */

// export default function VenueSelect({ organizationId, value, onChange, className = "", excludeFirstN = 0 }) {
//   const { user, getToken } = useStore();

//   console.log("User>", user);
  
//   const [venues, setVenues] = useState([]);
//   const [visibleVenues, setVisibleVenues] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(value ?? "");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const ref = useRef(null);
// const [reloadKey, setReloadKey] = useState(0);
//   useEffect(() => {
//     setSelected(value ?? "");
//   }, [value]);

//   useEffect(() => {
//   const onUpdated = () => setReloadKey(k => k + 1);
//   window.addEventListener("venue:updated", onUpdated);
//   return () => window.removeEventListener("venue:updated", onUpdated);
// }, []);

//   // useEffect(() => {
//   //   if (!organizationId) {
//   //     setVenues([]);
//   //     setVisibleVenues([]);
//   //     setSelected("");
//   //     setError(null);
//   //     return;
//   //   }

//   //   const abortCtrl = new AbortController();
//   //   const fetchVenues = async () => {
//   //     try {
//   //       setLoading(true);
//   //       setError(null);
//   //       const token = getToken();
//   //       const res = await fetch(`${BASE}/venue/venue-by-org/${organizationId}`, {
//   //         method: "GET",
//   //         credentials: "include",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   //         },
//   //         signal: abortCtrl.signal,
//   //       });

//   //       const data = await res.json();
//   //       if (!res.ok) {
//   //         const message = data?.message || "Failed to fetch venues";
//   //         setVenues([]);
//   //         setVisibleVenues([]);
//   //         setSelected("");
//   //         setError(message);
//   //         setLoading(false);
//   //         return;
//   //       }

//   //       const arr = Array.isArray(data) ? data : Array.isArray(data?.venues) ? data.venues : [];
//   //       setVenues(arr);

//   //       const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;
//   //       setVisibleVenues(filtered);

//   //       if ((!value || value === "") && filtered.length > 0) {
//   //         const firstId = String(filtered[0]._id ?? filtered[0].id ?? filtered[0]);
//   //         setSelected(firstId);
//   //         if (typeof onChange === "function") onChange(firstId);
//   //       } else if (value) {
//   //         setSelected(value);
//   //       }
//   //     } catch (err) {
//   //       if (err.name === "AbortError") return;
//   //       console.error("Venue fetch error:", err);
//   //       setError(err.message || "Network error");
//   //       setVenues([]);
//   //       setVisibleVenues([]);
//   //       setSelected("");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchVenues();
//   //   return () => abortCtrl.abort();
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [organizationId, excludeFirstN]);

//   // inside VenueSelect component, replace the fetch useEffect with this:

// // useEffect(() => {
// //   if (!organizationId){
// //     setVenues([]);
// //     setVisibleVenues([]);
// //     setSelected("");
// //     setError(null);
// //     return;
// //   }

// //   const abortCtrl = new AbortController();
// //   const fetchVenues = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const token = getToken();

// //       // If this user was created by another user, fetch user-specific venues
// //       // otherwise fetch organization venues
// //       const isUserCreatedByUser = user?.createdBy && String(user.createdBy) === "user";
// //       const url = isUserCreatedByUser
// //         ? `${BASE}/venue/${user._id}`
// //         : `${BASE}/venue/venue-by-org/${organizationId}`;

// //       const res = await fetch(url, {
// //         method: "GET",
// //         credentials: "include",
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //         },
// //         signal: abortCtrl.signal,
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         const message = data?.message || "Failed to fetch venues";
// //         setVenues([]);
// //         setVisibleVenues([]);
// //         setSelected("");
// //         setError(message);
// //         setLoading(false);
// //         return;
// //       }

// //       // server might return either an array or { venues: [...] }
// //       const arr = Array.isArray(data)
// //         ? data
// //         : Array.isArray(data?.venues)
// //         ? data.venues
// //         : [];

// //         console.log("arr", arr)

// //       // If the user-specific endpoint returns objects like { venueId, venueName }
// //       // keep them as-is: downstream code handles v._id or v.id or v.venueId
// //       setVenues(arr);

// //       const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;
// //       setVisibleVenues(filtered);

// //       // auto-select first visible if no explicit value
// //       if ((!value || value === "") && filtered.length > 0) {
// //         const firstId = String(filtered[0]._id ?? filtered[0].id ?? filtered[0].venueId ?? filtered[0]);
// //         setSelected(firstId);
// //         if (typeof onChange === "function") onChange(firstId);
// //       } else if (value) {
// //         setSelected(value);
// //       }
// //     } catch (err) {
// //       if (err.name === "AbortError") return;
// //       console.error("Venue fetch error:", err);
// //       setError(err.message || "Network error");
// //       setVenues([]);
// //       setVisibleVenues([]);
// //       setSelected("");
// //     } finally {
// //       if (!abortCtrl.signal.aborted) setLoading(false);
// //     }
// //   };

// //   fetchVenues();
// //   return () => abortCtrl.abort();
// // // include user in deps because we read user.createdBy and user._id
// // // eslint-disable-next-line react-hooks/exhaustive-deps
// // }, [organizationId, excludeFirstN, user]);

// useEffect(() => {
//   if (!organizationId) {
//     setVenues([]);
//     setVisibleVenues([]);
//     setSelected("");
//     setError(null);
//     return;
//   }

//   const abortCtrl = new AbortController();
//   const fetchVenues = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = getToken();

//       const isUserCreatedByUser = user?.createdBy && String(user.createdBy) === "user";
//       const url = isUserCreatedByUser
//         ? `${BASE}/venue/${user._id}`
//         : `${BASE}/venue/venue-by-org/${organizationId}`;

//       const res = await fetch(url, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         signal: abortCtrl.signal,
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         const message = data?.message || "Failed to fetch venues";
//         setVenues([]);
//         setVisibleVenues([]);
//         setSelected("");
//         setError(message);
//         setLoading(false);
//         return;
//       }

//       const arr = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.venues)
//         ? data.venues
//         : [];

//       // keep raw list for other uses
//       setVenues(arr);

//       // apply excludeFirstN (we only apply priority sorting to the visible subset)
//       const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;

//       // build an array with computed priority and sorting weight
//       const withPriority = filtered.map((v) => {
//         const id = String(v._id ?? v.id ?? v.venueId ?? v);
//         const p = getVenuePriority(id); // 'high'|'medium'|'low' (defaults in helper)
//         return {
//           __id: id,
//           __priority: p,
//           __weight: priorityWeight(p),
//           ...v,
//         };
//       });

//       // sort by weight desc (high first), then by name (fallback to id)
//       withPriority.sort((a, b) => {
//         if (b.__weight !== a.__weight) return b.__weight - a.__weight;
//         const an = (a.name ?? a.venue_name ?? a.venueName ?? a.__id).toString().toLowerCase();
//         const bn = (b.name ?? b.venue_name ?? b.venueName ?? b.__id).toString().toLowerCase();
//         return an.localeCompare(bn);
//       });

//       // strip helper props and set visibleVenues
//       const finalVisible = withPriority.map(({ __priority, __weight, __id, ...rest }) => rest);
//       setVisibleVenues(finalVisible);

//       // auto-select first visible if no explicit value
//       if ((!value || value === "") && finalVisible.length > 0) {
//         const firstId = String(finalVisible[0]._id ?? finalVisible[0].id ?? finalVisible[0].venueId ?? finalVisible[0]);
//         setSelected(firstId);
//         if (typeof onChange === "function") onChange(firstId);
//       } else if (value) {
//         setSelected(value);
//       }
//     } catch (err) {
//       if (err.name === "AbortError") return;
//       console.error("Venue fetch error:", err);
//       setError(err.message || "Network error");
//       setVenues([]);
//       setVisibleVenues([]);
//       setSelected("");
//     } finally {
//       if (!abortCtrl.signal.aborted) setLoading(false);
//     }
//   };

//   fetchVenues();
//   return () => abortCtrl.abort();
// // include user in deps because we read user.createdBy and user._id
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [organizationId, excludeFirstN, user, reloadKey]);



//   useEffect(() => {
//     function handleOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false);
//     }
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   const handleSelect = (id) => {
//     setSelected(String(id));
//     if (typeof onChange === "function") onChange(String(id));
//     setDropdownOpen(false);
//   };

//   const handleKeyboard = (e) => {
//     if (e.key === "Enter") setDropdownOpen((s) => !s);
//     if (e.key === "Escape") setDropdownOpen(false);
//   };

//   // keep hiding behavior: if user and total venues <= 3 => don't show control
//   if (user?.role === "user" && venues?.length <= 3) return null;
//   // if (venues?.length <= 3) return null;

//   const selectedVenue = visibleVenues.find((v) => String(v._id ?? v.id ?? v) === String(selected));
//   const label = loading ? "Loading venues..." : selectedVenue ? selectedVenue.name ?? selectedVenue.venueName ?? String(selected) : "Venue";

//   return (
//     <div className={className} ref={ref}>
//       {/* <div className="grid grid-cols-2 items-center gap-4 w-[6rem] sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]  "> */}
//           <div className="grid grid-cols-2 items-center gap-4 sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]">
//         {/* <label className="text-left font-medium text-gray-700">Venue</label> */}

//         <div className="relative col-span-2 ">
//           <div
//             role="button"
//             tabIndex={0}
//             onKeyDown={handleKeyboard}
//             onClick={() => !loading && organizationId && setDropdownOpen((s) => !s)}
//             className={`sm:rounded-full flex items-center justify-between pr-2 pl-3 py-2 border cursor-pointer bg-[#0D5CA4] text-white select-none  rounded-full`}
//           >
//             <span className="text-white truncate w-[90%] sm:max-w-[70%]">{label}</span>
//           <svg
//           className={`w-6 h-6 ml-2 bg-white rounded-full p-[2px] transform ${
//             dropdownOpen ? "rotate-180" : "rotate-0"
//           }`}
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M7 10c-.7 0-1 .8-.5 1.3l4.3 4.3c.7.7 1.9.7 2.6 0l4.3-4.3c.5-.5.2-1.3-.5-1.3H7z"
//             fill="#0D5CA4"
//             stroke="#0D5CA4"
//             strokeWidth="1.3"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//         </svg>


//           </div>

//           {/* Dropdown menu */}
//           {dropdownOpen && (
            
//             <div className=" absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
//               {loading ? (
//                 <div className="px-4 py-3 text-sm text-gray-500">venue</div>
//               ) : visibleVenues && visibleVenues.length > 0 ? (
//                 visibleVenues.map((v) => {
//                   const id = String(v._id ?? v.id ?? v);
//                   const name = v.name ?? v.venue_name ?? v.venueName ?? id;
//                   return (
//                     <div
//                       key={id}
//                       onClick={() => handleSelect(id)}
//                       className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm flex items-center justify-between ${String(selected) === id ? "bg-gray-50" : ""}`}
//                     >
//                       <div className="truncate">{name}</div>
//                       {String(selected) === id && (
//                         <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="px-4 py-3 text-sm text-gray-500">No venues found</div>
//               )}
              
//             </div>
            
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// // Above code is same I am implementing the functionality of persistant selection of organization and venue here below

// import { useEffect, useState, useRef } from "react";
// import { useStore } from "../../contexts/storecontexts";
// import { getVenuePriority, priorityWeight } from "../../utils/venuePriorities";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// // const getToken = () => localStorage.getItem("token");
// /**
//  * Props:
//  * - organizationId (required)
//  * - value : selected venue id
//  * - onChange : fn(id)
//  * - className
//  * - excludeFirstN : number of first venues to exclude from the select (default 0)
//  */

// export default function VenueSelect({ organizationId, value, onChange, className = "", excludeFirstN = 0 }) {
//   const { user, getToken } = useStore();

//   console.log("User>", user);

//   const [venues, setVenues] = useState([]);
//   const [visibleVenues, setVisibleVenues] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(value ?? "");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const ref = useRef(null);
//   const [reloadKey, setReloadKey] = useState(0);



//   useEffect(() => {
//     setSelected(value ?? "");
//   }, [value]);

//   useEffect(() => {
//     const onUpdated = () => setReloadKey(k => k + 1);
//     window.addEventListener("venue:updated", onUpdated);
//     return () => window.removeEventListener("venue:updated", onUpdated);
//   }, []);


//   useEffect(() => {
//     if (!organizationId) {
//       setVenues([]);
//       setVisibleVenues([]);
//       setSelected("");
//       setError(null);
//       return;
//     }

//     const abortCtrl = new AbortController();
//     const fetchVenues = async () => {
//       try {

//         setLoading(true);
//         setError(null);
//         const token = getToken();

//         const isUserCreatedByUser = user?.createdBy && String(user.createdBy) === "user";
//         const url = isUserCreatedByUser
//           ? `${BASE}/venue/${user._id}`
//           : `${BASE}/venue/venue-by-org/${organizationId}`;

//         const res = await fetch(url, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//           signal: abortCtrl.signal,
//         });

//         const data = await res.json();
//         if (!res.ok) {
//           const message = data?.message || "Failed to fetch venues";
//           setVenues([]);
//           setVisibleVenues([]);
//           setSelected("");
//           setError(message);
//           setLoading(false);
//           return;
//         }

//         const arr = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.venues)
//             ? data.venues
//             : [];

//         // keep raw list for other uses
//         setVenues(arr);

//         // apply excludeFirstN (we only apply priority sorting to the visible subset)
//         const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;

//         // build an array with computed priority and sorting weight
//         const withPriority = filtered.map((v) => {
//           const id = String(v._id ?? v.id ?? v.venueId ?? v);
//           const p = getVenuePriority(id); // 'high'|'medium'|'low' (defaults in helper)
//           return {
//             __id: id,
//             __priority: p,
//             __weight: priorityWeight(p),
//             ...v,
//           };
//         });

//         // sort by weight desc (high first), then by name (fallback to id)
//         withPriority.sort((a, b) => {
//           if (b.__weight !== a.__weight) return b.__weight - a.__weight;
//           const an = (a.name ?? a.venue_name ?? a.venueName ?? a.__id).toString().toLowerCase();
//           const bn = (b.name ?? b.venue_name ?? b.venueName ?? b.__id).toString().toLowerCase();
//           return an.localeCompare(bn);
//         });

//         // strip helper props and set visibleVenues
//         const finalVisible = withPriority.map(({ __priority, __weight, __id, ...rest }) => rest);
//         setVisibleVenues(finalVisible);

//         // If parent already selected a venue (URL-driven), NEVER auto-select
//         if (value) {
//           setSelected(value);
//           setVisibleVenues(finalVisible);
//           return;
//         }


//         // auto-select first visible if no explicit value
//         // if ((!value || value === "") && finalVisible.length > 0) {
//         //   const firstId = String(finalVisible[0]._id ?? finalVisible[0].id ?? finalVisible[0].venueId ?? finalVisible[0]);
//         //   setSelected(firstId);
//         //   if (typeof onChange === "function") onChange(firstId);
//         // }
//         if (!value && finalVisible.length > 0) {
//           const firstId = String(finalVisible[0]._id ?? finalVisible[0].id ?? finalVisible[0].venueId ?? finalVisible[0]);
//           setSelected(firstId);
//           onChange?.(firstId);
//         }
//         else if (value) {
//           setSelected(value);
//         }
//       } catch (err) {
//         if (err.name === "AbortError") return;
//         console.error("Venue fetch error:", err);
//         setError(err.message || "Network error");
//         setVenues([]);
//         setVisibleVenues([]);
//         setSelected("");
//       } finally {
//         if (!abortCtrl.signal.aborted) setLoading(false);
//       }
//     };

//     fetchVenues();
//     return () => abortCtrl.abort();
//     // include user in deps because we read user.createdBy and user._id
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [organizationId, excludeFirstN, user, reloadKey]);



//   useEffect(() => {
//     function handleOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false);
//     }
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   const handleSelect = (id) => {
//     setSelected(String(id));
//     if (typeof onChange === "function") onChange(String(id));
//     setDropdownOpen(false);
//   };

//   const handleKeyboard = (e) => {
//     if (e.key === "Enter") setDropdownOpen((s) => !s);
//     if (e.key === "Escape") setDropdownOpen(false);
//   };

//   // keep hiding behavior: if user and total venues <= 3 => don't show control
//   if (user?.role === "user" && venues?.length <= 3) return null;
//   // if (venues?.length <= 3) return null;

//   const selectedVenue = visibleVenues.find((v) => String(v._id ?? v.id ?? v) === String(selected));
//   // const label = loading ? "Loading venues..." : selectedVenue ? selectedVenue.name ?? selectedVenue.venueName ?? String(selected) : "Venue";
//   // show readable name when available; otherwise show the selected id (so UI doesn't appear blank)
//   const label = loading
//     ? "Loading venues..."
//     : selectedVenue
//       ? selectedVenue.name ?? selectedVenue.venueName ?? String(selected)
//       : (selected ? String(selected) : "Venue");

//   console.log("selected:>", selected);

//   return (
//     <div className={className} ref={ref}>
//       {/* <div className="grid grid-cols-2 items-center gap-4 w-[6rem] sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]  "> */}
//       <div className="grid grid-cols-2 items-center gap-4 sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]">
//         {/* <label className="text-left font-medium text-gray-700">Venue</label> */}

//         <div className="relative col-span-2 ">
//           <div
//             role="button"
//             tabIndex={0}
//             onKeyDown={handleKeyboard}
//             onClick={() => !loading && organizationId && setDropdownOpen((s) => !s)}
//             className={`sm:rounded-full flex items-center justify-between pr-2 pl-3 py-2 border cursor-pointer bg-[#0D5CA4] text-white select-none  rounded-full`}
//           >
//             <span className="text-white truncate w-[90%] sm:max-w-[70%]">{label}</span>
//             <svg
//               className={`w-6 h-6 ml-2 bg-white rounded-full p-[2px] transform ${dropdownOpen ? "rotate-180" : "rotate-0"
//                 }`}
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M7 10c-.7 0-1 .8-.5 1.3l4.3 4.3c.7.7 1.9.7 2.6 0l4.3-4.3c.5-.5.2-1.3-.5-1.3H7z"
//                 fill="#0D5CA4"
//                 stroke="#0D5CA4"
//                 strokeWidth="1.3"
//                 strokeLinejoin="round"
//                 strokeLinecap="round"
//               />
//             </svg>


//           </div>

//           {/* Dropdown menu */}
//           {dropdownOpen && (

//             <div className=" absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
//               {loading ? (
//                 <div className="px-4 py-3 text-sm text-gray-500">venue</div>
//               ) : visibleVenues && visibleVenues.length > 0 ? (
//                 visibleVenues.map((v) => {
//                   const id = String(v._id ?? v.id ?? v);
//                   const name = v.name ?? v.venue_name ?? v.venueName ?? id;
//                   return (
//                     <div
//                       key={id}
//                       onClick={() => handleSelect(id)}
//                       className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm flex items-center justify-between ${String(selected) === id ? "bg-gray-50" : ""}`}
//                     >
//                       <div className="truncate">{name}</div>
//                       {String(selected) === id && (
//                         <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="px-4 py-3 text-sm text-gray-500">No venues found</div>
//               )}

//             </div>

//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState, useRef } from "react";
// import { useStore } from "../../contexts/storecontexts";
// import { getVenuePriority, priorityWeight } from "../../utils/venuePriorities";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// // const getToken = () => localStorage.getItem("token");
// /**
//  * Props:
//  * - organizationId (required)
//  * - value : selected venue id
//  * - onChange : fn(id)
//  * - className
//  * - excludeFirstN : number of first venues to exclude from the select (default 0)
//  */

// export default function VenueSelect({ organizationId, value, onChange, className = "", excludeFirstN = 0 }) {
//   const { user, getToken } = useStore();

//   console.log("User>", user);
  
//   const [venues, setVenues] = useState([]);
//   const [visibleVenues, setVisibleVenues] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(value ?? "");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const ref = useRef(null);
// const [reloadKey, setReloadKey] = useState(0);

 

//   useEffect(() => {
//     setSelected(value ?? "");
//   }, [value]);

//   useEffect(() => {
//   const onUpdated = () => setReloadKey(k => k + 1);
//   window.addEventListener("venue:updated", onUpdated);
//   return () => window.removeEventListener("venue:updated", onUpdated);
// }, []);


// useEffect(() => {
//   if (!organizationId) {
//     setVenues([]);
//     setVisibleVenues([]);
//     setSelected("");
//     setError(null);
//     return;
//   }

//   const abortCtrl = new AbortController();
//   const fetchVenues = async () => {
//     try {
   
//       setLoading(true);
//       setError(null);
//       const token = getToken();

//       const isUserCreatedByUser = user?.createdBy && String(user.createdBy) === "user";
//       const url = isUserCreatedByUser
//         ? `${BASE}/venue/${user._id}`
//         : `${BASE}/venue/venue-by-org/${organizationId}`;

//       const res = await fetch(url, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         signal: abortCtrl.signal,
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         const message = data?.message || "Failed to fetch venues";
//         setVenues([]);
//         setVisibleVenues([]);
//         setSelected("");
//         setError(message);
//         setLoading(false);
//         return;
//       }

//       const arr = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.venues)
//         ? data.venues
//         : [];

//       // keep raw list for other uses
//       setVenues(arr);

//       // apply excludeFirstN (we only apply priority sorting to the visible subset)
//       const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;

//       // build an array with computed priority and sorting weight
//       const withPriority = filtered.map((v) => {
//         const id = String(v._id ?? v.id ?? v.venueId ?? v);
//         const p = getVenuePriority(id); // 'high'|'medium'|'low' (defaults in helper)
//         return {
//           __id: id,
//           __priority: p,
//           __weight: priorityWeight(p),
//           ...v,
//         };
//       });

//       // sort by weight desc (high first), then by name (fallback to id)
//       withPriority.sort((a, b) => {
//         if (b.__weight !== a.__weight) return b.__weight - a.__weight;
//         const an = (a.name ?? a.venue_name ?? a.venueName ?? a.__id).toString().toLowerCase();
//         const bn = (b.name ?? b.venue_name ?? b.venueName ?? b.__id).toString().toLowerCase();
//         return an.localeCompare(bn);
//       });

//       // strip helper props and set visibleVenues
//       const finalVisible = withPriority.map(({ __priority, __weight, __id, ...rest }) => rest);
//       setVisibleVenues(finalVisible);

//         // If parent already selected a venue (URL-driven), NEVER auto-select
//           if (value) {
//             setSelected(value);
//             setVisibleVenues(finalVisible);
//             return;
//           }


//       // auto-select first visible if no explicit value
//       // if ((!value || value === "") && finalVisible.length > 0) {
//       //   const firstId = String(finalVisible[0]._id ?? finalVisible[0].id ?? finalVisible[0].venueId ?? finalVisible[0]);
//       //   setSelected(firstId);
//       //   if (typeof onChange === "function") onChange(firstId);
//       // }
//       if (!value && finalVisible.length > 0) {
//         const firstId = String(finalVisible[0]._id ?? finalVisible[0].id ?? finalVisible[0].venueId ?? finalVisible[0]);
//         setSelected(firstId);
//         onChange?.(firstId);
//       }
//        else if (value) {
//         setSelected(value);
//       }
//     } catch (err) {
//       if (err.name === "AbortError") return;
//       console.error("Venue fetch error:", err);
//       setError(err.message || "Network error");
//       setVenues([]);
//       setVisibleVenues([]);
//       setSelected("");
//     } finally {
//       if (!abortCtrl.signal.aborted) setLoading(false);
//     }
//   };

//   fetchVenues();
//   return () => abortCtrl.abort();
// // include user in deps because we read user.createdBy and user._id
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [organizationId, excludeFirstN, user, reloadKey]);



//   useEffect(() => {
//     function handleOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false);
//     }
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   const handleSelect = (id) => {
//     setSelected(String(id));
//     if (typeof onChange === "function") onChange(String(id));
//     setDropdownOpen(false);
//   };

//   const handleKeyboard = (e) => {
//     if (e.key === "Enter") setDropdownOpen((s) => !s);
//     if (e.key === "Escape") setDropdownOpen(false);
//   };

//   // keep hiding behavior: if user and total venues <= 3 => don't show control
//   if (user?.role === "user" && venues?.length <= 3) return null;
//   // if (venues?.length <= 3) return null;

//   const selectedVenue = visibleVenues.find((v) => String(v._id ?? v.id ?? v) === String(selected));
//   const label = loading ? "Loading venues..." : selectedVenue ? selectedVenue.name ?? selectedVenue.venueName ?? String(selected) : "Venue";

//   return (
//     <div className={className} ref={ref}>
//       {/* <div className="grid grid-cols-2 items-center gap-4 w-[6rem] sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]  "> */}
//           <div className="grid grid-cols-2 items-center gap-4 sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]">
//         {/* <label className="text-left font-medium text-gray-700">Venue</label> */}

//         <div className="relative col-span-2 ">
//           <div
//             role="button"
//             tabIndex={0}
//             onKeyDown={handleKeyboard}
//             onClick={() => !loading && organizationId && setDropdownOpen((s) => !s)}
//             className={`sm:rounded-full flex items-center justify-between pr-2 pl-3 py-2 border cursor-pointer bg-[#0D5CA4] text-white select-none  rounded-full`}
//           >
//             <span className="text-white truncate w-[90%] sm:max-w-[70%]">{label}</span>
//           <svg
//           className={`w-6 h-6 ml-2 bg-white rounded-full p-[2px] transform ${
//             dropdownOpen ? "rotate-180" : "rotate-0"
//           }`}
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M7 10c-.7 0-1 .8-.5 1.3l4.3 4.3c.7.7 1.9.7 2.6 0l4.3-4.3c.5-.5.2-1.3-.5-1.3H7z"
//             fill="#0D5CA4"
//             stroke="#0D5CA4"
//             strokeWidth="1.3"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//         </svg>


//           </div>

//           {/* Dropdown menu */}
//           {dropdownOpen && (
            
//             <div className=" absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
//               {loading ? (
//                 <div className="px-4 py-3 text-sm text-gray-500">venue</div>
//               ) : visibleVenues && visibleVenues.length > 0 ? (
//                 visibleVenues.map((v) => {
//                   const id = String(v._id ?? v.id ?? v);
//                   const name = v.name ?? v.venue_name ?? v.venueName ?? id;
//                   return (
//                     <div
//                       key={id}
//                       onClick={() => handleSelect(id)}
//                       className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm flex items-center justify-between ${String(selected) === id ? "bg-gray-50" : ""}`}
//                     >
//                       <div className="truncate">{name}</div>
//                       {String(selected) === id && (
//                         <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="px-4 py-3 text-sm text-gray-500">No venues found</div>
//               )}
              
//             </div>
            
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
























// Total Perfectly fine Venue Code only the persistance of Venue and Organization on refresh is not here 
// import { useEffect, useState, useRef } from "react";
// import { useStore } from "../../contexts/storecontexts";
// import { getVenuePriority, priorityWeight } from "../../utils/venuePriorities";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// // const getToken = () => localStorage.getItem("token");
// /**
//  * Props:
//  * - organizationId (required)
//  * - value : selected venue id
//  * - onChange : fn(id)
//  * - className
//  * - excludeFirstN : number of first venues to exclude from the select (default 0)
//  */

// export default function VenueSelect({ organizationId, value, onChange, className = "", excludeFirstN = 0 }) {
//   const { user, getToken } = useStore();

//   console.log("User>", user);
  
//   const [venues, setVenues] = useState([]);
//   const [visibleVenues, setVisibleVenues] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(value ?? "");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const ref = useRef(null);
// const [reloadKey, setReloadKey] = useState(0);
//   useEffect(() => {
//     setSelected(value ?? "");
//   }, [value]);

//   useEffect(() => {
//   const onUpdated = () => setReloadKey(k => k + 1);
//   window.addEventListener("venue:updated", onUpdated);
//   return () => window.removeEventListener("venue:updated", onUpdated);
// }, []);

//   // useEffect(() => {
//   //   if (!organizationId) {
//   //     setVenues([]);
//   //     setVisibleVenues([]);
//   //     setSelected("");
//   //     setError(null);
//   //     return;
//   //   }

//   //   const abortCtrl = new AbortController();
//   //   const fetchVenues = async () => {
//   //     try {
//   //       setLoading(true);
//   //       setError(null);
//   //       const token = getToken();
//   //       const res = await fetch(`${BASE}/venue/venue-by-org/${organizationId}`, {
//   //         method: "GET",
//   //         credentials: "include",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   //         },
//   //         signal: abortCtrl.signal,
//   //       });

//   //       const data = await res.json();
//   //       if (!res.ok) {
//   //         const message = data?.message || "Failed to fetch venues";
//   //         setVenues([]);
//   //         setVisibleVenues([]);
//   //         setSelected("");
//   //         setError(message);
//   //         setLoading(false);
//   //         return;
//   //       }

//   //       const arr = Array.isArray(data) ? data : Array.isArray(data?.venues) ? data.venues : [];
//   //       setVenues(arr);

//   //       const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;
//   //       setVisibleVenues(filtered);

//   //       if ((!value || value === "") && filtered.length > 0) {
//   //         const firstId = String(filtered[0]._id ?? filtered[0].id ?? filtered[0]);
//   //         setSelected(firstId);
//   //         if (typeof onChange === "function") onChange(firstId);
//   //       } else if (value) {
//   //         setSelected(value);
//   //       }
//   //     } catch (err) {
//   //       if (err.name === "AbortError") return;
//   //       console.error("Venue fetch error:", err);
//   //       setError(err.message || "Network error");
//   //       setVenues([]);
//   //       setVisibleVenues([]);
//   //       setSelected("");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchVenues();
//   //   return () => abortCtrl.abort();
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [organizationId, excludeFirstN]);

//   // inside VenueSelect component, replace the fetch useEffect with this:

// // useEffect(() => {
// //   if (!organizationId){
// //     setVenues([]);
// //     setVisibleVenues([]);
// //     setSelected("");
// //     setError(null);
// //     return;
// //   }

// //   const abortCtrl = new AbortController();
// //   const fetchVenues = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const token = getToken();

// //       // If this user was created by another user, fetch user-specific venues
// //       // otherwise fetch organization venues
// //       const isUserCreatedByUser = user?.createdBy && String(user.createdBy) === "user";
// //       const url = isUserCreatedByUser
// //         ? `${BASE}/venue/${user._id}`
// //         : `${BASE}/venue/venue-by-org/${organizationId}`;

// //       const res = await fetch(url, {
// //         method: "GET",
// //         credentials: "include",
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //         },
// //         signal: abortCtrl.signal,
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         const message = data?.message || "Failed to fetch venues";
// //         setVenues([]);
// //         setVisibleVenues([]);
// //         setSelected("");
// //         setError(message);
// //         setLoading(false);
// //         return;
// //       }

// //       // server might return either an array or { venues: [...] }
// //       const arr = Array.isArray(data)
// //         ? data
// //         : Array.isArray(data?.venues)
// //         ? data.venues
// //         : [];

// //         console.log("arr", arr)

// //       // If the user-specific endpoint returns objects like { venueId, venueName }
// //       // keep them as-is: downstream code handles v._id or v.id or v.venueId
// //       setVenues(arr);

// //       const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;
// //       setVisibleVenues(filtered);

// //       // auto-select first visible if no explicit value
// //       if ((!value || value === "") && filtered.length > 0) {
// //         const firstId = String(filtered[0]._id ?? filtered[0].id ?? filtered[0].venueId ?? filtered[0]);
// //         setSelected(firstId);
// //         if (typeof onChange === "function") onChange(firstId);
// //       } else if (value) {
// //         setSelected(value);
// //       }
// //     } catch (err) {
// //       if (err.name === "AbortError") return;
// //       console.error("Venue fetch error:", err);
// //       setError(err.message || "Network error");
// //       setVenues([]);
// //       setVisibleVenues([]);
// //       setSelected("");
// //     } finally {
// //       if (!abortCtrl.signal.aborted) setLoading(false);
// //     }
// //   };

// //   fetchVenues();
// //   return () => abortCtrl.abort();
// // // include user in deps because we read user.createdBy and user._id
// // // eslint-disable-next-line react-hooks/exhaustive-deps
// // }, [organizationId, excludeFirstN, user]);

// useEffect(() => {
//   if (!organizationId) {
//     setVenues([]);
//     setVisibleVenues([]);
//     setSelected("");
//     setError(null);
//     return;
//   }

//   const abortCtrl = new AbortController();
//   const fetchVenues = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = getToken();

//       const isUserCreatedByUser = user?.createdBy && String(user.createdBy) === "user";
//       const url = isUserCreatedByUser
//         ? `${BASE}/venue/${user._id}`
//         : `${BASE}/venue/venue-by-org/${organizationId}`;

//       const res = await fetch(url, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         signal: abortCtrl.signal,
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         const message = data?.message || "Failed to fetch venues";
//         setVenues([]);
//         setVisibleVenues([]);
//         setSelected("");
//         setError(message);
//         setLoading(false);
//         return;
//       }

//       const arr = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.venues)
//         ? data.venues
//         : [];

//       // keep raw list for other uses
//       setVenues(arr);

//       // apply excludeFirstN (we only apply priority sorting to the visible subset)
//       const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;

//       // build an array with computed priority and sorting weight
//       const withPriority = filtered.map((v) => {
//         const id = String(v._id ?? v.id ?? v.venueId ?? v);
//         const p = getVenuePriority(id); // 'high'|'medium'|'low' (defaults in helper)
//         return {
//           __id: id,
//           __priority: p,
//           __weight: priorityWeight(p),
//           ...v,
//         };
//       });

//       // sort by weight desc (high first), then by name (fallback to id)
//       withPriority.sort((a, b) => {
//         if (b.__weight !== a.__weight) return b.__weight - a.__weight;
//         const an = (a.name ?? a.venue_name ?? a.venueName ?? a.__id).toString().toLowerCase();
//         const bn = (b.name ?? b.venue_name ?? b.venueName ?? b.__id).toString().toLowerCase();
//         return an.localeCompare(bn);
//       });

//       // strip helper props and set visibleVenues
//       const finalVisible = withPriority.map(({ __priority, __weight, __id, ...rest }) => rest);
//       setVisibleVenues(finalVisible);

//       // auto-select first visible if no explicit value
//       if ((!value || value === "") && finalVisible.length > 0) {
//         const firstId = String(finalVisible[0]._id ?? finalVisible[0].id ?? finalVisible[0].venueId ?? finalVisible[0]);
//         setSelected(firstId);
//         if (typeof onChange === "function") onChange(firstId);
//       } else if (value) {
//         setSelected(value);
//       }
//     } catch (err) {
//       if (err.name === "AbortError") return;
//       console.error("Venue fetch error:", err);
//       setError(err.message || "Network error");
//       setVenues([]);
//       setVisibleVenues([]);
//       setSelected("");
//     } finally {
//       if (!abortCtrl.signal.aborted) setLoading(false);
//     }
//   };

//   fetchVenues();
//   return () => abortCtrl.abort();
// // include user in deps because we read user.createdBy and user._id
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [organizationId, excludeFirstN, user, reloadKey]);



//   useEffect(() => {
//     function handleOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false);
//     }
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   const handleSelect = (id) => {
//     setSelected(String(id));
//     if (typeof onChange === "function") onChange(String(id));
//     setDropdownOpen(false);
//   };

//   const handleKeyboard = (e) => {
//     if (e.key === "Enter") setDropdownOpen((s) => !s);
//     if (e.key === "Escape") setDropdownOpen(false);
//   };

//   // keep hiding behavior: if user and total venues <= 3 => don't show control
//   if (user?.role === "user" && venues?.length <= 3) return null;
//   // if (venues?.length <= 3) return null;

//   const selectedVenue = visibleVenues.find((v) => String(v._id ?? v.id ?? v) === String(selected));
//   const label = loading ? "Loading venues..." : selectedVenue ? selectedVenue.name ?? selectedVenue.venueName ?? String(selected) : "Venue";

//   return (
//     <div className={className} ref={ref}>
//       {/* <div className="grid grid-cols-2 items-center gap-4 w-[6rem] sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]  "> */}
//           <div className="grid grid-cols-2 items-center gap-4 sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]">
//         {/* <label className="text-left font-medium text-gray-700">Venue</label> */}

//         <div className="relative col-span-2 ">
//           <div
//             role="button"
//             tabIndex={0}
//             onKeyDown={handleKeyboard}
//             onClick={() => !loading && organizationId && setDropdownOpen((s) => !s)}
//             className={`sm:rounded-full flex items-center justify-between pr-2 pl-3 py-2 border cursor-pointer bg-[#0D5CA4] text-white select-none  rounded-full`}
//           >
//             <span className="text-white truncate w-[90%] sm:max-w-[70%]">{label}</span>
//           <svg
//           className={`w-6 h-6 ml-2 bg-white rounded-full p-[2px] transform ${
//             dropdownOpen ? "rotate-180" : "rotate-0"
//           }`}
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M7 10c-.7 0-1 .8-.5 1.3l4.3 4.3c.7.7 1.9.7 2.6 0l4.3-4.3c.5-.5.2-1.3-.5-1.3H7z"
//             fill="#0D5CA4"
//             stroke="#0D5CA4"
//             strokeWidth="1.3"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//         </svg>


//           </div>

//           {/* Dropdown menu */}
//           {dropdownOpen && (
            
//             <div className=" absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
//               {loading ? (
//                 <div className="px-4 py-3 text-sm text-gray-500">venue</div>
//               ) : visibleVenues && visibleVenues.length > 0 ? (
//                 visibleVenues.map((v) => {
//                   const id = String(v._id ?? v.id ?? v);
//                   const name = v.name ?? v.venue_name ?? v.venueName ?? id;
//                   return (
//                     <div
//                       key={id}
//                       onClick={() => handleSelect(id)}
//                       className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm flex items-center justify-between ${String(selected) === id ? "bg-gray-50" : ""}`}
//                     >
//                       <div className="truncate">{name}</div>
//                       {String(selected) === id && (
//                         <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="px-4 py-3 text-sm text-gray-500">No venues found</div>
//               )}
              
//             </div>
            
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






















// // Above code is same I am implementing the functionality of persistant selection of organization and venue here below

// import { useEffect, useState, useRef } from "react";
// import { useStore } from "../../contexts/storecontexts";
// import { getVenuePriority, priorityWeight } from "../../utils/venuePriorities";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

// // const getToken = () => localStorage.getItem("token");
// /**
//  * Props:
//  * - organizationId (required)
//  * - value : selected venue id
//  * - onChange : fn(id)
//  * - className
//  * - excludeFirstN : number of first venues to exclude from the select (default 0)
//  */

// export default function VenueSelect({ organizationId, value, onChange, className = "", excludeFirstN = 0 }) {
//   const { user, getToken } = useStore();

//   console.log("User>", user);
  
//   const [venues, setVenues] = useState([]);
//   const [visibleVenues, setVisibleVenues] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(value ?? "");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const ref = useRef(null);
// const [reloadKey, setReloadKey] = useState(0);

 

//   useEffect(() => {
//     setSelected(value ?? "");
//   }, [value]);

//   useEffect(() => {
//   const onUpdated = () => setReloadKey(k => k + 1);
//   window.addEventListener("venue:updated", onUpdated);
//   return () => window.removeEventListener("venue:updated", onUpdated);
// }, []);


// useEffect(() => {
//   if (!organizationId) {
//     setVenues([]);
//     setVisibleVenues([]);
//     setSelected("");
//     setError(null);
//     return;
//   }

//   const abortCtrl = new AbortController();
//   const fetchVenues = async () => {
//     try {
   
//       setLoading(true);
//       setError(null);
//       const token = getToken();

//       const isUserCreatedByUser = user?.createdBy && String(user.createdBy) === "user";
//       const url = isUserCreatedByUser
//         ? `${BASE}/venue/${user._id}`
//         : `${BASE}/venue/venue-by-org/${organizationId}`;

//       const res = await fetch(url, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         signal: abortCtrl.signal,
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         const message = data?.message || "Failed to fetch venues";
//         setVenues([]);
//         setVisibleVenues([]);
//         setSelected("");
//         setError(message);
//         setLoading(false);
//         return;
//       }

//       const arr = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.venues)
//         ? data.venues
//         : [];

//       // keep raw list for other uses
//       setVenues(arr);

//       // apply excludeFirstN (we only apply priority sorting to the visible subset)
//       const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;

//       // build an array with computed priority and sorting weight
//       const withPriority = filtered.map((v) => {
//         const id = String(v._id ?? v.id ?? v.venueId ?? v);
//         const p = getVenuePriority(id); // 'high'|'medium'|'low' (defaults in helper)
//         return {
//           __id: id,
//           __priority: p,
//           __weight: priorityWeight(p),
//           ...v,
//         };
//       });

//       // sort by weight desc (high first), then by name (fallback to id)
//       withPriority.sort((a, b) => {
//         if (b.__weight !== a.__weight) return b.__weight - a.__weight;
//         const an = (a.name ?? a.venue_name ?? a.venueName ?? a.__id).toString().toLowerCase();
//         const bn = (b.name ?? b.venue_name ?? b.venueName ?? b.__id).toString().toLowerCase();
//         return an.localeCompare(bn);
//       });

//       // strip helper props and set visibleVenues
//       const finalVisible = withPriority.map(({ __priority, __weight, __id, ...rest }) => rest);
//       setVisibleVenues(finalVisible);

//         // If parent already selected a venue (URL-driven), NEVER auto-select
//           if (value) {
//             setSelected(value);
//             setVisibleVenues(finalVisible);
//             return;
//           }


//       // auto-select first visible if no explicit value
//       // if ((!value || value === "") && finalVisible.length > 0) {
//       //   const firstId = String(finalVisible[0]._id ?? finalVisible[0].id ?? finalVisible[0].venueId ?? finalVisible[0]);
//       //   setSelected(firstId);
//       //   if (typeof onChange === "function") onChange(firstId);
//       // }
//       if (!value && finalVisible.length > 0) {
//         const firstId = String(finalVisible[0]._id ?? finalVisible[0].id ?? finalVisible[0].venueId ?? finalVisible[0]);
//         setSelected(firstId);
//         onChange?.(firstId);
//       }
//        else if (value) {
//         setSelected(value);
//       }
//     } catch (err) {
//       if (err.name === "AbortError") return;
//       console.error("Venue fetch error:", err);
//       setError(err.message || "Network error");
//       setVenues([]);
//       setVisibleVenues([]);
//       setSelected("");
//     } finally {
//       if (!abortCtrl.signal.aborted) setLoading(false);
//     }
//   };

//   fetchVenues();
//   return () => abortCtrl.abort();
// // include user in deps because we read user.createdBy and user._id
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [organizationId, excludeFirstN, user, reloadKey]);



//   useEffect(() => {
//     function handleOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false);
//     }
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   const handleSelect = (id) => {
//     setSelected(String(id));
//     if (typeof onChange === "function") onChange(String(id));
//     setDropdownOpen(false);
//   };

//   const handleKeyboard = (e) => {
//     if (e.key === "Enter") setDropdownOpen((s) => !s);
//     if (e.key === "Escape") setDropdownOpen(false);
//   };

//   // keep hiding behavior: if user and total venues <= 3 => don't show control
//   if (user?.role === "user" && venues?.length <= 3) return null;
//   // if (venues?.length <= 3) return null;

//   const selectedVenue = visibleVenues.find((v) => String(v._id ?? v.id ?? v) === String(selected));
//   const label = loading ? "Loading venues..." : selectedVenue ? selectedVenue.name ?? selectedVenue.venueName ?? String(selected) : "Venue";

//   return (
//     <div className={className} ref={ref}>
//       {/* <div className="grid grid-cols-2 items-center gap-4 w-[6rem] sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]  "> */}
//           <div className="grid grid-cols-2 items-center gap-4 sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]">
//         {/* <label className="text-left font-medium text-gray-700">Venue</label> */}

//         <div className="relative col-span-2 ">
//           <div
//             role="button"
//             tabIndex={0}
//             onKeyDown={handleKeyboard}
//             onClick={() => !loading && organizationId && setDropdownOpen((s) => !s)}
//             className={`sm:rounded-full flex items-center justify-between pr-2 pl-3 py-2 border cursor-pointer bg-[#0D5CA4] text-white select-none  rounded-full`}
//           >
//             <span className="text-white truncate w-[90%] sm:max-w-[70%]">{label}</span>
//           <svg
//           className={`w-6 h-6 ml-2 bg-white rounded-full p-[2px] transform ${
//             dropdownOpen ? "rotate-180" : "rotate-0"
//           }`}
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M7 10c-.7 0-1 .8-.5 1.3l4.3 4.3c.7.7 1.9.7 2.6 0l4.3-4.3c.5-.5.2-1.3-.5-1.3H7z"
//             fill="#0D5CA4"
//             stroke="#0D5CA4"
//             strokeWidth="1.3"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//         </svg>


//           </div>

//           {/* Dropdown menu */}
//           {dropdownOpen && (
            
//             <div className=" absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
//               {loading ? (
//                 <div className="px-4 py-3 text-sm text-gray-500">venue</div>
//               ) : visibleVenues && visibleVenues.length > 0 ? (
//                 visibleVenues.map((v) => {
//                   const id = String(v._id ?? v.id ?? v);
//                   const name = v.name ?? v.venue_name ?? v.venueName ?? id;
//                   return (
//                     <div
//                       key={id}
//                       onClick={() => handleSelect(id)}
//                       className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm flex items-center justify-between ${String(selected) === id ? "bg-gray-50" : ""}`}
//                     >
//                       <div className="truncate">{name}</div>
//                       {String(selected) === id && (
//                         <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="px-4 py-3 text-sm text-gray-500">No venues found</div>
//               )}
              
//             </div>
            
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




















// src/pages/VenueSelect.jsx (or wherever file is)
import { useEffect, useState, useRef } from "react";
import { useStore } from "../../contexts/storecontexts";
import { getVenuePriority, priorityWeight } from "../../utils/venuePriorities";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

export default function VenueSelect({ organizationId, value, onChange, className = "", excludeFirstN = 0, externalLabel }) {
  const { user, getToken } = useStore();

  const [venues, setVenues] = useState([]);
  const [visibleVenues, setVisibleVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(value ?? "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setSelected(value ?? "");
  }, [value]);

  useEffect(() => {
    const onUpdated = () => setReloadKey((k) => k + 1);
    window.addEventListener("venue:updated", onUpdated);
    return () => window.removeEventListener("venue:updated", onUpdated);
  }, []);

  useEffect(() => {
    if (!organizationId) {
      setVenues([]);
      setVisibleVenues([]);
      setSelected("");
      setError(null);
      return;
    }

    const abortCtrl = new AbortController();
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = getToken();

        const isUserCreatedByUser = user?.createdBy && String(user.createdBy) === "user";
        const url = isUserCreatedByUser ? `${BASE}/venue/${user._id}` : `${BASE}/venue/venue-by-org/${organizationId}`;

        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: abortCtrl.signal,
        });

        const data = await res.json();
        if (!res.ok) {
          const message = data?.message || "Failed to fetch venues";
          setVenues([]);
          setVisibleVenues([]);
          setSelected("");
          setError(message);
          setLoading(false);
          return;
        }

        const arr = Array.isArray(data) ? data : Array.isArray(data?.venues) ? data.venues : [];

        setVenues(arr);

        const filtered = excludeFirstN > 0 ? arr.slice(excludeFirstN) : arr;

        const withPriority = filtered.map((v) => {
          const id = String(v._id ?? v.id ?? v.venueId ?? v);
          const p = getVenuePriority(id);
          return {
            __id: id,
            __priority: p,
            __weight: priorityWeight(p),
            ...v,
          };
        });

        withPriority.sort((a, b) => {
          if (b.__weight !== a.__weight) return b.__weight - a.__weight;
          const an = (a.name ?? a.venue_name ?? a.venueName ?? a.__id).toString().toLowerCase();
          const bn = (b.name ?? b.venue_name ?? b.venueName ?? b.__id).toString().toLowerCase();
          return an.localeCompare(bn);
        });

        const finalVisible = withPriority.map(({ __priority, __weight, __id, ...rest }) => {
          const raw = rest || {};
          const id = String(__id);
          const name = raw.name ?? raw.venueName ?? raw.venue_name ?? raw.title ?? id;
          return {
            _id: id,
            name,
            raw,
            ...raw,
          };
        });

        setVisibleVenues(finalVisible);

        // If parent already provided a value (URL-driven), keep it — don't auto-select
        if (value) {
          setSelected(value);
          setVisibleVenues(finalVisible);
          return;
        }

        if (!value && finalVisible.length > 0) {
          const firstId = String(finalVisible[0]._id ?? finalVisible[0].id ?? finalVisible[0].venueId ?? finalVisible[0]);
          setSelected(firstId);
          if (typeof onChange === "function") onChange(firstId, finalVisible[0].name);
        } else if (value) {
          setSelected(value);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Venue fetch error:", err);
        setError(err.message || "Network error");
        setVenues([]);
        setVisibleVenues([]);
        setSelected("");
      } finally {
        if (!abortCtrl.signal.aborted) setLoading(false);
      }
    };

    fetchVenues();
    return () => abortCtrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId, excludeFirstN, user, reloadKey]);

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSelect = (id, name) => {
    setSelected(String(id));
    if (typeof onChange === "function") onChange(String(id), name);
    setDropdownOpen(false);
  };

  const handleKeyboard = (e) => {
    if (e.key === "Enter") setDropdownOpen((s) => !s);
    if (e.key === "Escape") setDropdownOpen(false);
  };

  if (user?.role === "user" && venues?.length <= 3) return null;

  const selectedVenue = visibleVenues.find((v) => String(v._id ?? v.id ?? v) === String(selected));

  // show readable name when available; otherwise use externalLabel or id
  const label = loading
    ? "Loading venues..."
    : selectedVenue
    ? selectedVenue.name ?? selectedVenue.venueName ?? String(selected)
    : externalLabel
    ? externalLabel
    : selected
    ? String(selected)
    : "Venue";

  return (
    <div className={className} ref={ref}>
      <div className="grid grid-cols-2 items-center gap-4 sm:w-[14rem] md:w-[10rem] lg:w-[15rem] xl:w-[20rem]">
        <div className="relative col-span-2 ">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyboard}
            onClick={() => !loading && organizationId && setDropdownOpen((s) => !s)}
            className={`sm:rounded-full flex items-center justify-between pr-2 pl-3 py-2 border cursor-pointer bg-[#0D5CA4] text-white select-none  rounded-full`}
          >
            <span className="text-white truncate w-[90%] sm:max-w-[70%]">{label}</span>
            <svg className={`w-6 h-6 ml-2 bg-white rounded-full p-[2px] transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10c-.7 0-1 .8-.5 1.3l4.3 4.3c.7.7 1.9.7 2.6 0l4.3-4.3c.5-.5.2-1.3-.5-1.3H7z" fill="#0D5CA4" stroke="#0D5CA4" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>

          {dropdownOpen && (
            <div className=" absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
              {loading ? (
                <div className="px-4 py-3 text-sm text-gray-500">venue</div>
              ) : visibleVenues && visibleVenues.length > 0 ? (
                visibleVenues.map((v) => {
                  const id = String(v._id ?? v.id ?? v);
                  const name = v.name ?? v.venue_name ?? v.venueName ?? id;
                  return (
                    <div
                      key={id}
                      onClick={() => handleSelect(id, name)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm flex items-center justify-between ${String(selected) === id ? "bg-gray-50" : ""}`}
                    >
                      <div className="truncate">{name}</div>
                      {String(selected) === id && (
                        <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">No venues found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


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
import EnergyMonitoringDeviceCard from "./EnergyMonitoringDeviceCard";
import SchedulerDeviceCard from "./SchedulerDeviceCard";
import { useScheduler } from "../../contexts/SchedulerContext";

const mockFreezerDevices = [];

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

export default function Dashboard() {
  const { user, getToken } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const token = getToken();

  const { organization: ctxOrg, venue: ctxVenue, setOrganization, setVenue, clearVenue } = useOrgVenue();

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


  const { eventsMap, toggleMap, setEvents, setToggle } = useScheduler();


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
        console.log("fetch while hitting api", data);

        if (!mounted) return;

        if (res.ok) {
          const devices = Array.isArray(data.devices) ? data.devices : data.devices ? [data.devices] : [];
          console.log("devices<>", devices);

          //FaRaZ
          // const hasScheduler = withFrontendSeed.some((d) => d.deviceType === "SCHEDULER");

          // if (!hasScheduler) {
          //   withFrontendSeed.push(mockSchedulerDevice);
          // }


          setFreezerDevices((prevDevices) => {
            const prevMap = new Map(prevDevices.map((d) => [String(d._id ?? d.id ?? d.deviceId), d]));

            //FaRaZ
            // return withFrontendSeed.map((newDevice) => {
            return devices.map((newDevice) => {
              const id = String(newDevice._id ?? newDevice.id ?? newDevice.deviceId);
              const oldDevice = prevMap.get(id);
              if (!oldDevice) return newDevice;


              return {
                ...oldDevice,
                ...newDevice,
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

                espVoltage: newDevice.espVoltage ?? oldDevice.espVoltage,
                espCurrent: newDevice.espCurrent ?? oldDevice.espCurrent,
                // espPower: newDevice.espPower ?? oldDevice.espPower,
                // compute power: prefer compute from voltage*current if both available else fallback to backend espPower
                espPower: (() => {
                  const v = newDevice.espVoltage ?? oldDevice.espVoltage;
                  const c = newDevice.espCurrent ?? oldDevice.espCurrent;
                  const vn = Number(v);
                  const cn = Number(c);
                  if (Number.isFinite(vn) && Number.isFinite(cn)) {
                    return +(vn * cn); // numeric product
                  }
                  // fallback to any provided espPower (prefer newDevice)
                  const p = newDevice.espPower ?? oldDevice.espPower;
                  return p === undefined ? null : p;
                })(),
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

  //FaRaZ 
  // fetch events of TSD devices
  const fetchSchedulerData = async () => {
    console.log(`🔄 [page.jsx] fetchSchedulerData started`);
    try {
      const tsdDevices = freezerDevices.filter(
        (d) => d.deviceType === "TSD"
      );

      console.log(`📋 [page.jsx] Found ${tsdDevices.length} TSD devices`);

      for (const device of tsdDevices) {
        const deviceKey = String(device.deviceId);

        console.log(`🔵 [page.jsx] Processing device: ${deviceKey}`);

        try {
          // ✅ Fetch current/next event status for toggle state
          const statusRes = await fetch(
            `${BASE}/event/get-current-events/${device.deviceId}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            }
          );

          if (!statusRes.ok) {
            console.log(`⚠️ [page.jsx] Status fetch failed for ${deviceKey}`);
            continue;
          }

          const statusData = await statusRes.json();
          console.log(`✅ [page.jsx] Status data for ${deviceKey}:`, statusData);

          // ✅ Fetch ALL events for the device (don't overwrite with just 1 event)
          const allEventsRes = await fetch(
            `${BASE}/event/get-by-deviceid/${device.deviceId}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            }
          );

          if (allEventsRes.ok) {
            const allEventsData = await allEventsRes.json();
            const allEvents = allEventsData.schedules || [];

            console.log(`📋 [page.jsx] Fetched ${allEvents.length} events for ${deviceKey}`);

            // ✅ Mark the current/next event with type for card display
            const eventsWithType = allEvents.map(event => {
              if (statusData.type === "CURRENT" && statusData.event?._id === event._id) {
                return { ...event, type: "CURRENT" };
              }
              if (statusData.type === "NEXT" && statusData.event?._id === event._id) {
                return { ...event, type: "NEXT" };
              }
              return event;
            });

            console.log(`🎯 [page.jsx] Marked events for ${deviceKey}:`, eventsWithType);
            setEvents(deviceKey, eventsWithType);
          } else {
            console.log(`⚠️ [page.jsx] All events fetch failed for ${deviceKey}, using fallback`);
            // Fallback to old behavior if all-events endpoint fails
            if (statusData.type === "CURRENT" && statusData.event) {
              setEvents(deviceKey, [{ ...statusData.event, type: statusData.type }]);
            } else if (statusData.type === "NEXT" && statusData.event) {
              setEvents(deviceKey, [{ ...statusData.event, type: statusData.type }]);
            } else {
              setEvents(deviceKey, []);
              setToggle(deviceKey, "off");
            }
          }

        } catch (err) {
          console.warn("Scheduler fetch error:", err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!freezerDevices || freezerDevices.length === 0) return;

    fetchSchedulerData();

  }, [freezerDevices, pollHitTime]);

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
      return () => { };
    }

    const influxUrl = import.meta.env.VITE_INFLUX_URL;
    const influxToken = import.meta.env.VITE_INFLUX_TOKEN;
    const influxOrg = import.meta.env.VITE_INFLUX_ORG;
    const influxBucket = "Odour";

    if (!influxUrl || !influxToken || !influxOrg || !influxBucket) {
      console.warn("Influx env vars not set; skipping LED polling.");
      return () => { };
    }

    const client = new InfluxDB({ url: influxUrl, token: influxToken });
    const queryApi = client.getQueryApi(influxOrg);

    const runQueryForAllDevices = async () => {
      try {
        const deviceIds = freezerDevices.map((d) => String(d.deviceId).trim()).filter(Boolean);
        console.log("device ids for influx db ", deviceIds)
        if (!deviceIds.length) return;
        const measureFilter = deviceIds.map((id) => `r._measurement == "${id}"`).join(" or ");
        const flux = `
  from(bucket: "${influxBucket}")
    |> range(start: -30d)
    |> filter(fn: (r) => ${measureFilter})
    |> last()
    |> keep(columns: ["_measurement", "_time"])
  `;
        console.log("FLUX QUERY:\n", flux);
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
                      // key: idKey,
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
                      return <AQIDeviceCard key={idKey} {...commonProps} espAQI={device?.espAQI} aqiAlert={device?.aqiAlert} />;
                    }

                    if (device?.deviceType === "TMD") {
                      return <TemperatureHumidityDeviceCard key={idKey} {...commonProps} pollHitTime={pollHitTime} />;
                    }

                    if (device?.deviceType === "OMD") {
                      return <OdourDeviceCard key={idKey} {...commonProps} espOdour={device?.espOdour} odourAlert={device?.odourAlert} />;
                    }

                    if (device?.deviceType === "GLMD") {
                      return <GasLeakageDeviceCard key={idKey} {...commonProps} espGL={device?.espGL} glAlert={device?.glAlert} />;
                    }

                    if (device?.deviceType === "EMD") {
                      return (
                        <EnergyMonitoringDeviceCard
                          key={idKey}
                          {...commonProps}
                          espVoltage={device?.espVoltage}
                          espCurrent={device?.espCurrent}
                          espPower={device?.espPower}
                          espHumidity={device?.espHumidity}
                          espTemprature={device?.espTemprature}
                        />
                      );
                    }



                    //FaRaZ
                    // if (device?.deviceType === "SCHEDULER") {
                    if (device?.deviceType === "TSD") {
                      const idStr = String(idKey);                        // keep for card key/selection
                      const schedulerKey = String(device.deviceId);       // ← use deviceId for context
                      return (
                        <SchedulerDeviceCard
                          key={idKey}
                          {...commonProps}
                          startingOn={device?.scheduler?.startingOn}
                          duration={device?.scheduler?.duration}
                          repeatDays={device?.scheduler?.repeatDays || []}
                          enabled={device?.scheduler?.enabled}
                          pollHitTime={pollHitTime}
                          events={eventsMap[schedulerKey] || []}
                          onRefreshScheduler={fetchSchedulerData}
                        />
                      );
                    }


                    return (
                      <FreezerDeviceCard
                        key={idKey}
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
        <DashboardRightPanel
          freezerDevices={freezerDevices}
          selectedFreezerDeviceId={selectedFreezerDeviceId}
          selectedOrgId={selectedOrgId}
          pollInterval={POLL_MS}


        />
      ) : (
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          <DashboardRightPanel
            freezerDevices={freezerDevices}
            selectedFreezerDeviceId={selectedFreezerDeviceId}
            selectedOrgId={selectedOrgId}
            closeIcon={true}
            onClose={toggleDrawer(false)}
            pollInterval={POLL_MS}

          />
        </Drawer>
      )}
    </div>
  );
}


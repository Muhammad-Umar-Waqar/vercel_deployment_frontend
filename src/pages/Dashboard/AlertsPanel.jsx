// AlertsPanel.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    dispatch(fetchAlertsByOrg(orgId, token));
  }, [orgId, dispatch]);

  useEffect(() => {
    if (!orgId || !pollInterval) return;
    const id = setInterval(() => {
      dispatch(fetchAlertsByOrg(orgId, token));
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

  return (
    <div className="flex-shrink-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 md:mb-auto">
        <div className="p-4" style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
          <AlertList title="Odour Alert" iconSrc="/odour-alert.svg" items={odourItems} />
        </div>
        <div className="p-4" style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
          <AlertList title="Temperature Alert" iconSrc="/temperature.svg" items={temperatureItems} />
        </div>
        <div className="p-4" style={{ backgroundColor: "#07518D12", borderRadius: "20px" }}>
          <AlertList title="Humidity Alert" iconSrc="/humidity-alert.svg" items={humidityItems} />
        </div>
      </div>
    </div>
  );
}

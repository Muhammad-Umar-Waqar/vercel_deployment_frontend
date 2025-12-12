import React, { useMemo } from "react";
import VenueDetailsPanel from "../pages/Dashboard/VenueDetailsPanel";



/**
 * DashboardRightPanel
 * - Receives freezerDevices, selectedFreezerDeviceId, selectedOrgId
 * - Renders VenueDetailsPanel for selected device or default empty panel
 */
export default function DashboardRightPanel({
  freezerDevices = [],
  selectedFreezerDeviceId = null,
  selectedOrgId = null,
  className = "",
  onClose = undefined,
  closeIcon = false,
}) {
  // compute selected device once
  const selected = useMemo(() => {
    if (!selectedFreezerDeviceId) return null;
    return freezerDevices.find((d) => (d._id ?? d.id) === selectedFreezerDeviceId) ?? null;
  }, [freezerDevices, selectedFreezerDeviceId]);

  console.log("selected", selected);

  return (
    <div
      className={`dashboard-right-panel shadow-sm flex flex-col h-full overflow-y-auto custom-scrollbar p-4 lg:p-6 border-l border-[#E5E7EB]/40 bg-white flex-shrink-0  ${className}`}
    >
      {selected ? (
        <VenueDetailsPanel
          venueName={selected?.venueName ?? "Venue"}
          freezerTemperature={selected?.odourAlert ?? false}
          ambientTemperature={selected?.espTemprature ?? 0}
          humidity={selected?.espHumidity ?? 0}
          espOdour={selected?.espOdour ?? 0}
          batteryLow={selected?.batteryLow ?? selected?.batteryAlert ?? false}
          needMaintenance={selected?.needMaintenance ?? false}
          apiKey={selected?.apiKey}
          chartData={selected?.chartData ?? []}
          organizationId={selectedOrgId}
          closeIcon={closeIcon}   // forward
          onClose={onClose}       // forward
          humidityAlert={selected?.humidityAlert}
          odourAlert={selected?.odourAlert}
          temperatureAlert={selected?.temperatureAlert}
          deviceId={selected?.deviceId}
          lastUpdateTime={selected?.lastUpdateTime}
        />
      ) : (
        <VenueDetailsPanel
          venueName={"Venue"}
          freezerTemperature={false}
          ambientTemperature={0}
          espOdour={0}
          batteryLow={true}
          needMaintenance={true}
          apiKey={""}
          chartData={[]}
          organizationId={selectedOrgId}
          closeIcon={closeIcon}   
          onClose={onClose}       
          
          humidityAlert={false}
          odourAlert={false}
          temperatureAlert={false}
          deviceId = {""}
          lastUpdateTime={null}
        />
      )}
    </div>
  );
}

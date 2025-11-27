import AlertsChart from "./AlertsChart";
import { useDispatch, useSelector } from "react-redux";
import { useStore } from "../../contexts/storecontexts";
import { useEffect } from "react";
import QRCode from "./QrCode";
import { useLocation } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import { fetchVenuesByOrganization } from "../../slices/VenueSlice";

export default function VenueDetailsPanel({
  organizationId = null,
  venueName = "Karim Korangi Branch",
  freezerTemperature = false,
  ambientTemperature = 25,
  batteryLow = true,
  needMaintenance = true,
  apiKey = "",
  closeIcon = false,
  onClose = undefined,
  humidity=0
}) {
  const dispatch = useDispatch();
  const { user } = useStore();
  const orgId = organizationId || user?.organization || null;

  
const location = useLocation();
const params = new URLSearchParams(location.search);
const venueId = params.get("venue"); // gives the ID

// const venuesFromSlice = useSelector((state) => state.Venue.Venues || []);

// const currentVenueSlice = venuesFromSlice.find(v => v._id === venueId) || null;

 // --- select cached venues for this org
  const orgVenues = useSelector(
    (state) => (orgId ? state.Venue.venuesByOrg[orgId] || [] : [])
  );

  // --- fallback to global Venues
  const globalVenues = useSelector((state) => state.Venue.Venues || []);

    // --- merged array: org venues preferred, fallback to global
  const venuesFromSlice = orgVenues.length ? orgVenues : globalVenues;

  console.log("ORGID", orgId)
  // --- Redux selector: get all alerts for this org
  const orgAlerts = useSelector((s) =>
    orgId
      ? s.alerts?.byOrg?.[orgId] ?? { venues: [], loading: false, error: null }
      : { venues: [], loading: false, error: null }
  );

  // // --- Fetch alerts on mount
  // useEffect(() => {
  //   if (orgId) dispatch(fetchAlertsByOrg(orgId));
  // }, [orgId, dispatch]);

   // --- fetch venues by org if needed
  useEffect(() => {
    if (orgId && !orgVenues.length) {
      dispatch(fetchVenuesByOrganization(orgId));
    }
  }, [orgId, orgVenues.length, dispatch]);

  const venues = orgAlerts?.venues || [];
 
  const handleDownload = () => {
    alert(`Downloading report for ${venueName}`);
  };

  const sameId = (a, b) => String(a) === String(b);

   const toInt = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : null;
  };

// --- find current venue
  const currentVenueSlice =
    venuesFromSlice.find((v) => sameId(v._id, venueId) || sameId(v.id, venueId)) || null;

  // --- computed display name
  const displayVenueName =
    currentVenueSlice?.name ||
    currentVenueSlice?.venueName ||
    venueName ||
    "Venue";



    // computed display values (only integer part)
  const displayTemp = toInt(ambientTemperature);
  const displayHumidity = toInt(humidity);

  return (
    <div
      className="w-full rounded-lg p-6 shadow-sm space-y-6"
      style={{ backgroundColor: "#07518D12" }}
    >
     {closeIcon && (
        // only render button when `closeIcon` true (mobile drawer)
        <div className="flex justify-end">
          <IconButton
            onClick={() => {
              if (typeof onClose === "function") onClose(); // guard, then call
            }}
            edge="start"
            aria-label="close-details"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
      
      {/* A. Venue Info Section */}
      <div className="flex justify-start items-center pb-4 border-b border-[#E5E7EB]/40 mb-6">
        <div>
          <p className="text-sm text-[#64748B] font-medium">Venue</p>
          <h2 className="text-sm text-[#1E293B] font-bold">{displayVenueName}</h2>
        </div>
        {/* <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-3 py-2 bg-[#2563EB] text-white rounded-full text-xs font-semibold hover:bg-[#1D4ED8] active:scale-[.98] transition shadow-sm"
          aria-label="Download"
        >
          <span className="leading-none">Download</span>
          <Download className="w-3.5 h-3.5" />
        </button> */}
      </div>

      {/* B. Refrigerator Image */}
      {/* <div className="relative w-full overflow-hidden mb-4">
        <img
          src="/ambient_freezer.svg"
          alt="Refrigerator"
          className="w-full h-auto object-cover"
        />
        <div className="flex flex-col items-center justify-center absolute top-[30%] left-[8%] ">
      <h1 className="font-bold text-white text-lg">Freezer</h1>
      <h1 className="font-bold text-white text-lg">{freezerTemperature}<span className="font-thin text-white">°C</span></h1>
        </div>
        <div className="flex flex-col items-center justify-center absolute top-[30%] right-[15%]">
      <h1 className="font-bold text-[#07518D] text-lg">Ambient</h1>
      <h1 className="font-bold text-[#07518D]  text-lg">{ambientTemperature}<span className="text-lg font-thin">°C</span></h1>
        </div>
      </div> */}

      {/* C. Temperature Section */}
      <div className="relative w-full overflow-hidden mb-6 bg-[#07518D]/[0.05] rounded-xl">
        <div className="flex flex-col-3 justify-around items-center ">
          <div className="flex flex-col-2 items-center justify-center ">
            <img src="/odour-alert.svg" className="h-[60px] w-[30px]" />
          
            <p className="text-sm md:text-md lg:text-xl font-semibold">
              {freezerTemperature ? "Detected" : "Normal"}
          </p>

            
          </div>

          <div className="flex flex-col-2 items-center justify-center ">
            <img src="/temperature-icon.svg" className="h-[60px] w-[30px]" />
            <div className="flex flex-col items-end justify-end">
              
              <p className="text-sm md:text-md lg:text-lg 2xl:text-2xl font-semibold">
                {displayTemp}
                <span className="xs:text-sm md:text-md 2xl:text-lg font-thin">C</span>
              </p>
            </div>
          </div>

           <div className="flex flex-col-2 items-center justify-center">
            <img src="/humidity-alert.svg" className="h-[60px] w-[30px]" />
            <div className="flex flex-col items-end justify-end">
             
              <p className="text-sm md:text-md lg:text-lg 2xl:text-2xl font-semibold">
                {displayHumidity}
                <span className="xs:text-sm md:text-md  2xl:text-lg font-thin">%</span>
              </p>
            </div>
          </div>
        </div>

        {/* <img
          src="red-alert-icon"
          alt="Freezer and Ambient Combo"
          className="w-full h-auto object-cover"
        /> */}
      </div>
          <p className="text-md text-[#64748B] font-medium">Alerts</p>
      {/* D. Alerts Chart */}
      <div className="mb-6">
        {venues.length > 0 ? (
          <AlertsChart venues={venues} defaultMode="battery" />
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No alert data available
          </p>
        )}
      </div>
      <div>
    {apiKey && (
      <div className="mt-3  p-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700 break-words px-2">
        <div className="flex items-center justify-between ">
          <div>
        <strong>API Key:</strong>
            <div className="mt-2 text-sm " title={apiKey}>
              {apiKey ? `${apiKey.slice(0, 15)}...` : ""}
            </div>
          </div>

          <QRCode apiKey={apiKey} baseUrl={import.meta.env.VITE_REACT_URI || 'http://localhost:5173'} />
        </div>
      </div>
    )}
      </div>
    </div>
  );
}

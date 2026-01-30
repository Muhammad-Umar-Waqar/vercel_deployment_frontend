// import "../../styles/global/fonts.css";
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css";

// export default function FreezerDeviceCard({
//   deviceId,
//   refrigeratorAlert,
//   ambientTemperature,
//   freezerTemperature,
//   batteryLow = false,
//   isSelected = false,
//   onCardSelect,
//   odourAlert = false,
//   temperatureAlert = false,
//   humidityAlert = false,
//   espHumidity = "",
//   espTemprature = "",
// }) {
//   // helper: convert to finite number and keep integer part (before decimal)
//  const toInt = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? Math.trunc(n) : null;
//   };

//   // computed display values (only integer part)
//   const displayTemp = toInt(espTemprature);
//   const displayHumidity = toInt(espHumidity);

//   const handleCardClick = () => {
//     if (onCardSelect) onCardSelect();
//   };

//   // Alert priority logic:
//   // - odour has highest priority
//   // - if odour false and any other alert present -> "other"
//   // - otherwise -> "none"
//   const hasOtherAlert = temperatureAlert || humidityAlert;
//   const alertStatus = odourAlert ? "odour" : hasOtherAlert ? "other" : "none";

//   const textClass = alertStatus !== "none" ? "text-white" : "text-black";


  
//   const AlertBottom = ({status}) => {
//     if(status === "odour"){
//       return(
//         <div className={`bg-white/20 -m-4 w-[calc(1zz00%+2rem)] py-1 px-5 flex items-center justify-between`}>
//             <h3 className={textClass}>Alert</h3>

//             <div className="flex items-center ">
//               <h4 className="mr-2">Detected</h4>
//               <div className="flex items-center justify-center ">
//               <img src="/humidity-alert.svg" alt="Humidity" className="h-[25px] w-[20px]" />
//               <img src="/white-temperature-dashboard.svg" alt="Humidity" className="h-[40px] w-[20px]" />
//               <img src="/odour-alert.svg" alt="Humidity" className="h-[30px] w-[30px]" />
//               </div>
//             </div>
//         </div>
//       )
//     }
//     else if(status === "other"){
//       return(
//         <>
//         <div className={`bg-white/20 -m-4 w-[calc(100%+2rem)] py-1 px-5 flex items-center justify-between`}>
//             <h3 className={textClass}>Alert</h3>

//             <div className="flex items-center ">
//               <h4 className="mr-2">Detected</h4>
//               <div className="flex items-center justify-center ">
//               <img src="/humidity-alert.svg" alt="Humidity" className="h-[25px] w-[20px]" />
//               <img src="/white-temperature-dashboard.svg" alt="Humidity" className="h-[40px] w-[20px]" />
//               <img src="/odour-alert.svg" alt="Humidity" className="h-[30px] w-[30px]" />
//               </div>
//             </div>
//         </div>
//         </>
//       )
//     }
    
//       return null;
    
//       }

//     // background classes — we only add utility classes, your CSS remains unchanged
//     const bgClass =
//       alertStatus === "odour"
//         ? "bg-[#CF4F4F]"
//         : alertStatus === "other"
//         ? "bg-green-400"
//         : "bg-white";

//     // selected transform + shadow (small feedback)
//   const selectedClass = isSelected
//     ? "shadow-lg transition-transform duration-300 ease-out"
//     : "transition-transform duration-300";

//     return (
//       <>
//       <div
//         onClick={handleCardClick}
//         // keep your existing 'freezer-card-container' class; append the bg + selected classes
//         // className={`freezer-card-container ${bgClass} ${selectedClass} `}

//         className={`freezer-card-container ${bgClass} ${selectedClass}  h-auto min-h-[180px] sm:h-auto`}
//         style={isSelected ? { transform: "scale(1.01)" } : {}}
//       >
//         <div className={`relative w-full h-full`}>
//           <div className="freezer-card-content">
          
//             <div className="device-id-section">
//               <div className="flex flex-col items-start">
//                 <span className={`device-id-label `}>Device ID</span>
//                 <h3 className={`device-id-value `}>{deviceId}</h3>
//               </div>

//               {/* Ambient Temperature Pill */}
//            <div className={`ambient-pill bg-white/20 border border-white/30 flex items-center `}>
//             <img src="/odour-alert.svg" alt="" className="h-[45px] w-[45px]" />
//             <p className="ml-2 md:text-md lg:text-lg xl:text-xl">
//               {odourAlert ? "Detected" : "Normal"}
//             </p>
//           </div>

//             </div>

//             {/* Middle Section: Freezer Temperature & Humidity */}
//             <div className="freezer-temp-section mb-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <img src="/card-humidity-icon.svg" alt="Humidity" className="freezer-icon" />

//                   <div className="freezer-temp-info">
//                     <span className={`freezer-label  ${textClass}`}>Humidity</span>
//                     <span className={`freezer-temp-value  ${textClass}`}>
//                       {displayHumidity !== null ? `${displayHumidity}%` : "--"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <img src="/temperature-icon.svg" alt="Temperature" className="freezer-icon" />

//                   <div className="freezer-temp-info">
//                     <span className={`freezer-label ${textClass} `}>Temperature</span>
//                     <span className={`freezer-temp-value ${textClass}`}>
//                       {displayTemp !== null ? `${displayTemp}°C` : "--"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

            
//             {/* Bottom area intentionally removed as requested (battery/refrigerator warnings removed) */}

                    
//             <AlertBottom status={alertStatus} />
          
//           </div>
//         </div>
//       </div>
//       </>
//     );
//   }



// import "../../styles/global/fonts.css";
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css";

// export default function FreezerDeviceCard({
//   deviceId,
//   refrigeratorAlert,
//   ambientTemperature,
//   freezerTemperature,
//   batteryLow = false,
//   isSelected = false,
//   onCardSelect,
//   odourAlert = false,
//   temperatureAlert = false,
//   humidityAlert = false,
//   espHumidity = "",
//   espTemprature = "",
//   espOdour = 0,
// }) {
//   // helper: convert to finite number and keep integer part (before decimal)
//  const toInt = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? Math.trunc(n) : null;
//   };

//   // computed display values (only integer part)
//   const displayTemp = toInt(espTemprature);
//   const displayOdourPer = toInt(espOdour); 
//   const displayHumidity = toInt(espHumidity);

//   const handleCardClick = () => {
//     if (onCardSelect) onCardSelect();
//   };

//   // Alert priority logic:
//   // - odour has highest priority
//   // - if odour false and any other alert present -> "other"
//   // - otherwise -> "none"
//   const hasOtherAlert = temperatureAlert || humidityAlert;
//   const alertStatus = odourAlert ? "odour" : hasOtherAlert ? "other" : "none";

//   const textClass = alertStatus !== "none" ? "text-white" : "text-black";


  
//   const AlertBottom = ({ odourAlert, temperatureAlert, humidityAlert }) => {
//   const activeIcons = [];

//   if (odourAlert) activeIcons.push(
//     <img key="odour" src="/odour-alert.svg" alt="Odour" className="h-[30px] w-[30px]" />
//   );
//   if (temperatureAlert) activeIcons.push(
//     <img key="temp" src="/white-temperature-dashboard.svg" alt="Temperature" className="h-[40px] w-[20px]" />
//   );
//   if (humidityAlert) activeIcons.push(
//     <img key="humidity" src="/humidity-alert.svg" alt="Humidity" className="h-[25px] w-[20px]" />
//   );

//   // if no alerts, don't render the bottom section
//   if (activeIcons.length === 0) return null;

//   return(
//             <div className={`bg-white/20 -m-4 w-[calc(1zz00%+2rem)] py-1 px-5 flex items-center justify-between`}>
//             <h3 className={textClass}>Alert</h3>

//             <div className="flex items-center ">
//               <h4 className="mr-2">Detected</h4>
//               <div className="flex items-center justify-center ">
              
//                 {activeIcons}
//               </div>
//             </div>
//         </div>
//   )
    
//       }

//     // background classes — we only add utility classes, your CSS remains unchanged
//     const bgClass =
//       alertStatus === "odour"
//         ? "bg-[#CF4F4F]"
//         : alertStatus === "other"
//         ? "bg-green-400"
//         : "bg-white";

//     // selected transform + shadow (small feedback)
//   const selectedClass = isSelected
//     ? "shadow-lg transition-transform duration-300 ease-out"
//     : "transition-transform duration-300";

//     return (
//       <>
//       <div
//         onClick={handleCardClick}
//         // keep your existing 'freezer-card-container' class; append the bg + selected classes
//         // className={`freezer-card-container ${bgClass} ${selectedClass} `}

//         className={`freezer-card-container ${bgClass} ${selectedClass}  h-auto min-h-[180px] sm:h-auto`}
//         style={isSelected ? { transform: "scale(1.01)" } : {}}
//       >
//         <div className={`relative w-full h-full`}>
//           <div className="freezer-card-content">
          
//             <div className="device-id-section">
//               <div className="flex flex-col items-start">
//                 <span className={`device-id-label `}>Device ID</span>
//                 <h3 className={`device-id-value `}>{deviceId}</h3>
//               </div>

//               {/* Ambient Temperature Pill */}
//            <div className={`ambient-pill bg-white/20 border border-white/30 flex items-center `}>
//             <img src="/odour-alert.svg" alt="odour alert icon" className="h-[35px] w-[35px] xl:h-[40px] xl:w-[40px]" />
//            <div>
//             <p className="text-sm md:text-md 2xl:text-lg ">
//               {odourAlert ? "Detected" : "Normal"} <span className="text-sm md:text-md 2xl:text-lg">{displayOdourPer || 0}%</span>
//             </p>
//             {/* <p className="ml-2 text-sm md:text-md text-lg xl:text-xl"></p> */}
//            </div>
//           </div>

//             </div>

//             {/* Middle Section: Freezer Temperature & Humidity */}
//             <div className="freezer-temp-section mb-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <img src="/card-humidity-icon.svg" alt="Humidity" className="freezer-icon" />

//                   <div className="freezer-temp-info">
//                     <span className={`freezer-label  ${textClass}`}>Humidity</span>
//                     <span className={`freezer-temp-value  ${textClass}`}>
//                       {displayHumidity !== null ? `${displayHumidity}%` : "--"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <img src="/temperature-icon.svg" alt="Temperature" className="freezer-icon" />

//                   <div className="freezer-temp-info">
//                     <span className={`freezer-label ${textClass} `}>Temperature</span>
//                     <span className={`freezer-temp-value ${textClass}`}>
//                       {displayTemp !== null ? `${displayTemp}°C` : "--"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

            
//             {/* Bottom area intentionally removed as requested (battery/refrigerator warnings removed) */}

                    
//             <AlertBottom   odourAlert={odourAlert}
//                     temperatureAlert={temperatureAlert}
//                     humidityAlert={humidityAlert} />
          
//           </div>
//         </div>
//       </div>
//       </>
//     );
//   }









// import "../../styles/global/fonts.css";
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css";

// export default function FreezerDeviceCard({
//   deviceId,
//   refrigeratorAlert,
//   ambientTemperature,
//   freezerTemperature,
//   batteryLow = false,
//   isSelected = false,
//   onCardSelect,
//   odourAlert = false,
//   temperatureAlert = false,
//   humidityAlert = false,
//   espHumidity = "",
//   espTemprature = "",
//   espOdour = 0,
// }) {
//   // helper: convert to finite number and keep integer part (before decimal)
//  const toInt = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? Math.trunc(n) : null;
//   };

//   // computed display values (only integer part)
//   const displayTemp = toInt(espTemprature);
//   const displayOdourPer = toInt(espOdour); 
//   const displayHumidity = toInt(espHumidity);

//   const handleCardClick = () => {
//     if (onCardSelect) onCardSelect();
//   };

//   // Alert priority logic:
//   // - odour has highest priority
//   // - if odour false and any other alert present -> "other"
//   // - otherwise -> "none"
//   const hasOtherAlert = temperatureAlert || humidityAlert;
//   const alertStatus = odourAlert ? "odour" : hasOtherAlert ? "other" : "none";

//   const textClass = alertStatus !== "none" ? "text-white" : "text-black";



  
//   const AlertBottom = ({ odourAlert, temperatureAlert, humidityAlert }) => {
//   const activeIcons = [];

//   if (odourAlert) activeIcons.push(
//     <img key="odour" src="/anti-odour.png" alt="Odour" className="h-[25px] w-[25px]" />
//   );
//   if (temperatureAlert) activeIcons.push(
//     <img key="temp" src="/white-temperature-dashboard.svg" alt="Temperature" className="h-[40px] w-[20px]" />
//   );
//   if (humidityAlert) activeIcons.push(
//     <img key="humidity" src="/humidity-alert.svg" alt="Humidity" className="h-[25px] w-[20px]" />
//   );
  


//   // if no alerts, don't render the bottom section
//   if (activeIcons.length === 0) return null;

//   return(
//             <div className={`bg-white/20 -m-4 w-[calc(1zz00%+2rem)] py-1 px-5 flex items-center justify-between`}>
//             <h3 className={textClass}>Alert</h3>

//             <div className="flex items-center ">
//               <h4 className="mr-2">Detected</h4>
//               <div className="flex items-center justify-center ">
              
//                 {activeIcons}
//               </div>
//             </div>
//         </div>
//   )
    
//       }

//     // background classes — we only add utility classes, your CSS remains unchanged
//     const bgClass =
//       alertStatus === "odour"
//         ? "bg-[#CF4F4F]"
//         : alertStatus === "other"
//         ? "bg-green-400"
//         : "bg-white";

//     // selected transform + shadow (small feedback)
//   const selectedClass = isSelected
//     ? "shadow-lg transition-transform duration-300 ease-out"
//     : "transition-transform duration-300";

//     return (
//       <>
//       <div
//         onClick={handleCardClick}
//         // keep your existing 'freezer-card-container' class; append the bg + selected classes
//         // className={`freezer-card-container ${bgClass} ${selectedClass} `}

//         className={`freezer-card-container ${bgClass} ${selectedClass}  h-auto min-h-[180px] sm:h-auto`}
//         style={isSelected ? { transform: "scale(1.01)" } : {}}
//       >
//         <div className={`relative w-full h-full`}>
//           <div className="freezer-card-content">
          
//             <div className="device-id-section">
//               <div className="flex flex-col items-start">
//                 <span className={`device-id-label `}>Device ID</span>
//                 <h3 className={` responsive-value-deviceId `}>{deviceId}</h3>
//               </div>

//               {/* Ambient Temperature Pill */}
//            <div className={`ambient-pill bg-white/20 border border-white/30 flex items-center `}>
//            {
//             odourAlert ? <img src="/anti-odour.png" alt="odour alert icon" className="h-[2rem] w-[2rem] py-1  "  /> :  <img src="/odour-alert.svg" alt="odour alert icon" className="h-auto w-[2rem] py-1  " />
//            }
           
//            <div>
//             <p className="responsive-value-status">
//                <span className="responsive-value-status ">{displayOdourPer || 0}%</span>
//             </p>
//             {/* <p className="ml-2 text-sm md:text-md text-lg xl:text-xl"></p> */}
//            </div>
//           </div>
          

//             </div>

//             {/* Middle Section: Freezer Temperature & Humidity */}
//             <div className="freezer-temp-section mb-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <img src="/card-humidity-icon.svg" alt="Humidity" className="freezer-icon mr-0.5 xs:mr-none sm:mr-1" />

//                   <div className="freezer-temp-info">
//                     <span className={`freezer-label  ${textClass}`}>Humidity</span>
//                     <span className={`responsive-value ${textClass}  font-bold sm:semi-bold 2xl:font-bold`}>
//                       {displayHumidity !== null ? `${displayHumidity}%` : "--"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <img src="/temperature-icon.svg" alt="Temperature" className="freezer-icon mr-0.5 xs:mr-none sm:mr-1" />

//                   <div className="freezer-temp-info">
//                     <span className={`freezer-label ${textClass} `}>Temperature</span>
//                     <span className={`responsive-value ${textClass} font-bold sm:semi-bold  2xl:font-bold  `}>
//                       {displayTemp !== null ? `${displayTemp}°C` : "--"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

            
//             {/* Bottom area intentionally removed as requested (battery/refrigerator warnings removed) */}

                    
//             <AlertBottom   odourAlert={odourAlert}
//                     temperatureAlert={temperatureAlert}
//                     humidityAlert={humidityAlert} />
          
//           </div>
//         </div>
//       </div>
//       </>
//     );
//   }














// // src/pages/Dashboard/FreezerDeviceCard.jsx
import "../../styles/global/fonts.css";
import "../../styles/pages/Dashboard/freezer-cards-responsive.css";
import { Wind, Zap } from "lucide-react"; // lucide icons for AQI and Gas
import PropTypes from "prop-types";

export default function FreezerDeviceCard({
  deviceId,
  isSelected = false,
  onCardSelect,
  // common telemetry / alerts
  espTemprature = null,
  espHumidity = null,
  temperatureAlert = false,
  humidityAlert = false,
  // device-specific telemetry / alerts
  deviceType = "TMD", // "OMD" | "TMD" | "AQIMD" | "GLMD"
  espOdour = null,
  odourAlert = false,
  espAQI = null,
  aqiAlert = false,
  espGL = null,
  glAlert = false,
  // legacy names (if you still pass)
  ambientTemperature,
  freezerTemperature,
}) {
  const toInt = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : null;
  };

  // display numeric values (integer part)
  const displayTemp = toInt(espTemprature ?? ambientTemperature ?? freezerTemperature);
  const displayHumidity = toInt(espHumidity);
  const displayOdourPer = toInt(espOdour);
  const displayAQI = espAQI === null || espAQI === undefined ? null : Number(espAQI);
  const displayGass = toInt(espGL);

  const handleCardClick = () => {
    if (onCardSelect) onCardSelect();
  };

  // Alert priority:
  // odour (OMD) highest -> 'odour'
  // aqi (AQIMD) next -> 'aqi'
  // gass (GLMD) next -> 'gass'
  // temperature/humidity -> 'other'
  // none -> 'none'
  const hasTempOrHum = Boolean(temperatureAlert || humidityAlert);

  
  let alertStatus = "none";
  if (odourAlert) alertStatus = "odour";
  else if (aqiAlert) alertStatus = "aqi";
  else if (glAlert) alertStatus = "gass";
  else if (hasTempOrHum) alertStatus = "other";

  const textClass = alertStatus !== "none" ? "text-white" : "text-black";

  // card background mapping (you can change hex to match your design)
  const bgClass =
    alertStatus === "odour"
      ? "bg-[#CF4F4F]" // red
      : alertStatus === "aqi"
      ? "bg-[#7C3AED]" // purple
      : alertStatus === "gass"
      ? "bg-[#F59E0B]" // amber / orange
      : alertStatus === "other"
      ? "bg-green-400"
      : "bg-white";

  const selectedClass = isSelected ? "shadow-lg transition-transform duration-300 ease-out" : "transition-transform duration-300";

  // Compose icons for bottom alert row (keep your existing images for temp/hum/odour)
  const AlertBottom = ({ odourAlert, temperatureAlert, humidityAlert, aqiAlert, glAlert }) => {
    const activeIcons = [];

    if (odourAlert) activeIcons.push(<img key="odour" src="/anti-odour.png" alt="Odour" className="h-[25px] w-[25px]" />);
    if (temperatureAlert) activeIcons.push(<img key="temp" src="/white-temperature-dashboard.svg" alt="Temperature" className="h-[30px] w-[20px]" />);
    if (humidityAlert) activeIcons.push(<img key="humidity" src="/humidity-alert.svg" alt="Humidity" className="h-[25px] w-[20px]" />);
    if (aqiAlert) activeIcons.push(<Wind key="aqi" size={22} className="text-white" />); // lucide icon
    if (glAlert) activeIcons.push(<Zap key="gass" size={20} className="text-white" />); // lucide icon

    if (activeIcons.length === 0) return null;

    return (
      <div className={`bg-white/20 -m-4 w-[calc(100%+2rem)] py-1 px-5 flex items-center justify-between`}>
        <h3 className={textClass}>Alert</h3>
        <div className="flex items-center ">
          <h4 className="mr-2">Detected</h4>
          <div className="flex items-center justify-center space-x-2">
            {activeIcons.map((ic, i) => <span key={i} className="flex items-center">{ic}</span>)}
          </div>
        </div>
      </div>
    );
  };

  // compute the small device-type pill content
  const devicePill = (() => {
    switch (deviceType) {
      case "OMD":
        return {
          label: `${displayOdourPer !== null ? displayOdourPer : 0}%`,
          img: odourAlert ? "/anti-odour.png" : "/odour-alert.svg",
          alt: "Odour",
        };
      case "AQIMD":
        return {
          label: displayAQI !== null ? `${displayAQI} AQI` : "--",
          icon: <Wind size={20} className="text-yellow-900" />,
          alt: "AQI",
        };
      case "GLMD":
        return {
          label: `${displayGass !== null ? displayGass : 0}%`,
          icon: <Zap size={20} className="text-pink-900" />,
          alt: "Gas",
        };
      default:
        return {
          label: "", // for TMD we don't need the pill; return empty to hide
        };
    }
  })();

  return (
    <div
      onClick={handleCardClick}
      className={`freezer-card-container ${bgClass} ${selectedClass} h-auto min-h-[180px] sm:h-auto`}
      style={isSelected ? { transform: "scale(1.01)" } : {}}
    >
      <div className={`relative w-full h-full`}>
        <div className="freezer-card-content">
          <div className="device-id-section">
            <div className="flex flex-col items-start">
              <span className={`device-id-label ${textClass}`}>Device ID</span>
              <h3 className={`responsive-value-deviceId ${textClass}`}>{deviceId}</h3>
            </div>

            {/* Device-specific pill: appears for OMD/AQIMD/GLMD */}
            {devicePill && devicePill.label ? (
              <div className={`ambient-pill bg-white/20 border border-white/30 flex items-center`}>
                {/* prefer provided icon; fallback to img if present */}
                {devicePill.icon ? (
                  <div className="px-2">{devicePill.icon}</div>
                ) : (
                  <img src={devicePill.img} alt={devicePill.alt} className="h-[2rem] w-[2rem] py-1" />
                )}

                <div>
                  <p className="responsive-value-status">
                    <span className="responsive-value-status">{devicePill.label}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ width: 0 }} />
            )}
          </div>

          {/* Middle Section: always show Humidity and Temperature */}
          <div className="freezer-temp-section mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="/card-humidity-icon.svg" alt="Humidity" className="freezer-icon mr-0.5 xs:mr-none sm:mr-1" />
                <div className="freezer-temp-info">
                  <span className={`freezer-label ${textClass}`}>Humidity</span>
                  <span className={`responsive-value ${textClass} font-bold`}>
                    {displayHumidity !== null ? `${displayHumidity}%` : "--"}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <img src="/temperature-icon.svg" alt="Temperature" className="freezer-icon mr-0.5 xs:mr-none sm:mr-1" />
                <div className="freezer-temp-info">
                  <span className={`freezer-label ${textClass}`}>Temperature</span>
                  <span className={`responsive-value ${textClass} font-bold`}>
                    {displayTemp !== null ? `${displayTemp}°C` : "0°C"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Alerts */}
          <AlertBottom
            odourAlert={odourAlert}
            temperatureAlert={temperatureAlert}
            humidityAlert={humidityAlert}
            aqiAlert={aqiAlert}
            glAlert={glAlert}
          />
        </div>
      </div>
    </div>
  );
}

FreezerDeviceCard.propTypes = {
  deviceId: PropTypes.string,
  isSelected: PropTypes.bool,
  onCardSelect: PropTypes.func,
  espTemprature: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  espHumidity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  temperatureAlert: PropTypes.bool,
  humidityAlert: PropTypes.bool,
  deviceType: PropTypes.string,
  espOdour: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  odourAlert: PropTypes.bool,
  espAQI: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  aqiAlert: PropTypes.bool,
  espGL: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  glAlert: PropTypes.bool,
};












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



import "../../styles/global/fonts.css";
import "../../styles/pages/Dashboard/freezer-cards-responsive.css";

export default function FreezerDeviceCard({
  deviceId,
  refrigeratorAlert,
  ambientTemperature,
  freezerTemperature,
  batteryLow = false,
  isSelected = false,
  onCardSelect,
  odourAlert = false,
  temperatureAlert = false,
  humidityAlert = false,
  espHumidity = "",
  espTemprature = "",
}) {
  // helper: convert to finite number and keep integer part (before decimal)
 const toInt = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : null;
  };

  // computed display values (only integer part)
  const displayTemp = toInt(espTemprature);
  const displayHumidity = toInt(espHumidity);

  const handleCardClick = () => {
    if (onCardSelect) onCardSelect();
  };

  // Alert priority logic:
  // - odour has highest priority
  // - if odour false and any other alert present -> "other"
  // - otherwise -> "none"
  const hasOtherAlert = temperatureAlert || humidityAlert;
  const alertStatus = odourAlert ? "odour" : hasOtherAlert ? "other" : "none";

  const textClass = alertStatus !== "none" ? "text-white" : "text-black";


  
  const AlertBottom = ({ odourAlert, temperatureAlert, humidityAlert }) => {
  const activeIcons = [];

  if (odourAlert) activeIcons.push(
    <img key="odour" src="/odour-alert.svg" alt="Odour" className="h-[30px] w-[30px]" />
  );
  if (temperatureAlert) activeIcons.push(
    <img key="temp" src="/white-temperature-dashboard.svg" alt="Temperature" className="h-[40px] w-[20px]" />
  );
  if (humidityAlert) activeIcons.push(
    <img key="humidity" src="/humidity-alert.svg" alt="Humidity" className="h-[25px] w-[20px]" />
  );

  // if no alerts, don't render the bottom section
  if (activeIcons.length === 0) return null;

  return(
            <div className={`bg-white/20 -m-4 w-[calc(1zz00%+2rem)] py-1 px-5 flex items-center justify-between`}>
            <h3 className={textClass}>Alert</h3>

            <div className="flex items-center ">
              <h4 className="mr-2">Detected</h4>
              <div className="flex items-center justify-center ">
              
                {activeIcons}
              </div>
            </div>
        </div>
  )
    
      }

    // background classes — we only add utility classes, your CSS remains unchanged
    const bgClass =
      alertStatus === "odour"
        ? "bg-[#CF4F4F]"
        : alertStatus === "other"
        ? "bg-green-400"
        : "bg-white";

    // selected transform + shadow (small feedback)
  const selectedClass = isSelected
    ? "shadow-lg transition-transform duration-300 ease-out"
    : "transition-transform duration-300";

    return (
      <>
      <div
        onClick={handleCardClick}
        // keep your existing 'freezer-card-container' class; append the bg + selected classes
        // className={`freezer-card-container ${bgClass} ${selectedClass} `}

        className={`freezer-card-container ${bgClass} ${selectedClass}  h-auto min-h-[180px] sm:h-auto`}
        style={isSelected ? { transform: "scale(1.01)" } : {}}
      >
        <div className={`relative w-full h-full`}>
          <div className="freezer-card-content">
          
            <div className="device-id-section">
              <div className="flex flex-col items-start">
                <span className={`device-id-label `}>Device ID</span>
                <h3 className={`device-id-value `}>{deviceId}</h3>
              </div>

              {/* Ambient Temperature Pill */}
           <div className={`ambient-pill bg-white/20 border border-white/30 flex items-center `}>
            <img src="/odour-alert.svg" alt="" className="h-[45px] w-[45px]" />
            <p className="ml-2 md:text-md lg:text-lg xl:text-xl">
              {odourAlert ? "Detected" : "Normal"}
            </p>
          </div>

            </div>

            {/* Middle Section: Freezer Temperature & Humidity */}
            <div className="freezer-temp-section mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src="/card-humidity-icon.svg" alt="Humidity" className="freezer-icon" />

                  <div className="freezer-temp-info">
                    <span className={`freezer-label  ${textClass}`}>Humidity</span>
                    <span className={`freezer-temp-value  ${textClass}`}>
                      {displayHumidity !== null ? `${displayHumidity}%` : "--"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <img src="/temperature-icon.svg" alt="Temperature" className="freezer-icon" />

                  <div className="freezer-temp-info">
                    <span className={`freezer-label ${textClass} `}>Temperature</span>
                    <span className={`freezer-temp-value ${textClass}`}>
                      {displayTemp !== null ? `${displayTemp}°C` : "--"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            
            {/* Bottom area intentionally removed as requested (battery/refrigerator warnings removed) */}

                    
            <AlertBottom   odourAlert={odourAlert}
                    temperatureAlert={temperatureAlert}
                    humidityAlert={humidityAlert} />
          
          </div>
        </div>
      </div>
      </>
    );
  }

// import React from "react";
// import PropTypes from "prop-types";

// export default function TemperatureRangeMeter({
//   value = 16,
//   min = 0,
//   max = 40,
// }) {
//   // Clamp value inside range
//   const safeValue = Math.min(Math.max(value, min), max);

//   // Convert value → percentage position
//   const percentage = ((safeValue - min) / (max - min)) * 100;

//   return (
//     <div className="w-full px-2">
//       <div className="relative h-5 flex items-center">
        
//         {/* Segmented Bar */}
//         <div className="w-full h-3 rounded-full flex overflow-hidden shadow-inner">
//           <div className="flex-1 bg-green-600" />
//           <div className="flex-1 bg-lime-400" />
//           <div className="flex-1 bg-yellow-400" />
//           <div className="flex-1 bg-orange-400" />
//           <div className="flex-1 bg-red-500" />
//         </div>

//         {/* Pointer */}
//         <div
//           className="absolute flex flex-col items-center"
//           style={{
//             left: `${percentage}%`,
//             transform: "translateX(-50%)",
//           }}
//         >
//           {/* Circle */}
//           <div className="w-4 h-4 bg-black rounded-full border-2 border-white shadow-md z-10" />
          
//           {/* Triangle */}
//           <div
//             style={{
//               width: 0,
//               height: 0,
//               borderLeft: "7px solid transparent",
//               borderRight: "7px solid transparent",
//               borderTop: "8px solid black",
//               marginTop: "-2px",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// TemperatureRangeMeter.propTypes = {
//   value: PropTypes.number,
//   min: PropTypes.number,
//   max: PropTypes.number,
// };








// import React from "react";
// import PropTypes from "prop-types";

// export default function TemperatureRangeMeter({
//   value = 0,
//   min = 0,
//   max = 40,
// }) {
//   // Ensure numeric value
//   const numericValue = typeof value === "number" ? value : 0;

//   // Clamp inside range
//   const safeValue = Math.min(Math.max(numericValue, min), max);

//   // Convert to percentage
//   const percentage = ((safeValue - min) / (max - min)) * 100;

//   return (
//     <div className="w-full relative">
      
//       {/* Bar Container */}
//       <div className="relative w-full h-4 rounded-full overflow-hidden">
        
//         {/* Smooth Gradient (0 → 40) */}
//         <div
//           className="absolute inset-0 rounded-full"
//           style={{
//             background:
//               "linear-gradient(to right, #166534, #4ade80, #facc15, #fb923c, #b91c1c)",
//           }}
//         />

//         {/* Pointer */}
//         <div
//           className="absolute top-1/2 -translate-y-1/2"
//           style={{
//             left: `${percentage}%`,
//             transform: "translate(-50%, -50%)",
//           }}
//         >
//           {/* Circle */}
//           <div className="w-4 h-4 bg-black rounded-full border-2 border-white shadow-md" />

//           {/* Triangle */}
//           <div
//             style={{
//               width: 0,
//               height: 0,
//               borderLeft: "6px solid transparent",
//               borderRight: "6px solid transparent",
//               borderTop: "8px solid black",
//               marginTop: "-2px",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// TemperatureRangeMeter.propTypes = {
//   value: PropTypes.number,
//   min: PropTypes.number,
//   max: PropTypes.number,
// };





// import React from "react";
// import PropTypes from "prop-types";

// export default function TemperatureRangeMeter({
//   value = 0,
//   min = 0,
//   max = 40,
// }) {
//   // Ensure numeric value
//   const numericValue = Number(value);

//   // If invalid number → fallback to min
//   const safeValue = Number.isFinite(numericValue)
//     ? Math.min(Math.max(numericValue, min), max)
//     : min;

//   // Convert value → percentage position (0 → 100)
//   const percentage = ((safeValue - min) / (max - min)) * 100;

//   return (
//     <div className="w-full px-2">
//       <div className="relative h-5 flex items-center">
        
//         {/* Segmented Bar */}
//         <div className="w-full h-3 rounded-full flex overflow-hidden shadow-inner">
//           <div className="flex-1 bg-green-600" />
//           <div className="flex-1 bg-lime-400" />
//           <div className="flex-1 bg-yellow-400" />
//           <div className="flex-1 bg-orange-400" />
//           <div className="flex-1 bg-red-500" />
//         </div>

//         {/* Pointer */}
//         <div
//           className="absolute flex flex-col items-center"
//           style={{
//             left: `${percentage}%`,
//             transform: "translateX(-50%)",
//           }}
//         >
//           <div className="w-4 h-4 bg-black rounded-full border-2 border-white shadow-md z-10" />
          
//           <div
//             style={{
//               width: 0,
//               height: 0,
//               borderLeft: "7px solid transparent",
//               borderRight: "7px solid transparent",
//               borderTop: "8px solid black",
//               marginTop: "-2px",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// TemperatureRangeMeter.propTypes = {
//   value: PropTypes.number,
//   min: PropTypes.number,
//   max: PropTypes.number,
// };





import React from "react";
import PropTypes from "prop-types";

export default function TemperatureRangeMeter({
  value = 0,
  min = 16,
  max = 40,
}) {
  const numericValue = Number(value);

  const safeValue = Number.isFinite(numericValue)
    ? Math.min(Math.max(numericValue, min), max)
    : min;

  const percentage = ((safeValue - min) / (max - min)) * 100;

  return (
    <div className="w-full px-2">
      <div className="relative h-5 flex items-center">
        
        {/* Segmented Bar */}
        <div className="w-full h-3 rounded-full flex overflow-hidden shadow-inner">
          <div className="flex-1 bg-green-600" />
          <div className="flex-1 bg-lime-400" />
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-orange-400" />
          <div className="flex-1 bg-red-500" />
        </div>

        {/* Pointer */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: `${percentage}%`,
            bottom: "0%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-4 h-4 bg-black rounded-full border-3 border-white shadow-md z-10" />
          
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "8px solid black",
              marginTop: "-2px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

TemperatureRangeMeter.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

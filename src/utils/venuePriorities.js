// // src/utils/venuePriorities.js
// const KEY = "venuePriorities";

// /** load all saved priorities (object). returns {} if none. */
// export function loadVenuePriorities() {
//   try {
//     const raw = localStorage.getItem(KEY);
//     if (!raw) return {};
//     const parsed = JSON.parse(raw);
//     return parsed && typeof parsed === "object" ? parsed : {};
//   } catch (e) {
//     console.warn("Failed to read venue priorities", e);
//     return {};
//   }
// }

// /** write full object */
// export function saveVenuePriorities(obj) {
//   try {
//     localStorage.setItem(KEY, JSON.stringify(obj || {}));
//   } catch (e) {
//     console.warn("Failed to save venue priorities", e);
//   }
// }

// /** set priority for a single venue id (id must be string) */
// export function setVenuePriority(venueId, priority = "medium") {
//   if (!venueId) return;
//   const normalized = String(venueId);
//   const allowed = ["high", "medium", "low"];
//   const p = allowed.includes(priority) ? priority : "medium";
//   const map = loadVenuePriorities();
//   map[normalized] = p;
//   saveVenuePriorities(map);
// }

// /** get saved priority for a venue id, defaults to "medium" */
// export function getVenuePriority(venueId) {
//   if (!venueId) return "medium";
//   const map = loadVenuePriorities();
//   return map[String(venueId)] || "medium";
// }

// /** numeric weight for sorting */
// export function priorityWeight(priority) {
//   if (priority === "high") return 2;
//   if (priority === "medium") return 1;
//   return 0; // low
// }






// src/utils/venuePriorities.js
const KEY = "venuePriorities";

/** load all saved priorities (object). returns {} if none. */
export function loadVenuePriorities() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    console.warn("Failed to read venue priorities", e);
    return {};
  }
}

/** write full object */
export function saveVenuePriorities(obj) {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj || {}));
  } catch (e) {
    console.warn("Failed to save venue priorities", e);
  }
}

/** set priority for a single venue id (id must be string).
 *  Ensures only one venue can have 'high' — clears previous 'high' automatically.
 */
export function setVenuePriority(venueId, priority = "medium") {
  if (!venueId) return;
  const normalized = String(venueId);
  const allowed = ["high", "medium", "low"];
  const p = allowed.includes(priority) ? priority : "medium";
  const map = loadVenuePriorities();

  // If setting this to high, clear any other high
  if (p === "high") {
    for (const k of Object.keys(map)) {
      if (map[k] === "high" && k !== normalized) {
        delete map[k];
      }
    }
  }

  map[normalized] = p;
  saveVenuePriorities(map);
}

/** get saved priority for a venue id, defaults to "medium" */
export function getVenuePriority(venueId) {
  if (!venueId) return "medium";
  const map = loadVenuePriorities();
  return map[String(venueId)] || "medium";
}

/** numeric weight for sorting */
export function priorityWeight(priority) {
  if (priority === "high") return 2;
  if (priority === "medium") return 1;
  return 0; // low
}

/** find venue id that currently has the given priority.
 *  returns the first matching id or null.
 */
export function getVenueWithPriority(priority = "high") {
  const map = loadVenuePriorities();
  for (const k of Object.keys(map)) {
    if (map[k] === priority) return k;
  }
  return null;
}

/** remove priority for a specific venue id */
export function removeVenuePriority(venueId) {
  if (!venueId) return;
  const map = loadVenuePriorities();
  const key = String(venueId);
  if (map[key] !== undefined) {
    delete map[key];
    saveVenuePriorities(map);
  }
}

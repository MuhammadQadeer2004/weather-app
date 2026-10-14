// Aakhri dekha gaya shehar aur uska data browser me save karta hai (offline ke liye)
const KEY = "weather-now:last";

export function loadLast() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function saveLast(value) {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage full ya band ho to chup chaap ignore */
  }
}

// Open-Meteo ke weather codes ko samajhne layak naam aur "scene" me badalta hai
const CODES = {
  0: ["Clear sky", "clear"], 1: ["Mostly clear", "clear"], 2: ["Partly cloudy", "cloud"], 3: ["Overcast", "cloud"],
  45: ["Fog", "fog"], 48: ["Freezing fog", "fog"],
  51: ["Light drizzle", "rain"], 53: ["Drizzle", "rain"], 55: ["Heavy drizzle", "rain"],
  56: ["Freezing drizzle", "rain"], 57: ["Freezing drizzle", "rain"],
  61: ["Light rain", "rain"], 63: ["Rain", "rain"], 65: ["Heavy rain", "rain"],
  66: ["Freezing rain", "rain"], 67: ["Freezing rain", "rain"],
  71: ["Light snow", "snow"], 73: ["Snow", "snow"], 75: ["Heavy snow", "snow"], 77: ["Snow grains", "snow"],
  80: ["Rain showers", "rain"], 81: ["Rain showers", "rain"], 82: ["Violent showers", "rain"],
  85: ["Snow showers", "snow"], 86: ["Snow showers", "snow"],
  95: ["Thunderstorm", "storm"], 96: ["Thunderstorm with hail", "storm"], 99: ["Thunderstorm with hail", "storm"],
};

export function describe(code) {
  const [label, kind] = CODES[code] || ["Unknown", "cloud"];
  return { label, kind };
}

export const SCENES = {
  clear: "from-sky-500 via-sky-400 to-amber-300",
  cloud: "from-slate-500 via-slate-600 to-slate-800",
  rain: "from-slate-700 via-indigo-900 to-slate-900",
  storm: "from-slate-900 via-purple-950 to-slate-950",
  snow: "from-sky-500 via-slate-500 to-slate-700",
  fog: "from-slate-400 via-slate-500 to-slate-600",
};

export const toUnit = (c, unit) => Math.round(unit === "F" ? (c * 9) / 5 + 32 : c);

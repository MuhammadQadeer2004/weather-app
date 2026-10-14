// Open-Meteo: free API, key ki zaroorat nahi
export async function searchCities(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Search failed");
  const json = await res.json();
  return (json.results || []).map((c) => ({
    id: c.id,
    name: c.name,
    admin: c.admin1,
    country: c.country,
    lat: c.latitude,
    lon: c.longitude,
  }));
}

export async function getForecast({ lat, lon }) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast failed");
  return res.json();
}

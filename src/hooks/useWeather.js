import { useCallback, useEffect, useState } from "react";
import { getForecast } from "../api/weather";
import { loadLast, saveLast } from "../utils/storage";

const DEFAULT_CITY = { name: "London", country: "United Kingdom", lat: 51.5072, lon: -0.1276 };

export function useWeather() {
  const [city, setCity] = useState(() => loadLast()?.city || DEFAULT_CITY);
  const [data, setData] = useState(() => loadLast()?.data || null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [offlineAt, setOfflineAt] = useState(null);

  const load = useCallback(async (target) => {
    setStatus("loading");
    try {
      const fresh = await getForecast(target);
      setData(fresh);
      setOfflineAt(null);
      setStatus("ready");
      saveLast({ city: target, data: fresh, savedAt: Date.now() });
    } catch {
      // Internet nahi: agar isi shehar ka saved result hai to wohi dikhao
      const saved = loadLast();
      if (saved && saved.city.lat === target.lat && saved.city.lon === target.lon) {
        setData(saved.data);
        setOfflineAt(saved.savedAt);
        setStatus("ready");
      } else {
        setStatus("error");
      }
    }
  }, []);

  useEffect(() => {
    load(city);
    // sirf pehli baar chalana hai
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCity = (next) => {
    setCity(next);
    setData(null);
    load(next);
  };

  return { city, data, status, offlineAt, selectCity, retry: () => load(city) };
}

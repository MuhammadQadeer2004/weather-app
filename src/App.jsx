import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import WeatherScene from "./components/WeatherScene";
import { useWeather } from "./hooks/useWeather";
import { describe, SCENES } from "./utils/weather";

export default function App() {
  const { city, data, status, offlineAt, selectCity, retry } = useWeather();
  const [unit, setUnit] = useState("C");
  const kind = data ? describe(data.current.weather_code).kind : "clear";

  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-b ${SCENES[kind]} text-white`}>
      <WeatherScene kind={kind} />

      <main className="relative z-10 mx-auto max-w-2xl px-5 pb-16 pt-8">
        <div className="flex items-center gap-3">
          <div className="flex-1"><SearchBar onSelect={selectCity} /></div>
          <div role="group" aria-label="Temperature unit" className="flex overflow-hidden rounded-2xl border border-white/30">
            {["C", "F"].map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => setUnit(u)}
                className={`px-4 py-3.5 font-semibold transition ${unit === u ? "bg-white text-slate-800" : "bg-white/10 hover:bg-white/20"}`}
              >
                °{u}
              </button>
            ))}
          </div>
        </div>

        {offlineAt && (
          <p role="status" className="mt-5 rounded-xl bg-black/25 px-4 py-2.5 text-sm">
            You're offline. Showing the result saved on {new Date(offlineAt).toLocaleString()}.
          </p>
        )}

        {status === "loading" && !data && <p className="mt-16 text-xl text-white/80">Loading weather…</p>}

        {status === "error" && (
          <div role="alert" className="mt-16 rounded-2xl bg-black/30 p-6">
            <p className="text-xl font-medium">Could not load the weather.</p>
            <p className="mt-1 text-white/80">Check your internet connection and try again.</p>
            <button type="button" onClick={retry} className="mt-4 rounded-full bg-white px-6 py-2.5 font-semibold text-slate-800">
              Try again
            </button>
          </div>
        )}

        {data && status !== "error" && (
          <>
            <CurrentWeather city={city} current={data.current} unit={unit} />
            <Forecast daily={data.daily} unit={unit} />
          </>
        )}

        <p className="mt-12 text-sm text-white/60">Introduce to the weather app</p>
      </main>
    </div>
  );
}

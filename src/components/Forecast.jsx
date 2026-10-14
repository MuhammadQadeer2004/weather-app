import WeatherIcon from "./WeatherIcon";
import { describe, toUnit } from "../utils/weather";

export default function Forecast({ daily, unit }) {
  return (
    <section aria-label="Five day forecast" className="mt-10">
      <h2 className="mb-3 text-lg font-medium text-white/90">Next 5 days</h2>
      <ul className="grid grid-cols-5 gap-2 sm:gap-3">
        {daily.time.map((date, i) => {
          const { label, kind } = describe(daily.weather_code[i]);
          const day = i === 0 ? "Today" : new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" });
          return (
            <li key={date} className="flex flex-col items-center gap-2 rounded-2xl bg-white/15 px-1 py-4 backdrop-blur sm:px-3">
              <span className="text-sm font-medium">{day}</span>
              <WeatherIcon kind={kind} className="h-8 w-8" />
              <span className="sr-only">{label}</span>
              <span className="text-lg font-semibold">{toUnit(daily.temperature_2m_max[i], unit)}°</span>
              <span className="text-sm text-white/70">{toUnit(daily.temperature_2m_min[i], unit)}°</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

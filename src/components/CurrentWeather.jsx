import WeatherIcon from "./WeatherIcon";
import { describe, toUnit } from "../utils/weather";

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
      <dt className="text-sm text-white/75">{label}</dt>
      <dd className="mt-1 text-xl font-semibold">{value}</dd>
    </div>
  );
}

export default function CurrentWeather({ city, current, unit }) {
  const { label, kind } = describe(current.weather_code);
  const place = [city.name, city.country].filter(Boolean).join(", ");

  return (
    <section aria-label={`Current weather in ${city.name}`} className="mt-10">
      <h1 className="text-2xl font-medium text-white/90">{place}</h1>
      <div className="mt-2 flex items-center gap-5">
        <p className="text-[clamp(5rem,22vw,9rem)] font-light leading-none tracking-tight">
          {toUnit(current.temperature_2m, unit)}°
        </p>
        <div className="flex flex-col items-start gap-1">
          <WeatherIcon kind={kind} className="h-14 w-14" />
          <p className="text-xl font-medium">{label}</p>
        </div>
      </div>
      <dl className="mt-8 grid grid-cols-3 gap-3">
        <Stat label="Feels like" value={`${toUnit(current.apparent_temperature, unit)}°`} />
        <Stat label="Humidity" value={`${current.relative_humidity_2m}%`} />
        <Stat label="Wind" value={`${Math.round(current.wind_speed_10m)} km/h`} />
      </dl>
    </section>
  );
}

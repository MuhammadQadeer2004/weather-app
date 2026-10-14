const CLOUD = "M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9.5 4.25 4.25 0 0 1 17.5 18H7z";

export default function WeatherIcon({ kind, className = "h-10 w-10" }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", className, "aria-hidden": true };

  if (kind === "clear") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4.5" fill="currentColor" fillOpacity=".25" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1="12" y1="2.5" x2="12" y2="5" transform={`rotate(${a} 12 12)`} />
        ))}
      </svg>
    );
  }
  if (kind === "fog") {
    return (
      <svg {...common}>
        <line x1="4" y1="8" x2="20" y2="8" /><line x1="2" y1="12" x2="18" y2="12" /><line x1="5" y1="16" x2="21" y2="16" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d={CLOUD} fill="currentColor" fillOpacity=".15" />
      {kind === "rain" && (<><line x1="9" y1="20" x2="8" y2="22" /><line x1="13" y1="20" x2="12" y2="22" /><line x1="17" y1="20" x2="16" y2="22" /></>)}
      {kind === "snow" && (<><circle cx="9" cy="21" r=".6" /><circle cx="13" cy="21" r=".6" /><circle cx="17" cy="21" r=".6" /></>)}
      {kind === "storm" && <polygon points="13,16 10,21 13,21 11,24 16,18 13,18" fill="currentColor" />}
    </svg>
  );
}

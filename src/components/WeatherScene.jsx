import { useMemo } from "react";

const rand = (a, b) => a + Math.random() * (b - a);

function Drops({ count, snow }) {
  const drops = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i, left: rand(0, 100), delay: rand(0, 6),
      dur: snow ? rand(7, 13) : rand(0.7, 1.3), size: rand(3, 7),
    })),
    [count, snow]
  );
  return drops.map((d) =>
    snow ? (
      <span key={d.id} className="absolute top-0 rounded-full bg-white/80 animate-rain"
        style={{ left: `${d.left}%`, width: d.size, height: d.size, animationDelay: `-${d.delay}s`, animationDuration: `${d.dur}s` }} />
    ) : (
      <span key={d.id} className="absolute top-0 h-5 w-px bg-white/50 animate-rain"
        style={{ left: `${d.left}%`, animationDelay: `-${d.delay}s`, animationDuration: `${d.dur}s` }} />
    )
  );
}

function Clouds({ dark }) {
  const clouds = useMemo(
    () => Array.from({ length: 5 }, (_, i) => ({ id: i, top: rand(2, 55), w: rand(180, 380), delay: rand(0, 70) })),
    []
  );
  return clouds.map((c) => (
    <span key={c.id} className={`absolute rounded-full blur-2xl animate-drift ${dark ? "bg-slate-300/15" : "bg-white/25"}`}
      style={{ top: `${c.top}%`, width: c.w, height: c.w * 0.35, animationDelay: `-${c.delay}s` }} />
  ));
}

// Peeche ki animated "scene": mausam ke hisab se badalti hai
export default function WeatherScene({ kind }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {kind === "clear" && (
        <>
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl animate-glow" />
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-amber-200 animate-glow" />
        </>
      )}
      {(kind === "cloud" || kind === "fog") && <Clouds />}
      {kind === "rain" && (<><Clouds dark /><Drops count={70} /></>)}
      {kind === "storm" && (<><Clouds dark /><Drops count={90} /><div className="absolute inset-0 bg-white animate-flash" /></>)}
      {kind === "snow" && <Drops count={60} snow />}
    </div>
  );
}

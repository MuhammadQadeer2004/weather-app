import { useEffect, useState } from "react";
import { searchCities } from "../api/weather";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [state, setState] = useState("idle"); // idle | loading | ok | empty | error

  // Typing rukne ke 350ms baad search (debounce)
  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      setState("idle");
      return;
    }
    setState("loading");
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const found = await searchCities(term);
        if (cancelled) return;
        setResults(found);
        setState(found.length ? "ok" : "empty");
      } catch {
        if (!cancelled) setState("error");
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const pick = (city) => {
    onSelect(city);
    setQuery("");
    setResults([]);
    setState("idle");
  };

  return (
    <div className="relative">
      <label htmlFor="city" className="sr-only">Search for a city</label>
      <input
        id="city"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city…"
        autoComplete="off"
        className="w-full rounded-2xl border border-white/30 bg-white/15 px-5 py-3.5 text-lg text-white placeholder-white/70 backdrop-blur outline-none transition focus:bg-white/25"
      />
      {state !== "idle" && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl bg-white text-slate-800 shadow-xl">
          {state === "loading" && <li className="px-5 py-3 text-slate-500">Searching…</li>}
          {state === "empty" && <li className="px-5 py-3 text-slate-500">No city found.</li>}
          {state === "error" && <li className="px-5 py-3 text-red-600">Search failed. Check your connection.</li>}
          {state === "ok" &&
            results.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => pick(c)} className="w-full px-5 py-3 text-left hover:bg-sky-50">
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-slate-500">{[c.admin, c.country].filter(Boolean).length ? `, ${[c.admin, c.country].filter(Boolean).join(", ")}` : ""}</span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

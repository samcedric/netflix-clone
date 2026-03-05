import { useEffect, useMemo, useRef, useState } from "react";

export default function BannerCarousel({ items, onOpenMovie }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const safeItems = useMemo(() => (items?.length ? items : []), [items]);
  const active = safeItems[index];

  const go = (next) => {
    if (!safeItems.length) return;
    setIndex((prev) => {
      const n = typeof next === "number" ? next : prev + next;
      return (n + safeItems.length) % safeItems.length;
    });
  };

  useEffect(() => {
    if (!safeItems.length) return;
    timerRef.current = setInterval(() => go(1), 4500);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeItems.length]);

  if (!active) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
        <div
          className="h-[420px] md:h-[460px] bg-cover bg-center"
          style={{ backgroundImage: `url(${active.backdrop || active.poster})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

          <div className="relative h-full p-6 md:p-10 flex items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs text-zinc-300 bg-zinc-950/60 border border-zinc-800 rounded-full px-3 py-1">
                <span className="font-semibold text-zinc-100">{active.genre}</span>
                <span>•</span>
                <span>{active.year}</span>
                <span>•</span>
                <span>⭐ {active.rating}</span>
                <span>•</span>
                <span>{active.runtime}</span>
              </div>

              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
                {active.title}
              </h1>

              <p className="mt-3 text-zinc-200/90 line-clamp-3">
                {active.synopsis}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  className="rounded-xl bg-white text-zinc-950 px-4 py-2 font-semibold hover:bg-zinc-200 transition"
                  onClick={() => onOpenMovie(active.id)}
                >
                  ▶ Play (Details)
                </button>
                <button
                  className="rounded-xl bg-zinc-900/70 border border-zinc-700 px-4 py-2 font-semibold hover:bg-zinc-900 transition"
                  onClick={() => onOpenMovie(active.id)}
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-950/70 border border-zinc-700 px-3 py-2 hover:bg-zinc-900"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-950/70 border border-zinc-700 px-3 py-2 hover:bg-zinc-900"
          aria-label="Next"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {safeItems.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full border border-zinc-500 transition ${
                i === index ? "bg-white" : "bg-zinc-600/40"
              }`}
              aria-label={`Go to ${m.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
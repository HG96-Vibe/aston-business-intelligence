"use client";

import { useEffect, useRef, useState } from "react";

/* Four-step ladder drawn as a tube line. Desktop: SVG map (line draws in on scroll).
   Mobile: the same stations stacked vertically on a gold line. */

type Step = { step: string; name: string; price: string; duration: string; body: string; forWho: string };

const META = [
  { above: "Interchange · all journeys start here", fare: "£2,500", under: "2 weeks · fixed", alight: "Alight here with a costed plan" },
  { above: "4–6 weeks from previous", fare: "£8,000 – £15,000", under: "Assessment fare credited", alight: "Alight here with one model" },
  { above: "3–4 weeks from previous", fare: "£6,000 – £12,000", under: "Power BI", alight: "Alight here with dashboards" },
  { above: "Ongoing · optional", fare: "from £750 / month", under: "Cancel monthly", alight: "" },
];
const X = [125, 375, 625, 875];

export function TubeMap({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setDrawn(true); return; }
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setDrawn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-12">
      {/* Desktop map */}
      <svg viewBox="0 92 1000 162" className="hidden w-full overflow-visible md:block" role="img" aria-label="Four steps drawn as a tube line: Reporting Assessment, Single Source of Truth, Decision Dashboards, Managed BI">
        <path d="M875 160 H 990" fill="none" className="stroke-line" strokeWidth="9" strokeLinecap="round" strokeDasharray="14 12" />
        <path d="M20 160 H 875" fill="none" className="stroke-gold" strokeWidth="9" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={drawn ? 0 : 1} style={{ transition: "stroke-dashoffset 2.4s ease-out .2s" }} />
        {steps.map((s, i) => {
          const m = META[i], x = X[i], ich = i === 0;
          return (
            <g key={s.step} style={{ opacity: drawn ? 1 : 0, transition: `opacity .6s ${0.4 + i * 0.5}s` }}>
              <circle cx={x} cy="160" r={ich ? 15 : 10} className="fill-paper stroke-ink" strokeWidth={ich ? 4 : 3.5} />
              {ich && <rect x={x - 22} y="157" width="44" height="6" className="fill-ink" />}
              <text x={x} y="108" textAnchor="middle" className="fill-muted font-mono text-[8.5px] uppercase" style={{ letterSpacing: "1.2px" }}>{m.above}</text>
              <text x={x} y="128" textAnchor="middle" className="fill-ink font-display text-[17px]">{s.name}</text>
              <text x={x} y="200" textAnchor="middle" className="fill-ink font-display text-[15px]">{m.fare}</text>
              <text x={x} y="218" textAnchor="middle" className="fill-muted font-mono text-[8.5px] uppercase" style={{ letterSpacing: "1.2px" }}>{m.under}</text>
              {m.alight && <text x={x} y="242" textAnchor="middle" className="fill-accent font-mono text-[7.5px] uppercase" style={{ letterSpacing: "1px" }}>↑ {m.alight}</text>}
            </g>
          );
        })}
      </svg>

      {/* Desktop detail row, aligned under stations */}
      <ol className="mt-8 hidden grid-cols-4 gap-6 md:grid">
        {steps.map((s) => (
          <li key={s.step} className="border-t border-line pt-4">
            <p className="text-sm font-light leading-relaxed text-muted">{s.body}</p>
            <p className="mt-3 text-xs italic text-accent">{s.forWho}</p>
          </li>
        ))}
      </ol>

      {/* Mobile vertical line */}
      <ol className="relative ml-3 border-l-[6px] border-gold pl-8 md:hidden">
        {steps.map((s, i) => {
          const m = META[i], ich = i === 0;
          return (
            <li key={s.step} className={`relative pb-10 last:pb-0 ${i === steps.length - 1 ? "" : ""}`}>
              <span className={`absolute top-1 rounded-full border-ink bg-paper ${ich ? "-left-[47px] h-7 w-7 border-4" : "-left-[43px] h-5 w-5 border-[3px]"}`} />
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">{m.above}</p>
              <h3 className="mt-1 font-display text-xl font-normal text-ink">{s.name}</h3>
              <p className="mt-1 font-display text-lg text-ink">{m.fare} <span className="ml-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">{m.under}</span></p>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted">{s.body}</p>
              <p className="mt-2 text-xs italic text-accent">{s.forWho}</p>
              {m.alight && <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent">↑ {m.alight}</p>}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <span className="relative inline-grid h-16 w-16 place-items-center rounded-full border-[7px] border-gold" aria-hidden="true">
          <span className="absolute whitespace-nowrap bg-ink px-3 py-[3px] font-mono text-[8px] tracking-[1.5px] text-paper">ABI LINE</span>
        </span>
        <p className="max-w-[48ch] text-sm font-light text-muted">Prices exclude VAT. The Assessment fare is credited against any onward journey within twelve months. No season ticket.</p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* Three problems converge into one cause. Trace geometry is measured from the DOM so the
   lines always leave each problem box at its vertical centre and meet the cause box at its centre. */

type Pt = { x: number; y: number };

export function Convergence({ problems, cause }: {
  problems: [string, string][];
  cause: { label: string; title: string; body: string; cta: string; href: string };
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const causeRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; from: Pt[]; to: Pt } | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const measure = () => {
      if (window.innerWidth < 768) { setGeo(null); return; }
      const r = el.getBoundingClientRect();
      const c = causeRef.current?.getBoundingClientRect(); if (!c) return;
      const from = leftRefs.current.filter(Boolean).map((b) => { const q = b!.getBoundingClientRect(); return { x: q.right - r.left, y: q.top + q.height / 2 - r.top }; });
      setGeo({ w: r.width, h: r.height, from, to: { x: c.left - r.left, y: c.top + c.height / 2 - r.top } });
    };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(el);
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) setDrawn(true); }, { threshold: 0.3 }); io.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); io.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const path = (a: Pt, b: Pt) => { const mx = (a.x + b.x) / 2; return `M${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`; };

  return (
    <div ref={wrap} className="relative mt-12 grid gap-6 md:grid-cols-[1fr_140px_1fr] md:items-center">
      {geo && (
        <svg className="pointer-events-none absolute inset-0 hidden md:block" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
          {geo.from.map((f, i) => (
            <g key={i}>
              <path d={path(f, geo.to)} fill="none" className="stroke-line" strokeWidth="1.5" />
              <path d={path(f, geo.to)} fill="none" className="stroke-gold" strokeWidth="2" pathLength={1} strokeDasharray="1" strokeDashoffset={drawn ? 0 : 1} style={{ transition: `stroke-dashoffset 1.4s ease-out ${0.2 + i * 0.3}s` }} />
              <circle cx={f.x} cy={f.y} r="4.5" className="fill-gold" />
            </g>
          ))}
          <circle cx={geo.to.x} cy={geo.to.y} r="5" className="fill-gold" opacity={drawn ? 1 : 0} style={{ transition: "opacity .4s 1.6s" }} />
        </svg>
      )}

      <div className="grid gap-4">
        {problems.map(([t, b], i) => (
          <div key={t} ref={(n) => { leftRefs.current[i] = n; }} className="rounded-md border border-line bg-paper px-5 py-4">
            <h3 className="font-display text-lg font-normal text-ink">{t}</h3>
            <p className="mt-1 text-sm font-light leading-relaxed text-muted">{b}</p>
          </div>
        ))}
      </div>

      <div className="hidden md:block" />

      <div ref={causeRef} className="rounded-md border border-gold bg-accent-soft p-6">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent">{cause.label}</p>
        <h3 className="mt-2 font-display text-2xl font-normal leading-tight text-ink">{cause.title}</h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-muted">{cause.body}</p>
        <Link href={cause.href} className="mt-4 inline-block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent hover:underline">→ {cause.cta}</Link>
      </div>
    </div>
  );
}

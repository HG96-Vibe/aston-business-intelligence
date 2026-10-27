"use client";

import Link from "next/link";
import { useState } from "react";
import { subServices, categoryLabel } from "@/lib/offers";

/* Ten services in the accordion-strip style: two rows of five tall photo panels.
   The active panel in each row widens to show its name and line; the rest narrow to a number and a vertical title.
   Hover or focus on desktop; on phones they stack with the active panel taller. */

const ROWS = [subServices.slice(0, 5), subServices.slice(5, 10)];

function Row({ items, offset }: { items: typeof subServices; offset: number }) {
  const [on, setOn] = useState(0);
  return (
    <div className="flex flex-col gap-1.5 md:h-[420px] md:flex-row">
      {items.map((s, i) => {
        const active = i === on;
        const n = String(offset + i + 1).padStart(2, "0");
        return (
          <Link
            key={s.slug}
            href={s.href}
            onMouseEnter={() => setOn(i)}
            onFocus={() => setOn(i)}
            onClick={(e) => { if (!active && window.innerWidth < 768) { e.preventDefault(); setOn(i); } }}
            aria-expanded={active}
            className={`group relative block overflow-hidden rounded-lg transition-[flex,min-height] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${active ? "min-h-[300px] md:min-h-0 md:flex-[3]" : "min-h-[76px] md:min-h-0 md:flex-1"}`}
          >
            <div className="absolute inset-0">
              <div className={`h-full w-full ${s.duotone === false ? "bg-[#17161f]" : "duotone"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt="" className="h-full w-full object-cover" style={{ objectPosition: s.position ?? "center 35%" }} loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#17161f]/85 via-[#17161f]/25 to-transparent" />
            </div>

            {/* collapsed: number top-left, vertical title bottom-left */}
            <span className={`absolute left-4 top-4 z-10 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffc93c] ${active ? "hidden" : ""}`}>{n}</span>
            <h3 className={`absolute bottom-4 left-4 z-10 font-display text-lg font-normal leading-none text-white md:[writing-mode:vertical-rl] md:rotate-180 ${active ? "hidden" : "block"}`}>{s.name}</h3>

            {/* expanded */}
            <div className={`absolute inset-x-5 bottom-5 z-10 text-white transition-opacity duration-500 ${active ? "opacity-100 delay-200" : "pointer-events-none opacity-0"}`}>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffc93c]">{n} · {categoryLabel[s.category]}</span>
              <h3 className="mt-1 font-display text-2xl font-normal leading-tight md:text-3xl">{s.name}</h3>
              <p className="mt-2 max-w-[40ch] text-sm font-light leading-relaxed text-white/80">{s.line}</p>
              <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#ffc93c] group-hover:underline">Learn more →</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function ServicesGrid() {
  return (
    <div className="mt-12 flex flex-col gap-1.5">
      {ROWS.map((items, r) => <Row key={r} items={items} offset={r * 5} />)}
    </div>
  );
}

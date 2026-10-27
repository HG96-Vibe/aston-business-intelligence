"use client";

import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/site";
import { serviceOutcomes } from "@/lib/offers";

/* Four tall photo panels side by side; the active one widens to show its outcomes, the rest narrow to a title.
   Hover or tap on desktop; on phones they stack with the active panel taller. */

const images: Record<string, { src: string; duotone: boolean; position: string }> = {
  "data-bi": { src: "/img/streaks.jpg", duotone: false, position: "center" },
  "business-analysis": { src: "/img/corridor.jpg", duotone: true, position: "center 30%" },
  "ai-consulting": { src: "/img/tablet-pair.jpg", duotone: true, position: "center 35%" },
  "project-delivery": { src: "/img/conference.jpg", duotone: true, position: "center 40%" },
};

export function ServicesAccordion() {
  const [on, setOn] = useState(0);
  return (
    <div className="mt-12 flex flex-col gap-1.5 md:h-[480px] md:flex-row">
      {services.map((s, i) => {
        const img = images[s.slug]; const active = i === on;
        return (
          <Link
            key={s.slug}
            href={s.slug === "data-bi" ? "/services/data-bi" : `/services#${s.slug}`}
            onMouseEnter={() => setOn(i)}
            onFocus={() => setOn(i)}
            onClick={(e) => { if (!active && window.innerWidth < 768) { e.preventDefault(); setOn(i); } }}
            aria-expanded={active}
            className={`group relative block overflow-hidden rounded-lg transition-[flex,min-height] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${active ? "min-h-[320px] md:min-h-0 md:flex-[3.2]" : "min-h-[84px] md:min-h-0 md:flex-1"}`}
          >
            <div className="absolute inset-0">
              <div className={`h-full w-full ${img.duotone ? "duotone" : "bg-[#17161f]"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" className="h-full w-full object-cover" style={{ objectPosition: img.position }} loading="lazy" />
              </div>
              {!img.duotone && <div className="absolute inset-0 bg-gradient-to-t from-[#17161f]/85 via-[#17161f]/20 to-transparent" />}
            </div>

            {/* collapsed label (desktop): number top-left, vertical title bottom-left */}
            <span className={`absolute left-5 top-5 z-10 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffc93c] ${active ? "hidden" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={`absolute bottom-5 left-5 z-10 font-display text-xl font-normal text-white md:[writing-mode:vertical-rl] md:rotate-180 ${active ? "hidden" : "block"}`}>{s.title}</h3>

            {/* expanded content */}
            <div className={`absolute inset-x-6 bottom-6 z-10 text-white transition-opacity duration-500 ${active ? "opacity-100 delay-200" : "pointer-events-none opacity-0"}`}>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffc93c]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 font-display text-2xl font-normal leading-tight md:text-3xl">{s.title}</h3>
              <p className="mt-2 max-w-[46ch] text-sm font-light leading-relaxed text-white/80">{s.short}</p>
              <ul className="mt-3 grid gap-1 text-sm">
                {serviceOutcomes[s.slug].map((o) => <li key={o} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ffc93c]" />{o}</li>)}
              </ul>
              <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#ffc93c] group-hover:underline">Learn more →</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

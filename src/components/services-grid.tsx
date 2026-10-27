import Link from "next/link";
import { subServices, categoryLabel } from "@/lib/offers";

/* Ten services as photo cards, five across. Each card: duotone photo, category label, name, one line, optional price/duration tag. */
export function ServicesGrid() {
  return (
    <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {subServices.map((s, i) => (
        <li key={s.slug}>
          <Link href={s.href} className="group block h-full overflow-hidden rounded-lg border border-line bg-paper transition hover:border-gold/60">
            <div className="relative h-40">
              <div className="duotone h-full w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt="" style={{ objectPosition: s.position ?? "center 35%" }} className="transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
              </div>
              <span className="absolute left-3 top-3 z-10 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#ffc93c]">{String(i + 1).padStart(2, "0")} · {categoryLabel[s.category]}</span>
              {s.tag && <span className="absolute bottom-3 left-3 z-10 rounded-sm border border-[#ffc93c]/60 bg-[#17161f]/70 px-1.5 py-0.5 font-mono text-[0.6rem] text-[#ffc93c] backdrop-blur-sm">{s.tag}</span>}
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg font-normal leading-snug text-ink">{s.name}</h3>
              <p className="mt-1.5 text-sm font-light leading-relaxed text-muted">{s.line}</p>
              <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent group-hover:underline">Learn more →</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

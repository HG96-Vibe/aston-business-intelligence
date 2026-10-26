import Link from "next/link";
import { offers, commercial, weekOne, proof } from "@/lib/offers";
import { Section, SectionHead } from "@/components/ui";

export function bookHref() {
  return "/contact#book";
}

export function PricingLadder({ compact = false, number }: { compact?: boolean; number?: string }) {
  return (
    <Section dim={!compact}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHead
          number={number}
          eyebrow="Fixed prices"
          title="One ladder,"
          em="fixed prices."
          intro="Start small. Every first engagement is a defined piece of work with a defined price, so you know the bill before you say yes."
        />
        <p className="max-w-xs text-sm text-muted md:text-right">
          Prices exclude VAT. Fees for a Health Check or Readiness Review are credited against follow-on work within 12 months.
        </p>
      </div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-4">
        {offers.map((o, i) => (
          <div key={o.slug} className={`relative flex flex-col bg-paper p-6 ${o.featured ? "md:bg-accent-soft" : ""}`}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              {o.featured && <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Most start here</span>}
            </div>
            <h3 className="mt-3 text-lg text-ink">{o.name}</h3>
            <p className="mt-1 text-xs text-muted">{o.duration}</p>
            <p className="mt-4 font-display text-3xl text-ink">{o.price}</p>
            <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-muted">{o.forWho}</p>
            {!compact && (
              <ul className="mt-5 grid gap-1.5 text-sm text-body">
                {o.youGet.map((g) => (
                  <li key={g} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{g}</li>
                ))}
              </ul>
            )}
            <Link href={bookHref()} className="mt-6 inline-flex items-center justify-center rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-ink hover:bg-gold-strong">
              Book a conversation
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function WeekOne({ number }: { number?: string }) {
  return (
    <Section>
      <SectionHead number={number} eyebrow="Week one" title="What actually happens" em="in the first five days." intro="People hesitate because they can't picture the first week. Here it is." />
      <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-4">
        {weekOne.map(([day, title, body]) => (
          <li key={day} className="bg-paper p-6">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-accent">{day}</span>
            <h3 className="mt-3 text-lg text-ink">{title}</h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-muted">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Guarantee() {
  return (
    <Section dim>
      <div className="grid gap-8 rounded-md border border-accent/30 bg-paper p-8 md:grid-cols-[1fr_1.4fr] md:p-10">
        <div>
          <p className="marker">Our guarantee</p>
          <h2 className="mt-4 text-3xl text-ink">{commercial.guarantee.title}</h2>
        </div>
        <p className="font-light leading-relaxed text-body md:pt-9">{commercial.guarantee.body}</p>
      </div>
    </Section>
  );
}

export function ProofStrip() {
  return (
    <section className="hairline">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_2fr] md:px-6">
        <div>
          <p className="marker">What we work with</p>
          <p className="mt-3 text-sm font-light text-muted">The tools your team already has, not a platform you need to buy.</p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {proof.tools.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-body">{t}</li>
          ))}
          {proof.certifications.map((c) => (
            <li key={c} className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-sm text-ink">{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Availability({ light = false }: { light?: boolean }) {
  const next = new Date(); next.setMonth(next.getMonth() + 1);
  const month = next.toLocaleString("en-GB", { month: "long" });
  return (
    <p className={`inline-flex flex-wrap items-center gap-x-2 text-sm ${light ? "text-white/70" : "text-muted"}`}>
      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
      Taking on {commercial.newEngagementsPerMonth} new engagements for {month} · first call within {commercial.firstCallWithin}
    </p>
  );
}

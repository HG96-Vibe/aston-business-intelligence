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
          Prices exclude VAT. Fees for a Reporting Assessment or AI Readiness Assessment are credited against follow-on work within 12 months.
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
      <SectionHead number={number} eyebrow="Week one" title="By Friday" em="you'll have:" />
      <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
        <ul className="m-0 list-none p-0">
          {weekOne.youGet.map(([t, b]) => (
            <li key={t} className="grid grid-cols-[28px_1fr] gap-3 border-b border-line py-4">
              <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full border border-gold bg-accent-soft text-xs text-accent" aria-hidden="true">✓</span>
              <div><p className="font-medium text-ink">{t}</p><p className="mt-0.5 text-sm font-light leading-relaxed text-muted">{b}</p></div>
            </li>
          ))}
        </ul>
        <aside className="self-start rounded-md border border-line bg-paper p-6 md:sticky md:top-24">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">What it costs you</p>
          <p className="mt-2 font-display text-5xl font-light leading-none text-ink">{weekOne.hours}<span className="ml-2 text-lg text-muted">hours</span></p>
          <p className="mt-3 text-sm font-light leading-relaxed text-muted">{weekOne.costNote}</p>
          <ul className="mt-4 border-t border-line text-sm">
            {weekOne.yourTime.map(([k, v]) => (
              <li key={k} className="flex justify-between gap-4 border-b border-line py-2"><span className="text-body">{k}</span><span className="font-mono text-xs text-ink">{v}</span></li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">And then</p>
          <p className="mt-1 text-sm font-light leading-relaxed text-muted"><span className="font-medium text-ink">End of week two:</span> your costed plan. <span className="font-medium text-ink">During any build:</span> a one-page note every Friday, short enough to forward to the board unedited.</p>
        </aside>
      </div>
    </Section>
  );
}

export function Guarantee() {
  return (
    <Section>
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

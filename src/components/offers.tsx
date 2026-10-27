import Link from "next/link";
import type { ReactNode } from "react";
import { offers, commercial, weekOne } from "@/lib/offers";
import { Section, SectionHead } from "@/components/ui";
import { ToolRows } from "@/components/tool-strip";

export function bookHref() {
  return "/contact#book";
}

export function PricingLadder({ compact = false, number }: { compact?: boolean; number?: string }) {
  return (
    <Section dim={!compact} id="pricing">
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

/* Home-page version of the ladder: the shape of an engagement (assess → build → run)
   with the entry price shown once, as the headline number. Full ladder with every
   price stays on /services via PricingLadder. */
const entryPrice = offers.find((o) => o.slug === "reporting-assessment")?.price ?? "£2,500";

export function EngagementLadder({ number }: { number?: string }) {
  const steps: { n: string; label: string; title: ReactNode; body: string; cta: ReactNode; featured?: boolean }[] = [
    {
      n: "01", label: "Assess", featured: true,
      title: <>Reporting Assessment<br />or AI Readiness Assessment</>,
      body: "About three hours of your time. A written report and a costed, prioritised plan, whether or not you continue with us.",
      cta: <Link href={bookHref()} className="inline-flex min-h-11 items-center justify-center self-start rounded-md bg-gold px-[18px] text-sm font-semibold text-[#17161f] hover:bg-gold-strong">Book a conversation</Link>,
    },
    {
      n: "02", label: "Build",
      title: <>Fixed price,<br />quoted in your report</>,
      body: "Single Source of Truth, Decision Dashboards, a scoped system change or an AI pilot. Two-week increments, a written update every Friday.",
      cta: <Link href="/services/data-bi#ladder" className="self-start border-b border-accent pb-0.5 text-sm font-medium text-ink hover:text-accent">What each step covers →</Link>,
    },
    {
      n: "03", label: "Run",
      title: <>Your team owns it.<br />We&apos;re optional</>,
      body: "Documentation, training and a support window come with every build. Managed BI monthly, or a project lead by the day, if you want us around.",
      cta: <Link href="/services#pricing" className="self-start border-b border-accent pb-0.5 text-sm font-medium text-ink hover:text-accent">Full price list →</Link>,
    },
  ];
  return (
    <Section tone="dark">
      <div className="grid gap-10 md:grid-cols-2 md:items-end md:gap-16">
        <SectionHead number={number} eyebrow="How engagements start" title="Start small." em="Know the bill before you say yes." />
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-5">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Every first engagement</p>
            <p className="mt-2 font-display text-6xl font-light leading-none text-ink md:text-7xl">{entryPrice}</p>
          </div>
          <p className="max-w-[220px] text-sm font-light leading-relaxed text-muted md:pb-1.5">Fixed fee, two weeks, ex VAT. Credited against whatever you build next.</p>
        </div>
      </div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className={`flex flex-col gap-3.5 p-7 ${s.featured ? "border-t-2 border-gold bg-paper-dim" : "bg-paper"}`}>
            <div className="flex items-baseline justify-between">
              <span className={`font-mono text-xs ${s.featured ? "text-accent" : "text-muted"}`}>{s.n}&nbsp;&nbsp;{s.label}</span>
              {s.featured && <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Most start here</span>}
            </div>
            <h3 className="text-[1.2rem] font-medium leading-snug text-ink">{s.title}</h3>
            <p className="flex-1 text-sm font-light leading-relaxed text-muted">{s.body}</p>
            {s.cta}
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
    <Section>
      <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-end">
        <div>
          <p className="marker">What we work with</p>
          <h2 className="mt-4 text-3xl text-ink md:text-[2.6rem]">Your tools, <span className="em">not a platform you need to buy.</span></h2>
        </div>
        <p className="max-w-xl text-lg font-light leading-relaxed text-muted md:justify-self-end md:text-right">
          We build in what your team already has and can keep running. If you have nothing yet, we start you on Power BI. Third-party names and logos are the property of their owners.
        </p>
      </div>
      <div className="mt-12"><ToolRows /></div>
    </Section>
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

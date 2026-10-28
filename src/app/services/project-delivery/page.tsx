import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Section, SectionHead, CtaBand, Button } from "@/components/ui";
import { bookHref } from "@/components/offers";
import { Convergence } from "@/components/convergence";
import { TubeMap, type Meta } from "@/components/tube-map";

export const metadata: Metadata = {
  alternates: { canonical: "/services/project-delivery/" },
  title: "Project Delivery",
  description: "Delivered on the date you told the board. A fractional project lead from £750 a day, 1–3 days a week: plan, RAID log, weekly written steering report and suppliers held to account.",
};

/* Project Delivery deep-dive. Same structure as the other three service pages. */

const pains: [string, string][] = [
  ["The date keeps moving", "Every update says “next month”. Nobody can say why, or what it will cost."],
  ["Suppliers mark their own homework", "Status reports come from the people doing the work, so everything is always green."],
  ["Nobody internal has time to own it", "The project sits on top of someone's day job, so it gets the hours left over."],
];

const ladder = [
  { step: "01", name: "Fractional Project Lead", price: "from £750 / day", duration: "1–3 days a week", body: "You receive: a plan, RAID log and budget tracker from day one, and a written steering note every Friday.", forWho: "Where every client starts." },
  { step: "02", name: "Supplier Oversight", price: "same day rate", duration: "through the build", body: "You receive: a supplier scorecard, change requests costed before they're approved, and progress checked against what was promised, not what was reported.", forWho: "For “we've hired them, now hold them to it”." },
  { step: "03", name: "Testing & Go-live", price: "same day rate", duration: "around go-live", body: "You receive: acceptance test plan and scripts, a go-live checklist and a cut-over plan, with a clear go / no-go decision.", forWho: "For “we're nearly there, don't let it slip now”." },
  { step: "04", name: "Handover & Close", price: "same day rate", duration: "after go-live", body: "You receive: a clean handover to business-as-usual, an end-of-project report and lessons learned for next time.", forWho: "After go-live." },
];

const meta: Meta[] = [
  { above: "Interchange · all journeys start here", fare: "from £750 / day", under: "1–3 days a week", alight: "Alight here with a plan you trust" },
  { above: "Through the build", fare: "Same day rate", under: "Days agreed weekly", alight: "Alight here with suppliers on track" },
  { above: "Around go-live", fare: "Same day rate", under: "Days agreed weekly", alight: "Alight here live" },
  { above: "After go-live · optional", fare: "Same day rate", under: "Fixed number of days", alight: "" },
];

/* What lands on your desk */
const steeringNote = (
  <div className="text-[0.6rem] leading-snug">
    <p className="font-display text-sm text-ink">Week 6 of 10 · <span className="text-[#2f7d4f]">On track</span></p>
    <div className="mt-2 grid grid-cols-2 gap-2">
      <div><p className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-accent">Done</p><p className="text-ink">✓ Data migration tested</p><p className="text-ink">✓ Training booked</p></div>
      <div><p className="font-mono text-[0.48rem] uppercase tracking-[0.1em] text-accent">Next</p><p className="text-ink">→ UAT round 2</p><p className="text-ink">→ Cut-over plan</p></div>
    </div>
    <div className="mt-2 flex items-center gap-2"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"><div className="h-full w-[58%] rounded-full bg-gold" /></div><span className="font-mono text-[0.48rem] text-muted">£29k / £50k</span></div>
  </div>
);
const raid = (
  <ul className="grid gap-1 text-[0.58rem]">
    {[["R", "Supplier key person on leave in week 8", "#f0b98c"], ["A", "Go-live assumes data cleansed by week 7", "#e2ddd1"], ["I", "Payroll interface late by 4 days", "#f0b98c"], ["D", "Go-live moved to 14 March, agreed by MD", "#e2ddd1"]].map(([k, t, c]) => (
      <li key={t} className="flex items-center gap-1.5"><span className="grid h-4 w-4 shrink-0 place-items-center rounded font-mono text-[0.5rem] text-ink" style={{ background: c }}>{k}</span><span className="text-ink">{t}</span></li>
    ))}
  </ul>
);
const scorecard = (
  <ul className="grid gap-1.5 text-[0.58rem]">
    {[["On time", 3], ["On budget", 4], ["Quality", 2], ["Communication", 4]].map(([t, v]) => (
      <li key={t as string} className="grid grid-cols-[72px_1fr] items-center gap-2"><span className="text-ink">{t}</span><span className="flex gap-0.5">{[1, 2, 3, 4, 5].map((n) => <i key={n} className={`h-1.5 flex-1 rounded-full ${n <= (v as number) ? "bg-gold" : "bg-line"}`} />)}</span></li>
    ))}
  </ul>
);

const desk: { k: string; t: string; b: string; sample?: ReactNode }[] = [
  { k: "Every Friday", t: "Steering note", b: "Done, next, blockers, budget and any decision we need from you. Short enough to forward to the board unedited.", sample: steeringNote },
  { k: "Day one, kept live", t: "RAID log", b: "Risks, assumptions, issues and decisions, each with an owner and a date.", sample: raid },
  { k: "Monthly", t: "Supplier scorecard", b: "Each supplier rated on time, budget, quality and communication, against what they promised.", sample: scorecard },
  { k: "Day one, kept live", t: "Plan & budget tracker", b: "Milestones, dependencies and spend against budget, updated every week." },
  { k: "As they come in", t: "Change request log", b: "Every change to scope, its cost and who approved it, before any work starts." },
  { k: "At the end", t: "End-of-project report", b: "What was delivered against plan, budget and scope, and lessons for next time." },
];

const faqs: [string, [string, string], string][] = [
  ["Why not just hire a project manager?", ["You can.", " This is faster and part-time."], "A permanent hire takes months and costs a full salary for a project that may need two days a week. A fractional lead starts within days and stops when the project does."],
  ["How many days a week?", ["One to three, usually.", " Agreed week by week."], "More around go-live, fewer in quiet weeks. You see the days in the steering note, so there are no surprises on the invoice."],
  ["Do you work with our existing suppliers?", ["Yes.", " That is most of the job."], "We don't replace your suppliers; we make sure they deliver what they promised. Change requests are costed and approved before work starts, and progress is checked, not taken on trust."],
  ["What if the project is already in trouble?", ["That's when we're most useful.", ""], "The first two weeks are a written health check: where it really stands, what it will take to land, and the honest options. Then you decide."],
  ["Which methods do you use?", ["Whatever fits the project.", " Agile, waterfall or a mix."], "The method serves the project, not the other way round. What doesn't change is the weekly written report and one person accountable for the finish line."],
];

export default function ProjectDeliveryPage() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden bg-[#0e0c09]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
          <div className="duotone natural cover inset-0">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/pd-workshop.jpg" alt="" style={{ objectPosition: "60% 35%" }} /></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0e0c09_0%,#0e0c09_40%,rgba(14,12,9,.6)_54%,rgba(14,12,9,.05)_78%)] max-lg:bg-[linear-gradient(90deg,rgba(14,12,9,.95),rgba(14,12,9,.7))]" aria-hidden="true" />
        <div className="wrap relative pb-20 pt-24 md:pb-28 md:pt-32">
          <p className="marker !text-[#ffc93c]">Services · Project Delivery</p>
          <h1 className="mt-5 max-w-2xl text-[2.3rem] leading-[1.08] text-white md:text-[3.4rem]">
            Delivered on the date <span className="em !text-[#ffc93c]">you told the board.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/75">
            A senior project lead, one to three days a week, who owns the plan, holds your suppliers to what they promised, and tells you in writing every Friday exactly where things stand.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={bookHref()} className="inline-flex min-h-12 items-center rounded-md bg-gold px-6 font-semibold text-[#17161f] hover:bg-gold-strong">Book a conversation</Link>
            <Link href="#ladder" className="inline-flex min-h-12 items-center rounded-md border border-white/30 px-6 font-semibold text-white hover:border-white/70">How the work is structured</Link>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead number="01" eyebrow="Why companies call us" title="Three problems," em="one underlying cause." />
        <Convergence
          problems={pains}
          cause={{ label: "The cause", title: "Nobody independent owns the finish line.", body: "So dates slip quietly, scope creeps and the suppliers set the pace. Put one accountable lead on it, with a weekly written report, and the project starts moving again.", cta: "How we fix it: a fractional project lead", href: "#ladder" }}
        />
      </Section>

      <Section dim id="ladder">
        <SectionHead number="02" eyebrow="How the work is structured" title="Four stops." em="Alight at any of them." intro="Every journey starts with a project lead in the seat. Days are agreed week by week, so you only pay for what the project needs." />
        <TubeMap steps={ladder} meta={meta} note="Prices exclude VAT. One day rate throughout; the days needed are agreed each week and shown in the steering note." />
      </Section>

      {/* Photo band */}
      <section className="relative h-[340px] overflow-hidden bg-[#17161f] md:h-[440px]" aria-label="Photograph">
        <div className="duotone natural cover inset-0">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/svc/supplier-oversight.jpg" alt="" style={{ objectPosition: "center 35%" }} /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/90 via-[#0e0c09]/25 to-transparent" aria-hidden="true" />
        <div className="wrap relative flex h-full items-end justify-between gap-6 pb-9">
          <p className="max-w-[32ch] font-display text-2xl font-light leading-tight text-white md:text-3xl">Suppliers held to what they promised, <i className="text-[#ffc93c]">in writing.</i></p>
          <p className="hidden shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70 md:block">Supplier oversight</p>
        </div>
      </section>

      <Section>
        <SectionHead number="03" eyebrow="What lands on your desk" title="Six documents that keep" em="a project honest." intro="Written so you, your board and your suppliers are all looking at the same picture. Yours to keep when the project closes." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {desk.map((d) => (
            <li key={d.t} className="flex flex-col rounded-xl bg-paper p-6 shadow-[0_24px_50px_-30px_rgba(23,22,31,.35)]">
              {d.sample && (
                <div className="relative mb-5 rounded-lg border border-line bg-white p-3">
                  <span className="absolute right-2 top-2 rounded border border-accent/50 px-1 font-mono text-[0.45rem] uppercase tracking-[0.12em] text-accent">Sample</span>
                  <div className="pt-3">{d.sample}</div>
                </div>
              )}
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">{d.k}</p>
              <h3 className="mt-1.5 font-display text-[1.5rem] leading-tight text-ink">{d.t}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-muted">{d.b}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section dim>
        <SectionHead number="04" eyebrow="Questions" title="Before you ask." />
        <dl className="mt-10 border-t border-line">
          {faqs.map(([q, [lead, rest], a], i) => (
            <div key={q} className="grid gap-3 border-b border-line py-7 md:grid-cols-[1.1fr_1.4fr] md:gap-10">
              <dt className="font-display text-xl leading-snug text-ink md:text-2xl"><span className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent">0{i + 1}</span>{q}</dt>
              <dd className="m-0">
                <p className="font-display text-xl leading-tight text-ink md:text-2xl"><em className="not-italic text-accent">{lead}</em>{rest}</p>
                <p className="mt-3 max-w-[60ch] text-sm font-light leading-relaxed text-muted">{a}</p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="pt-6 text-sm text-muted">See also: <Link href="/services/business-analysis" className="underline hover:text-ink">Business Analysis</Link> · <Link href="/services/data-bi" className="underline hover:text-ink">Data &amp; BI</Link></p>
      </Section>

      <section className="bg-paper">
        <div className="wrap py-14">
          <div className="grid gap-6 rounded-2xl border border-gold bg-accent-soft p-8 shadow-[0_30px_60px_-30px_rgba(233,179,36,.6)] md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Start here</p>
              <p className="mt-2 font-display text-3xl text-ink">Fractional Project Lead</p>
              <p className="mt-1 text-muted">1–3 days a week · <span className="font-medium text-ink">from £750 / day</span> ex VAT</p>
              <p className="mt-3 max-w-xl font-light leading-relaxed text-body">Someone accountable for the finish line, reporting to you every week.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end"><Button href={bookHref()}>Book a conversation</Button></div>
          </div>
        </div>
      </section>

      <div className="pt-16"><CtaBand /></div>
    </>
  );
}

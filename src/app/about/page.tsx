import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PhotoBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Why Aston Business Intelligence exists, how a team is built for each engagement, and what you can hold us to.",
};

/* About is about the company, not individuals: no names, photos of named people, or headcounts. */

function Photo({ src, pos = "center", natural = false, className = "" }: { src: string; pos?: string; natural?: boolean; className?: string }) {
  return (
    <div className={`duotone cover inset-0 ${natural ? "natural" : ""} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ objectPosition: pos }} />
    </div>
  );
}

const roles: [string, string][] = [
  ["Data engineer", "Connects your systems and builds the pipelines, so nobody copies and pastes again."],
  ["BI developer", "Builds the model and dashboards in the tools you already pay for."],
  ["Business analyst", "Maps how the work really flows and writes requirements a supplier can't misread."],
  ["AI practitioner", "Finds where AI pays back, builds the pilot and measures it against a number."],
  ["Project lead", "Runs delivery week by week, holds suppliers to account and lands it on time."],
];

const promises = [
  ["A fixed price before any build", "Scope, timeline and cost in writing before you commit to anything beyond the first assessment."],
  ["Your tools, not ours", "We build in what your team already has and can keep running. No platform to buy from us."],
  ["Numbers that tie to your accounts", "Every figure we report reconciles to your ledger. One number, not two."],
  ["You own everything", "Models, dashboards, documents and logins stay in your name when we leave."],
  ["Everything in writing", "Findings, plans and a short weekly note you can forward to the board unedited."],
  ["Honest about scope", "If a project shouldn't happen, we'll say so, including when that means less work for us."],
];

const sectors = ["Financial services", "Recruitment & staffing", "Retail & e-commerce", "Healthcare & care", "Professional services", "Property & construction", "Logistics & distribution", "Training & education"];

const gap = [
  { k: "On one side", t: "Spreadsheets and one capable person", b: "It works until the business outgrows it. Month-end stretches, numbers stop agreeing, and everything depends on whoever built the workbook.", src: "/img/paper-stack.jpg", pos: "center 40%" },
  { k: "Where ABI sits", t: "Enterprise-grade work, sized for you", b: "A small first engagement at a fixed price, built on the tools you already have, with a team assembled for your problem. You pay for the work, not the overheads.", src: "/img/svc/decision-dashboards.jpg", pos: "center 30%" },
  { k: "On the other", t: "Big consultancies", b: "Priced and staffed for enterprise programmes. Long discovery phases, large teams and a platform to license, for a problem that needed six weeks.", src: "/img/conference.jpg", pos: "center 40%" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero: photograph with charcoal on the left for the copy, like the home page */}
      <section className="relative overflow-hidden bg-[#0e0c09]">
        <Photo src="/img/svc/process-requirements.jpg" pos="65% center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0e0c09_0%,rgba(14,12,9,.94)_36%,rgba(14,12,9,.55)_62%,rgba(14,12,9,.15)_100%)]" aria-hidden="true" />
        <div className="wrap relative pb-20 pt-24 md:pb-28 md:pt-32">
          <p className="marker !text-[#ffc93c]">About</p>
          <h1 className="mt-5 max-w-3xl text-[2.4rem] leading-[1.08] text-white md:text-[3.8rem]">
            Built for businesses too big for spreadsheets, <span className="em !text-[#ffc93c]">too small for the big firms.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/75">
            Aston Business Intelligence gives owner-managed UK companies the data, analysis and delivery capability that used to be reserved for enterprises, at a scale and price that makes sense for them.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/60">
            <span>London</span><span>UK SMEs</span><span>Fixed-price first engagements</span><span>Your tools, not ours</span>
          </div>
        </div>
      </section>

      {/* Why we exist: three photo cards, ABI in the middle */}
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <p className="marker">Why we exist</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-ink md:text-[2.6rem]">Most growing companies fall into <span className="em">the gap in the middle.</span></h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {gap.map((g) => (
              <div key={g.t} className="overflow-hidden rounded-xl border border-gold bg-accent-soft shadow-[0_30px_60px_-30px_rgba(233,179,36,.6)]">
                <div className="relative h-64">
                  <Photo src={g.src} pos={g.pos} natural />
                </div>
                <div className="p-7">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">{g.k}</p>
                  <h3 className="mt-3 font-display text-2xl text-ink">{g.t}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-body">{g.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhotoBand src="/img/london-city.jpg" position="center 35%" note="London · Croydon CR0">The City runs on numbers. <i>So should every company in it.</i></PhotoBand>

      {/* How a team is built: the senior lead at the centre, the specialist roles joined around them */}
      <section className="bg-paper-dim">
        <div className="wrap py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="marker justify-center">How a team is built for you</p>
            <h2 className="mt-4 text-3xl text-ink md:text-[2.6rem]">Senior-led. <span className="em">Specialist-delivered.</span></h2>
            <p className="mt-5 text-lg font-light leading-relaxed text-muted">
              Every engagement has one senior lead, accountable to you from the first call to handover. Around them, we assemble the specialists your project needs from our network of experienced consultants and strong early-career analysts.
            </p>
          </div>
          <div className="relative mx-auto mt-14 max-w-6xl">
            {/* connectors (desktop only) */}
            <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
              {[[296, 94, 336, 94], [296, 315, 336, 315], [664, 94, 704, 94], [664, 315, 704, 315], [500, 410, 500, 446]].map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e9b324" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            <div className="relative grid gap-4 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-center lg:gap-x-10 lg:gap-y-8">
              <div className="relative overflow-hidden rounded-2xl bg-[#17161f] text-white shadow-[0_30px_60px_-30px_rgba(23,22,31,.7)] lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <div className="relative h-56"><Photo src="/img/svc/managed-bi.jpg" pos="center 30%" /></div>
                <div className="p-7">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffc93c]">Always · one per engagement</p>
                  <h3 className="mt-2 font-display text-3xl">Senior lead</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-white/75">Scopes the work, owns the plan and the price, reviews everything before you see it, and is the person you call. Named in your proposal and with you throughout.</p>
                </div>
              </div>
              {roles.map(([t, b], i) => (
                <div key={t} className={`overflow-hidden rounded-xl bg-paper shadow-[0_24px_50px_-30px_rgba(23,22,31,.35)] ${["lg:col-start-1 lg:row-start-1", "lg:col-start-3 lg:row-start-1", "lg:col-start-1 lg:row-start-2", "lg:col-start-3 lg:row-start-2", "lg:col-start-2 lg:row-start-3"][i]}`}>
                  <div className="h-1 bg-gradient-to-r from-gold via-[#ffd664] to-gold" aria-hidden="true" />
                  <div className="p-6">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">Specialist · {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-[1.6rem] leading-tight text-ink">{t}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-muted">{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promises: written as a signed commitments page on the dark band */}
      <section className="relative overflow-hidden bg-[#17161f] text-white">
        <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#ffc93c]/10 blur-3xl" aria-hidden="true" />
        <div className="wrap relative grid gap-12 py-16 md:py-24 lg:grid-cols-[0.9fr_1.3fr] lg:items-center">
          <div>
            <p className="marker !text-[#ffc93c]">What you can hold us to</p>
            <h2 className="mt-4 text-3xl text-white md:text-[2.8rem]">Six promises, <span className="em !text-[#ffc93c]">in writing on every engagement.</span></h2>
            <p className="mt-5 max-w-md font-light leading-relaxed text-white/65">They go into every proposal we send, so you can point to them at any point in the project.</p>
            <div className="mt-10 grid gap-8">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffc93c]">Across the team</p>
                <p className="mt-2 text-white">NVIDIA certified · Google Cloud certified</p>
              </div>
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffc93c]">Sectors we work in</p>
                <ul className="mt-3 flex flex-wrap gap-2">{sectors.map((s) => <li key={s} className="rounded-full border border-white/15 px-3 py-1 text-sm font-light text-white/80">{s}</li>)}</ul>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[640px] rotate-[0.6deg] rounded-sm bg-[#fbf8f1] px-8 py-10 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] md:px-12 md:py-12">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="font-display text-sm tracking-[0.22em]">ASTON</span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">Our commitments · in every proposal</span>
            </div>
            <ol className="mt-6 grid gap-5">
              {promises.map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[34px_1fr] gap-2">
                  <span className="font-display text-xl text-accent">{i + 1}.</span>
                  <p><b className="font-display text-lg font-normal text-ink">{t}.</b> <span className="text-sm font-light text-muted">{b}</span></p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex items-end justify-between border-t border-line pt-5">
              <div>
                <p className="font-display text-3xl italic text-ink/80">ABI</p>
                <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">Signed, for every engagement</p>
              </div>
              <span className="grid h-20 w-20 -rotate-12 place-items-center rounded-full border-2 border-accent/60 text-center font-mono text-[0.5rem] uppercase leading-tight tracking-[0.1em] text-accent">In<br />writing<br />every time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Careers: photo card */}
      <section className="bg-paper pb-8">
        <div className="wrap">
          <Link href="/careers" className="group relative block overflow-hidden rounded-xl">
            <div className="relative h-64 md:h-72"><Photo src="/img/svc/reporting-assessment.jpg" pos="center 30%" /></div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,12,9,.92)_0%,rgba(14,12,9,.7)_45%,rgba(14,12,9,.15)_100%)]" aria-hidden="true" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end gap-4 p-7 text-white md:flex-row md:items-end md:justify-between md:p-10">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffc93c]">Careers</p>
                <p className="mt-2 font-display text-3xl">We&apos;re always growing the team.</p>
                <p className="mt-1 max-w-lg font-light text-white/75">If you&apos;re good with data, analysis or delivery, we&apos;d like to hear from you.</p>
              </div>
              <span className="inline-flex min-h-11 items-center self-start rounded-md bg-gold px-5 text-sm font-semibold text-[#17161f] transition group-hover:bg-gold-strong md:self-auto">Careers at ABI →</span>
            </div>
          </Link>
        </div>
      </section>

      <div className="pt-16"><CtaBand /></div>
    </>
  );
}

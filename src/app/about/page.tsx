import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CtaBand, PhotoBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Why Aston Business Intelligence exists, how a team is built for each engagement, and what you can hold us to.",
};

/* About is about the company, not individuals: no names, photos or headcounts. */

const roles = [
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
const tools = ["Power BI", "Tableau", "Looker Studio", "Excel", "SQL Server", "Snowflake", "BigQuery", "Azure", "Xero", "HubSpot"];

export default function AboutPage() {
  return (
    <>
      {/* Hero: light, matching Services */}
      <section className="bg-paper-dim">
        <div className="wrap pb-16 pt-20 md:pb-20 md:pt-24">
          <p className="marker">About</p>
          <h1 className="mt-5 max-w-4xl text-[2.4rem] leading-[1.08] text-ink md:text-[3.8rem]">
            Built for businesses too big for spreadsheets, <span className="em">too small for the big firms.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted">
            Aston Business Intelligence gives owner-managed UK companies the data, analysis and delivery capability that used to be reserved for enterprises, at a scale and price that makes sense for them.
          </p>
        </div>
      </section>

      {/* Why we exist: the gap */}
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <p className="marker">Why we exist</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-ink md:text-[2.6rem]">Most growing companies fall into <span className="em">the gap in the middle.</span></h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg border border-line p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">On one side</p>
              <h3 className="mt-3 font-display text-2xl text-ink">Spreadsheets and one capable person</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted">It works until the business outgrows it. Month-end stretches, numbers stop agreeing, and everything depends on whoever built the workbook.</p>
            </div>
            <div className="rounded-lg border border-gold bg-accent-soft p-7 lg:-my-3 lg:py-10">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Where ABI sits</p>
              <h3 className="mt-3 font-display text-2xl text-ink">Enterprise-grade work, sized for you</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-body">A small first engagement at a fixed price, built on the tools you already have, with a team assembled for your problem. You pay for the work, not for the overheads.</p>
            </div>
            <div className="rounded-lg border border-line p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">On the other</p>
              <h3 className="mt-3 font-display text-2xl text-ink">Big consultancies</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted">Priced and staffed for enterprise programmes. Long discovery phases, large teams and a platform to license, for a problem that needed six weeks.</p>
            </div>
          </div>
        </div>
      </section>

      <PhotoBand src="/img/london-city.jpg" position="center 35%" note="London · Croydon CR0">The City runs on numbers. <i>So should every company in it.</i></PhotoBand>

      {/* How a team is built: roles, not names */}
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="marker">How a team is built for you</p>
              <h2 className="mt-4 text-3xl text-ink md:text-[2.6rem]">Senior-led. <span className="em">Specialist-delivered.</span></h2>
              <p className="mt-5 text-lg font-light leading-relaxed text-muted">
                Every engagement has one senior lead, accountable to you from the first call to handover. Around them, we assemble the specialists your project needs from our network of experienced consultants and strong early-career analysts.
              </p>
              <p className="mt-4 font-light leading-relaxed text-muted">
                Your lead is named in your proposal and stays with you throughout. You get the right skills for the problem, one point of accountability, and a cost base that isn&apos;t paying for a glass-fronted office.
              </p>
            </div>
            <div>
              <div className="rounded-lg bg-[#17161f] p-7 text-white">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffc93c]">Always</p>
                <h3 className="mt-2 font-display text-2xl">Senior lead</h3>
                <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-white/75">Scopes the work, owns the plan and the price, reviews everything before you see it, and is the person you call.</p>
              </div>
              <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">Plus, as your project needs</p>
              <ul className="mt-3 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                {roles.map(([t, b], i) => (
                  <li key={t} className={`bg-paper p-6 ${i === roles.length - 1 ? "sm:col-span-2" : ""}`}>
                    <h3 className="text-lg font-medium text-ink">{t}</h3>
                    <p className="mt-1.5 text-sm font-light leading-relaxed text-muted">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What you can hold us to + credentials */}
      <section className="bg-paper-dim">
        <div className="wrap py-16 md:py-24">
          <p className="marker">What you can hold us to</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-ink md:text-[2.6rem]">Six promises, <span className="em">in writing on every engagement.</span></h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {promises.map(([t, b], i) => (
              <li key={t} className="bg-paper p-7">
                <span className="font-display text-3xl font-light text-accent">{i + 1}</span>
                <h3 className="mt-2 text-lg font-medium text-ink">{t}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted">{b}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Across the team</p>
              <ul className="mt-3 grid gap-1.5 text-ink">
                <li>NVIDIA certified</li>
                <li>Google Cloud certified</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Sectors we work in</p>
              <p className="mt-3 text-sm font-light leading-relaxed text-body">{sectors.join(" · ")}</p>
            </div>
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Tools we build in</p>
              <p className="mt-3 text-sm font-light leading-relaxed text-body">{tools.join(" · ")} and more</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company details + data handling */}
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="min-w-0">
              <p className="marker">Who you&apos;re dealing with</p>
              <h2 className="mt-4 text-3xl text-ink">A UK registered company.</h2>
              <dl className="mt-8 grid gap-4 text-sm">
                {([
                  ["Legal name", `${site.name} Ltd`, ""],
                  ["Company number", site.companyNumber, "font-mono"],
                  ["Registered in", "England & Wales", ""],
                  ["Registered office", site.registeredOffice, ""],
                  ["Email", site.emails.hello, ""],
                ] as const).map(([k, v, cls], i, all) => (
                  <div key={k} className={`grid grid-cols-[110px_minmax(0,1fr)] gap-4 sm:grid-cols-[140px_minmax(0,1fr)] ${i < all.length - 1 ? "border-b border-line pb-4" : ""}`}>
                    <dt className="text-muted">{k}</dt>
                    <dd className={`break-words font-medium text-ink ${cls}`}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-lg border border-line bg-paper-dim p-7 md:p-9">
              <p className="marker">How we handle your data</p>
              <ul className="mt-6 grid gap-5">
                {[
                  ["Read-only access", "We look; we don't change. Access is set up by your team and removed at handover."],
                  ["NDA on request", "We'll sign one before the first conversation if you prefer."],
                  ["UK GDPR", "Personal data is handled under UK GDPR, processed in the UK, and only where the plan says it's needed."],
                  ["Nothing leaves without a reason", "No data leaves your systems unless it's written into the plan you've agreed."],
                ].map(([t, b]) => (
                  <li key={t} className="grid grid-cols-[20px_1fr] gap-3">
                    <span className="mt-1 text-accent" aria-hidden="true">✓</span>
                    <p><b className="font-medium text-ink">{t}.</b> <span className="font-light text-muted">{b}</span></p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Careers bridge */}
      <section className="bg-paper-dim">
        <div className="wrap flex flex-col gap-4 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl text-ink">We&apos;re always growing the team.</p>
            <p className="mt-1 font-light text-muted">If you&apos;re good with data, analysis or delivery, we&apos;d like to hear from you.</p>
          </div>
          <Link href="/careers" className="inline-flex min-h-11 items-center self-start rounded-md border border-ink px-5 text-sm font-semibold text-ink hover:bg-ink hover:text-paper md:self-auto">Careers at ABI →</Link>
        </div>
      </section>

      <div className="pt-16"><CtaBand /></div>
    </>
  );
}

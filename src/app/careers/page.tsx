import type { Metadata } from "next";
import { CareersForm } from "./careers-form";

export const metadata: Metadata = {
  alternates: { canonical: "/careers/" },
  title: "Careers",
  description: "Join the Aston Business Intelligence talent pool — analysts, engineers, AI specialists and project leads, experienced or early-career.",
};

const roles = [
  ["Data analysts & BI developers", "You care whether the number is right."],
  ["Data engineers", "You build things that still work in six months."],
  ["Business analysts", "You turn vague into specific."],
  ["AI practitioners", "You know what not to automate."],
  ["Project leads", "You own the finish line."],
];



const steps = [
  ["Send your details", "Two minutes: name, email, your area, and a CV or LinkedIn if you have one."],
  ["We read every one", "A person reads each submission and notes what you're strongest at."],
  ["We call when it fits", "When a project needs your skills, we get in touch with the brief before anything is agreed."],
  ["Contracted per project", "Clear scope and rate for each engagement. Early-career people are paired with a senior lead."],
];

export default function CareersPage() {
  return (
    <>
      {/* Hero: photograph with charcoal on the left, like About */}
      <section className="relative overflow-hidden bg-[#0e0c09]">
        {/* photo fills the right side on desktop, the whole hero on phones */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
          <div className="duotone natural cover inset-0">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/careers-walk-three.jpg" alt="" style={{ objectPosition: "50% 35%" }} /></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0e0c09_0%,#0e0c09_38%,rgba(14,12,9,.6)_52%,rgba(14,12,9,.05)_75%)] max-lg:bg-[linear-gradient(90deg,rgba(14,12,9,.95),rgba(14,12,9,.7))]" aria-hidden="true" />
        <div className="wrap relative pb-20 pt-24 md:pb-28 md:pt-32">
          <p className="marker !text-[#ffc93c]">Careers</p>
          <h1 className="mt-5 max-w-3xl text-[2.4rem] leading-[1.08] text-white md:text-[3.8rem]">
            We&apos;re always looking for <span className="em !text-[#ffc93c]">good people.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/75">
            ABI works on a project basis, so we don&apos;t advertise fixed roles. We keep a pool of specialists, experienced consultants and sharp early-career analysts, and build teams from it as engagements come in.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#apply" className="inline-flex min-h-12 items-center rounded-md bg-gold px-6 font-semibold text-[#17161f] hover:bg-gold-strong">Join the talent pool</a>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/60">Project-based · London &amp; remote</span>
          </div>
        </div>
      </section>

      {/* Who we look for: an editorial list, each row linking to the form */}
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="marker">Who we look for</p>
              <h2 className="mt-4 max-w-3xl text-3xl text-ink md:text-[2.6rem]">Specialists who can <span className="em">explain their work.</span></h2>
            </div>
            <p className="max-w-xs text-sm font-light text-muted">Experienced or early in your career. Can&apos;t see your field? <a href="#apply" className="font-medium text-ink underline decoration-accent underline-offset-4">Apply anyway.</a></p>
          </div>
          <ol className="mt-12 border-t border-ink">
            {roles.map(([t, line], i) => (
              <li key={t} className="group grid grid-cols-[40px_1fr] gap-x-4 gap-y-3 border-b border-line py-7 transition hover:bg-accent-soft/40 md:grid-cols-[56px_1fr_auto] md:items-center md:gap-8 md:px-2">
                <span className="pt-2 font-mono text-xs text-accent md:pt-0">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-ink md:text-[1.75rem]">{t}</h3>
                  <p className="mt-1 text-sm font-light text-muted">{line}</p>
                </div>
                <a href="#apply" className="col-start-2 text-sm font-medium text-ink underline decoration-accent underline-offset-4 opacity-70 transition group-hover:opacity-100 md:col-start-auto">Apply →</a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Photo band */}
      <section className="relative h-[340px] overflow-hidden bg-[#17161f] md:h-[440px]" aria-label="Photograph">
        <div className="duotone natural cover inset-0">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/careers-walk-pair.jpg" alt="" style={{ objectPosition: "60% 45%" }} /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/85 via-[#0e0c09]/20 to-transparent" aria-hidden="true" />
        <div className="wrap relative flex h-full items-end justify-between gap-6 pb-9">
          <p className="max-w-[30ch] font-display text-2xl font-light leading-tight text-white md:text-3xl">Specialists, built into teams <i className="text-[#ffc93c]">as the work comes in.</i></p>
          <p className="hidden shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70 md:block">Project-based · London &amp; remote</p>
        </div>
      </section>

      {/* What happens next: four steps */}
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <p className="marker">What happens next</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-ink md:text-[2.6rem]">From your details <span className="em">to your first project.</span></h2>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            <span className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-gold via-gold/60 to-gold/10 md:block" aria-hidden="true" />
            {steps.map(([t, b], i) => (
              <li key={t} className="relative">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-[#17161f] font-display text-xl text-[#ffc93c] ring-8 ring-paper">{i + 1}</span>
                <h3 className="mt-5 text-lg font-medium text-ink">{t}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Apply: dark panel + form */}
      <section id="apply" className="scroll-mt-24 bg-paper-dim">
        <div className="wrap py-16 md:py-24">
          <div className="grid overflow-hidden rounded-2xl bg-paper shadow-[0_40px_80px_-40px_rgba(23,22,31,.45)] lg:grid-cols-[0.9fr_1.4fr]">
            <div className="relative overflow-hidden bg-[#17161f] text-white">
              <div className="relative h-56 md:h-64">
                <div className="duotone natural cover inset-0">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/careers-laptop.jpg" alt="" style={{ objectPosition: "60% 30%" }} /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#17161f] to-transparent" aria-hidden="true" />
              </div>
              <div className="relative -mt-10 p-8 pt-0 md:p-10 md:pt-0">
              <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#ffc93c]/12 blur-3xl" aria-hidden="true" />
              <p className="marker !text-[#ffc93c]">Join the talent pool</p>
              <h2 className="mt-4 text-3xl text-white">Two minutes. <span className="em !text-[#ffc93c]">Every one is read.</span></h2>
              <ul className="relative mt-8 grid gap-5">
                {[
                  ["Remote-first", "Most work is remote, with occasional client visits in the UK."],
                  ["Per-project contracts", "With the option of longer arrangements for people we work well with."],
                  ["Paired with a senior lead", "If you're early in your career, you won't be left on your own."],
                  ["12 months, then deleted", "We keep your details for a year and only use them to contact you about work with ABI."],
                ].map(([t, b]) => (
                  <li key={t} className="grid grid-cols-[22px_1fr] gap-3">
                    <span className="mt-0.5 text-[#ffc93c]" aria-hidden="true">✓</span>
                    <p><b className="font-medium text-white">{t}.</b> <span className="font-light text-white/65">{b}</span></p>
                  </li>
                ))}
              </ul>
              </div>
            </div>
            <div className="p-8 md:p-10"><CareersForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Aston Business Intelligence. We reply to every enquiry within one working day.",
};


const next = [
  ["We reply within one working day", "A real person reads your message and replies by email, Monday to Friday."],
  ["A 30-minute call", "At a time that suits you. No preparation needed; we'll ask the questions."],
  ["A written next step", "A short note of what we'd do, how long it would take and what it would cost."],
  ["No obligation", "If we're not the right fit, we'll say so, and point you somewhere better if we can."],
];

function Photo() {
  return (
    <div className="duotone natural cover inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/contact-meeting.jpg" alt="" style={{ objectPosition: "60% 35%" }} />
    </div>
  );
}

function NextPanel() {
  return (
    <div className="relative overflow-hidden bg-[#17161f] p-8 text-white md:p-10">
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#ffc93c]/12 blur-3xl" aria-hidden="true" />
      <p className="marker !text-[#ffc93c]">What happens next</p>
      <ol className="relative mt-7 grid gap-6">
        {next.map(([t, b], i) => (
          <li key={t} className="grid grid-cols-[36px_1fr] gap-4">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#ffc93c]/50 font-display text-lg text-[#ffc93c]">{i + 1}</span>
            <div>
              <p className="font-medium text-white">{t}</p>
              <p className="mt-1 text-sm font-light leading-relaxed text-white/65">{b}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="relative mt-9 border-t border-white/10 pt-6">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#ffc93c]">Prefer email?</p>
        <a href={`mailto:${site.emails.hello}`} className="mt-2 block break-words text-lg font-medium text-white hover:underline">{site.emails.hello}</a>
      </div>
    </div>
  );
}

function Strip() {
  return (
    <section className="bg-paper">
      <div className="wrap grid gap-4 py-12 md:grid-cols-2">
        <Link href="/scorecard" className="group flex items-center justify-between gap-6 rounded-xl border border-line p-6 transition hover:border-gold">
          <div>
            <p className="font-display text-xl text-ink">Not sure yet?</p>
            <p className="mt-1 text-sm font-light text-muted">Take the 2-minute reporting scorecard and see where you stand.</p>
          </div>
          <span className="text-accent transition group-hover:translate-x-1">→</span>
        </Link>
        <Link href="/careers" className="group flex items-center justify-between gap-6 rounded-xl border border-line p-6 transition hover:border-gold">
          <div>
            <p className="font-display text-xl text-ink">Looking for work?</p>
            <p className="mt-1 text-sm font-light text-muted">Join the talent pool on our careers page.</p>
          </div>
          <span className="text-accent transition group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}

export default function ContactPage() {
  /* A · photo hero, then the form beside a dark "what happens next" panel */
  return (
    <>
      <section className="relative overflow-hidden bg-[#0e0c09]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]"><Photo /></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0e0c09_0%,#0e0c09_38%,rgba(14,12,9,.6)_52%,rgba(14,12,9,.05)_75%)] max-lg:bg-[linear-gradient(90deg,rgba(14,12,9,.95),rgba(14,12,9,.7))]" aria-hidden="true" />
        <div className="wrap relative pb-20 pt-24 md:pb-28 md:pt-32">
          <p className="marker !text-[#ffc93c]">Contact</p>
          <h1 className="mt-5 max-w-2xl text-[2.4rem] leading-[1.08] text-white md:text-[3.8rem]">Tell us what&apos;s <span className="em !text-[#ffc93c]">slow, broken or unclear.</span></h1>
          <p className="mt-6 max-w-lg text-lg font-light leading-relaxed text-white/75">A 30-minute conversation is usually enough to tell whether we can help, and what it would involve.</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#book" className="inline-flex min-h-12 items-center rounded-md bg-gold px-6 font-semibold text-[#17161f] hover:bg-gold-strong">Request a call</a>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/60">Reply within one working day</span>
          </div>
        </div>
      </section>

      <section id="book" className="scroll-mt-24 bg-paper-dim">
        <div className="wrap py-16 md:py-24">
          <div className="grid overflow-hidden rounded-2xl bg-paper shadow-[0_40px_80px_-40px_rgba(23,22,31,.45)] lg:grid-cols-[1.4fr_0.9fr]">
            <div className="p-8 md:p-10">
              <p className="marker">Request a call</p>
              <h2 className="mt-3 mb-8 text-3xl text-ink">Tell us what you need <span className="em">and when suits you.</span></h2>
              <ContactForm />
            </div>
            <NextPanel />
          </div>
        </div>
      </section>
      <Strip />
    </>
  );
}

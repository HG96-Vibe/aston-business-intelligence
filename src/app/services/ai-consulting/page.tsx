import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead, CtaBand, Button } from "@/components/ui";
import { bookHref } from "@/components/offers";
import { Convergence } from "@/components/convergence";
import { TubeMap, type Meta } from "@/components/tube-map";
import { toolLogo } from "@/components/tool-strip";

export const metadata: Metadata = {
  alternates: { canonical: "/services/ai-consulting/" },
  title: "AI Consulting",
  description: "AI where it pays back, with a number attached. AI Readiness Assessment £2,500: use cases ranked by value, effort and risk, a data-protection review and a pilot proposal.",
};

/* AI Consulting deep-dive. Same structure as Data & BI and Business Analysis. */

const pains: [string, string][] = [
  ["Everyone says use AI; nobody says where", "The board, suppliers and staff are all pushing. Nobody has looked at the actual processes."],
  ["Staff are already using it, unofficially", "Customer and company data pasted into free tools, with no policy and no record of what went where."],
  ["The pilot never left the demo", "It looked good in the presentation. Nobody measured whether it saved a single hour."],
];

const ladder = [
  { step: "01", name: "AI Readiness Assessment", price: "£2,500", duration: "2 weeks", body: "You receive: a process walk-through, use cases ranked by value, effort and risk, a data-protection and vendor review of the top three, and a pilot proposal with a price.", forWho: "Where every client starts." },
  { step: "02", name: "Pilot on One Problem", price: "priced in the plan", duration: "4–6 weeks", body: "You receive: the best use case built on one real process, success criteria agreed up front, and a results report measured against them.", forWho: "For “show me it actually works”." },
  { step: "03", name: "Roll-out", price: "priced in the plan", duration: "per process", body: "You receive: the pilot extended to the wider team, connected to your systems, with training and documentation for everyone who uses it.", forWho: "For “it worked, now scale it”." },
  { step: "04", name: "Governance & Support", price: "priced in the plan", duration: "ongoing", body: "You receive: an AI usage policy, staff guidance, a register of what runs where, and a regular review of cost and accuracy.", forWho: "After go-live." },
];

const meta: Meta[] = [
  { above: "Interchange · all journeys start here", fare: "£2,500", under: "2 weeks · fixed", alight: "Alight here with a ranked shortlist" },
  { above: "4–6 weeks from previous", fare: "Priced in the plan", under: "Assessment fee credited", alight: "Alight here with a measured result" },
  { above: "Per process", fare: "Priced in the plan", under: "Fixed per process", alight: "Alight here with it in daily use" },
  { above: "Ongoing · optional", fare: "Priced in the plan", under: "Cancel monthly", alight: "" },
];

const uses: [string, string, string][] = [
  ["Documents in", "Invoices, orders and forms read and keyed automatically.", "Replaces re-typing from PDFs and emails."],
  ["Inbox triage", "Customer emails sorted, routed and drafted for a person to send.", "Replaces the first hour of every day."],
  ["Quotes and proposals", "First drafts built from your price list and past work.", "Replaces starting from a blank page."],
  ["Meeting notes to CRM", "Calls summarised, actions logged, the CRM updated.", "Replaces notes nobody types up."],
  ["Report commentary", "The month's numbers explained in plain English, for the board.", "Replaces the Sunday-night write-up."],
  ["Ask your own documents", "Policies, contracts and know-how searchable in plain questions.", "Replaces “ask Sarah, she'll know”."],
];
const aiTools = ["copilot", "openai", "claude", "gemini", "power-automate", "zapier", "azure", "python"];

const faqs: [string, [string, string], string][] = [
  ["Is our data safe?", ["Nothing goes in without a plan.", " Written down first."], "Every use case gets a data-protection review before anything is built: what data, which vendor, where it is processed and whether it is used for training. Under UK GDPR, with a DPIA where one is needed."],
  ["Do we need to buy new software?", ["Usually not.", " Start with what you have."], "Copilot in Microsoft 365 and Gemini in Google Workspace cover a lot. If something new is needed, we say so in writing with the price, and you can buy it from anyone."],
  ["Will it replace our staff?", ["No.", " It removes the dull part of the job."], "The use cases that pay back fastest take away re-typing, sorting and first drafts. People spend the time on judgement and customers instead."],
  ["Which AI do you use?", ["Whichever fits.", " We don't resell any of them."], "OpenAI, Claude, Copilot, Gemini or open models, chosen per use case on accuracy, cost and where the data goes. You hold the accounts."],
  ["What if the pilot doesn't work?", ["Then you'll know, for a fixed price.", ""], "Success criteria are agreed before the pilot starts and measured at the end. If it doesn't meet them, we stop and tell you why, rather than selling you more."],
];

export default function AiConsultingPage() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden bg-[#0e0c09]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
          <div className="duotone cover inset-0">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/tablet-pair.jpg" alt="" style={{ objectPosition: "60% 40%" }} /></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0e0c09_0%,#0e0c09_40%,rgba(14,12,9,.6)_54%,rgba(14,12,9,.05)_78%)] max-lg:bg-[linear-gradient(90deg,rgba(14,12,9,.95),rgba(14,12,9,.7))]" aria-hidden="true" />
        <div className="wrap relative pb-20 pt-24 md:pb-28 md:pt-32">
          <p className="marker !text-[#ffc93c]">Services · AI Consulting</p>
          <h1 className="mt-5 max-w-2xl text-[2.3rem] leading-[1.08] text-white md:text-[3.4rem]">
            AI where it pays back, <span className="em !text-[#ffc93c]">with a number attached.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/75">
            We find the one or two places AI saves real time or money in your business, build a pilot on one real process, and measure it, before you spend any more.
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
          cause={{ label: "The cause", title: "Nobody started from the processes and the numbers.", body: "So AI gets chosen for the technology, not the problem. Start from where time and money actually go, and the right use case, or a good reason to wait, becomes obvious.", cta: "How we fix it: the AI Readiness Assessment", href: "#ladder" }}
        />
      </Section>

      <Section dim id="ladder">
        <SectionHead number="02" eyebrow="How the work is structured" title="Four stops." em="Alight at any of them." intro="Every journey starts with the Readiness Assessment. Continue only if the pilot it proposes makes sense to you." />
        <TubeMap steps={ladder} meta={meta} note="Prices exclude VAT. Later stops are priced in the Assessment plan, before you commit. The Assessment fee is credited against any onward journey within twelve months." />
      </Section>

      {/* Photo band */}
      <section className="relative h-[340px] overflow-hidden bg-[#17161f] md:h-[440px]" aria-label="Photograph">
        <div className="duotone cover inset-0">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/svc/ai-readiness.jpg" alt="" style={{ objectPosition: "center 60%" }} /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/90 via-[#0e0c09]/25 to-transparent" aria-hidden="true" />
        <div className="wrap relative flex h-full items-end justify-between gap-6 pb-9">
          <p className="max-w-[32ch] font-display text-2xl font-light leading-tight text-white md:text-3xl">A pilot measured against a number, <i className="text-[#ffc93c]">not a demo.</i></p>
          <p className="hidden shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70 md:block">Pilot on one problem</p>
        </div>
      </section>

      {/* Where it usually pays */}
      <Section>
        <SectionHead number="03" eyebrow="Where it usually pays" title="Six places we look" em="first." intro="Every business is different, but the use cases that pay back fastest are usually the dull, repetitive ones. These are where the Assessment starts looking." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uses.map(([t, b, r], i) => (
            <li key={t} className="flex flex-col overflow-hidden rounded-xl bg-paper shadow-[0_24px_50px_-30px_rgba(23,22,31,.35)]">
              <div className="h-1 bg-gradient-to-r from-gold via-[#ffd664] to-gold" aria-hidden="true" />
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">Use case · {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-[1.5rem] leading-tight text-ink">{t}</h3>
                <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-muted">{b}</p>
                <p className="mt-4 border-t border-line pt-3 text-sm italic text-accent">{r}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">Works with</p>
          {aiTools.map((t) => {
            const l = toolLogo(t, 0.62);
            // eslint-disable-next-line @next/next/no-img-element
            return <img key={t} src={`/brand/tools/${t}.png`} alt={l.name} title={l.name} width={l.w} height={l.h} style={{ height: l.h, width: l.w }} loading="lazy" />;
          })}
        </div>
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
        <p className="pt-6 text-sm text-muted">See also: <Link href="/services/data-bi" className="underline hover:text-ink">Data &amp; BI</Link> · <Link href="/services/business-analysis" className="underline hover:text-ink">Business Analysis</Link></p>
      </Section>

      <section className="bg-paper">
        <div className="wrap py-14">
          <div className="grid gap-6 rounded-2xl border border-gold bg-accent-soft p-8 shadow-[0_30px_60px_-30px_rgba(233,179,36,.6)] md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Start here</p>
              <p className="mt-2 font-display text-3xl text-ink">AI Readiness Assessment</p>
              <p className="mt-1 text-muted">2 weeks · <span className="font-medium text-ink">£2,500</span> ex VAT · credited against any next step</p>
              <p className="mt-3 max-w-xl font-light leading-relaxed text-body">One AI project worth doing, with a number attached, or a clear reason to wait.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end"><Button href={bookHref()}>Book a conversation</Button></div>
          </div>
        </div>
      </section>

      <div className="pt-16"><CtaBand /></div>
    </>
  );
}

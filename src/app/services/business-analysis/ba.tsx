import Link from "next/link";
import type { ReactNode } from "react";
import { Section, SectionHead, CtaBand, Button } from "@/components/ui";
import { bookHref } from "@/components/offers";
import { Convergence } from "@/components/convergence";
import { TubeMap, type Meta } from "@/components/tube-map";

/* Business Analysis deep-dive. Same structure as Data & BI: hero → problems/cause → ladder →
   photo band → what you get → FAQ → start here → CTA. */

const pains: [string, string][] = [
  ["Quotes keep doubling", "Suppliers price what they think you meant. The change requests start in week three."],
  ["Everyone describes the process differently", "Sales, operations and finance each have their own version, and the new system has to serve all three."],
  ["The last system never quite fitted", "It was chosen from a demo, not from a written list of what the business actually needs."],
];

const ladder = [
  { step: "01", name: "Discovery & Scoping", price: "from £4,500", duration: "2–4 weeks", body: "Stakeholder interviews, current-state process maps, prioritised requirements and a specification pack any vendor can price.", forWho: "Where every client starts." },
  { step: "02", name: "Options & Selection", price: "priced in the plan", duration: "2–3 weeks", body: "Build, buy, configure or do nothing, appraised side by side. Vendor demos run against your requirements, not their script.", forWho: "For “which system should we buy?”." },
  { step: "03", name: "Delivery Assurance", price: "priced in the plan", duration: "through the build", body: "We stay with the supplier during the build: clarifying requirements, reviewing what's delivered and running acceptance testing.", forWho: "For “we've signed, now keep it on track”." },
  { step: "04", name: "Change & Adoption", price: "priced in the plan", duration: "around go-live", body: "New process maps, training material and a short review after go-live, so the change sticks once the supplier has left.", forWho: "After go-live." },
];

const meta: Meta[] = [
  { above: "Interchange · all journeys start here", fare: "from £4,500", under: "2–4 weeks", alight: "Alight here with a spec pack" },
  { above: "2–3 weeks from previous", fare: "Priced in the plan", under: "Scoping fee credited", alight: "Alight here with a decision" },
  { above: "Through the build", fare: "Priced in the plan", under: "Day rate or fixed", alight: "Alight here with a tested system" },
  { above: "Around go-live · optional", fare: "Priced in the plan", under: "Fixed", alight: "" },
];

const faqs: [string, [string, string], string][] = [
  ["We already have a supplier. Do we still need this?", ["Usually, yes.", " The supplier's job is to build."], "A supplier writes requirements around what they sell. We write them around what your business needs, so their quote is for the right thing and the change requests don't start in week three."],
  ["How long does Discovery take?", ["Two to four weeks.", " Most of it is listening."], "It depends on how many teams and systems are involved. You get a fixed price and timeline before we start."],
  ["Will you recommend a particular system?", ["Only if it fits.", " We don't resell software."], "We appraise build, buy, configure and do nothing side by side, with costs, and you choose. We can run vendor demos against your requirements so you compare like with like."],
  ["How much of our team's time will it take?", ["A few hours each.", " Spread over the weeks."], "Short interviews with the people who do the work, a workshop or two, and a read-through of the findings. We work around your diary."],
  ["What do we get at the end?", ["A specification pack.", " Yours to keep and use."], "Process maps, prioritised requirements with acceptance criteria, the options appraisal and a specification any vendor or internal team can price and build. Use it with us or anyone else."],
];

/* "What you get": four documents as paper cards with a small sample of each */
function Paper({ k, title, when, children }: { k: string; title: string; when: string; children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="relative h-56 overflow-hidden rounded-lg border border-line bg-white p-5 shadow-[0_24px_50px_-30px_rgba(23,22,31,.45)]">
        <span className="absolute right-4 top-4 rounded border border-accent/50 px-1.5 py-px font-mono text-[0.5rem] uppercase tracking-[0.14em] text-accent">Sample</span>
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">{k}</p>
        <div className="mt-4">{children}</div>
      </div>
      <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">{when}</p>
      <h3 className="mt-1 font-display text-2xl text-ink">{title}</h3>
    </div>
  );
}
const Box = ({ t, warn }: { t: string; warn?: boolean }) => <span className={`rounded border px-2 py-1 text-[0.62rem] ${warn ? "border-[#f0b98c] bg-[#fff6ee] text-[#9a4a12]" : "border-line bg-paper-dim text-ink"}`}>{t}</span>;

function Documents() {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <Paper k="01 · Process map" title="How the work really flows" when="Week 1–2">
        <div className="flex flex-wrap items-center gap-1.5">
          <Box t="Enquiry" /><span className="text-muted">→</span><Box t="Quote (Excel)" warn /><span className="text-muted">→</span><Box t="Approval" /><span className="text-muted">→</span><Box t="Re-keyed into ERP" warn /><span className="text-muted">→</span><Box t="Invoice" />
        </div>
        <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[#9a4a12]">⚠ 2 hand-offs · 1 re-key</p>
      </Paper>
      <Paper k="02 · Requirements" title="What the business needs" when="Week 2–3">
        <ul className="grid gap-1.5 text-[0.62rem]">
          {[["Must", "Quote generated from the price list"], ["Must", "Approval over £10k routed to FD"], ["Should", "Customer sees order status"], ["Could", "Mobile sign-off"]].map(([p, t]) => (
            <li key={t} className="flex items-center gap-2 border-b border-line pb-1.5"><span className={`w-11 shrink-0 rounded px-1 text-center font-mono text-[0.5rem] uppercase ${p === "Must" ? "bg-gold text-[#17161f]" : "bg-paper-dim text-muted"}`}>{p}</span><span className="text-ink">{t}</span></li>
          ))}
        </ul>
      </Paper>
      <Paper k="03 · Options appraisal" title="Build, buy, configure or wait" when="Week 3">
        <div className="grid grid-cols-4 gap-1.5 text-center text-[0.58rem]">
          {[["Build", 52], ["Buy", 78], ["Config", 91], ["Wait", 30]].map(([t, v]) => (
            <div key={t as string}>
              <div className="flex h-24 items-end rounded bg-paper-dim p-1"><div className={`w-full rounded-sm ${v === 91 ? "bg-gold" : "bg-ink/20"}`} style={{ height: `${v}%` }} /></div>
              <p className="mt-1 text-ink">{t}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-accent">Recommended · configure</p>
      </Paper>
      <Paper k="04 · Specification pack" title="Something any vendor can price" when="End of Discovery">
        <div className="grid gap-1.5">{[95, 80, 88, 60, 92, 70, 84].map((w, i) => <span key={i} className="h-1.5 rounded bg-line" style={{ width: `${w}%` }} />)}</div>
        <p className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted"><span>v1.0 · 34 pages</span><span className="text-accent">Signed off</span></p>
      </Paper>
    </div>
  );
}

export function BaPage({ photo = ["/img/corridor.jpg", "60% 30%"] as [string, string] }: { photo?: [string, string] }) {
  return (
    <>
      {/* Hero: dark, gold-toned photo on the right, matching Data & BI */}
      <section id="hero" className="relative overflow-hidden bg-[#0e0c09]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
          <div className="duotone cover inset-0">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={photo[0]} alt="" style={{ objectPosition: photo[1] }} /></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0e0c09_0%,#0e0c09_40%,rgba(14,12,9,.6)_54%,rgba(14,12,9,.05)_78%)] max-lg:bg-[linear-gradient(90deg,rgba(14,12,9,.95),rgba(14,12,9,.7))]" aria-hidden="true" />
        <div className="wrap relative pb-20 pt-24 md:pb-28 md:pt-32">
          <p className="marker !text-[#ffc93c]">Services · Business Analysis</p>
          <h1 className="mt-5 max-w-2xl text-[2.3rem] leading-[1.08] text-white md:text-[3.4rem]">
            Projects scoped before money is spent, <span className="em !text-[#ffc93c]">not after.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/75">
            You know something needs to change — a process, a system, a product. We turn it into a plan a supplier can price and build: how the work really flows, what the business needs, and the options side by side.
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
          cause={{ label: "The cause", title: "Nobody wrote down what the business actually needs.", body: "So suppliers guess, scope drifts and the budget follows. Write it down properly once, and every quote, build and decision after it gets easier.", cta: "How we fix it: Discovery & Scoping", href: "#ladder" }}
        />
      </Section>

      <Section dim id="ladder">
        <SectionHead number="02" eyebrow="How the work is structured" title="Four stops." em="Alight at any of them." intro="Every journey starts with Discovery. Continue only if the plan it produces makes sense to you." />
        <TubeMap steps={ladder} meta={meta} note="Prices exclude VAT. Later stops are priced in the Discovery plan, before you commit. The Discovery fee is credited against any onward journey within twelve months." />
      </Section>

      {/* One photo band, normal height, caption on the photo */}
      <section className="relative h-[340px] overflow-hidden bg-[#17161f] md:h-[440px]" aria-label="Photograph">
        <div className="duotone cover inset-0">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/svc/process-requirements.jpg" alt="" style={{ objectPosition: "center 45%" }} /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/90 via-[#0e0c09]/25 to-transparent" aria-hidden="true" />
        <div className="wrap relative flex h-full items-end justify-between gap-6 pb-9">
          <p className="max-w-[32ch] font-display text-2xl font-light leading-tight text-white md:text-3xl">Every team&apos;s version of the process, <i className="text-[#ffc93c]">on one page they all sign.</i></p>
          <p className="hidden shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70 md:block">During Discovery</p>
        </div>
      </section>

      <Section>
        <SectionHead number="03" eyebrow="What you get" title="Four documents," em="written to be used." intro="Everything is written so a vendor, an internal team or another consultant could pick it up and act on it. You keep all of it, whoever does the build." />
        <Documents />
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
        <p className="pt-6 text-sm text-muted">See also: <Link href="/services/data-bi" className="underline hover:text-ink">Data &amp; BI</Link> · <Link href="/services#project-delivery" className="underline hover:text-ink">Project Delivery</Link></p>
      </Section>

      <section className="bg-paper">
        <div className="wrap py-14">
          <div className="grid gap-6 rounded-2xl border border-gold bg-accent-soft p-8 shadow-[0_30px_60px_-30px_rgba(233,179,36,.6)] md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Start here</p>
              <p className="mt-2 font-display text-3xl text-ink">Discovery &amp; Scoping</p>
              <p className="mt-1 text-muted">2–4 weeks · <span className="font-medium text-ink">from £4,500</span> ex VAT</p>
              <p className="mt-3 max-w-xl font-light leading-relaxed text-body">A project scoped before money is spent, not after.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end"><Button href={bookHref()}>Book a conversation</Button></div>
          </div>
        </div>
      </section>

      <div className="pt-16"><CtaBand /></div>
    </>
  );
}

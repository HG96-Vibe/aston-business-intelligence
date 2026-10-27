import Link from "next/link";
import { Section, SectionHead, CtaBand, Button } from "@/components/ui";
import { bookHref } from "@/components/offers";
import { Convergence } from "@/components/convergence";
import { TubeMap, type Meta } from "@/components/tube-map";
import { Toolkit } from "./toolkit";

/* Business Analysis deep-dive. Same structure as Data & BI: hero → problems/cause → ladder →
   photo band → what you get (documents explorer) → FAQ → start here → CTA. */

const pains: [string, string][] = [
  ["Quotes keep doubling", "Suppliers price what they think you meant. The change requests start in week three."],
  ["Everyone describes the process differently", "Sales, operations and finance each have their own version, and the new system has to serve all three."],
  ["The last system never quite fitted", "It was chosen from a demo, not from a written list of what the business actually needs."],
];

const ladder = [
  { step: "01", name: "Discovery & Scoping", price: "from £4,500", duration: "2–4 weeks", body: "You receive: business case, stakeholder map, as-is and to-be process maps, requirements catalogue, user stories, gap analysis and a specification pack any vendor can price.", forWho: "Where every client starts." },
  { step: "02", name: "Options & Selection", price: "priced in the plan", duration: "2–3 weeks", body: "You receive: options appraisal, cost-benefit analysis and vendor scoring, with demos run against your requirements, not their script.", forWho: "For “which system should we buy?”." },
  { step: "03", name: "Delivery Assurance", price: "priced in the plan", duration: "through the build", body: "You receive: traceability matrix, UAT test scripts and a change request log, kept up to date with the supplier through the build.", forWho: "For “we've signed, now keep it on track”." },
  { step: "04", name: "Change & Adoption", price: "priced in the plan", duration: "around go-live", body: "You receive: end-of-project report, benefits review and lessons learned, so the change sticks after the supplier has left.", forWho: "After go-live." },
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
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <SectionHead number="03" eyebrow="What you get" title="Everything a business analyst produces," em="at the stage you need it." intro="Start from your question; we'll show you the document that answers it. Each one names the stop on the line it comes with." />
          <div className="grid gap-3 lg:justify-self-end">
            <p className="flex items-center gap-3 rounded-xl border border-gold bg-accent-soft px-5 py-4 text-sm text-ink"><span className="font-display text-2xl text-accent">✓</span><span><b className="font-medium">Yours to keep.</b> Every document is written so another supplier or your own team can pick it up and use it.</span></p>
            <p className="flex items-center gap-3 rounded-xl border border-line px-5 py-4 text-sm text-ink"><span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-accent">BCS</span><span>Our analysts work to BCS business analysis practice.</span></p>
          </div>
        </div>
        <Toolkit />
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
        <p className="pt-6 text-sm text-muted">See also: <Link href="/services/data-bi" className="underline hover:text-ink">Data &amp; BI</Link> · <Link href="/services/project-delivery" className="underline hover:text-ink">Project Delivery</Link></p>
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

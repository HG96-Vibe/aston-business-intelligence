import Link from "next/link";
import { services } from "@/lib/site";
import { Button, CtaBand, Section, SectionHead } from "@/components/ui";
import { HeroMotion } from "@/components/hero-motion";
import { Availability, Guarantee, PricingLadder, ProofStrip, WeekOne, bookHref } from "@/components/offers";
import { serviceOutcomes } from "@/lib/offers";

const principles = [
  ["Senior-led, specialist-delivered", "Every engagement is scoped and overseen by a senior consultant and delivered by a team matched to the problem — analysts, engineers, AI specialists or project leads as needed."],
  ["Fixed scope, fixed price", "Our first engagement with you is always a defined piece of work with a defined price. No open-ended day rates until you've seen how we work."],
  ["Built to be handed over", "We document everything and train your people. You should be able to run what we build without us."],
  ["Plain English", "No jargon in meetings, no jargon in reports. If we can't explain a recommendation simply, we haven't finished thinking about it."],
];

const sectors = [
  "Professional services", "Training & education", "Recruitment & staffing", "Retail & e-commerce",
  "Property & construction", "Healthcare & care providers", "Logistics & distribution", "Financial services",
];

const credentials = [
  { label: "NVIDIA", detail: "NVIDIA Certified" },
  { label: "Google Cloud", detail: "Google Cloud Certified" },
  { label: "Companies House", detail: "No. 15571977" },
  { label: "Based in", detail: "London, UK" },
];

export default function Home() {
  return (
    <>
      {/* Hero — light, serif, gold italic phrase */}
      <section className="relative overflow-hidden">
        <HeroMotion />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
          <p className="marker">Business intelligence consultancy in London</p>
          <h1 className="mt-6 max-w-4xl text-[2.6rem] leading-[1.08] text-ink md:text-[4.2rem]">
            Business intelligence for companies that want{" "}
            <span className="em">decisions, not just dashboards.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted md:text-xl">
            ABI helps UK SMEs see their business clearly, decide faster and deliver what they
            decide — through data analysis, business analysis, AI consulting and project delivery.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={bookHref()}>Book a 30-minute conversation →</Button>
            <Button href="/health-check" variant="ghost">Take the 2-minute health check</Button>
          </div>
          <div className="mt-6"><Availability /></div>
        </div>

        {/* Credentials strip */}
        <div className="hairline relative bg-paper">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-4 px-4 py-6 md:grid-cols-4 md:px-6">
            {credentials.map((c) => (
              <div key={c.label} className="min-w-0">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{c.label}</p>
                <p className="mt-1 text-sm font-medium text-ink">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section dim>
        <SectionHead
          number="01"
          eyebrow="What we do"
          title="Four services. One goal:"
          em="a business that runs on evidence."
          intro="Most companies don't have a data problem. They have a decision problem — the information exists, but it isn't in front of the right people in a form they can act on."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/services#${s.slug}`} className="group bg-paper p-7 transition hover:bg-paper-dim">
              <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-xl text-ink">{s.title}</h3>
              <p className="mt-2 font-light text-muted">{s.short}</p>
              <ul className="mt-4 grid gap-1 text-sm text-body">
                {serviceOutcomes[s.slug].map((o) => (
                  <li key={o} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{o}</li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-accent group-hover:underline">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <PricingLadder compact number="02" />

      <WeekOne number="03" />

      <Section dim>
        <SectionHead number="04" eyebrow="How we work" title="Scoped before it starts." em="Handed over when it's done." />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
          {[
            ["Discover", "A short, fixed-fee piece of work to understand your business, your data and the decisions that matter. You get a written assessment and a costed plan — whether or not you continue with us."],
            ["Build", "Delivered in two-week increments you can see and test. Weekly written updates. No surprises at invoice time."],
            ["Hand over", "Documentation, training and a support window. Your team owns the result."],
          ].map(([title, body], i) => (
            <li key={title} className="bg-paper p-7">
              <span className="font-mono text-xs text-accent">Step {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl text-ink">{title}</h3>
              <p className="mt-3 font-light leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Guarantee />

      <Section>
        <SectionHead number="05" eyebrow="Why ABI" title="What you can" em="hold us to." />
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {principles.map(([title, body]) => (
            <div key={title} className="hairline pt-5">
              <h3 className="text-lg text-ink">{title}</h3>
              <p className="mt-2 font-light leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <ProofStrip />

      <Section dim>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
          <SectionHead
            number="06"
            eyebrow="Who we work with"
            title="Owner-managed and"
            em="growing UK businesses."
            intro="Typically £1m–£30m turnover: large enough that spreadsheets have stopped working, small enough that a big consultancy doesn't make sense."
          />
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line text-sm md:mt-12">
            {sectors.map((s) => (
              <li key={s} className="bg-paper px-4 py-3 text-body">{s}</li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

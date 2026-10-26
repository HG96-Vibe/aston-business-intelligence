import Link from "next/link";
import { services, site } from "@/lib/site";
import { Button, CtaBand, Section, SectionHead } from "@/components/ui";

const principles = [
  {
    title: "Senior-led, specialist-delivered",
    body: "Every engagement is scoped and overseen by a senior consultant and delivered by a team matched to the problem — analysts, engineers, AI specialists or project leads as needed.",
  },
  {
    title: "Fixed scope, fixed price",
    body: "Our first engagement with you is always a defined piece of work with a defined price. No open-ended day rates until you've seen how we work.",
  },
  {
    title: "Built to be handed over",
    body: "We document everything and train your people. You should be able to run what we build without us.",
  },
  {
    title: "Plain English",
    body: "No jargon in meetings, no jargon in reports. If we can't explain a recommendation simply, we haven't finished thinking about it.",
  },
];

const sectors = [
  "Professional services",
  "Training & education",
  "Recruitment & staffing",
  "Retail & e-commerce",
  "Property & construction",
  "Healthcare & care providers",
  "Logistics & distribution",
  "Financial services",
];

export default function Home() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 md:px-6 md:pb-28 md:pt-36">
          <p className="eyebrow eyebrow-light">Business intelligence consultancy · London, UK</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.1] md:text-6xl">
            Business intelligence for companies that want decisions, not just dashboards.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            Aston helps UK SMEs see their business clearly, decide faster and deliver what they
            decide — through data analysis, business analysis, AI consulting and project delivery.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact">Talk to us</Button>
            <Button href="/services" variant="light">What we do</Button>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="What we do"
          title="Four services. One goal: a business that runs on evidence."
          intro="Most companies don't have a data problem. They have a decision problem — the information exists, but it isn't in front of the right people in a form they can act on."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              className="group bg-paper p-7 transition hover:bg-paper-dim"
            >
              <h3 className="text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-muted">{s.short}</p>
              <p className="mt-5 text-sm font-semibold text-accent group-hover:underline">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section dim>
        <SectionHead
          eyebrow="How we work"
          title="Scoped before it starts. Handed over when it's done."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Discover", "A short, fixed-fee piece of work to understand your business, your data and the decisions that matter. You get a written assessment and a costed plan — whether or not you continue with us."],
            ["Build", "Delivered in two-week increments you can see and test. Weekly written updates. No surprises at invoice time."],
            ["Hand over", "Documentation, training and a support window. Your team owns the result."],
          ].map(([title, body], i) => (
            <li key={title} className="rounded-lg border border-line bg-paper p-7">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHead eyebrow="Why Aston" title="What you can expect from us" />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title}>
              <h3 className="text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section dim>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
          <SectionHead
            eyebrow="Who we work with"
            title="Owner-managed and growing UK businesses"
            intro="Typically £1m–£30m turnover: large enough that spreadsheets have stopped working, small enough that a big consultancy doesn't make sense."
          />
          <ul className="grid grid-cols-2 gap-3 text-sm md:pt-10">
            {sectors.map((s) => (
              <li key={s} className="rounded-md border border-line bg-paper px-4 py-3 text-body">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 rounded-lg border border-line p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow">A registered UK company</p>
            <p className="mt-3 text-lg text-body">
              {site.name} Ltd is registered in England &amp; Wales, company number{" "}
              <span className="font-mono">{site.companyNumber}</span>. You can verify us on Companies House.
            </p>
          </div>
          <a
            href={`https://find-and-update.company-information.service.gov.uk/company/${site.companyNumber}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink hover:bg-paper-dim"
          >
            View on Companies House ↗
          </a>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

import Link from "next/link";
import { services } from "@/lib/site";
import { Button, CtaBand, Section, SectionHead, PhotoBand } from "@/components/ui";
import { HeroMotion } from "@/components/hero-motion";
import { Availability, Guarantee, PricingLadder, ProofStrip, WeekOne, bookHref } from "@/components/offers";
import { serviceOutcomes } from "@/lib/offers";
import {Problems, Faq } from "@/components/home-blocks";
import { LiveDashboard, CostCalculator, SectorTabs } from "@/components/home-interactive";

const principles = [
  ["Senior-led, specialist-delivered", "Every engagement is scoped and overseen by a senior consultant and delivered by a team matched to the problem — analysts, engineers, AI specialists or project leads as needed."],
  ["Fixed scope, fixed price", "Our first engagement with you is always a defined piece of work with a defined price. No open-ended day rates until you've seen how we work."],
  ["Built to be handed over", "We document everything and train your people. You should be able to run what we build without us."],
  ["Plain English", "No jargon in meetings, no jargon in reports. If we can't explain a recommendation simply, we haven't finished thinking about it."],
];

const serviceImages: Record<string, { src: string; duotone: boolean; position: string }> = {
  "data-bi": { src: "/img/streaks.jpg", duotone: false, position: "center" },
  "business-analysis": { src: "/img/corridor.jpg", duotone: true, position: "center 30%" },
  "ai-consulting": { src: "/img/tablet-pair.jpg", duotone: true, position: "center 35%" },
  "project-delivery": { src: "/img/conference.jpg", duotone: true, position: "center 40%" },
};

const credentials = [
  { label: "NVIDIA", detail: "NVIDIA Certified" },
  { label: "Google Cloud", detail: "Google Cloud Certified" },
  { label: "Companies House", detail: "No. 15571977" },
  { label: "Based in", detail: "London, UK" },
];

export default function Home() {
  return (
    <>
      {/* Hero — charcoal over the gold dot-wave photograph; live dot grid and traced monogram on top */}
      <section className="relative overflow-hidden bg-[#0e0c09]">
        <div className="relative">
        {/* Photograph, slowly drifting; a second copy masked to a travelling light band makes the dots shimmer along the curve */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="hero-photo absolute inset-0 bg-cover bg-[position:75%_center] md:bg-center" style={{ backgroundImage: "url(/img/hero-helix.jpg)" }} />
        </div>
        {/* charcoal on the left for the copy, the gold left almost untouched on the right; the monogram traces at the seam */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0e0c09_0%,rgba(14,12,9,.96)_34%,rgba(14,12,9,.6)_52%,rgba(14,12,9,.12)_72%,rgba(14,12,9,0)_100%)]" aria-hidden="true" />
        <HeroMotion forceDark />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
          <p className="marker !text-[#ffc93c]">Business intelligence consultancy in London</p>
          <h1 className="mt-6 max-w-4xl text-[2.6rem] leading-[1.08] text-white md:text-[4.2rem]">
            Business intelligence for companies that want{" "}
            <span className="em !text-[#ffc93c]">decisions, not just dashboards.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-white/75 md:text-xl">
            ABI helps UK SMEs see their business clearly, decide faster and deliver what they
            decide — through data analysis, business analysis, AI consulting and project delivery.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={bookHref()}>Book a 30-minute conversation →</Button>
            <Button href="/scorecard" variant="light">Score your reporting in 2 minutes</Button>
          </div>
          <div className="mt-6"><Availability light /></div>
        </div>
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

      <Problems number="01" />

      <LiveDashboard number="02" />

      <Section>
        <SectionHead
          number="03"
          eyebrow="What we do"
          title="Four services. One goal:"
          em="a business that runs on evidence."
          intro="Most companies don't have a data problem. They have a decision problem — the information exists, but it isn't in front of the right people in a form they can act on."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2">
          {services.map((s, i) => (
            <Link key={s.slug} href={s.slug === "data-bi" ? "/services/data-bi" : `/services#${s.slug}`} className="group bg-paper transition hover:bg-paper-dim">
              <div className={`relative h-40 ${serviceImages[s.slug].duotone ? "duotone" : "bg-[#17161f]"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={serviceImages[s.slug].src} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" style={{ objectPosition: serviceImages[s.slug].position }} loading="lazy" />
                {!serviceImages[s.slug].duotone && <div className="absolute inset-0 bg-gradient-to-t from-[#17161f]/70 to-transparent" />}
                <p className="absolute bottom-3 left-7 z-10 font-mono text-xs text-[#ffc93c]">{String(i + 1).padStart(2, "0")}</p>
              </div>
              <div className="p-7 pt-5">
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
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <PhotoBand duotone src="/img/wall-dashboard.jpg" position="center 40%" note="What the first month looks like">One screen, <i>and a conversation about what to do — not which number is right.</i></PhotoBand>

      <PricingLadder compact number="04" />

      <CostCalculator number="05" />

      <WeekOne number="06" />

      <Guarantee />

      <Section tone="dark">
        <SectionHead number="07" eyebrow="How we work" title="Scoped before it starts." em="Handed over when it's done." />
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

      <Section dim>
        <SectionHead number="08" eyebrow="Why ABI" title="What you can" em="hold us to." />
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

      <SectorTabs number="09" />

      <PhotoBand duotone src="/img/corridor.jpg" position="center 30%">Built in London, <i>for companies that run on their numbers.</i></PhotoBand>

      <Faq number="10" />

      <CtaBand />
    </>
  );
}

import { Button, CtaBand, Section, SectionHead, PhotoBand } from "@/components/ui";
import { ServicesGrid } from "@/components/services-grid";
import { HeroMotion } from "@/components/hero-motion";
import { Availability, EngagementLadder, Guarantee, ProofStrip, WeekOne, bookHref } from "@/components/offers";
import { Problems, Faq } from "@/components/home-blocks";
import { LiveDashboard, CostCalculator, SectorTabs, WeekScrubber } from "@/components/home-interactive";

const principles = [
  ["Senior oversight, specialist delivery", "Every engagement is scoped and overseen by a senior consultant, and delivered by a team assembled for the specific problem: analysts, data engineers, AI specialists or project leads as the work requires."],
  ["Defined scope, defined price", "Our first engagement with any client is a clearly defined piece of work at an agreed fixed price. We do not propose open-ended day rates until you have seen how we work."],
  ["Designed for handover", "Everything we build is documented and your people are trained to run it. The objective is that you can operate what we deliver without ongoing dependence on us."],
  ["Transparent reporting", "Progress is reported in writing on a weekly basis, in language suitable for a board audience. Issues are raised early, with options, rather than discovered at invoice."],
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
        <div className="wrap relative pb-16 pt-20 md:pb-24 md:pt-28">
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

      </section>

      <Problems number="01" />

      <LiveDashboard number="02" />

      <Section>
        <SectionHead
          number="03"
          eyebrow="What we do"
          title="Ten ways in. One goal:"
          em="a business that runs on evidence."
          intro="Most companies don't have a data problem. They have a decision problem — the information exists, but it isn't in front of the right people in a form they can act on."
        />
        <ServicesGrid />
      </Section>

      <PhotoBand duotone src="/img/wall-dashboard.jpg" position="center 40%" note="What the first month looks like">One screen, <i>and a conversation about what to do — not which number is right.</i></PhotoBand>

      <EngagementLadder number="04" />

      <CostCalculator number="05" />

      <WeekOne number="06" />

      <Guarantee />

      <WeekScrubber number="07" />

      <Section dim>
        <SectionHead number="08" eyebrow="Why ABI" title="The commitments we make" em="on every engagement." />
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

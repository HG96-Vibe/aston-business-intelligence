import type { Metadata } from "next";
import { CtaBand, PageHero, Placeholder, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected engagements and outcomes from Aston Business Intelligence.",
};

// TODO(Hamid): replace with real, anonymised engagements. Each needs: sector,
// company size, the problem, what we did, and at least one measurable outcome.
const cases = [
  {
    sector: "[Sector, e.g. Training provider]",
    size: "[Size, e.g. 40 staff, £4m turnover]",
    service: "Data & BI",
    title: "[One-line outcome, e.g. Replaced month-end spreadsheets with a live finance dashboard]",
    problem: "[What was broken before — 2 sentences.]",
    did: "[What Aston actually delivered — 2–3 sentences.]",
    result: ["[Metric 1, e.g. Month-end reporting from 5 days to same-day]", "[Metric 2]"],
  },
  {
    sector: "[Sector]",
    size: "[Size]",
    service: "AI consulting",
    title: "[One-line outcome]",
    problem: "[Problem]",
    did: "[What we did]",
    result: ["[Metric 1]", "[Metric 2]"],
  },
  {
    sector: "[Sector]",
    size: "[Size]",
    service: "Business analysis + delivery",
    title: "[One-line outcome]",
    problem: "[Problem]",
    did: "[What we did]",
    result: ["[Metric 1]", "[Metric 2]"],
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="What it looks like when it works"
        intro="A selection of engagements, anonymised at our clients' request. Each one describes the problem we found, what we did, and what changed."
      />

      <Section>
        <Placeholder>
          <strong>Placeholder — awaiting real case studies.</strong> The three cards below are the
          template. Rough notes are enough; we&apos;ll shape them. Clients stay anonymous unless they
          agree to be named.
        </Placeholder>
        <div className="mt-10 grid gap-8">
          {cases.map((c, i) => (
            <article key={i} className="grid gap-8 rounded-lg border border-line p-8 md:grid-cols-[1fr_1.6fr]">
              <div>
                <p className="eyebrow">{c.service}</p>
                <h2 className="mt-3 text-2xl text-ink">{c.title}</h2>
                <p className="mt-3 text-sm text-muted">
                  {c.sector} · {c.size}
                </p>
              </div>
              <div className="grid gap-5 text-body">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-muted">The problem</h3>
                  <p className="mt-1 leading-relaxed">{c.problem}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-muted">What we did</h3>
                  <p className="mt-1 leading-relaxed">{c.did}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-muted">The result</h3>
                  <ul className="mt-1 grid gap-1">
                    {c.result.map((r) => (
                      <li key={r} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section dim>
        <SectionHead
          eyebrow="What every engagement includes"
          title="The deliverables you can expect"
          intro="Whatever the service, you get written outputs you can keep, share and act on — not just meetings."
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            ["Written assessment", "What we found, in plain English, with the evidence."],
            ["Costed plan", "Options, recommendation, timeline and price before any build starts."],
            ["Weekly updates", "A short written update every week: done, next, blockers, budget."],
            ["Handover pack", "Documentation, training session and a defined support window."],
          ].map(([t, b]) => (
            <li key={t} className="rounded-lg border border-line bg-paper p-6">
              <h3 className="font-semibold text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}

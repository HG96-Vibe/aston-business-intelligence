import type { Metadata } from "next";
import { site } from "@/lib/site";
import { CtaBand, PageHero, Placeholder, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Who Aston Business Intelligence is, how we work, and the team model behind every engagement.",
};

const values = [
  ["Evidence over opinion", "We'd rather show you a number than tell you a story. Every recommendation comes with the data behind it."],
  ["Honesty about scope", "If a project shouldn't happen, we'll say so — including when that means less work for us."],
  ["Confidentiality by default", "Your data and your plans are yours. We'll sign an NDA before the first conversation if you prefer."],
  ["Leave it better", "We measure ourselves on whether your team can run what we built after we've gone."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A consultancy built for businesses that are too big for spreadsheets and too small for the big firms"
        intro="Aston Business Intelligence was set up to give owner-managed UK companies the kind of data, analysis and delivery capability that used to be reserved for enterprises — at a scale and price that makes sense for them."
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <SectionHead
            eyebrow="How we're structured"
            title="Senior-led. Specialist-delivered."
          />
          <div className="prose-muted leading-relaxed text-body">
            <p>
              Every engagement is scoped and overseen by a senior consultant who stays accountable
              to you from the first call to handover.
            </p>
            <p>
              Delivery is done by a team drawn from our network of experienced specialists and
              strong early-career analysts — data engineers, BI developers, business analysts,
              AI practitioners and project leads — assembled for your project rather than
              whoever happens to be on the bench.
            </p>
            <p>
              That structure is deliberate. It means you get the right skills for the problem,
              a single point of accountability, and a cost base that isn&apos;t paying for a
              glass-fronted office.
            </p>
          </div>
        </div>
      </Section>

      <Section dim>
        <SectionHead eyebrow="Leadership" title="The people accountable for your project" />
        <div className="mt-10">
          <Placeholder>
            <strong>Placeholder — awaiting details.</strong> This section will show 1–3 named leaders
            with a photo (optional), title, two-line bio and LinkedIn link.
          </Placeholder>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-lg border border-line bg-paper p-6">
              <div className="h-20 w-20 rounded-full bg-paper-dim" />
              <p className="mt-4 font-semibold text-ink">[Name]</p>
              <p className="text-sm text-muted">[Title]</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                [Two lines on background and what they look after at Aston.]
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="What we stand for" title="Four things you can hold us to" />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {values.map(([title, body]) => (
            <div key={title}>
              <h3 className="text-lg text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section dim>
        <div className="grid gap-10 md:grid-cols-2">
          <SectionHead eyebrow="Company details" title="Who you're dealing with" />
          <dl className="grid gap-4 text-sm">
            <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-line pb-4">
              <dt className="text-muted">Legal name</dt>
              <dd className="font-medium text-ink">{site.name} Ltd</dd>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-line pb-4">
              <dt className="text-muted">Company number</dt>
              <dd className="font-mono text-ink">{site.companyNumber}</dd>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-line pb-4">
              <dt className="text-muted">Registered in</dt>
              <dd className="text-ink">England &amp; Wales</dd>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-line pb-4">
              <dt className="text-muted">Registered office</dt>
              <dd className="text-ink">{site.registeredOffice}</dd>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-4">
              <dt className="text-muted">Email</dt>
              <dd className="text-ink">{site.emails.hello}</dd>
            </div>
          </dl>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

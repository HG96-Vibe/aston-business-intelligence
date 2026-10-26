import type { Metadata } from "next";
import { PageHero, Section, SectionHead } from "@/components/ui";
import { CareersForm } from "./careers-form";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Aston Business Intelligence talent pool — analysts, engineers, AI specialists and project leads, experienced or early-career.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="We're always looking for"
        em="good people."
        intro="ABI works on a project basis, so we don't advertise fixed roles. Instead we keep a pool of specialists — experienced consultants and sharp early-career analysts — and build teams from it as engagements come in."
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div className="grid content-start gap-8">
            <SectionHead eyebrow="Who we look for" title="Specialists who can explain their work" />
            <ul className="grid gap-4 text-body">
              {[
                ["Data analysts & BI developers", "SQL, Power BI / Looker / Tableau, data modelling. You care whether the number is right."],
                ["Data engineers", "Pipelines, warehousing, dbt or similar. You build things that still work in six months."],
                ["Business analysts", "Requirements, process mapping, stakeholder work. You turn vague into specific."],
                ["AI practitioners", "LLM applications, automation, evaluation. You know what not to automate."],
                ["Project leads", "Delivery, vendor management, steering reports. You own the finish line."],
              ].map(([t, b]) => (
                <li key={t}>
                  <p className="font-semibold text-ink">{t}</p>
                  <p className="text-sm leading-relaxed text-muted">{b}</p>
                </li>
              ))}
            </ul>
            <div className="rounded-lg border border-line bg-paper-dim p-5 text-sm leading-relaxed text-body">
              <p className="font-semibold text-ink">How it works</p>
              <p className="mt-2">Most engagements are remote-first with occasional client visits in the UK. Work is contracted per project, with the option of longer arrangements for people we work well with. Early-career applicants are paired with a senior lead.</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl text-ink">Join the talent pool</h2>
            <p className="mt-2 mb-6 text-muted">Two minutes. Every submission is read.</p>
            <CareersForm />
          </div>
        </div>
      </Section>
    </>
  );
}

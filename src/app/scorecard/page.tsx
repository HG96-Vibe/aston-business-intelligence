import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { SelfCheck } from "./self-check";

export const metadata: Metadata = {
  title: "Reporting reporting scorecard",
  description: "Ten yes/no questions and an instant score. Find out whether your business reporting is sound, strained or urgent.",
};

export default function ScorecardPage() {
  return (
    <>
      <PageHero
        eyebrow="Free scorecard · 2 minutes"
        title="How reliable is"
        em="your reporting?"
        intro="Ten yes-or-no questions about how reporting is produced in your business. Your score appears immediately; an email address is only needed if you would like the detailed breakdown."
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <SelfCheck />
        </div>
      </Section>
    </>
  );
}

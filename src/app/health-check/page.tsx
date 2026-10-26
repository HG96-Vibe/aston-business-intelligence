import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { SelfCheck } from "./self-check";

export const metadata: Metadata = {
  title: "Reporting health check",
  description: "Ten yes/no questions. Instant score. Find out whether your business reporting is healthy, strained or urgent.",
};

export default function HealthCheckPage() {
  return (
    <>
      <PageHero
        eyebrow="Free self-check · 2 minutes"
        title="How healthy is"
        em="your reporting?"
        intro="Ten yes-or-no questions about how numbers get made in your business. You'll see your score straight away. No email needed unless you want the detailed breakdown."
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <SelfCheck />
        </div>
      </Section>
    </>
  );
}

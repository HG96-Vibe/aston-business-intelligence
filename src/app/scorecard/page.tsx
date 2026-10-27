import type { Metadata } from "next";
import { SelfCheck } from "./self-check";

export const metadata: Metadata = {
  title: "Reporting scorecard",
  description: "Ten yes-or-no questions and an instant result. Find out whether your business reporting is sound, strained or urgent, and where it is costing you.",
};

export default function ScorecardPage() {
  return (
    <section className="bg-paper">
      <div className="wrap pb-20 pt-16 md:pb-24 md:pt-20">
        <p className="marker">Free scorecard · 2 minutes</p>
        <h1 className="mt-4 text-[2.4rem] leading-[1.08] text-ink md:text-[3.6rem]">
          How reliable is <span className="em">your reporting?</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg font-light leading-relaxed text-muted">
          Ten yes-or-no questions. Every “yes” is a warning sign. You see the result instantly, no email needed.
        </p>
        <div className="mt-12">
          <SelfCheck />
        </div>
      </div>
    </section>
  );
}

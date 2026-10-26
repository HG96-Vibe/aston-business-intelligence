import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return (
    <PageShell eyebrow="Contact" title="Book a discovery call" intro="Tell us about the reporting or data problem you are trying to solve.">
      <p className="text-sm text-slate-500">Content coming soon.</p>
    </PageShell>
  );
}

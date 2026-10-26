import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Page() {
  return (
    <PageShell eyebrow="Privacy policy" title="Privacy policy" intro="How Aston Business Intelligence Ltd collects and uses personal data.">
      <p className="text-sm text-slate-500">Content coming soon.</p>
    </PageShell>
  );
}

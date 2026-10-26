import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Work" };

export default function Page() {
  return (
    <PageShell eyebrow="Work" title="Selected work" intro="Case studies and outcomes from recent engagements.">
      <p className="text-sm text-slate-500">Content coming soon.</p>
    </PageShell>
  );
}

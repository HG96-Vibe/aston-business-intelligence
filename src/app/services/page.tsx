import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Services" };

export default function Page() {
  return (
    <PageShell eyebrow="Services" title="What we do" intro="BI strategy, dashboards, data engineering and analytics — scoped as fixed-fee engagements.">
      <p className="text-sm text-slate-500">Content coming soon.</p>
    </PageShell>
  );
}

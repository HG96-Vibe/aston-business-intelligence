import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Careers" };

export default function Page() {
  return (
    <PageShell eyebrow="Careers" title="Work with us" intro="Open roles and how we hire.">
      <p className="text-sm text-slate-500">Content coming soon.</p>
    </PageShell>
  );
}

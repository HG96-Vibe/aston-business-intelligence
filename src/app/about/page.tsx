import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return (
    <PageShell eyebrow="About" title="Who we are" intro="A small London consultancy focused on one thing: making data useful to the people who run the business.">
      <p className="text-sm text-slate-500">Content coming soon.</p>
    </PageShell>
  );
}

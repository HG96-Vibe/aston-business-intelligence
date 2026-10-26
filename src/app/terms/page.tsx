import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <PageShell eyebrow="Terms" title="Terms of service" intro="Terms governing use of this website and our services.">
      <p className="text-sm text-slate-500">Content coming soon.</p>
    </PageShell>
  );
}

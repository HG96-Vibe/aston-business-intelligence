import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <h1 className="text-3xl text-ink md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>
        <div className="legal mt-10 grid gap-6 leading-relaxed text-body [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:font-sans [&_h2]:text-ink [&_ul]:grid [&_ul]:gap-1 [&_ul]:pl-5 [&_li]:list-disc">
          {children}
        </div>
      </div>
    </section>
  );
}

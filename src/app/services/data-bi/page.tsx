import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead, CtaBand, Placeholder, Button } from "@/components/ui";
import { WeekOne, Guarantee, bookHref } from "@/components/offers";
import { dataBi } from "@/lib/offers";
import { SheetsToScreen } from "@/components/sheets-to-screen";
import { Convergence } from "@/components/convergence";
import { TubeMap } from "@/components/tube-map";
import { FiveViews } from "@/components/five-views";

export const metadata: Metadata = {
  title: "Data & Business Intelligence",
  description: "Reporting that reconciles to your accounts and refreshes itself. Reporting Assessment from £2,500; dashboards in Power BI on the tools you already have.",
};

export default function DataBiPage() {
  const d = dataBi;
  return (
    <>
      <section className="border-b border-accent/20 bg-accent-soft">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1.05fr_1fr] md:items-center md:px-6 md:py-28">
          <div>
            <p className="marker">Services · Data &amp; Business Intelligence</p>
            <h1 className="mt-5 text-4xl text-ink md:text-5xl">
              One set of numbers the whole business trusts, <span className="em">refreshed without anyone touching a spreadsheet.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-muted">
              You already have the data — in Xero, your CRM, a few spreadsheets and one person&apos;s head. We join it up, make it reconcile to the accounts, and put it on the screens that drive decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={bookHref()}>Book a conversation</Button>
              <Button href="/scorecard" variant="ghost">Score your reporting in 2 minutes</Button>
            </div>
          </div>
          <SheetsToScreen />
        </div>
      </section>

      {/* Pains → one cause */}
      <Section>
        <SectionHead number="01" eyebrow="Why companies call us" title="Three problems," em="one underlying cause." />
        <Convergence
          problems={d.pains.map(([t, b]) => [t, b] as [string, string])}
          cause={{
            label: "The cause",
            title: "The numbers are assembled by hand.",
            body: "So they are slow, inconsistent and shallow — and every month someone rebuilds them from scratch. Fix the assembly and all three symptoms go.",
            cta: "How we fix it: the Reporting Assessment",
            href: "#ladder",
          }}
        />
      </Section>

      {/* Ladder */}
      <Section dim id="ladder">
        <SectionHead number="02" eyebrow="How the work is structured" title="Four stops." em="Alight at any of them." intro="Every journey starts with the Assessment. Continue only if the plan it produces makes sense to you." />
        <TubeMap steps={d.ladder} />
      </Section>

      {/* Five dashboards */}
      <Section>
        <SectionHead number="03" eyebrow="What we build" title="Five views that answer" em="the questions owners actually ask." intro="Every business is different; the questions are not. We start from these five and adapt them to your sector and systems. Each one is reconciled to your accounts on every refresh — a dashboard that is £3,000 out from the ledger is switched off within a month, so ours shows the check on screen." />
        <FiveViews />
      </Section>

      {/* Tools */}
      <Section>
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <SectionHead number="04" eyebrow="Tooling" title="Built in what you" em="already pay for." intro="Power BI by default; Looker Studio or Tableau if that is what you have. No platform to buy, no licences marked up." />
          <ul className="flex flex-wrap gap-2 md:pt-12">{d.tools.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-body">{t}</li>)}</ul>
        </div>
      </Section>

      <WeekOne number="05" />

      {/* Proof */}
      <Section dim>
        <SectionHead number="06" eyebrow="What changed" title="Before and after," em="in numbers." />
        <div className="mt-10"><Placeholder><strong>Placeholder — awaiting a real example.</strong> This block will show one anonymised engagement: month-end days before/after, spreadsheets retired, reports reconciled, hours returned per month.</Placeholder></div>
        <div className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 md:grid-cols-4">
          {[["Month-end close", "5 days", "1 day"], ["Spreadsheets in use", "14", "0"], ["Reports that reconcile", "3 of 11", "11 of 11"], ["Hours on reporting / month", "48", "6"]].map(([k, a, b]) => (
            <div key={k} className="bg-paper p-5"><p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{k}</p><p className="mt-2 font-display text-2xl text-ink"><span className="text-muted line-through decoration-accent/60">{a}</span> → {b}</p><p className="mt-1 text-xs italic text-accent">[example figures]</p></div>
          ))}
        </div>
      </Section>

      <Guarantee />

      {/* FAQ */}
      <Section dim>
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <SectionHead number="07" eyebrow="Questions" title="Before you ask" />
          <div className="border-t border-line">
            {d.faqs.map(([q, a]) => (
              <details key={q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg text-ink [&::-webkit-details-marker]:hidden">{q}<span className="font-mono text-accent group-open:hidden">+</span><span className="hidden font-mono text-accent group-open:inline">–</span></summary>
                <p className="max-w-[60ch] pb-5 font-light leading-relaxed text-muted">{a}</p>
              </details>
            ))}
            <p className="pt-6 text-sm text-muted">See also: <Link href="/services/business-analysis" className="underline hover:text-ink">Business Analysis</Link> · <Link href="/services/ai-consulting" className="underline hover:text-ink">AI Consulting</Link></p>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

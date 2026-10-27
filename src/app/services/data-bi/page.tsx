import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead, CtaBand, Button, PhotoBand } from "@/components/ui";
import { bookHref } from "@/components/offers";
import { dataBi } from "@/lib/offers";
import { SheetsToScreen } from "@/components/sheets-to-screen";
import { Convergence } from "@/components/convergence";
import { TubeMap } from "@/components/tube-map";
import { FiveViews } from "@/components/five-views";
import { ToolHub } from "@/components/tool-hub";
import { ToolStrip } from "@/components/tool-strip";

export const metadata: Metadata = {
  title: "Data & Business Intelligence",
  description: "Reporting that reconciles to your accounts and refreshes itself. Reporting Assessment from £2,500; dashboards in Power BI on the tools you already have.",
};

export default function DataBiPage() {
  const d = dataBi;
  return (
    <>
      <section className="border-b border-accent/20 bg-accent-soft">
        <div className="wrap grid gap-12 py-20 md:grid-cols-[1.05fr_1fr] md:items-center md:py-28">
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

      <PhotoBand duotone src="/img/paper-stack.jpg" position="center 30%" note="Month-end, as it happens today">Somewhere in your business, <i>someone is doing this tonight.</i></PhotoBand>

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

      <PhotoBand duotone src="/img/two-at-monitor.jpg" position="center 40%" note="After the Assessment">One screen, <i>and a conversation about what to do — not which number is right.</i></PhotoBand>

      {/* Five dashboards */}
      <Section>
        <SectionHead number="03" eyebrow="What we build" title="Five views that answer" em="the questions owners actually ask." intro="Every business is different; the questions are not. We start from these five and adapt them to your sector and systems. Each one is reconciled to your accounts on every refresh — a dashboard that is £3,000 out from the ledger is switched off within a month, so ours shows the check on screen." />
        <FiveViews />
      </Section>

      {/* Tools */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center">
          <SectionHead number="04" eyebrow="Tooling" title="Built in what you" em="already pay for." intro="Power BI by default — it is in most Microsoft 365 plans and your team can learn it. Looker Studio or Tableau if that is what you have. No platform to buy, no licences marked up." />
          <ToolHub />
        </div>
        <ToolStrip />
      </Section>


      {/* FAQ — short answer first */}
      <Section dim>
        <SectionHead number="05" eyebrow="Questions" title="Before you ask." />
        <dl className="mt-10 border-t border-line">
          {d.faqs.map(([q, [lead, rest], a], i) => (
            <div key={q} className="grid gap-3 border-b border-line py-7 md:grid-cols-[1.1fr_1.4fr] md:gap-10">
              <dt className="font-display text-xl leading-snug text-ink md:text-2xl"><span className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent">0{i + 1}</span>{q}</dt>
              <dd className="m-0">
                <p className="font-display text-xl leading-tight text-ink md:text-2xl"><em className="not-italic text-accent">{lead}</em>{rest}</p>
                <p className="mt-3 max-w-[60ch] text-sm font-light leading-relaxed text-muted">{a}</p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="pt-6 text-sm text-muted">See also: <Link href="/services/business-analysis" className="underline hover:text-ink">Business Analysis</Link> · <Link href="/services/ai-consulting" className="underline hover:text-ink">AI Consulting</Link></p>
      </Section>

      <CtaBand />
    </>
  );
}

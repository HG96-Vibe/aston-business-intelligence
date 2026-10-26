import Link from "next/link";
import { Section, SectionHead } from "@/components/ui";
import { bookHref } from "@/components/offers";

/* ── Six problems ─────────────────────────────────────────────────────────── */
const problems = [
  ["“Month-end takes a week and I still don't trust it.”", "Numbers are assembled by hand from four places; every step is a chance to break something.", "Reporting Assessment", "/services/data-bi"],
  ["“Two reports, same thing, different numbers.”", "Two definitions of ‘revenue’, two spreadsheets, and a meeting spent arguing about which is right.", "One data model, reconciled", "/services/data-bi"],
  ["“If one person left, nobody could run the reports.”", "The process lives in one person's head and one person's laptop.", "Documented, automated, handed over", "/services/data-bi"],
  ["“I know total margin. I don't know margin by client.”", "So you can't see which customers cost you money, and you price them all the same.", "Margin by client, product, job", "/services/data-bi"],
  ["“Everyone says do AI. Nobody says where.”", "You've seen the demos; you haven't seen the business case for your business.", "AI Readiness Assessment", "/services#ai-consulting"],
  ["“The supplier's late and nobody owns it.”", "The project is live, the vendor is drifting, and your team has day jobs.", "Fractional Project Lead", "/services#project-delivery"],
];

export function Problems({ number }: { number?: string }) {
  return (
    <Section dim>
      <SectionHead number={number} eyebrow="Recognise any of these?" title="Six problems every growing business knows," em="and what we do about them." />
      <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
        {problems.map(([q, body, fix, href]) => (
          <Link key={q} href={href} className="group bg-paper p-6 transition hover:bg-paper-dim">
            <p className="font-display text-xl font-light italic leading-snug text-ink">{q}</p>
            <p className="mt-3 text-sm font-light leading-relaxed text-muted">{body}</p>
            <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent group-hover:underline">→ {fix}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ── Deliverables gallery ─────────────────────────────────────────────────── */
function Paper({ h, title, children, tilt }: { h: string; title: string; children: React.ReactNode; tilt: string }) {
  return (
    <div className={`flex aspect-[3/4] flex-col gap-2 rounded-md border border-line bg-paper p-5 text-[11px] text-muted shadow-[0_20px_40px_-24px_rgba(0,0,0,.3)] transition hover:translate-y-[-6px] hover:rotate-0 md:aspect-auto md:min-h-[300px] ${tilt}`}>
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent">{h}</span>
      <span className="font-display text-base text-ink">{title}</span>
      <span className="h-1.5 w-4/5 rounded bg-line" /><span className="h-1.5 w-full rounded bg-line" /><span className="h-1.5 w-3/5 rounded bg-line" />
      <div className="mt-auto rounded border border-line p-2">{children}</div>
    </div>
  );
}
export function Deliverables({ number }: { number?: string }) {
  return (
    <Section dim>
      <SectionHead number={number} eyebrow="What you walk away with" title="Documents you can hand to anyone," em="not slides." />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <Paper h="Deliverable 01" title="Data map" tilt="-rotate-1">
          <p className="text-xs text-ink">Xero → Sheets → Power BI</p><span className="mt-1.5 block h-1.5 w-3/5 rounded bg-line" /><span className="mt-1 block h-1.5 w-4/5 rounded bg-line" />
        </Paper>
        <Paper h="Deliverable 02" title="Findings & costed plan" tilt="rotate-[0.6deg] md:translate-y-2">
          <div className="flex h-10 items-end gap-1">{[30, 55, 80, 45, 100].map((v, i) => <i key={i} className="flex-1 rounded-t-sm bg-gold/80" style={{ height: `${v}%` }} />)}</div>
          <p className="mt-1 text-xs text-ink">Priority 1–5 · £ · weeks</p>
        </Paper>
        <Paper h="Every Friday" title="Weekly steering note" tilt="-rotate-[0.4deg]">
          <p className="text-xs text-ink">Done · Next · Blockers · Budget</p><span className="mt-1.5 block h-1.5 w-4/5 rounded bg-line" /><span className="mt-1 block h-1.5 w-3/5 rounded bg-line" />
        </Paper>
      </div>
      <div className="mt-6 grid gap-5 text-sm text-muted md:grid-cols-3">
        <p><b className="block font-medium text-ink">One page, day four.</b>Where your data lives, how it flows, where it breaks.</p>
        <p><b className="block font-medium text-ink">End of week two.</b>What we found, what it costs you, what to fix first and for how much.</p>
        <p><b className="block font-medium text-ink">Every week of any build.</b>Short enough to forward to the board unedited.</p>
      </div>
    </Section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────────── */
const faqs = [
  ["We're too small for a consultancy, aren't we?", "If you have more than one spreadsheet that matters and more than one person who touches it, you're not. Our first engagement costs less than a month of a junior analyst's salary and tells you whether anything bigger is worth doing."],
  ["Will you try to sell us a platform?", "No. We build on what you already pay for — Xero, Excel, Google Sheets, Power BI, HubSpot. If something new is needed we'll say so in writing with the price, and you can buy it from anyone."],
  ["What if we don't like the findings?", "You keep the report. It's written so any other consultant or an internal hire could act on it. The fee is credited against work with us within 12 months, but there's no obligation."],
  ["How much of our team's time will this take?", "About four hours across the two weeks — a kick-off, a few 30-minute conversations, and a read-through at the end. We work around month-end."],
  ["Is our data safe with you?", "Read-only access, UK-based processing, an NDA before we see anything if you want one, and nothing leaves your systems without being written into the plan first."],
];
export function Faq({ number }: { number?: string }) {
  return (
    <Section>
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <SectionHead number={number} eyebrow="Before you ask" title="The questions people" em="usually have." />
        <div className="border-t border-line">
          {faqs.map(([q, a]) => (
            <details key={q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg text-ink [&::-webkit-details-marker]:hidden">
                {q}<span className="font-mono text-accent group-open:hidden">+</span><span className="hidden font-mono text-accent group-open:inline">–</span>
              </summary>
              <p className="max-w-[60ch] pb-5 font-light leading-relaxed text-muted">{a}</p>
            </details>
          ))}
          <p className="pt-6 text-sm text-muted">Something else? <Link href={bookHref()} className="underline hover:text-ink">Ask us on a call.</Link></p>
        </div>
      </div>
    </Section>
  );
}

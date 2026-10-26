"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Section, SectionHead } from "@/components/ui";
import { bookHref } from "@/components/offers";

/* ── Live dashboard card ──────────────────────────────────────────────────── */
type Scene = { title: string; tag: string; kpis: [string, string, string, boolean?][]; spark: number[]; rows: [string, string, "ok" | "warn"][]; foot: [string, string] };
const scenes: Scene[] = [
  { title: "Finance · month-end", tag: "example", kpis: [["Revenue MTD", "£412k", "+6.1% vs plan"], ["Gross margin", "38.2%", "+1.4 pts"], ["Debtors > 60d", "£61k", "−£18k", true]], spark: [31, 34, 33, 37, 40, 39, 43, 45, 44, 48, 51, 53], rows: [["Month-end close", "1 day", "ok"], ["Reports reconciled to Xero", "✓ 14 / 14", "ok"], ["Margin by client", "12 of 40 below 25%", "warn"], ["Spreadsheets retired", "11", "ok"]], foot: ["Refreshed 06:00 daily", "Xero · Sheets · HubSpot"] },
  { title: "Sales · pipeline", tag: "example", kpis: [["Pipeline", "£1.9m", "+£240k"], ["Win rate", "31%", "+4 pts"], ["Days to close", "34", "−9 days", true]], spark: [12, 15, 14, 18, 17, 21, 24, 22, 27, 29, 31, 34], rows: [["Deals stalled > 30d", "9 flagged", "warn"], ["Forecast vs actual", "within 5%", "ok"], ["Lead source ROI", "Referrals 4.2×", "ok"], ["Rep activity", "auto-logged", "ok"]], foot: ["Live from HubSpot", "dbt · BigQuery"] },
  { title: "Operations · AI assistant", tag: "pilot", kpis: [["Enquiries triaged", "142", "this week"], ["Hours returned", "26h", "to the team"], ["Errors caught", "7", "before invoicing"]], spark: [2, 4, 7, 9, 12, 14, 19, 21, 24, 26, 27, 26], rows: [["Supplier invoices matched", "118 / 121", "ok"], ["Quotes drafted for sign-off", "23", "ok"], ["Exceptions escalated", "3", "warn"], ["Customer data left systems", "none", "ok"]], foot: ["Pilot · week 3 of 6", "vs baseline"] },
];
function Spark({ pts }: { pts: number[] }) {
  const w = 300, h = 60, max = Math.max(...pts), min = Math.min(...pts);
  const xy = pts.map((p, i) => [(i / (pts.length - 1)) * w, h - ((p - min) / (max - min || 1)) * (h - 8) - 4]);
  const d = xy.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const last = xy[xy.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block h-[70px] w-full">
      <path d={`${d} L${w} ${h} L0 ${h} Z`} className="fill-gold" opacity=".12" />
      <path d={d} fill="none" className="stroke-gold" strokeWidth="2" />
      <circle cx={last[0]} cy={last[1]} r="3.5" className="fill-gold" />
    </svg>
  );
}
export function LiveDashboard({ number }: { number?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % scenes.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = scenes[i];
  return (
    <Section>
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <SectionHead number={number} eyebrow="What good looks like" title="One screen the whole business" em="can agree on." intro="Not a demo of a product — there isn't one. This is the kind of view we build on top of the tools you already have, refreshed without anyone touching a spreadsheet." />
          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <span>{String(i + 1).padStart(2, "0")} / 0{scenes.length}</span>
            {scenes.map((_, k) => (
              <button key={k} type="button" aria-label={`Scene ${k + 1}`} onClick={() => setI(k)} className="relative h-0.5 w-9 overflow-hidden rounded bg-line">
                {k === i && <span key={i} className="absolute inset-0 origin-left animate-[fill_6s_linear_forwards] bg-gold" />}
              </button>
            ))}
            <span className="ml-1">Up next: {scenes[(i + 1) % scenes.length].title.split(" · ")[1]}</span>
          </div>
        </div>
        <div key={i} className="overflow-hidden rounded-lg border border-line bg-paper text-[13px] shadow-[0_30px_60px_-30px_rgba(0,0,0,.25)]">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink"><span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-gold" />{s.title}</span>
            <span className="rounded border border-accent px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{s.tag}</span>
          </div>
          <div className="grid grid-cols-3 gap-px bg-line">
            {s.kpis.map(([l, v, d, down]) => (
              <div key={l} className="bg-paper px-4 py-3.5">
                <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{l}</span>
                <b className="mt-1 block font-display text-2xl font-normal tabular-nums text-ink">{v}</b>
                <span className={`text-[11px] ${down ? "text-orange-700 dark:text-orange-300" : "text-emerald-700 dark:text-emerald-300"}`}>{d}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-line px-4 pb-1.5 pt-3.5"><Spark pts={s.spark} /></div>
          <div className="border-t border-line">
            {s.rows.map(([a, b, tone], k) => (
              <div key={a} className="flex justify-between gap-3 border-b border-line px-4 py-2.5 opacity-0 animate-[rowin_.5s_forwards]" style={{ animationDelay: `${k * 0.25}s` }}>
                <span className="text-body">{a}</span><span className={tone === "ok" ? "text-emerald-700 dark:text-emerald-300" : "text-accent"}>{b}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between bg-paper-dim px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted"><span>{s.foot[0]}</span><span>{s.foot[1]}</span></div>
        </div>
      </div>
    </Section>
  );
}

/* ── Cost calculator ──────────────────────────────────────────────────────── */
const fmt = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
export function CostCalculator({ number }: { number?: string }) {
  const [p, setP] = useState(4), [h, setH] = useState(12), [c, setC] = useState(35);
  const yr = useMemo(() => p * h * c * 12, [p, h, c]);
  const x = yr / 2500;
  return (
    <Section dim>
      <SectionHead number={number} eyebrow="Do the sum" title="What is manual reporting" em="actually costing you?" />
      <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start">
        <div className="grid gap-5">
          {([["People involved in producing reports", p, setP, 1, 15, 1, (v: number) => String(v)], ["Hours each spends per month on it", h, setH, 2, 60, 1, (v: number) => String(v)], ["Average loaded hourly cost", c, setC, 15, 120, 5, (v: number) => "£" + v]] as const).map(([label, val, set, min, max, step, show]) => (
            <label key={label} className="grid gap-2 text-sm text-muted">
              <span className="flex justify-between font-medium text-ink">{label}<span className="font-mono">{show(val)}</span></span>
              <input type="range" min={min} max={max} step={step} value={val} onChange={(e) => set(+e.target.value)} className="w-full accent-gold" />
            </label>
          ))}
          <p className="text-xs text-muted">Rough is fine. Most owners underestimate the hours by half.</p>
        </div>
        <div className="rounded-md border border-line bg-paper p-6">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">Cost of producing reports</p>
          <p className="mt-2 font-display text-5xl tabular-nums text-ink">{fmt(yr)}<span className="font-sans text-base text-muted"> / year</span></p>
          <div className="mt-4 h-2 overflow-hidden rounded bg-line"><div className="h-full rounded bg-gold transition-all" style={{ width: `${Math.min(100, (yr / 120000) * 100)}%` }} /></div>
          <p className="mt-4 border-t border-line pt-4 text-sm text-muted">That&apos;s <b className="text-ink">{x.toFixed(x < 10 ? 1 : 0)}×</b> the price of a Reporting Health Check — before counting a single bad decision made on a wrong number.</p>
          <Link href="/services#data-bi" className="mt-5 inline-flex rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-ink hover:bg-gold-strong">See what the Health Check covers →</Link>
        </div>
      </div>
    </Section>
  );
}

/* ── Sector tabs ──────────────────────────────────────────────────────────── */
const sectors: [string, string, string[]][] = [
  ["Training & education", "“We know enrolments, not which course actually makes money.”", ["Margin by course, cohort and tutor", "Enrolment funnel from enquiry to start date", "Automated Ofsted / awarding-body reporting"]],
  ["Recruitment & staffing", "“Placements are up, cash isn't.”", ["Fee, cost and margin per consultant and per client", "Time-to-fill and drop-out by source", "Debtor days by client with auto-chasing"]],
  ["Professional services", "“Utilisation is a guess and WIP is a mystery.”", ["Utilisation and recovery rate by person and job", "WIP ageing from the practice system", "Profit by client, not just revenue"]],
  ["Retail & e-commerce", "“Sales are fine; I can't see which SKUs lose money after returns.”", ["Contribution margin per SKU after returns, ads and shipping", "Stock cover and re-order points", "Channel ROI side by side"]],
  ["Property & construction", "“Every job starts profitable and ends somewhere else.”", ["Cost-to-complete by job, weekly", "Variations and retentions tracked", "Subcontractor spend vs budget"]],
  ["Healthcare & care", "“Rotas, agency spend and occupancy live in three systems.”", ["Agency vs permanent cost per shift", "Occupancy and fee mix by site", "CQC evidence reporting without the spreadsheet"]],
  ["Logistics & distribution", "“Margin per route is anyone's guess.”", ["Cost and margin per route, vehicle and customer", "On-time delivery from the TMS, daily", "Fuel and maintenance variance alerts"]],
  ["Financial services", "“Compliance reporting eats the team's month.”", ["Regulatory returns from source systems, reconciled", "Client profitability by product line", "Complaint and breach tracking with audit trail"]],
];
export function SectorTabs({ number }: { number?: string }) {
  const [i, setI] = useState(0);
  const [, q, fixes] = sectors[i];
  return (
    <Section dim>
      <SectionHead number={number} eyebrow="Who we work with" title="Owner-managed UK businesses," em="£1m–£30m." intro="Large enough that spreadsheets have stopped working, small enough that a big consultancy doesn't make sense." />
      <div role="tablist" className="mt-8 flex flex-wrap gap-1.5">
        {sectors.map(([name], k) => (
          <button key={name} role="tab" aria-selected={k === i} onClick={() => setI(k)} type="button" className={`rounded-full border px-3 py-1.5 text-sm transition ${k === i ? "border-gold bg-gold font-semibold text-[#17161f]" : "border-line bg-paper text-body hover:border-accent"}`}>{name}</button>
        ))}
      </div>
      <div className="mt-4 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2">
        <div className="bg-paper p-6"><p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent">What we usually hear</p><p className="mt-2 font-display text-xl font-light italic text-ink">{q}</p></div>
        <div className="bg-paper p-6"><p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent">What we build first</p><ul className="mt-2 grid gap-1.5 text-sm font-light text-body">{fixes.map((f) => <li key={f} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{f}</li>)}</ul></div>
      </div>
    </Section>
  );
}

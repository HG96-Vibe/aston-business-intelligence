"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Section, SectionHead } from "@/components/ui";
import { bookHref } from "@/components/offers";

/* ── Live dashboards ─────────────────────────────────────────────────────── */
type Kpi = { label: string; value: number; prefix?: string; suffix?: string; decimals?: number; delta: string; down?: boolean };
type Scene = {
  title: string; tag: string; sources: string[]; outputs: string[];
  slicers: string[]; kpis: Kpi[];
  line: { label: string; pts: number[] }; bars: { label: string; items: [string, number][] }; donut: { label: string; items: [string, number][] };
  rows: [string, string, "ok" | "warn"][]; foot: [string, string];
};
const scenes: Scene[] = [
  {
    title: "Finance · month-end", tag: "example", sources: ["Xero", "Sheets", "HubSpot", "Bank feed"], outputs: ["Power BI", "Board pack", "Email digest", "Slack alert"],
    slicers: ["FY 2026 ▾", "All sites ▾", "GBP ▾", "vs plan"],
    kpis: [{ label: "Revenue MTD", value: 412, prefix: "£", suffix: "k", delta: "+6.1% vs plan" }, { label: "Gross margin", value: 38.2, suffix: "%", decimals: 1, delta: "+1.4 pts" }, { label: "Cash runway", value: 7.4, suffix: " mo", decimals: 1, delta: "+0.6" }, { label: "Debtors > 60d", value: 61, prefix: "£", suffix: "k", delta: "−£18k", down: true }],
    line: { label: "Revenue, last 12 months", pts: [31, 34, 33, 37, 40, 39, 43, 45, 44, 48, 51, 53] },
    bars: { label: "Margin by client, top 6", items: [["Acme", 44], ["Birch", 39], ["Cole", 36], ["Dunn", 31], ["Ealing", 24], ["Fox", 18]] },
    donut: { label: "Revenue mix", items: [["Services", 58], ["Licences", 27], ["Support", 15]] },
    rows: [["Month-end close", "1 day", "ok"], ["Reconciled to Xero", "14 / 14", "ok"], ["Clients below 25% margin", "12 of 40", "warn"]], foot: ["Refreshed 06:00 daily", "Xero · Sheets · HubSpot"],
  },
  {
    title: "Sales · pipeline", tag: "example", sources: ["HubSpot", "Website", "Calendar", "Xero"], outputs: ["Looker", "Weekly forecast", "Rep scorecard", "CRM tasks"],
    slicers: ["This quarter ▾", "All reps ▾", "New business ▾", "weighted"],
    kpis: [{ label: "Pipeline", value: 1.9, prefix: "£", suffix: "m", decimals: 1, delta: "+£240k" }, { label: "Win rate", value: 31, suffix: "%", delta: "+4 pts" }, { label: "Avg. deal", value: 18.5, prefix: "£", suffix: "k", decimals: 1, delta: "+£1.2k" }, { label: "Days to close", value: 34, delta: "−9 days", down: true }],
    line: { label: "Weighted pipeline, 12 weeks", pts: [12, 15, 14, 18, 17, 21, 24, 22, 27, 29, 31, 34] },
    bars: { label: "Won by source", items: [["Referral", 42], ["Outbound", 31], ["Website", 22], ["Events", 14], ["Partner", 11], ["Ads", 6]] },
    donut: { label: "Stage mix", items: [["Qualified", 46], ["Proposal", 34], ["Negotiation", 20]] },
    rows: [["Deals stalled > 30d", "9 flagged", "warn"], ["Forecast vs actual", "within 5%", "ok"], ["Rep activity", "auto-logged", "ok"]], foot: ["Live from HubSpot", "dbt · BigQuery"],
  },
  {
    title: "Operations · AI assistant", tag: "pilot", sources: ["Inbox", "Phone", "Web form", "WhatsApp"], outputs: ["CRM", "Quote draft", "Invoice", "Exception log"],
    slicers: ["Week 3 of 6 ▾", "All channels ▾", "vs baseline"],
    kpis: [{ label: "Enquiries triaged", value: 142, delta: "this week" }, { label: "Hours returned", value: 26, suffix: "h", delta: "to the team" }, { label: "First reply", value: 4, suffix: " min", delta: "was 3h 10m", down: true }, { label: "Errors caught", value: 7, delta: "before invoicing" }],
    line: { label: "Hours returned, cumulative", pts: [2, 4, 7, 9, 12, 14, 19, 21, 24, 26, 27, 26] },
    bars: { label: "Enquiries by channel", items: [["Inbox", 61], ["Web", 38], ["Phone", 24], ["WhatsApp", 19], ["Referral", 8], ["Other", 4]] },
    donut: { label: "Outcome", items: [["Auto-handled", 64], ["Drafted for sign-off", 28], ["Escalated", 8]] },
    rows: [["Supplier invoices matched", "118 / 121", "ok"], ["Exceptions escalated", "3", "warn"], ["Customer data left systems", "none", "ok"]], foot: ["Pilot · week 3 of 6", "measured vs baseline"],
  },
];

const SCENE_MS = 11000;   // total time per card
const ARRIVE_MS = 2200;   // pulses reach the card, numbers start counting

function useCountUp(target: number, start: boolean, decimals = 0, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) { setV(0); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const k = Math.min(1, (t - t0) / ms); const e = 1 - Math.pow(1 - k, 3); setV(target * e); if (k < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [target, start, ms]);
  return v.toFixed(decimals);
}
function KpiTile({ k, live }: { k: Kpi; live: boolean }) {
  const v = useCountUp(k.value, live, k.decimals ?? 0);
  return (
    <div className="bg-paper px-3.5 py-3">
      <span className="block font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">{k.label}</span>
      <b className="mt-1 block font-display text-[22px] font-normal tabular-nums leading-none text-ink">{k.prefix}{v}{k.suffix}</b>
      <span className={`mt-1 block text-[10.5px] ${k.down ? "text-orange-700 dark:text-orange-300" : "text-emerald-700 dark:text-emerald-300"}`}>{k.delta}</span>
    </div>
  );
}
function LineChart({ pts, live }: { pts: number[]; live: boolean }) {
  const w = 300, h = 80, max = Math.max(...pts), min = Math.min(...pts);
  const xy = pts.map((p, i) => [(i / (pts.length - 1)) * w, h - ((p - min) / (max - min || 1)) * (h - 10) - 5]);
  const d = xy.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const last = xy[xy.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block h-[80px] w-full">
      {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} className="stroke-line" strokeWidth="1" />)}
      <path d={`${d} L${w} ${h} L0 ${h} Z`} className="fill-gold" opacity={live ? 0.12 : 0} style={{ transition: "opacity 1s 1s" }} />
      <path d={d} fill="none" className="stroke-gold" strokeWidth="2" pathLength={1} strokeDasharray="1" strokeDashoffset={live ? 0 : 1} style={{ transition: "stroke-dashoffset 1.6s ease-out .3s" }} />
      <circle cx={last[0]} cy={last[1]} r="3.5" className="fill-gold" opacity={live ? 1 : 0} style={{ transition: "opacity .3s 1.9s" }} />
    </svg>
  );
}
function BarChart({ items, live }: { items: [string, number][]; live: boolean }) {
  const max = Math.max(...items.map((i) => i[1]));
  return (
    <div className="flex h-[80px] items-end gap-1.5">
      {items.map(([l, v], i) => (
        <div key={l} className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <div className="w-full rounded-t-sm bg-gold" style={{ height: live ? `${(v / max) * 62}px` : 0, opacity: 1 - i * 0.12, transition: `height .9s cubic-bezier(.2,.8,.2,1) ${0.3 + i * 0.1}s` }} />
          <span className="w-full truncate text-center font-mono text-[8px] uppercase tracking-wide text-muted">{l}</span>
        </div>
      ))}
    </div>
  );
}
function Donut({ items, live }: { items: [string, number][]; live: boolean }) {
  const total = items.reduce((a, b) => a + b[1], 0); const C = 2 * Math.PI * 26; let acc = 0;
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 64 64" className="h-[72px] w-[72px] shrink-0 -rotate-90">
        <circle cx="32" cy="32" r="26" fill="none" className="stroke-line" strokeWidth="9" />
        {items.map(([l, v], i) => { const len = (v / total) * C; const off = acc; acc += len; return (
          <circle key={l} cx="32" cy="32" r="26" fill="none" className="stroke-gold" strokeWidth="9" opacity={1 - i * 0.3}
            strokeDasharray={`${live ? len : 0} ${C}`} strokeDashoffset={-off} style={{ transition: `stroke-dasharray 1s ease-out ${0.4 + i * 0.25}s` }} />); })}
      </svg>
      <ul className="grid gap-0.5 text-[10.5px] text-body">
        {items.map(([l, v], i) => <li key={l} className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-gold" style={{ opacity: 1 - i * 0.3 }} />{l} <span className="font-mono text-muted">{v}%</span></li>)}
      </ul>
    </div>
  );
}

function DashboardCard({ s, live }: { s: Scene; live: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-paper text-[13px] shadow-[0_30px_60px_-30px_rgba(0,0,0,.25)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink"><span className={`mr-2 inline-block h-2 w-2 rounded-full bg-gold ${live ? "animate-pulse" : "opacity-40"}`} />{s.title}</span>
        <span className="rounded border border-accent px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{s.tag}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 border-b border-line bg-paper-dim px-4 py-2">
        {s.slicers.map((f) => <span key={f} className="rounded border border-line bg-paper px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-body">{f}</span>)}
      </div>
      <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">{s.kpis.map((k) => <KpiTile key={k.label} k={k} live={live} />)}</div>
      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-[1.4fr_1fr]">
        <div className="bg-paper px-4 pb-2 pt-3"><p className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">{s.line.label}</p><LineChart pts={s.line.pts} live={live} /></div>
        <div className="bg-paper px-4 pb-2 pt-3"><p className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">{s.bars.label}</p><BarChart items={s.bars.items} live={live} /></div>
      </div>
      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-[1fr_1.4fr]">
        <div className="bg-paper px-4 py-3"><p className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">{s.donut.label}</p><Donut items={s.donut.items} live={live} /></div>
        <div className="bg-paper">
          {s.rows.map(([a, b, tone], k) => (
            <div key={a} className="flex justify-between gap-3 border-b border-line px-4 py-2.5 last:border-b-0" style={{ opacity: live ? 1 : 0, transform: live ? "none" : "translateY(4px)", transition: `opacity .5s ${1.2 + k * 0.25}s, transform .5s ${1.2 + k * 0.25}s` }}>
              <span className="text-body">{a}</span><span className={tone === "ok" ? "text-emerald-700 dark:text-emerald-300" : "text-accent"}>{b}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between border-t border-line bg-paper-dim px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"><span>{s.foot[0]}</span><span>{s.foot[1]}</span></div>
    </div>
  );
}


/* Generic line glyphs for circuit nodes, keyed by label (no third-party logos). */
const GLYPHS: Record<string, string> = {
  ledger: "M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4zM9 8h6M9 12h6",
  grid: "M4 4h16v16H4zM4 10h16M4 15h16M10 4v16",
  crm: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M21 20a5 5 0 0 0-4-4.9",
  bank: "M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18",
  inbox: "M3 13l3-8h12l3 8v6H3zM3 13h5l2 3h4l2-3h5",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  form: "M6 3h12v18H6zM9 8h6M9 12h6M9 16h4",
  chat: "M4 5h16v11H9l-5 4z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  chart: "M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3",
  doc: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  mail: "M3 6h18v12H3zM3 6l9 7 9-7",
  bell: "M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4",
  list: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",
  invoice: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  scorecard: "M4 5h16v14H4zM8 15l3-4 3 2 3-5",
  tasks: "M5 7l2 2 4-4M5 13l2 2 4-4M5 19l2 2 4-4M13 6h7M13 12h7M13 18h7",
  flag: "M6 21V4M6 4h12l-3 4 3 4H6",
};
const GLYPH_FOR: Record<string, keyof typeof GLYPHS> = {
  "Xero": "ledger", "Sheets": "grid", "HubSpot": "crm", "Bank feed": "bank", "Website": "globe", "Calendar": "calendar",
  "Inbox": "inbox", "Phone": "phone", "Web form": "form", "WhatsApp": "chat",
  "Power BI": "chart", "Board pack": "doc", "Email digest": "mail", "Slack alert": "bell", "Looker": "chart", "Weekly forecast": "doc",
  "Rep scorecard": "scorecard", "CRM tasks": "tasks", "CRM": "crm", "Quote draft": "doc", "Invoice": "invoice", "Exception log": "flag",
};
function Glyph({ label }: { label: string }) {
  const d = GLYPHS[GLYPH_FOR[label] ?? "list"];
  return <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
}

/* Circuit traces: four nodes feeding into (or out of) the card. Gold pulse travels each trace slowly. */
function Circuit({ labels, dir, seed }: { labels: string[]; dir: "in" | "out"; seed: number }) {
  const xs = [50, 150, 250, 350]; const targets = [140, 180, 220, 260];
  return (
    <div className="relative hidden h-[110px] w-full md:block" aria-hidden="true">
      <svg viewBox="0 0 400 110" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {xs.map((x, i) => {
          const tx = targets[i];
          const d = dir === "in"
            ? `M${x} 44 V62 Q${x} 72 ${x + Math.sign(tx - x) * 10} 72 H${tx - Math.sign(tx - x) * 10} Q${tx} 72 ${tx} 82 V110`
            : `M${tx} 0 V28 Q${tx} 38 ${tx + Math.sign(x - tx) * 10} 38 H${x - Math.sign(x - tx) * 10} Q${x} 38 ${x} 48 V68`;
          return (
            <g key={i}>
              <path d={d} fill="none" className="stroke-line" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path d={d} fill="none" className="stroke-gold" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeDasharray="14 400" style={{ animation: `trace 5.5s linear ${(i * 0.9 + seed * 0.3).toFixed(2)}s infinite` }} />
            </g>
          );
        })}
      </svg>
      {labels.map((l, i) => (
        <div key={l} className={`absolute flex -translate-x-1/2 flex-col items-center gap-1.5 ${dir === "in" ? "top-0" : "bottom-0"}`} style={{ left: `${(xs[i] / 400) * 100}%` }}>
          {dir === "out" && <span className="grid h-6 w-6 place-items-center rounded border border-line bg-paper"><Glyph label={l} /></span>}
          <span className="whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">{l}</span>
          {dir === "in" && <span className="grid h-6 w-6 place-items-center rounded border border-line bg-paper"><Glyph label={l} /></span>}
        </div>
      ))}
    </div>
  );
}

export function LiveDashboard({ number }: { number?: string }) {
  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setLive(true); return; }
    setLive(false);
    const a = setTimeout(() => setLive(true), ARRIVE_MS);
    if (paused) return () => clearTimeout(a);
    const n = setTimeout(() => setI((v) => (v + 1) % scenes.length), SCENE_MS);
    return () => { clearTimeout(a); clearTimeout(n); };
  }, [i, paused]);
  const s = scenes[i];
  return (
    <Section tone="dark">
      <div className="grid min-w-0 gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center [&>*]:min-w-0">
        <div>
          <SectionHead number={number} eyebrow="What good looks like" title="One screen the whole business" em="can agree on." intro="Not a demo of a product — there isn't one. This is the kind of view we build on top of the tools you already have, refreshed without anyone touching a spreadsheet." />
          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <span>{String(i + 1).padStart(2, "0")} / 0{scenes.length}</span>
            {scenes.map((_, k) => (
              <button key={k} type="button" aria-label={`Show ${scenes[k].title}`} onClick={() => setI(k)} className="relative h-0.5 w-9 overflow-hidden rounded bg-line">
                {k === i && !paused && <span key={`${i}`} className="absolute inset-0 origin-left bg-gold" style={{ animation: `fill ${SCENE_MS}ms linear forwards` }} />}
                {k === i && paused && <span className="absolute inset-0 bg-gold" />}
              </button>
            ))}
            <span className="ml-1">Up next: {scenes[(i + 1) % scenes.length].title.split(" · ")[1]}</span>
            <button type="button" onClick={() => setPaused((p) => !p)} className="ml-auto rounded border border-line px-2 py-0.5 uppercase tracking-[0.1em] hover:border-accent">{paused ? "▶ Play" : "❚❚ Pause"}</button>
          </div>
        </div>

        {/* Carousel: active card in view, next cards peeking to the right */}
        <div className="relative min-w-0 md:-mr-[20vw]">
          <div className="md:w-[calc(100%-20vw)]"><Circuit labels={s.sources} dir="in" seed={i} /></div>
          <div className="overflow-hidden">
            <div className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ transform: `translateX(calc(${-i} * (100% - 20vw + 1.5rem)))` }}>
              {scenes.map((sc, k) => (
                <div
                  key={sc.title}
                  role={k === i ? undefined : "button"}
                  tabIndex={k === i ? -1 : 0}
                  aria-label={k === i ? undefined : `Show ${sc.title}`}
                  onClick={() => k !== i && setI(k)}
                  onKeyDown={(e) => { if (k !== i && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setI(k); } }}
                  className={`w-full shrink-0 md:w-[calc(100%-20vw)] ${k === i ? "" : "cursor-pointer opacity-45 transition hover:opacity-80 focus:outline-none focus-visible:opacity-90"}`}
                  style={{ transition: "opacity .6s" }}
                >
                  <DashboardCard s={sc} live={k === i && live} />
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-[calc(100%-20vw)]"><Circuit labels={s.outputs} dir="out" seed={i + 1} /></div>
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
    <Section tone="gold">
      <SectionHead number={number} eyebrow="The arithmetic" title="What is manual reporting" em="actually costing you?" />
      <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start">
        <div className="grid gap-5">
          {([["People involved in producing reports", p, setP, 1, 15, 1, (v: number) => String(v)], ["Hours each spends per month on it", h, setH, 2, 60, 1, (v: number) => String(v)], ["Average loaded hourly cost", c, setC, 15, 120, 5, (v: number) => "£" + v]] as const).map(([label, val, set, min, max, step, show]) => (
            <label key={label} className="grid gap-2 text-sm text-muted">
              <span className="flex justify-between font-medium text-ink">{label}<span className="font-mono">{show(val)}</span></span>
              <input type="range" min={min} max={max} step={step} value={val} onChange={(e) => set(+e.target.value)} className="w-full accent-gold" />
            </label>
          ))}
          <p className="text-xs text-muted">Estimates are fine. Most owners underestimate the hours by half.</p>
        </div>
        <div className="rounded-md border border-line bg-paper p-6">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">Cost of producing reports</p>
          <p className="mt-2 font-display text-5xl tabular-nums text-ink">{fmt(yr)}<span className="font-sans text-base text-muted"> / year</span></p>
          <div className="mt-4 h-2 overflow-hidden rounded bg-line"><div className="h-full rounded bg-gold transition-all" style={{ width: `${Math.min(100, (yr / 120000) * 100)}%` }} /></div>
          <p className="mt-4 border-t border-line pt-4 text-sm text-muted">That&apos;s <b className="text-ink">{x.toFixed(x < 10 ? 1 : 0)}×</b> the price of a Reporting Assessment — before counting a single bad decision made on a wrong number.</p>
          <Link href="/services/data-bi" className="mt-5 inline-flex rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-ink hover:bg-gold-strong">See what the Reporting Assessment covers →</Link>
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

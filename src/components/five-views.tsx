"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Section 03 of the Data & BI page: five owner questions down the left, the dashboard that answers
   the selected one on the right. Autoplays (6s per view) with a progress rail; click to jump.
   Figures are illustrative and labelled as such. */

const STEP_MS = 6000;

function Kpi({ l, v, d, down }: { l: string; v: string; d: string; down?: boolean }) {
  return (
    <div className="bg-[#17161f] px-3 py-2.5">
      <small className="block font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/50">{l}</small>
      <b className="mt-0.5 block font-display text-[21px] font-normal leading-none">{v}</b>
      <i className={`text-[9.5px] not-italic ${down ? "text-[#ffb37f]" : "text-[#7fd1a5]"}`}>{d}</i>
    </div>
  );
}
const Cap = ({ children }: { children: ReactNode }) => <p className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-white/50">{children}</p>;

function Line({ pts }: { pts: number[] }) {
  const w = 300, h = 52, max = Math.max(...pts), min = Math.min(...pts);
  const xy = pts.map((p, i) => [(i / (pts.length - 1)) * w, h - ((p - min) / (max - min || 1)) * (h - 8) - 4]);
  const d = xy.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const last = xy[xy.length - 1];
  return <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block h-[52px] w-full"><path d={d} fill="none" stroke="#ffc93c" strokeWidth="2" /><circle cx={last[0]} cy={last[1]} r="3.5" fill="#ffc93c" /></svg>;
}

type View = { name: string; q: string; detail: string; panel: ReactNode };

const views: View[] = [
  { name: "Cash & runway", q: "How long have we got, and what is coming in this month?", detail: "Bank balances, debtors by age, committed costs, 13-week cash view.", panel: <>
    <div className="grid grid-cols-4 gap-px bg-white/10"><Kpi l="Bank today" v="£214k" d="+£31k wk" /><Kpi l="Due in 30d" v="£96k" d="14 invoices" /><Kpi l="Committed out" v="£142k" d="payroll 28th" down /><Kpi l="Runway" v="7.4 mo" d="+0.6" /></div>
    <div className="px-3.5 pb-2 pt-3"><Cap>13-week cash position</Cap><div className="flex h-16 items-end gap-1">{[62, 70, 58, 66, 74, 80, 72, 78, 86, 82, 90, 94, 98].map((h, i) => <i key={i} className={`flex-1 rounded-t-sm ${i > 8 ? "bg-white/20" : "bg-[#ffc93c]"}`} style={{ height: `${h}%` }} />)}</div></div>
    <div className="px-3.5 pb-3 pt-2"><Cap>Debtors by age</Cap><div className="grid gap-1.5">{([["0–30d", 100, "£127k"], ["31–60d", 48, "£61k"], ["61–90d", 30, "£38k"], ["90d+", 18, "£23k"]] as const).map(([n, w, v], i) => <div key={n} className="grid grid-cols-[48px_1fr_40px] items-center gap-2 font-mono text-[8px] text-white/70"><span>{n}</span><span className={`h-2 rounded-sm ${i > 1 ? "bg-[#ffb37f]" : "bg-[#ffc93c]"}`} style={{ width: `${w}%` }} /><b className="text-right font-normal text-white">{v}</b></div>)}</div></div>
    <div className="mt-auto flex justify-between border-t border-white/10 bg-[#ffc93c]/10 px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.08em] text-[#ffc93c]"><span>✓ Reconciled to Xero · 06:02</span><span>Debtors &gt; 60d: £61k</span></div>
  </> },
  { name: "Margin by client, product or job", q: "Which customers are actually worth having?", detail: "Revenue, direct cost and contribution per client, product line or job — ranked.", panel: <>
    <div className="grid grid-cols-3 gap-px bg-white/10"><Kpi l="Gross margin" v="38.2%" d="+1.4 pts" /><Kpi l="Top 5 clients" v="61%" d="of contribution" /><Kpi l="Below 20%" v="4 clients" d="£88k revenue" down /></div>
    <div className="px-3.5 pb-3 pt-3"><Cap>Contribution margin, ranked</Cap><div className="grid gap-1.5">{([["Acme", 92, "52%"], ["Birch", 80, "47%"], ["Cole", 70, "41%"], ["Dunn", 52, "31%"], ["Ealing", 30, "18%"], ["Fox", 14, "9%"]] as const).map(([n, w, p]) => <div key={n} className="grid grid-cols-[56px_1fr_36px] items-center gap-2 font-mono text-[8px] text-white/70"><span>{n}</span><span className={`h-2 rounded-sm ${w < 35 ? "bg-[#ffb37f]" : "bg-[#ffc93c]"}`} style={{ width: `${w}%` }} /><b className="text-right font-normal text-white">{p}</b></div>)}</div></div>
    <div className="mt-auto flex justify-between border-t border-white/10 bg-[#ffc93c]/10 px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.08em] text-[#ffc93c]"><span>✓ Costs allocated from timesheets</span><span>Updated nightly</span></div>
  </> },
  { name: "Sales pipeline & forecast", q: "What will we invoice in 90 days, honestly?", detail: "Weighted pipeline by stage and source, win rate, stalled deals, forecast vs actual.", panel: <>
    <div className="grid grid-cols-4 gap-px bg-white/10"><Kpi l="Open pipeline" v="£1.2m" d="48 deals" /><Kpi l="Weighted 90d" v="£386k" d="+£34k" /><Kpi l="Win rate" v="31%" d="+3 pts" /><Kpi l="Stalled > 30d" v="9" d="£212k" down /></div>
    <div className="grid grid-cols-2 gap-4 px-3.5 pb-3 pt-3">
      <div><Cap>By stage</Cap><div className="grid gap-1">{([["Qualified £520k", 100], ["Proposal £410k", 78], ["Negotiation £190k", 50], ["Verbal £80k", 30]] as const).map(([t, w]) => <div key={t} className="mx-auto flex h-3.5 items-center justify-center rounded-sm bg-[#ffc93c] font-mono text-[7px] text-[#17161f]" style={{ width: `${w}%` }}>{t}</div>)}</div></div>
      <div><Cap>Forecast vs actual, 6 mo</Cap><div className="flex h-[68px] items-end gap-1">{[60, 70, 55, 80, 75, 90].map((h, i) => <span key={i} className="contents"><i className="flex-1 rounded-t-sm bg-[#ffc93c]" style={{ height: `${h}%` }} /><i className="flex-1 rounded-t-sm bg-white/20" style={{ height: `${h - 8}%` }} /></span>)}</div></div>
    </div>
    <div className="mt-auto flex justify-between border-t border-white/10 bg-[#ffc93c]/10 px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.08em] text-[#ffc93c]"><span>✓ Pulled from your CRM</span><span>Refreshed hourly</span></div>
  </> },
  { name: "Operations & utilisation", q: "Where is the team's time going?", detail: "Billable vs non-billable, capacity by person, job cost-to-complete.", panel: <>
    <div className="grid grid-cols-3 gap-px bg-white/10"><Kpi l="Billable" v="71%" d="target 75%" /><Kpi l="Capacity next 2 wks" v="340 h" d="of 480" /><Kpi l="Jobs over budget" v="3" d="£14k exposure" down /></div>
    <div className="px-3.5 pb-3 pt-3"><Cap>Utilisation by person × week</Cap><div className="grid grid-cols-10 gap-1">{Array.from({ length: 40 }, (_, i) => <i key={i} className="h-3.5 rounded-sm bg-[#ffc93c]" style={{ opacity: 0.25 + ((i * 7) % 10) / 12 }} />)}</div></div>
    <div className="px-3.5 pb-3"><Cap>Jobs over budget</Cap><div className="grid gap-1.5">{([["Riverside fit-out", 112, "+£6.1k"], ["Acme retainer Q4", 108, "+£4.4k"], ["Birch rebrand", 104, "+£3.2k"]] as const).map(([n, pct, d]) => <div key={n} className="grid grid-cols-[110px_1fr_40px] items-center gap-2 font-mono text-[8px] text-white/70"><span className="truncate">{n}</span><span className="relative h-2 rounded-sm bg-white/15"><span className="absolute inset-y-0 left-0 rounded-sm bg-[#ffb37f]" style={{ width: `${Math.min(100, pct)}%` }} /></span><b className="text-right font-normal text-[#ffb37f]">{d}</b></div>)}</div></div>
    <div className="mt-auto flex justify-between border-t border-white/10 bg-[#ffc93c]/10 px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.08em] text-[#ffc93c]"><span>✓ From timesheets + job costing</span><span>12 people</span></div>
  </> },
  { name: "The board pack", q: "One page, on the 3rd of the month, without anyone compiling it.", detail: "Headline KPIs, variance to plan, the three things that need a decision.", panel: <>
    <div className="grid grid-cols-4 gap-px bg-white/10"><Kpi l="Revenue" v="£412k" d="+6% vs plan" /><Kpi l="Gross margin" v="38.2%" d="+1.4 pts" /><Kpi l="Cash" v="£214k" d="7.4 mo" /><Kpi l="Pipeline 90d" v="£386k" d="+£34k" /></div>
    <div className="grid grid-cols-[1.2fr_1fr] gap-4 px-3.5 pb-3 pt-3">
      <div><Cap>Revenue vs plan, 12 mo</Cap><Line pts={[31, 34, 33, 37, 40, 39, 43, 45, 44, 48, 51, 53]} /></div>
      <div><Cap>Needs a decision</Cap><ul className="m-0 list-none p-0 text-[9px]">{[["Fox — margin 9%, re-price or exit", true], ["Hire #13 — capacity 70% booked", false], ["Debtors > 60d up £18k", true]].map(([t, r]) => <li key={t as string} className="flex justify-between gap-2 border-b border-white/10 py-1"><span>{t}</span><span className={r ? "text-[#ffb37f]" : "text-[#7fd1a5]"}>●</span></li>)}</ul></div>
    </div>
    <div className="px-3.5 pb-3"><Cap>Variance to plan</Cap><div className="grid gap-1.5">{([["Revenue", 62, "+6%"], ["Gross margin", 56, "+1.4 pts"], ["Overheads", 44, "−2%"], ["Cash", 58, "+£18k"]] as const).map(([n, w, d]) => <div key={n} className="grid grid-cols-[72px_1fr_44px] items-center gap-2 font-mono text-[8px] text-white/70"><span>{n}</span><span className="relative h-2 rounded-sm bg-white/15"><span className="absolute inset-y-0 left-1/2 h-full rounded-sm bg-[#ffc93c]" style={{ width: `${Math.abs(w - 50)}%`, transform: w < 50 ? "translateX(-100%)" : undefined }} /></span><b className="text-right font-normal text-white">{d}</b></div>)}</div></div>
    <div className="mt-auto flex justify-between border-t border-white/10 bg-[#ffc93c]/10 px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.08em] text-[#ffc93c]"><span>✓ All figures reconciled</span><span>Generated 3 Oct 06:02</span></div>
  </> },
];

export function FiveViews() {
  const [cur, setCur] = useState(0);
  const [tick, setTick] = useState(0); // restarts the autoplay rail
  const [mode, setMode] = useState<"scroll" | "auto" | "static">("auto");
  const tall = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLElement>(null);
  const curRef = useRef(0);
  const visible = useRef(false);

  // Desktop: scroll-driven. Mobile: autoplay. Reduced motion: static tabs.
  useEffect(() => {
    const pick = () => setMode(matchMedia("(prefers-reduced-motion: reduce)").matches ? "static" : matchMedia("(min-width: 768px)").matches ? "scroll" : "auto");
    pick(); window.addEventListener("resize", pick); return () => window.removeEventListener("resize", pick);
  }, []);

  // Scroll mode: rAF-throttled; the rail is driven directly (no re-render), React state only changes on step change.
  useEffect(() => {
    if (mode !== "scroll") return;
    const el = tall.current; if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect(); const total = r.height - window.innerHeight; if (total <= 0) return;
      const p = Math.min(0.9999, Math.max(0, -r.top / total)) * views.length;
      const i = Math.floor(p); const within = p - i;
      if (rail.current) rail.current.style.height = `${Math.max(6, within * 100)}%`;
      if (i !== curRef.current) { curRef.current = i; setCur(i); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [mode]);

  // Autoplay mode (mobile).
  useEffect(() => {
    if (mode !== "auto") return;
    const el = tall.current; if (!el) return;
    const io = new IntersectionObserver((e) => { visible.current = e[0].isIntersecting; }, { threshold: 0.25 }); io.observe(el);
    const t = setInterval(() => { if (visible.current) { setCur((c) => (c + 1) % views.length); setTick((k) => k + 1); } }, STEP_MS);
    return () => { io.disconnect(); clearInterval(t); };
  }, [mode, cur]);

  const go = (i: number) => {
    if (mode === "scroll" && tall.current) {
      const r = tall.current.getBoundingClientRect(); const total = r.height - window.innerHeight;
      window.scrollTo({ top: window.scrollY + r.top + ((i + 0.2) / views.length) * total, behavior: "smooth" }); return;
    }
    setCur(i); setTick((k) => k + 1);
  };
  useEffect(() => { // keep the active pill in view on the mobile strip
    const list = tall.current?.querySelector<HTMLElement>("[role=tablist]"); const tab = list?.children[cur] as HTMLElement | undefined;
    if (list && tab && window.innerWidth < 768) list.scrollTo({ left: tab.offsetLeft - 16, behavior: "smooth" });
  }, [cur]);

  return (
    <div ref={tall} className={mode === "scroll" ? "md:h-[340vh]" : ""}>
      <div className={`mt-12 grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-start md:gap-10 ${mode === "scroll" ? "md:sticky md:top-20" : ""}`}>
        {/* Tabs: fixed height — the description lives under the dashboard so nothing reflows on step change */}
        <div role="tablist" aria-label="Dashboard views" className="flex gap-2 overflow-x-auto pb-2 md:block md:overflow-visible md:pb-0">
          {views.map((v, i) => {
            const on = i === cur;
            return (
              <button key={v.name} role="tab" aria-selected={on} onClick={() => go(i)} className={`relative shrink-0 border-line text-left font-[inherit] max-md:w-[220px] max-md:rounded-md max-md:border max-md:p-4 md:block md:w-full md:border-l-2 md:px-5 md:py-3.5 ${on ? "max-md:border-gold max-md:bg-accent-soft" : ""}`}>
                {on && (
                  <i ref={mode === "scroll" ? rail : undefined} key={mode === "auto" ? tick : "s"} className="absolute left-[-2px] top-0 hidden w-[2px] bg-gold md:block"
                    style={mode === "auto" ? { animation: `fiveviews-rail ${STEP_MS}ms linear forwards` } : { height: mode === "static" ? "100%" : "6%" }} />
                )}
                <span className="block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">0{i + 1} · {v.name}</span>
                <span className={`mt-1 block font-display text-lg font-light italic leading-snug transition-colors duration-300 md:text-xl ${on ? "text-accent" : "text-ink"}`}>{v.q}</span>
              </button>
            );
          })}
        </div>

        {/* Stage: all five cards stacked in one grid cell so the stage keeps the tallest card's height; cards cross-fade on opacity only */}
        <div>
          <div className="grid">
            {views.map((v, i) => (
              <div key={v.name} aria-hidden={i !== cur} className={`col-start-1 row-start-1 flex flex-col overflow-hidden rounded-[10px] border border-[#ffc93c]/25 bg-[#17161f] text-[11px] text-white shadow-[0_40px_80px_-36px_rgba(0,0,0,.6)] transition-opacity duration-500 ease-out ${i === cur ? "opacity-100" : "pointer-events-none opacity-0"}`} style={{ willChange: "opacity" }}>
                <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.1em]"><span><span className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-[#ffc93c]" />{v.name}</span><em className="rounded-[3px] border border-[#ffc93c] px-1.5 py-px text-[9px] not-italic text-[#ffc93c]">example</em></div>
                <div className="flex flex-1 flex-col">{v.panel}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex min-h-[3.5rem] items-start justify-between gap-6">
            <p className="max-w-md text-sm font-light leading-relaxed text-muted">{views[cur].detail}</p>
            {mode === "scroll" && <p className="hidden shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted md:block">{cur + 1} / {views.length}</p>}
          </div>
        </div>
        <style>{`@keyframes fiveviews-rail { from { height: 0 } to { height: 100% } }`}</style>
      </div>
    </div>
  );
}

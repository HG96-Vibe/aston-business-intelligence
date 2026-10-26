"use client";

import { useEffect, useRef, useState } from "react";

/* Data & BI hero visual: a mixed desk (two Excel grids, a CSV, a stale PowerPoint, a sticky note)
   collapses into one charcoal dashboard. Replays every 8s; static end-state under reduced motion. */

const W = 520, H = 440;
const pos: [number, number, number][] = [[0, 0, -5], [300, 10, 4], [20, 170, 2], [310, 190, -3], [170, 330, 3]];

function Xl({ name, rows }: { name: string; rows: string[][] }) {
  return (
    <div className="w-[200px] overflow-hidden rounded-[3px] border border-[#d9d9d9] bg-white text-[8px] text-[#222]">
      <div className="flex items-center gap-1.5 bg-[#1d6f42] px-1.5 py-[3px] font-semibold text-white"><i className="inline-block h-[9px] w-[9px] rounded-[2px] bg-white/90" />{name}</div>
      <table className="w-full border-collapse">
        <tbody>
          <tr>{["", "A", "B", "C"].map((h, i) => <th key={i} className="h-3 border border-[#d9d9d9] bg-[#f3f3f3] text-center text-[7px] font-normal text-[#666]">{h}</th>)}</tr>
          {rows.map((r, i) => (
            <tr key={i}>
              <th className="h-3 border border-[#d9d9d9] bg-[#f3f3f3] text-center text-[7px] font-normal text-[#666]">{i + 1}</th>
              {r.map((c, j) => <td key={j} className={`h-3 whitespace-nowrap border border-[#d9d9d9] px-[3px] ${j > 0 ? "text-right" : ""} ${c.startsWith("#") || c === "85" ? "font-semibold text-[#c00]" : ""}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const before = [
  <Xl key="a" name="Sales_Oct_v3.xlsx" rows={[["Client", "Net", "Gross"], ["Acme", "12,400", "14,880"], ["Cole", "#REF!", "#REF!"], ["Total", "20,550", "24,660"]]} />,
  <pre key="b" className="m-0 w-[190px] overflow-hidden whitespace-pre rounded-[3px] border border-line bg-white px-2 py-1.5 font-mono text-[6.5px] leading-[1.5] text-[#333]">{`pipeline-export-2026-10-23.csv\ndeal_id,stage,amount,close_date\nD-2291,Proposal,18500,2026-11-04\nD-2292,Qualified,7200,\nD-2293,Negotiation,42000,2026-10-31\nD-2294,Proposal,,2026-11-12`}</pre>,
  <div key="c" className="relative aspect-video w-[190px] rounded-[3px] border border-line bg-white px-2.5 py-2 text-[7px]">
    <span className="absolute right-1.5 top-1.5 font-mono text-[6px] text-[#999]">Updated 3 Sep</span>
    <h6 className="mb-1 text-[8px] font-semibold text-[#111]">Revenue vs plan — September</h6>
    <div className="flex h-[38px] items-end gap-1">{[60, 64, 70, 66, 82, 78].map((h, i) => <i key={i} className="flex-1" style={{ height: `${h}%`, background: i % 2 ? "#ed7d31" : "#4472c4" }} />)}</div>
  </div>,
  <Xl key="d" name="Debtors.xlsx" rows={[["Client", "Days", "£"], ["Dunn", "44", "18,200"], ["Fox", "85", "20,100"], ["Total", "", "61,200"]]} />,
  <div key="e" className="h-[92px] w-[100px] bg-[#fff59a] p-2.5 text-[13px] leading-[1.1] text-[#333]" style={{ fontFamily: "var(--font-hand), 'Segoe Print', 'Bradley Hand', cursive" }}>Which revenue number is right??<br /><br />Board 2pm</div>,
];

function Line({ pts }: { pts: number[] }) {
  const w = 300, h = 70, max = Math.max(...pts), min = Math.min(...pts);
  const xy = pts.map((p, i) => [(i / (pts.length - 1)) * w, h - ((p - min) / (max - min || 1)) * (h - 8) - 4]);
  const d = xy.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const last = xy[xy.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block h-[70px] w-full">
      {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="rgba(255,255,255,.1)" />)}
      <path d={d} fill="none" stroke="#ffc93c" strokeWidth="2" />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill="#ffc93c" />
    </svg>
  );
}

function After() {
  const kpis = [["Revenue MTD", "£412k", "+6.1% vs plan", false], ["Gross margin", "38.2%", "+1.4 pts", false], ["Cash runway", "7.4 mo", "+0.6", false], ["Debtors > 60d", "£61k", "−£18k", true]] as const;
  const bars = [["Acme", 92], ["Birch", 80], ["Cole", 72], ["Dunn", 60], ["Ealing", 46], ["Fox", 34]] as const;
  return (
    <div className="w-[470px] overflow-hidden rounded-[10px] border border-[#ffc93c]/25 bg-[#17161f] text-[11px] text-white shadow-[0_40px_80px_-36px_rgba(0,0,0,.6)]">
      <div className="flex justify-between border-b border-white/10 px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.1em]"><span><span className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-[#ffc93c]" />Finance · month-end</span><em className="rounded-[3px] border border-[#ffc93c] px-1.5 py-px text-[9px] not-italic text-[#ffc93c]">example</em></div>
      <div className="grid grid-cols-4 gap-px bg-white/10">
        {kpis.map(([l, v, d, down]) => (
          <div key={l} className="bg-[#17161f] px-3 py-2.5"><small className="block font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/50">{l}</small><b className="mt-0.5 block font-display text-[22px] font-normal leading-none">{v}</b><i className={`text-[9.5px] not-italic ${down ? "text-[#ffb37f]" : "text-[#7fd1a5]"}`}>{d}</i></div>
        ))}
      </div>
      <div className="border-t border-white/10 px-3.5 pb-1 pt-3"><p className="mb-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/50">Revenue, last 12 months</p><Line pts={[31, 34, 33, 37, 40, 39, 43, 45, 44, 48, 51, 53]} /></div>
      <div className="px-3.5 pb-2 pt-1"><p className="mb-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/50">Margin by client, top 6</p>
        <div className="flex h-14 items-end gap-1.5">{bars.map(([, h], i) => <i key={i} className="flex-1 rounded-t-sm bg-[#ffc93c]" style={{ height: `${h}%`, opacity: 1 - i * 0.12 }} />)}</div>
        <div className="flex gap-1.5">{bars.map(([n]) => <span key={n} className="flex-1 text-center font-mono text-[6.5px] uppercase text-white/50">{n}</span>)}</div>
      </div>
      <div className="flex justify-between border-t border-white/10 bg-[#ffc93c]/10 px-3.5 py-2 font-mono text-[8.5px] uppercase tracking-[0.08em] text-[#ffc93c]"><span>✓ Reconciled to Xero · 06:02</span><span>14 / 14 tie back</span></div>
    </div>
  );
}

export function SheetsToScreen() {
  const [go, setGo] = useState(false);
  const [scale, setScale] = useState(1);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1.15, el.clientWidth / W)));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setGo(true); return; }
    let t: ReturnType<typeof setTimeout>;
    const play = () => { setGo(false); t = setTimeout(() => setGo(true), 1200); };
    play();
    const iv = setInterval(play, 8000);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, []);

  return (
    <div ref={wrap} className="mx-auto w-full max-w-[600px] overflow-hidden" style={{ height: H * scale }} aria-hidden="true">
      <div className="relative origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        {before.map((node, i) => {
          const [x, y, r] = pos[i];
          return (
            <div key={i} className="absolute shadow-[0_18px_40px_-22px_rgba(0,0,0,.4)]" style={{ left: x, top: y, transform: go ? `translate(${230 - x}px, ${180 - y}px) scale(.5) rotate(0deg)` : `rotate(${r}deg)`, opacity: go ? 0 : 1, transition: `transform 1.2s cubic-bezier(.2,.8,.2,1) ${i * 0.05}s, opacity 1.2s ${i * 0.05}s` }}>
              {node}
            </div>
          );
        })}
        <div className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%,-50%) scale(${go ? 1 : 0.92})`, opacity: go ? 1 : 0, transition: "transform 1s cubic-bezier(.2,.8,.2,1) .9s, opacity 1s .9s" }}>
          <After />
        </div>
      </div>
    </div>
  );
}

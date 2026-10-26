"use client";

import { useEffect, useRef, useState } from "react";

/* Hero visual for Data & BI: seven scattered spreadsheets collapse into one reconciled card.
   Replays every 7s; static end-state under prefers-reduced-motion. */
const files = ["Sales_Oct_v3.xlsx", "Margin_calc.xlsx", "Debtors.xlsx", "Pipeline export.csv", "Costs (Jo).xlsx", "Board pack.pptx", "FINAL_FINAL.xlsx"];
const pos: [number, number, number][] = [[0, 0, -6], [200, 20, 4], [40, 120, 3], [230, 150, -3], [0, 240, 5], [210, 260, -4], [110, 70, 2]];

export function SheetsToScreen() {
  const [go, setGo] = useState(false);
  const [scale, setScale] = useState(1);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1.4, el.clientWidth / 440)));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setGo(true); return; }
    let t1: ReturnType<typeof setTimeout>;
    const play = () => { setGo(false); t1 = setTimeout(() => setGo(true), 700); };
    play();
    const iv = setInterval(play, 7000);
    return () => { clearInterval(iv); clearTimeout(t1); };
  }, []);

  return (
    <div ref={wrap} className="mx-auto w-full max-w-[620px] overflow-hidden" style={{ height: 360 * scale }} aria-hidden="true">
    <div className="relative h-[360px] w-[440px] origin-top-left" style={{ transform: `scale(${scale})` }}>
      {files.map((n, i) => {
        const [x, y, r] = pos[i];
        return (
          <div
            key={n}
            className="absolute w-[210px] rounded-md border border-line bg-paper p-2.5 text-[10px] text-muted shadow-[0_14px_30px_-20px_rgba(0,0,0,.35)]"
            style={{
              left: x, top: y,
              transform: go ? `translate(${180 - x}px, ${160 - y}px) scale(.6) rotate(0deg)` : `rotate(${r}deg)`,
              opacity: go ? 0 : 1,
              transition: `transform 1.2s cubic-bezier(.2,.8,.2,1) ${i * 0.05}s, opacity 1.2s ${i * 0.05}s`,
            }}
          >
            <b className="mb-1.5 block font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-ink">{n}</b>
            {[0, 1, 2].map((k) => (
              <div key={k} className="mt-1 grid grid-cols-3 gap-1">{[0, 1, 2].map((j) => <i key={j} className="block h-[5px] rounded-sm bg-line" />)}</div>
            ))}
          </div>
        );
      })}
      <div
        className="absolute left-1/2 top-1/2 w-[300px] overflow-hidden rounded-lg border border-line bg-paper text-xs shadow-[0_30px_60px_-30px_rgba(0,0,0,.3)]"
        style={{ transform: `translate(-50%,-50%) scale(${go ? 1 : 0.9})`, opacity: go ? 1 : 0, transition: "transform 1s cubic-bezier(.2,.8,.2,1) .9s, opacity 1s .9s" }}
      >
        <div className="flex justify-between border-b border-line px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink"><span>Finance · month-end</span><span className="text-accent">live</span></div>
        <div className="grid grid-cols-2 gap-px bg-line">
          {[["Revenue MTD", "£412k"], ["Gross margin", "38.2%"], ["Cash runway", "7.4 mo"], ["Debtors > 60d", "£61k"]].map(([l, v]) => (
            <div key={l} className="bg-paper px-3.5 py-2.5"><small className="block font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{l}</small><b className="font-display text-[22px] font-normal text-ink">{v}</b></div>
          ))}
        </div>
        <div className="bg-paper-dim px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">✓ Reconciled to Xero · 06:02</div>
      </div>
    </div>
    </div>
  );
}

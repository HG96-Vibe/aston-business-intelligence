/* "Works with" strip: third-party logos in their own colours, backgrounds removed, one optical height.
   Night variants flip black wordmark text to off-white so Power BI / Tableau stay legible in dark mode. */

const TOOLS: { id: string; name: string; w: number; h?: number }[] = [
  { id: "power-bi", name: "Power BI", w: 588, h: 34 },
  { id: "excel", name: "Microsoft Excel", w: 172, h: 40 },
  { id: "xero", name: "Xero", w: 593, h: 30 },
  { id: "sage", name: "Sage", w: 284, h: 34 },
  { id: "hubspot", name: "HubSpot", w: 563, h: 32 },
  { id: "sql-server", name: "SQL Server", w: 128, h: 40 },
  { id: "mysql", name: "MySQL", w: 236, h: 42 },
  { id: "python", name: "Python", w: 160, h: 40 },
  { id: "tableau", name: "Tableau", w: 279, h: 42 },
];

export function ToolStrip() {
  return (
    <div className="mt-14 border-t border-line pt-8">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">Works with</p>
      <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-7 md:justify-between">
        {TOOLS.map((t) => {
          const h = t.h ?? 26, w = Math.round((t.w / 160) * h);
          return (
            <li key={t.id} className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/brand/tools/${t.id}.png`} alt={t.name} title={t.name} width={w} height={h} className="logo-day block" style={{ height: h, width: w }} loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/brand/tools/${t.id}-dark.png`} alt={t.name} title={t.name} width={w} height={h} className="logo-night block" style={{ height: h, width: w }} loading="lazy" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

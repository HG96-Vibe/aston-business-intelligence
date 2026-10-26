/* "Works with" strip: third-party logos rendered as single-colour masks in the page's ink colour,
   one optical height, muted until hover. Masks live in /public/brand/tools (alpha-only PNGs). */

const TOOLS: { id: string; name: string; w: number; h?: number }[] = [
  { id: "power-bi", name: "Power BI", w: 588 },
  { id: "excel", name: "Microsoft Excel", w: 143, h: 30 },
  { id: "xero", name: "Xero", w: 593, h: 22 },
  { id: "sage", name: "Sage", w: 284 },
  { id: "hubspot", name: "HubSpot", w: 563, h: 24 },
  { id: "sql-server", name: "SQL Server", w: 128, h: 30 },
  { id: "mysql", name: "MySQL", w: 236, h: 32 },
  { id: "python", name: "Python", w: 160, h: 30 },
  { id: "tableau", name: "Tableau", w: 279, h: 32 },
];

export function ToolStrip() {
  return (
    <div className="mt-14 border-t border-line pt-8">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">Works with</p>
      <ul className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-6 md:justify-between">
        {TOOLS.map((t) => {
          const h = t.h ?? 26;
          return (
            <li key={t.id} className="flex items-center">
              <span
                role="img"
                aria-label={t.name}
                title={t.name}
                className="block bg-ink opacity-55 transition-opacity hover:opacity-100"
                style={{ height: h, width: (t.w / 160) * h, WebkitMaskImage: `url(/brand/tools/${t.id}.png)`, maskImage: `url(/brand/tools/${t.id}.png)`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

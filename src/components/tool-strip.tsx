/* "Works with" marquee: third-party logos in their own colours (backgrounds removed), one optical
   height, sliding slowly left in an infinite loop. Pauses on hover; edges fade into the page.
   Night variants have dark wordmark text lightened. Reduced motion → static wrapping row.
   To add a logo: drop <id>.png and <id>-dark.png (160px tall, transparent) into /public/brand/tools
   and add a line below. */

const TOOLS: { id: string; name: string; w: number; h: number }[] = [
  { id: "power-bi", name: "Power BI", w: 588, h: 34 },
  { id: "excel", name: "Microsoft Excel", w: 172, h: 40 },
  { id: "xero", name: "Xero", w: 593, h: 30 },
  { id: "sage", name: "Sage", w: 284, h: 44 },
  { id: "hubspot", name: "HubSpot", w: 563, h: 40 },
  { id: "sql-server", name: "SQL Server", w: 128, h: 52 },
  { id: "mysql", name: "MySQL", w: 236, h: 56 },
  { id: "python", name: "Python", w: 160, h: 52 },
  { id: "tableau", name: "Tableau", w: 279, h: 56 },
];

const LOOP_S = 40;

function Logos({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-x-16 pr-16 motion-reduce:flex-wrap motion-reduce:gap-y-7 motion-reduce:pr-0">
      {TOOLS.map((t) => {
        const w = Math.round((t.w / 160) * t.h);
        return (
          <li key={t.id} className="flex shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/brand/tools/${t.id}.png`} alt={ariaHidden ? "" : t.name} title={t.name} width={w} height={t.h} className="logo-day block" style={{ height: t.h, width: w }} loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/brand/tools/${t.id}-dark.png`} alt={ariaHidden ? "" : t.name} title={t.name} width={w} height={t.h} className="logo-night block" style={{ height: t.h, width: w }} loading="lazy" />
          </li>
        );
      })}
    </ul>
  );
}

export function ToolStrip() {
  return (
    <div className="mt-14 border-t border-line pt-8">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">Works with</p>
      <div className="group relative mt-6 overflow-hidden motion-safe:[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max motion-safe:animate-[toolstrip_var(--loop)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-full" style={{ ["--loop" as string]: `${LOOP_S}s` }}>
          <Logos />
          <div className="motion-reduce:hidden"><Logos ariaHidden /></div>
        </div>
      </div>
      <style>{`@keyframes toolstrip { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

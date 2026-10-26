/* Tooling diagram: the client's systems → one data model → Power BI. Gold pulses flow left to right
   (same trace animation as the home carousel circuits). Pure SVG + CSS, no client JS needed. */

const SOURCES: [string, string][] = [
  ["Xero · Sage · QuickBooks", "accounts"],
  ["HubSpot / your CRM", "pipeline"],
  ["Timesheets · SQL Server", "operations"],
  ["Excel · Google Sheets", "the rest"],
];

export function ToolHub() {
  const label = "fill-muted font-mono text-[8px] uppercase";
  return (
    <div className="w-full">
      <svg viewBox="0 0 560 300" className="block w-full overflow-visible" role="img" aria-label="Your existing systems feed one documented data model, which your team opens in Power BI">
        <text x="0" y="14" className={label} style={{ letterSpacing: "1.2px" }}>You already have</text>
        <text x="222" y="14" className={label} style={{ letterSpacing: "1.2px" }}>We build</text>
        <text x="430" y="14" className={label} style={{ letterSpacing: "1.2px" }}>Your team opens</text>

        {SOURCES.map(([name, kind], i) => {
          const y = 40 + i * 68;
          const d = `M170 ${y + 24} C 200 ${y + 24}, 200 165, 222 165`;
          return (
            <g key={name}>
              <rect x="0" y={y} width="170" height="48" rx="6" className="fill-paper stroke-line" strokeWidth="1.5" />
              <text x="12" y={y + 21} className="fill-ink font-sans text-[12.5px]">{name}</text>
              <text x="12" y={y + 37} className={label} style={{ letterSpacing: "1.2px" }}>{kind}</text>
              <path d={d} fill="none" className="stroke-line" strokeWidth="1.5" />
              <path d={d} fill="none" className="stroke-gold motion-safe:animate-[trace_5.5s_linear_infinite]" strokeWidth="2" strokeDasharray="22 400" style={{ animationDelay: `${i * -1.3}s` }} />
            </g>
          );
        })}

        <rect x="222" y="100" width="150" height="130" rx="8" className="fill-accent-soft stroke-gold" strokeWidth="1.5" />
        <text x="297" y="150" textAnchor="middle" className="fill-ink font-sans text-[12.5px]">One data</text>
        <text x="297" y="168" textAnchor="middle" className="fill-ink font-sans text-[12.5px]">model</text>
        <text x="297" y="196" textAnchor="middle" className="fill-accent font-mono text-[8px] uppercase" style={{ letterSpacing: "0.8px" }}>dbt · SQL · documented</text>

        <path d="M372 165 H430" fill="none" className="stroke-line" strokeWidth="1.5" />
        <path d="M372 165 H430" fill="none" className="stroke-gold motion-safe:animate-[trace_5.5s_linear_infinite]" strokeWidth="2" strokeDasharray="22 400" />

        <rect x="430" y="120" width="130" height="90" rx="8" className="fill-ink" />
        <text x="495" y="160" textAnchor="middle" className="fill-paper font-sans text-[12.5px]">Power BI</text>
        <text x="495" y="182" textAnchor="middle" className="fill-gold font-mono text-[8px] uppercase" style={{ letterSpacing: "1.2px" }}>in Microsoft 365</text>
        <text x="430" y="240" className={label} style={{ letterSpacing: "1.2px" }}>or Looker Studio · Tableau</text>
      </svg>
    </div>
  );
}

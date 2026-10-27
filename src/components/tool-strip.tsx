/* "Works with" marquee: third-party logos in their own colours (backgrounds removed), one optical
   height, sliding slowly left in an infinite loop. Pauses on hover; edges fade into the page.
   Night variants have dark wordmark text lightened. Reduced motion → static wrapping rows.
   To add a logo: drop <id>.png and <id>-dark.png (160px tall, transparent) into /public/brand/tools
   and add a line to one of the rows below. `w` is the width at 160px tall; `h` the display height. */

type Tool = { id: string; name: string; w: number; h: number };

/* Row 1 — how we build: BI, data and cloud */
const ROW_BUILD: Tool[] = [
  { id: "power-bi", name: "Power BI", w: 588, h: 34 },
  { id: "tableau", name: "Tableau", w: 279, h: 56 },
  { id: "looker-studio", name: "Looker Studio", w: 371, h: 52 },
  { id: "qlik", name: "Qlik Sense", w: 359, h: 40 },
  { id: "excel", name: "Microsoft Excel", w: 172, h: 40 },
  { id: "google-sheets", name: "Google Sheets", w: 173, h: 56 },
  { id: "sql-server", name: "SQL Server", w: 128, h: 52 },
  { id: "mysql", name: "MySQL", w: 236, h: 56 },
  { id: "postgresql", name: "PostgreSQL", w: 478, h: 40 },
  { id: "bigquery", name: "BigQuery", w: 375, h: 44 },
  { id: "snowflake", name: "Snowflake", w: 160, h: 46 },
  { id: "databricks", name: "Databricks", w: 287, h: 56 },
  { id: "dbt", name: "dbt", w: 419, h: 40 },
  { id: "python", name: "Python", w: 160, h: 52 },
  { id: "azure", name: "Microsoft Azure", w: 555, h: 36 },
  { id: "google-cloud", name: "Google Cloud", w: 1019, h: 32 },
  { id: "aws", name: "AWS", w: 267, h: 48 },
  { id: "microsoft-fabric", name: "Microsoft Fabric", w: 219, h: 56 },
  { id: "power-automate", name: "Power Automate", w: 532, h: 44 },
];

/* Row 2 — what clients already run, and how we deliver */
const ROW_RUN: Tool[] = [
  { id: "xero", name: "Xero", w: 593, h: 30 },
  { id: "sage", name: "Sage", w: 284, h: 44 },
  { id: "quickbooks", name: "QuickBooks", w: 160, h: 46 },
  { id: "hubspot", name: "HubSpot", w: 563, h: 40 },
  { id: "salesforce", name: "Salesforce", w: 228, h: 52 },
  { id: "freeagent", name: "FreeAgent", w: 676, h: 36 },
  { id: "pipedrive", name: "Pipedrive", w: 734, h: 32 },
  { id: "zoho", name: "Zoho", w: 371, h: 56 },
  { id: "shopify", name: "Shopify", w: 552, h: 40 },
  { id: "zapier", name: "Zapier", w: 350, h: 40 },
  { id: "openai", name: "OpenAI", w: 580, h: 40 },
  { id: "claude", name: "Claude", w: 740, h: 36 },
  { id: "copilot", name: "Microsoft Copilot", w: 669, h: 38 },
  { id: "gemini", name: "Google Gemini", w: 710, h: 34 },
  { id: "jira", name: "Jira", w: 486, h: 42 },
  { id: "asana", name: "Asana", w: 243, h: 56 },
  { id: "monday", name: "monday.com", w: 879, h: 30 },
  { id: "ms-project", name: "Microsoft Project", w: 183, h: 48 },
  { id: "confluence", name: "Confluence", w: 1249, h: 30 },
  { id: "miro", name: "Miro", w: 437, h: 44 },
  { id: "visio", name: "Microsoft Visio", w: 349, h: 44 },
];

function Logos({ tools, ariaHidden }: { tools: Tool[]; ariaHidden?: boolean }) {
  return (
    <ul aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-x-16 pr-16 motion-reduce:flex-wrap motion-reduce:gap-y-7 motion-reduce:pr-0">
      {tools.map((t) => {
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

function Row({ tools, loopS, offsetS = 0 }: { tools: Tool[]; loopS: number; offsetS?: number }) {
  return (
    <div className="group relative overflow-hidden motion-safe:[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className="flex w-max motion-safe:animate-[toolstrip_var(--loop)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-full"
        style={{ ["--loop" as string]: `${loopS}s`, animationDelay: `-${offsetS}s` }}
      >
        <Logos tools={tools} />
        <div className="motion-reduce:hidden"><Logos tools={tools} ariaHidden /></div>
      </div>
    </div>
  );
}

/** Two rows, both sliding left, at different speeds so they never line up. */
export function ToolRows() {
  return (
    <div className="grid gap-8">
      <Row tools={ROW_BUILD} loopS={70} />
      <Row tools={ROW_RUN} loopS={48} offsetS={17} />
      <style>{`@keyframes toolstrip { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

/** Data & BI page: "Works with" under the tooling hub. */
export function ToolStrip() {
  return (
    <div className="mt-14 border-t border-line pt-8">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">Works with</p>
      <div className="mt-6"><ToolRows /></div>
    </div>
  );
}

/* "Works with" marquee: third-party logos in their own colours (backgrounds removed), one optical
   height, sliding slowly left in an infinite loop. Pauses on hover; edges fade into the page.
   Reduced motion → static wrapping rows.
   To add a logo: drop <id>.png and <id>-dark.png (160px tall, transparent) into /public/brand/tools
   and add a line to one of the rows below. `w` is the width at 160px tall; `h` the display height. */

type Tool = { id: string; name: string; w: number; h: number };

/* Optical size multiplier for every logo, and the shared scroll speed (both rows move at this). */
const SCALE = 1.3;
const PX_PER_S = 86;
const GAP = 64;
const size = (t: Tool) => { const h = Math.round(t.h * SCALE); return { h, w: Math.round((t.w / 160) * h) }; };
const rowWidth = (tools: Tool[]) => tools.reduce((a, t) => a + size(t).w + GAP, 0);

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
  { id: "dynamics-365", name: "Microsoft Dynamics 365", w: 533, h: 40 },
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
        const { w, h } = size(t);
        return (
          <li key={t.id} className="flex shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/brand/tools/${t.id}.png`} alt={ariaHidden ? "" : t.name} title={t.name} width={w} height={h} className="block" style={{ height: h, width: w }} loading="lazy" />
          </li>
        );
      })}
    </ul>
  );
}

function Row({ tools, offsetS = 0 }: { tools: Tool[]; offsetS?: number }) {
  const loopS = Math.round(rowWidth(tools) / PX_PER_S);
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

/** Two rows, both sliding left at the same speed; the second starts part-way so they never line up.
    Full-bleed: breaks out of the page container to run edge to edge. */
export function ToolRows() {
  return (
    <div className="relative left-1/2 grid w-screen -translate-x-1/2 gap-10">
      <Row tools={ROW_BUILD} />
      <Row tools={ROW_RUN} offsetS={23} />
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

/** Optical display height for a logo at a given scale (1 = marquee size), by tool id. */
const ALL = new Map([...ROW_BUILD, ...ROW_RUN].map((t) => [t.id, t]));
export function toolLogo(id: string, scale = 1) {
  const t = ALL.get(id);
  const h = Math.round((t?.h ?? 40) * scale);
  return { name: t?.name ?? id, h, w: Math.round(((t?.w ?? 160) / 160) * h) };
}

/* Content for the Services page (Chapters layout): photo, steps and tools for each service. */
import { services } from "@/lib/site";
import { offers, serviceOutcomes, subServices } from "@/lib/offers";

export const photo: Record<string, { src: string; pos: string }> = {
  "data-bi": { src: "/img/svc/decision-dashboards.jpg", pos: "center 35%" },
  "business-analysis": { src: "/img/svc/process-requirements.jpg", pos: "center 45%" },
  "ai-consulting": { src: "/img/night-manager.jpg", pos: "center 35%" },
  "project-delivery": { src: "/img/conference.jpg", pos: "center 40%" },
};

export const short: Record<string, string> = {
  "data-bi": "Data & BI",
  "business-analysis": "Business Analysis",
  "ai-consulting": "AI Consulting",
  "project-delivery": "Project Delivery",
};

export const steps: Record<string, [string, string][]> = {
  "data-bi": [
    ["Audit", "Every report, spreadsheet and source, and the decisions they're meant to support."],
    ["Model", "One clean, documented data model that reconciles to your accounts on every refresh."],
    ["Dashboards", "The views that drive decisions, in Power BI, Looker Studio or Tableau, refreshing on their own."],
    ["Hand over", "Training and documentation so your own team can run and extend it."],
  ],
  "business-analysis": [
    ["Map", "Stakeholder interviews and a map of how the work really flows today."],
    ["Define", "Prioritised requirements with acceptance criteria nobody can misread."],
    ["Decide", "Build, buy, configure or do nothing, appraised side by side with costs."],
    ["Specify", "A specification pack any vendor or internal team can price and build."],
  ],
  "ai-consulting": [
    ["Assess", "Your processes, data and risk appetite, reviewed for where AI pays back."],
    ["Shortlist", "Use cases ranked by value, effort and risk, with the top three costed."],
    ["Pilot", "The best one built on a real process, with success measured against a number."],
    ["Govern", "Data handling, UK GDPR, vendor choice and guidance for your staff."],
  ],
  "project-delivery": [
    ["Embed", "A fractional or full-time delivery lead working inside your team."],
    ["Run", "Plan, RAID log, budget tracking and a written steering report every week."],
    ["Hold to account", "Suppliers managed against what they promised, with acceptance testing."],
    ["Land it", "Change management and a clean handover to business-as-usual."],
  ],
};

export const tools: Record<string, string[]> = {
  "data-bi": ["power-bi", "tableau", "looker-studio", "excel", "sql-server", "snowflake", "bigquery", "dbt", "xero", "sage"],
  "business-analysis": ["miro", "visio", "confluence", "jira", "excel", "dynamics-365", "salesforce", "hubspot"],
  "ai-consulting": ["openai", "claude", "copilot", "gemini", "power-automate", "zapier", "python", "azure"],
  "project-delivery": ["jira", "asana", "monday", "ms-project", "confluence", "miro", "excel"],
};

export const svc = services.map((s) => ({
  ...s,
  label: short[s.slug],
  photo: photo[s.slug],
  steps: steps[s.slug],
  tools: tools[s.slug],
  outcomes: serviceOutcomes[s.slug],
  offer: offers.find((o) => o.serviceSlug === s.slug)!,
  subs: subServices.filter((x) => x.category === s.slug),
}));

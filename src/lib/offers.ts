/* ─── Commercial config ───────────────────────────────────────────────────────
   Everything a salesperson might want to change lives here: prices, the booking
   link, the guarantee wording, capacity. Edit this file, push, done.            */

export const commercial = {
  // Honest capacity statement. Shown in the hero and CTA. Keep it true.
  newEngagementsPerMonth: 3,
  // Typical lead time to a first conversation.
  firstCallWithin: "5 working days",
  guarantee: {
    title: "No open-ended bills. No lock-in.",
    body: "Every first engagement is fixed price and fixed scope. If a Reporting Assessment or AI Readiness Assessment concludes that you should not proceed, you still receive a written report you can share with anyone — and the fee is credited against any follow-on project with us within 12 months.",
  },
} as const;

export type Offer = {
  slug: string;
  name: string;
  price: string;       // display string
  duration: string;
  forWho: string;
  youGet: string[];
  outcome: string;
  serviceSlug: string; // links to services[].slug
  featured?: boolean;
};

export const offers: Offer[] = [
  {
    slug: "reporting-assessment",
    name: "Reporting Assessment",
    price: "£2,500",
    duration: "2 weeks",
    forWho: "You have reports, but nobody fully trusts them and month-end takes too long.",
    youGet: [
      "Inventory of every report, spreadsheet and data source in use",
      "Reconciliation of your key numbers back to the accounts",
      "The 10 reports that actually drive decisions — and the 30 that don't",
      "A costed plan to fix it, in priority order",
    ],
    outcome: "Know exactly what's broken, what it costs you, and what to fix first.",
    serviceSlug: "data-bi",
    featured: true,
  },
  {
    slug: "ai-readiness-review",
    name: "AI Readiness Assessment",
    price: "£2,500",
    duration: "2 weeks",
    forWho: "You're being told to 'do something with AI' and want a straight answer on where it pays.",
    youGet: [
      "Process walk-through across the business",
      "Shortlist of AI use cases ranked by value, effort and risk",
      "Data-protection and vendor assessment for the top three",
      "A pilot proposal with success criteria and a price",
    ],
    outcome: "One AI project worth doing, with a number attached — or a clear reason to wait.",
    serviceSlug: "ai-consulting",
  },
  {
    slug: "discovery-scoping",
    name: "Discovery & Scoping",
    price: "from £4,500",
    duration: "2–4 weeks",
    forWho: "You know something needs to change — a system, a process — and need it scoped before anyone quotes.",
    youGet: [
      "Stakeholder interviews and current-state process maps",
      "Prioritised requirements with acceptance criteria",
      "Build / buy / configure options appraisal",
      "A specification pack any vendor can price",
    ],
    outcome: "A project scoped before money is spent, not after.",
    serviceSlug: "business-analysis",
  },
  {
    slug: "fractional-project-lead",
    name: "Fractional Project Lead",
    price: "from £750 / day",
    duration: "1–3 days a week",
    forWho: "A project is live, suppliers are drifting, and nobody internal has the time to own it.",
    youGet: [
      "Plan, RAID log and budget tracking from day one",
      "Weekly written steering report to you",
      "Vendor management and acceptance testing",
      "Handover to business-as-usual when it's done",
    ],
    outcome: "Someone accountable for the finish line, reporting to you every week.",
    serviceSlug: "project-delivery",
  },
];

/* Outcome lines shown under each service card on the home page */
export const serviceOutcomes: Record<string, string[]> = {
  "data-bi": ["Month-end from five days to one", "Margin by client, not just in total", "One set of numbers the whole business trusts"],
  "business-analysis": ["Quotes that don't double halfway through", "Requirements a vendor can't misread", "Projects that start scoped"],
  "ai-consulting": ["Hours back from the tasks that eat your team", "AI on one real problem, with a measured result", "No experiments with customer data"],
  "project-delivery": ["Delivered on the date you told the board", "A weekly report you can forward unedited", "Suppliers held to what they promised"],
};

/* What happens in the first week of any engagement */
/* Week one, told as what you have by Friday and what it costs you */
export const weekOne = {
  youGet: [
    ["A one-page map of your data", "Where it lives, how it flows between systems, and where it breaks."],
    ["Three things we've already found", "In writing. Usually one of them is the reason two reports disagree."],
    ["A clear list of what's next", "The questions for week two, and what we'd need from you to answer them."],
    ["Nothing you have to decide yet", "The costed plan comes at the end of week two. Week one is looking, not selling."],
  ],
  hours: 3,
  costNote: "Spread across the week. No prep, no slides, no disruption to the day job.",
  yourTime: [
    ["Kick-off call, Monday", "1 hr"],
    ["Short chats with your team", "3 × 30 min"],
    ["First findings call, Friday", "30 min"],
  ],
} as const;

/* Honest proof — things that are true today */
export const proof = {
  certifications: ["NVIDIA Certified", "Google Cloud Certified"],
  tools: ["Power BI", "Looker", "Tableau", "SQL", "Python", "dbt", "Google Cloud", "Azure", "Xero", "HubSpot"],
  sectors: 8,
  responseTime: "1 working day",
};

/* ─── Data & BI deep-dive ────────────────────────────────────────────────── */
export const dataBi = {
  pains: [
    ["Month-end is slow and manual", "Numbers pulled from several systems by hand. Days, not hours — and every step can break."],
    ["Nobody fully trusts the numbers", "Two reports, two figures for the same thing. Meetings spent arguing about which is right."],
    ["You can't see where the money is made", "Total margin is known. Margin by client, product or job is not."],
  ],
  ladder: [
    { step: "01", name: "Reporting Assessment", price: "£2,500", duration: "2 weeks", body: "Inventory of every report and data source, reconciliation of your key figures to the accounts, and a costed, prioritised plan. The fee is credited against any of the steps below.", forWho: "Where every client starts." },
    { step: "02", name: "Single Source of Truth", price: "£8,000 – £15,000", duration: "4–6 weeks", body: "Pipelines from your systems into one clean, documented data model that reconciles to the ledger on every refresh. This is the foundation; everything else sits on it.", forWho: "For “two reports, two numbers”." },
    { step: "03", name: "Decision Dashboards", price: "£6,000 – £12,000", duration: "3–4 weeks", body: "The five to ten views that actually drive decisions, built in Power BI on the model above. Designed with the people who will use them, not for them.", forWho: "For “I can't see margin by client”." },
    { step: "04", name: "Managed BI", price: "from £750 / month", duration: "ongoing", body: "We keep it running, add the next question when it comes up, and review the numbers with you monthly. Your team owns it; we maintain it.", forWho: "After go-live." },
  ],
  dashboards: [
    ["Cash & runway", "How long have we got, and what is coming in this month?", "Bank balances, debtors by age, committed costs, 13-week cash view."],
    ["Margin by client, product or job", "Which customers are actually worth having?", "Revenue, direct cost and contribution per client, product line or job — ranked."],
    ["Sales pipeline & forecast", "What will we invoice in 90 days, honestly?", "Weighted pipeline by stage and source, win rate, stalled deals, forecast vs actual."],
    ["Operations & utilisation", "Where is the team's time going?", "Billable vs non-billable, capacity by person, job cost-to-complete."],
    ["The board pack", "One page, on the 3rd of the month, without anyone compiling it.", "Headline KPIs, variance to plan, the three things that need a decision."],
  ],
  reconciliation: [
    ["Revenue", "£412,380", "£412,380", true],
    ["Gross margin", "£157,529", "£157,529", true],
    ["Debtors", "£188,204", "£188,204", true],
    ["Overheads", "£96,110", "£96,110", true],
  ] as [string, string, string, boolean][],
  tools: ["Power BI", "Xero", "Sage", "QuickBooks", "HubSpot", "Google Sheets", "Excel", "SQL Server", "BigQuery", "dbt"],
  // [question, [emphasised short answer, rest of the short line], full answer]
  faqs: [
    ["Which tool will you build in?", ["Power BI", ", by default."], "It is included in most Microsoft 365 plans and your team can learn it. If you already use Looker Studio or Tableau, we build in that. We never resell licences."],
    ["Our data is a mess. Do we need to clean it first?", ["No.", " That is what the Assessment is for."], "Finding and fixing the mess is most of the Assessment. If a source is unusable we will say so in writing and propose the cheapest way to make it usable."],
    ["Will this replace our finance team or our accountant?", ["No.", " It removes the copying, not the people."], "It removes the manual assembly work so they spend their time on judgement rather than copying numbers between spreadsheets."],
    ["How do we know the dashboard is right?", ["It is reconciled", " on every refresh."], "Every refresh is reconciled to your accounting system and the reconciliation is visible on the dashboard. If a number does not tie back, it is flagged — not hidden."],
    ["What happens after you leave?", ["You own it.", " We are optional."], "You receive documentation, a recorded training session, and a defined support window. Managed BI is optional; many clients run it themselves."],
  ] as [string, [string, string], string][],
};

/* Ten services for the home page grid — each maps to an offer or a step in the ladder. */
export type SubService = { slug: string; category: "data-bi" | "business-analysis" | "ai-consulting" | "project-delivery"; name: string; line: string; tag?: string; href: string; image: string; position?: string; duotone?: boolean };
export const subServices: SubService[] = [
  { slug: "reporting-assessment", category: "data-bi", name: "Reporting Assessment", line: "Find out why month-end takes a week.", tag: "2 weeks · £2,500", href: "/services/data-bi#ladder", image: "/img/svc/reporting-assessment.jpg", position: "center 30%" },
  { slug: "single-source-of-truth", category: "data-bi", name: "Single Source of Truth", line: "Two reports, one number — reconciled to the accounts.", tag: "4–6 weeks", href: "/services/data-bi#ladder", image: "/img/streaks.jpg", duotone: false },
  { slug: "decision-dashboards", category: "data-bi", name: "Decision Dashboards", line: "Margin by client, cash, pipeline — on one screen, in Power BI.", tag: "3–4 weeks", href: "/services/data-bi#views", image: "/img/svc/decision-dashboards.jpg" },
  { slug: "managed-bi", category: "data-bi", name: "Managed BI", line: "We maintain it; your team owns it.", tag: "from £750 / month", href: "/services/data-bi#ladder", image: "/img/svc/managed-bi.jpg" },
  { slug: "discovery-scoping", category: "business-analysis", name: "Discovery & Scoping", line: "Requirements and the case for change, before anyone quotes.", tag: "from £4,500", href: "/services#business-analysis", image: "/img/corridor.jpg", position: "center 30%" },
  { slug: "process-requirements", category: "business-analysis", name: "Process Mapping & Requirements", line: "How work actually flows, written so a vendor can't misread it.", href: "/services#business-analysis", image: "/img/svc/process-requirements.jpg", position: "center 12%" },
  { slug: "ai-readiness", category: "ai-consulting", name: "AI Readiness Assessment", line: "Where AI pays back in your business, and where it won't.", tag: "2 weeks · £2,500", href: "/services#ai-consulting", image: "/img/svc/ai-readiness.jpg" },
  { slug: "ai-pilot", category: "ai-consulting", name: "AI Pilot on One Problem", line: "Built on one real process, with the result measured.", href: "/services#ai-consulting", image: "/img/tablet-pair.jpg", position: "center 35%" },
  { slug: "fractional-project-lead", category: "project-delivery", name: "Fractional Project Lead", line: "Delivered on the date you told the board.", tag: "from £750 / day", href: "/services#project-delivery", image: "/img/conference.jpg", position: "center 40%" },
  { slug: "supplier-oversight", category: "project-delivery", name: "Supplier & Vendor Oversight", line: "Holding the people you've already hired to what they promised.", href: "/services#project-delivery", image: "/img/svc/supplier-oversight.jpg", position: "center 40%" },
];
export const categoryLabel: Record<SubService["category"], string> = { "data-bi": "Data & BI", "business-analysis": "Business Analysis", "ai-consulting": "AI Consulting", "project-delivery": "Project Delivery" };

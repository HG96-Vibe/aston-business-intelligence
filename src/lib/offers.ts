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
export const weekOne = [
  ["Day 1", "Kick-off call", "An hour with you and whoever owns the numbers. We agree what 'good' looks like and who we need to talk to."],
  ["Days 2–3", "Access and interviews", "Read-only access to your systems and 30-minute conversations with the people who use them. No disruption."],
  ["Day 4", "Data map", "A one-page picture of where your data lives, how it flows, and where it breaks. You'll recognise it immediately."],
  ["Day 5", "First findings", "A short written note: three things we've already seen, and the questions for week two."],
] as const;

/* Honest proof — things that are true today */
export const proof = {
  certifications: ["NVIDIA Certified", "Google Cloud Certified"],
  tools: ["Power BI", "Looker", "Tableau", "SQL", "Python", "dbt", "Google Cloud", "Azure", "Xero", "HubSpot"],
  sectors: 8,
  responseTime: "1 working day",
};

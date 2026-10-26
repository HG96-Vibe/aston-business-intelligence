export const site = {
  name: "Aston Business Intelligence",
  shortName: "Aston",
  url: "https://astonbusinessintelligence.co.uk",
  description:
    "Aston Business Intelligence helps UK SMEs see their business clearly, decide faster and deliver what they decide — through data analysis, business analysis, AI consulting and project delivery.",
  companyNumber: "15571977",
  // TODO(Hamid): registered office address from Companies House
  registeredOffice: "[Registered office address]",
  emails: {
    hello: "hello@astonbusinessintelligence.co.uk",
    careers: "careers@astonbusinessintelligence.co.uk",
  },
  nav: [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const services = [
  {
    slug: "data-bi",
    title: "Data & Business Intelligence",
    short: "Dashboards, reporting and a single source of truth.",
    problem:
      "The numbers live in six spreadsheets, two systems and one person's head. Month-end takes a week and nobody fully trusts the result.",
    what: [
      "Audit of your current data, reports and the decisions they are meant to support",
      "A clean, documented data model that reconciles to your accounts",
      "Dashboards in Power BI, Looker Studio or Tableau that refresh without manual work",
      "Training so your own team can maintain and extend what we build",
    ],
    outcome: "One place where the whole business looks at the same numbers.",
    entry: "Reporting Health Check — 2 weeks, fixed fee",
  },
  {
    slug: "business-analysis",
    title: "Business Analysis",
    short: "Requirements, process mapping and specs developers can build from.",
    problem:
      "You know something needs to change — a process, a system, a product — but turning that into a plan a supplier can price and build is where projects stall or balloon.",
    what: [
      "Stakeholder interviews and current-state process mapping",
      "Prioritised requirements with clear acceptance criteria",
      "Options appraisal: build, buy, configure or do nothing",
      "A specification pack you can hand to any vendor or internal team",
    ],
    outcome: "A project that is scoped before money is spent, not after.",
    entry: "Discovery & Scoping — 2–4 weeks, fixed fee",
  },
  {
    slug: "ai-consulting",
    title: "AI Consulting",
    short: "Where AI actually saves money in your business — and then building it.",
    problem:
      "Everyone says you should be using AI. Nobody says where, what it costs, or what could go wrong with your customers' data.",
    what: [
      "AI readiness assessment across your processes, data and risk appetite",
      "Shortlist of use cases ranked by value, effort and risk",
      "Pilot build of the top use case with measurable success criteria",
      "Governance: data handling, UK GDPR, vendor selection and staff guidance",
    ],
    outcome: "AI that is deployed on one real problem with a number attached, not a slide deck.",
    entry: "AI Readiness Review — 2 weeks, fixed fee",
  },
  {
    slug: "project-delivery",
    title: "Project Management & Delivery",
    short: "A delivery lead who lands the project on time and on budget.",
    problem:
      "Good plans fail in delivery: suppliers drift, internal teams are stretched, and nobody owns the outcome end-to-end.",
    what: [
      "Fractional or full-time project lead embedded with your team",
      "Plan, RAID log, budget tracking and weekly steering reports",
      "Vendor management and acceptance testing",
      "Change management and handover to business-as-usual",
    ],
    outcome: "Someone accountable for the finish line, reporting to you every week.",
    entry: "Fractional Project Lead — from 1 day/week",
  },
] as const;

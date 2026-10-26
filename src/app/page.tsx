import Link from "next/link";

const services = [
  {
    title: "BI strategy & roadmap",
    body: "Audit what you have, define what decisions need data, and plan the shortest path to dashboards people actually use.",
  },
  {
    title: "Dashboards & reporting",
    body: "Power BI, Looker and Tableau builds with clean models underneath, so numbers reconcile and refresh without babysitting.",
  },
  {
    title: "Data engineering",
    body: "Pipelines, warehousing and modelling — from spreadsheets and SaaS exports to a single trusted source.",
  },
  {
    title: "Analytics & insight",
    body: "Answer the questions behind the KPI: churn, margin, funnel, forecasting — with analysis your team can re-run.",
  },
];

const steps = [
  ["Discovery", "A short, fixed-fee engagement to map your data, decisions and gaps."],
  ["Build", "Models, pipelines and dashboards delivered in two-week increments you can see and test."],
  ["Handover", "Documentation, training and a support window so it keeps working after we leave."],
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className="text-sm font-medium uppercase tracking-wider text-sky-600">
          Business intelligence consultancy · London
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          Turn the data you already have into decisions you can defend.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          We design and build the reporting, models and pipelines that let UK
          businesses stop arguing about the numbers and start acting on them.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/contact"
            className="rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700"
          >
            Book a discovery call
          </Link>
          <Link
            href="/services"
            className="rounded-md border border-slate-300 px-5 py-3 text-sm font-medium hover:bg-slate-50"
          >
            See services
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">What we do</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">How an engagement runs</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map(([title, body], i) => (
            <li key={title} className="rounded-lg border border-slate-200 p-6">
              <span className="text-sm font-medium text-sky-600">0{i + 1}</span>
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Got a reporting problem?</h2>
            <p className="mt-2 text-slate-600">
              Thirty minutes, no pitch deck. We&apos;ll tell you whether we can help.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700"
          >
            Book a call
          </Link>
        </div>
      </section>
    </>
  );
}

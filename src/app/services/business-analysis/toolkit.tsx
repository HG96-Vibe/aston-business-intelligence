"use client";

import { useState, type ReactNode } from "react";

/* "Everything a business analyst produces": five project stages, each with the documents
   that answer the client's question at that stage. The buyer's question leads; the document
   name follows; each document names the ladder stop it comes with. Four have small samples. */

type Doc = { q: string; name: string; line: string; stop: string; sample?: ReactNode };

const Box = ({ t, warn }: { t: string; warn?: boolean }) => <span className={`rounded border px-1.5 py-0.5 text-[0.58rem] ${warn ? "border-[#f0b98c] bg-[#fff6ee] text-[#9a4a12]" : "border-line bg-paper-dim text-ink"}`}>{t}</span>;

const sampleMap = (
  <div>
    <div className="flex flex-wrap items-center gap-1"><Box t="Enquiry" /><span className="text-muted">→</span><Box t="Quote (Excel)" warn /><span className="text-muted">→</span><Box t="Approval" /><span className="text-muted">→</span><Box t="Re-keyed" warn /><span className="text-muted">→</span><Box t="Invoice" /></div>
    <p className="mt-2 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-[#9a4a12]">⚠ 2 hand-offs · 1 re-key</p>
  </div>
);
const sampleReqs = (
  <ul className="grid gap-1 text-[0.58rem]">
    {[["Must", "Quote generated from the price list"], ["Must", "Approval over £10k routed to FD"], ["Should", "Customer sees order status"]].map(([p, t]) => (
      <li key={t} className="flex items-center gap-1.5"><span className={`w-10 shrink-0 rounded px-1 text-center font-mono text-[0.48rem] uppercase ${p === "Must" ? "bg-gold text-[#17161f]" : "bg-paper-dim text-muted"}`}>{p}</span><span className="text-ink">{t}</span></li>
    ))}
  </ul>
);
const sampleOptions = (
  <div className="grid grid-cols-4 gap-1 text-center text-[0.5rem]">
    {([["Build", 52], ["Buy", 78], ["Config", 91], ["Wait", 30]] as const).map(([t, v]) => (
      <div key={t}><div className="flex h-12 items-end rounded bg-paper-dim p-0.5"><div className={`w-full rounded-sm ${v === 91 ? "bg-gold" : "bg-ink/20"}`} style={{ height: `${v}%` }} /></div><p className="mt-0.5 text-ink">{t}</p></div>
    ))}
  </div>
);
const sampleSpec = (
  <div>
    <div className="grid gap-1">{[95, 80, 88, 60].map((w, i) => <span key={i} className="h-1 rounded bg-line" style={{ width: `${w}%` }} />)}</div>
    <p className="mt-2 flex justify-between font-mono text-[0.5rem] uppercase tracking-[0.1em] text-muted"><span>v1.0 · 34 pages</span><span className="text-accent">Signed off</span></p>
  </div>
);

const D = "Discovery & Scoping", O = "Options & Selection", A = "Delivery Assurance", C = "Change & Adoption";

const stages: { n: string; q: string; docs: Doc[] }[] = [
  { n: "Should we do this?", q: "Before anything is committed", docs: [
    { q: "Is it worth the money?", name: "Business case", line: "Costs, benefits, risks and options, with the numbers your board will ask for.", stop: D },
    { q: "Who's affected, and who decides?", name: "Stakeholder map", line: "Everyone the change touches, their influence, and what they need from it.", stop: D },
    { q: "What exactly are we solving?", name: "Problem statement & scope", line: "One page everyone agrees: the problem, what's in, what's out.", stop: D },
  ] },
  { n: "How does it work today?", q: "The current state, as it really is", docs: [
    { q: "Where do time and money leak?", name: "As-is process maps", line: "Every step, hand-off and workaround, mapped with the people who do the work.", stop: D, sample: sampleMap },
    { q: "What goes wrong, and how often?", name: "Pain-point log", line: "Each problem with its cost and frequency, so the fixes can be ranked.", stop: D },
    { q: "What do we already have?", name: "Systems & data inventory", line: "Every system and spreadsheet in the process, and how they connect.", stop: D },
  ] },
  { n: "What do we need?", q: "The future state, agreed before anyone builds", docs: [
    { q: "What must the new way do?", name: "Requirements catalogue", line: "Prioritised (MoSCoW) requirements, each with acceptance criteria nobody can misread.", stop: D, sample: sampleReqs },
    { q: "How should it work?", name: "To-be process maps", line: "The future process, agreed by each team before a line is built.", stop: D },
    { q: "What does each person need?", name: "User stories", line: "Requirements written from the user's side, ready for a development team.", stop: D },
    { q: "What's missing today?", name: "Gap analysis", line: "The difference between as-is and to-be, and what it takes to close it.", stop: D },
  ] },
  { n: "Which option?", q: "Choosing how, and with whom", docs: [
    { q: "Build, buy, configure or wait?", name: "Options appraisal", line: "Each option scored side by side, with costs and risks.", stop: O, sample: sampleOptions },
    { q: "Which pays back fastest?", name: "Cost-benefit analysis", line: "Lifetime cost against benefit for each option, in pounds.", stop: O },
    { q: "Which supplier fits best?", name: "Vendor scoring matrix", line: "Demos run against your requirements, scored the same way for everyone.", stop: O },
    { q: "Can a supplier price it?", name: "Specification pack", line: "Everything agreed so far, in one document any vendor or internal team can quote from.", stop: D, sample: sampleSpec },
  ] },
  { n: "Did it land?", q: "Through the build and after go-live", docs: [
    { q: "Did we build what we asked for?", name: "Traceability matrix", line: "Every requirement traced to its design, build and test.", stop: A },
    { q: "Does it actually work for us?", name: "UAT test scripts", line: "Scripts your team runs before anything is signed off.", stop: A },
    { q: "What changed, and why?", name: "Change request log", line: "Every change to scope, its cost, and who approved it.", stop: A },
    { q: "What did we get for the money?", name: "End-of-project report", line: "Delivered against plan, budget and requirements, in writing.", stop: C },
    { q: "Is it paying back?", name: "Benefits review", line: "The business case benefits, measured after go-live.", stop: C },
    { q: "What do we do better next time?", name: "Lessons learned", line: "What worked and what didn't, written up for the next project.", stop: C },
  ] },
];

export function Toolkit() {
  const [i, setI] = useState(0);
  const s = stages[i];
  return (
    <div className="mt-12">
      {/* Stage rail */}
      <ol className="-mx-[var(--gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0">
        {stages.map((x, k) => (
          <li key={x.n} className="w-[70%] shrink-0 snap-start sm:w-[40%] md:w-auto">
            <button
              type="button"
              onClick={() => setI(k)}
              aria-pressed={i === k}
              className={`h-full w-full rounded-xl border p-4 text-left transition ${i === k ? "border-[#17161f] bg-[#17161f] text-white" : "border-line bg-paper text-ink hover:border-accent"}`}
            >
              <span className={`font-mono text-[0.6rem] uppercase tracking-[0.14em] ${i === k ? "text-[#ffc93c]" : "text-accent"}`}>Stage {k + 1} · {x.docs.length} documents</span>
              <span className="mt-1.5 block font-display text-lg leading-tight">{x.n}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* Documents for the selected stage */}
      <div className="mt-6 rounded-2xl bg-paper-dim p-5 md:p-8">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">{s.q}</p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.docs.map((d) => (
            <li key={d.name} className="flex flex-col rounded-xl bg-paper p-6 shadow-[0_20px_40px_-30px_rgba(23,22,31,.35)]">
              {d.sample && (
                <div className="relative mb-5 rounded-lg border border-line bg-white p-3">
                  <span className="absolute right-2 top-2 rounded border border-accent/50 px-1 font-mono text-[0.45rem] uppercase tracking-[0.12em] text-accent">Sample</span>
                  <div className="pt-3">{d.sample}</div>
                </div>
              )}
              <p className="font-display text-xl italic leading-snug text-accent">{d.q}</p>
              <h3 className="mt-2 text-lg font-medium text-ink">{d.name}</h3>
              <p className="mt-1.5 flex-1 text-sm font-light leading-relaxed text-muted">{d.line}</p>
              <p className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-line px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />Comes with · {d.stop}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

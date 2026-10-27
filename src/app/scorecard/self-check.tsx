"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { questions, score, band, type QuestionId } from "./questions";
import { sendResults } from "./actions";
import type { FormState } from "@/app/contact/actions";
import { SubmitButton } from "@/components/form";
import { bookHref } from "@/components/offers";

type Answers = Partial<Record<QuestionId, boolean>>;

/* The ten areas, filling in as the visitor answers: gold = warning, white = OK, dashed = not yet. */
function Tiles({ answers, onPick }: { answers: Answers; onPick?: (i: number) => void }) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {questions.map((q, i) => {
        const v = answers[q.id];
        const cls = `flex w-full items-center justify-between rounded-md border px-3 py-2.5 text-left text-sm transition ${
          v === true ? "border-gold bg-gold text-[#17161f]" : v === false ? "border-line bg-paper text-ink" : "border-dashed border-line text-muted/70"
        }`;
        const body = (
          <>
            <span className={v === undefined ? "" : "font-medium"}>{q.area}</span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em]">{v === true ? "Warning" : v === false ? "OK" : "—"}</span>
          </>
        );
        return (
          <li key={q.id}>
            {onPick && v !== undefined ? (
              <button type="button" onClick={() => onPick(i)} className={`${cls} hover:border-accent`} aria-label={`${q.area}: ${v ? "warning" : "OK"}. Change this answer`}>{body}</button>
            ) : (
              <div className={cls}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Meter({ answers }: { answers: Answers }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {questions.map((q) => (
        <span key={q.id} className={`h-2 flex-1 rounded-full ${answers[q.id] === true ? "bg-gold" : answers[q.id] === false ? "bg-ink/15" : "bg-line"}`} />
      ))}
    </div>
  );
}

export function SelfCheck() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [state, action, pending] = useActionState<FormState, FormData>(sendResults, { status: "idle" });
  const top = useRef<HTMLDivElement>(null);
  const answered = Object.keys(answers).length;
  const done = answered === questions.length && step >= questions.length;
  const risk = score(answers);
  const b = band(risk);
  const q = questions[Math.min(step, questions.length - 1)];

  const pick = (val: boolean) => {
    const next = { ...answers, [q.id]: val };
    setAnswers(next);
    // Move to the next unanswered question, or to the result once all ten are in.
    const after = questions.findIndex((x, i) => i > step && next[x.id] === undefined);
    const any = questions.findIndex((x) => next[x.id] === undefined);
    setStep(after !== -1 ? after : any !== -1 ? any : questions.length);
  };

  // Keyboard: Y / N answer, Backspace or ← goes back.
  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select") || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "y") pick(true);
      else if (k === "n") pick(false);
      else if ((k === "arrowleft" || k === "backspace") && step > 0) setStep(step - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Bring the result into view when it appears.
  useEffect(() => {
    if (done) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [done]);

  return (
    <div ref={top} className="scroll-mt-28">
      {!done ? (
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-stretch">
          <div className="flex flex-col rounded-xl bg-[#17161f] p-7 text-white md:p-12">
            <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.14em]">
              <span className="text-[#ffc93c]">{String(step + 1).padStart(2, "0")} · {q.area}</span>
              <span className="text-white/55">Question {step + 1} of {questions.length}</span>
            </div>
            <div className="mt-4 flex gap-1" aria-hidden="true">
              {questions.map((x, i) => (
                <span key={x.id} className={`h-1 flex-1 rounded-full ${i === step ? "bg-white/70" : answers[x.id] !== undefined ? "bg-[#ffc93c]" : "bg-white/15"}`} />
              ))}
            </div>
            <p className="mt-10 flex-1 font-display text-[1.9rem] leading-snug md:text-[2.5rem]" aria-live="polite">{q.text}</p>
            <div className="mt-10 grid grid-cols-2 gap-3" role="group" aria-label="Your answer">
              {([true, false] as const).map((val) => {
                const on = answers[q.id] === val;
                return (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => pick(val)}
                    aria-pressed={on}
                    className={`min-h-14 rounded-lg text-lg font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c] ${
                      val ? "bg-[#ffc93c] text-[#17161f] hover:bg-[#ffd664]" : "border border-white/25 text-white hover:border-white/60"
                    } ${on ? "ring-2 ring-white/70 ring-offset-2 ring-offset-[#17161f]" : ""}`}
                  >
                    {val ? "Yes" : "No"}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex justify-between text-sm text-white/55">
              <button type="button" onClick={() => setStep(step - 1)} className={`hover:text-white ${step === 0 ? "invisible" : ""}`}>← Back</button>
              <span className="hidden md:inline">Press Y or N</span>
            </div>
          </div>
          <aside className="rounded-xl border border-line bg-paper-dim p-6">
            <div className="flex items-baseline justify-between gap-3">
              <p className="marker">Building your score</p>
              <p className="font-mono text-xs text-muted">{risk} warning {risk === 1 ? "sign" : "signs"}</p>
            </div>
            <div className="mt-5"><Tiles answers={answers} onPick={setStep} /></div>
            <p className="mt-5 text-sm font-light text-muted">No email needed. Your result appears after question {questions.length}.</p>
          </aside>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <p className="marker">Your result</p>
            <p className="mt-3 font-display text-[3.4rem] leading-none text-ink">{b.label}</p>
            <p className="mt-3 text-lg font-light text-muted">{risk} of {questions.length} warning signs. {b.summary}</p>
            <div className="mt-6"><Meter answers={answers} /></div>

            {risk > 0 && (
              <>
                <h2 className="mt-10 text-lg font-medium text-ink">Where it&apos;s costing you</h2>
                <ul className="mt-4 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                  {questions.filter((x) => answers[x.id]).map((x, i, all) => (
                    <li key={x.id} className={`bg-paper p-5 ${all.length % 2 && i === all.length - 1 ? "sm:col-span-2" : ""}`}>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">{x.area}</p>
                      <p className="mt-2 text-sm font-light leading-relaxed text-body">{x.fix}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-8 grid gap-6 rounded-lg border border-accent/30 bg-accent-soft p-6 md:grid-cols-[1.3fr_1fr] md:items-center">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Recommended next step</p>
                <p className="mt-2 text-xl font-medium text-ink">Reporting Assessment</p>
                <p className="mt-1 text-sm text-muted">2 weeks · <span className="font-medium text-ink">£2,500</span> ex VAT · credited against any follow-on work</p>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted">We check every area above in your business, reconcile your key figures to the accounts, and hand you a costed plan.</p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link href={bookHref()} className="inline-flex min-h-11 items-center rounded-md bg-gold px-5 text-sm font-semibold text-[#17161f] hover:bg-gold-strong">Book a conversation</Link>
              </div>
            </div>

            {state.status === "ok" ? (
              <div className="mt-6 rounded-lg border border-line p-6">
                <p className="font-medium text-ink">Sent. Please check your inbox.</p>
              </div>
            ) : (
              <form action={action} className="mt-6 rounded-lg border border-line p-6">
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                {questions.map((x) => <input key={x.id} type="hidden" name={x.id} value={answers[x.id] ? "yes" : "no"} />)}
                <label htmlFor="email" className="text-base font-medium text-ink">Send me this report</label>
                <p className="mt-1 text-sm font-light text-muted">Your answers and the fix for each area, as one email. No follow-up sequence.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="Work email" className="min-h-11 flex-1 rounded-md border border-line bg-paper px-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:max-w-xs" />
                  <SubmitButton pending={pending}>Email it to me</SubmitButton>
                </div>
                {state.status === "error" && <p role="alert" className="mt-3 text-sm text-red-700">{state.message}</p>}
              </form>
            )}
          </div>
          <aside className="rounded-xl border border-line bg-paper-dim p-6 lg:sticky lg:top-28">
            <p className="marker">Your ten answers</p>
            <div className="mt-5"><Tiles answers={answers} onPick={setStep} /></div>
            <p className="mt-5 text-sm font-light text-muted">Tap an area to change that answer.</p>
          </aside>
        </div>
      )}
    </div>
  );
}

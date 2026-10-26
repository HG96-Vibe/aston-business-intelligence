"use client";

import { useActionState, useMemo, useState } from "react";
import { questions, score, band, type QuestionId } from "./questions";
import { sendResults } from "./actions";
import type { FormState } from "@/app/contact/actions";
import { Field, SubmitButton } from "@/components/form";
import Link from "next/link";
import { bookHref } from "@/components/offers";

export function SelfCheck() {
  const [answers, setAnswers] = useState<Partial<Record<QuestionId, boolean>>>({});
  const [state, action, pending] = useActionState<FormState, FormData>(sendResults, { status: "idle" });
  const answered = Object.keys(answers).length;
  const done = answered === questions.length;
  const risk = useMemo(() => score(answers), [answers]);
  const b = band(risk);
  const tone = { good: "text-emerald-700 dark:text-emerald-300", warn: "text-accent", bad: "text-red-700 dark:text-red-300" }[b.tone];

  return (
    <form action={action} className="grid gap-8">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <ol className="grid gap-px overflow-hidden rounded-md border border-line bg-line">
        {questions.map((q, i) => (
          <li key={q.id} className="grid gap-3 bg-paper p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">{String(i + 1).padStart(2, "0")} · {q.area}</span>
              <p className="mt-1 text-body">{q.text}</p>
            </div>
            <div className="flex gap-2" role="radiogroup" aria-label={q.text}>
              {(["yes", "no"] as const).map((v) => {
                const on = answers[q.id] === (v === "yes");
                return (
                  <label key={v} className={`cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition ${on ? "border-gold bg-gold text-ink" : "border-line bg-paper text-body hover:border-accent"}`}>
                    <input type="radio" name={q.id} value={v} className="sr-only" checked={on} onChange={() => setAnswers((a) => ({ ...a, [q.id]: v === "yes" }))} />
                    {v === "yes" ? "Yes" : "No"}
                  </label>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-md border border-line bg-paper-dim p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="marker">Your result</p>
          <p className="font-mono text-xs text-muted">{answered} / {questions.length} answered</p>
        </div>
        {done ? (
          <>
            <p className={`mt-3 font-display text-4xl ${tone}`}>{b.label} <span className="text-2xl text-muted">· {risk} of 10 warning signs</span></p>
            <p className="mt-3 max-w-2xl font-light leading-relaxed text-body">{b.summary}</p>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${risk * 10}%` }} />
            </div>
          </>
        ) : (
          <p className="mt-3 font-light text-muted">Answer all ten and your score appears here instantly. No email needed to see it.</p>
        )}
      </div>

      {done && state.status !== "ok" && (
        <div className="grid gap-5 rounded-md border border-accent/30 bg-accent-soft p-6">
          <div>
            <h3 className="text-lg text-ink">Want the detailed version?</h3>
            <p className="mt-1 text-sm font-light text-muted">We&apos;ll email you a breakdown of what each warning sign usually means and what fixes it. One email, no sequence.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="email" label="Work email" type="email" required autoComplete="email" />
            <Field id="company" label="Company (optional)" autoComplete="organization" />
          </div>
          {state.status === "error" && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{state.message}</p>}
          <div className="flex flex-wrap gap-3">
            <SubmitButton pending={pending}>Email me the breakdown</SubmitButton>
            <Link href={bookHref()} className="inline-flex items-center rounded-md border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink hover:bg-paper-dim">Or just book a call</Link>
          </div>
        </div>
      )}
      {state.status === "ok" && (
        <div className="rounded-md border border-accent/30 bg-accent-soft p-6">
          <p className="font-semibold text-ink">Sent. Check your inbox.</p>
          <p className="mt-1 text-sm text-body">If you&apos;d like to talk it through, <Link href={bookHref()} className="underline">book a 30-minute conversation</Link>.</p>
        </div>
      )}
    </form>
  );
}

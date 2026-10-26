"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "./actions";
import { services } from "@/lib/site";
import { Field, SubmitButton } from "@/components/form";

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, { status: "idle" });

  if (state.status === "ok") {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent-soft p-6">
        <p className="font-bold text-ink">Thanks — we&apos;ve got it.</p>
        <p className="mt-2 text-body">We reply to every enquiry within one working day.</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" required autoComplete="name" />
        <Field id="email" label="Work email" type="email" required autoComplete="email" />
        <Field id="company" label="Company" autoComplete="organization" />
        <Field id="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="interest" className="text-sm font-medium text-ink">What are you looking at?</label>
        <select id="interest" name="interest" className="rounded-md border border-line bg-paper px-3 py-2.5 text-body">
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink">Tell us about the problem</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-md border border-line bg-paper px-3 py-2.5 text-body"
          placeholder="What's slow, broken or unclear right now? Rough is fine."
        />
      </div>
      {state.status === "error" && (
        <p role="alert" className="rounded-md border border-red-300/60 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {state.message}
        </p>
      )}
      <SubmitButton pending={pending}>Send message</SubmitButton>
      <p className="text-xs text-muted">
        We only use your details to reply to you. See our <a href="/privacy" className="underline">privacy policy</a>.
      </p>
    </form>
  );
}

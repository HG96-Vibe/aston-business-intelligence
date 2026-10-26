"use client";

import { useActionState } from "react";
import { submitApplication } from "./actions";
import type { FormState } from "@/app/contact/actions";
import { Field, SubmitButton } from "@/components/form";

const areas = ["Data analysis & BI", "Data engineering", "Business analysis", "AI / machine learning", "Project management", "Other"];
const levels = ["Early career (0–2 years)", "Mid-level (2–6 years)", "Senior (6+ years)"];

export function CareersForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitApplication, { status: "idle" });

  if (state.status === "ok") {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent-soft p-6">
        <p className="font-bold text-ink">Thanks — you&apos;re in the pool.</p>
        <p className="mt-2 text-body">We&apos;ll be in touch when there&apos;s a project that matches your profile.</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5" encType="multipart/form-data">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" required autoComplete="name" />
        <Field id="email" label="Email" type="email" required autoComplete="email" />
        <Field id="linkedin" label="LinkedIn URL (optional)" type="url" placeholder="https://linkedin.com/in/…" />
        <div className="grid gap-1.5">
          <label htmlFor="cv" className="text-sm font-medium text-ink">CV (PDF or Word, max 5 MB)</label>
          <input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" className="text-sm text-body file:mr-3 file:rounded-md file:border file:border-line file:bg-paper file:px-3 file:py-2 file:text-sm file:font-medium" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="area" className="text-sm font-medium text-ink">Area of interest</label>
          <select id="area" name="area" className="rounded-md border border-line bg-paper px-3 py-2.5 text-body">
            {areas.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="level" className="text-sm font-medium text-ink">Experience</label>
          <select id="level" name="level" className="rounded-md border border-line bg-paper px-3 py-2.5 text-body">
            {levels.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink">Anything you&apos;d like us to know (optional)</label>
        <textarea id="message" name="message" rows={4} className="rounded-md border border-line bg-paper px-3 py-2.5 text-body" placeholder="Tools you're strongest in, availability, the kind of work you want more of." />
      </div>
      {state.status === "error" && (
        <p role="alert" className="rounded-md border border-red-300/60 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">{state.message}</p>
      )}
      <SubmitButton pending={pending}>Join the talent pool</SubmitButton>
      <p className="text-xs text-muted">
        We keep applications for 12 months and only use them to contact you about work with ABI. See our <a href="/privacy" className="underline">privacy policy</a>.
      </p>
    </form>
  );
}

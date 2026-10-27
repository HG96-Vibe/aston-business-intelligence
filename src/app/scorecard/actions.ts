"use server";

import { isEmail, sendMail } from "@/lib/mail";
import { site } from "@/lib/site";
import { questions, score, band, type QuestionId } from "./questions";
import type { FormState } from "@/app/contact/actions";

export async function sendResults(_prev: FormState, data: FormData): Promise<FormState> {
  if (data.get("company_website")) return { status: "ok" };
  const email = String(data.get("email") ?? "").trim();
  const company = String(data.get("company") ?? "").trim();
  if (!isEmail(email)) return { status: "error", message: "Please enter a valid work email." };

  const answers: Partial<Record<QuestionId, boolean>> = {};
  for (const q of questions) {
    const v = data.get(q.id);
    if (v === "yes") answers[q.id] = true;
    if (v === "no") answers[q.id] = false;
  }
  const risk = score(answers);
  const b = band(risk);

  const lines = questions.map((q) => `${answers[q.id] === undefined ? "–" : answers[q.id] ? "Yes" : "No"}  ${q.area}: ${q.text}`);

  // Internal copy — a warm lead with their answers attached
  const internal = await sendMail({
    to: process.env.MAIL_TO_HELLO ?? site.emails.hello,
    replyTo: email,
    subject: `Scorecard: ${b.label} (${risk}/10) — ${company || email}`,
    text: [`Email: ${email}`, `Company: ${company || "—"}`, `Score: ${risk}/10 — ${b.label}`, "", ...lines].join("\n"),
  });

  // Their copy
  await sendMail({
    to: email,
    subject: `Your reporting scorecard: ${b.label}`,
    text: [
      `Thanks for taking the ABI reporting scorecard.`,
      ``,
      `Result: ${b.label} (${risk} of 10 warning signs)`,
      b.summary,
      ``,
      `Your answers:`,
      ...lines,
      ``,
      ...(risk ? [`Where it's costing you:`, ...questions.filter((q) => answers[q.id]).map((q) => `• ${q.area}: ${q.fix}`)] : []),
      ``,
      `If you'd like us to look properly, the Reporting Assessment is £2,500, takes two weeks, and is credited against any follow-on work: ${site.url}/services`,
      ``,
      `Aston Business Intelligence Ltd · ${site.emails.hello}`,
    ].join("\n"),
  });

  if (!internal.ok && internal.reason === "not-configured") {
    return { status: "error", message: `Email isn't connected yet — your result is shown above. To talk it through, write to ${site.emails.hello}.` };
  }
  return { status: "ok" };
}

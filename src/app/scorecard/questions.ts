export const questions = [
  { id: "q1", text: "Does your month-end reporting take more than two working days to produce?", area: "Speed" },
  { id: "q2", text: "Do two reports ever show different numbers for the same thing?", area: "Trust" },
  { id: "q3", text: "Does the reporting depend on one person who, if they left, would take the process with them?", area: "Risk" },
  { id: "q4", text: "Do your key figures live in spreadsheets that are copied, emailed and edited by hand?", area: "Process" },
  { id: "q5", text: "Can you see profit margin by client, product or job — not just in total?", area: "Insight", invert: true },
  { id: "q6", text: "Do managers build their own reports because the official ones don't answer their questions?", area: "Fit" },
  { id: "q7", text: "Has a decision in the last year been delayed because the numbers weren't ready or weren't believed?", area: "Impact" },
  { id: "q8", text: "Do you have a written list of which reports exist, who uses them and what they're for?", area: "Control", invert: true },
  { id: "q9", text: "Have you paid for a system or dashboard in the last three years that nobody really uses now?", area: "Waste" },
  { id: "q10", text: "Do you know, roughly, how many hours a month your team spends preparing reports rather than reading them?", area: "Cost", invert: true },
] as const;

export type QuestionId = (typeof questions)[number]["id"];

export function score(answers: Partial<Record<QuestionId, boolean>>) {
  let risk = 0;
  for (const q of questions) {
    const a = answers[q.id];
    if (a === undefined) continue;
    const bad = "invert" in q && q.invert ? !a : a;
    if (bad) risk += 1;
  }
  return risk; // 0 = healthy, 10 = urgent
}

export function band(risk: number) {
  if (risk <= 2) return { label: "Sound", tone: "good", summary: "Your reporting is in better shape than most. The gains now lie in speed and depth rather than repair." };
  if (risk <= 5) return { label: "Strained", tone: "warn", summary: "It works, but it's costing you time and the occasional bad call. A two-week Reporting Assessment would pay for itself in the first quarter." };
  return { label: "Urgent", tone: "bad", summary: "Reporting is actively holding decisions back and probably hiding a margin problem. This is exactly what the Reporting Assessment is for." };
}

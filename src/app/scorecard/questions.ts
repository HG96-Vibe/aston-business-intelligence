/* Reporting scorecard. Every question is framed so that "Yes" is the warning sign. */
export const questions = [
  { id: "q1", area: "Speed", text: "Does month-end reporting take more than two working days to produce?", fix: "Reporting is manual. A single data model that refreshes itself takes month-end from days to hours." },
  { id: "q2", area: "Trust", text: "Do two reports ever show different numbers for the same thing?", fix: "Two numbers means two definitions. One agreed source, reconciled to the accounts, ends the argument." },
  { id: "q3", area: "Risk", text: "Would reporting stop if one particular person left tomorrow?", fix: "The most common and most expensive failure. Documentation and a proper handover remove it." },
  { id: "q4", area: "Process", text: "Do key figures live in spreadsheets that are copied, emailed and edited by hand?", fix: "Every hand edit is a chance of error. Pipelines from your systems replace the copying." },
  { id: "q5", area: "Insight", text: "Can you only see profit margin in total, not by client, product or job?", fix: "Without margin by client or product you are pricing blind. This is usually where the money is." },
  { id: "q6", area: "Fit", text: "Do managers build their own reports because the official ones don't answer their questions?", fix: "The reports were built without asking what decisions they serve. Start from the decisions." },
  { id: "q7", area: "Impact", text: "Has a decision in the last year been delayed because the numbers weren't ready or believed?", fix: "Reporting is now costing you decisions, not just time. The case for fixing it is already made." },
  { id: "q8", area: "Control", text: "Would it be hard to list every report you have, who uses it and why?", fix: "Nobody owns the estate, so it grows. An inventory usually retires a third of it." },
  { id: "q9", area: "Waste", text: "Have you paid for a system or dashboard in the last three years that nobody really uses now?", fix: "Tools bought before the questions were agreed. The fix is the questions, not another tool." },
  { id: "q10", area: "Cost", text: "Would you struggle to say how many hours a month your team spends preparing reports?", fix: "If the cost is invisible it never gets fixed. We usually find one to three days a month." },
] as const;

export type QuestionId = (typeof questions)[number]["id"];

/** Number of warning signs (answers of "Yes"). 0 = healthy, 10 = urgent. */
export function score(answers: Partial<Record<QuestionId, boolean>>) {
  return questions.filter((q) => answers[q.id] === true).length;
}

export function band(risk: number) {
  if (risk <= 2) return { label: "Sound", summary: "Your reporting is in better shape than most. The gains now are in speed and depth, not repair." };
  if (risk <= 5) return { label: "Strained", summary: "It works, but it is costing you time and the occasional bad call." };
  return { label: "Urgent", summary: "Reporting is holding decisions back, and is probably hiding a margin problem." };
}

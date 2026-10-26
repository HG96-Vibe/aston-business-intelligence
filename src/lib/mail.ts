/**
 * Minimal transactional email via Resend's REST API (no SDK).
 * Required env vars (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   — from resend.com (free tier: 3,000 emails/month)
 *   MAIL_FROM        — a verified sender, e.g. "Aston BI <noreply@astonbusinessintelligence.co.uk>"
 *   MAIL_TO_HELLO    — where contact-form enquiries go
 *   MAIL_TO_CAREERS  — where CVs go
 */

export type Attachment = { filename: string; content: string }; // base64

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<{ ok: true } | { ok: false; reason: string }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) return { ok: false, reason: "not-configured" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [opts.to],
      subject: opts.subject,
      text: opts.text,
      reply_to: opts.replyTo,
      attachments: opts.attachments,
    }),
  });

  if (!res.ok) return { ok: false, reason: `resend-${res.status}` };
  return { ok: true };
}

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

"use server";

import { isEmail, sendMail } from "@/lib/mail";
import { site } from "@/lib/site";

export type FormState = { status: "idle" | "ok" | "error"; message?: string };

export async function submitContact(_prev: FormState, data: FormData): Promise<FormState> {
  // Honeypot: real users never fill this.
  if (data.get("company_website")) return { status: "ok" };

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const company = String(data.get("company") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const interest = String(data.get("interest") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  if (name.length < 2) return { status: "error", message: "Please enter your name." };
  if (!isEmail(email)) return { status: "error", message: "Please enter a valid email address." };
  if (message.length < 10) return { status: "error", message: "Tell us a little more about what you need." };

  const result = await sendMail({
    to: process.env.MAIL_TO_HELLO ?? site.emails.hello,
    replyTo: email,
    subject: `Website enquiry — ${name}${company ? ` (${company})` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "—"}`,
      `Phone: ${phone || "—"}`,
      `Interested in: ${interest || "—"}`,
      "",
      message,
    ].join("\n"),
  });

  if (!result.ok) {
    return {
      status: "error",
      message:
        result.reason === "not-configured"
          ? `Our contact form isn't connected yet. Please email us directly at ${site.emails.hello}.`
          : `Something went wrong sending your message. Please email ${site.emails.hello} instead.`,
    };
  }
  return { status: "ok" };
}

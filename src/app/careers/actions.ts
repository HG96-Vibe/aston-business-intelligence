"use server";

import { isEmail, sendMail } from "@/lib/mail";
import { site } from "@/lib/site";
import type { FormState } from "@/app/contact/actions";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export async function submitApplication(_prev: FormState, data: FormData): Promise<FormState> {
  if (data.get("company_website")) return { status: "ok" };

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const linkedin = String(data.get("linkedin") ?? "").trim();
  const area = String(data.get("area") ?? "").trim();
  const level = String(data.get("level") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  const cv = data.get("cv");

  if (name.length < 2) return { status: "error", message: "Please enter your name." };
  if (!isEmail(email)) return { status: "error", message: "Please enter a valid email address." };

  const attachments = [];
  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV_BYTES) return { status: "error", message: "Please keep your CV under 5 MB." };
    if (!ALLOWED.includes(cv.type)) return { status: "error", message: "Please upload a PDF or Word document." };
    const buf = Buffer.from(await cv.arrayBuffer());
    attachments.push({ filename: cv.name, content: buf.toString("base64") });
  }

  const result = await sendMail({
    to: process.env.MAIL_TO_CAREERS ?? site.emails.careers,
    replyTo: email,
    subject: `Talent pool — ${name} (${area || "unspecified"})`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `LinkedIn: ${linkedin || "—"}`,
      `Area: ${area || "—"}`,
      `Level: ${level || "—"}`,
      "",
      message || "(no message)",
    ].join("\n"),
    attachments,
  });

  if (!result.ok) {
    return {
      status: "error",
      message:
        result.reason === "not-configured"
          ? `Our form isn't connected yet. Please email your CV to ${site.emails.careers}.`
          : `Something went wrong. Please email your CV to ${site.emails.careers} instead.`,
    };
  }
  return { status: "ok" };
}

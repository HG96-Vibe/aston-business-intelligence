/* Client-side form submit for the static site: both forms post to /send.php on the same host,
   which emails enquiries@ only (visitor as reply-to). Nothing is sent to the visitor. */
import { site } from "@/lib/site";

export type FormState = { status: "idle" | "ok" | "error"; message?: string };

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const s = (d: FormData, k: string) => String(d.get(k) ?? "").trim();

async function post(form: "contact" | "careers", data: FormData, fallback: string): Promise<FormState> {
  data.set("form", form);
  try {
    const res = await fetch("/send.php", { method: "POST", body: data, headers: { Accept: "application/json" } });
    const json = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
    if (res.ok && json?.ok) return { status: "ok" };
    return { status: "error", message: json?.message || fallback };
  } catch {
    return { status: "error", message: fallback };
  }
}

export async function submitContact(_prev: FormState, data: FormData): Promise<FormState> {
  if (s(data, "company_website")) return { status: "ok" };
  if (s(data, "name").length < 2) return { status: "error", message: "Please enter your name." };
  if (!isEmail(s(data, "email"))) return { status: "error", message: "Please enter a valid email address." };
  if (s(data, "message").length < 10) return { status: "error", message: "Tell us a little more about what you need." };
  return post("contact", data, `Something went wrong sending your message. Please email ${site.emails.hello} instead.`);
}

const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_EXT = /\.(pdf|docx?)$/i;

export async function submitApplication(_prev: FormState, data: FormData): Promise<FormState> {
  if (s(data, "company_website")) return { status: "ok" };
  if (s(data, "name").length < 2) return { status: "error", message: "Please enter your name." };
  if (!isEmail(s(data, "email"))) return { status: "error", message: "Please enter a valid email address." };
  const cv = data.get("cv");
  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV_BYTES) return { status: "error", message: "Please keep your CV under 5 MB." };
    if (!CV_EXT.test(cv.name)) return { status: "error", message: "Please upload a PDF or Word document." };
  }
  return post("careers", data, `Something went wrong. Please email your CV to ${site.emails.careers} instead.`);
}

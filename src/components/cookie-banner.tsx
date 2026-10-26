"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* UK PECR-compliant consent:
   - Essential storage (theme, this choice) needs no consent.
   - Analytics is OFF until the visitor accepts. Nothing analytics-related loads before then.
   - Choice is stored in localStorage under KEY and can be changed from the footer link
     (which dispatches the "aston:cookie-settings" event). */
const KEY = "aston-consent";
type Consent = "accepted" | "rejected";

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

function loadAnalytics() {
  // Placeholder: when an analytics provider is chosen, initialise it here.
  // e.g. inject the GA4 / Plausible script tag. Called only after "accepted".
  if (typeof window !== "undefined") window.dispatchEvent(new Event("aston:analytics-consented"));
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = getConsent();
    if (!c) setOpen(true);
    else if (c === "accepted") loadAnalytics();
    const reopen = () => setOpen(true);
    window.addEventListener("aston:cookie-settings", reopen);
    return () => window.removeEventListener("aston:cookie-settings", reopen);
  }, []);

  function decide(c: Consent) {
    try { localStorage.setItem(KEY, c); } catch {}
    setOpen(false);
    if (c === "accepted") loadAnalytics();
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 z-50 px-4 md:inset-x-auto md:right-6 md:max-w-sm"
      style={{ bottom: "calc(max(16px, env(safe-area-inset-bottom, 0px)) + 60px)" }}
    >
      <div className="rounded-lg border border-line bg-paper p-5 shadow-xl shadow-black/15">
        <p className="text-base font-semibold text-ink">Cookies on this site</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We use essential storage to make the site work and remember your display preference.
          With your permission we&apos;d also like to use analytics cookies to understand how the
          site is used. We never use advertising cookies.{" "}
          <Link href="/privacy#cookies" className="underline hover:text-ink">Read more</Link>
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-ink hover:bg-gold-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Accept analytics
          </button>
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-paper-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("aston:cookie-settings"))}
      className={`text-left hover:text-ink ${className}`}
    >
      Cookie settings
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "aston-theme";

function apply(t: Theme) {
  document.documentElement.setAttribute("data-theme", t);
}

/* Fixed bottom-left day/night switch. The initial theme is set before paint by the
   inline script in layout.tsx; this component only reads and toggles it. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (current) setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    try { localStorage.setItem(KEY, next); } catch {}
  }

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
      title={dark ? "Day mode" : "Night mode"}
      className="fixed z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-lg shadow-black/10 transition hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      style={{
        left: "max(16px, env(safe-area-inset-left, 0px))",
        bottom: "max(16px, env(safe-area-inset-bottom, 0px))",
      }}
    >
      {dark ? (
        /* sun */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="#ffc93c" stroke="#ffc93c" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        /* moon */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="#17161f" />
          <circle cx="17" cy="6" r="1.4" fill="#e9b324" stroke="none" />
        </svg>
      )}
    </button>
  );
}

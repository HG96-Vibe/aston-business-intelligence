"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="wrap flex items-center justify-between py-3">
        <Link href="/" aria-label={site.name} onClick={() => setOpen(false)}>
          <Logo height={66} />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-body md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-ink ${path.startsWith(item.href) ? "text-ink" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-deep px-4 py-2 text-sm font-semibold text-white transition hover:bg-deep-soft dark:bg-gold dark:text-ink dark:hover:bg-gold-strong"
          >
            Talk to us
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md border border-line p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 5h14M3 10h14M3 15h14" />}
          </svg>
        </button>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-paper md:hidden">
        <nav className="wrap grid gap-1 py-3">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-base font-medium text-body hover:bg-paper-dim"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-deep px-4 py-3 text-center text-sm font-semibold text-white dark:bg-gold dark:text-ink"
          >
            Talk to us
          </Link>
        </nav>
      </div>
    </header>
  );
}

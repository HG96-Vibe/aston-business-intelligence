"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Logo } from "@/components/logo";

/* The four service pages, shown in the Services panel and the mobile menu. No prices here:
   visitors find those on each page. */
const serviceLinks = [
  { href: "/services/data-bi", name: "Data & BI", line: "One set of numbers the whole business trusts.", img: "/img/svc/reporting-assessment.jpg", pos: "60% 30%" },
  { href: "/services/business-analysis", name: "Business Analysis", line: "Projects scoped before money is spent.", img: "/img/corridor.jpg", pos: "60% 30%" },
  { href: "/services/ai-consulting", name: "AI Consulting", line: "AI where it pays back, with a number attached.", img: "/img/tablet-pair.jpg", pos: "60% 40%" },
  { href: "/services/project-delivery", name: "Project Delivery", line: "Delivered on the date you told the board.", img: "/img/pd-workshop.jpg", pos: "60% 35%" },
];

const Chevron = ({ open, size = 10 }: { open: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" className={`transition ${open ? "rotate-180" : ""}`} aria-hidden="true"><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
);

export function SiteHeader() {
  const [open, setOpen] = useState(false); // mobile menu
  const [svcOpen, setSvcOpen] = useState(false); // desktop services panel
  const [mSvc, setMSvc] = useState(false); // mobile services list
  const path = usePathname();
  const closeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close the menus after navigating (not on first load).
  const lastPath = useRef(path);
  useEffect(() => { if (lastPath.current !== path) { lastPath.current = path; setSvcOpen(false); setOpen(false); } }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSvcOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = () => { if (closeT.current) clearTimeout(closeT.current); setSvcOpen(true); };
  const leave = () => { closeT.current = setTimeout(() => setSvcOpen(false), 150); };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="wrap relative flex items-center justify-between py-3">
        <Link href="/" aria-label={site.name} onClick={() => setOpen(false)}>
          <Logo height={66} />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-body md:flex">
          {site.nav.map((item) =>
            item.href === "/services" ? (
              /* "Services" goes to the overview; hovering (or the arrow) opens the photo panel */
              <div key={item.href} onMouseEnter={enter} onMouseLeave={leave}>
                <span className="inline-flex items-center gap-1">
                  <Link href="/services" className={`transition hover:text-ink ${path.startsWith("/services") || svcOpen ? "text-ink" : ""}`}>Services</Link>
                  <button type="button" aria-label="Show the four services" aria-expanded={svcOpen} aria-controls="services-menu" onClick={() => setSvcOpen((v) => !v)} className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-paper-dim">
                    <Chevron open={svcOpen} />
                  </button>
                </span>

                {svcOpen && (
                  <div id="services-menu" className="absolute inset-x-[var(--gutter)] top-full z-50 pt-3">
                    <div className="grid overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_40px_80px_-30px_rgba(23,22,31,.4)] lg:grid-cols-[260px_1fr]">
                      <Link href="/services" className="group flex flex-col justify-between bg-[#17161f] p-7 text-white">
                        <span>
                          <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#ffc93c]">Services</span>
                          <span className="mt-3 block font-display text-2xl leading-tight">Four services, <i className="text-[#ffc93c]">one accountable lead.</i></span>
                          <span className="mt-3 block text-sm font-light leading-relaxed text-white/65">Each starts with a small, fixed-price first step.</span>
                        </span>
                        <span className="mt-6 inline-flex items-center gap-1 self-start text-sm text-white underline decoration-[#ffc93c] underline-offset-4">Services overview <span aria-hidden="true">→</span></span>
                      </Link>
                      <ul className="grid grid-cols-2 gap-4 p-5 xl:grid-cols-4">
                        {serviceLinks.map((s) => (
                          <li key={s.href}>
                            <Link href={s.href} className="group block">
                              <span className="relative block h-32 overflow-hidden rounded-lg">
                                <span className="duotone natural cover inset-0">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.img} alt="" style={{ objectPosition: s.pos }} className="transition duration-500 group-hover:scale-[1.05]" /></span>
                              </span>
                              <span className="mt-3 block font-display text-xl text-ink transition group-hover:text-accent">{s.name}</span>
                              <span className="mt-1 block text-sm font-light leading-snug text-muted">{s.line}</span>
                              <span className="mt-2 block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent">Explore →</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={`transition hover:text-ink ${path.startsWith(item.href) ? "text-ink" : ""}`}>
                {item.label}
              </Link>
            ),
          )}
          <Link href="/contact" className="rounded-md bg-deep px-4 py-2 text-sm font-semibold text-white transition hover:bg-deep-soft">
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
          {site.nav.map((item) =>
            item.href === "/services" ? (
              <div key={item.href}>
                <button type="button" aria-expanded={mSvc} onClick={() => setMSvc((v) => !v)} className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-base font-medium text-body hover:bg-paper-dim">
                  Services
                  <Chevron open={mSvc} size={12} />
                </button>
                {mSvc && (
                  <ul className="mb-2 ml-2 grid gap-0.5 border-l-2 border-gold pl-3">
                    <li><Link href="/services" onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 text-base font-medium text-ink hover:bg-paper-dim">Services overview →</Link></li>
                    {serviceLinks.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 text-base text-body hover:bg-paper-dim">{s.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-base font-medium text-body hover:bg-paper-dim">
                {item.label}
              </Link>
            ),
          )}
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-deep px-4 py-3 text-center text-sm font-semibold text-white">
            Talk to us
          </Link>
        </nav>
      </div>
    </header>
  );
}

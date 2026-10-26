import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/logo";
import { CookieSettingsLink } from "@/components/cookie-banner";

const company = [
  { href: "/services", label: "Services" },
  { href: "/services/data-bi", label: "Data & BI" },
  { href: "/scorecard", label: "Reporting Scorecard" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-dim">
      <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:px-6">
        <div>
          <Logo height={36} />
          <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-muted">
            Business intelligence, business analysis, AI consulting and project delivery for UK SMEs.
          </p>
        </div>
        <div>
          <p className="eyebrow">Company</p>
          <nav className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {company.map((item) => (
              <Link key={item.href} href={item.href} className="text-body hover:text-ink">{item.label}</Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <a href={`mailto:${site.emails.hello}`} className="mt-3 block text-sm text-body hover:text-ink">{site.emails.hello}</a>
          <p className="mt-3 text-sm font-light leading-relaxed text-muted">{site.registeredOffice}</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} {site.name} Ltd · Registered in England &amp; Wales, no. {site.companyNumber}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/terms" className="hover:text-ink">Terms</Link>
            <CookieSettingsLink />
          </div>
        </div>
      </div>
    </footer>
  );
}

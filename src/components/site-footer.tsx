import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/logo";
import { CookieSettingsLink } from "@/components/cookie-banner";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-dim">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <Logo height={40} />
          <p className="mt-4 max-w-sm text-sm text-muted">
            Business intelligence, business analysis, AI consulting and project delivery for UK SMEs.
          </p>
        </div>
        <div>
          <p className="eyebrow">Company</p>
          <nav className="mt-3 grid gap-2 text-sm">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-body hover:text-ink">
                {item.label}
              </Link>
            ))}
            <Link href="/privacy" className="text-body hover:text-ink">Privacy policy</Link>
            <Link href="/terms" className="text-body hover:text-ink">Terms</Link>
            <CookieSettingsLink className="text-body" />
          </nav>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <div className="mt-3 grid gap-2 text-sm">
            <a href={`mailto:${site.emails.hello}`} className="text-body hover:text-ink">{site.emails.hello}</a>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            {site.name} Ltd is a company registered in England &amp; Wales, no. {site.companyNumber}.
            <br />
            Registered office: {site.registeredOffice}
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted md:px-6">
          © {new Date().getFullYear()} {site.name} Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

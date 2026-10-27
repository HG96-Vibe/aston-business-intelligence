import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/logo";
import { CookieSettingsLink } from "@/components/cookie-banner";

const company = [
  { href: "/services", label: "Services" },
  { href: "/services/data-bi", label: "Data & BI" },
  { href: "/services/business-analysis", label: "Business Analysis" },
  { href: "/scorecard", label: "Reporting Scorecard" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#17161f] text-white">
      {/* St Paul's and the City at golden hour, under a charcoal wash */}
      <div className="absolute inset-0 bg-cover bg-[position:center_38%]" style={{ backgroundImage: "url(/img/london-stpauls.jpg)" }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#17161f]/55 via-[#17161f]/70 to-[#0e0d13]/92" aria-hidden="true" />
      <div className="wrap relative grid gap-x-10 gap-y-10 pb-14 pt-40 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo height={72} reversed />
          <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-white/70">
            Business intelligence, business analysis, AI consulting and project delivery for UK SMEs.
          </p>
        </div>
        <div>
          <p className="eyebrow !text-[#ffc93c]">Company</p>
          <nav className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {company.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/80 hover:text-white">{item.label}</Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="eyebrow !text-[#ffc93c]">Contact</p>
          <a href={`mailto:${site.emails.hello}`} className="mt-3 block text-sm text-white/80 hover:text-white">{site.emails.hello}</a>
          <p className="mt-3 text-sm font-light leading-relaxed text-white/70">{site.registeredOffice}</p>
        </div>
      </div>
      <div className="relative border-t border-white/15">
        <div className="wrap flex flex-col gap-2 py-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between [&_a]:hover:text-white [&_button]:hover:text-white">
          <p>© {new Date().getFullYear()} {site.name} Ltd · Registered in England &amp; Wales, no. {site.companyNumber}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <CookieSettingsLink />
          </div>
        </div>
      </div>
      {/* The full name, large, scrolling slowly along the bottom edge and cut by it. Decorative. */}
      <div className="relative z-[2] w-full overflow-hidden" aria-hidden="true">
        <div className="footer-name -mb-[0.16em] flex w-max whitespace-nowrap font-display text-[clamp(3rem,9vw,8rem)] font-light leading-[0.78] tracking-[-0.02em] text-[#ffc93c] motion-reduce:animate-none">
          {[0, 1].map((k) => (
            <span key={k} className="pr-[0.5em]">Aston Business <em className="font-extralight">Intelligence</em>&nbsp;&nbsp;·&nbsp;&nbsp;Aston Business <em className="font-extralight">Intelligence</em>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

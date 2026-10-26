import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm text-slate-600 md:grid-cols-3">
        <div>
          <p className="font-semibold text-slate-900">{site.name}</p>
          <p className="mt-2">
            BI strategy, analytics and data engineering for UK organisations.
          </p>
        </div>
        <nav className="grid gap-2">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="grid gap-2">
          <Link href="/privacy" className="hover:text-slate-900">Privacy policy</Link>
          <Link href="/terms" className="hover:text-slate-900">Terms</Link>
          <p className="mt-4 text-xs text-slate-500">
            {site.name} Ltd · Company no. {site.companyNumber} · Registered in England &amp; Wales
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/site";
import { Button, CtaBand, PageHero } from "@/components/ui";
import { PricingLadder, bookHref } from "@/components/offers";
import { offers, serviceOutcomes } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Data & BI, business analysis, AI consulting and project delivery for UK SMEs. Fixed-scope, fixed-price first engagements.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="From unclear data to"
        em="delivered change."
        intro="Four services that work alone or in sequence: understand the numbers, define what to change, apply AI where it pays, and get it delivered."
      >
        <nav className="flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm text-body hover:border-accent"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {services.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className={`scroll-mt-20 ${i % 2 === 1 ? "bg-paper-dim" : ""}`}
        >
          <div className="wrap grid gap-10 py-16 md:grid-cols-[1fr_1.3fr] md:py-24">
            <div>
              <p className="marker">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 text-3xl text-ink md:text-[2.6rem]">{s.title}</h2>
              <p className="mt-4 text-lg font-light text-muted">{s.short}</p>
              {(() => { const o = offers.find((x) => x.serviceSlug === s.slug); return o ? (
              <div className="mt-8 rounded-lg border border-accent/30 bg-accent-soft p-5">
                <p className="eyebrow">Start here</p>
                <p className="mt-2 font-semibold text-ink">{o.name}</p>
                <p className="mt-1 text-sm text-muted">{o.duration} · <span className="font-medium text-ink">{o.price}</span> ex VAT</p>
                <Link href={bookHref()} className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
                  Book a conversation →
                </Link>
              </div>) : null; })()}
            </div>
            <div className="grid gap-8">
              <div>
                <h3 className="text-ink">The problem we usually find</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.problem}</p>
              </div>
              <div>
                <h3 className="text-ink">What we do</h3>
                <ul className="mt-3 grid gap-2">
                  {s.what.map((w) => (
                    <li key={w} className="flex gap-3 leading-relaxed text-body">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-ink">What changes</h3>
                <ul className="mt-3 grid gap-2">
                  {serviceOutcomes[s.slug].map((o) => (
                    <li key={o} className="flex gap-3 leading-relaxed text-body">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {o}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.outcome}</p>
                {s.slug === "data-bi" && <Link href="/services/data-bi" className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.12em] text-accent hover:underline">Full detail: Data &amp; BI →</Link>}
              </div>
            </div>
          </div>
        </section>
      ))}

      <PricingLadder />

      <section>
        <div className="wrap py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">Not sure which you need?</p>
            <h2 className="mt-3 text-3xl text-ink md:text-[2.6rem]">That&apos;s normal. <span className="em">Start with a conversation.</span></h2>
            <p className="mt-4 text-lg text-muted">
              Most clients come to us with a symptom — slow reporting, a stalled project, pressure
              to &ldquo;do something with AI&rdquo; — not a service name. Tell us the symptom and we&apos;ll
              tell you where to start.
            </p>
            <div className="mt-8">
              <Button href={bookHref()}>Book a conversation</Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

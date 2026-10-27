import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/ui";
import { PricingLadder, bookHref } from "@/components/offers";
import { ServiceNav } from "@/components/service-nav";
import { svc } from "@/lib/services-page";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Data & BI, business analysis, AI consulting and project delivery for UK SMEs. Fixed-scope, fixed-price first engagements.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero: light editorial — headline, then the four services as clean photos with the text set below */}
      <section className="bg-paper-dim">
        <div className="wrap pb-16 pt-20 md:pb-20 md:pt-24">
          <p className="marker">Services</p>
          <h1 className="mt-5 max-w-3xl text-[2.4rem] leading-[1.08] text-ink md:text-[3.8rem]">
            From unclear data to <span className="em">delivered change.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted">
            Four services that work alone or in sequence: understand the numbers, define what to change, apply AI where it pays, and get it delivered.
          </p>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {svc.map((s, i) => (
              <a key={s.slug} href={`#${s.slug}`} className="group block">
                <div className="relative h-52 overflow-hidden rounded-lg md:h-60">
                  <div className="duotone natural cover inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.photo.src} alt="" style={{ objectPosition: s.photo.pos }} className="transition duration-700 group-hover:scale-[1.04]" />
                  </div>
                </div>
                <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">0{i + 1}</p>
                <h2 className="mt-1 font-display text-2xl leading-tight text-ink">{s.label}</h2>
                <p className="mt-2 text-sm font-light leading-snug text-muted">{s.short}</p>
                <p className="mt-3 inline-block text-sm font-medium text-ink underline decoration-accent underline-offset-4 group-hover:decoration-2">
                  {s.offer.price.startsWith("from ") ? `Starts ${s.offer.price}` : `Starts at ${s.offer.price}`} →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ServiceNav items={svc.map((s) => ({ slug: s.slug, label: s.label }))} />

      {svc.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`scroll-mt-40 ${i % 2 ? "bg-paper-dim" : ""}`}>
          {/* Photo band opens each chapter */}
          <div className="relative h-[300px] overflow-hidden md:h-[380px]">
            <div className="duotone cover inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.photo.src} alt="" style={{ objectPosition: s.photo.pos }} />
            </div>
            <div className="wrap relative z-10 flex h-full flex-col justify-end pb-10">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#ffc93c]">{s.label}</p>
              <h2 className="mt-2 max-w-3xl font-display text-[2.2rem] leading-tight text-white md:text-[3rem]">{s.title}</h2>
              <p className="mt-2 max-w-2xl text-lg font-light text-white/80">{s.short}</p>
            </div>
          </div>

          <div className="wrap py-14 md:py-20">
            {/* Problem + start here */}
            <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-start">
              <div>
                <p className="marker">The problem we usually find</p>
                <p className="mt-4 font-display text-[1.6rem] font-light leading-snug text-ink md:text-[2rem]">{s.problem}</p>
              </div>
              <div className="rounded-lg border border-accent/30 bg-accent-soft p-6">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">Start here</p>
                <p className="mt-2 text-xl font-medium text-ink">{s.offer.name}</p>
                <p className="mt-1 text-sm text-muted">{s.offer.duration} · <span className="font-medium text-ink">{s.offer.price}</span> ex VAT</p>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted">{s.offer.outcome}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={bookHref()} className="inline-flex min-h-11 items-center rounded-md bg-gold px-4 text-sm font-semibold text-[#17161f] hover:bg-gold-strong">Book a conversation</Link>
                  <a href="#pricing" className="inline-flex min-h-11 items-center text-sm font-medium text-ink underline decoration-accent underline-offset-4">All prices</a>
                </div>
              </div>
            </div>

            {/* How we do it: a real sequence, so numbered */}
            <div className="mt-14">
              <p className="marker">How we do it</p>
              <ol className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {s.steps.map(([t, b], k) => (
                  <li key={t} className="bg-paper p-6">
                    <span className="font-display text-3xl font-light text-accent">{k + 1}</span>
                    <h3 className="mt-2 text-lg font-medium text-ink">{t}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-muted">{b}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* What changes: three bold statements */}
            <div className="mt-14 grid gap-6 border-y border-line py-10 md:grid-cols-3">
              {s.outcomes.map((o) => (
                <p key={o} className="font-display text-[1.45rem] leading-snug text-ink">{o}</p>
              ))}
            </div>

            {/* Specific services, matching the home page */}
            <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="marker">Ways in</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.subs.map((x) => (
                    <Link key={x.slug} href={x.href} className="group relative block h-44 overflow-hidden rounded-lg">
                      {/* Original colour with a neutral scrim for the text, except AI Readiness which keeps the gold tint */}
                      <div className={`duotone cover inset-0 ${x.slug === "ai-readiness" ? "" : "natural"}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={x.image} alt="" style={{ objectPosition: x.position ?? "center" }} />
                      </div>
                      {x.slug !== "ai-readiness" && <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 via-45% to-black/5" aria-hidden="true" />}
                      <div className="absolute inset-x-4 bottom-4 z-10 text-white">
                        <p className="font-display text-xl leading-tight">{x.name}</p>
                        <p className="mt-1 text-sm font-light text-white/75">{x.line}</p>
                      </div>
                      {x.tag && <span className="absolute right-3 top-3 z-10 rounded bg-black/40 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[#ffc93c]">{x.tag}</span>}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="marker">Tools we use here</p>
                <ul className="mt-6 grid grid-cols-3 gap-x-6 gap-y-6">
                  {s.tools.map((t) => (
                    <li key={t} className="flex h-10 items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/brand/tools/${t}.png`} alt={t} className="max-h-8 w-auto max-w-full object-contain" />
                    </li>
                  ))}
                </ul>
                {s.slug === "data-bi" && <Link href="/services/data-bi" className="mt-8 inline-block text-sm font-semibold text-accent underline underline-offset-4">Full detail: Data &amp; BI →</Link>}
              </div>
            </div>
          </div>
        </section>
      ))}

      <PricingLadder />
      <CtaBand />
    </>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { commercial } from "@/lib/offers";

export function Section({
  children,
  className = "",
  dim = false,
  tone,
  id,
}: {
  children: ReactNode;
  className?: string;
  dim?: boolean;
  /** Surface rhythm: "dark" (charcoal, stays dark in both themes) or "gold" (solid gold, charcoal type). */
  tone?: "dark" | "gold";
  id?: string;
}) {
  const toneClass = tone === "dark" ? "tone-dark bg-paper" : tone === "gold" ? "tone-gold bg-paper" : dim ? "bg-paper-dim" : "";
  return (
    <section id={id} className={`${toneClass} ${className}`}>
      <div className="wrap py-16 md:py-24">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  number,
  title,
  em,
  intro,
}: {
  eyebrow?: string;
  number?: string;
  title: string;
  em?: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="marker">
          {number && <span>{number}</span>}
          <span>{eyebrow}</span>
        </p>
      )}
      <h2 className="mt-4 text-3xl text-ink md:text-[2.6rem]">
        {title}
        {em && <> <span className="em">{em}</span></>}
      </h2>
      {intro && <p className="mt-5 text-lg font-light leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  em,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  em?: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-accent/20 bg-accent-soft">
      <div className="wrap py-20 md:py-28">
        {eyebrow && <p className="marker">{eyebrow}</p>}
        <h1 className="mt-5 max-w-3xl text-4xl text-ink md:text-5xl">
          {title}
          {em && <> <span className="em">{em}</span></>}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost";
}) {
  const styles = {
    primary: "bg-gold text-ink hover:bg-gold-strong",
    secondary: "border border-line text-ink hover:bg-paper-dim",
    light: "border border-white/30 text-white hover:bg-white/10",
    ghost: "border border-line bg-paper text-ink hover:bg-paper-dim",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </Link>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <div className="placeholder">{children}</div>;
}

/* Full-width photograph with a charcoal wash and one line of copy. Used between sections. */
export function PhotoBand({ src, position = "center", children, note, tall = false, duotone = false, natural = false, overlay = false }: { src: string; position?: string; children: ReactNode; note?: string; tall?: boolean; duotone?: boolean; natural?: boolean; overlay?: boolean }) {
  return (
    <section className={`relative overflow-hidden bg-[#17161f] ${tall ? "min-h-[340px] md:min-h-[420px]" : "min-h-[240px] md:min-h-[300px]"}`} aria-label="Photograph">
      {duotone ? (
        <div className={`duotone ${overlay ? "cover" : "absolute"} inset-0 ${natural ? "natural" : ""}`}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={src} alt="" style={{ objectPosition: position }} /></div>
      ) : (
        <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${src})`, backgroundPosition: position }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#17161f]/55 via-[#17161f]/25 to-[#17161f]/60" />
      <div className="wrap relative flex h-full min-h-[inherit] items-end justify-between gap-6 pb-9 pt-16">
        <p className="max-w-[30ch] font-display text-2xl font-light leading-tight text-white md:text-3xl [&_em]:not-italic [&_em]:text-[#ffc93c] [&_i]:text-[#ffc93c]">{children}</p>
        {note && <p className="hidden shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70 md:block">{note}</p>}
      </div>
    </section>
  );
}

export function CtaBand() {
  /* A charcoal card that overlaps the top of the footer photograph (the footer adds the matching top padding). */
  return (
    <section className="relative z-10 -mb-24 px-[var(--gutter)]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 rounded-lg border border-[#ffc93c]/30 bg-[#17161f] px-6 py-10 text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <h2 className="text-2xl md:text-3xl">Talk to us about <span className="em" style={{ color: "#ffc93c" }}>your business.</span></h2>
          <p className="mt-2 max-w-xl font-light text-white/70">
            A 30-minute conversation. We&apos;ll tell you whether we can help, how, and what it would cost.
          </p>
          <p className="mt-3 text-sm text-white/60">Taking on {commercial.newEngagementsPerMonth} new engagements a month · first call within {commercial.firstCallWithin}.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact#book">Book a conversation</Button>
          <Button href="/scorecard" variant="light">2-minute reporting scorecard</Button>
        </div>
      </div>
    </section>
  );
}

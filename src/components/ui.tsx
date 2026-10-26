import Link from "next/link";
import type { ReactNode } from "react";
import { commercial } from "@/lib/offers";

export function Section({
  children,
  className = "",
  dim = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  dim?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`${dim ? "bg-paper-dim" : ""} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">{children}</div>
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
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
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

export function CtaBand() {
  return (
    <section className="bg-deep text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h2 className="text-2xl md:text-3xl">Talk to us about <span className="em" style={{ color: "#ffc93c" }}>your business.</span></h2>
          <p className="mt-2 max-w-xl font-light text-white/70">
            A 30-minute call, no slides. We&apos;ll tell you plainly whether and how we can help — and what it would cost.
          </p>
          <p className="mt-3 text-sm text-white/60">Taking on {commercial.newEngagementsPerMonth} new engagements a month · first call within {commercial.firstCallWithin}.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={commercial.bookingUrl || "/contact#book"}>Book a conversation</Button>
          <Button href="/health-check" variant="light">2-minute health check</Button>
        </div>
      </div>
    </section>
  );
}

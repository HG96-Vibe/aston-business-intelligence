import Link from "next/link";
import type { ReactNode } from "react";

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
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        {eyebrow && <p className="eyebrow eyebrow-light">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-5xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>}
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
  variant?: "primary" | "secondary" | "light";
}) {
  const styles = {
    primary: "bg-gold text-ink hover:bg-gold-strong",
    secondary: "border border-line text-ink hover:bg-paper-dim",
    light: "border border-white/30 text-white hover:bg-white/10",
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
          <h2 className="text-2xl font-bold md:text-3xl">Talk to us about your business</h2>
          <p className="mt-2 max-w-xl text-white/70">
            A 30-minute call, no slides. We&apos;ll tell you plainly whether and how we can help.
          </p>
        </div>
        <Button href="/contact">Get in touch</Button>
      </div>
    </section>
  );
}

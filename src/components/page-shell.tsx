export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-wider text-sky-600">{eyebrow}</p>
      )}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-lg text-slate-600">{intro}</p>}
      {children && <div className="mt-10">{children}</div>}
    </section>
  );
}

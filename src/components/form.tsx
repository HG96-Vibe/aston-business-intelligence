import type { InputHTMLAttributes, ReactNode } from "react";

export function Field({
  id,
  label,
  ...props
}: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">{label}</label>
      <input
        id={id}
        name={id}
        {...props}
        className="rounded-md border border-line bg-paper px-3 py-2.5 text-body focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </div>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold-strong disabled:opacity-60"
    >
      {pending ? "Sending…" : children}
    </button>
  );
}

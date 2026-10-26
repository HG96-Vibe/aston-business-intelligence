export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <rect x="1" y="12" width="4" height="9" rx="1" fill="currentColor" opacity="0.45" />
        <rect x="7" y="7" width="4" height="14" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="13" y="1" width="4" height="20" rx="1" fill="#0e8a7a" />
      </svg>
      Aston<span className="font-medium opacity-70">BI</span>
    </span>
  );
}

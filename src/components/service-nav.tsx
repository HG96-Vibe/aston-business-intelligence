"use client";

import { useEffect, useState } from "react";

/* Sticky bar of the four services on /services. Highlights the section being read. */
export function ServiceNav({ items }: { items: { slug: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.slug);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.slug)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className="sticky top-[90px] z-30 border-b border-line bg-paper/95 backdrop-blur" aria-label="Services">
      <div className="wrap flex gap-1 overflow-x-auto py-2">
        {items.map((s) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            aria-current={active === s.slug ? "true" : undefined}
            className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors ${active === s.slug ? "bg-deep text-white" : "text-body hover:bg-accent-soft"}`}
          >
            {s.label}
          </a>
        ))}
        <a href="#pricing" className="ml-auto shrink-0 rounded-md px-4 py-2 text-sm font-medium text-accent hover:bg-accent-soft">Prices</a>
      </div>
    </nav>
  );
}

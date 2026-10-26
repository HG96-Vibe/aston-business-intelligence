"use client";

import Image from "next/image";
import { useState } from "react";

/* Official certification badge (from Credly) with a text fallback until the image exists.
   Drop the PNGs at public/brand/certs/nvidia.png and public/brand/certs/google-cloud.png */
export function CertBadge({ src, label, detail, wide = false }: { src: string; label: string; detail: string; wide?: boolean }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className="flex min-w-0 items-center gap-3">
      {!missing && (
        <Image
          src={src}
          alt={`${detail} badge`}
          width={wide ? 120 : 44}
          height={44}
          className={wide ? "h-7 w-auto shrink-0 object-contain" : "h-11 w-11 shrink-0 object-contain"}
          onError={() => setMissing(true)}
        />
      )}
      <div className="min-w-0">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{label}</p>
        <p className="mt-1 text-sm font-medium text-ink">{detail}</p>
      </div>
    </div>
  );
}

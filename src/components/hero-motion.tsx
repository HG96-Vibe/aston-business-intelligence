"use client";

import { useEffect, useRef } from "react";

/* Hero background: a faint dot grid that warms under the cursor, and the ABi monogram
   outline traced slowly in gold (draw → hold → fade → repeat).
   Canvas only, pointer-transparent, paused when hidden, off under prefers-reduced-motion. */

const OUTLINE = [
  "M38 4 L0 92 H76 Z",
  "M38 34 L18 92 H58 Z",
  "M45.5 14 H64 A19 19 0 0 1 64 52 H70 A20 20 0 0 1 70 92 H79.5 Z",
  "M53 26 H62 A7 7 0 0 1 62 40 H59 Z",
  "M66.5 60 H70 A11 11 0 0 1 70 82 H76 Z",
  "M38 48 L27 92 H49 Z",
  "M96 36 H110 V92 H96 Z",
  "M111 18 A8 8 0 1 1 95 18 A8 8 0 1 1 111 18 Z",
];
const INK_PARTS = new Set([5, 6]);

export function HeroMotion({ forceDark = false }: { forceDark?: boolean } = {}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const cv: HTMLCanvasElement = canvas;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    const paths = OUTLINE.map((d) => new Path2D(d));

    let W = 0, H = 0, DPR = 1, raf = 0, t0 = performance.now();
    let dots: { x: number; y: number; l: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    const coarse = matchMedia("(pointer: coarse)").matches;

    const theme = () => {
      const dark = forceDark || document.documentElement.getAttribute("data-theme") === "dark";
      return { gold: dark ? "255,201,60" : "233,179,36", ink: dark ? "243,241,247" : "23,22,31" };
    };

    function resize() {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = host.clientWidth; H = host.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const g = 22; dots = [];
      for (let y = g / 2; y < H; y += g) for (let x = g / 2; x < W; x += g) dots.push({ x, y, l: 0 });
    }
    function mono() {
      // fit the 120x100 monogram into the left ~50% of the hero, behind the copy, never taller than 85% of it
      const s = Math.min((H * 0.85) / 100, (W * 0.5) / 120);
      const x = W * 0.03;
      const y = (H - 100 * s) / 2;
      return { x, y, s };
    }

    function draw(now: number) {
      const t = (now - t0) / 1000; const { gold, ink } = theme();
      ctx.clearRect(0, 0, W, H);

      // grid
      for (const d of dots) {
        const m = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        const target = Math.max(0, 1 - m / 150);
        d.l += (target - d.l) * 0.09;
        const a = 0.10 + d.l * 0.8;
        ctx.fillStyle = d.l > 0.02 ? `rgba(${gold},${a})` : `rgba(${ink},0.10)`;
        ctx.beginPath(); ctx.arc(d.x, d.y - d.l * 4, 1 + d.l * 1.4, 0, 6.283); ctx.fill();
      }

      // traced monogram: 0→1 draw, 1→1.3 hold, 1.3→1.6 fade (cycle ~13s)
      const phase = (t * 0.12) % 1.6;
      const prog = Math.min(1, phase);
      const fade = phase > 1.3 ? 1 - (phase - 1.3) / 0.3 : 1;
      const m = mono();
      ctx.save(); ctx.translate(m.x, m.y); ctx.scale(m.s, m.s);
      ctx.lineWidth = 1.2 / m.s; ctx.lineJoin = "round";
      ctx.setLineDash([600, 600]); ctx.lineDashOffset = 600 - prog * 600;
      paths.forEach((p, i) => {
        const isInk = INK_PARTS.has(i);
        ctx.strokeStyle = `rgba(${isInk ? ink : gold},${(isInk ? 0.18 : 0.4) * fade})`;
        ctx.stroke(p);
      });
      ctx.restore();

      raf = requestAnimationFrame(draw);
    }

    const onMove = (e: PointerEvent) => { const r = host.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onScroll = () => { if (coarse) { mouse.x = W * 0.75; mouse.y = (window.scrollY * 0.8) % Math.max(1, H); } };
    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else { t0 = performance.now(); raf = requestAnimationFrame(draw); } };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}

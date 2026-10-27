"use client";

import { useEffect, useRef } from "react";

/* Site-wide pointer effect: a patch of gold dots on a 22px grid lights up around the cursor.
   The grid is pinned to the page (it scrolls with content, it doesn't slide under the pointer).
   Fixed, pointer-transparent canvas; draws only while the pointer is moving or fading.
   Off on touch devices, under prefers-reduced-motion, and over anything marked [data-cursor-off]
   (the home hero, which has its own dot grid). */

const STEP = 22;
const R = 150;

export function CursorGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv: HTMLCanvasElement = canvas;
    const ctx = cv.getContext("2d")!;

    let W = 0, H = 0, DPR = 1, raf = 0;
    let mx = -9999, my = -9999, level = 0, target = 0;

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      kick();
    };

    const frame = () => {
      raf = 0;
      level += (target - level) * 0.18;
      if (Math.abs(target - level) < 0.01) level = target;
      ctx.clearRect(0, 0, W, H);
      if (level > 0) {
        const ox = -(window.scrollX % STEP), oy = -(window.scrollY % STEP);
        const x0 = Math.floor((mx - R - ox) / STEP) * STEP + ox;
        const y0 = Math.floor((my - R - oy) / STEP) * STEP + oy;
        for (let x = x0; x <= mx + R; x += STEP)
          for (let y = y0; y <= my + R; y += STEP) {
            const d = Math.hypot(x - mx, y - my);
            if (d > R) continue;
            const a = Math.pow(1 - d / R, 1.6) * level;
            ctx.fillStyle = `rgba(244,165,31,${0.75 * a})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.1 + 1.6 * a, 0, Math.PI * 2);
            ctx.fill();
          }
      }
      if (level !== target) kick();
    };
    function kick() { if (!raf) raf = requestAnimationFrame(frame); }

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      mx = e.clientX; my = e.clientY;
      const el = e.target instanceof Element ? e.target : null;
      target = el?.closest("[data-cursor-off]") ? 0 : 1;
      kick();
    };
    const leave = () => { target = 0; kick(); };
    const vis = () => { if (document.hidden) { target = 0; level = 0; ctx.clearRect(0, 0, W, H); } };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", kick, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    document.addEventListener("visibilitychange", vis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", kick);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]" />;
}

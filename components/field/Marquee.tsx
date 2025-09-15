// components/field/Marquee.tsx
"use client";

import { useEffect, useRef } from "react";

export default function Marquee({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const mm = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!mm.matches) return; // reduced motion → static

    let rafId = 0;
    let x = 0;
    const step = () => {
      x -= 0.2; // slow
      if (x < -50) x = 0;
      track.style.transform = `translateX(${x}%)`;
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="w-full border-t border-neutral-200 bg-neutral-950 text-neutral-50">
      <div className="overflow-hidden">
        <div
          className="flex gap-8 py-6 text-xl md:text-2xl whitespace-nowrap will-change-transform"
          ref={trackRef}
          aria-hidden="true"
        >
          {[...items, ...items].map((it, i) => (
            <span key={i} className="opacity-90">
              {it}
            </span>
          ))}
        </div>
        {/* Static SR content */}
        <span className="sr-only">{items.join(", ")}</span>
      </div>
    </div>
  );
}

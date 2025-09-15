// components/sections/SerpentineSection.tsx
"use client";

import React, { useMemo, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type SerpentineSectionProps = {
  text: string;
  eyebrow?: string;
  subcopy?: string;
  textClassName?: string;
  /** Section height (scroll play space). Default: h-[240vh] */
  heightClassName?: string;
  /** Pin while animating. Default: true */
  pin?: boolean;
  className?: string;
};

export default function SerpentineSection({
  text,
  eyebrow,
  subcopy,
  textClassName,
  heightClassName = "h-[240vh]",
  pin = true,
  className,
}: SerpentineSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const initialized = useRef(false); // ✅ strict-mode guard

  const chars = useMemo(() => [...text], [text]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    // ✅ Prevent double init in React Strict Mode (dev)
    if (initialized.current) return;
    initialized.current = true;

    // Kill any orphaned triggers targeting this section (hot reloads, remounts)
    ScrollTrigger.getAll()
      .filter((st) => st.vars?.trigger === sectionRef.current)
      .forEach((st) => st.kill());

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!lineRef.current || lettersRef.current.length === 0) return;

      // Reset
      gsap.set([lettersRef.current, lineRef.current], { clearProps: "all" });

      // Start centered & readable
      gsap.set(lettersRef.current, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        willChange: "transform, opacity",
      });

      const n = lettersRef.current.length;
      const mid = (n - 1) / 2;
      const vw = Math.max(window.innerWidth, 1);
      const vh = Math.max(window.innerHeight, 1);

      const baseX = Math.min(vw * 0.22, 320);
      const stepX = Math.min(vw * 0.06, 120);
      const baseY = Math.min(vh * 0.16, 180);
      const stepY = Math.min(vh * 0.045, 70);

      const spread = lettersRef.current.map((_, index) => {
        const offset = index - mid;
        const signX = offset >= 0 ? 1 : -1;
        const mag = Math.abs(offset);
        const x = signX * (baseX + mag * (stepX * 0.65));
        const y = ((index % 2 === 0) ? -1 : 1) * (baseY + mag * (stepY * 0.55));
        const rotate = (offset as number) * 10;
        const scale = 0.96 - Math.min(mag, 6) * 0.006;
        return { x, y, rotate, scale, signX, signY: (index % 2 === 0 ? -1 : 1) };
      });

      const finalTargets = spread.map((t) => {
        const pushX = vw * 0.9 + Math.abs(t.x) * 0.8;
        const pushY = vh * 0.8 + Math.abs(t.y) * 0.8;
        return {
          x: t.x + t.signX * pushX,
          y: t.y + t.signY * pushY,
          rotate: t.rotate + 12 * t.signX,
          scale: Math.max(0.9, t.scale - 0.06),
        };
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: `serpentine-${Math.random().toString(36).slice(2)}`, // unique id for cleanup
          trigger: sectionRef.current!,
          start: "top top",
          end: "bottom top+=10%",
          scrub: true,
          // ⚠️ Only pin if requested — on homepage we pass pin={false} to avoid DOM moves
          pin: pin ? stickyRef.current! : false,
          anticipatePin: 1,
        },
      });

      tl.to({}, { duration: 0.1 });
      tl.to(
        lettersRef.current,
        {
          x: (i: number) => finalTargets[i].x,
          y: (i: number) => finalTargets[i].y,
          rotate: (i: number) => finalTargets[i].rotate,
          scale: (i: number) => finalTargets[i].scale,
          opacity: 0.25,
          duration: 0.9,
          stagger: { each: 0.006 },
        },
        0.1
      );

      if (reduce) {
        tl.progress(1).kill();
        gsap.set(lettersRef.current, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
      }
    }, sectionRef);

    return () => {
      // Safe, idempotent teardown
      try {
        ctx.revert();
      } finally {
        initialized.current = false;
        // As a final sweep, remove any triggers that might linger on hot reload
        ScrollTrigger.getAll()
          .filter((st) => st.vars?.trigger === sectionRef.current)
          .forEach((st) => st.kill());
      }
    };
  }, [pin, text]);

  return (
    <section
      ref={sectionRef}
      className={[
        "relative w-full overflow-hidden select-none bg-transparent",
        heightClassName,
        className ?? "",
      ].join(" ")}
      aria-label={text}
    >
      {eyebrow || subcopy ? (
        <div className="mx-auto max-w-5xl px-6 pt-12 md:pt-16">
          {eyebrow ? (
            <p className="text-sm md:text-base uppercase tracking-widest opacity-60 mb-3">
              {eyebrow}
            </p>
          ) : null}
          {subcopy ? (
            <p className="text-base md:text-lg opacity-70 max-w-3xl">
              {subcopy}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Sticky stage: centered, fills screen */}
      <div ref={stickyRef} className="sticky top-0 h-screen w-full">
        <div className="h-full w-full grid place-items-center px-6">
          <div
            ref={lineRef}
            aria-hidden="true"
            className={[
              "will-change-transform translate-z-0",
              "text-center leading-none tracking-tight font-medium",
              "text-[22vw] md:text-[16vw] 4xl:text-[14vw]",
              textClassName ?? "",
            ].join(" ")}
          >
            {chars.map((ch, i) => {
              const isSpace = ch === " ";
              return (
                <span
                  key={`${ch}-${i}`}
                  ref={(el) => {
                    if (el) lettersRef.current[i] = el;
                  }}
                  aria-hidden="true"
                  className={["inline-block align-baseline", isSpace ? "w-[0.35em]" : ""].join(" ")}
                  style={{ position: "relative" }}
                >
                  {isSpace ? "\u00A0" : ch}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

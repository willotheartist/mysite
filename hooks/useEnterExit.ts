// hooks/useEnterExit.ts
"use client";

import { useEffect, RefObject } from "react";
import { getGSAP } from "@/lib/gsap";

// Accept RefObject<T | null> so useRef<HTMLDivElement>(null) is valid.
export function useEnterExit<T extends HTMLElement>(
  ref: RefObject<T | null>,
  opts?: { y?: number; ease?: string; holdOverlap?: number }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { gsap, ScrollTrigger } = getGSAP();
    if (!gsap || !ScrollTrigger) return;

    const y = opts?.y ?? 24;
    const ease = opts?.ease ?? "cubic-bezier(0.22,1,0.36,1)";
    const holdOverlap = opts?.holdOverlap ?? 0.4;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { opacity: 0, y });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      });

      tl.to(el, { opacity: 1, y: 0, duration: 0.6, ease })
        .to(el, { opacity: 0, y: -y, duration: 0.6, ease }, `>${holdOverlap}`);

      return () => tl.kill();
    });

    return () => mm.kill();
  }, [ref, opts?.y, opts?.ease, opts?.holdOverlap]);
}

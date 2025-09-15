// hooks/useSectionBg.ts
"use client";

import { useEffect } from "react";
import { getGSAP } from "@/lib/gsap";

type BgStep = { selector: string; color: string };

export function useSectionBg(steps: BgStep[], rootSelector = "html") {
  useEffect(() => {
    const { gsap, ScrollTrigger } = getGSAP();
    if (!gsap || !ScrollTrigger) return;

    const root = document.querySelector(rootSelector) as HTMLElement | null;
    if (!root) return;

    const m = gsap.matchMedia();
    m.add("(prefers-reduced-motion: no-preference)", () => {
      const triggers: ScrollTrigger[] = [];
      steps.forEach((step) => {
        const st = ScrollTrigger.create({
          trigger: step.selector,
          start: "top 65%",
          onEnter: () =>
            gsap.to(root, {
              backgroundColor: step.color,
              duration: 0.8,
              ease: "cubic-bezier(0.22,1,0.36,1)",
            }),
        });
        triggers.push(st);
      });
      return () => triggers.forEach((t) => t.kill());
    });

    return () => m.kill();
  }, [steps, rootSelector]);
}

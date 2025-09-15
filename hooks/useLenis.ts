// hooks/useLenis.ts
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { getGSAP } from "@/lib/gsap";

export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Keep options minimal to satisfy Lenis types across versions.
    const lenis = new Lenis({ lerp: 0.1 });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const { ScrollTrigger } = getGSAP();
    if (ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

"use client";

import React, { useEffect, useRef } from "react";
import Lenis, { LenisOptions } from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * LenisProvider
 * - Single Lenis instance app-wide
 * - GSAP ticker drives Lenis (autoRaf: false) so ScrollTrigger + Lenis stay in sync
 * - Refreshes ScrollTrigger when layout shifts (images, fonts, DOM mutations, resize)
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (lenisRef.current) return;

    // Ensure html/body aren’t blocking scroll
    try {
      const html = document.documentElement;
      const body = document.body;
      html.style.overscrollBehavior = "none";
      if (getComputedStyle(html).overflow === "hidden") html.style.overflow = "visible";
      if (getComputedStyle(body).overflow === "hidden") body.style.overflow = "visible";
    } catch {
      // no-op
    }

    const options: Partial<LenisOptions> = {
      duration: 1.2,
      smoothWheel: true,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      // IMPORTANT: we drive Lenis via GSAP ticker, so disable internal RAF
      // /@ts-expect-error Older Lenis types may not declare autoRaf; guarded at runtime
      autoRaf: false,
    };

    const lenis = new Lenis(options as LenisOptions);
    lenisRef.current = lenis;

    // Bridge Lenis -> ScrollTrigger so pinned sections progress correctly
    const onTick = (time: number) => {
      // gsap.ticker supplies seconds; Lenis expects ms
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Also nudge ST on Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    const refresh = () => {
      ScrollTrigger.getAll().forEach((t) => (t.vars.invalidateOnRefresh = true));
      ScrollTrigger.refresh();
    };

    const ready = () => requestAnimationFrame(refresh);
    if (document.readyState === "complete") {
      ready();
    } else {
      window.addEventListener("load", ready, { once: true });
    }

    // Font reflow safety (no ts-ignore; feature-detect)
    const anyDoc = document as unknown as { fonts?: { ready?: Promise<unknown> } };
    if (anyDoc.fonts?.ready) {
      anyDoc.fonts.ready.then(() => refresh()).catch(() => {});
    }

    // Resize observer: recompute pinned ends
    const ro = new ResizeObserver(() => refresh());
    ro.observe(document.documentElement);

    // Mutation observer: DOM structure changes (images mount, sections hydrate, etc.)
    const mo = new MutationObserver(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(refresh);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      ro.disconnect();
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Keep keyboard scroll behavior intact (don’t globally preventDefault)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || el?.isContentEditable) return;
      // Let browser/Lenis handle it naturally.
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return <>{children}</>;
}

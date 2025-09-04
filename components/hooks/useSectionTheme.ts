// components/hooks/useSectionTheme.ts
"use client";

import { useEffect } from "react";

export default function useSectionTheme({
  root,
  themes,
  selector = "[data-theme]",
}: {
  root: React.RefObject<HTMLElement | null>;
  themes: Record<string, { bg: string; fg?: string }>;
  selector?: string;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lazy import GSAP/ScrollTrigger only on client
    let ctx: { revert: () => void } | null = null;

    (async () => {
      try {
        const gsapMod = await import("gsap");
        const stMod = await import("gsap/ScrollTrigger");
        const gsap = gsapMod.gsap ?? gsapMod.default ?? gsapMod;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default ?? stMod;

        gsap.registerPlugin(ScrollTrigger);

        const container = root.current ?? document.body;
        const sections = Array.from(container.querySelectorAll<HTMLElement>(selector));

        // If reduced motion, just set the first theme and bail.
        if (!motionOK) {
          const first = sections[0]?.dataset.theme;
          if (first && themes[first]) {
            applyTheme(themes[first]);
          }
          return;
        }

        ctx = gsap.context(() => {
          sections.forEach((el) => {
            const key = el.dataset.theme;
            if (!key || !themes[key]) return;

            ScrollTrigger.create({
              trigger: el,
              start: "top 66%",
              end: "bottom 34%",
              onEnter: () => applyTheme(themes[key!]),
              onEnterBack: () => applyTheme(themes[key!]),
            });
          });

          // initial
          const first = sections[0]?.dataset.theme;
          if (first && themes[first]) applyTheme(themes[first]);

          // Invalidate on resize/orientation
          ScrollTrigger.addEventListener("refreshInit", () => {});
          ScrollTrigger.refresh();
        }, root);

        function applyTheme(t: { bg: string; fg?: string }) {
          const doc = document.documentElement;
          doc.style.setProperty("--page-bg", t.bg);
          doc.style.setProperty("--page-fg", t.fg ?? (isLight(t.bg) ? "#0a0a0a" : "#ffffff"));
        }
      } catch {
        // If GSAP not present, fail gracefully (no animated theme)
      }
    })();

    return () => {
      try {
        ctx?.revert();
      } catch {
        // noop
      }
    };
  }, [root, selector, themes]);
}

function isLight(hex: string) {
  // naive luminance check
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return l > 0.6;
}

// /components/StickyPanels.tsx
"use client";

import { useEffect, useRef } from "react";
import { getGSAP } from "@lib/gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type Panel = {
  k: string;
  eyebrow?: string;
  title: string;
  body: string;
};

type Props = {
  panels: Panel[];
  pinSpacing?: number; // extra space after the section while pinned
};

export default function StickyPanels({ panels, pinSpacing = 0 }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = rootRef.current;
    if (!el) return;

    const { gsap, ScrollTrigger } = getGSAP();
    const ctx = gsap.context(() => {
      const panelEls = gsap.utils.toArray<HTMLElement>("[data-panel]");
      const section = el.querySelector<HTMLElement>("[data-stick]");
      if (!section || panelEls.length === 0) return;

      // base: set all panels hidden except first
      gsap.set(panelEls, { autoAlpha: 0, y: 40 });
      gsap.set(panelEls[0], { autoAlpha: 1, y: 0 });

      // pin the section
      const pin = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${(panelEls.length - 1) * window.innerHeight}`,
        pin: true,
        pinSpacing: pinSpacing > 0,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // per-panel crossfade while scrubbing
      panelEls.forEach((panelEl: HTMLElement, iIdx: number) => {
        const next = panelEls[iIdx + 1];
        if (!next) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: () => `top top+=${iIdx * window.innerHeight}`,
              end: () => `+=${window.innerHeight}`,
              scrub: true,
            },
          })
          .to(panelEl, { autoAlpha: 0, y: -40, ease: "none" }, 0)
          .fromTo(next, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: "none" }, 0);
      });

      // refresh on resize for accurate heights
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        pin.kill(true);
        ScrollTrigger.getAll().forEach((st: ScrollTriggerType) => {
          if (st.vars.trigger === section) st.kill(true);
        });
      };
    }, rootRef);

    return () => ctx.revert();
  }, [pinSpacing]);

  return (
    <section ref={rootRef} aria-label="Highlights" className="relative">
      <div
        data-stick
        className="relative h-[100vh] w-full bg-black text-white"
        role="group"
        aria-roledescription="pinned storytelling"
      >
        <div className="absolute inset-0 grid place-items-center">
          {/* Panels stack in the center; we crossfade them */}
          <div className="relative w-full max-w-5xl px-6">
            {panels.map((p, i) => (
              <article
                key={p.k}
                data-panel
                className="absolute inset-0 mx-auto flex h-auto min-h-[60vh] flex-col justify-center"
                aria-hidden={i !== 0}
              >
                {p.eyebrow ? (
                  <p className="mb-3 text-xs/none uppercase tracking-[0.2em] text-neutral-400">
                    {p.eyebrow}
                  </p>
                ) : null}
                <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                  {p.title}
                </h2>
                <p className="mt-4 max-w-2xl text-pretty text-base text-neutral-300 md:text-lg">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
          <span className="block text-xs text-neutral-500">Scroll</span>
          <span aria-hidden className="block h-5 w-px animate-bounce bg-neutral-700" />
        </div>
      </div>
    </section>
  );
}

// components/sections/MyProcess.tsx
"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Step = {
  id: number;
  label: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  { id: 1, label: "STEP 1", title: "Discover", body: "Align on goals, constraints, and success signals." },
  { id: 2, label: "STEP 2", title: "Define", body: "Frame the problem, map scope, and choose the sharpest path." },
  { id: 3, label: "STEP 3", title: "Design", body: "Move from systems to screens, iterate quickly, test early." },
  { id: 4, label: "STEP 4", title: "Develop", body: "Tight build loop with clean, accessible, performant code." },
  { id: 5, label: "STEP 5", title: "Deliver", body: "Ship, measure, and refine with crisp handover docs." },
] as const;

// ✅ Simple, SSR-safe registration (no reliance on gsap.core.globals)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MyProcess() {
  const containerRef = useRef<HTMLElement | null>(null); // ⬅️ HTMLElement instead of HTMLSectionElement
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);
  const labelRefs = useRef<HTMLDivElement[]>([]);
  const [passedCount, setPassedCount] = useState(0);

  const prefersReducedMotion = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    []
  );

  const setPanelRef = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    panelRefs.current[i] = el;
  };
  const setLabelRef = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    labelRefs.current[i] = el;
  };

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let ctx: gsap.Context | null = gsap.context(() => {
      const panels = panelRefs.current;
      const labels = labelRefs.current;

      gsap.set(track, { x: 0 });
      labels.forEach((el, i) => {
        el.style.setProperty("--i", String(i));
      });

      const getScrollLength = () => Math.max(0, track.scrollWidth - container.clientWidth);

      const horiz = gsap.to(track, {
        x: () => -(track.scrollWidth - container.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollLength()}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const currentX = -((gsap.getProperty(track, "x") as number) || 0);
            let count = 0;
            for (let i = 0; i < panels.length; i++) {
              const left = panels[i].offsetLeft;
              if (currentX >= left + 10) count++;
            }
            setPassedCount(count);
            labels.forEach((el, i) => {
              el.classList.toggle("is-past", i < count);
              el.classList.toggle("is-current", i === count);
              el.classList.toggle("is-upcoming", i > count);
            });
          },
        },
      });

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      ro.observe(track);
      ro.observe(container);

      return () => {
        ro.disconnect();
        horiz.scrollTrigger?.kill();
        horiz.kill();
      };
    }, container);

    return () => {
      ctx?.revert();
      ctx = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!prefersReducedMotion) return;
    const panels = panelRefs.current;
    const labels = labelRefs.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = panels.indexOf(e.target as HTMLDivElement);
          if (idx >= 0 && e.isIntersecting) {
            setPassedCount((c) => Math.max(c, idx));
            labels.forEach((el, i) => {
              el.classList.toggle("is-past", i < idx);
              el.classList.toggle("is-current", i === idx);
              el.classList.toggle("is-upcoming", i > idx);
            });
          }
        });
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0.2 }
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} aria-label="My process" className="relative w-full bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">My process</h2>
          <div className="text-sm text-neutral-500">
            <span className="sr-only">Steps completed:</span>
            <span aria-hidden>0{Math.min(passedCount, STEPS.length)}/{STEPS.length}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Left rail with stacking vertical labels */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden md:flex w-24 items-center justify-start">
          <div className="relative h-[70vh] w-full">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: "3.25rem", height: "60vh" }}>
              {STEPS.map((step, i) => (
                <div
                  key={step.id}
                  ref={(el) => setLabelRef(el, i)}
                  className={[
                    "process-tab pointer-events-none select-none absolute left-1/2 -translate-x-1/2 rounded-md border border-neutral-200 bg-white shadow-sm",
                    "transition-transform duration-300 will-change-transform",
                  ].join(" ")}
                  style={{ width: "2.75rem", writingMode: "vertical-rl", textOrientation: "mixed" }}
                  aria-hidden
                >
                  <span className="block px-2 py-3 text-[10px] tracking-widest text-neutral-600">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="relative flex">
          {STEPS.map((step, i) => (
            <article
              key={step.id}
              ref={(el) => setPanelRef(el as HTMLDivElement, i)}
              className="relative flex min-h-[70vh] w-[calc(100vw-2rem)] md:w-[calc(100vw-6rem)] shrink-0 items-stretch"
            >
              <div className="hidden md:block w-24 shrink-0" aria-hidden />
              <div className="relative z-10 mx-4 md:mx-8 my-8 flex w-full items-stretch rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="md:hidden flex items-center justify-center w-10 border-r border-neutral-200">
                  <span className="text-[10px] tracking-widest text-neutral-600" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
                    {step.label}
                  </span>
                </div>
                <div className="flex-1 p-6 md:p-10">
                  <motion.h3
                    className="text-xl md:text-2xl font-medium tracking-tight"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className="mt-4 max-w-prose text-sm md:text-base text-neutral-600"
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                  >
                    {step.body}
                  </motion.p>
                  <div className="mt-6 md:mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    <div className="aspect-[4/3] rounded-xl border border-neutral-200" />
                    <div className="aspect-[4/3] rounded-xl border border-neutral-200" />
                    <div className="aspect-[4/3] rounded-xl border border-neutral-200 hidden md:block" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .process-tab.is-past {
          transform: translate(-50%, calc(var(--stackTop, -45%) + var(--i) * var(--gap, 14px))) rotate(0.0001deg);
          opacity: 1;
        }
        .process-tab.is-current {
          transform: translate(calc(-50% + 6px), -50%) scale(1.02);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          opacity: 1;
        }
        .process-tab.is-upcoming {
          transform: translate(-50%, -50%);
          opacity: 0.5;
        }
        .process-tab {
          --stackTop: -45%;
          --gap: 14px;
        }
        @media (max-width: 767px) {
          .process-tab {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

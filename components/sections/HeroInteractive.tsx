"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * HeroInteractive (simplified)
 * - Centered headline + optional subline + CTA.
 * - No right-side cube or 3D logic.
 * - Motion-safe (respects prefers-reduced-motion).
 */
export default function HeroInteractive({
  title,
  subline,
}: {
  title: string;
  subline?: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="relative min-h-[88svh] md:min-h-[92svh] bg-white text-black flex items-center justify-center px-4 sm:px-6 md:px-8"
      aria-label="Intro"
    >
      <div className="text-center max-w-3xl">
        <motion.h1
          initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight"
        >
          {title}
        </motion.h1>

        {subline && (
          <motion.p
            initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-neutral-700"
          >
            {subline}
          </motion.p>
        )}

        <div className="mt-10">
          <a
            href="/mysite/projects"
            className="inline-flex items-center rounded-full border border-black px-6 py-3 text-base font-medium hover:-translate-y-0.5 transition"
          >
            View work
            <span aria-hidden className="ml-2">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

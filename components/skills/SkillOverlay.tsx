"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { Skill } from "@/data/skills";

type Props = { skill: Skill; onClose: () => void };

export default function SkillOverlay({ skill, onClose }: Props) {
  const prefersReduced = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // focus management
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-white/80 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Stage (full-bleed; no max-w or side padding) */}
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">
        {/* Left: hero object */}
        <motion.div className="relative flex items-center justify-center" layout>
          <motion.div
            layoutId={`card-${skill.id}`}
            className="relative flex items-center justify-center"
            transition={spring(prefersReduced)}
          >
            <motion.div layoutId={`media-${skill.id}`} transition={spring(prefersReduced)}>
              <HeroGlyph type={skill.media.type} hue={skill.media.hue} />
            </motion.div>

            {/* Sticky caption like the reference */}
            <motion.div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 sm:left-[unset] sm:right-0 sm:translate-x-0"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReduced ? 0 : 0.2 }}
            >
              <span className="rounded border border-black/80 bg-white px-3 py-1 text-sm font-extrabold uppercase tracking-wide">
                {skill.title}
              </span>
            </motion.div>
          </motion.div>

          {/* Back button */}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded border border-black/80 bg-white text-xl font-bold leading-none outline-none ring-0 focus-visible:ring-2 focus-visible:ring-black/80"
            aria-label="Go back"
            title="Go back"
          >
            ←
          </button>
        </motion.div>

        {/* Right: detail rail (keeps minimal internal padding) */}
        <aside className="relative border-l border-black/10 bg-white">
          <FrameLines />
          <div className="relative z-10 h-full overflow-y-auto px-5 py-6 sm:px-8 sm:py-10">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-60">
              {skill.meta?.level ?? "skill"}
            </div>
            <motion.h1
              className="mb-3 text-2xl font-extrabold sm:text-3xl"
              initial={{ y: prefersReduced ? 0 : 12, opacity: prefersReduced ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: prefersReduced ? 0 : 0.4, ease: easeOut() }}
            >
              {skill.title}
            </motion.h1>

            <motion.p
              className="max-w-prose text-balance text-sm leading-relaxed sm:text-base"
              initial={{ y: prefersReduced ? 0 : 10, opacity: prefersReduced ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: prefersReduced ? 0 : 0.45,
                delay: prefersReduced ? 0 : 0.05,
                ease: easeOut(),
              }}
            >
              {skill.summary}
            </motion.p>

            {skill.highlights?.length ? (
              <motion.ul
                className="mt-6 space-y-2 text-sm"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: prefersReduced ? 0 : 0.06,
                      delayChildren: prefersReduced ? 0 : 0.15,
                    },
                  },
                }}
              >
                {skill.highlights.map((h: string, i: number) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { y: prefersReduced ? 0 : 6, opacity: prefersReduced ? 1 : 0 },
                      show: { y: 0, opacity: 1 },
                    }}
                    className="flex items-start gap-2"
                  >
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-black"
                    />
                    <span className="text-pretty">{h}</span>
                  </motion.li>
                ))}
              </motion.ul>
            ) : null}
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

function FrameLines() {
  return (
    <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden>
      <motion.rect
        x="0.5"
        y="0.5"
        rx="0"
        ry="0"
        width="99%"
        height="99%"
        fill="transparent"
        stroke="black"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        style={{ opacity: 0.6 }}
      />
    </svg>
  );
}

function HeroGlyph({
  type,
  hue = 0,
}: {
  type: Skill["media"]["type"];
  hue?: number;
}) {
  // Slight upscale vs card for the “escape” moment
  if (type === "blob") {
    return (
      <div className="origin-center">
        <svg
          width="520"
          height="360"
          viewBox="0 0 520 360"
          className="drop-shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
        >
          <defs>
            <linearGradient id={`g-hero-${hue}`} x1="0" x2="1">
              <stop offset="0%" stopColor={`hsl(${hue} 90% 60%)`} />
              <stop offset="100%" stopColor={`hsl(${hue} 80% 45%)`} />
            </linearGradient>
          </defs>
          <path
            d="M50 200c0-120 160-200 300-170s240 160 120 250-340 40-420-80z"
            fill={`url(#g-hero-${hue})`}
          />
        </svg>
      </div>
    );
  }
  if (type === "pill") {
    return (
      <svg
        width="520"
        height="240"
        viewBox="0 0 520 240"
        className="drop-shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
      >
        <rect
          x="20"
          y="40"
          rx="120"
          ry="120"
          width="480"
          height="160"
          fill={`hsl(${hue} 85% 55%)`}
        />
      </svg>
    );
  }
  return (
    <svg
      width="420"
      height="420"
      viewBox="0 0 420 420"
      className="drop-shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
    >
      <rect x="60" y="60" width="300" height="300" fill={`hsl(${hue} 80% 50%)`} />
      <rect
        x="60"
        y="60"
        width="300"
        height="300"
        fill="none"
        stroke="black"
        strokeOpacity="0.2"
      />
    </svg>
  );
}

/** Accepts boolean | null; coerces to boolean */
function spring(reduced: boolean | null): Transition {
  const r = !!reduced;
  return r
    ? { type: "spring", stiffness: 1, damping: 1, duration: 0 }
    : { type: "spring", stiffness: 260, damping: 26 };
}

function easeOut() {
  return [0.33, 1, 0.68, 1] as const;
}

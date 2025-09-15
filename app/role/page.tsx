// app/role/page.tsx
"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ----------------------------------------------------------
   Stable scroll utilities
---------------------------------------------------------- */

/**
 * rAF-throttled active-section hook.
 * Pass an array of element ids (e.g., ["#step-1", "#step-2"]) and it returns the index
 * closest to a vertical pivot (defaults to 45% viewport height).
 */
function useActiveOnScroll(targetIds: string[], pivot = 0.45) {
  const [active, setActive] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const els = targetIds
      .map((sel) => document.querySelector<HTMLElement>(sel))
      .filter(Boolean) as HTMLElement[];

    if (!els.length || typeof window === "undefined") return;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const pv = window.innerHeight * pivot;
        let bestIdx = 0;
        let bestDist = Infinity;
        for (let i = 0; i < els.length; i++) {
          const rect = els[i].getBoundingClientRect();
          const dist = Math.abs(rect.top - pv);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        }
        setActive(bestIdx);
        ticking.current = false;
      });
    };

    onScroll(); // initial calc
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetIds, pivot]);

  return active;
}

/* ----------------------------------------------------------
   Motion tokens (gentle, jank-free)
---------------------------------------------------------- */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const appear = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: EASE_OUT } },
});

/* ----------------------------------------------------------
   Page
---------------------------------------------------------- */

export default function RolePage() {
  // You can tune this to your fixed header height (px).
  // Example: 96px header → sticky columns sit just below it.
  const stickyTop = 96;
  const prefersReduced = useReducedMotion(); // boolean | null

  return (
    <main
      className="relative min-h-screen bg-white text-neutral-900"
      style={{ ["--sticky-top" as any]: `${stickyTop}px` }}
    >
      <Hero prefersReduced={prefersReduced} />

      <Divider />

      <Frame>
        <Understanding />
      </Frame>

      <Divider />

      {/* Sticky Section #1: Design that scales */}
      <Frame className="isolate">
        <ScaleSticky />
      </Frame>

      <Divider />

      <Frame>
        <Collaboration />
      </Frame>

      <Divider />

      {/* Sticky Section #2: From heuristic to shipped */}
      <Frame className="isolate">
        <HeuristicToShipped />
      </Frame>

      <Divider />

      <Frame>
        <StrengthsGrid />
      </Frame>

      <CTA />
    </main>
  );
}

/* ----------------------------------------------------------
   Shared layout wrappers
---------------------------------------------------------- */

function Frame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`relative mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</section>;
}

function Divider() {
  return <div className="mx-auto my-2 h-px w-[92%] max-w-6xl bg-neutral-200/80" aria-hidden />;
}

/* ----------------------------------------------------------
   Sections
---------------------------------------------------------- */

function Hero({ prefersReduced }: { prefersReduced: boolean | null }) {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-6 py-28 md:py-36 lg:py-44 isolate">
      <div className="relative">
        <motion.h1
          className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl"
          initial="initial"
          animate="animate"
          variants={appear(0)}
        >
          Designing clarity into complex systems and stories.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-700 md:text-xl"
          initial="initial"
          animate="animate"
          variants={appear(0.08)}
        >
          For over a decade, I’ve worked across industries and cultures, building brands, products,
          and systems that turn complexity into confidence.
        </motion.p>

        {/* Calm background block (no parallax) */}
        {!(prefersReduced === true) && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -top-10 bottom-[-60px] -z-10 rounded-3xl bg-neutral-950/3"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          />
        )}
      </div>
    </section>
  );
}

function Understanding() {
  const industries = [
    "Language schools",
    "Dance schools",
    "Construction giants",
    "Food startups",
    "Yacht brokers",
    "AI founders",
    "Global corporations",
    "Wine sellers",
  ];

  return (
    <div className="py-20 md:py-28">
      <motion.h2
        className="text-2xl font-medium tracking-tight md:text-3xl"
        initial="initial"
        animate="animate"
        variants={appear(0)}
      >
        Understanding people, shaping experiences
      </motion.h2>

      <div className="mt-6 grid gap-10 md:grid-cols-[1.1fr,1fr] md:gap-12">
        <motion.p
          className="text-base leading-relaxed text-neutral-700 md:text-lg"
          initial="initial"
          animate="animate"
          variants={appear(0.05)}
        >
          I start with empathy — whether it’s a bank client, a founder, or a restaurant owner. Since
          2014, I’ve designed for language schools, dance schools, construction giants, food
          startups, yacht brokers, AI tech founders, and global corporations. Each project has been
          about the same thing: understanding the need, and crafting an experience that feels
          simple, seamless, and human.
        </motion.p>

        <ul className="grid grid-cols-2 gap-3 md:gap-4" aria-label="Industries served (illustrative)">
          {industries.map((label, i) => (
            <motion.li
              key={label}
              className="rounded-xl border border-neutral-200/80 bg-white px-4 py-3 text-sm text-neutral-800 shadow-sm"
              initial="initial"
              animate="animate"
              variants={appear(0.06 + i * 0.03)}
            >
              {label}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------- Sticky #1: Design that scales -------------------- */

function ScaleSticky() {
  const steps = [
    {
      id: "scale-1",
      title: "Guidelines that travel",
      copy: "Establishing clear, repeatable brand rules across surfaces so teams ship consistently.",
      tag: "Global ad co — YouTube & social presence",
    },
    {
      id: "scale-2",
      title: "Motion as a system",
      copy: "Codifying movement primitives to create a coherent, expressive language for video and product.",
      tag: "Promo + product demos",
    },
    {
      id: "scale-3",
      title: "Executive-ready communication",
      copy: "Bilingual executive decks and narratives that align stakeholders and unlock decisions.",
      tag: "EN / FR presentations",
    },
    {
      id: "scale-4",
      title: "Foundations for scale",
      copy: "Complete app + brand systems that make design accessible, maintainable, and fast.",
      tag: "Startup cofound — brand & app",
    },
  ] as const;

  const active = useActiveOnScroll(steps.map((s) => `#${s.id}`), 0.45);

  return (
    <div className="py-20 md:py-28">
      <motion.h2
        className="text-2xl font-medium tracking-tight md:text-3xl"
        initial="initial"
        animate="animate"
        variants={appear(0)}
      >
        Design that scales
      </motion.h2>

      {/* Guard band before sticky starts to avoid collision with previous content */}
      <div className="h-8 md:h-12" aria-hidden />

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[0.95fr,1.05fr] md:gap-12 isolate">
        {/* Sticky rail (desktop only). No transforms on this container. */}
        <div className="z-10 md:sticky md:top-[var(--sticky-top)] md:self-start">
          <ol className="space-y-3" aria-label="Scaling principles">
            {steps.map((s, i) => (
              <li
                key={s.id}
                className={[
                  "rounded-lg border px-4 py-3 text-sm transition-colors",
                  i === active
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-800",
                ].join(" ")}
              >
                <div className="font-medium">
                  {String(i + 1).padStart(2, "0")}. {s.title}
                </div>
                <div className={i === active ? "opacity-100" : "opacity-70"}>{s.tag}</div>
              </li>
            ))}
          </ol>
        </div>

        {/* Scrolling content (can animate inner elements, not the wrapper) */}
        <div className="relative z-0">
          {steps.map((s, i) => (
            <article
              id={s.id}
              key={s.id}
              className="min-h-[85svh] scroll-mt-[var(--sticky-top)] py-10 md:py-14"
            >
              <motion.div
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                initial="initial"
                animate="animate"
                variants={appear(0.04)}
              >
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-neutral-700">{s.copy}</p>
                <div
                  aria-hidden
                  className="mt-6 aspect-[16/9] w-full rounded-xl border border-dashed border-neutral-300"
                />
                <p className="mt-2 text-xs uppercase tracking-wide text-neutral-500">{s.tag}</p>
              </motion.div>
            </article>
          ))}
        </div>
      </div>

      {/* Guard band after sticky ends so next section doesn't overlap */}
      <div className="h-10 md:h-16" aria-hidden />
    </div>
  );
}

/* -------------------- Collaboration (linear) -------------------- */

function Collaboration() {
  const threads = [
    {
      title: "Executives — New York",
      copy: "Working directly with leadership to clarify strategy, align goals, and ship with confidence.",
    },
    {
      title: "Marketing — Barcelona",
      copy: "Partnering with teams to develop campaigns, content systems, and social presence.",
    },
    {
      title: "Founders — Paris",
      copy: "Translating vision into product narratives, investor decks, and prototypes that persuade.",
    },
    {
      title: "Engineering — Across Europe",
      copy: "Running reviews, documenting design decisions, and maintaining velocity with clear specs.",
    },
  ];

  const langs = ["FR", "EN", "ES"];

  return (
    <div className="py-20 md:py-28">
      <motion.h2
        className="text-2xl font-medium tracking-tight md:text-3xl"
        initial="initial"
        animate="animate"
        variants={appear(0)}
      >
        Collaboration that builds trust
      </motion.h2>

      <div className="mt-6 grid gap-10 md:grid-cols-[1.05fr,0.95fr] md:gap-12">
        <motion.p
          className="text-base leading-relaxed text-neutral-700 md:text-lg"
          initial="initial"
          animate="animate"
          variants={appear(0.05)}
        >
          I’ve worked directly with executives in New York, marketing teams in Barcelona, founders in
          Paris, and developers across Europe. Fluent in French, English, and Spanish, I bridge teams
          and align stakeholders across cultures. I’ve led workshops, designed investor decks that
          secure funding, and run product reviews that keep projects moving forward.
        </motion.p>

        <div>
          <ul className="space-y-4">
            {threads.map((t, i) => (
              <motion.li
                key={t.title}
                className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
                initial="initial"
                animate="animate"
                variants={appear(0.06 + i * 0.05)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold">{t.title}</h3>
                  <span className="h-px flex-1 bg-neutral-200" aria-hidden />
                </div>
                <p className="mt-2 text-sm text-neutral-700">{t.copy}</p>
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 flex gap-2" aria-label="Languages">
            {langs.map((l, i) => (
              <motion.span
                key={l}
                className="rounded-full border border-neutral-200 px-3 py-1 text-xs tracking-wide text-neutral-700"
                initial="initial"
                animate="animate"
                variants={appear(0.25 + i * 0.05)}
              >
                {l}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Sticky #2: From heuristic to shipped -------------------- */

function HeuristicToShipped() {
  const steps = [
    {
      id: "ship-1",
      title: "Heuristic audit",
      copy: "Identify friction, label hotspots, and propose targeted, high-leverage improvements.",
      label: "Audit overlays",
    },
    {
      id: "ship-2",
      title: "Prototype interactions",
      copy: "Prototype the critical path to validate flow, timing, and clarity before build.",
      label: "Prototype path",
    },
    {
      id: "ship-3",
      title: "Design motion",
      copy: "Create motion assets and transitions that explain, delight, and stay on-brand.",
      label: "Motion primitives",
    },
    {
      id: "ship-4",
      title: "Ship with confidence",
      copy: "Document decisions, align teams, and deliver assets that make shipping predictable.",
      label: "Release-ready",
    },
  ] as const;

  const active = useActiveOnScroll(steps.map((s) => `#${s.id}`), 0.45);

  return (
    <div className="py-20 md:py-28">
      <motion.h2
        className="text-2xl font-medium tracking-tight md:text-3xl"
        initial="initial"
        animate="animate"
        variants={appear(0)}
      >
        From heuristic to shipped
      </motion.h2>

      {/* Guard band */}
      <div className="h-8 md:h-12" aria-hidden />

      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-[1.05fr,0.95fr] md:gap-12 isolate">
        {/* Sticky media (desktop) */}
        <div className="z-10 md:sticky md:top-[var(--sticky-top)] md:self-start">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div
              aria-live="polite"
              className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-dashed border-neutral-300"
            >
              <div className="absolute right-3 top-3 rounded-md border border-neutral-200 bg-white/80 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-neutral-700 z-20">
                {String(active + 1).padStart(2, "0")} / 04
              </div>
            </div>
            <p className="mt-3 text-xs uppercase tracking-wide text-neutral-500">{steps[active]?.label}</p>
          </div>
        </div>

        {/* Steps (no transforms on wrapper) */}
        <div className="relative z-0">
          {steps.map((s, i) => (
            <article
              id={s.id}
              key={s.id}
              className="min-h-[85svh] scroll-mt-[var(--sticky-top)] py-10 md:py-14"
            >
              <motion.div
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                initial="initial"
                animate="animate"
                variants={appear(0.04)}
              >
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-neutral-700">{s.copy}</p>

                <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                  <li className="rounded-md border border-neutral-200 px-3 py-2">Proof point {i + 1}.1</li>
                  <li className="rounded-md border border-neutral-200 px-3 py-2">Proof point {i + 1}.2</li>
                </ul>
              </motion.div>
            </article>
          ))}
        </div>
      </div>

      {/* Guard band */}
      <div className="h-10 md:h-16" aria-hidden />
    </div>
  );
}

/* -------------------- Strengths -------------------- */

function StrengthsGrid() {
  const strengths = [
    {
      title: "A decade of experience",
      copy: "Branding, web, digital, and product — from local startups to global enterprises.",
    },
    {
      title: "Systems thinking",
      copy: "Guidelines, templates, and design systems that scale across teams and time.",
    },
    {
      title: "Craft that inspires confidence",
      copy: "Polished, accessible, and strategic — details that add up to trust.",
    },
    {
      title: "Communication across disciplines",
      copy: "From executives to engineers, I translate goals into clear, actionable work.",
    },
    {
      title: "Multi-lingual collaboration",
      copy: "Fluent in FR / EN / ES; comfortable bridging cultures and contexts.",
    },
    {
      title: "Curiosity & adaptability",
      copy: "Always exploring tools and methods to improve outcomes, not add noise.",
    },
  ];

  return (
    <div className="py-20 md:py-28">
      <motion.h2
        className="text-2xl font-medium tracking-tight md:text-3xl"
        initial="initial"
        animate="animate"
        variants={appear(0)}
      >
        What I bring
      </motion.h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {strengths.map((s, i) => (
          <motion.article
            key={s.title}
            className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5 focus-within:-translate-y-0.5"
            initial="initial"
            animate="animate"
            variants={appear(0.04 + i * 0.03)}
          >
            <h3 className="text-base font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-neutral-700">{s.copy}</p>
            <span
              aria-hidden
              className="mt-4 inline-block h-px w-12 bg-neutral-200 transition-all group-hover:w-16"
            />
          </motion.article>
        ))}
      </div>
    </div>
  );
}

/* -------------------- CTA -------------------- */

function CTA() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24 isolate">
      <div className="rounded-2xl border border-neutral-900 bg-neutral-900 p-8 text-white">
        <p className="text-xl md:text-2xl">
          Looking for a designer who can translate complexity into clarity — and deliver work that
          scales across teams, products, and cultures? Let’s talk.
        </p>
        <div className="mt-6">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-medium text-neutral-900 outline-none ring-0 transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Get in touch
          </a>
          <a
            href="/work"
            className="ml-3 inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-medium text-white/90 outline-none ring-0 transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/60"
          >
            See work
          </a>
        </div>
      </div>
    </section>
  );
}

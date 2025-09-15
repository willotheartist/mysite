// components/sections/StickyPhilosophy.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SplitText from "@/components/utility/SplitText";
import CaseTeaserCard from "@/components/sections/CaseTeaserCard";

gsap.registerPlugin(ScrollTrigger);

/**
 * CONTENT ONLY CHANGED BELOW (arrays). Mechanics/animations untouched.
 */

type HeroPanel = { headline: string; sub?: string; visual?: "phone" | "card" | "grid" | "none" };

// A — HERO / NARRATIVE SLIDES (4)
const HERO_PANELS: HeroPanel[] = [
  {
    headline: "Designing clarity into complex systems and stories.",
    sub: "A decade of brand, product, and system design—turning complexity into confidence.",
    visual: "card",
  },
  {
    headline: "Understanding people, shaping experiences.",
    sub: "From language schools to global enterprises—empathy first, always.",
    visual: "phone",
  },
  {
    headline: "Design that scales.",
    sub: "Guidelines, motion systems, and bilingual executive decks that travel.",
    visual: "grid",
  },
  {
    headline: "From heuristic to shipped.",
    sub: "Audit → prototype → motion → delivery. Predictable, confident launches.",
    visual: "none",
  },
];

// B — PROOF / CASE TEASERS (3)
const CASES = [
  {
    logo: "Global Ad Co",
    imageSrc: "/case-studies/project-1/asset-1.jpg",
    keywords: ["Guidelines", "YouTube", "Social", "Systems"] as const,
  },
  {
    logo: "Cofound App",
    imageSrc: "/case-studies/project-1/asset-1.jpg",
    keywords: ["Brand", "Product", "Design System", "Handoff"] as const,
  },
  {
    logo: "Executive Comms",
    imageSrc: "/case-studies/project-1/asset-1.jpg",
    keywords: ["Bilingual Decks", "Narrative", "Workshops", "Buy-in"] as const,
  },
] as const;

// C — VALUE PILLARS (4)  ← distilled from “What I bring”
const PILLARS = [
  { title: "Systems thinking", sub: "Guidelines, templates, and design systems that scale.", stat: 1 },
  { title: "Craft that inspires", sub: "Polished, accessible, strategic details that build trust.", stat: 2 },
  { title: "Collaboration", sub: "Execs ↔︎ engineering; clarity across FR / EN / ES.", stat: 3 },
  { title: "Adaptability", sub: "Curiosity and range—branding, web, digital, and product.", stat: 4 },
] as const;

// D — MORPHING WORDS (4)
const MORPH_WORDS = ["clarity", "scale", "trust", "impact"] as const;

// Chapter lengths in "viewport units" to drive dots (A:4, B:3, C:4, D:3 => total 14)
const CHAPTER_UNITS = [4, 3, 4, 3] as const;
const TOTAL_UNITS = CHAPTER_UNITS.reduce((a, b) => a + b, 0);
const THRESHOLDS = [
  CHAPTER_UNITS[0] / TOTAL_UNITS,
  (CHAPTER_UNITS[0] + CHAPTER_UNITS[1]) / TOTAL_UNITS,
  (CHAPTER_UNITS[0] + CHAPTER_UNITS[1] + CHAPTER_UNITS[2]) / TOTAL_UNITS,
  1,
];

export default function StickyPhilosophy() {
  const reduceMotion = useReducedMotion();

  // Root for overall progress
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<HTMLLIElement[]>([]);

  // Refs for chapters
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroSlidesRef = useRef<HTMLDivElement[]>([]);
  const casesRef = useRef<HTMLDivElement | null>(null);
  const caseCardsRef = useRef<HTMLDivElement[]>([]);
  const pillarsRef = useRef<HTMLDivElement | null>(null);
  const pillarRefs = useRef<HTMLDivElement[]>([]);
  const morphRef = useRef<HTMLDivElement | null>(null);
  const morphWordRef = useRef<HTMLSpanElement | null>(null);

  // Proper ref setters (return void)
  const setHero = (i: number) => (el: HTMLDivElement | null): void => {
    if (el) heroSlidesRef.current[i] = el;
  };
  const setCase = (i: number) => (el: HTMLDivElement | null): void => {
    if (el) caseCardsRef.current[i] = el;
  };
  const setPillar = (i: number) => (el: HTMLDivElement | null): void => {
    if (el) pillarRefs.current[i] = el;
  };
  const setDot = (i: number) => (el: HTMLLIElement | null): void => {
    if (el) dotRefs.current[i] = el;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Progress bar across entire component (works in both motion modes)
    const progressST = ScrollTrigger.create({
      trigger: rootRef.current!,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        if (progressFillRef.current) {
          progressFillRef.current.style.height = `${Math.min(100, Math.max(0, p * 100))}%`;
        }
        // Dot activation based on thresholds
        const activeIdx = p < THRESHOLDS[0] ? 0 : p < THRESHOLDS[1] ? 1 : p < THRESHOLDS[2] ? 2 : 3;
        dotRefs.current.forEach((el, i) => {
          if (!el) return;
          if (i === activeIdx) {
            el.classList.add("bg-black");
            el.classList.remove("bg-black/30");
          } else {
            el.classList.add("bg-black/30");
            el.classList.remove("bg-black");
          }
        });
      },
    });

    if (reduceMotion) {
      return () => {
        progressST.kill();
      };
    }

    const ctx = gsap.context(() => {
      // Optional Lenis sync
      // @ts-ignore
      const lenis = (window as any)?.lenis;
      if (lenis?.on) lenis.on("scroll", ScrollTrigger.update);

      // --- A) HERO ---
      if (heroRef.current) {
        const slides = heroSlidesRef.current.filter(Boolean);
        gsap.set(slides, { autoAlpha: 0, yPercent: 4, scale: 0.99 });
        if (slides[0]) gsap.set(slides[0], { autoAlpha: 1, yPercent: 0, scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: () => `+=${slides.length * window.innerHeight}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
          defaults: { ease: "none" },
        });

        for (let i = 0; i < slides.length - 1; i++) {
          const curr = slides[i];
          const next = slides[i + 1];
          const D = 1;
          tl.to(curr, { autoAlpha: 0, yPercent: -2, scale: 0.99, duration: 0.5 }, i * D + 0.35);
          tl.to(next, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.5 }, i * D + 0.35);
        }
      }

      // --- B) CASES ---
      if (casesRef.current) {
        const cards = caseCardsRef.current.filter(Boolean);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: casesRef.current,
            start: "top top",
            end: () => `+=${cards.length * window.innerHeight}`,
            scrub: 1,
            pin: true,
          },
        });

        cards.forEach((card, i) => {
          const image = card.querySelector("[data-el=mock]");
          const chips = card.querySelectorAll("[data-el=chip]");
          if (i === 0) gsap.set(card, { autoAlpha: 1, y: 0 });
          else gsap.set(card, { autoAlpha: 0, y: 40 });

          const D = 1;
          tl.to(card, { autoAlpha: 1, y: 0, duration: 0.6 }, i * D + 0.05);
          if (image) tl.fromTo(image, { scale: 0.97 }, { scale: 1, duration: 0.6 }, i * D + 0.1);
          chips.forEach((chip, idx) => {
            tl.fromTo(
              chip,
              { y: 12, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.3 },
              i * D + 0.2 + idx * 0.06
            );
          });
          if (i < cards.length - 1) {
            tl.to(card, { autoAlpha: 0, y: -20, duration: 0.5 }, (i + 0.75) * D);
          }
        });
      }

      // --- C) PILLARS ---
      if (pillarsRef.current) {
        const items = pillarRefs.current.filter(Boolean);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top top",
            end: () => `+=${items.length * window.innerHeight}`,
            scrub: 1,
            pin: true,
          },
        });

        items.forEach((el, i) => {
          const stat = el.querySelector("[data-el=stat]");
          const D = 1;
          gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
          tl.to(el, { autoAlpha: 1, y: 0, duration: 0.5 }, i * D + 0.1);

          if (stat) {
            const obj = { v: 0 };
            tl.to(
              [obj],
              {
                v: (i + 1) * 1,
                duration: 0.6,
                onUpdate: () => {
                  (stat as HTMLElement).innerText = String(Math.round(obj.v));
                },
              },
              i * D + 0.1
            );
          }

          if (i < items.length - 1) {
            tl.to(el, { autoAlpha: 0, y: -20, duration: 0.5 }, (i + 0.75) * D);
          }
        });
      }

      // --- D) MORPH ---
      if (morphRef.current && morphWordRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: morphRef.current,
            start: "top top",
            end: () => "+=300vh",
            scrub: 1,
            pin: true,
          },
        });

        MORPH_WORDS.forEach((word, i) => {
          const D = 1;
          tl.to(
            morphWordRef.current!,
            {
              opacity: 0,
              y: -8,
              duration: 0.25,
              onComplete: () => {
                if (morphWordRef.current) morphWordRef.current.textContent = word;
              },
            },
            i * D + 0.2
          ).to(morphWordRef.current!, { opacity: 1, y: 0, duration: 0.25 }, i * D + 0.45);
        });
      }
    }, rootRef);

    return () => {
      progressST.kill();
      ctx.revert();
    };
  }, [reduceMotion]);

  const charVariants = useMemo(
    () => ({
      container: { transition: { staggerChildren: 0.02 } },
      char: {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
      },
    }),
    []
  );

  // Reduced motion: stacked sections still show progress
  if (reduceMotion) {
    return (
      <div ref={rootRef} className="relative">
        {/* Progress overlay */}
        <div className="pointer-events-none fixed right-4 top-1/2 z-10 -translate-y-1/2">
          <div className="relative h-64 w-1 overflow-hidden rounded-full bg-black/10">
            <div ref={progressFillRef} className="absolute bottom-0 left-0 w-full bg-black" style={{ height: "0%" }} />
          </div>
          <ul className="mt-3 flex flex-col items-center gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} ref={setDot(i)} className="h-2 w-2 rounded-full bg-black/30" aria-hidden />
            ))}
          </ul>
        </div>

        <div className="space-y-32">
          {HERO_PANELS.map((p, i) => (
            <section key={i} className="mx-auto flex min-h-dvh max-w-6xl items-center px-6">
              <div className="grid w-full grid-cols-1 items-center gap-10 sm:grid-cols-2">
                <header className="text-center sm:text-left">
                  <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{p.headline}</h2>
                  {p.sub && <p className="mt-4 max-w-md text-lg text-neutral-600">{p.sub}</p>}
                </header>
                {p.visual !== "none" && (
                  <div className="relative">
                    <div className="relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-black/10 shadow-sm">
                      <Image
                        src="/case-studies/project-1/asset-1.jpg"
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 400px, 90vw"
                        priority={false}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}

          {CASES.map((c, i) => (
            <section key={i} className="mx-auto max-w-5xl px-6">
              <CaseTeaserCard logo={c.logo} imageSrc="/case-studies/project-1/asset-1.jpg" keywords={c.keywords} />
            </section>
          ))}

          <section className="mx-auto max-w-5xl px-6">
            <ul className="grid gap-6 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <li key={i} className="rounded-2xl border border-black/10 p-6">
                  <p className="text-sm text-neutral-500">0{i + 1}</p>
                  <h3 className="mt-1 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-neutral-600">{p.sub}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-6 text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              I design for <span>impact</span>.
            </h2>
          </section>
        </div>
      </div>
    );
  }

  // Default animated sticky experience
  return (
    <div ref={rootRef} className="relative">
      {/* Progress overlay */}
      <div className="pointer-events-none fixed right-4 top-1/2 z-10 -translate-y-1/2">
        <div className="relative h-64 w-1 overflow-hidden rounded-full bg-black/10">
          <div ref={progressFillRef} className="absolute bottom-0 left-0 w-full bg-black" style={{ height: "0%" }} />
        </div>
        <ul className="mt-3 flex flex-col items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} ref={setDot(i)} className="h-2 w-2 rounded-full bg-black/30" aria-hidden />
          ))}
        </ul>
      </div>

      {/* A — Hero storytelling sticky (4 units) */}
      <section className="relative h-[calc(100vh*4)]" aria-label="Hero storytelling">
        <div ref={heroRef} className="sticky top-0 h-dvh overflow-hidden bg-white">
          {HERO_PANELS.map((p, i) => (
            <div key={i} ref={setHero(i)} className="absolute inset-0 flex items-center justify-center">
              <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 sm:grid-cols-2">
                <header className="text-center sm:text-left">
                  <h2 className="text-pretty text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                    <SplitText text={p.headline} as={motion.span} variants={charVariants} />
                  </h2>
                  {p.sub && <p className="mt-4 max-w-md text-lg text-neutral-600">{p.sub}</p>}
                </header>

                {p.visual !== "none" && (
                  <div className="relative">
                    <div
                      className={[
                        "relative overflow-hidden border border-black/10 bg-white shadow-sm",
                        p.visual === "phone"
                          ? "h-[520px] w-[260px] rounded-[36px] mx-auto"
                          : "h-64 w-full max-w-md rounded-2xl mx-auto",
                      ].join(" ")}
                      aria-hidden
                    >
                      <Image
                        src="/case-studies/project-1/asset-1.jpg"
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 400px, 90vw"
                        priority={false}
                      />
                    </div>

                    {p.visual === "grid" && (
                      <div className="mt-4 grid h-32 w-full max-w-md grid-cols-3 gap-3 mx-auto" aria-hidden>
                        {Array.from({ length: 3 }).map((_, k) => (
                          <div key={k} className="relative overflow-hidden rounded-xl border border-black/10">
                            <Image
                              src="/case-studies/project-1/asset-1.jpg"
                              alt="Preview"
                              fill
                              className="object-cover"
                              sizes="(min-width: 1024px) 120px, 30vw"
                              priority={false}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* B — Case study teasers sticky (3 units) */}
      <section className="relative h-[calc(100vh*3)] bg-[#f8f8f8]" aria-label="Case study teasers">
        <div ref={casesRef} className="sticky top-0 mx-auto flex h-dvh w-full items-center justify-center px-6">
          {CASES.map((c, i) => (
            <div key={i} ref={setCase(i)} className="absolute inset-0 flex items-center justify-center">
              <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2">
                <div className="relative">
                  <div
                    data-el="mock"
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
                  >
                    <Image
                      src="/case-studies/project-1/asset-1.jpg"
                      alt={`${c.logo} preview`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 560px, 90vw"
                      priority={false}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold">{c.logo}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.keywords.map((k, idx) => (
                      <li
                        key={idx}
                        data-el="chip"
                        className="rounded-full border border-black/10 px-3 py-1 text-sm text-neutral-700"
                      >
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* C — Value pillars sticky (4 units) */}
      <section className="relative h-[calc(100vh*4)] bg-white" aria-label="Value pillars">
        <div ref={pillarsRef} className="sticky top-0 mx-auto flex h-dvh items-center justify-center px-6">
          {PILLARS.map((p, i) => (
            <div key={i} ref={setPillar(i)} className="absolute inset-0 flex items-center justify-center">
              <div className="mx-auto w-full max-w-5xl">
                <div className="rounded-3xl border border-black/10 p-10 text-center shadow-sm">
                  <p className="text-sm text-neutral-500">0{i + 1}</p>
                  <h3 className="mt-2 text-4xl font-semibold">{p.title}</h3>
                  <p className="mx-auto mt-3 max-w-md text-neutral-600">{p.sub}</p>
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <span className="text-neutral-500">Pillar</span>
                    <span data-el="stat" className="text-3xl font-semibold">
                      0
                    </span>
                    <span className="text-neutral-500">/ {PILLARS.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* D — Text morphing narrative (3 units) */}
      <section className="relative h-[300vh] bg-[#f6f6f6]" aria-label="Text morphing">
        <div ref={morphRef} className="sticky top-0 flex h-dvh items-center justify-center px-6 text-center">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
            I design for <span ref={morphWordRef} className="inline-block align-baseline">impact</span>.
          </h2>
          <p className="sr-only">Words morph: clarity → scale → trust → impact</p>
        </div>
      </section>
    </div>
  );
}

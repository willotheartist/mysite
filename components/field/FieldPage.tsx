"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import { useLenis } from "@/hooks/useLenis";
import { getGSAP } from "@/lib/gsap";

// Keep your local components as-is; don't rely on their types here.
import FlipCard from "./FlipCard";
import SmokeCircle from "./SmokeCircle";
import Marquee from "./Marquee";

/**
 * Section order:
 * splash → hero → poem → images → statements → flip cards → smoke → footer → marquee
 *
 * Notes:
 * - No useSectionBg here (to avoid BgStep/return-type conflicts). We drive bg via GSAP on document.body.
 * - FlipCard gets only { title, subtitle } to match your type (errors showed description/points aren’t allowed).
 * - SmokeCircle rendered without avatars prop to avoid Avatar shape mismatch.
 */

export default function FieldPage() {
  useLenis();
  const prefersReducedMotion = useReducedMotion();

  // ---------- refs ----------
  const splashRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroCaptionRef = useRef<HTMLDivElement | null>(null);
  const poemRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const statementsRef = useRef<HTMLDivElement | null>(null);
  const flipsRef = useRef<HTMLDivElement | null>(null);
  const smokeRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  // ---------- micro parallax for splash ----------
  const { scrollYProgress: splashProg } = useScroll({
    target: splashRef,
    offset: ["start end", "end start"],
  });
  const splashScale = useTransform(splashProg, [0, 0.7, 1], [1.01, 0.98, 0.94]);
  const splashOpacity = useTransform(splashProg, [0, 0.8, 1], [1, 1, 0]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { gsap, ScrollTrigger } = getGSAP();
    const ctx = gsap.context(() => {
      const easeOut = "power3.out";
      const easeInOut = "power2.inOut";
      const mm = gsap.matchMedia();

      // Helper to set page bg safely
      const setPageBg = (hex: string) => {
        gsap.to(document.body, { backgroundColor: hex, duration: 0.4, ease: easeInOut });
        // optional CSS var if you use it elsewhere:
        (document.documentElement as HTMLElement).style.setProperty("--site-bg", hex);
      };

      // ---------- SPLASH ----------
      ScrollTrigger.create({
        trigger: splashRef.current,
        start: "top 80%",
        onEnter: () => setPageBg("#0a0a0a"),
        onEnterBack: () => setPageBg("#0a0a0a"),
      });

      // ---------- HERO (pin + parallax) ----------
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom+=40% top",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          onEnter: () => setPageBg("#0d0d0d"),
          onEnterBack: () => setPageBg("#0d0d0d"),
        });

        if (heroCaptionRef.current) {
          gsap.fromTo(
            heroCaptionRef.current,
            { y: 16, opacity: 0.9 },
            {
              y: -24,
              opacity: 1,
              ease: easeOut,
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }

        if (heroVideoRef.current) {
          gsap.fromTo(
            heroVideoRef.current,
            { scale: 1.02 },
            {
              scale: 1,
              ease: easeInOut,
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        }
      });

      // ---------- POEM (pin + lines) ----------
      const poemCard = poemRef.current?.querySelector('[data-poem="card"]') as HTMLElement | null;
      const poemLines = gsap.utils.toArray<HTMLElement>('[data-poem="line"]');
      if (poemRef.current && poemCard) {
        ScrollTrigger.create({
          trigger: poemRef.current,
          start: "top center",
          end: "bottom center+=10%",
          onEnter: () => setPageBg("#0c0c0c"),
          onEnterBack: () => setPageBg("#0c0c0c"),
        });

        ScrollTrigger.create({
          trigger: poemRef.current,
          start: "top 65%",
          end: "bottom 35%",
          pin: poemCard,
          scrub: true,
        });

        gsap.fromTo(
          poemLines,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: easeOut,
            stagger: 0.12,
            scrollTrigger: {
              trigger: poemRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      // ---------- IMAGES (stagger) ----------
      if (imagesRef.current) {
        const shots = gsap.utils.toArray<HTMLElement>('[data-grid="shot"]');
        gsap.fromTo(
          shots,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: easeOut,
            duration: 0.7,
            stagger: { each: 0.08, from: "start" },
            scrollTrigger: { trigger: imagesRef.current, start: "top 75%", once: true },
          }
        );
      }

      // ---------- STATEMENTS (in → soften) ----------
      if (statementsRef.current) {
        const lines = gsap.utils.toArray<HTMLElement>('[data-statement="line"]');
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: easeOut,
              scrollTrigger: {
                trigger: line,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
          gsap.to(line, {
            y: -16,
            opacity: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 30%",
              end: "bottom 20%",
              scrub: true,
            },
          });
        });
      }

      // ---------- FLIP CARDS (batch) ----------
      if (flipsRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>('[data-flip="card"]');
        gsap.fromTo(
          cards,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: easeOut,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: { trigger: flipsRef.current, start: "top 80%", once: true },
          }
        );
      }

      // ---------- SMOKE zoom + FOOTER bg ----------
      if (smokeRef.current) {
        const orbit = smokeRef.current.querySelector('[data-smoke="orbit"]');
        if (orbit) {
          gsap.fromTo(
            orbit,
            { scale: 0.95 },
            {
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: smokeRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: smokeRef.current,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => setPageBg("#0b0b0b"),
          onEnterBack: () => setPageBg("#0b0b0b"),
        });
      }

      if (footerRef.current) {
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top 80%",
          onEnter: () => setPageBg("#0a0a0a"),
          onEnterBack: () => setPageBg("#0a0a0a"),
        });
      }
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // small framer fade helper (non-blocking)
  const fadeUp = {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  } as const;

  return (
    <main id="field" className="relative min-h-screen w-full text-white antialiased">
      {/* ========================= SPLASH ========================= */}
      <section
        id="splash"
        ref={splashRef}
        className="relative flex min-h-[92svh] items-center justify-center px-6 py-28 md:py-44"
        aria-label="Intro splash"
      >
        <motion.div
          style={!prefersReducedMotion ? { scale: splashScale, opacity: splashOpacity } : undefined}
          className="mx-auto max-w-6xl text-center"
        >
          <motion.p
            {...fadeUp}
            className="mb-5 text-sm/none uppercase tracking-[0.2em] text-zinc-400"
          >
            Field Notes
          </motion.p>

          <motion.h1
            {...fadeUp}
            className="mx-auto max-w-[16ch] text-balance text-5xl font-semibold leading-tight tracking-[-0.02em] md:text-7xl"
          >
            Senior Digital Designer crafting crisp, high-contrast experiences.
          </motion.h1>

          <motion.p
            {...fadeUp}
            className="mx-auto mt-6 max-w-[60ch] text-pretty text-base text-zinc-300 md:text-lg"
          >
            Strategy-first visuals. Thoughtful motion. Systematic polish.
          </motion.p>
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(55%_60%_at_50%_40%,#000_60%,transparent_100%)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
      </section>

      {/* ========================= HERO (PINNED) ========================= */}
      <section
        id="hero"
        ref={heroRef}
        className="relative isolate min-h-[120svh] w-full overflow-clip"
        aria-label="Hero reel"
      >
        <div className="absolute inset-0">
          <VideoHero ref={heroVideoRef} />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.6),transparent_20%),radial-gradient(1200px_500px_at_50%_0%,rgba(10,10,10,0.35),transparent_60%)]" />
        </div>

        <div
          ref={heroCaptionRef}
          className="relative z-10 mx-auto flex max-w-6xl flex-col gap-3 px-6 pb-10 pt-[70svh] md:pb-16"
        >
          <motion.p
            {...fadeUp}
            className="w-fit rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-200/90 backdrop-blur-[1px]"
          >
            Selected Work
          </motion.p>

          <motion.h2
            {...fadeUp}
            className="text-balance text-3xl font-semibold tracking-[-0.01em] md:text-5xl"
          >
            Digital products with clear hierarchy and measured motion.
          </motion.h2>

          <motion.p
            {...fadeUp}
            className="max-w-[70ch] text-pretty text-sm text-zinc-300 md:text-base"
          >
            Reel compiled from recent case studies. Role: end-to-end design across IA,
            UI systems, and motion direction. Tools: Figma, After Effects, GSAP, R3F.
          </motion.p>
        </div>
      </section>

      {/* ========================= POEM (PIN) ========================= */}
      <section id="poem" ref={poemRef} className="px-6 py-28 md:py-44">
        <div
          data-poem="card"
          className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10"
        >
          <p data-poem="line" className="text-lg text-zinc-200 md:text-xl">
            I design with intention, not ornament.
          </p>
          <p data-poem="line" className="mt-3 text-lg text-zinc-300 md:text-xl">
            Systems give rhythm; motion gives breath.
          </p>
          <p data-poem="line" className="mt-3 text-lg text-zinc-400 md:text-xl">
            Clarity first. Then character.
          </p>
        </div>
      </section>

      {/* ========================= IMAGES (STAGGER REVEAL) ========================= */}
      <section id="images" ref={imagesRef} className="px-6 py-28 md:py-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["/placeholders/1.jpg", "/placeholders/2.jpg", "/placeholders/3.jpg"].map((src) => (
            <div key={src} data-grid="shot" className="h-72 w-full overflow-hidden rounded-2xl">
              <Image src={src} alt="" width={1200} height={800} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ========================= STATEMENTS (SEQUENTIAL) ========================= */}
      <section id="statements" ref={statementsRef} className="px-6 py-28 md:py-40">
        <div className="mx-auto max-w-4xl space-y-12">
          <StatementLine text="Design is editing. Remove everything that doesn’t help." />
          <StatementLine text="Motion should clarify, never distract." />
          <StatementLine text="Hierarchy > decoration. Always." />
        </div>
      </section>

      {/* ========================= FLIP CARDS (BATCH REVEAL) ========================= */}
      <section id="flip-cards" ref={flipsRef} className="px-6 py-28 md:py-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          <div data-flip="card">
            <FlipCard
              front={{ title: "Role", subtitle: "Senior Digital Designer" }}
              back={{ title: "Focus", subtitle: "Design systems & motion direction" }}
            />
          </div>
          <div data-flip="card">
            <FlipCard
              front={{ title: "Superpower", subtitle: "Clarity under pressure" }}
              back={{ title: "How", subtitle: "Cut through ambiguity, ship fast" }}
            />
          </div>
          <div data-flip="card">
            <FlipCard
              front={{ title: "Edge", subtitle: "Systematic polish" }}
              back={{ title: "Means", subtitle: "Consistent rhythm, meaningful motion" }}
            />
          </div>
        </div>
      </section>

      {/* ========================= SMOKE (ZOOM) → FOOTER ========================= */}
      <section id="smoke" ref={smokeRef} className="px-6 py-28 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div data-smoke="orbit">
            {/* No props to avoid Avatar shape mismatch; component should handle its own defaults */}
            <SmokeCircle avatars={[]} />
          </div>
        </div>
      </section>

      {/* ========================= FOOTER + MARQUEE ========================= */}
      <footer id="footer" ref={footerRef} className="px-6 pb-20 pt-10 md:pb-24">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h4 className="text-2xl font-semibold tracking-tight">Let’s build something crisp.</h4>
            <p className="mt-2 max-w-[60ch] text-zinc-400">
              Available for senior product design + motion direction.
            </p>
          </div>
          <a
            href="mailto:hello@example.com"
            className="rounded-full border border-white/15 px-5 py-3 text-sm tracking-wide text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Email me
          </a>
        </div>
      </footer>

      <Marquee
        items={[
          "Interaction Design",
          "Motion Systems",
          "Design Systems",
          "Prototyping",
          "R3F",
          "GSAP",
          "Framer Motion",
        ]}
      />
    </main>
  );
}

/* -------------------- Local pieces -------------------- */

const StatementLine = ({ text }: { text: string }) => {
  return (
    <p
      data-statement="line"
      className="text-balance text-2xl font-medium leading-snug tracking-tight text-zinc-200 md:text-3xl"
    >
      {text}
    </p>
  );
};

const VideoHero = React.forwardRef<HTMLVideoElement, {}>(function VideoHero(_, ref) {
  return (
    <video
      ref={ref}
      className="h-[120svh] w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster="/video/hero-poster.jpg"
      aria-label="Hero background reel"
    >
      <source src="/video/hero.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
});

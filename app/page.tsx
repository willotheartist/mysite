// app/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// 🚫 Avoid SSR issues for DOM/scroll heavy components
const ProjectsShowcase = dynamic(() => import("@/components/sections/ProjectsShowcase"), { ssr: false });
const HeroInteractive = dynamic(() => import("@/components/sections/HeroInteractive"), { ssr: false });
// ✅ Serpentine animated text
const SerpentineSection = dynamic(() => import("@/components/sections/SerpentineSection"), { ssr: false });
// 🧵 Marquee section (slow scroll, 200px text)
const MarqueeSection = dynamic(() => import("@/components/sections/MarqueeSection"), { ssr: false });

// 🧊 Hover reveal cards
const HoverRevealCard = dynamic(
  () => import("@/sections/HoverRevealCard").then((m) => m.default),
  { ssr: false }
);

// 🖱️ Mouse image trail overlay (portaled to body; clipped to #hero)
const MouseImageTrail = dynamic(() => import("@/components/MouseImageTrail"), { ssr: false });

// 🔗 Data for HoverRevealCard
import { HoverRevealCardData } from "@/data/HoverRevealCardData";

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-[#F1F1F1] text-black selection:bg-black selection:text-[#F1F1F1] relative isolate">
      {/* HERO — Interactive Split */}
      <section id="hero" className="relative isolate">
        <HeroInteractive
          title="I design clear, human products — with systems that scale."
          subline="Brand, product, and motion — shipped with care since 2015."
        />

        {/* Image trail overlay (always full opacity; visible only within #hero) */}
        <MouseImageTrail
          images={[
            "/images/trail/shot-1.jpg",
            "/images/trail/shot-2.jpg",
            "/images/trail/shot-3.jpg",
            "/images/trail/shot-4.jpg",
          ]}
          className="z-[1000]"
          mixBlendMode="normal"
          respectReducedMotion={false}
          spawnRateMs={120}
          minDistancePx={24}
          peakOpacity={1}
          scope="#hero"
          // bump key to force a fresh mount if HMR cached the old chunk
          key="mit-v5"
          debug
        />
      </section>

      {/* 🔤 SERPENTINE */}
      <section id="serpentine" className="border-b border-black/10">
        <SerpentineSection
          text="LET'S BREAK THE ICE"
          heightClassName="h-[180vh]"
          pin={false}
        />
      </section>

      {/* PROJECTS LIST */}
      <section
        id="projects-list"
        className="border-b border-black/10 relative z-10 scroll-mt-24"
      >
        <ProjectsShowcase />
      </section>

      {/* 🧊 HOVER REVEAL CARDS */}
      <section
        id="hover-reveal"
        className="border-b border-black/10 px-6 py-16 md:py-24 relative z-0 pb-32 lg:pb-72 [transform-style:flat]"
      >
        <header className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-8 mb-10 md:mb-14">
          <h2 className="md:col-span-7 text-[60px] leading-[1.1] font-semibold tracking-tight text-neutral-900">
            Some <br /> thoughts <br /> &amp; articles.
          </h2>
          <div className="md:col-span-5 flex flex-col space-y-4 md:ml-auto">
            <p className="text-neutral-800 max-w-sm">
              Part journal, part thought experiment, part design diary. Dispatches
              from the day-to-day: what I’m learning, questioning, and building.
            </p>
            <Button
              variant="solid"
              className="w-fit"
              onClick={() => router.push("/articles")}
            >
              Read more
            </Button>
          </div>
        </header>

        <div className="border-t border-black/10 pt-10 md:pt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HoverRevealCardData.map((p) => (
              <div key={p.slug} className="w-full">
                <HoverRevealCard
                  imageSrc={p.cover}
                  title={p.title}
                  className="h-full w-full aspect-[4/5] md:aspect-square xl:aspect-[4/3]"
                  href={
                    p.title === "Finding Flow in a World of Noise"
                      ? "/articles/finding-flow"
                      : p.title === "AI Isn’t Replacing Designers...It’s Expanding the Playground"
                      ? "/articles/ai-expanding-playground"
                      : p.title === "Why Every Designer Should Think Like a Filmmaker"
                      ? "/articles/designers-as-filmmakers"
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div aria-hidden className="h-8 lg:h-20" />

      {/* ⬇️ NEW: MARQUEE just before FOOTER */}
      <section id="marquee">
        <MarqueeSection />
      </section>
    </main>
  );
}

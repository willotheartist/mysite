// components/MyLifeStickyTabs.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Panel = {
  id: string;
  title: string;
  body: React.ReactNode;
  media?: {
    type: "video" | "image" | "none";
    mp4?: string;
    webm?: string;
    src?: string;
    alt?: string;
  };
};

type Props = {
  topOffset?: string;
  panelScrollExtra?: number;
  reducedMotionFallback?: "opacity-only" | "stack";
  ctaHref?: string;
};

export default function MyLifeStickyTabs({
  topOffset = "5vh",
  panelScrollExtra = 550,
  reducedMotionFallback = "opacity-only",
  ctaHref = "/contact",
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const intro = useMemo(
    () => ({
      headline: "I’ve spent a decade designing clarity into complexity.",
      sub: "Since 2014, I’ve built brands, products, and digital systems across industries and cultures — always evolving, always curious, always focused on design that inspires confidence.",
      cta: { label: "Let’s talk", href: ctaHref },
    }),
    [ctaHref]
  );

  const panels: Panel[] = useMemo(
    () => [
      {
        id: "foundations",
        title: "Foundations in variety (2014–2021)",
        body: (
          <>
            <p>
              My career began with diversity. I designed for schools, cultural spaces, and local businesses — language academies in Barcelona, a dance school in Spain, and the look &amp; feel for an audio museum experience at El Prado in Madrid.
            </p>
            <p>
              Those foundations expanded: websites for coworking spaces, marketing agencies, and lawyers; brands for a tailor in Madrid, two Parisian restaurants, and a Belgian bike startup; interactive screens for a pharmaceutical giant’s fair; 3D motion for an Andorra gallery; illustrations for a London YouTube channel; posters for event companies across Spain. I also began partnering with startups and global companies—from a vegan meat brand and a Belgian videographer to a global wine seller and a French construction conglomerate.
            </p>
          </>
        ),
        media: { type: "none" },
      },
      {
        id: "scaling",
        title: "Scaling the challenge (2022 →)",
        body: (
          <>
            <p>
              In 2022, my work shifted into higher stakes. I joined an international advertising corporation as a senior creative between Barcelona and New York — redesigned YouTube/social presence, built motion and thumbnail systems, edited campaign content, and presented design standards in English and Spanish.
            </p>
            <p>
              At the same time, I co-founded Jimbo, building brand and app from scratch (identity, UX, Figma system), managed timelines, and collaborated with developers — even learning Flutter basics to translate between design and engineering.
            </p>
            <p>
              I led branding, identity, UI/UX, and full digital design for a workshops app; named and branded a French AI construction-tech startup, designed the website, and crafted investor decks; delivered landing pages and motion demos for Bouygues; and redesigned Spain’s largest wine retailer’s e-commerce platform.
            </p>
          </>
        ),
        media: { type: "none" },
      },
      {
        id: "today",
        title: "How I work today",
        body: (
          <>
            <p>
              Curiosity and growth tie my decade together. Every three months, I set a new challenge — to learn a tool or explore technology that improves my craft and outcomes.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Systems + scalability</strong> — reusable guidelines to end-to-end design systems.</li>
              <li><strong>Breadth of experience</strong> — startups, corporates, and cultural institutions.</li>
              <li><strong>Collaboration</strong> — marketing, engineers, executives, founders.</li>
              <li><strong>Communication across cultures</strong> — fluent in French, English, Spanish.</li>
              <li><strong>Craft + confidence</strong> — design that inspires trust, from CEOs to end users.</li>
            </ul>
          </>
        ),
        media: { type: "none" },
      },
    ],
    []
  );

  const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIsoLayout(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const created: ScrollTrigger[] = [];
    if (!rootRef.current || !stickyRef.current) return;

    if (reduce && reducedMotionFallback === "stack") return;

    if (!reduce) {
      created.push(
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${(window.innerHeight + panelScrollExtra) * (panels.length - 1)}`,
          pin: stickyRef.current,
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
        })
      );
    }

    created.push(
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: () => `+=${(window.innerHeight + panelScrollExtra) * (panels.length - 1)}`,
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (panels.length - 1));
          setActive(idx);
        },
      })
    );

    return () => created.forEach((st) => st.kill());
  }, [panelScrollExtra, panels.length, reducedMotionFallback]);

  return (
    <div className="bg-[var(--bg)] text-[var(--fg)]">
      {/* Sticky scrollytelling */}
      <section ref={rootRef} className="relative">
        <div
          ref={stickyRef}
          className="sticky h-[90vh] overflow-hidden"
          style={{ top: topOffset }}
        >
          <div className="grid h-full w-full grid-cols-1 md:grid-cols-[0.5fr_1fr] gap-12 px-6 md:px-16">
            {/* LEFT column */}
            <div className="relative flex flex-col justify-between max-w-prose">
              {panels.map((p, i) => (
                <article
                  key={p.id}
                  className={`absolute inset-0 transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
                >
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                    {p.title}
                  </h3>
                  <div className="text-[17px] md:text-[18px] leading-relaxed space-y-6">
                    {p.body}
                  </div>
                  <div className="mt-10">
                    <a
                      href={intro.cta.href}
                      className="inline-flex items-center rounded-md border border-black/10 bg-white px-4 py-2 text-xs uppercase tracking-wide"
                    >
                      Let’s talk
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* RIGHT column */}
            <div className="relative bg-white rounded-xl overflow-hidden border border-black/5">
              {panels.map((p, i) => {
                const isActive = i === active;
                return (
                  <div key={p.id} className={`absolute inset-0 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
                    <div className="h-full w-full bg-[var(--bg)]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ height: `calc(${Math.max(2, panels.length)} * (100vh + ${panelScrollExtra}px))` }} />
      </section>
    </div>
  );
}

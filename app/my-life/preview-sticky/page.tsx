// app/my-life/preview-sticky/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PreviewSticky() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Sticky scroll logic
  useEffect(() => {
    if (!rootRef.current || !stickyRef.current) return;

    const panels = stickyRef.current.querySelectorAll("[data-panel]");

    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * (panels.length - 1)}`,
      pin: stickyRef.current,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (panels.length - 1));
        setActive(idx);
      },
    });

    return () => st.kill();
  }, []);

  // Content
  const panels = [
    {
      id: "foundations",
      title: "Foundations in variety (2014–2021)",
      body: (
        <div className="space-y-5">
          <p>
            My career began with diversity. I designed for schools, cultural spaces, and
            local businesses — language academies in Barcelona, a dance school in Spain,
            and even the look and feel for an audio museum experience at El Prado in
            Madrid.
          </p>
          <p>
            Those foundations quickly expanded. I crafted websites for coworking spaces,
            marketing agencies, and lawyers. I built brands for a tailor in Madrid, two
            Parisian restaurants, and a Belgian bike startup. I designed interactive
            screens for a pharmaceutical giant’s business fair, 3D motion for an art
            gallery in Andorra, illustrations for a YouTube channel in London, and posters
            for event companies across Spain.
          </p>
          <p>
            I also began working with startups and global companies: a vegan meat brand, a
            videographer in Belgium, a global wine seller, and a French construction
            conglomerate that asked me to design a landing page and 3D visuals for a
            concept product. These years gave me range — an ability to move between
            industries and briefs without losing the throughline of clarity and craft.
          </p>
        </div>
      ),
    },
    {
      id: "scaling",
      title: "Scaling the challenge (2022 →)",
      body: (
        <div className="space-y-5">
          <p>
            In 2022, my work shifted into higher stakes. I joined an international
            advertising corporation as a senior creative, working between Barcelona and
            New York. I redesigned their YouTube and social presence, created cross-platform
            motion and thumbnail systems, edited campaign content, and presented design
            standards to executives in English and Spanish.
          </p>
          <p>
            At the same time, I co-founded Jimbo, building a brand and app from scratch. I
            designed the identity, UX, and Figma system, managed timelines, and
            collaborated with developers — even learning Flutter basics to translate
            between design and engineering.
          </p>
          <p>
            I was also hired to create the brand, identity, UI/UX, and full digital design
            for an upcoming app focused on workshops — taking on every layer of the
            creative process from strategy to polish.
          </p>
          <p>
            And when a French founder launched his AI construction-tech startup, he trusted
            me to name the company, design the brand and website, and craft the investor
            decks that powered his fundraising. Freelance projects kept me agile: landing
            pages and motion demos for Bouygues, and a complete redesign of Spain’s largest
            wine retailer’s e-commerce platform.
          </p>
        </div>
      ),
    },
    {
      id: "today",
      title: "How I work today",
      body: (
        <div className="space-y-5">
          <p>
            What ties my decade together is curiosity and growth. Every three months, I set
            myself a new challenge — to learn an unfamiliar tool, or explore the newest
            technology that could improve my craft and my clients’ outcomes. That
            discipline has kept me moving from graphic design to web, from digital to
            product, from branding to scalable systems.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Systems + scalability</strong> — from reusable guidelines to
              end-to-end design systems.
            </li>
            <li>
              <strong>Breadth of experience</strong> — startups, corporates, cultural
              institutions, and everything in between.
            </li>
            <li>
              <strong>Collaboration across disciplines</strong> — marketing, engineers,
              executives, founders.
            </li>
            <li>
              <strong>Communication across cultures</strong> — fluent in French, English,
              and Spanish.
            </li>
            <li>
              <strong>Craft + confidence</strong> — design that inspires trust, from CEOs
              to end users.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <main className="bg-[var(--bg)] text-[var(--fg)] font-sans">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-semibold leading-tight max-w-4xl">
          I’ve spent a decade designing clarity into complexity.
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-[var(--muted)] max-w-2xl leading-relaxed">
          Since 2014, I’ve built brands, products, and digital systems across industries
          and cultures — always evolving, always curious, always focused on design that
          inspires confidence.
        </p>
      </section>

      {/* Sticky storytelling */}
      <section ref={rootRef} className="relative">
        <div ref={stickyRef} className="sticky top-0 h-screen flex items-center">
          <div className="w-full max-w-4xl mx-auto px-6">
            {panels.map((p, i) => (
              <article
                key={p.id}
                data-panel
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                <h2 className="text-3xl md:text-5xl font-semibold mb-6">{p.title}</h2>
                <div className="text-lg md:text-xl leading-relaxed text-[var(--muted)]">
                  {p.body}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Spacer after sticky to allow scroll-out */}
        <div
          style={{ height: `${panels.length * 100}vh` }}
          aria-hidden
        />
      </section>

      {/* Outro CTA */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold max-w-3xl">
          Looking for a designer who blends a decade of breadth with the ability to craft
          clarity, systems, and confidence at scale?
        </h2>
        <a
          href="/contact"
          className="mt-10 inline-flex items-center rounded-lg border border-black/10 bg-white px-6 py-3 text-sm uppercase tracking-wide"
        >
          Let’s talk
        </a>
      </section>
    </main>
  );
}

// components/site/Footer.tsx
"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HelloPeek from "@/components/sections/HelloPeek";

gsap.registerPlugin(ScrollTrigger);

type Social = {
  name: "GitHub" | "LinkedIn" | "X" | "Email";
  href: string;
  label: string;
  icon: React.ReactNode;
};

const socials: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/yourhandle",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          fill="currentColor"
          d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.16c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.74.08-.72.08-.72 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.62-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.23 0 4.64-2.8 5.66-5.48 5.96.43.37.82 1.11.82 2.24v3.32c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yourhandle",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          fill="currentColor"
          d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5Zm.02 6H2v11h3V9.5ZM21 20.5h-3v-5.5c0-1.31-.47-2.2-1.64-2.2-.9 0-1.43.61-1.66 1.2-.09.22-.11.53-.11.85v5.65h-3s.04-9.16 0-10.1h3v1.43c.4-.62 1.11-1.51 2.69-1.51 1.97 0 3.42 1.29 3.42 4.07v6.11Z"
        />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/yourhandle",
    label: "Twitter/X",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          fill="currentColor"
          d="M18.244 2H21l-6.56 7.49L22 22h-6.828l-5.343-6.98L3.6 22H1l7.03-8.03L2 2h6.914l4.83 6.41L18.244 2Zm-2.39 18h1.77L7.22 4H5.36l10.494 16Z"
        />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hello@yourdomain.com",
    label: "Email",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <path
          fill="currentColor"
          d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
        />
      </svg>
    ),
  },
];

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const socialsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (!rootRef.current) return;

      // text lines
      if (textRef.current) {
        const lines = textRef.current.querySelectorAll<HTMLElement>("[data-anim='line']");
        gsap.from(lines, {
          opacity: 0,
          y: 14,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // socials
      if (socialsRef.current) {
        gsap.from(socialsRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.05,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
            once: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={rootRef}
      className={`relative w-full bg-[#FFD33D] text-black ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end pt-16 md:pt-24">
          {/* Left: Illustration */}
          <div className="md:col-span-5">
            <HelloPeek
              src="/images/hello-peek.png"
              alt="Self portrait peeking"
              chromeless
              showHelloText={false}
              aspect="16/9"
              imageClassName="w-[min(520px,70%)] mx-auto md:mx-0"
              className="mx-auto md:mx-0"
            />
          </div>

          {/* Right: Copy + Socials, right-aligned */}
          <div className="md:col-span-7 flex flex-col items-end">
            <div ref={textRef} className="w-full md:max-w-[560px] text-right ml-auto">
              <h2
                data-anim="line"
                className="text-4xl md:text-5xl font-bold tracking-tight"
              >
                Let’s meet.
              </h2>
              <p
                data-anim="line"
                className="mt-3 text-lg md:text-xl leading-relaxed italic"
              >
                I’d love to hear about your project and vision.
              </p>
            </div>

            <div
              ref={socialsRef}
              className="mt-8 flex justify-end gap-5 w-full md:max-w-[560px] ml-auto pb-8 md:pb-10"
            >
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.label}
                  target={s.name === "Email" ? undefined : "_blank"}
                  rel={s.name === "Email" ? undefined : "noreferrer"}
                  className="text-black/80 hover:text-black transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFD33D] rounded-md"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal meta (location corrected) */}
        <div className="border-t border-black/10">
          <div className="flex items-center justify-between text-sm opacity-80 py-4">
            <span>© {new Date().getFullYear()} Your Name</span>
            <span>Based in London · Available worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

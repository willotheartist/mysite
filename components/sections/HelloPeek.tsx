// components/sections/HelloPeek.tsx
"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  helloText?: string;
  showHelloText?: boolean;
  /** Render without card chrome (no bg/border/rounded/padding). */
  chromeless?: boolean;
  /** Aspect ratio for the masked stage. Make this taller to avoid cropping. */
  aspect?: `${number}/${number}`;
  /** Override the head wrapper size (e.g., "w-[min(520px,70%)]"). */
  imageClassName?: string;
};

export default function HelloPeek({
  src,
  alt = "Illustration",
  className = "",
  helloText = "hello",
  showHelloText = true,
  chromeless = false,
  aspect = "16/10", // taller default to avoid top crop
  imageClassName = "w-[min(560px,80%)]",
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!rootRef.current || !headRef.current) return;

      if (prefersReduced) {
        gsap.set(headRef.current, { yPercent: 0, opacity: 1 });
        if (textRef.current) gsap.set(textRef.current, { y: 0, opacity: 1, scale: 1 });
        return;
      }

      // Start mostly hidden below the mask
      gsap.set(headRef.current, { yPercent: 60, opacity: 1 });
      if (textRef.current) gsap.set(textRef.current, { opacity: 0, y: 16, scale: 0.98 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
      });

      tl.to(headRef.current, { yPercent: 20, duration: 0.7 }) // peek
        .to(headRef.current, { yPercent: 28, duration: 0.28, ease: "power1.inOut" }) // shy dip
        .to(headRef.current, { yPercent: 0, duration: 0.7 }); // full reveal

      if (textRef.current) {
        tl.to(textRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, "-=0.2");
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const chrome =
    "rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 md:px-10 py-8 md:py-12";

  return (
    <div
      ref={rootRef}
      className={["relative isolate overflow-hidden", chromeless ? "" : chrome, className]
        .filter(Boolean)
        .join(" ")}
      aria-label="Intro"
    >
      {/* Masked stage */}
      <div className="relative w-full overflow-hidden">
        <div className={`aspect-[${aspect}] w-full`} />
        <div
          ref={headRef}
          className={[
            "pointer-events-none absolute inset-x-0 bottom-0 mx-auto",
            imageClassName,
          ].join(" ")}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={1200}
            className="w-full h-auto select-none"
            priority={false}
          />
        </div>

        {showHelloText && (
          <div
            ref={textRef}
            className="pointer-events-none absolute bottom-6 right-6 md:bottom-8 md:right-8"
          >
            <span className="block text-4xl md:text-6xl font-semibold tracking-tight">
              {helloText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

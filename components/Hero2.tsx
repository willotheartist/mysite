// components/Hero2.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Hero2Props = {
  imageSrc: string;
  imageAlt?: string;
  headline: string;
};

const EASE = [0.22, 1, 0.36, 1] as const; // satisfies Framer Motion's Easing tuple

export default function Hero2({
  imageSrc,
  imageAlt = "",
  headline,
}: Hero2Props) {
  return (
    <section aria-label="Intro" className="relative isolate">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative min-h-[88vh] md:min-h-screen rounded-3xl overflow-hidden"
        >
          {/* Full-bleed image inside rounded box */}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* readability gradient (bottom emphasis) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent"
          />

          {/* headline bottom-left */}
          <div className="relative z-10 flex h-full items-end">
            <div className="p-6 sm:p-10 md:p-16 lg:p-20">
              <h1 className="text-white text-pretty tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">
                {headline}
              </h1>
            </div>
          </div>

          {/* safe area mask */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

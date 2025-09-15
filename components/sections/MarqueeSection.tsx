// components/sections/MarqueeSection.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import * as React from "react";

export default function MarqueeSection() {
  const shouldReduceMotion = useReducedMotion();

  // 👇 Sentences for the marquee
  const items = [
    "Design with purpose",
    "Craft with clarity",
    "Build with care",
  ];

  // 👇 Images pulled from /public/marquee-images/
  const images = [
    "/marquee-images/asset-1.jpg",
    "/marquee-images/asset-2.jpg",
    "/marquee-images/asset-3.jpg",
  ];

  const imageSize = 160;
  const imageRadiusClass = "rounded-3xl";

  // smaller number = faster scroll
  const speedSeconds = 30;

  const Content = React.useMemo(() => {
    const parts: React.ReactNode[] = [];
    items.forEach((sentence, idx) => {
      parts.push(
        <span
          key={`t-${idx}`}
          className="select-none whitespace-nowrap text-[200px] leading-none tracking-tight font-semibold"
          aria-label={sentence}
        >
          {sentence}
        </span>
      );

      if (idx < items.length) {
        const imageSrc = images[idx % images.length];
        parts.push(
          <span
            key={`img-${idx}`}
            className="inline-flex items-center justify-center"
            aria-hidden="true"
          >
            <Image
              src={imageSrc}
              alt=""
              width={imageSize}
              height={imageSize}
              className={`${imageRadiusClass} object-cover`}
              priority={false}
            />
          </span>
        );
      }
    });
    return parts;
  }, [items, images, imageSize, imageRadiusClass]);

  const Track = (
    <div
      className="flex shrink-0 items-center gap-16 pr-16"
      aria-hidden="true"
    >
      {Content}
    </div>
  );

  if (shouldReduceMotion) {
    return (
      <section
        className="relative w-full overflow-hidden bg-[#F1F1F1] text-black"
        role="region"
        aria-label="Scrolling marquee"
      >
        <div className="flex items-center gap-16 py-6">{Track}</div>
      </section>
    );
  }

  const duration = Math.max(6, speedSeconds);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F1F1F1] text-black"
      role="region"
      aria-label="Scrolling marquee"
    >
      <motion.div
        className="pointer-events-none flex w-[200%]"
        aria-hidden="true"
        initial={{ x: "0%" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {Track}
        {Track}
      </motion.div>
    </section>
  );
}

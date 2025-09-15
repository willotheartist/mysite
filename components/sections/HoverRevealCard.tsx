// app/components/HoverRevealCard.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type HoverRevealCardProps = {
  imageSrc: string;                 // /public path, e.g. /images/design.jpg
  title: string;                    // headline BELOW the image
  href?: string;                    // link for the card image (title no longer links if href present)
  tags?: string[];                  // chips BELOW the image (e.g., ["News"])
  authorName?: string;              // shown below (optional)
  authorAvatarSrc?: string;         // /public path for small avatar (optional)
  readTime?: string | number;       // e.g., "5 mins" or 5
  className?: string;               // optional container overrides
};

export default function HoverRevealCard({
  imageSrc,
  title,
  href,                    // ✅ no default "#" — avoids accidental anchors
  tags = [],
  authorName,
  authorAvatarSrc,
  readTime,
  className,
}: HoverRevealCardProps) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  // ✅ Only the IMAGE becomes a link if `href` is provided.
  const ImageWrapper = href ? Link : ("div" as any);
  const imageWrapperProps = href ? { href, "aria-label": title } : { "aria-label": title };

  return (
    <article className={`w-full ${className ?? ""}`}>
      {/* IMAGE-ONLY CARD (clean — no shadows) */}
      <motion.div
        className="group relative w-full overflow-hidden rounded-2xl bg-neutral-900"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={false}
        animate={reduceMotion ? {} : hovered ? { y: -6 } : { y: 0 }}
        transition={reduceMotion ? undefined : { type: "spring", stiffness: 260, damping: 22 }}
      >
        <ImageWrapper
          {...imageWrapperProps}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <div className="relative aspect-square w-full">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className={[
                "object-cover will-change-transform",
                "transition duration-500 ease-out",
                "group-hover:scale-[1.04] group-hover:blur-[2px]",
                "motion-reduce:transition-none motion-reduce:blur-0 motion-reduce:scale-100",
              ].join(" ")}
            />
            {/* Soft gradient only (no hover icon) */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:transition-none"
              aria-hidden
            />
          </div>
        </ImageWrapper>
      </motion.div>

      {/* META BELOW (FULL-WIDTH RELATIVE TO LAYOUT) */}
      <div className="mt-4">
        {tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ✅ Title is NOT a link when href is present (prevents multiple anchors). */}
        <div className="block">
          <h3 className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight text-neutral-900">
            {title}
          </h3>
        </div>

        {(authorName || readTime) && (
          <div className="mt-2 flex items-center gap-3 text-sm text-neutral-600">
            {authorAvatarSrc && (
              <span className="relative inline-block h-6 w-6 overflow-hidden rounded-full bg-neutral-200">
                <Image src={authorAvatarSrc} alt="" fill className="object-cover" />
              </span>
            )}
            {authorName && <span className="truncate">{authorName}</span>}
            {readTime !== undefined && (
              <>
                <span aria-hidden>•</span>
                <span className="shrink-0">
                  {typeof readTime === "number" ? `${readTime} mins` : readTime}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

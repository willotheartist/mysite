// components/utility/SplitText.tsx
"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type SplitTextProps = {
  text: string;
  as?: typeof motion.span;
  className?: string;
  // Flexible typing to keep TS happy across Framer versions
  variants?: {
    container?: any;
    char?: any;
  };
};

export default function SplitText({
  text,
  as = motion.span,
  className,
  variants,
}: SplitTextProps) {
  const M = as;
  if (!text) return null;

  const chars = Array.from(text);

  return (
    <M
      className={className}
      variants={variants?.container as HTMLMotionProps<"span">["variants"]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={text}
      style={{ display: "inline-block" }}
    >
      {chars.map((ch, i) => {
        const key = `${ch}-${i}`;
        if (ch === " ") {
          return (
            <span key={key} aria-hidden="true">
              {" "}
            </span>
          );
        }
        return (
          <motion.span
            key={key}
            variants={variants?.char as HTMLMotionProps<"span">["variants"]}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {ch}
          </motion.span>
        );
      })}
    </M>
  );
}

"use client";

import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { useRef } from "react";

/* simple className merge */
function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className, ...rest }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div
      ref={targetRef}
      className={cx("relative z-0 h-[200vh]", className)}
      {...rest}
    >
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
        <span className="flex flex-wrap p-5 md:p-8 lg:p-10 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 lg:mx-1.5">
      {/* faint background copy */}
      <span className="absolute opacity-30 text-black">{children}</span>
      {/* animated foreground copy */}
      <motion.span style={{ opacity }} className="text-black">
        {children}
      </motion.span>
    </span>
  );
};

/* default export adapter to match your About page usage */
export default function TextRevealImpl({ text, className }: { text: string; className?: string }) {
  return <TextReveal className={className}>{text}</TextReveal>;
}

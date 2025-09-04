// components/work/CursorPreview.tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import * as React from "react";

type Cover = { src: string; alt: string; width?: number; height?: number };
type Variant = "cursor" | "modal";

export default function CursorPreview({
  cover,
  show,
  variant = "cursor",
  mouse,
}: {
  cover?: Cover;
  show: boolean;
  variant?: Variant;
  mouse?: { x: number; y: number };
}) {
  const prefersReduced = useReducedMotion();

  // Smooth follow springs, centered at the pointer
  const mvX = useMotionValue(mouse?.x ?? 0);
  const mvY = useMotionValue(mouse?.y ?? 0);
  const x = useSpring(mvX, { stiffness: 220, damping: 26, mass: 0.6 }); // tighter follow
  const y = useSpring(mvY, { stiffness: 220, damping: 26, mass: 0.6 });

  React.useEffect(() => {
    if (!mouse) return;
    mvX.set(mouse.x);
    mvY.set(mouse.y);
  }, [mouse, mvX, mvY]);

  const card = (
    <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10 bg-white">
      {cover?.src ? (
        <Image
          src={cover.src}
          alt={cover.alt || ""}
          width={cover.width ?? 840}
          height={cover.height ?? 520}
          priority={false}
          className="block h-auto w-[420px] max-w-[60vw] lg:w-[420px] select-none"
        />
      ) : null}
    </div>
  );

  if (variant === "modal") {
    return (
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] grid place-items-center p-6"
        initial={false}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {card}
      </motion.div>
    );
  }

  // Cursor-follow: center the preview *under the cursor*
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden lg:block"
      style={
        prefersReduced
          ? { opacity: show ? 1 : 0 }
          : ({
              x,
              y,
              translateX: "-50%",
              translateY: "-50%",
            } as any)
      }
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        scale: prefersReduced ? 1 : show ? 1 : 0.98,
      }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      {card}
    </motion.div>
  );
}

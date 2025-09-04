// components/hooks/useScrollDirection.ts
"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDir = "up" | "down" | "none";

/**
 * Returns 'down' when user scrolls down, 'up' when scrolling up.
 * Debounced with a small threshold to avoid jitter.
 */
export default function useScrollDirection(threshold = 8): ScrollDir {
  const [dir, setDir] = useState<ScrollDir>("none");
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const y = window.scrollY || 0;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = y - lastY.current;
          if (Math.abs(delta) > threshold) {
            setDir(delta > 0 ? "down" : "up");
            lastY.current = y;
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    lastY.current = window.scrollY || 0;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return dir;
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal magnetic cursor dot.
 * Enlarges when hovering elements that have [data-cursor="magnet"], links, or buttons.
 */
export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create dot
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);
    dotRef.current = dot;

    // Track pointer
    const onMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    // Magnet enter/leave
    const onEnter = () => dotRef.current?.classList.add("-magnet");
    const onLeave = () => dotRef.current?.classList.remove("-magnet");

    window.addEventListener("mousemove", onMove);

    // Attach listeners to magnet targets (links/buttons + explicit data attr)
    const selector = '[data-cursor="magnet"], a, button';
    const magnetTargets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    magnetTargets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMove);
      magnetTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      dot.remove();
    };
  }, []);

  return null;
}

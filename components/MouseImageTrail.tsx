// components/MouseImageTrail.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

type Blend = NonNullable<CSSProperties["mixBlendMode"]>;

export type MouseImageTrailProps = {
  images: string[];
  size?: number;
  maxTrail?: number;
  /** Minimum time (ms) between spawns. Higher = slower. */
  spawnRateMs?: number;
  /** Minimum cursor travel (px) between spawns. */
  minDistancePx?: number;
  rotation?: boolean;
  className?: string;
  mixBlendMode?: Blend;
  /** Max sprite opacity (0–1). */
  peakOpacity?: number;
  disabled?: boolean;
  respectReducedMotion?: boolean;
  debug?: boolean;

  /** Limit the visible area to a DOM element (CSS selector), e.g. "#hero". */
  scope?: string;

  /** z-index for the fixed overlay. */
  zIndex?: number;
};

const FALLBACK_SVG =
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="18" fill="black"/>
    </svg>`
  );

export default function MouseImageTrail({
  images,
  size = 96,
  maxTrail = 24,
  spawnRateMs = 120,
  minDistancePx = 24,
  rotation = true,
  className = "",
  mixBlendMode = "normal",
  peakOpacity = 1, // <-- strong by default
  disabled = false,
  respectReducedMotion = true,
  debug = false,
  scope, // e.g. "#hero"
  zIndex = 2147483647,
}: MouseImageTrailProps) {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const poolRef = useRef<HTMLDivElement[]>([]);
  const poolIndexRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const animRef = useRef<gsap.core.Animation[]>([]);

  const clipRectRef = useRef<DOMRect | null>(null);
  const scopeElRef = useRef<HTMLElement | null>(null);

  const srcs = useMemo(() => {
    const cleaned = (images ?? []).filter(Boolean);
    return cleaned.length ? cleaned : [FALLBACK_SVG];
  }, [images]);

  // Mount flag for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Core effect
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Fixed fullscreen overlay (we clip it to scope below).
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: String(zIndex),
      isolation: "isolate",
      contain: "layout style paint",
    } as CSSProperties);

    // Resolve scope element (optional)
    const resolveScope = () => {
      scopeElRef.current = scope ? (document.querySelector(scope) as HTMLElement | null) : null;
    };
    resolveScope();

    // Compute clip-path inset from scope rect; if none, clear clip.
    const computeClip = () => {
      const el = scopeElRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        clipRectRef.current = r;
        // clip-path: inset(top right bottom left)
        const top = Math.max(0, r.top);
        const left = Math.max(0, r.left);
        const right = Math.max(0, window.innerWidth - (r.left + r.width));
        const bottom = Math.max(0, window.innerHeight - (r.top + r.height));
        overlay.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;
      } else {
        clipRectRef.current = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
        overlay.style.clipPath = "none";
      }
    };

    computeClip();

    const onResize = () => computeClip();
    const onScroll = () => computeClip();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    let ro: ResizeObserver | null = null;
    if (scopeElRef.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(computeClip);
      ro.observe(scopeElRef.current);
    }

    const reduce =
      respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Build sprite pool as <div> with background-image (avoid global <img> styles)
    const poolSize = Math.max(4, maxTrail);
    const pool: HTMLDivElement[] = [];
    for (let i = 0; i < poolSize; i++) {
      const el = document.createElement("div");
      el.setAttribute("data-mit-sprite", "true");
      Object.assign(el.style, {
        position: "absolute",
        left: "0px",
        top: "0px",
        width: `${size}px`,
        height: `${size}px`,
        transform: "translate(-50%, -50%) scale(0.5)",
        opacity: "1",
        pointerEvents: "none",
        willChange: "transform, opacity",
        mixBlendMode: mixBlendMode as string,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        ...(debug ? { outline: "1px solid rgba(0,0,0,0.25)" } : null),
      } as CSSProperties);
      overlay.appendChild(el);
      pool.push(el);
    }
    poolRef.current = pool;
    poolIndexRef.current = 0;
    lastSpawnRef.current = 0;
    lastPosRef.current = null;

    const emit = (clientX: number, clientY: number) => {
      if (disabled || reduce) return;

      // Gate by scope rect (in viewport coords)
      const r = clipRectRef.current;
      if (r) {
        if (
          clientX < r.left ||
          clientY < r.top ||
          clientX > r.left + r.width ||
          clientY > r.top + r.height
        ) {
          return;
        }
      }

      // Distance gate (in viewport coords)
      const prev = lastPosRef.current;
      if (prev) {
        const dx = clientX - prev.x;
        const dy = clientY - prev.y;
        if (Math.hypot(dx, dy) < Math.max(4, minDistancePx)) return;
      }
      lastPosRef.current = { x: clientX, y: clientY };

      // Time gate
      const now = performance.now();
      const interval = Math.max(50, spawnRateMs);
      if (now - lastSpawnRef.current < interval) return;
      lastSpawnRef.current = now;

      // Next sprite
      const idx = poolIndexRef.current % poolRef.current.length;
      poolIndexRef.current += 1;
      const sprite = poolRef.current[idx];
      sprite.style.backgroundImage = `url("${srcs[idx % srcs.length]}")`;

      gsap.killTweensOf(sprite);

      // Use viewport coords directly on fixed overlay
      const x = clientX;
      const y = clientY;

      // Strong sprout + slower float
      const startScale = 0.5 + Math.random() * 0.1;
      const popScale = startScale + 0.25;
      const endScale = 1.18 + Math.random() * 0.18;
      const driftX = (Math.random() - 0.5) * (size * 0.42);
      const driftY = -size * (0.45 + Math.random() * 0.4);
      const rot = rotation ? (Math.random() - 0.5) * 28 : 0;
      const targetOpacity = Math.max(0, Math.min(1, peakOpacity));

      gsap.set(sprite, { x, y, scale: startScale, opacity: 0, rotateZ: rot });

      const t = gsap
        .timeline()
        .to(sprite, {
          duration: 0.05,
          opacity: targetOpacity, // ⬅️ full-strength
          scale: popScale,
          ease: "back.out(1.8)",
        })
        .to(
          sprite,
          {
            duration: 1.5,
            opacity: 0,
            x: x + driftX,
            y: y + driftY,
            scale: endScale,
            ease: "power2.out",
          },
          0.02
        );

      animRef.current.push(t);
    };

    const onMove = (e: PointerEvent | MouseEvent) => emit(e.clientX, e.clientY);
    const supportsPointer = "onpointermove" in window;

    if (supportsPointer) {
      window.addEventListener("pointermove", onMove as (e: PointerEvent) => void, { passive: true });
    } else {
      window.addEventListener("mousemove", onMove as (e: MouseEvent) => void, { passive: true });
    }

    // Seed at center of scope (or viewport if none)
    const seed = () => {
      const r = clipRectRef.current;
      const cx = r ? r.left + r.width / 2 : window.innerWidth / 2;
      const cy = r ? r.top + r.height / 2 : window.innerHeight / 2;
      emit(cx, cy);
    };
    seed();

    return () => {
      if (supportsPointer) {
        window.removeEventListener("pointermove", onMove as (e: PointerEvent) => void);
      } else {
        window.removeEventListener("mousemove", onMove as (e: MouseEvent) => void);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      if (ro) ro.disconnect();

      animRef.current.forEach((a) => a.kill());
      animRef.current = [];
      poolRef.current.forEach((el) => {
        gsap.killTweensOf(el);
        el.remove();
      });
      poolRef.current = [];
    };
  }, [
    mounted,
    srcs,
    size,
    maxTrail,
    spawnRateMs,
    minDistancePx,
    rotation,
    mixBlendMode,
    peakOpacity,
    disabled,
    respectReducedMotion,
    debug,
    scope,
    zIndex,
  ]);

  // Render the overlay via a portal; sprites are appended to this node.
  if (!mounted || typeof document === "undefined") {
    return <div aria-hidden className={className} style={{ pointerEvents: "none" }} />;
  }

  const overlayNode = (
    <div ref={overlayRef} aria-hidden className={className} />
  );

  return createPortal(overlayNode, document.body);
}

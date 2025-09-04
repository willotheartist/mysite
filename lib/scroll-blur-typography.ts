// lib/scroll-blur-typography.ts

/**
 * Blur + scale + fade text as it scrolls through the viewport.
 *
 * Usage (React):
 *   useEffect(() => {
 *     const unmount = mountScrollBlur({ selector: "[data-scroll-blur]" });
 *     return unmount;
 *   }, []);
 *
 * Markup:
 *   <h1 data-scroll-blur data-blur-max="10" data-scale-range="1,1.08" data-fade="0.35">
 *     Big Headline
 *   </h1>
 */

type ScrollBlurOptions = {
  /** CSS selector for target elements */
  selector?: string;
  /**
   * Max blur in px if not provided via data-blur-max
   * @default 8
   */
  maxBlur?: number;
  /**
   * Scale range [from,to] if not provided via data-scale-range (e.g. "1,1.06")
   * @default [1, 1.06]
   */
  scaleRange?: [number, number];
  /**
   * Opacity fade intensity (0–1) if not provided via data-fade
   * 0 = no fade, 1 = full fade at max progress
   * @default 0.25
   */
  fade?: number;
  /**
   * How to map progress: "center" makes effect strongest around viewport center,
   * "top" maps effect linearly from when top enters to when bottom leaves.
   * @default "center"
   */
  mode?: "center" | "top";
};

type TargetEl = HTMLElement;

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Reads numeric dataset safely with fallback
 */
function readNumber(el: TargetEl, key: string, fallback: number): number {
  const v = el.dataset[key as keyof DOMStringMap];
  if (v == null || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Reads "x,y" pair dataset safely with fallback
 */
function readPair(el: TargetEl, key: string, fallback: [number, number]): [number, number] {
  const v = el.dataset[key as keyof DOMStringMap];
  if (!v) return fallback;
  const parts = v.split(",").map((s) => Number(s.trim()));
  if (parts.length !== 2 || parts.some((n) => !Number.isFinite(n))) return fallback;
  return [parts[0], parts[1]];
}

/**
 * Compute progress (0..1) of element within viewport.
 * - "center": 0 at offscreen, ~1 near center
 * - "top": 0 when top hits bottom of viewport, 1 when bottom hits top
 */
function progressFor(el: TargetEl, mode: "center" | "top"): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;

  if (mode === "center") {
    const center = rect.top + rect.height / 2;
    // Distance of element center from viewport center, normalized to [0..1]
    const dist = Math.abs(center - vh / 2);
    const maxDist = vh / 2 + rect.height / 2;
    const inv = 1 - clamp(dist / maxDist, 0, 1);
    return inv; // 0 far, 1 centered
  } else {
    // "top" mode: linear from when top enters to when bottom leaves
    const start = vh; // top touches bottom
    const end = -rect.height; // bottom touches top
    const t = clamp((start - rect.top) / (start - end), 0, 1);
    return t;
  }
}

/**
 * Apply current effect to one element given its progress.
 */
function applyEffect(el: TargetEl, p: number, defaults: Required<Omit<ScrollBlurOptions, "selector" | "mode">>) {
  const maxBlur = readNumber(el, "blurMax", defaults.maxBlur);
  const [s0, s1] = readPair(el, "scaleRange", defaults.scaleRange);
  const fade = clamp(readNumber(el, "fade", defaults.fade), 0, 1);

  const blur = lerp(0, maxBlur, p);
  const scale = lerp(s0, s1, p);
  const opacity = 1 - p * fade;

  el.style.willChange = "filter, transform, opacity";
  el.style.filter = `blur(${blur.toFixed(2)}px)`;
  el.style.transform = `translateZ(0) scale(${scale.toFixed(4)})`;
  el.style.opacity = opacity.toFixed(3);
}

/**
 * Public mount helper. Returns an unmount/cleanup function.
 *
 * IMPORTANT: Strong element typing via querySelectorAll<HTMLElement>()
 * avoids the "never" inference that triggers TS2339 on addEventListener.
 */
export function mountScrollBlur(options: ScrollBlurOptions = {}) {
  const {
    selector = "[data-scroll-blur]",
    maxBlur = 8,
    scaleRange = [1, 1.06],
    fade = 0.25,
    mode = "center",
  } = options;

  // ✅ Strongly type NodeList so items are HTMLElements (not `Element`, not `never`)
  const targets: TargetEl[] = Array.from(
    document.querySelectorAll<HTMLElement>(selector)
  );

  if (targets.length === 0) {
    // Nothing to do; return a no-op unmount
    return () => {};
  }

  const defaults = { maxBlur, scaleRange, fade } as const;

  // Keep a RAF lock to avoid thrashing on scroll/resize
  let rafId = 0;

  const tick = () => {
    rafId = 0;
    for (const el of targets) {
      // Element may have been removed dynamically
      if (!el.isConnected) continue;
      const p = progressFor(el, mode);
      applyEffect(el, p, defaults);
    }
  };

  const requestTick = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(tick);
  };

  // Single global listeners (not per-element) — safer and cheaper.
  const onScroll = () => requestTick();
  const onResize = () => requestTick();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  // Initial paint
  requestTick();

  // Optional hover polish (guarded, typed)
  // Only attach if user sets data-hover-unblur="true"
  for (const el of targets) {
    if (el.dataset.hoverUnblur === "true") {
      const onEnter = () => {
        el.style.filter = "blur(0px)";
        el.style.opacity = "1";
      };
      const onLeave = () => requestTick();
      // ✅ el is HTMLElement, so no TS2339 here
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      // Attach a lightweight cleanup handle onto the element
      (el as any).__scrollBlurHoverCleanup = () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    }
  }

  // Cleanup
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    for (const el of targets) {
      const c = (el as any).__scrollBlurHoverCleanup as (() => void) | undefined;
      if (c) c();
      // Remove inline styles if you want a clean reset:
      // el.style.filter = "";
      // el.style.transform = "";
      // el.style.opacity = "";
      // el.style.willChange = "";
    }
  };
}

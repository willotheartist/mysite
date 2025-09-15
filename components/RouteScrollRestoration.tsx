// components/RouteScrollRestoration.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RouteScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastKeyRef = useRef<string>("");

  // 1) Disable browser auto restoration so we control it
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const { history } = window;
      if (!history) return;
      const prev = history.scrollRestoration;
      history.scrollRestoration = "manual";
      return () => {
        // restore previous or auto on unmount
        try {
          history.scrollRestoration = prev || "auto";
        } catch {}
      };
    } catch {}
  }, []);

  // 2) Jump to top on initial mount and on any route change (Lenis-aware, crash-proof)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = `${pathname}?${searchParams?.toString() ?? ""}`;
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;

    const doScroll = () => {
      try {
        // Prefer Lenis if present
        const lenis: any = (window as any).__lenis;
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(0, { immediate: true });
          return;
        }

        // Fallbacks
        if (typeof window.scrollTo === "function") {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          return;
        }

        // Last-resort fallback
        if (document?.documentElement) {
          document.documentElement.scrollTop = 0;
          (document.scrollingElement as HTMLElement | null)?.scrollTo?.(0, 0);
        }
      } catch {
        // swallow any unexpected runtime errors to avoid 500s
      }
    };

    // Use two RAFs if available so layout paints before we jump
    const raf = typeof requestAnimationFrame === "function";
    if (raf) {
      requestAnimationFrame(() => {
        requestAnimationFrame(doScroll);
      });
    } else {
      doScroll();
    }
  }, [pathname, searchParams]);

  return null;
}

// components/NoHeader.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/**
 * 1) Replace PROJECT_ORDER with your actual slugs in the order you want.
 *    e.g., "project-1", "project-2", "super-branding", "cool-app", ...
 * 2) If the current slug isn’t in the list, we fall back to numeric next/prev (project-1 -> project-2).
 */
const PROJECT_ORDER = [
  "project-1",
  "project-2",
  "project-3",
  // add more here …
] as const;

function getPrevNextFromOrder(slug: string) {
  const idx = PROJECT_ORDER.indexOf(slug as (typeof PROJECT_ORDER)[number]);
  if (idx !== -1) {
    return {
      prev: idx > 0 ? PROJECT_ORDER[idx - 1] : null,
      next: idx < PROJECT_ORDER.length - 1 ? PROJECT_ORDER[idx + 1] : null,
    };
  }
  // Fallback: numeric tail (e.g., project-3 -> 2 / 4)
  const m = slug.match(/(\d+)$/);
  if (m) {
    const n = Number(m[1]);
    return {
      prev: n > 1 ? slug.replace(String(n), String(n - 1)) : null,
      next: slug.replace(String(n), String(n + 1)),
    };
  }
  return { prev: null, next: null };
}

/**
 * Hides the global header on project pages and renders a floating
 * bottom control bar (Prev • Close • Next) scoped to /mysite/projects/*
 */
export default function NoHeader() {
  const pathname = usePathname();
  const onProject = pathname?.startsWith("/mysite/projects/") ?? false;
  const currentSlug = onProject ? pathname!.split("/").filter(Boolean).pop()! : null;

  const { prev, next } = currentSlug ? getPrevNextFromOrder(currentSlug) : { prev: null, next: null };

  return (
    <>
      {/* Hide header ONLY on project pages */}
      {onProject ? (
        <style jsx global>{`
          header.fixed { display: none !important; }
          body { padding-top: 0 !important; }
        `}</style>
      ) : null}

      {/* Floating bottom controls (only on project pages) */}
      {onProject ? (
        <nav
          aria-label="Project controls"
          data-testid="project-player-controls"
          className="fixed inset-x-0 bottom-0 z-[1200] pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mx-auto flex w-full items-center justify-center">
              <div className="flex items-center gap-3 rounded-2xl bg-[#f1f1f1] text-black shadow-lg ring-1 ring-black/10 px-3 py-2">
                {/* Prev */}
                <Link
                  href={prev ? `/mysite/projects/${prev}` : "#"}
                  aria-disabled={!prev}
                  className={[
                    "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-black/10",
                    prev ? "hover:scale-105 active:scale-[0.98] transition" : "opacity-40 cursor-not-allowed",
                  ].join(" ")}
                  tabIndex={prev ? 0 : -1}
                  prefetch
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous project</span>
                </Link>

                {/* Divider */}
                <span aria-hidden="true" className="h-6 w-px bg-black/10" />

                {/* Close — change to "/mysite/projects" if that’s your index */}
                <Link
                  href="/work"
                  className="inline-flex h-12 min-w-24 items-center justify-center gap-2 rounded-full bg-black text-white px-4 font-medium tracking-tight hover:scale-[1.02] active:scale-[0.99] transition"
                >
                  <X className="h-5 w-5" />
                  <span>Close</span>
                </Link>

                {/* Divider */}
                <span aria-hidden="true" className="h-6 w-px bg-black/10" />

                {/* Next */}
                <Link
                  href={next ? `/mysite/projects/${next}` : "#"}
                  aria-disabled={!next}
                  className={[
                    "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-black/10",
                    next ? "hover:scale-105 active:scale-[0.98] transition" : "opacity-40 cursor-not-allowed",
                  ].join(" ")}
                  tabIndex={next ? 0 : -1}
                  prefetch
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next project</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
}

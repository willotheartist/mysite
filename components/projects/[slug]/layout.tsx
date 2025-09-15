// app/mysite/projects/[slug]/layout.tsx
import * as React from "react";
import Link from "next/link";
import NoHeader from "@/components/NoHeader";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
  params: { slug: string };
};

export default function ProjectDetailLayout({ children, params }: LayoutProps) {
  // Extract trailing number for prev/next if your slugs look like "project-1"
  const match = params.slug.match(/(\d+)$/);
  const n = match ? Number(match[1]) : null;

  const prevSlug = n && n > 1 ? params.slug.replace(`${n}`, String(n - 1)) : null;
  const nextSlug = n && n >= 1 ? params.slug.replace(`${n}`, String(n + 1)) : null;

  return (
    <>
      {/* Keep global header hidden on project pages (you already use this) */}
      <NoHeader />

      {children}

      {/* Floating bottom controls — scoped to /mysite/projects/[slug] only */}
      <nav
        aria-label="Project controls"
        data-testid="project-player-controls"
        className="fixed bottom-4 left-0 right-0 z-[9999] md:bottom-6"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto flex w-full items-center justify-center">
            <div className="flex items-center gap-3 rounded-2xl bg-[#f1f1f1] text-black shadow-lg ring-1 ring-black/10 px-3 py-2">
              {/* Prev */}
              <Link
                href={prevSlug ? `/mysite/projects/${prevSlug}` : "#"}
                aria-disabled={!prevSlug}
                className={[
                  "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-black/10",
                  prevSlug ? "hover:scale-105 active:scale-[0.98] transition" : "opacity-40 cursor-not-allowed",
                ].join(" ")}
                tabIndex={prevSlug ? 0 : -1}
                prefetch
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous project</span>
              </Link>

              {/* Divider */}
              <span aria-hidden="true" className="h-6 w-px bg-black/10" />

              {/* Close — choose your index route here */}
              <Link
                href="/work" /* change to "/mysite/projects" if that's your index */
                className="inline-flex h-12 min-w-24 items-center justify-center gap-2 rounded-full bg-black text-white px-4 font-medium tracking-tight hover:scale-[1.02] active:scale-[0.99] transition"
              >
                <X className="h-5 w-5" />
                <span>Close</span>
              </Link>

              {/* Divider */}
              <span aria-hidden="true" className="h-6 w-px bg-black/10" />

              {/* Next */}
              <Link
                href={nextSlug ? `/mysite/projects/${nextSlug}` : "#"}
                aria-disabled={!nextSlug}
                className={[
                  "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-black/10",
                  nextSlug ? "hover:scale-105 active:scale-[0.98] transition" : "opacity-40 cursor-not-allowed",
                ].join(" ")}
                tabIndex={nextSlug ? 0 : -1}
                prefetch
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next project</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

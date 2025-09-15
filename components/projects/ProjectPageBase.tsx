// components/projects/ProjectPageBase.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Maximize2, X, Play } from "lucide-react";

export type ProjectMedia = {
  id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
};

export type ProjectPageProps = {
  /** Current project slug (for prev/next) */
  slug: string;
  /** Ordered list of ALL project slugs (server-provided) */
  allSlugs: string[];

  avatar?: string;
  role: string;
  client: string;
  date: string;
  labels: string[];
  summary: string;
  media: ProjectMedia[];
};

type LightboxState =
  | { open: false }
  | { open: true; media: ProjectMedia; index: number };

export default function ProjectPageBase({
  slug,
  allSlugs,
  avatar,
  role,
  client,
  date,
  labels,
  summary,
  media,
}: ProjectPageProps) {
  const router = useRouter();

  // Prev/Next computed from server-authoritative slugs (wrap-around)
  const { prevSlug, nextSlug } = React.useMemo(() => {
    const idx = allSlugs.findIndex((s) => s === slug);
    if (idx < 0 || allSlugs.length < 2) return { prevSlug: null, nextSlug: null };
    return {
      prevSlug: allSlugs[(idx - 1 + allSlugs.length) % allSlugs.length],
      nextSlug: allSlugs[(idx + 1) % allSlugs.length],
    };
  }, [slug, allSlugs]);

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Map<string, HTMLElement>>(new Map());
  const [progress, setProgress] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [lightbox, setLightbox] = React.useState<LightboxState>({ open: false });

  const registerItemRef = React.useCallback((id: string) => {
    return (el: HTMLElement | null) => {
      const map = itemRefs.current;
      if (el) map.set(id, el);
      else map.delete(id);
    };
  }, []);

  React.useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      const pct = max > 0 ? scroller.scrollTop / max : 0;
      setProgress(Math.max(0, Math.min(1, pct)));
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const vids = Array.from(scroller.querySelectorAll<HTMLVideoElement>("video[data-autoplay='1']"));
    if (vids.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const vid = entry.target as HTMLVideoElement;
          const mostlyVisible = entry.intersectionRatio >= 0.6;
          if (mostlyVisible) {
            const p = vid.play();
            if (p && typeof p.catch === "function") p.catch(() => {});
          } else {
            vid.pause();
          }
        }
      },
      { root: scroller, threshold: [0, 0.25, 0.6, 0.75, 1] }
    );
    vids.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [media.length]);

  React.useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const sections = media
      .map((m) => itemRefs.current.get(m.id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.getAttribute("data-id");
        if (!id) return;
        const idx = media.findIndex((m) => m.id === id);
        if (idx !== -1) setActiveIndex(idx);
      },
      { root: scroller, threshold: [0.25, 0.6, 0.75, 1] }
    );
    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [media]);

  const handleKeyNav = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const key = e.key.toLowerCase();
      if (!["arrowdown", "arrowup", "j", "k"].includes(key)) return;
      e.preventDefault();
      const dir = key === "arrowdown" || key === "j" ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(media.length - 1, activeIndex + dir));
      const next = media[nextIndex];
      const el = next ? itemRefs.current.get(next.id) : undefined;
      if (el && scrollRef.current) {
        scrollRef.current.scrollTo({ top: el.offsetTop - 12, behavior: "smooth" });
      }
    },
    [activeIndex, media]
  );

  const openLightbox = React.useCallback(
    (m: ProjectMedia, index: number) => setLightbox({ open: true, media: m, index }),
    []
  );
  const closeLightbox = React.useCallback(() => setLightbox({ open: false }), []);
  const toggleVideo = React.useCallback((id: string) => {
    const el = itemRefs.current.get(id);
    const video = el?.querySelector("video") as HTMLVideoElement | null;
    if (!video) return;
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  return (
    <div className="grid min-h-dvh grid-cols-1 bg-black text-white md:grid-cols-[360px,1fr]">
      {/* … your existing UI unchanged … */}

      {/* RIGHT SCROLL AREA */}
      <div
        ref={scrollRef}
        className="relative h-dvh overflow-y-auto bg-neutral-100 text-black outline-none"
        role="region"
        aria-label="Project media"
        tabIndex={0}
        onKeyDown={handleKeyNav}
      >
        {/* … media list + lightbox unchanged … */}

        {/* Bottom Prev / Close / Next (uses prevSlug/nextSlug) */}
        {!lightbox.open && (
          <nav className="sticky bottom-0 z-10 border-top border-black/10 bg-white/80 backdrop-blur px-4 py-3 text-black md:px-8">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {prevSlug && (
                  <Link
                    href={`/mysite/projects/${prevSlug}`}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1 ring-black/10 hover:ring-black/20 transition"
                    aria-label="Previous project"
                  >
                    ← Prev
                  </Link>
                )}
              </div>

              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white ring-1 ring-black/10 hover:bg-black/90 transition"
                aria-label="Close project"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                {nextSlug && (
                  <Link
                    href={`/mysite/projects/${nextSlug}`}
                    className="group inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1 ring-black/10 hover:ring-black/20 transition"
                    aria-label="Next project"
                  >
                    Next →
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

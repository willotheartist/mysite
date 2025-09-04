// components/projects/ProjectPageBase.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Maximize2, X, Play } from "lucide-react";

export type ProjectMedia = {
  id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
};

export type ProjectPageProps = {
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
  avatar,
  role,
  client,
  date,
  labels,
  summary,
  media,
}: ProjectPageProps) {
  const router = useRouter();

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
    if (typeof window === "undefined") return;
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
    if (typeof window === "undefined") return;
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
        scrollRef.current.scrollTo({
          top: el.offsetTop - 12,
          behavior: "smooth",
        });
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
      {/* LEFT SIDEBAR */}
      <aside className="relative flex flex-col px-6 py-8 md:px-8 md:py-12">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="mb-6 inline-flex items-center gap-2 rounded-lg px-1 py-0.5 text-sm text-neutral-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {avatar ? (
          <img
            src={avatar}
            alt={`${client} avatar`}
            className="mb-6 h-16 w-16 rounded-full object-cover"
            loading="lazy"
            width={64}
            height={64}
          />
        ) : null}

        <h1 className="text-2xl font-extrabold">{role}</h1>
        <h2 className="mt-1 text-lg font-semibold text-neutral-200">{client}</h2>
        <p className="mt-1 text-sm text-neutral-400">{date}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {labels.map((lab) => (
            <li key={lab}>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
                {lab}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 whitespace-pre-line text-sm leading-relaxed text-neutral-300">
          {summary}
        </p>

        {media.length > 0 ? (
          <p className="mt-6 text-xs text-neutral-500">
            Viewing {activeIndex + 1} / {media.length}
          </p>
        ) : null}
      </aside>

      {/* RIGHT SCROLL AREA */}
      <div
        ref={scrollRef}
        className="relative h-dvh overflow-y-auto bg-neutral-100 text-black outline-none"
        role="region"
        aria-label="Project media"
        tabIndex={0}
        onKeyDown={handleKeyNav}
      >
        {/* Progress bar */}
        <div className="sticky top-0 z-10 h-1 bg-transparent">
          <div
            className="h-full bg-black transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
            aria-hidden="true"
          />
        </div>

        <ol className="flex flex-col gap-8 p-6 md:p-10">
          {media.map((m, i) => {
            const isVideo = m.type === "video";
            return (
              <li
                key={m.id}
                data-id={m.id}
                ref={registerItemRef(m.id)}
                className="group relative"
              >
                <figure className="w-full overflow-hidden rounded-2xl border bg-white shadow-sm">
                  {isVideo ? (
                    <div className="relative">
                      <video
                        src={m.src}
                        className="block w-full"
                        controls
                        playsInline
                        muted
                        preload="metadata"
                        data-autoplay="1"
                        aria-label={m.alt ?? "Project video"}
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-start justify-end p-3">
                        <div className="pointer-events-auto flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleVideo(m.id)}
                            className="rounded-lg bg-black/60 p-2 text-white opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100"
                            aria-label="Toggle play/pause"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openLightbox(m, i)}
                            className="rounded-lg bg-black/60 p-2 text-white opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100"
                            aria-label="Open video in lightbox"
                          >
                            <Maximize2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openLightbox(m, i)}
                      className="relative block w-full focus:outline-none"
                      aria-label="Open image in lightbox"
                    >
                      <img
                        src={m.src}
                        alt={m.alt ?? ""}
                        className="block w-full"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <Maximize2 className="h-4 w-4" />
                      </div>
                    </button>
                  )}

                  {(m.alt ?? "").trim() ? (
                    <figcaption className="border-t px-4 py-3 text-xs text-neutral-600">
                      {m.alt}
                    </figcaption>
                  ) : null}
                </figure>

                <span className="absolute -left-2 -top-2 select-none rounded-full bg-black px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                  {i + 1}
                </span>
              </li>
            );
          })}
        </ol>

        {lightbox.open ? (
          <Lightbox
            media={lightbox.media}
            index={lightbox.index}
            count={media.length}
            onClose={closeLightbox}
            goPrev={() => {
              const idx = Math.max(0, lightbox.index - 1);
              const m = media[idx];
              setLightbox({ open: true, media: m, index: idx });
            }}
            goNext={() => {
              const idx = Math.min(media.length - 1, lightbox.index + 1);
              const m = media[idx];
              setLightbox({ open: true, media: m, index: idx });
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

function Lightbox({
  media,
  index,
  count,
  onClose,
  goPrev,
  goNext,
}: {
  media: ProjectMedia;
  index: number;
  count: number;
  onClose: () => void;
  goPrev: () => void;
  goNext: () => void;
}) {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null);

  React.useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (!d.open) d.showModal();
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, [onClose]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  return (
    <dialog
      ref={dialogRef}
      className="w-[min(96vw,1200px)] overflow-hidden rounded-xl p-0 backdrop:bg-black/75"
    >
      <div className="relative bg-neutral-950">
        <div className="flex items-center justify-between px-3 py-2 text-white">
          <span className="text-xs opacity-80">
            {index + 1} / {count}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Next
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-md bg-white/10 p-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="max-h-[82vh] overflow-auto bg-black p-2">
          {media.type === "image" ? (
            <img
              src={media.src}
              alt={media.alt ?? ""}
              className="mx-auto block h-auto max-h-[78vh] w-auto"
              loading="eager"
            />
          ) : (
            <video
              src={media.src}
              className="mx-auto block h-auto max-h-[78vh] w-auto"
              controls
              autoPlay
              muted
              playsInline
              preload="metadata"
              aria-label={media.alt ?? "Project video"}
            />
          )}
        </div>

        {(media.alt ?? "").trim() ? (
          <div className="border-t border-white/10 bg-neutral-950 px-3 py-2 text-xs text-neutral-300">
            {media.alt}
          </div>
        ) : null}
      </div>
    </dialog>
  );
}

// components/sections/ProjectsShowcase.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Media =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster?: string };

type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  tasks: string[];
  media: Media;
};

const PROJECTS: Project[] = [
  {
    id: "id-1",
    title: "Project One",
    client: "Client One",
    year: "2021",
    tasks: ["Branding", "Web"],
    media: { kind: "image", src: "/projects/id-1/icedream_laptop_mockup_onew.png" },
  },
  {
    id: "id-2",
    title: "Project Two",
    client: "Client Two",
    year: "2021",
    tasks: ["UI/UX", "Frontend"],
    media: { kind: "image", src: "/projects/id-2/jimbo_laptop_mockup_homepage.jpg" },
  },
  {
    id: "id-3",
    title: "Project Three",
    client: "Client Three",
    year: "2022",
    tasks: ["Motion", "Microsite"],
    media: { kind: "image", src: "/projects/id-3/wall&5th_laptop_mockup.png" },
  },
  {
    id: "id-4",
    title: "Project Four",
    client: "Client Four",
    year: "2022",
    tasks: ["Identity", "Collateral"],
    media: { kind: "image", src: "/projects/id-4/fckoffee Mockup Two Types Blue & Pink copy.jpg" },
  },
  {
    id: "id-5",
    title: "Project Five",
    client: "Client Five",
    year: "2023",
    tasks: ["Web App", "Design System"],
    media: { kind: "image", src: "/projects/id-5/preview.jpg" },
  },
  {
    id: "id-6",
    title: "Project Six",
    client: "Client Six",
    year: "2023",
    tasks: ["Campaign", "Print"],
    media: { kind: "video", src: "/projects/id-6/preview.mp4", poster: "/projects/id-6/poster.jpg" },
  },
  {
    id: "id-7",
    title: "Project Seven",
    client: "Client Seven",
    year: "2023",
    tasks: ["3D", "Animation"],
    media: { kind: "image", src: "/projects/id-7/preview.jpg" },
  },
  {
    id: "id-8",
    title: "Project Eight",
    client: "Client Eight",
    year: "2024",
    tasks: ["Product", "Onboarding"],
    media: { kind: "video", src: "/projects/id-8/preview.mp4", poster: "/projects/id-8/poster.jpg" },
  },
  {
    id: "id-9",
    title: "Project Nine",
    client: "Client Nine",
    year: "2024",
    tasks: ["Editorial", "Art Direction"],
    media: { kind: "image", src: "/projects/id-9/preview.jpg" },
  },
  {
    id: "id-10",
    title: "Project Ten",
    client: "Client Ten",
    year: "2024",
    tasks: ["Prototype", "R&D"],
    media: { kind: "video", src: "/projects/id-10/preview.mp4", poster: "/projects/id-10/poster.jpg" },
  },
];

/** SSR-safe prefers-reduced-motion that updates after mount */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

// Pause any playing <video> when switching items
function useAutoPauseOnSwitch(activeKey: string) {
  const lastKey = useRef<string>(activeKey);
  useEffect(() => {
    if (lastKey.current !== activeKey) {
      const vids = document.querySelectorAll<HTMLVideoElement>('video[data-showcase="preview"]');
      vids.forEach((v) => v.pause());
      lastKey.current = activeKey;
    }
  }, [activeKey]);
}

export default function ProjectsShowcase() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0]?.id);
  const active = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];
  const prefersReduced = usePrefersReducedMotion();

  useAutoPauseOnSwitch(active.id);

  return (
    <section
      id="projects"
      aria-label="Projects"
      // Remove fixed height so the page can scroll; sticky works only when parent scrolls
      className="grid grid-cols-1 md:grid-cols-2 border-t border-black/10 bg-[#F1F1F1]"
    >
      {/* LEFT: Titles (normal document flow; no internal scroller) */}
      <div className="relative">
        <ul
          className="px-6 md:px-8 py-10 md:py-12 space-y-3"
          role="listbox"
          aria-activedescendant={activeId}
        >
          {PROJECTS.map((p) => {
            const activeState = p.id === activeId;
            return (
              <li
                key={p.id}
                className="border-b border-black/10"
                id={p.id}
                role="option"
                aria-selected={activeState}
              >
                <button
                  onMouseEnter={() => setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                  onClick={() => setActiveId(p.id)}
                  onTouchStart={() => setActiveId(p.id)}
                  aria-current={activeState ? "true" : undefined}
                  className="group w-full text-left py-2 md:py-3 outline-none focus-visible:ring-2 focus-visible:ring-black/60 rounded-sm"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      className={[
                        "block font-extrabold uppercase tracking-tight",
                        "text-[9vw] leading-[0.95] md:text-[5vw]",
                        activeState
                          ? "text-black"
                          : "text-neutral-700 group-hover:text-black transition-colors",
                      ].join(" ")}
                    >
                      {p.title}
                    </span>
                    <span className="hidden md:block text-sm text-neutral-500 group-hover:text-neutral-800">
                      {p.year}
                    </span>
                  </div>
                  <span
                    className={[
                      "mt-1 block h-px bg-black/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform",
                      activeState ? "scale-x-100" : "",
                    ].join(" ")}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* RIGHT: Sticky preview (sticks while the page scrolls) */}
      <div className="relative md:sticky md:top-0 md:h-[100svh] bg-neutral-900">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-media"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.28 }}
              className="absolute inset-0"
            >
              {active.media.kind === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.media.src}
                  alt={`${active.title} preview`}
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                />
              ) : (
                <video
                  data-showcase="preview"
                  className="h-full w-full object-cover"
                  src={active.media.src}
                  poster={active.media.poster}
                  preload="metadata"
                  muted
                  playsInline
                  loop
                  autoPlay={!prefersReduced}
                  controls={false}
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  aria-label={`${active.title} preview video`}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Details */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-details"}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.24 }}
              className="inline-flex max-w-[92%] flex-col gap-1 rounded-2xl bg-black/60 px-3 py-2 backdrop-blur-sm text-white"
            >
              <span className="text-xs uppercase tracking-widest opacity-80">
                {active.year} / {active.client}
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                {active.title}
              </h3>
              <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm opacity-90">
                {active.tasks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// components/StickyGallery.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
  title: string;
  tag: string;
  src: string;
  poster?: string;
};

function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (typeof window.matchMedia === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? true : false;
}

export default function StickyGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const items: GalleryItem[] = [
    {
      title: "Jimbo: Get Social · Get Active",
      tag: "Creative Lead · Branding · App UI/UX",
      src: "/videos/sticky-gallery/sg-01.mp4",
      poster: "/videos/sticky-gallery/sg-01.jpg",
    },
    {
      title: "Stubby: Social Ticketing App",
      tag: "Branding · App UI/UX",
      src: "/videos/sticky-gallery/sg-02.mp4",
      poster: "/videos/sticky-gallery/sg-02.jpg",
    },
    {
      title: "Zefa: City Guide Social App",
      tag: "Branding · App UI/UX",
      src: "/videos/sticky-gallery/sg-03.mp4",
      poster: "/videos/sticky-gallery/sg-03.jpg",
    },
    {
      title: "Campaign Posters",
      tag: "Print",
      src: "/videos/sticky-gallery/sg-04.mp4",
      poster: "/videos/sticky-gallery/sg-04.jpg",
    },
    {
      title: "archi Ai: Construction Assistant",
      tag: "Branding · Web Design · Pitch Decks",
      src: "/videos/sticky-gallery/sg-05.mp4",
      poster: "/videos/sticky-gallery/sg-05.jpg",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    if (typeof window === "undefined") return;

    const prefersReduced = getPrefersReducedMotion();

    gsap.set(track, { x: 0 });

    const totalScroll = () =>
      Math.max(0, track.scrollWidth - container.clientWidth);

    const tween = gsap.to(track, {
      x: () => -totalScroll(),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => "+=" + totalScroll(),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    const panels = gsap.utils.toArray<HTMLDivElement>(".sg-panel");
    const videoEls = panels.map((p) => p.querySelector<HTMLVideoElement>("video"));
    const triggers: ScrollTrigger[] = [];

    if (!prefersReduced) {
      panels.forEach((panel, i) => {
        const trig = ScrollTrigger.create({
          trigger: panel,
          start: "left center",
          end: "right center",
          horizontal: true,
          onEnter: () => {
            const vid = videoEls[i];
            if (vid) {
              vid.muted = true;
              vid.playsInline = true;
              vid.play().catch(() => {});
            }
          },
          onEnterBack: () => {
            const vid = videoEls[i];
            if (vid) {
              vid.muted = true;
              vid.playsInline = true;
              vid.play().catch(() => {});
            }
          },
          onLeave: () => {
            videoEls[i]?.pause();
          },
          onLeaveBack: () => {
            videoEls[i]?.pause();
          },
        });
        triggers.push(trig);
      });
    }

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      triggers.forEach((t) => t.kill());
      tween.scrollTrigger?.kill(true);
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] bg-[#F1F1F1] border-t border-black/10"
      aria-label="Featured work"
    >
      <div ref={trackRef} className="flex h-full">
        {items.map((item, idx) => (
          <Panel key={item.src} item={item} index={idx + 1} />
        ))}
      </div>
    </section>
  );
}

function Panel({ item, index }: { item: GalleryItem; index: number }) {
  const prefersReduced = getPrefersReducedMotion();

  return (
    <div className="sg-panel w-[100vw] h-full flex-none grid place-items-center p-8">
      <div className="relative w-[78vw] h-[72vh] rounded-3xl shadow-sm border border-black/10 overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={item.src}
          poster={item.poster}
          preload="metadata"
          loop
          muted
          playsInline
          autoPlay={!prefersReduced}
          controls={false} // 🔒 no controls
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-label={`${item.tag} — ${item.title}`}
        />

        {/* Gradient for readability */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent"
        />

        {/* Bottom-left caption */}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
          <div className="rounded-xl bg-black/60 px-3 py-2 backdrop-blur-sm">
            <span className="block text-[10px] md:text-xs tracking-widest uppercase text-white/85">
              {item.tag}
            </span>
            <h3 className="mt-1 text-lg md:text-2xl font-semibold leading-tight text-white">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Index badge */}
        <div className="pointer-events-none absolute top-3 left-3 md:top-4 md:left-4">
          <span className="rounded-full bg-black/60 px-2 py-1 text-[10px] md:text-xs text-white">
            {String(index).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

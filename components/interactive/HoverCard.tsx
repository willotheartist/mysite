"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export type HoverCardItem = {
  title: string;
  kicker?: string;
  mediaType: "image" | "video";
  src: string;
  poster?: string;
};

type Props = { item: HoverCardItem; href: string };

export default function HoverCard({ item, href }: Props) {
  // Generic types to avoid DOM-lib edge cases
  const rootRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const media = mediaRef.current!;
    const arrow = arrowRef.current!;
    const shine = shineRef.current!;
    const vid = videoRef.current;

    // Initial states
    gsap.set(media, { autoAlpha: 0, yPercent: 4, scale: 0.98 });
    gsap.set(arrow, { x: 0, autoAlpha: 0.6 });
    gsap.set(shine, { autoAlpha: 0 });

    // Hover timeline
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out", duration: 0.5 },
    });

    tl.to(media, { autoAlpha: 1, yPercent: 0, scale: 1 }, 0)
      .to(arrow, { x: 6, autoAlpha: 1 }, 0);

    const onEnter = () => {
      tl.play();
      if (vid) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      }
    };

    const onLeave = () => {
      tl.reverse();
      vid?.pause();
    };

    // Mouse parallax + glare
    const rect = () => root.getBoundingClientRect();
    const qx = gsap.quickTo(media, "x", { duration: 0.3, ease: "power2.out" });
    const qy = gsap.quickTo(media, "y", { duration: 0.3, ease: "power2.out" });
    const qrot = gsap.quickTo(media, "rotate", { duration: 0.3, ease: "power2.out" });
    const qshineX = gsap.quickTo(shine, "x", { duration: 0.25, ease: "power2.out" });
    const qshineY = gsap.quickTo(shine, "y", { duration: 0.25, ease: "power2.out" });
    const qshineA = gsap.quickTo(shine, "autoAlpha", { duration: 0.25, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const r = rect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      const cx = mx / r.width - 0.5;
      const cy = my / r.height - 0.5;

      qx(cx * 10);
      qy(cy * 10);
      qrot(cx * -2);

      qshineX(mx - r.width * 0.5);
      qshineY(my - r.height * 0.5);
      qshineA(0.18);
    };

    const onOut = () => {
      qx(0); qy(0); qrot(0); qshineA(0);
    };

    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", () => { onLeave(); onOut(); });
    root.addEventListener("mousemove", onMove);

    return () => {
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", () => { onLeave(); onOut(); });
      root.removeEventListener("mousemove", onMove);
      tl.kill();
    };
  }, []);

  return (
    <article ref={rootRef as any} className="fn-card">
      <Link href={href} className="fn-card-link" aria-label={item.title}>
        <div className="fn-card-row">
          <div className="fn-meta">
            {item.kicker && <span className="fn-kicker">{item.kicker}</span>}
            <h3 className="fn-title">{item.title}</h3>
          </div>
          <span ref={arrowRef} className="fn-arrow" aria-hidden>→</span>
        </div>

        <div ref={mediaRef} className="fn-media">
          {item.mediaType === "image" ? (
            <img src={item.src} alt="" loading="lazy" />
          ) : (
            <video
              ref={videoRef}
              src={item.src}
              poster={item.poster}
              muted
              playsInline
              preload="metadata"
            />
          )}
          <div ref={shineRef} className="fn-shine" />
        </div>
      </Link>
    </article>
  );
}

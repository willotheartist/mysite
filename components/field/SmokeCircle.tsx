// components/field/SmokeCircle.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

type Avatar = { id: string; img?: string; alt?: string };

export default function SmokeCircle({ avatars }: { avatars: Avatar[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const points = useMemo(() => {
    const N = Math.max(avatars.length, 10);
    return new Array(N).fill(0).map((_, i) => ({ t: (i / N) * Math.PI * 2 }));
  }, [avatars.length]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGSAP();
    if (!gsap || !ScrollTrigger) return;
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    if (!wrap || !ring) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // slow continuous rotation
      const rot = gsap.to(ring, { rotate: 360, duration: 120, repeat: -1, ease: "none" });

      // scroll-linked zoom
      const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top 60%",
        end: "bottom 10%",
        scrub: true,
        onUpdate: (self) => {
          const s = 1 + self.progress * 2; // 1 → ~3
          gsap.set(ring, { scale: s });
        },
      });

      return () => {
        rot.kill();
        st.kill();
      };
    });

    return () => mm.kill();
  }, []);

  return (
    <section
      id="smoke"
      ref={wrapRef}
      className="relative min-h-[140vh] flex items-center justify-center overflow-hidden"
      aria-label="Campfire circle"
    >
      <div ref={ringRef} className="relative size-[60vmin]">
        {points.map((p, i) => {
          // Round to avoid SSR/CSR float precision mismatches during hydration
          const x = Number((Math.cos(p.t) * 24).toFixed(3));
          const y = Number((Math.sin(p.t) * 24).toFixed(3));
          const a = avatars[i % avatars.length];
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}vmin), calc(-50% + ${y}vmin))`,
              }}
            >
              <div className="size-12 md:size-16 rounded-full overflow-hidden bg-neutral-300 border border-neutral-200">
                {a?.img ? (
                  <img src={a.img} alt={a.alt ?? ""} className="w-full h-full object-cover" />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

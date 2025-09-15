// /components/dev/ScrollSyncProbe.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { getGSAP } from "@/lib/gsap";

export default function ScrollSyncProbe() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [readout, setReadout] = useState({ y: 0, v: 0, p: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { gsap, ScrollTrigger } = getGSAP();

    // enable markers for this probe only
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
        markers: true,
        onUpdate: (self) => {
          const y = Math.round(window.scrollY);
          const v = Math.round((window as any).lenis?.velocity ?? 0);
          setReadout({ y, v, p: Number(self.progress.toFixed(3)) });
        },
      },
    });

    tl.to(ref.current, { y: 200, rotation: 10, scale: 1.05 }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="relative">
      {/* HUD */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[9999] rounded-lg border border-neutral-300 bg-white/90 p-3 text-xs text-neutral-800 shadow">
        <div>Lenis y: {readout.y}</div>
        <div>Lenis vel: {readout.v}</div>
        <div>ST progress: {readout.p}</div>
      </div>

      {/* Test target */}
      <div ref={ref} className="mx-auto my-24 h-24 w-24 rounded-xl border border-neutral-300 bg-white shadow" />
    </div>
  );
}

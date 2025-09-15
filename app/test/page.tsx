// app/test/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

export default function TestPage() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGSAP();
    if (!gsap || !ScrollTrigger) return;

    gsap.to(boxRef.current, {
      x: 300,
      rotation: 360,
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <main className="min-h-screen flex flex-col gap-96 items-start p-10">
      <h1 className="text-3xl font-bold">GSAP Test</h1>
      <div ref={boxRef} className="w-32 h-32 bg-yellow-400 rounded-xl" />
      <div className="h-[200vh]" /> {/* extra scroll space */}
    </main>
  );
}

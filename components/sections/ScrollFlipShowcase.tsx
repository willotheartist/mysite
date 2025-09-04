"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Props = {
  images: string[]; // pass 3 paths from /public (e.g. /case/case-01.jpg)
};

export default function ScrollFlipShowcase({ images }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const imgA = images[0] ?? "/case/case-01.jpg";
  const imgB = images[1] ?? "/case/case-02.jpg";
  const imgC = images[2] ?? "/case/case-03.jpg";

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 });
  const bg = useTransform(p, (v) => `hsl(${210 + v * 60} 100% 97%)`);

  const aScale = useTransform(p, [0.0, 0.2, 0.33], [1.0, 0.94, 0.88]);
  const aY = useTransform(p, [0.0, 0.33], [0, -60]);
  const aRotateY = useTransform(p, [0.0, 0.33], [0, 12]);
  const aOpacity = useTransform(p, [0.0, 0.28, 0.33], [1, 1, 0]);

  const bY = useTransform(p, [0.2, 0.5], [120, -10]);
  const bScale = useTransform(p, [0.2, 0.5], [0.92, 1.02]);
  const bRotateY = useTransform(p, [0.2, 0.5], [20, 0]);
  const bOpacity = useTransform(p, [0.25, 0.5], [0, 1]);

  const cY = useTransform(p, [0.45, 0.8], [160, -20]);
  const cScale = useTransform(p, [0.45, 0.8], [0.9, 1.03]);
  const cRotateY = useTransform(p, [0.6, 1.0], [-8, 180]);
  const cOpacity = useTransform(p, [0.55, 0.75, 1.0], [0, 0.9, 1]);

  return (
    <div ref={rootRef} className="relative">
      <div className="h-[380vh]">
        <motion.div className="sticky top-0 h-screen" style={{ background: bg }}>
          <div className="h-full w-full grid place-items-center px-6">
            <div className="relative w-full max-w-6xl" style={{ perspective: 1200 }}>
              <div className="relative h-[64vh] md:h-[70vh]">
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl border border-black/10 bg-white"
                  style={{
                    scale: aScale,
                    y: aY,
                    rotateY: aRotateY,
                    opacity: aOpacity,
                    transformStyle: "preserve-3d",
                    zIndex: 30,
                  }}
                >
                  <Image
                    src={imgA}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 1000px, 90vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl border border-black/10 bg-white"
                  style={{
                    scale: bScale,
                    y: bY,
                    rotateY: bRotateY,
                    opacity: bOpacity,
                    transformStyle: "preserve-3d",
                    zIndex: 20,
                  }}
                >
                  <Image
                    src={imgB}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 900px, 90vw"
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl border border-black/10 bg-white"
                  style={{
                    scale: cScale,
                    y: cY,
                    rotateY: cRotateY,
                    opacity: cOpacity,
                    transformStyle: "preserve-3d",
                    zIndex: 10,
                  }}
                >
                  <Image
                    src={imgC}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 900px, 90vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

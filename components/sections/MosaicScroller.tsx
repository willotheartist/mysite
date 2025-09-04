// components/sections/MosaicScroller.tsx
"use client";

import { useEffect, useMemo, useRef, useState, memo } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  MotionValue,
} from "framer-motion";

/* -------------------- types -------------------- */
type MediaItem = {
  id: string;
  type: "video" | "image";
  src: string;           // mp4 path
  alt?: string;
  poster?: string;       // optional jpg/png poster
  size?: "sm" | "md" | "lg" | "xl";
};

/* -------------------- layout helpers -------------------- */

const sizeToCols: Record<NonNullable<MediaItem["size"]>, string> = {
  sm: "col-span-1",
  md: "col-span-1",
  lg: "col-span-2 md:col-span-2",
  xl: "col-span-2 md:col-span-2",
};
const sizeToAspect: Record<NonNullable<MediaItem["size"]>, string> = {
  sm: "aspect-[1/1]",
  md: "aspect-[4/3]",
  lg: "aspect-[16/9]",
  xl: "aspect-[16/9]",
};

function useCols() {
  const [cols, setCols] = useState(5);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCols(5);
      else if (w >= 1024) setCols(4);
      else if (w >= 768) setCols(3);
      else setCols(2);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return cols;
}

/* -------- seeded random (stable per item) -------- */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* -------------------- stable video tile -------------------- */

function VideoTile({
  src,
  poster,
  className,
  near,                 // near viewport → preload more & play
  playbackRateMV,
}: {
  src: string;
  poster?: string;
  className?: string;
  near: boolean;
  playbackRateMV: MotionValue<number>;
}) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // Ensure first frame paints on all browsers:
  //  - keep src bound
  //  - autoplay muted & playsInline
  //  - after metadata, seek a hair to force a frame
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = true;
    (v as any).playsInline = true;

    const onLoadedMeta = () => {
      try {
        // nudge to force frame render without noticeable jump
        if (v.currentTime < 0.02) v.currentTime = 0.02;
      } catch {}
    };
    v.addEventListener("loadedmetadata", onLoadedMeta);
    return () => v.removeEventListener("loadedmetadata", onLoadedMeta);
  }, []);

  // Play/pause based on proximity
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    if (near) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      try { v.pause(); } catch {}
    }
  }, [near]);

  // scroll-reactive playback rate (subtle)
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const unsub = playbackRateMV.on("change", (r) => {
      const rate = Math.max(0.75, Math.min(1.5, r));
      v.playbackRate = rate;
    });
    return () => unsub();
  }, [playbackRateMV]);

  return (
    <div className="relative h-full w-full">
      {!ready && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-200" />
      )}
      <video
        ref={vidRef}
        className={className}
        src={src}                     // ✅ keep bound
        poster={poster}
        muted
        loop
        autoPlay                     // ✅ helps paint a frame early with muted
        preload={near ? "auto" : "metadata"}
        onLoadedData={() => setReady(true)}
      />
    </div>
  );
}

/* -------------------- deck → settle item -------------------- */

const DeckExplodeItem = memo(function DeckExplodeItem({
  item,
  size,
  gridColIndex,
  gridRowIndex,
  cols,
  rows,
  progress, // 0 → stacked deck, 1 → settled grid
  playbackRateMV,
}: {
  item: MediaItem;
  size: NonNullable<MediaItem["size"]>;
  gridColIndex: number;
  gridRowIndex: number;
  cols: number;
  rows: number;
  progress: MotionValue<number>;
  playbackRateMV: MotionValue<number>;
}) {
  const colClass = sizeToCols[size];
  const aspectClass = sizeToAspect[size];

  // Use a generous inView on the OUTER cell to mark as "near"
  const sensorRef = useRef<HTMLDivElement>(null);
  const near = useInView(sensorRef, { amount: 0, margin: "150% 0px" });

  // --- center of grid (where the deck "stacks")
  const centerCol = (cols - 1) / 2;
  const centerRow = (rows - 1) / 2;

  // seeded randomness for this tile
  const seedBase = Math.abs(hashCode(item.id ?? `${gridRowIndex}-${gridColIndex}`)) % 100000;
  const rnd = mulberry32(seedBase);
  const rand = () => rnd() * 2 - 1; // [-1, 1]

  // "pull to center" vector from this grid cell
  const pullX = (centerCol - gridColIndex) * 160;
  const pullY = (centerRow - gridRowIndex) * 120;

  // add chaotic scatter for the messy deck
  const scatterX = rand() * 60;
  const scatterY = rand() * 60;
  const startX = pullX + scatterX;
  const startY = pullY + scatterY;

  const startRot = rand() * 18;             // -18..18 deg
  const startScale = 0.92 + rnd() * 0.04;   // 0.92..0.96

  const colDist = Math.abs(gridColIndex - centerCol);
  const rowDist = Math.abs(gridRowIndex - centerRow);
  const delayBase = (colDist + rowDist) * 0.03;

  const delayed = useTransform(progress, (t) => clamp01((t - delayBase) / (1 - delayBase)));

  const wobbleY = useTransform(delayed, (t) => Math.cos(t * Math.PI * 1.25) * (1 - t) * 10);
  const gravityBoost = useTransform(delayed, (t) => 24 * t * t);

  const x = useTransform(delayed, (t) => lerp(startX, 0, t));
  const y = useTransform([delayed, gravityBoost, wobbleY], (values) => {
    const t = values[0] as number;
    const g = values[1] as number;
    const wy = values[2] as number;
    return lerp(startY, 0, t) + g + wy;
  });

  const rot = useTransform(delayed, (t) => lerp(startRot, 0, t));
  const scale = useTransform(delayed, (t) => lerp(startScale, 1, t));
  const z = useTransform(delayed, [0, 0.5, 1], [40, 80, 1]);

  // gentle blur & fade while stacked
  const blur = useTransform(delayed, (t) => 2 * (1 - t));
  const filterMV = useTransform(blur, (bv) => `blur(${(bv as number).toFixed(2)}px)`);
  const opacity = useTransform(delayed, [0, 0.2, 1], [0.92, 0.98, 1]);

  return (
    <article ref={sensorRef} className={`relative ${colClass} ${aspectClass}`}>
      <motion.div
        style={{
          x, y, rotate: rot, scale,
          zIndex: (z as unknown as number) ?? 1,
          filter: filterMV,
          opacity,
        }}
        className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg will-change-transform bg-neutral-200"
      >
        {item.type === "video" ? (
          <VideoTile
            src={item.src}
            poster={item.poster}
            near={near}
            playbackRateMV={playbackRateMV}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.alt ?? ""}
            className="h-full w-full object-cover object-center select-none"
            draggable={false}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/0 via-black/0 to-black/10" />
      </motion.div>
    </article>
  );
});

/* -------------------- main component -------------------- */

export default function MosaicScroller({
  items,
  title = "Selected Work",
}: {
  items: MediaItem[];
  title?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // section scroll progress (drives deck → settle)
  const { scrollYProgress, scrollY } = useScroll({
    target: wrapRef,
    offset: ["start 85%", "end 20%"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.8 });

  // velocity → playback rate
  const velocity = useVelocity(scrollY);
  const smoothVel = useSpring(velocity, { stiffness: 140, damping: 28, mass: 0.6 });
  const playbackRateMV = useTransform(smoothVel, (v) => 1 + Math.max(-0.5, Math.min(0.5, v / 3000)));

  const cols = useCols();
  const rows = Math.max(1, Math.ceil(items.length / cols));

  const sizePattern = useMemo(
    () => ([
      "lg", "sm", "md", "sm", "md",
      "lg", "sm", "xl", "md", "sm",
    ] as const),
    []
  );

  return (
    <section ref={wrapRef} aria-label={title} className="relative w-full bg-[#F1F1F1] text-black">
      {/* Sticky Heading */}
      <div className="sticky top-0 z-10 pointer-events-none">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <motion.h2
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-extrabold tracking-tight"
          >
            {title}
          </motion.h2>
        </div>
      </div>

      {/* Grid targets */}
      <div
        className="
          mx-auto max-w-[1600px] px-3 sm:px-4 md:px-6 pb-24
          grid gap-4 md:gap-5
          grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
          grid-flow-row-dense
          relative
        "
      >
        {items.map((item, i) => {
          const size = (item.size ?? sizePattern[i % sizePattern.length]) as NonNullable<MediaItem["size"]>;
          const gridColIndex = i % cols;
          const gridRowIndex = Math.floor(i / cols);

          return (
            <div key={item.id} className="group relative">
              <DeckExplodeItem
                item={item}
                size={size}
                gridColIndex={gridColIndex}
                gridRowIndex={gridRowIndex}
                cols={cols}
                rows={rows}
                progress={progress}
                playbackRateMV={playbackRateMV}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------- utils -------------------- */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

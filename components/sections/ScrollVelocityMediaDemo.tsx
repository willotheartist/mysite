// components/sections/ScrollVelocityMediaDemo.tsx
"use client";

import Image from "next/image";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/magicui/scroll-based-velocity";
import { cn } from "@/lib/utils";

type MediaItem = {
  src: string;
  alt?: string;
};

const ROW_A: MediaItem[] = [
  { src: "/projects/id-1/cover.jpg", alt: "Project 1 cover" },
  { src: "/projects/id-2/cover.jpg", alt: "Project 2 cover" },
  { src: "/projects/id-3/cover.jpg", alt: "Project 3 cover" },
];

const ROW_B: MediaItem[] = [
  { src: "/projects/id-1/teaser.mp4", alt: "Project 1 teaser" },
  { src: "/projects/id-2/teaser.mp4", alt: "Project 2 teaser" },
  { src: "/projects/id-3/detail.jpg", alt: "Project 3 detail" },
];

// Simple file extension check
const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

export default function ScrollVelocityMediaDemo() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={12} direction={1} className="py-4">
          {ROW_A.map((item, idx) =>
            isVideo(item.src) ? (
              <VideoThumb key={idx} src={item.src} className="mx-4" />
            ) : (
              <ImageThumb key={idx} src={item.src} alt={item.alt} className="mx-4" />
            ),
          )}
        </ScrollVelocityRow>

        <ScrollVelocityRow baseVelocity={12} direction={-1} className="py-4">
          {ROW_B.map((item, idx) =>
            isVideo(item.src) ? (
              <VideoThumb key={idx} src={item.src} className="mx-4" />
            ) : (
              <ImageThumb key={idx} src={item.src} alt={item.alt} className="mx-4" />
            ),
          )}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      {/* edge fades, using your theme's background token */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />

      {/* Typography demo variant (optional) */}
      <div className="mt-10 w-full">
        <ScrollVelocityContainer className="text-3xl font-bold md:text-6xl">
          <ScrollVelocityRow baseVelocity={20} direction={1} className="py-2">
            Velocity&nbsp;Scroll&nbsp;&nbsp;
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={20} direction={-1} className="py-2">
            Velocity&nbsp;Scroll&nbsp;&nbsp;
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>
    </section>
  );
}

function ImageThumb({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div className={cn("inline-block h-40 w-60 overflow-hidden rounded-lg shadow-sm", className)}>
      <Image
        src={src}
        alt={alt}
        width={240}
        height={160}
        sizes="240px"
        className="h-full w-full object-cover"
        priority={false}
      />
    </div>
  );
}

function VideoThumb({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn("inline-block h-40 w-60 overflow-hidden rounded-lg shadow-sm", className)}>
      <video
        src={src}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        // Use autoPlay only when user hasn't enabled reduced motion
        autoPlay
        preload="metadata"
      />
    </div>
  );
}

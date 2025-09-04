// app/page.tsx
"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BubbleMenu from "@/components/menus/BubbleMenu";

// 🚫 Avoid SSR issues for DOM/scroll heavy components
const StickyGallery = dynamic(() => import("@/components/sections/StickyGallery"), { ssr: false });
const DesignCarousel = dynamic(() => import("@/components/sections/DesignCarousel"), { ssr: false });
const ScrollFlipShowcase = dynamic(() => import("@/components/sections/ScrollFlipShowcase"), { ssr: false });
const MosaicScroller = dynamic(() => import("@/components/sections/MosaicScroller"), { ssr: false });
// ✅ Projects list + hover preview
const ProjectsShowcase = dynamic(() => import("@/components/sections/ProjectsShowcase"), { ssr: false });
// ✅ New interactive hero
const HeroInteractive = dynamic(() => import("@/components/sections/HeroInteractive"), { ssr: false });

const INDUSTRY_ITEMS = [
  { label: "Restaurants & F&B", href: "#industry-restaurants", rotation: -6, hoverStyles: { bgColor: "#FFB703", textColor: "#111" } },
  { label: "Photography Studios", href: "#industry-photo", rotation: 8, hoverStyles: { bgColor: "#1DB954", textColor: "#fff" } },
  { label: "Mindfulness & Wellness", href: "#industry-mindfulness", rotation: 6, hoverStyles: { bgColor: "#7C3AED", textColor: "#fff" } },
  { label: "AI / Tech", href: "#industry-ai", rotation: -8, hoverStyles: { bgColor: "#0EA5E9", textColor: "#fff" } },
  { label: "Supplements", href: "#industry-supplements", rotation: 10, hoverStyles: { bgColor: "#EF4444", textColor: "#fff" } },
  { label: "Bicycles / Mobility", href: "#industry-bikes", rotation: -4, hoverStyles: { bgColor: "#10B981", textColor: "#fff" } },
  { label: "Language Schools", href: "#industry-language", rotation: 6, hoverStyles: { bgColor: "#F59E0B", textColor: "#111" } },
  { label: "E-commerce", href: "#industry-ecom", rotation: -6, hoverStyles: { bgColor: "#111827", textColor: "#fff" } },
  { label: "Magazines / Media", href: "#industry-media", rotation: 8, hoverStyles: { bgColor: "#3B82F6", textColor: "#fff" } },
  { label: "Creative Studios", href: "#industry-creative", rotation: -10, hoverStyles: { bgColor: "#A3E635", textColor: "#111" } },
  { label: "Fashion / Apparel", href: "#industry-fashion", rotation: 6, hoverStyles: { bgColor: "#F472B6", textColor: "#111" } },
  { label: "Events & Exhibitions", href: "#industry-events", rotation: -8, hoverStyles: { bgColor: "#22D3EE", textColor: "#111" } },
  { label: "Dance / Schools", href: "#industry-dance", rotation: 8, hoverStyles: { bgColor: "#FB923C", textColor: "#111" } },
  { label: "Wine & Beverage", href: "#industry-wine", rotation: -6, hoverStyles: { bgColor: "#7F1D1D", textColor: "#fff" } },
  { label: "Sports & Social Apps", href: "#industry-sportsapps", rotation: 10, hoverStyles: { bgColor: "#16A34A", textColor: "#fff" } },
  { label: "City Guides / Platforms", href: "#industry-cityguides", rotation: -10, hoverStyles: { bgColor: "#334155", textColor: "#fff" } },
  { label: "Games / Interactive", href: "#industry-games", rotation: 6, hoverStyles: { bgColor: "#EC4899", textColor: "#fff" } },
  { label: "Pharma Fairs Screens", href: "#industry-pharma", rotation: -4, hoverStyles: { bgColor: "#60A5FA", textColor: "#111" } },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-[#F1F1F1] text-black selection:bg-black selection:text-[#F1F1F1] relative">
      {/* HERO — Interactive Split */}
      <HeroInteractive
        title="I design clear, human products — with systems that scale."
        subline="Brand, product, and motion — shipped with care since 2015."
      />

      {/* STICKY HORIZONTAL GALLERY */}
      <section id="work" className="border-b border-black/10">
        <StickyGallery />
      </section>

      {/* 🔥 SCROLL FLIP SHOWCASE */}
      <section id="scrollflip" className="border-b border-black/10">
        <ScrollFlipShowcase images={["/case/case-01.jpg", "/case/case-02.jpg", "/case/case-03.jpg"]} />
      </section>

      {/* ⭐ MOSAIC GRID */}
      <section id="mosaic" className="border-b border-black/10">
        <MosaicScroller
          title="Live Pieces & Loops"
          items={[
            { id: "v1", type: "video", src: "/grid-videos/grid-video-1.mp4", size: "lg" },
            { id: "v2", type: "video", src: "/grid-videos/grid-video-2.mp4", size: "sm" },
            { id: "v3", type: "video", src: "/grid-videos/grid-video-3.mp4", size: "md" },
            { id: "v4", type: "video", src: "/grid-videos/grid-video-4.mp4", size: "sm" },
            { id: "v5", type: "video", src: "/grid-videos/grid-video-5.mp4", size: "lg" },
            { id: "v6", type: "video", src: "/grid-videos/grid-video-6.mp4", size: "xl" },
            { id: "v7", type: "video", src: "/grid-videos/grid-video-7.mp4", size: "sm" },
            { id: "v8", type: "video", src: "/grid-videos/grid-video-8.mp4", size: "md" },
            { id: "v9", type: "video", src: "/grid-videos/grid-video-9.mp4", size: "lg" },
            { id: "v10", type: "video", src: "/grid-videos/grid-video-10.mp4", size: "sm" },
            { id: "v11", type: "video", src: "/grid-videos/grid-video-11.mp4", size: "md" },
            { id: "v12", type: "video", src: "/grid-videos/grid-video-12.mp4", size: "lg" },
            { id: "v13", type: "video", src: "/grid-videos/grid-video-13.mp4", size: "sm" },
            { id: "v14", type: "video", src: "/grid-videos/grid-video-14.mp4", size: "xl" },
            { id: "v15", type: "video", src: "/grid-videos/grid-video-15.mp4", size: "md" },
            { id: "v16", type: "video", src: "/grid-videos/grid-video-16.mp4", size: "sm" },
            { id: "v17", type: "video", src: "/grid-videos/grid-video-17.mp4", size: "lg" },
          ]}
        />
      </section>

      {/* DESIGN CAROUSEL */}
      <section id="designs" className="border-b border-black/10">
        <DesignCarousel
          images={[
            "/designs/design-1.jpg",
            "/designs/design-2.jpg",
            "/designs/design-3.jpg",
            "/designs/design-4.jpg",
            "/designs/design-5.jpg",
            "/designs/design-6.jpg",
            "/designs/design-7.jpg",
            "/designs/design-8.jpg",
            "/designs/design-9.jpg",
            "/designs/design-10.jpg",
          ]}
          title="Selected Designs"
          subtitle="10 shots, spinning in orbit"
        />
      </section>

      {/* PROJECTS LIST */}
      <section id="projects-list" className="border-b border-black/10">
        <ProjectsShowcase />
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="min-h-[70vh] grid place-items-center px-6 py-24">
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Ready to make it unmistakable?</h2>
          <p className="mt-4 text-neutral-800">
            Plug real case studies into the scroll sections, swap text blocks for product shots, Rive/Lottie, and live components.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={() => router.push("/contact")}>Start a Project</Button>
            <Button variant="outline" onClick={() => router.push("/work")}>View Work</Button>
          </div>
        </div>
      </section>

      {/* FLOATING MENU */}
      <BubbleMenu
        variant="fab"
        fabLabel="Industries I’ve worked in"
        items={INDUSTRY_ITEMS}
        useFixedPosition
        menuBg="#ffffff"
        menuContentColor="#111111"
        className="z-[2000]"
      />

      {/* ANCHORS */}
      <div id="industry-restaurants" />
      <div id="industry-photo" />
      <div id="industry-mindfulness" />
      <div id="industry-ai" />
      <div id="industry-supplements" />
      <div id="industry-bikes" />
      <div id="industry-language" />
      <div id="industry-ecom" />
      <div id="industry-media" />
      <div id="industry-creative" />
      <div id="industry-fashion" />
      <div id="industry-events" />
      <div id="industry-dance" />
      <div id="industry-wine" />
      <div id="industry-sportsapps" />
      <div id="industry-cityguides" />
      <div id="industry-games" />
      <div id="industry-pharma" />
    </main>
  );
}

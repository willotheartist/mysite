// app/serpentine/page.tsx
import React from "react";
import SerpentineSection from "@/components/sections/SerpentineSection";

export default function Page() {
  return (
    <main className="min-h-[200vh] bg-white text-black">
      <section className="h-[120vh] flex items-end justify-center">
        <p className="mb-24 max-w-prose text-balance text-xl md:text-2xl opacity-70 px-6">
          Scroll down to see the serpentine section. Letters enter from the right,
          zig-zag into place, then the line drifts left & up.
        </p>
      </section>

      <SerpentineSection
        eyebrow="Feature"
        subcopy="Reusable section component you can drop onto any page."
        text="LET'S BREAK THE ICE"
      />

      <section className="h-[160vh] flex items-start justify-center">
        <div className="mt-24 max-w-prose text-xl md:text-xxl opacity-80 px-6">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
            Continue the story…
          </h2>
          <p>Duplicate this section anywhere and tweak the props—no extra setup needed.</p>
        </div>
      </section>
    </main>
  );
}

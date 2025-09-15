// app/philosophy/page.tsx
import type { Metadata } from "next";
import StickyPhilosophy from "@/sections/StickyPhilosophy";

export const metadata: Metadata = {
  title: "Role Fit — Sticky Narrative",
  description:
    "A cinematic, scroll-driven role-fit narrative: clarity in complex systems, design that scales, collaboration across cultures, and shipping with confidence.",
};

export default function PhilosophyPage() {
  return (
    <main className="min-h-dvh bg-white text-black">
      <section className="mx-auto max-w-5xl px-6 py-24 lg:py-32">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Role Fit
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-lg text-neutral-600">
          Designing clarity into complex systems and stories. Over a decade across
          industries and cultures—building brands, products, and systems that turn
          complexity into confidence.
        </p>
      </section>

      <StickyPhilosophy />

      <section className="mx-auto max-w-5xl px-6 py-24 lg:py-32">
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-2xl border border-black/10 px-5 py-3 text-base font-medium hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          Let’s talk
          <span aria-hidden>→</span>
        </a>
      </section>
    </main>
  );
}

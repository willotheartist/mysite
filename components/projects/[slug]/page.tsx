// app/mysite/projects/[slug]/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type PageProps = { params: { slug: string } };

export default function DebugSlugPage({ params }: PageProps) {
  const router = useRouter();

  return (
    <main className="relative min-h-svh bg-neutral-950 text-white flex items-center justify-center p-8">
      {/* Floating close button */}
      <button
        onClick={() => router.back()}
        aria-label="Close project"
        title="Close"
        className="fixed right-4 top-4 z-[1000] flex h-16 w-16 items-center justify-center rounded-full bg-[#f1f1f1] text-black shadow-lg ring-1 ring-black/10 transition hover:scale-105 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 md:right-6 md:top-6"
      >
        <X className="h-7 w-7" />
      </button>

      <div className="max-w-xl w-full space-y-4">
        <h1 className="text-2xl font-semibold">Debug: Dynamic Route</h1>
        <p className="text-neutral-300">
          If you see this, the <code>[slug]</code> route is working.
        </p>
        <div className="rounded-xl border border-white/10 p-4">
          <div className="text-sm text-neutral-400">params.slug</div>
          <div className="mt-1 text-lg">{params.slug}</div>
        </div>
      </div>
    </main>
  );
}

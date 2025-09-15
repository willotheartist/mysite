// components/field/FlipCard.tsx
"use client";

import { useState } from "react";

export type FlipFace = { title: string; subtitle?: string; img?: string };
export type FlipCardProps = { front: FlipFace; back: FlipFace };

export default function FlipCard({ front, back }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const rotate = flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]";

  return (
    <div className="group [perspective:1200px]">
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-300"
        aria-label={`Flip card for ${front.title}`}
      >
        <div
          className={`absolute inset-0 [transform-style:preserve-3d] transition-transform duration-500 ${rotate}`}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center gap-3 bg-neutral-100">
            <div className="size-24 rounded-full bg-neutral-300 overflow-hidden">
              {front.img ? (
                <img src={front.img} alt="" className="w-full h-full object-cover" />
              ) : null}
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">{front.title}</h3>
            {front.subtitle && (
              <p className="text-sm text-neutral-600 text-center max-w-[20ch]">{front.subtitle}</p>
            )}
          </div>
          {/* Back */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center gap-3 bg-neutral-900 text-neutral-50">
            <div className="size-24 rounded-full bg-neutral-700 overflow-hidden">
              {back.img ? (
                <img src={back.img} alt="" className="w-full h-full object-cover" />
              ) : null}
            </div>
            <h3 className="text-xl font-semibold">{back.title}</h3>
            {back.subtitle && (
              <p className="text-sm/5 text-center max-w-[22ch] opacity-80">{back.subtitle}</p>
            )}
          </div>
        </div>
      </button>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-neutral-500">Tap card to flip</span>
        <label className="inline-flex items-center gap-2 text-xs select-none">
          <input
            type="checkbox"
            checked={flipped}
            onChange={(e) => setFlipped(e.target.checked)}
            aria-label={`Toggle ${front.title}`}
          />
          <span>Toggle</span>
        </label>
      </div>
    </div>
  );
}

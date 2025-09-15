// components/sections/CaseTeaserCard.tsx
"use client";

import * as React from "react";
import Image from "next/image";

type Props = {
  logo: string;
  imageSrc: string;
  keywords: readonly string[];
  className?: string;
};

export default function CaseTeaserCard({ logo, imageSrc, keywords, className }: Props) {
  return (
    <article className={["group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6", className].join(" ")}>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm" aria-label={`${logo} preview`}>
        <Image
          src={imageSrc || "/case-studies/project-1/asset-1.jpg"}
          alt={`${logo} preview`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 720px, 90vw"
          priority={false}
        />
      </div>
      <header className="mt-5">
        <h3 className="text-xl font-semibold">{logo}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {keywords.map((k, i) => (
            <li key={i} className="rounded-full border border-black/10 px-3 py-1 text-sm text-neutral-700">
              {k}
            </li>
          ))}
        </ul>
      </header>
    </article>
  );
}

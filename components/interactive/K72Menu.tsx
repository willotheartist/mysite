"use client";

import React from "react";
import Link from "next/link";

type MenuItemData = {
  label: string;
  href: string;   // route or hash
  images: string[];
  words: string[];
};

export default function K72Menu({
  items = DEFAULT_ITEMS,
  onNavigate,
}: {
  items?: MenuItemData[];
  onNavigate?: () => void; // call to close dropdown when clicked
}) {
  return (
    <nav
      className="k72-menu select-none border-y border-black/10 bg-[#F1F1F1]"
      aria-label="Marquee menu"
      role="menu"
    >
      {items.map((it, idx) => (
        <div
          key={idx}
          className="k72-item group relative overflow-hidden text-center shadow-[inset_0_-1px_rgba(0,0,0,0.08)]"
          role="none"
        >
          {/* Link row */}
          <Link
            href={it.href}
            className="k72-link block cursor-pointer px-[1vw] py-[2.2vh] text-[6vw] leading-[1.2] font-semibold uppercase tracking-[-0.02em] outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            data-cursor="magnet"
            role="menuitem"
            onClick={onNavigate}
          >
            {it.label}
          </Link>

          {/* Marquee layer — pure CSS reveal */}
          <div
            className={[
              "k72-marquee pointer-events-none absolute inset-0",
              "translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0",
              "transition-transform duration-400 ease-out",
              "bg-black text-white",
            ].join(" ")}
            aria-hidden="true"
          >
            <div className="k72-inner-wrap h-full w-full">
              <div className="k72-inner k72-marquee-flow flex h-full w-max items-center">
                {/* duplicate content for seamless loop */}
                <MarqueeContent images={it.images} words={it.words} />
                <MarqueeContent images={it.images} words={it.words} />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Styles: marquee loop + sizing */}
      <style jsx global>{`
        @keyframes k72-marquee {
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .k72-marquee-flow {
          animation: k72-marquee 15s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .k72-marquee-flow { animation: none; }
          .k72-marquee { transition: none !important; }
        }
        .k72-chip {
          white-space: nowrap;
          text-transform: uppercase;
          padding: 1vh 1vw 0;
          font-weight: 500;
          line-height: 1.2;
          font-size: 6vw;
        }
        .k72-img {
          width: 15vw;
          height: 70%;
          margin: 0 2vw;
          border-radius: 5vw;
          background-size: cover;
          background-position: 50% 50%;
        }
        @media (min-width: 1024px) {
          .k72-link { font-size: 56px; }
          .k72-chip { font-size: 56px; }
          .k72-img { width: 220px; border-radius: 54px; }
        }
      `}</style>
    </nav>
  );
}

function MarqueeContent({ images, words }: { images: string[]; words: string[] }) {
  const sequence: React.ReactNode[] = [];
  const max = Math.max(words.length, images.length);
  for (let i = 0; i < max; i++) {
    if (words[i]) sequence.push(<span key={`w-${i}`} className="k72-chip">{words[i]}</span>);
    if (images[i]) sequence.push(<div key={`i-${i}`} className="k72-img" style={{ backgroundImage: `url(${images[i]})` }} />);
  }
  return <>{sequence}</>;
}

/* Demo content (swap for real routes/assets) */
const DEFAULT_ITEMS: MenuItemData[] = [
  {
    label: "Work",
    href: "#work",
    words: ["E-Com", "Microsite", "Onboarding", "3D"],
    images: ["/k72/1.jpg", "/k72/2.jpg", "/k72/3.jpg", "/k72/4.jpg"],
  },
  {
    label: "About",
    href: "#about",
    words: ["Design", "Motion", "Code", "Systems"],
    images: ["/k72/2.jpg", "/k72/3.jpg", "/k72/4.jpg", "/k72/1.jpg"],
  },
  {
    label: "Contact",
    href: "#contact",
    words: ["Say Hi", "Collaborate", "Projects", "Open Roles"],
    images: ["/k72/3.jpg", "/k72/4.jpg", "/k72/1.jpg", "/k72/2.jpg"],
  },
];

// components/skills/SkillCard.tsx
"use client";

import { motion } from "framer-motion";
import { Skill } from "@/data/skills";

type Props = {
  skill: Skill;
  onClick: () => void;
  dense?: boolean; // kept for API compatibility
};

export default function SkillCard({ skill, onClick, dense }: Props) {
  return (
    <motion.button
      layout
      layoutId={`card-${skill.id}`}
      onClick={onClick}
      className={[
        // Fill the parent square cell exactly
        "group relative isolate flex size-full cursor-pointer select-none items-center justify-center overflow-hidden bg-white",
        // Strong, boxy outline (replace previous conditional hairline)
        "border-[1px] border-black",
        // Accessibility
        "outline-none ring-0 focus-visible:ring-2 focus-visible:ring-black/80",
      ].join(" ")}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-label={`${skill.title} details`}
    >
      {/* Abstract object / media */}
      <motion.div
        layoutId={`media-${skill.id}`}
        className="relative"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      >
        <SkillGlyph type={skill.media.type} hue={skill.media.hue} />
      </motion.div>

      {/* Caption bottom-right */}
      <div className="pointer-events-none absolute bottom-3 right-3">
        <span className="rounded border border-black/80 bg-white/90 px-2 py-1 text-xs font-bold uppercase tracking-wide">
          {skill.title}
        </span>
      </div>
      {/* Crosshair grid lines removed for a cleaner center */}
    </motion.button>
  );
}

function SkillGlyph({ type, hue = 0 }: { type: Skill["media"]["type"]; hue?: number }) {
  const common = "drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]";
  if (type === "blob") {
    return (
      <svg
        width="280"
        height="200"
        viewBox="0 0 280 200"
        className={common}
        role="img"
        aria-label="abstract blob"
      >
        <defs>
          <linearGradient id={`g-${hue}`} x1="0" x2="1">
            <stop offset="0%" stopColor={`hsl(${hue} 90% 60%)`} />
            <stop offset="100%" stopColor={`hsl(${hue} 80% 45%)`} />
          </linearGradient>
        </defs>
        <path
          d="M30 110c0-50 60-90 120-80s100 70 60 110-140 20-180-30z"
          fill={`url(#g-${hue})`}
        />
      </svg>
    );
  }
  if (type === "pill") {
    return (
      <svg width="260" height="160" viewBox="0 0 260 160" className={common} role="img" aria-label="abstract pill">
        <rect
          x="10"
          y="30"
          rx="80"
          ry="80"
          width="240"
          height="100"
          fill={`hsl(${hue} 85% 55%)`}
        />
      </svg>
    );
  }
  // cube
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className={common} role="img" aria-label="abstract cube">
      <rect x="30" y="30" width="160" height="160" fill={`hsl(${hue} 80% 50%)`} />
      <rect x="30" y="30" width="160" height="160" fill="none" stroke="black" strokeOpacity="0.2" />
    </svg>
  );
}

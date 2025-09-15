// app/(site)/skills/components/SkillsFilterBar.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import type { SkillCategory as LegacySkillCategory } from "@/data/skills";

/** Union accepted by the bar */
export type SkillCategory = LegacySkillCategory | "All";

/** Props */
type Props = {
  categories: SkillCategory[];
  active: SkillCategory[];
  onToggleCategory: (c: SkillCategory) => void;
  dense: boolean; // unused visually
  onToggleDensity: () => void; // unused visually
};

/** Label mapping: rename chips here */
function label(c: SkillCategory): string {
  const map: Record<string, string> = {
    All: "All",
    ui: "UI & Graphic Design",
    system: "Digital Design",
    frontend: "Frontend",
    motion: "Motion",
    devops: "Dev",
  };
  return map[c] ?? c;
}

export default function SkillsFilterBar({
  categories,
  active,
  onToggleCategory,
}: Props) {
  return (
    <div className="w-full border-b border-black/10 py-3">
      <div
        className="flex items-center justify-between gap-4"
        role="toolbar"
        aria-label="Skills filters"
      >
        {/* Chips */}
        <div className="relative -mx-1 flex min-w-0 items-center md:flex-wrap">
          <div className="flex w-full gap-2 overflow-x-auto px-1 md:flex-wrap md:overflow-visible">
            {categories.map((c) => {
              const isActive = active.includes(c);
              const text = label(c);

              return (
                <button
                  key={c}
                  onClick={() => onToggleCategory(c)}
                  className={[
                    "group relative shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium",
                    "border-black/15 transition-colors",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-black/80 focus-visible:-outline-offset-2",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  <span className="opacity-80 group-aria-pressed:opacity-100">{text}</span>

                  {isActive && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 -z-10 rounded-full border border-black/80"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

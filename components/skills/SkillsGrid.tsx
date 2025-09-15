// components/skills/SkillsGrid.tsx
"use client";

import React from "react";
import * as FM from "framer-motion";
import { Skill } from "@/data/skills";
import SkillCard from "./SkillCard";

type Props = {
  items: Skill[];
  dense: boolean; // kept for API compatibility
  onSelect: (s: Skill) => void;
};

// Keep motion as-is
const { motion } = FM;

// Typed shim to satisfy React/TS JSX expectations with React 19 + RSC typings.
// Upstream types can report Element|null instead of ReactNode; we coerce via FC.
type APProps = React.PropsWithChildren<FM.AnimatePresenceProps>;
const AnimatePresence: React.FC<APProps> = (props) => {
  return <FM.AnimatePresence {...props} />;
};

export default function SkillsGrid({ items, dense, onSelect }: Props) {
  return (
    // No extra spacing around the grid
    <section className="m-0 p-0">
      <div
        className={[
          "w-full grid",
          // Square-friendly responsive columns
          "[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]",
          "md:[grid-template-columns:repeat(auto-fit,minmax(380px,1fr))]",
          // No gaps so lines align
          "gap-0",
          // Removed hairline frame so bold card borders define structure
          "items-stretch",
        ].join(" ")}
      >
        <AnimatePresence mode="popLayout">
          {items.map((s) => (
            <motion.div
              key={s.id}
              layout
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.18 }}
              // Perfectly square cells; no inner borders
              className="aspect-square"
            >
              {/* Content fills the square cell; SkillCard receives the required onClick */}
              <div className="size-full">
                <SkillCard
                  skill={s}
                  dense={dense}
                  onClick={() => onSelect(s)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

// app/skills2/MySkillsV2.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { skillBlocks } from "@/data/my-skills-v2";

/** Map label length → proportional column span (Bloomberg-like wide words) */
function spanForWord(label: string) {
  const length = label.replace(/\s+/g, "").length;
  const spaces = (label.match(/\s/g) || []).length;
  const longWordBonus = label
    .split(/\s+/)
    .reduce((a, w) => (w.length >= 9 ? a + 2 : a), 0);

  const score = length + spaces * 2 + longWordBonus;

  // Bias wider so two-word phrases feel like a full “row chunk”
  let col = 3; // minimum width unit
  if (score <= 8) col = 3; // short
  else if (score <= 16) col = 4; // medium
  else if (score <= 24) col = 5; // long
  else col = 6; // very long

  return { col, row: 1 } as const; // words are one unit tall
}

/** Track current grid columns so we can simulate packing and avoid side-by-side images */
function useGridColumns() {
  const [cols, setCols] = useState<number>(12);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 480) setCols(2);
      else if (w <= 768) setCols(4);
      else if (w <= 1024) setCols(6);
      else if (w <= 1280) setCols(10);
      else setCols(12);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return cols;
}

/**
 * Arrange tiles so that image blocks never sit side-by-side in the same row.
 * We simulate row fill using the current column count and span rules.
 * Images: fixed span = 2×1 (same height as a word row; small anchors).
 */
function useArrangedBlocks() {
  const cols = useGridColumns();

  return useMemo(() => {
    type Item = {
      key: string;
      type: "word" | "image";
      colSpan: number;
      rowSpan: number;
      label?: string;
      src?: string;
      alt?: string;
    };

    // Prepare items with spans
    const prepared: Item[] = skillBlocks.map((b) =>
      b.type === "word"
        ? {
            key: b.id,
            type: "word",
            colSpan: spanForWord(b.label).col,
            rowSpan: 1,
            label: b.label,
          }
        : {
            key: b.id,
            type: "image",
            colSpan: 2,
            rowSpan: 1,
            src: b.src,
            alt: b.alt,
          }
    );

    // Simulate packing; prevent two images adjacent within a row
    const arranged: Item[] = [];
    const queue = [...prepared];
    let colCursor = 0; // how many columns are used in the current row
    let lastTypeInRow: "word" | "image" | null = null;

    while (queue.length) {
      const item = queue.shift()!;
      const span = item.colSpan;

      // Wrap to next row if not enough room
      if (colCursor + span > cols) {
        colCursor = 0;
        lastTypeInRow = null;
      }

      // If previous placed in this row is image and current is image → try to place a word first
      if (item.type === "image" && lastTypeInRow === "image") {
        const remaining = cols - colCursor;
        const swapIndex = queue.findIndex(
          (q) => q.type === "word" && q.colSpan <= remaining
        );
        if (swapIndex !== -1) {
          const [word] = queue.splice(swapIndex, 1);
          arranged.push(word);
          colCursor += word.colSpan;
          lastTypeInRow = "word";
          // re-queue the image to try again on this row after the word
          queue.unshift(item);
          continue;
        }
        // No word fits; move image to next row
        colCursor = 0;
        lastTypeInRow = null;
      }

      arranged.push(item);
      colCursor += span;
      lastTypeInRow = item.type;

      // If row exactly filled, reset markers
      if (colCursor >= cols) {
        colCursor = 0;
        lastTypeInRow = null;
      }
    }

    return arranged;
  }, [cols]);
}

function tileBase(extra?: string) {
  return [
    "border border-neutral-200",
    "bg-[#f1f1f1] text-black",
    "transition-colors duration-200 ease-in-out",
    "motion-safe:hover:scale-[1.02] motion-safe:hover:-translate-y-px",
    "hover:bg-black hover:text-[#f1f1f1]",
    extra || "",
  ].join(" ");
}

export default function MySkillsV2() {
  const items = useArrangedBlocks();

  return (
    <section id="skills2" aria-labelledby="skills2-heading" className="w-full">
      <h2 id="skills2-heading" className="sr-only">
        My Skills V2
      </h2>

      <div className="bb-grid-wrapper px-3 py-8 md:px-6 md:py-12">
        <div className="bb-grid">
          {items.map((it) => {
            if (it.type === "word") {
              return (
                <motion.div
                  key={it.key}
                  className={tileBase(
                    // Bigger type, regular weight, tight leading — closer to the cover
                    "flex items-center justify-center text-center font-normal"
                  )}
                  style={{
                    gridColumn: `span ${it.colSpan}`,
                    gridRow: `span ${it.rowSpan}`,
                  }}
                >
                  <span className="whitespace-nowrap leading-none text-4xl md:text-6xl lg:text-7xl">
                    {it.label}
                  </span>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={it.key}
                className={tileBase("relative")}
                style={{
                  gridColumn: `span ${it.colSpan}`,
                  gridRow: `span ${it.rowSpan}`,
                }}
              >
                <Image
                  src={it.src!}
                  alt={it.alt!}
                  fill
                  className="object-cover" // full-bleed image
                  sizes="(max-width: 480px) 50vw, (max-width: 1024px) 25vw, 16vw"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Square-unit, zero-gap, dense magazine grid */}
      <style jsx global>{`
        .bb-grid {
          --tile: clamp(96px, 9vw, 150px); /* larger unit → bigger words */
          display: grid;
          gap: 0; /* no spacing between blocks */
          grid-auto-flow: dense;
          grid-template-columns: repeat(12, var(--tile));
          grid-auto-rows: var(--tile);
          justify-content: center;
        }
        @media (max-width: 1280px) {
          .bb-grid {
            grid-template-columns: repeat(10, var(--tile));
          }
        }
        @media (max-width: 1024px) {
          .bb-grid {
            grid-template-columns: repeat(6, var(--tile));
          }
        }
        @media (max-width: 768px) {
          .bb-grid {
            grid-template-columns: repeat(4, var(--tile));
          }
        }
        @media (max-width: 480px) {
          .bb-grid {
            grid-template-columns: repeat(2, var(--tile));
          }
        }
      `}</style>
    </section>
  );
}

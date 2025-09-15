// components/work/WorkRow.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as React from "react";
import type { WorkItem } from "@/data/work.data";
import { useImagePrefetch } from "@/lib/useImagePrefetch";

type Props = {
  item: WorkItem;
  active: boolean;
  onHover: (item: WorkItem | null, evt: React.MouseEvent | React.FocusEvent) => void;
  isCoarse: boolean;
};

export default function WorkRow({ item, active, onHover, isCoarse }: Props) {
  useImagePrefetch(item.cover?.src);
  const tapRef = React.useRef<number>(0);

  return (
    <li className="group/row">
      {/* Full-row link; padding creates the left/right margin rhythm while the row stays full-bleed */}
      <Link
        href={`/mysite/projects/${item.slug}`}
        className="block w-full focus:outline-none"
        onMouseEnter={(e) => onHover(item, e)}
        onFocus={(e) => onHover(item, e)}
        onMouseLeave={(e) => onHover(null, e)}
        onBlur={(e) => onHover(null, e)}
        onClick={(e) => {
          if (!isCoarse) return;
          if (tapRef.current === 0) {
            e.preventDefault();
            tapRef.current = window.setTimeout(() => (tapRef.current = 0), 1200) as unknown as number;
          } else {
            window.clearTimeout(tapRef.current);
            tapRef.current = 0;
          }
        }}
      >
        <motion.div
          initial={false}
          animate={{ backgroundColor: active ? "rgba(251, 255, 123, 1)" : "rgba(0,0,0,0)" }}
          transition={{ duration: 0.22 }}
          className="px-2 sm:px-6 lg:px-10"
        >
          {/* Content uses justify-between so title hugs the left, tags hug the far right */}
          <div className="flex items-baseline justify-between gap-6 py-7 lg:py-9">
            <div className="min-w-0 flex-1">
              <motion.h3
                initial={false}
                animate={{ x: active ? 4 : 0 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="text-[1.75rem] leading-tight lg:text-[2.25rem] font-medium tracking-tight"
              >
                {item.title}
              </motion.h3>
              {item.client ? (
                <p className="mt-2 text-[0.7rem] lg:text-xs uppercase tracking-[0.18em] text-black/60">
                  {item.client}
                </p>
              ) : null}
            </div>

            {/* Right-aligned tags, far edge */}
            <div className="flex shrink-0 items-center gap-2">
              {item.roles.slice(0, 3).map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-black/40 px-3 py-1 text-[0.65rem] lg:text-[0.7rem] uppercase tracking-wide opacity-90
                             transition-colors transition-transform
                             group-hover/row:bg-black group-hover/row:text-white hover:bg-black hover:text-white
                             translate-x-0 group-hover/row:translate-x-0.5"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </li>
  );
}

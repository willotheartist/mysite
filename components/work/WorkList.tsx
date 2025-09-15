// components/work/WorkList.tsx
"use client";

import * as React from "react";
import type { WorkItem } from "@/data/work.data";
import WorkRow from "@/components/work/WorkRow";
import CursorPreview from "@/components/work/CursorPreview";

export default function WorkList({ items }: { items: WorkItem[] }) {
  const [active, setActive] = React.useState<WorkItem | null>(null);
  const [show, setShow] = React.useState(false);
  const [mouse, setMouse] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const coarse = React.useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)").matches : false),
    []
  );

  React.useEffect(() => {
    const onScroll = () => setShow(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (!active) return;
    // No offset — we want the preview centered on the cursor
    setMouse({ x: e.clientX, y: e.clientY });
  };

  const clear = () => {
    setShow(false);
    setActive(null);
  };

  return (
    <>
      {/* Edge gutters as un-hover zones (desktop only) */}
      <div className="fixed inset-y-0 left-0 hidden w-[12vw] lg:block" onMouseEnter={clear} aria-hidden />
      <div className="fixed inset-y-0 right-0 hidden w-[12vw] lg:block" onMouseEnter={clear} aria-hidden />

      {/* Floating preview (cursor on desktop, modal on touch) */}
      <CursorPreview cover={active?.cover} show={show} variant={coarse ? "modal" : "cursor"} mouse={mouse} />

      <ul
        className="relative w-full divide-y divide-black/10"
        onMouseMove={handleMove}
        onMouseLeave={clear}
      >
        {items.map((item) => (
          <WorkRow
            key={item.slug}
            item={item}
            active={active?.slug === item.slug}
            isCoarse={coarse}
            onHover={(it, evt) => {
              if (it) {
                setActive(it);
                setShow(true);
                if ("clientX" in evt) {
                  const e = evt as React.MouseEvent;
                  setMouse({ x: e.clientX, y: e.clientY });
                }
              } else {
                clear();
              }
            }}
          />
        ))}
      </ul>
    </>
  );
}

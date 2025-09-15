"use client";

import { useEffect, useState, type RefObject } from "react";

/** Returns live offsetHeight for a ref'd element (ResizeObserver + window resize). */
export function useElementHeight<T extends HTMLElement>(ref: RefObject<T | null>): number {
  const [h, setH] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setH(el.offsetHeight);

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return h;
}

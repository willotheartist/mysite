// lib/useImagePrefetch.ts
"use client";

import { useEffect, useRef } from "react";

export function useImagePrefetch(src?: string) {
  const cache = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!src || cache.current.has(src)) return;
    const img = new Image();
    img.src = src;
    cache.current.add(src);
  }, [src]);
}

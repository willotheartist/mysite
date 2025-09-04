// app/components/NoHeader.tsx
"use client";

import { useEffect } from "react";

export default function NoHeader() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("no-header");
    return () => root.classList.remove("no-header");
  }, []);
  return null;
}

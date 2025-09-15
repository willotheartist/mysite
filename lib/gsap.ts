"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Returns gsap + ScrollTrigger, registering the plugin once on the client.
 */
export const getGSAP = () => {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
};

// Also allow direct named imports if you prefer.
export { gsap, ScrollTrigger };

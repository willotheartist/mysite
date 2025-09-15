// app/my-life/page.tsx
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const STAGE_W = 1200;
const STAGE_H = 800;

export default function MyLifePage() {
  const scopeRef = useRef<HTMLDivElement | null>(null);
  const svgWrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  // Scale the entire stage to viewport width (keeps GSAP pixel math)
  useLayoutEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const newScale = vw / STAGE_W;
      setScale(newScale);
      // keep ScrollTrigger measurements in sync with layout changes
      ScrollTrigger.refresh();
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // GSAP timeline (unchanged)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scrollDist",
          start: "0 0",
          end: "100% 100%",
          scrub: 1,
        },
      });

      tl.fromTo(".sky", { y: 0 }, { y: -200 }, 0)
        .fromTo(".cloud1", { y: 100 }, { y: -800 }, 0)
        .fromTo(".cloud2", { y: -150 }, { y: -500 }, 0)
        .fromTo(".cloud3", { y: -50 }, { y: -650 }, 0)
        .fromTo(".mountBg", { y: -10 }, { y: -100 }, 0)
        .fromTo(".mountMg", { y: -30 }, { y: -250 }, 0)
        .fromTo(".mountFg", { y: -50 }, { y: -600 }, 0);

      const arrowBtn = document.querySelector<SVGRectElement>("#arrow-btn");
      const arrowEl = document.querySelector<SVGPolylineElement>(".arrow");
      if (arrowBtn && arrowEl) {
        const enter = () =>
          gsap.to(arrowEl, { y: 10, duration: 0.8, ease: "back.inOut(3)", overwrite: "auto" });
        const leave = () =>
          gsap.to(arrowEl, { y: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        const click = () =>
          gsap.to(window, { scrollTo: window.innerHeight, duration: 1.5, ease: "power1.inOut" });

        arrowBtn.addEventListener("mouseenter", enter);
        arrowBtn.addEventListener("mouseleave", leave);
        arrowBtn.addEventListener("click", click);

        return () => {
          arrowBtn.removeEventListener("mouseenter", enter);
          arrowBtn.removeEventListener("mouseleave", leave);
          arrowBtn.removeEventListener("click", click);
        };
      }
    }, scopeRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div ref={scopeRef} className="relative min-h-[200vh] bg-[#111b29]">
      {/* scroll distance driver like the Pen */}
      <div className="scrollDist h-[200vh] w-full" />

      {/* Full-bleed fixed layer; we'll scale the stage inside it */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Center the 1200×800 stage and scale it to viewport width */}
        <div
          ref={svgWrapRef}
          className="absolute left-1/2 top-1/2"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <svg
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
            width={STAGE_W}
            height={STAGE_H}
            aria-label="Parallax scene"
          >
            <mask id="m">
              <g className="cloud1">
                <rect fill="#fff" width="100%" height="801" y="799" />
                <image href="/my-life/cloud1Mask.jpg" width="1200" height="800" />
              </g>
            </mask>

            {/* Local assets — fixed pixel sizing (no %) */}
            <image className="sky"     href="/my-life/sky.jpg"     width="1200" height="590" />
            <image className="mountBg" href="/my-life/mountBg.png" width="1200" height="800" />
            <image className="mountMg" href="/my-life/mountMg.png" width="1200" height="800" />
            <image className="cloud2"  href="/my-life/cloud2.png"  width="1200" height="800" />
            <image className="mountFg" href="/my-life/mountFg.png" width="1200" height="800" />
            <image className="cloud1"  href="/my-life/cloud1.png"  width="1200" height="800" />
            <image className="cloud3"  href="/my-life/cloud3.png"  width="1200" height="800" />

            <text fill="#fff" x="350" y="200" style={{ fontWeight: 900, fontSize: 99 }}>
              0
            </text>
            <polyline
              className="arrow"
              fill="#fff"
              points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250"
            />

            <g mask="url(#m)">
              <rect fill="#fff" width="100%" height="100%" />
              <text x="350" y="200" fill="#162a43" style={{ fontWeight: 900, fontSize: 99 }}>
                0000000
              </text>
            </g>

            <rect id="arrow-btn" width="100" height="100" opacity="0" x="550" y="220" style={{ cursor: "pointer" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

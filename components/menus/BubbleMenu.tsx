"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { gsap } from "gsap";

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: { bgColor?: string; textColor?: string };
};

const DEFAULT_INDUSTRY_ITEMS: MenuItem[] = [
  { label: "fintech", href: "#", rotation: -8, hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" } },
  { label: "e-commerce", href: "#", rotation: 8, hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" } },
  { label: "healthcare", href: "#", rotation: 8, hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" } },
  { label: "saas", href: "#", rotation: -8, hoverStyles: { bgColor: "#f59e0b", textColor: "#111111" } },
  { label: "edtech", href: "#", rotation: 8, hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" } },
  { label: "gaming", href: "#", rotation: -8, hoverStyles: { bgColor: "#06b6d4", textColor: "#111111" } },
  { label: "media", href: "#", rotation: 8, hoverStyles: { bgColor: "#f97316", textColor: "#111111" } },
  { label: "travel", href: "#", rotation: -8, hoverStyles: { bgColor: "#22c55e", textColor: "#111111" } },
];

type BubbleMenuProps = {
  variant?: "header" | "fab";
  logo?: string | React.ReactNode;
  fabLabel?: string;
  onMenuClick?: (isOpen: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

export default function BubbleMenu({
  variant = "header",
  logo,
  fabLabel = "Industries I've worked in",
  onMenuClick,
  className,
  style,
  menuAriaLabel = "Toggle industries menu",
  menuBg = "#ffffff",
  menuContentColor = "#000000",
  useFixedPosition = false,
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [mounted, setMounted] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLUListElement | null>(null);
  const bubblesRef = useRef<HTMLElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  const menuItems: MenuItem[] = items?.length ? items : DEFAULT_INDUSTRY_ITEMS;
  const isFab = variant === "fab";
  const isHeader = variant === "header";

  useEffect(() => setMounted(true), []);

  const openMenu = () => {
    setShowOverlay(true);
    setIsMenuOpen(true);
    onMenuClick?.(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    onMenuClick?.(false);
  };
  const toggleMenu = () => (isMenuOpen ? closeMenu() : openMenu());

  // Animations
  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase });
        if (labels[i]) {
          tl.to(
            labels[i],
            { y: 0, autoAlpha: 1, duration: animationDuration, ease: "power3.out" },
            "-=" + animationDuration * 0.9
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: "power3.in" });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          if (!overlayRef.current) return;
          gsap.set(overlayRef.current, { display: "none" });
          setShowOverlay(false);
          document.documentElement.style.overflow = "";
        },
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  // Rotate pills on desktop only
  useEffect(() => {
    const applyRotation = () => {
      if (!isMenuOpen || typeof window === "undefined") return;
      const bubbles = bubblesRef.current.filter(Boolean);
      const isDesktop = window.innerWidth >= 900;
      bubbles.forEach((bubble, i) => {
        const item = menuItems[i];
        if (bubble && item) {
          const rotation = isDesktop ? item.rotation ?? 0 : 0;
          gsap.set(bubble, { rotation });
        }
      });
    };
    applyRotation();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", applyRotation);
      return () => window.removeEventListener("resize", applyRotation);
    }
  }, [isMenuOpen, menuItems]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && isMenuOpen && closeMenu();
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* CSS for hover/interaction */}
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link { transform: rotate(var(--item-rot)); }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active { transform: rotate(var(--item-rot)) scale(.94); }
        }
        @media (max-width: 899px) {
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.04);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active { transform: scale(.96); }
        }
        @media (max-height: 640px) {
          .bubble-grid { row-gap: 8px !important; }
          .bubble-menu-items .pill-link { min-height: 56px !important; }
        }
      `}</style>

      {/* Trigger inside header (or FAB) */}
      <nav
        className={[
          "bubble-menu",
          isFab || useFixedPosition ? "fixed" : isHeader ? "relative" : "absolute",
          isFab ? "bottom-6 right-6" : isHeader ? "inset-auto" : "left-0 right-0 top-8",
          "flex items-center",
          isFab ? "justify-end" : "justify-between",
          "gap-3 md:gap-4",
          isHeader ? "w-full px-0" : "px-4 md:px-8",
          "pointer-events-none",
          "z-[1001]",
          className,
        ].join(" ")}
        style={style}
        aria-label="Industries menu"
      >
        {/* optional header logo bubble (hidden by parent if undesired) */}
        {!isFab && logo && (
          <div
            className="bubble logo-bubble inline-flex items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] pointer-events-auto h-12 md:h-14 px-4 md:px-8 gap-2 will-change-transform"
            style={{ background: menuBg, minHeight: "48px", borderRadius: "9999px" }}
          >
            <span className="logo-content inline-flex items-center justify-center w-[120px] h-full">
              {typeof logo === "string" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt="Logo" className="bubble-logo max-h-[60%] max-w-full object-contain block" />
              ) : (
                logo
              )}
            </span>
          </div>
        )}

        {/* Toggle button */}
        <button
          type="button"
          className={[
            "bubble toggle-bubble menu-btn",
            isMenuOpen ? "open" : "",
            "inline-flex items-center",
            "rounded-full bg-white",
            "shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
            "pointer-events-auto",
            isFab ? "gap-3 pl-4 pr-3 py-2" : "flex-col w-12 h-12 md:w-14 md:h-14 p-0",
            "border-0 cursor-pointer will-change-transform",
          ].join(" ")}
          onClick={toggleMenu}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg }}
        >
          {isFab && <span className="text-sm md:text-base">{fabLabel}</span>}
          <span
            className="menu-line block mx-auto rounded-[2px]"
            style={{
              width: 26,
              height: 2,
              background: menuContentColor,
              transform: isMenuOpen ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          {!isFab ? (
            <span
              className="menu-line short block mx-auto rounded-[2px]"
              style={{
                marginTop: "6px",
                width: 26,
                height: 2,
                background: menuContentColor,
                transform: isMenuOpen ? "translateY(-4px) rotate(-45deg)" : "none",
              }}
            />
          ) : (
            <span
              className="menu-line short block rounded-[2px]"
              style={{
                marginLeft: 8,
                width: 18,
                height: 2,
                background: menuContentColor,
                transform: isMenuOpen ? "translateY(-2px) rotate(-45deg)" : "translateY(2px) rotate(45deg)",
                transition: "transform .3s ease",
              }}
            />
          )}
        </button>
      </nav>

      {/* Fullscreen overlay via portal */}
      {mounted && showOverlay &&
        createPortal(
          <div
            ref={overlayRef}
            className={[
              "bubble-menu-items",
              "fixed inset-0 z-[9999]",
              "overflow-y-auto overscroll-contain",
              "pt-[max(env(safe-area-inset-top),24px)]",
              "pb-[max(env(safe-area-inset-bottom),24px)]",
              "px-4 sm:px-6",
            ].join(" ")}
            aria-hidden={!isMenuOpen}
            role="dialog"
            aria-modal="true"
          >
            {/* backdrop (click to close) */}
            <div
              className="bubble-backdrop absolute inset-0 bg-black/30"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* close button (top-right) */}
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="fixed right-4 top-4 md:right-6 md:top-6 z-[10000] rounded-full bg-white/90 backdrop-blur px-3 py-2 text-sm shadow"
            >
              ✕
            </button>

            {/* Grid wrapper */}
            <ul
              ref={gridRef}
              className={[
                "relative mx-auto w-full max-w-[1600px]",
                "grid bubble-grid",
                "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                "gap-2 sm:gap-3 md:gap-4",
              ].join(" ")}
              role="menu"
              aria-label="Industries"
            >
              {menuItems.map((item, idx) => {
                const isInternal = item.href.startsWith("/") || item.href.startsWith("/#") || item.href.startsWith("#");
                const Pill = isInternal ? Link : ("a" as any);
                const pillProps = isInternal
                  ? { href: item.href, scroll: false }
                  : { href: item.href, target: "_blank", rel: "noreferrer" };

                return (
                  <li key={`${item.label}-${idx}`} role="none" className="flex">
                    <Pill
                      {...pillProps}
                      aria-label={item.ariaLabel || item.label}
                      className={[
                        "pill-link",
                        "w-full rounded-[999px] no-underline text-inherit",
                        "bg-white shadow-[0_4px_14px_rgba(0,0,0,0.10)]",
                        "flex items-center justify-center relative",
                        "transition-[background,color,transform] duration-300 ease-in-out",
                        "box-border whitespace-nowrap overflow-hidden",
                        "px-4",
                      ].join(" ")}
                      style={{
                        ["--item-rot" as any]: `${item.rotation ?? 0}deg`,
                        ["--pill-bg" as any]: menuBg,
                        ["--pill-color" as any]: menuContentColor,
                        ["--hover-bg" as any]: item.hoverStyles?.bgColor || "#f3f4f6",
                        ["--hover-color" as any]: item.hoverStyles?.textColor || menuContentColor,
                        background: "var(--pill-bg)",
                        color: "var(--pill-color)",
                        minHeight: "clamp(56px, 12vh, 160px)",
                        paddingBlock: "clamp(0.75rem, 2vh, 2.5rem)",
                        fontSize: "clamp(1rem, 2.6vw, 2.25rem)",
                        fontWeight: 500,
                        lineHeight: 1.1,
                        willChange: "transform",
                      }}
                      onClick={() => closeMenu()}
                      role="menuitem"
                    >
                      <span
                        className="pill-label inline-block"
                        style={{ willChange: "transform, opacity", height: "1.2em", lineHeight: 1.2 }}
                        ref={(el: HTMLSpanElement | null) => {
                          if (el) labelRefs.current[idx] = el;
                        }}
                      >
                        {item.label}
                      </span>
                    </Pill>
                  </li>
                );
              })}
            </ul>
          </div>,
          document.body
        )}
    </>
  );
}

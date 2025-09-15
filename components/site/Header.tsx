"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";

type NavItem = { label: string; href: string };

// If your contact route is nested, change this to "/mysite/contact".
const CONTACT_PATH = "/contact";

const NAV: readonly NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
  { label: "Contact", href: CONTACT_PATH },
] as const;

function getLenis(): any | null {
  if (typeof window === "undefined") return null;
  return (window as any).lenis ?? null;
}

/** Tiny, looped equalizer bars (Framer-powered; motion-safe) */
function Equalizer({ bars = 5, height = 14 }: { bars?: number; height?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const base = Array.from({ length: bars });
  return (
    <div
      aria-hidden
      className="flex items-end gap-[3px]"
      style={{ height }}
    >
      {base.map((_, i) => {
        const delay = i * 0.08;
        const keyframes = [0.35, 1, 0.5, 0.9, 0.4][i % 5];
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-black"
            style={{ height, transformOrigin: "center bottom" }}
            initial={{ scaleY: keyframes }}
            animate={
              shouldReduceMotion
                ? { scaleY: 0.6 }
                : {
                    scaleY: [0.35, 1, 0.5, 0.9, 0.4, 0.7, 0.35],
                    transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay },
                  }
            }
          />
        );
      })}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  // Keep your hash/Lenis logic intact for future # links
  const items = React.useMemo(() => {
    return NAV.map((item) =>
      item.href.startsWith("#")
        ? (pathname === "/" ? item : ({ ...item, href: `/${item.href}` } as NavItem))
        : item
    );
  }, [pathname]);

  // Close on route change
  React.useEffect(() => setOpen(false), [pathname]);

  // Esc to close
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus first link when opened
  const firstLinkRef = React.useRef<HTMLAnchorElement | null>(null);
  React.useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => firstLinkRef.current?.focus(), 10);
    return () => window.clearTimeout(id);
  }, [open]);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  // Smooth hash/Lenis behavior (unchanged except native fallback now non-smooth)
  const onNavClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#") && !href.startsWith("/#")) {
        close();
        return;
      }
      if (href.startsWith("/#")) {
        e.preventDefault();
        const id = href.split("#")[1];
        router.push(`/#${id}`, { scroll: false });
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById(id);
            if (!el) return;
            const lenis = getLenis();
            const headerOffset = 72;
            if (lenis?.scrollTo) {
              lenis.scrollTo(el, { offset: -headerOffset, duration: 0.9 });
            } else {
              const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
              window.scrollTo({ top: y, left: 0, behavior: "auto" });
            }
          }, 40);
        });
        close();
        return;
      }
      if (href.startsWith("#")) {
        e.preventDefault();
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        const lenis = getLenis();
        const headerOffset = 72;
        if (lenis?.scrollTo) {
          lenis.scrollTo(el, { offset: -headerOffset, duration: 0.9 });
        } else {
          const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: y, left: 0, behavior: "auto" });
        }
        close();
      }
    },
    [router]
  );

  // Typed transition
  const spring: Transition = shouldReduceMotion
    ? { type: "tween", duration: 0.01 }
    : { type: "spring", stiffness: 300, damping: 30, mass: 0.8 };

  return (
    <MotionConfig transition={spring}>
      {/* Fixed, perfectly centered anchor. */}
      <div className="pointer-events-none fixed left-1/2 top-4 z-50 -translate-x-1/2">
        {/* Collapsed island: MP3 look — light bg, thin black stroke, vinyl + title + eq + Menu */}
        {!open && (
          <motion.div
            layoutId="headerIsland"
            className="pointer-events-auto mx-auto flex items-center gap-3 rounded-full border border-black bg-[#f1f1f1] px-3 py-1.5 text-black shadow-sm"
            role="group"
            aria-label="Site controls"
          >
            {/* Spinning vinyl → Home */}
            <Link
              href="/"
              aria-label="Home"
              className="block rounded-full p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
              onClick={(e) => e.stopPropagation()}
              data-cursor="magnet"
            >
              <Image
                src="/wlogo.png"
                alt="Home"
                width={36}
                height={36}
                priority
                draggable={false}
                className={[
                  "h-9 w-9 rounded-full select-none will-change-transform",
                  "motion-safe:animate-[spin_8s_linear_infinite]",
                  "motion-reduce:animate-none",
                ].join(" ")}
              />
            </Link>

            {/* Song title + equalizer */}
            <div className="flex items-center gap-2 pr-1">
              <span className="text-xs font-medium tracking-wide">
                Now Playing — “Scroll With It”
              </span>
              <Equalizer bars={5} height={12} />
            </div>

            {/* Divider */}
            <span aria-hidden className="h-6 w-px bg-black/20" />

            {/* Menu trigger */}
            <button
              onClick={toggle}
              aria-expanded={open}
              aria-label="Open navigation"
              type="button"
              className="rounded-full px-3 py-1 text-xs font-semibold hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            >
              Menu
            </button>
          </motion.div>
        )}

        {/* Expanded panel: centered, light bg, thin stroke, vertical menu */}
        <AnimatePresence initial={false}>
          {open && (
            <>
              {/* Backdrop for outside click (light) */}
              <motion.button
                aria-hidden
                onClick={close}
                type="button"
                className="fixed inset-0 z-40 cursor-default bg-black/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                layoutId="headerIsland"
                className="pointer-events-auto relative z-50 mx-auto w-[min(92vw,34rem)] overflow-hidden rounded-2xl border border-black bg-[#f1f1f1] text-black shadow-md"
                initial={{ opacity: 0.98, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.98, scale: 0.98 }}
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
              >
                {/* Top row: Vinyl + Now Playing + EQ, Close button */}
                <div className="flex items-center justify-between px-4 py-3">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                    aria-label="Home"
                  >
                    <Image
                      src="/wlogo.png"
                      alt=""
                      width={24}
                      height={24}
                      priority
                      draggable={false}
                      className={[
                        "h-6 w-6 rounded-full",
                        "motion-safe:animate-[spin_8s_linear_infinite]",
                        "motion-reduce:animate-none",
                      ].join(" ")}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold tracking-wide">
                        Now Playing — “Scroll With It”
                      </span>
                      <Equalizer bars={7} height={14} />
                    </div>
                  </Link>
                  <button
                    onClick={close}
                    aria-label="Close navigation"
                    type="button"
                    className="rounded-full p-2 transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="h-px w-full bg-black/10" />

                {/* Vertical menu (stacked) */}
                <nav className="px-2 py-2">
                  <ul className="flex flex-col">
                    {items.map((item, i) => {
                      const active =
                        item.href === pathname ||
                        (item.href !== "/" &&
                          pathname.startsWith(item.href) &&
                          !item.href.startsWith("#"));
                      return (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ delay: shouldReduceMotion ? 0 : 0.04 * i }}
                        >
                          <Link
                            ref={i === 0 ? firstLinkRef : null}
                            href={item.href}
                            scroll={false}
                            onClick={(e) => onNavClick(e, item.href)}
                            className={[
                              "flex items-center justify-between rounded-xl px-3 py-3",
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
                              "transition-opacity hover:bg-black/5",
                              active ? "bg-black/5" : "bg-transparent",
                            ].join(" ")}
                            data-cursor="magnet"
                          >
                            <span className="text-base">{item.label}</span>
                            <span
                              className={[
                                "text-xs/none rounded-full border px-2 py-0.5",
                                active ? "border-black/60 text-black/80" : "border-black/30 text-black/60",
                              ].join(" ")}
                              aria-hidden
                            >
                              ↵
                            </span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

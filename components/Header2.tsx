// components/Header2.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Get in touch" },
] as const;

export default function Header2() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={[
        "sticky top-0 z-50",
        "transition-shadow",
        scrolled ? "shadow-[0_2px_24px_rgba(0,0,0,0.18)]" : "shadow-none",
        // subtle translucency over hero imagery; avoids heavy blur
        "bg-black/10 supports-[backdrop-filter]:backdrop-blur",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between py-3 md:py-4"
        >
          {/* Logo placeholder (swap with your SVG/mark) */}
          <Link
            href="/"
            className="relative inline-flex items-center rounded-full px-2 font-black tracking-tight text-white text-lg md:text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <span className="sr-only">Go to home</span>
            <span aria-hidden>MYLOGO</span>
          </Link>

          {/* Menu */}
          <ul className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <NavPill href={link.href}>{link.label}</NavPill>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* divider that fades in after scroll */}
      <AnimatePresence>
        <motion.div
          key={String(scrolled)}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none absolute inset-x-0 top-full h-px bg-white/20"
        />
      </AnimatePresence>
    </header>
  );
}

function NavPill({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "group relative inline-flex items-center",
        "rounded-full px-3 py-1.5 md:px-4 md:py-2",
        "font-black tracking-tight text-white", // thicker white letters
        "transition-colors duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-black/50",
      ].join(" ")}
    >
      {/* animated white pill */}
      <span
        aria-hidden
        className={[
          "absolute inset-0 rounded-full bg-white",
          "scale-75 opacity-0",
          "transition-all duration-200 ease-out",
          "group-hover:opacity-100 group-hover:scale-100",
          "group-focus-visible:opacity-100 group-focus-visible:scale-100",
        ].join(" ")}
      />
      {/* label */}
      <span
        className={[
          "relative z-10 select-none",
          "text-sm md:text-base",
          "transition-colors duration-200",
          "group-hover:text-black group-focus-visible:text-black",
        ].join(" ")}
      >
        {children}
      </span>
    </Link>
  );
}

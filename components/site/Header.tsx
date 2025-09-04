"use client";

import { useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useScrollDirection from "@/components/hooks/useScrollDirection";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/mysite/contact" }, // ✅ correct route for app/mysite/contact
];

function getLenis(): any | null {
  if (typeof window === "undefined") return null;
  return (window as any).lenis ?? null;
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const dir = useScrollDirection(8);

  // Adjust in-page hashes when not on "/"
  const items = useMemo(() => {
    return NAV.map((item) =>
      item.href.startsWith("#")
        ? (pathname === "/" ? item : { ...item, href: `/${item.href}` })
        : item
    );
  }, [pathname]);

  const onNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }, 40);
        });
      } else if (href.startsWith("#")) {
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
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    },
    [router]
  );

  const barClasses =
    "fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-black/10 transition-transform duration-300 will-change-transform text-black";
  const translate = dir === "down" ? "-translate-y-full" : "translate-y-0";

  return (
    <header className={`${barClasses} ${translate}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" data-cursor="magnet">
          <Image
            src="/wlogo.png"
            alt="Portfolio Logo"
            width={36}
            height={36}
            priority
            className="h-9 w-9 rounded-md"
          />
          <span className="sr-only">Home</span>
        </Link>

        {/* Nav (black text) */}
        <nav className="flex items-center gap-6 text-sm text-black">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              scroll={false}
              onClick={(e) => onNavClick(e, item.href)}
              className="hover:underline underline-offset-4"
              data-cursor="magnet"
            >
              {item.label}
            </Link>
          ))}
          {/* BubbleMenu trigger removed */}
        </nav>
      </div>
    </header>
  );
}

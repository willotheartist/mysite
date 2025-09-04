// components/site/footer.tsx
import type { JSX } from "react";
import Link from "next/link";

const MARQUEE = "Thoughtful today • Durable tomorrow • Designed to read like good conversation,";

export default function Footer(): JSX.Element {
  return (
    <footer
      aria-label="Site footer"
      className="relative overflow-hidden bg-black text-white"
      style={
        {
          // Keep accent as it was (defaults to white)
          ["--accent" as any]: "var(--accent, #ffffff)",
        } as React.CSSProperties
      }
    >
      {/* Creative background + marquee CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .footer__fx::before,
          .footer__fx::after {
            content: "";
            position: absolute; inset: -20%;
            pointer-events: none;
          }
          .footer__fx::before {
            background:
              radial-gradient(60% 55% at 85% 20%, color-mix(in oklab, var(--accent) 50%, transparent) 0%, transparent 60%),
              radial-gradient(40% 35% at 15% 90%, color-mix(in oklab, var(--accent) 35%, transparent) 0%, transparent 60%);
            opacity: .28;
            filter: blur(12px);
            z-index: 0;
          }
          .footer__fx::after {
            background-image:
              linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
            background-size: 24px 24px;
            -webkit-mask-image: radial-gradient(140% 90% at 50% 120%, black 40%, transparent 70%);
                    mask-image: radial-gradient(140% 90% at 50% 120%, black 40%, transparent 70%);
            opacity: .4;
            z-index: 0;
          }
          .link-accent { position: relative; transition: color .2s ease; }
          .link-accent:hover { color: var(--accent); }
          .tape {
            height: 2px; width: 100%;
            background: linear-gradient(90deg, transparent, var(--accent) 18%, var(--accent) 82%, transparent);
            opacity: .7;
          }
          .btn-accent {
            border: 1px solid color-mix(in oklab, var(--accent) 50%, rgba(255,255,255,.2));
            background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
            transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease;
          }
          .btn-accent:hover {
            border-color: var(--accent);
            box-shadow:
              0 8px 40px -10px color-mix(in oklab, var(--accent) 45%, transparent),
              0 0 0 1px color-mix(in oklab, var(--accent) 50%, transparent);
            transform: translateY(-1px);
          }

          /* Marquee bar */
          .marquee {
            --gap: 3rem;
            --speed: 5s; /* adjust for faster/slower */
            position: relative;
            display: flex;
            overflow: hidden;
            background: #FF390D; /* ← only change: marquee background */
            border-bottom: 1px solid rgba(255, 255, 255, 1);
            mask-image: linear-gradient(90deg, transparent, rgba(255, 75, 99, 1) 8%, #ff2978ff 100%, transparent);
            -webkit-mask-image: linear-gradient(0deg, transparent, #ff1a5bff 8%, #ff2e7eff 92%, transparent);
          }
          .marquee__inner {
            display: flex;
            flex-shrink: 0;
            min-width: max-content;
            gap: var(--gap);
            padding-block: .9rem;
            animation: marquee var(--speed) linear infinite;
          }
          .marquee__chunk {
            display: inline-flex;
            align-items: center;
            gap: 1.25rem;
            white-space: nowrap;
          }
          .marquee__text {
            color: var(--accent); /* stays white via accent fallback */
            letter-spacing: .01em;
          }
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee__inner { animation: none; }
          }
        `,
        }}
      />

      {/* Background effects */}
      <div className="footer__fx absolute inset-0" />

      {/* TOP MARQUEE */}
      <div className="marquee">
        <div className="marquee__inner" aria-hidden="true">
          <span className="marquee__chunk">
            <span className="marquee__text text-sm sm:text-base md:text-lg font-medium">
              {MARQUEE}
            </span>
          </span>
          <span className="marquee__chunk">
            <span className="marquee__text text-sm sm:text-base md:text-lg font-medium">
              {MARQUEE}
            </span>
          </span>
        </div>
        <div className="marquee__inner" aria-hidden="true">
          <span className="marquee__chunk">
            <span className="marquee__text text-sm sm:text-base md:text-lg font-medium">
              {MARQUEE}
            </span>
          </span>
          <span className="marquee__chunk">
            <span className="marquee__text text-sm sm:text-base md:text-lg font-medium">
              {MARQUEE}
            </span>
          </span>
        </div>
      </div>

      {/* Accent tape just below marquee */}
      <div className="tape" />

      {/* Content */}
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 md:py-16">
        {/* Top row: CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-10">
          <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Let’s make something <span className="link-accent">standout</span>.
          </h2>

          <div className="flex items-center gap-3">
            <a
              href="mailto:hello@yourdomain.com"
              className="btn-accent rounded-2xl px-4 py-2 text-sm md:text-base"
            >
              Start a conversation
            </a>
            <Link
              href="/work"
              className="underline-offset-4 hover:underline link-accent text-sm md:text-base"
            >
              See recent work →
            </Link>
          </div>
        </div>

        {/* Mid separators */}
        <div className="my-10 opacity-70">
          <div className="tape" />
        </div>

        {/* Middle row: nav + contact + socials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <nav aria-label="Footer">
            <p className="mb-3 text-xs uppercase tracking-widest opacity-70">Pages</p>
            <ul className="space-y-2 text-base/7">
              <li><Link className="link-accent" href="/about">About</Link></li>
              <li><Link className="link-accent" href="/profile">Profile</Link></li>
              <li><Link className="link-accent" href="/work">Work</Link></li>
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest opacity-70">Contact</p>
            <ul className="space-y-2 text-base/7">
              <li><a className="link-accent" href="mailto:hello@yourdomain.com">hello@yourdomain.com</a></li>
              <li><a className="link-accent" href="tel:+440000000000">+44 00 0000 0000</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest opacity-70">Social</p>
            <ul className="space-y-2 text-base/7">
              <li><a className="link-accent" href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a className="link-accent" href="https://www.behance.net" target="_blank" rel="noreferrer">Behance</a></li>
              <li><a className="link-accent" href="https://dribbble.com" target="_blank" rel="noreferrer">Dribbble</a></li>
              <li><a className="link-accent" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest opacity-70">Based in</p>
            <p className="text-base/7">London, UK</p>
            <p className="mt-2 text-sm opacity-70">Working across time zones.</p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm opacity-80">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="opacity-70">
            Built with Next.js & Tailwind. <span className="link-accent">Accessibility-minded</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

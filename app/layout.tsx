// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import Providers from "./providers";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import MagneticCursor from "@/components/interactive/MagneticCursor";
// ❌ removed ChatBubbleMount
import RouteScrollRestoration from "@/components/RouteScrollRestoration"; // ⬅️ new

export const metadata: Metadata = {
  // ✅ only additions below; same title/description retained
  metadataBase: new URL("https://www.growthmob.io"),
  title: {
    default: "William | Multi-Disciplinary Digital Designer & Creator",
    template: "%s · William — Digital Designer",
  },
  description:
    "Hi, I’m William—a London-based multi-disciplinary digital designer specializing in UX, branding, interactive web, and visual storytelling. Explore my portfolio.",
  openGraph: {
    title: "William | Multi-Disciplinary Digital Designer & Creator",
    description:
      "London-based digital designer focused on UX, branding, interactive web, and visual storytelling.",
    url: "https://www.growthmob.io",
    siteName: "William — Digital Designer",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "William | Multi-Disciplinary Digital Designer & Creator",
    description:
      "UX, branding, interactive web, and visual storytelling — explore my portfolio.",
  },
  alternates: {
    canonical: "https://www.growthmob.io",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          {/* Suspense boundary ensures any client hooks inside header/nav/scroll-restoration are safe at build time */}
          <Suspense fallback={null}>
            <Header />
            {/* Always reset to top when route changes */}
            <RouteScrollRestoration />
            {children}
            <Footer />
            {/* ❌ removed <ChatBubbleMount /> */}
            <MagneticCursor />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

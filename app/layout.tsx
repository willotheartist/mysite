import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import MagneticCursor from "@/components/interactive/MagneticCursor";
import ChatBubbleMount from "@/components/magicui/chat-bubble-mount";

export const metadata: Metadata = {
  title: "Your Website Starter",
  description: "Custom, fast, unmigstakably yours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F1F1F1] text-black antialiased">
        <Providers>
          <Header />
          {children}
          <Footer />
          <ChatBubbleMount />
          <MagneticCursor />
        </Providers>
      </body>
    </html>
  );
}

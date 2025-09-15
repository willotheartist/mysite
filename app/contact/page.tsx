// app/contact/page.tsx
import Image from "next/image";
import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | mysite",
  description: "Want to reach out? Say hi :)",
};

export default function ContactPage() {
  return (
    <main className="min-h-[100svh] bg-neutral-50 text-neutral-900">
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Image + big headline (no careers button) */}
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0">
              <Image
                src="/contact/contact-sky.jpg"
                alt=""
                fill
                priority
                className="object-cover blur-[2px] will-change-transform"
              />
              <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_0%_0%,#00000020,transparent_60%)]" />
            </div>

            <div className="relative flex h-full items-end p-8 sm:p-10 md:p-12 lg:p-14">
              <h1 className="max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-md">
                Want to reach out? <span className="whitespace-nowrap">Say hi :)</span>
              </h1>
            </div>
          </div>

          {/* Right: Form card */}
          <div className="rounded-3xl bg-white p-4 ring-1 ring-neutral-200 sm:p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

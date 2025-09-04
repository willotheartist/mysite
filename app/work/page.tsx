// app/work/page.tsx
import type { Metadata } from "next";
import WorkList from "@components/work/WorkList";
import { workItems } from "@data/work.data";

export const metadata: Metadata = {
  title: "Work — /mysite",
  description: "Selected projects presented in a full-bleed index.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-black">
      {/* Full-width section; light horizontal padding only */}
      <section className="w-full px-6 lg:px-10 py-16 lg:py-24">
        <h1 className="text-xl lg:text-6xl font-semibold tracking-tight mb-10 lg:mb-4">
          Some of the projects i've worked on, created, helped.
        </h1>
        <WorkList items={workItems} />
      </section>
    </main>
  );
}

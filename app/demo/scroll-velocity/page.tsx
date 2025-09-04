// app/demo/scroll-velocity/page.tsx
import ScrollVelocityMediaDemo from "@/components/sections/ScrollVelocityMediaDemo";

export default function Page() {
  return (
    <main className="min-h-dvh">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h1 className="mb-8 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Scroll-Based Velocity Demo
        </h1>
        <p className="mb-8 max-w-2xl text-pretty text-base text-foreground/70 md:text-lg">
          Media from <code>/public/projects/id-1..id-3</code> scrolling faster or slower based on your scroll velocity.
        </p>
        <ScrollVelocityMediaDemo />
      </div>
    </main>
  );
}

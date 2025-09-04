// app/mysite/projects/[slug]/page.tsx
type PageProps = { params: { slug: string } };

export default function DebugSlugPage({ params }: PageProps) {
  return (
    <main className="min-h-svh bg-neutral-950 text-white flex items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-4">
        <h1 className="text-2xl font-semibold">Debug: Dynamic Route</h1>
        <p className="text-neutral-300">
          If you see this, the <code>[slug]</code> route is working.
        </p>
        <div className="rounded-xl border border-white/10 p-4">
          <div className="text-sm text-neutral-400">params.slug</div>
          <div className="mt-1 text-lg">{params.slug}</div>
        </div>
      </div>
    </main>
  );
}

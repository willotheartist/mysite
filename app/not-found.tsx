// app/not-found.tsx
import { Suspense } from 'react';
import NotFoundClient from './not-found.client';
import Link from 'next/link';

export const metadata = {
  title: 'Not found',
};

function NotFoundSkeleton() {
  return (
    <div className="mt-6 h-16 w-full animate-pulse rounded-2xl bg-neutral-100" aria-hidden />
  );
}

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">404 — Not found</h1>
      <p className="mt-2 text-neutral-600">
        Either the URL was mistyped or the page moved.
      </p>

      {/* Required: wrap client hooks in Suspense */}
      <Suspense fallback={<NotFoundSkeleton />}>
        <NotFoundClient />
      </Suspense>

      <div className="mt-10 text-sm text-neutral-500">
        <Link href="/sitemap.xml" className="underline underline-offset-4 hover:no-underline">
          Sitemap
        </Link>
      </div>
    </main>
  );
}

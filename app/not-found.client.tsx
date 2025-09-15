// app/not-found.client.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function NotFoundClient() {
  const search = useSearchParams();
  const from = search.get('from');

  return (
    <div className="mt-6 space-y-3">
      {from ? (
        <p className="text-sm text-neutral-500">
          We couldn’t find the page you were coming from: <span className="font-medium">{from}</span>
        </p>
      ) : (
        <p className="text-sm text-neutral-500">The page you’re looking for doesn’t exist.</p>
      )}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50 focus:outline-none focus-visible:ring"
        >
          Go home
        </Link>
        <Link
          href="/work"
          className="inline-flex items-center rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50 focus:outline-none focus-visible:ring"
        >
          View work
        </Link>
      </div>
    </div>
  );
}

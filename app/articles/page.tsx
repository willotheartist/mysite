// app/articles/page.tsx
import Link from "next/link";
import { getAllArticles } from "./articles.data";

export const metadata = { title: "Articles" };

export default function ArticlesIndex() {
  const list = getAllArticles();

  return (
    <main className="min-h-screen bg-white text-black px-6 md:px-12 lg:px-24 py-16">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Articles</h1>
        <p className="mt-3 text-neutral-600 max-w-2xl">
          Thoughts, notes, and longer reads—kept crisp and useful.
        </p>
      </header>

      <ul className="grid gap-8 md:gap-10 md:grid-cols-2">
        {list.map((a) => (
          <li key={a.slug} className="group">
            <Link href={`/articles/${a.slug}`} className="block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.hero}
                alt={a.title}
                className="w-full aspect-[16/9] rounded-2xl object-cover shadow-lg transition-transform group-hover:scale-[1.01]"
              />
              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase text-neutral-500">
                  {a.categories?.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                  <span className="text-neutral-400">
                    {new Date(a.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                </div>
                <h2 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">
                  {a.title}
                </h2>
                {a.description ? (
                  <p className="mt-2 text-neutral-600">{a.description}</p>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

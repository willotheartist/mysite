// app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import HoverRevealCard from "@/components/sections/HoverRevealCard"; // ✅ use the same alias path as home
import { findArticle, getAllArticles } from "../articles.data";

// Turn body[] strings into elements.
// - "## Heading" => <h2>
// - lines starting with "— " render as a signature-style <p>
// - everything else => <p>
function renderBlock(line: string, idx: number) {
  if (line.startsWith("## ")) {
    const text = line.replace(/^##\s+/, "");
    return (
      <h2
        key={`h2-${idx}`}
        className="mt-12 mb-3 text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900"
      >
        {text}
      </h2>
    );
  }
  if (line.trim().startsWith("— ")) {
    return (
      <p key={`sig-${idx}`} className="mt-10 text-neutral-600">
        {line}
      </p>
    );
  }
  return (
    <p key={`p-${idx}`} className="text-neutral-800 leading-relaxed">
      {line}
    </p>
  );
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = findArticle(params.slug);
  if (!article) return notFound();

  const all = getAllArticles();
  const more = all.filter((a) => a.slug !== article.slug).slice(0, 3);

  const dateLabel = new Date(article.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <main className="bg-white text-black px-6 md:px-12 lg:px-24 pt-10 md:pt-14 pb-32 lg:pb-48">
      {/* Category chips */}
      {article.categories && article.categories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {article.categories.map((c) => (
            <span
              key={c}
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
        {article.title}
      </h1>

      {/* Hero */}
      <div className="mb-8 md:mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.hero}
          alt={article.title}
          className="w-full rounded-2xl object-cover shadow-sm"
        />
      </div>

      {/* Meta row */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8 md:gap-x-16 max-w-3xl mb-10 md:mb-12">
        <div className="text-sm">
          <div className="text-neutral-500">Date</div>
          <div className="text-neutral-900">{dateLabel}</div>
        </div>
        <div className="text-sm">
          <div className="text-neutral-500">Text</div>
          <div className="text-neutral-900">William</div>
        </div>
        <div className="text-sm col-span-2 sm:col-span-1">
          <div className="text-neutral-500">Share</div>
          <div className="flex items-center gap-3 text-neutral-900">
            <Link
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                article.title
              )}&url=${encodeURIComponent(`/articles/${article.slug}`)}`}
              target="_blank"
              className="underline underline-offset-4 hover:no-underline"
            >
              X
            </Link>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `/articles/${article.slug}`
              )}`}
              target="_blank"
              className="underline underline-offset-4 hover:no-underline"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl">
        {(() => {
          const firstIdx = article.body.findIndex((l) => !l.startsWith("## "));
          const blocksBefore = article.body.slice(0, firstIdx >= 0 ? firstIdx : 0);
          const after = article.body.slice(firstIdx >= 0 ? firstIdx : 0);

          return (
            <>
              {blocksBefore.map((l, i) => renderBlock(l, i))}

              {firstIdx >= 0 && (
                <p className="text-xl md:text-2xl font-medium text-neutral-900 leading-relaxed mb-8">
                  {article.body[firstIdx]}
                </p>
              )}

              {after.slice(firstIdx >= 0 ? 1 : 0).map((l, i) => (
                <div key={`blk-${i}`}>{renderBlock(l, i)}</div>
              ))}
            </>
          );
        })()}
      </article>

      {/* More thoughts */}
      {more.length > 0 && (
        <section
          className="mt-20 md:mt-28 border-t border-black/10 pt-10 md:pt-14"
          aria-labelledby="more-thoughts-heading"
        >
          <header className="mb-8 md:mb-10">
            <h2
              id="more-thoughts-heading"
              className="text-3xl md:text-5xl font-semibold tracking-tight"
            >
              More thoughts
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {more.map((a) => (
              <HoverRevealCard
                key={a.slug}
                imageSrc={a.hero}
                title={a.title}
                href={`/articles/${a.slug}`}
                className="h-full w-full aspect-[4/5] md:aspect-square xl:aspect-[4/3]"
                // tags={a.categories}
                // authorName="William"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

// app/mysite/projects/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Space_Mono } from "next/font/google";
import { findProjectBySlug, getAllSlugs, type Project } from "../projects.data";
import NoHeader from "../../../../components/NoHeader"; // ← FIXED: four dots to reach app/components

export const dynamicParams = true; // ← ensure non-prebuilt slugs still resolve

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type PageProps = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = findProjectBySlug(params.slug);
  if (!project) return { title: "Project not found — /mysite" };

  const title = `${project.title}${project.subtitle ? " — " + project.subtitle : ""}`;
  const description = project.summary ?? project.subtitle ?? "Project detail";

  const firstImage = project.media.find((m) => m.kind === "image") as
    | { kind: "image"; src: string }
    | undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: firstImage ? [{ url: firstImage.src }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = findProjectBySlug(params.slug);
  if (!project) notFound();

  // ---- Prev / Next computed on SERVER from authoritative list
  const slugs = getAllSlugs(); // ordered as in data file
  const idx = slugs.indexOf(params.slug);
  const prevSlug = idx >= 0 && slugs.length > 1 ? slugs[(idx - 1 + slugs.length) % slugs.length] : null;
  const nextSlug = idx >= 0 && slugs.length > 1 ? slugs[(idx + 1) % slugs.length] : null;

  const tags: string[] =
    Array.isArray((project as any).tags)
      ? (project as any).tags
      : Array.isArray((project as any).labels)
      ? (project as any).labels
      : [];

  return (
    // Full-bleed, header hidden via <NoHeader /> + globals.css rule.
    <div className="min-h-dvh bg-neutral-950 text-white">
      <NoHeader />
      {/* md+: 40% sticky sidebar, 60% media stream */}
      <div className="grid grid-cols-1 md:grid-cols-[40vw_minmax(0,1fr)] overflow-visible">
        {/* LEFT SIDEBAR — asymmetric padding (more on right) */}
        <aside className="md:sticky md:top-3 self-start bg-neutral-950 pl-15 pr-15 pt-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="mt-2 text-sm/6 text-neutral-300">{project.subtitle}</p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-1 gap-y-4 text-sm text-neutral-300">
            {project.year && (
              <>
                <span className="text-neutral-400">Year</span>
                <span className="text-white">{project.year}</span>
              </>
            )}
            {project.client && (
              <>
                <span className="text-neutral-400">Client</span>
                <span className="text-white">{project.client}</span>
              </>
            )}
            {project.role && (
              <>
                <span className="text-neutral-400">Role</span>
                <span className="text-white">{project.role}</span>
              </>
            )}
          </div>

          {project.summary && (
            <p className="mt-6 text-[15px] leading-5 text-neutral-200">{project.summary}</p>
          )}

          {tags.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xs uppercase tracking-widest text-neutral-400">Tags</h2>
              <ul
                className={`mt-5 flex flex-wrap gap-2 ${spaceMono.className}`}
                aria-label="Project tags"
              >
                {tags.map((t) => (
                  <li key={t}>
                    <span className="inline-block rounded-[5px] bg-[#f1f1f1] px-2.5 py-1 text-[11px] leading-none text-black">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>

              {project.credits && project.credits.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xs uppercase tracking-widest text-neutral-400">Credits</h2>
                  <ul className="mt-2 space-y-1.5 text-sm text-neutral-300">
                    {project.credits.map((c) => (
                      <li key={`${c.label}-${c.value}`}>
                        <span className="text-neutral-400">{c.label}: </span>
                        <span className="text-white">{c.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </aside>

        {/* RIGHT CONTENT */}
        <main className="bg-neutral-950 px-2 sm:px-4 md:px-6 lg:px-8 py-10 md:py-16">
          <ProjectMediaRenderer project={project} />

          
        </main>
      </div>
    </div>
  );
}

function ProjectMediaRenderer({ project }: { project: Project }) {
  if (!project.media?.length) {
    return (
      <div className="text-neutral-400 text-sm">
        (No media yet — add images/videos to <code>projects.data.ts</code>.)
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {project.media.map((m, i) => {
        if (m.kind === "image") {
          return (
            <figure key={i} className="w-full">
              <Image
                src={m.src}
                alt={m.alt ?? project.title}
                width={m.width ?? 1920}
                height={m.height ?? 1080}
                className="block w-full h-auto"
                priority={i === 0}
              />
              {m.alt ? (
                <figcaption className="text-[0px] text-neutral-400">{m.alt}</figcaption>
              ) : null}
            </figure>
          );
        }
        if (m.kind === "video") {
          return (
            <figure key={i} className="w-full">
              <video className="block w-full" controls playsInline preload="metadata" poster={m.poster}>
                <source src={m.src} type="video/mp4" />
              </video>
              {m.caption ? (
                <figcaption className="text-[12px] text-neutral-400">{m.caption}</figcaption>
              ) : null}
            </figure>
          );
        }
        if (m.kind === "embed") {
          return (
            <figure key={i} className="w-full">
              <div
                className="w-full aspect-video overflow-hidden bg-black"
                dangerouslySetInnerHTML={{ __html: m.html }}
              />
              {m.caption ? (
                <figcaption className="text-[12px] text-neutral-400">{m.caption}</figcaption>
              ) : null}
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}

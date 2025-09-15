Got it 👍
Here’s a cleaned-up **up-to-date `PROJECT.md`** you can keep in your repo so far. It now includes **Projects**, **Skills**, and the new **Articles** system.

---

# /mysite — Project Cheat Sheet

## Basics

* **Root**: `~/development/mysite`
* **Stack**: Next.js 15 (App Router, Turbopack), Tailwind v4, TypeScript, Framer Motion, GSAP + ScrollTrigger, Lenis, some R3F, shadcn/ui.
* **Style**: High contrast, crisp, whitespace-rich, minimal chrome. No assumed accent color.
* **Accessibility**: Semantic HTML, keyboard focus, motion-safe fallbacks.
* **Performance**: Keep deps light; heavy animations only in client components; guard DOM (`typeof window !== "undefined"`).

---

## Conventions

* Always ship **full, ready-to-paste files** (or minimal diffs).
* Preserve names/props/paths (no silent renames).
* Use TypeScript safety (`as const`, null guards).
* GSAP/ScrollTrigger → client-only, lazy init, SSR guards.
* Minimal diffs, keep unrelated code unchanged.

---

## Projects

* **Data**: `app/mysite/projects/projects.data.ts` (11 entries: `project-1 … project-11`).
* **Page**: `app/mysite/projects/[slug]/page.tsx` → renders `ProjectPageBase`.
* **Next project nav**: cycles & wraps (project-11 → project-1).

**Checklist**

* `export const dynamicParams = true;` in `[slug]/page.tsx`.
* `generateStaticParams()` returns all slugs.
* Bottom nav uses `/mysite/projects/${next.slug}`.
* Verify wrap-around navigation after a clean build.

---

## Skills

* **Page**: `app/(site)/skills/page.tsx` (Server Component).
* **Client hooks**: (`useSearchParams`, `usePathname`, etc.) must live in `SkillsClient.tsx` under `<Suspense>`.

---

## Articles (Blog / Thoughts)

* **Data**: `app/articles/articles.data.ts`

  * Each article = object with:

    * `slug`, `title`, `description`, `date`, `categories`, `hero` (image in `/public/articles/`), `body` (array of strings).
  * Example slug → `/articles/finding-flow`.

* **Index Page**: `app/articles/page.tsx`

  * Lists all articles in a grid of cards.
  * Pulls directly from `articles.data.ts`.

* **Detail Page**: `app/articles/[slug]/page.tsx`

  * Loads article via `findArticle(slug)`.
  * Renders hero, title, meta, body.
  * `##` lines → `<h2>`, `— Name` lines → signature-style `<p>`.
  * At bottom: **“More thoughts”** → shows up to 3 other articles as `HoverRevealCard`s.

* **Homepage Section**: `app/page.tsx`

  * "Some thoughts & articles" → renders 3 `HoverRevealCard`s.
  * Currently linked by matching `p.title` → `/articles/<slug>`.
  * ⚠️ Fragile — better to add a `slug` to `HoverRevealCardData` and link via that.

---

## House Commands

```bash
cd ~/development/mysite

# dev mode (default port 3000)
npm run dev

# choose a port
npm run dev -- -p 3001

# production build & run
rm -rf .next
npm run build
npm start

# free port 3000 if stuck
lsof -i :3000
kill -9 <PID>

# audit
npm audit
npm audit fix
npm audit fix --force   # only if reviewed
```

---

## Known Fixes

* Lenis import updated (`lenis` package).
* Removed obsolete `@ts-expect-error` in `SkillsGrid`.
* CSR bailout: router hooks moved into client component under `<Suspense>`.
* Added **RouteScrollRestoration** → resets scroll on every route change (Lenis-aware).

---

## Quick Greps

* Limit bug: `grep -R "slice(0,3)" -n app`
* Dynamic params off: `grep -R "dynamicParams\\s*=\\s*false" -n app`
* Old Lenis import: `grep -R "@studio-freight/lenis" -n app components lib`
* Router hooks in server: `grep -R "useSearchParams\\|usePathname\\|useRouter" -n app`

---

## Triggers

* **booboo** → recall stack/conventions.
* **rubikscube** → GSAP ScrollTrigger sticky horizontal cube panels.

---

👉 Do you want me to also add a section here for **deployment (Vercel steps + metadataBase note)** so you have everything in one place?

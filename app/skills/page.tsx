// app/(site)/skills/page.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup } from "framer-motion";

// Keep page logic typed to legacy categories (data source)
import {
  skills,
  allCategories,
  type Skill,
  type SkillCategory as SkillCategoryKey,
} from "@/data/skills";

// Import the FilterBar’s wider union type (includes "All")
import SkillsFilterBar, {
  type SkillCategory as FilterCategory,
} from "@/components/skills/SkillsFilterBar";

import SkillsGrid from "@/components/skills/SkillsGrid";
import SkillOverlay from "@/components/skills/SkillOverlay";
import { useBodyLock } from "@/lib/useBodyLock";
import { useElementHeight } from "@/lib/useElementHeight";

// --- Narrowing guard: only accept legacy keys from FilterBar callbacks ---
const LEGACY_KEYS = ["frontend", "motion", "3d", "ui", "system", "devops"] as const;
function isLegacyCategory(x: FilterCategory): x is SkillCategoryKey {
  return (LEGACY_KEYS as readonly string[]).includes(x as string);
}

export default function SkillsPage() {
  const [activeCats, setActiveCats] = useState<SkillCategoryKey[]>([]);
  const [dense, setDense] = useState(false); // Space enforced by FilterBar

  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedSlug = params.get("s");
  const selected: Skill | undefined = useMemo(
    () => skills.find((s: Skill) => s.slug === selectedSlug),
    [selectedSlug]
  );

  useBodyLock(!!selected); // pause page scroll when overlay is open

  // ---- OR filtering: show items that match ANY selected category ----
  const filtered = useMemo(() => {
    if (!activeCats.length) return skills; // "All" state
    return skills.filter((s: Skill) =>
      activeCats.some((c: SkillCategoryKey) => s.categories.includes(c))
    );
  }, [activeCats]);

  // open/close helpers (URL is shareable)
  const open = (slug: string) => router.push(`${pathname}?s=${slug}`);
  const close = () => router.push(pathname);

  // Measure sticky header height precisely
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const stickyH = useElementHeight(stickyRef);

  // Provide categories to the bar with "All" first
  const categoriesForBar = useMemo(() => {
    return ["All", ...allCategories] as unknown as FilterCategory[];
  }, []);

  // Reflect "All" as active when nothing is selected
  const activeForBar = useMemo(() => {
    return (activeCats.length
      ? activeCats
      : (["All"] as unknown as SkillCategoryKey[])) as unknown as FilterCategory[];
  }, [activeCats]);

  return (
    <main className="min-h-[100svh] bg-white text-black">
      {/* full-bleed; spacing is handled by the sticky itself */}
      <div
        className="w-full"
        style={
          {
            // expose to CSS calc with a safe fallback if 0 while measuring
            ["--skills-header-h" as any]: `${stickyH || 72}px`,
          } as React.CSSProperties
        }
      >
        <div
          ref={stickyRef}
          className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 sm:px-6 lg:px-8 mt-6 sm:mt-0"
        >
          <SkillsFilterBar
            categories={categoriesForBar}
            active={activeForBar}
            onToggleCategory={(cat: FilterCategory) => {
              if (cat === "All") {
                // Reset to “All”
                setActiveCats([]);
                return;
              }
              if (!isLegacyCategory(cat)) return;
              setActiveCats((prev: SkillCategoryKey[]) =>
                prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
              );
            }}
            dense={dense}
            onToggleDensity={() => setDense((d: boolean) => !d)}
          />
        </div>

        {/* Grid area consumes exactly the remaining viewport height */}
        <div className="min-h-[calc(100svh-var(--skills-header-h))]">
          <LayoutGroup id="skills">
            <SkillsGrid
              items={filtered}
              dense={dense}
              onSelect={(s: Skill) => open(s.slug)}
            />

            <AnimatePresence>
              {selected && (
                <SkillOverlay key={selected.slug} skill={selected} onClose={close} />
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
    </main>
  );
}

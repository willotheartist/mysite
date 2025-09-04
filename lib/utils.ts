// lib/utils.ts

/**
 * Minimal className combiner without extra dependencies.
 * Example:
 * cn("base", condition && "active", { hidden: false, block: true })
 * → "base active block"
 */
export function cn(
  ...args: Array<string | null | undefined | false | Record<string, boolean>>
): string {
  const out: string[] = [];
  for (const a of args) {
    if (!a) continue;
    if (typeof a === "string") {
      out.push(a);
    } else {
      for (const [k, v] of Object.entries(a)) {
        if (v) out.push(k);
      }
    }
  }
  return out.join(" ");
}


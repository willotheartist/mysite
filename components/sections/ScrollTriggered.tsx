// components/sections/ScrollTriggered.tsx
"use client"

import * as React from "react"
import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

type Item = { id: string; title: string }

export default function ScrollTriggered({
  heading = "My Field of Expertise",
  items = DEFAULT_ITEMS,
  once = false,
  amount = 0.6,
}: {
  heading?: string
  items?: Item[]
  once?: boolean
  amount?: number
}) {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8"
    >
      <h2 id="expertise-heading" className="sr-only">
        {heading}
      </h2>

      <div className="mx-auto mt-24 mb-28 w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
        <div className="mb-10 text-center">
          <p className="text-sm/6 tracking-wide text-muted">{heading}</p>
        </div>

        <div className="relative">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="relative mb-[-7rem] flex items-center justify-center overflow-visible pt-5 md:mb-[-8rem] lg:mb-[-9rem]"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount, once }}
            >
              <motion.div
                initial={{ y: 120, opacity: 0, rotate: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  rotate: -2,
                  transition: {
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                    mass: 0.8,
                    when: "beforeChildren",
                    staggerChildren: 0.05,
                  },
                }}
                viewport={{ amount, once }}
                className="card group relative grid h-[28rem] w-[20rem] place-items-center shadow-sm transition-transform will-change-transform dark:border-white/10"
                style={{ transformOrigin: "10% 60%" }}
              >
                <ChaoticWord title={item.title} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Chaotic per-letter animation */
function ChaoticWord({ title }: { title: string }) {
  const chunks = React.useMemo(() => chunkTitle(title), [title])

  return (
    <div className="grid h-full w-full place-items-center px-4 py-6 text-center">
      <div className="grid w-full flex-1 place-content-center gap-y-2">
        {chunks.map((chunk, i) => (
          <div
            key={i}
            className="flex justify-center gap-x-1 text-[2.5rem] font-extrabold uppercase leading-none tracking-tight text-black sm:text-[3rem] md:text-[3.5rem]"
          >
            {chunk.split("").map((char, j) => (
              <motion.span
                key={j}
                initial={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 200, // random horizontal
                  y: (Math.random() - 0.5) * 200, // random vertical
                  rotate: (Math.random() - 0.5) * 90, // random rotation
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                  },
                }}
                viewport={{ once: false, amount: 0.6 }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Split a title into 3–4 letter chunks (smart split) */
function chunkTitle(title: string): string[] {
  const clean = title.replace(/\s+/g, "").toUpperCase()
  const chunks: string[] = []
  let i = 0
  while (i < clean.length) {
    const remaining = clean.length - i
    const take =
      remaining === 4 || remaining === 8 ? 4 : Math.min(3, remaining)
    chunks.push(clean.slice(i, i + take))
    i += take
  }
  return chunks
}

const DEFAULT_ITEMS: Item[] = [
  { id: "branding", title: "Branding" },
  { id: "graphic", title: "Graphic Design" },
  { id: "web", title: "Web Design" },
  { id: "motion", title: "Motion Design" },
  { id: "app", title: "App Design" },
]

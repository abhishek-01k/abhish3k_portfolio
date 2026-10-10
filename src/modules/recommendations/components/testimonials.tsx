"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import { SectionLabel } from "@/src/components/section-label"
import { RECOMMENDATIONS } from "@/src/config/constants"
import { cn, withBasePath } from "@/src/lib/utils"

const INTERVAL = 9000
const EASE = [0.16, 1, 0.3, 1] as const

export const Testimonials = () => {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const rec = RECOMMENDATIONS[index]

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % RECOMMENDATIONS.length),
      INTERVAL
    )
    return () => window.clearTimeout(id)
  }, [index, paused, reduceMotion])

  return (
    <section
      id="recommendations"
      className="relative border-t border-line py-24 sm:py-32"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <SectionLabel>Word on the street</SectionLabel>
          <span className="font-mono text-xs text-muted-ink">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(RECOMMENDATIONS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="relative mt-10 min-h-[22rem] sm:min-h-[20rem] lg:min-h-[24rem]">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -left-2 font-serif text-[10rem] leading-none text-signal/20 sm:-top-16 sm:text-[16rem]"
          >
            “
          </span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={rec.name}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative"
            >
              <p className="max-w-5xl font-serif text-3xl leading-[1.15] text-bone sm:text-5xl lg:text-6xl">
                {rec.quote}
              </p>
              <footer className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.16em] text-muted-ink uppercase">
                <span className="text-bone">{rec.name}</span>
                <span>
                  {rec.role} · {rec.company}
                </span>
                <span className="tracking-normal normal-case italic">
                  {rec.relationship}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* People tabs */}
        <div
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3"
          role="tablist"
          aria-label="Recommendations"
        >
          {RECOMMENDATIONS.map((r, i) => (
            <div
              key={r.name}
              className={cn(
                "group relative flex items-center gap-4 overflow-hidden rounded-md border p-4 transition-colors duration-300",
                i === index
                  ? "border-line-strong bg-ink-2"
                  : "border-line hover:border-line-strong"
              )}
            >
              <button
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className="flex min-w-0 flex-1 items-center gap-4 text-left after:absolute after:inset-0"
              >
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line-strong">
                  <Image
                    src={withBasePath(r.photo)}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-bone">
                    {r.name}
                  </span>
                  <span className="block truncate text-xs text-muted-ink">
                    {r.company}
                  </span>
                </span>
              </button>
              <a
                href={r.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${r.name} on LinkedIn`}
                className="relative z-10 grid h-8 w-8 place-items-center rounded-full border border-line text-muted-ink transition-colors hover:border-signal hover:text-signal"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              {i === index && !reduceMotion && (
                <motion.span
                  key={`${index}-${paused}`}
                  className="absolute bottom-0 left-0 h-[2px] bg-signal"
                  initial={{ width: "0%" }}
                  animate={{ width: paused ? "0%" : "100%" }}
                  transition={{
                    duration: paused ? 0 : INTERVAL / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

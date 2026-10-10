"use client"

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { RevealText } from "@/src/components/motion/reveal-text"
import { SectionLabel } from "@/src/components/section-label"
import { TIMELINE } from "@/src/config/constants"
import { cn } from "@/src/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

export const Changelog = () => {
  const listRef = useRef<HTMLOListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 60%", "end 60%"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index))
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    itemRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const current = TIMELINE[active]

  return (
    <section
      id="experience"
      className="relative border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:mb-20 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>Experience</SectionLabel>
            <h2 className="mt-5 text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-bone sm:text-7xl lg:text-8xl">
              <RevealText text="The" />
              <RevealText
                text="changelog."
                className="font-serif font-normal text-signal italic"
                delay={0.1}
              />
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-ink">
            From a 4-person blockchain payments startup to four years at Push —
            growing from junior frontend dev to shipping full-stack products on
            our own L1.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Sticky year counter */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative h-[13rem] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={`${current.year}-${active}`}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute top-0 left-0 block text-[13rem] leading-none font-semibold tracking-[-0.07em] text-bone tabular-nums"
                  >
                    {current.year}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <span className="font-mono text-[11px] tracking-[0.2em] text-signal uppercase">
                  v{TIMELINE.length - active}.0
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="mt-4"
                >
                  <p className="text-3xl font-semibold tracking-tight text-bone">
                    {current.company}
                  </p>
                  <p className="mt-1 font-serif text-2xl text-muted-ink italic">
                    {current.role}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Entries */}
          <div className="relative lg:col-span-7">
            <div className="absolute top-0 bottom-0 left-[7px] w-px bg-line" />
            <motion.div
              style={{ scaleY: progress }}
              className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-signal"
            />
            <ol ref={listRef} className="space-y-4">
              {TIMELINE.map((entry, i) => (
                <li
                  key={`${entry.year}-${entry.company}-${entry.role}`}
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  data-index={i}
                  className="relative pl-10"
                >
                  <span
                    className={cn(
                      "absolute top-8 left-0 h-[15px] w-[15px] rounded-full border-2 transition-colors duration-500",
                      i <= active
                        ? "border-signal bg-signal"
                        : "border-line-strong bg-ink"
                    )}
                  />
                  <div
                    className={cn(
                      "rounded-md border p-6 transition-all duration-500 sm:p-8",
                      i === active
                        ? "border-line-strong bg-ink-2"
                        : "border-transparent opacity-45"
                    )}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-signal uppercase lg:hidden">
                        {entry.year}
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-muted-ink uppercase">
                        {entry.period}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-bone sm:text-3xl">
                      {entry.role}
                      <span className="font-serif font-normal text-muted-ink italic">
                        {" "}
                        @ {entry.company}
                      </span>
                    </h3>
                    <ul className="mt-5 space-y-2.5">
                      {entry.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-3 text-[15px] leading-relaxed text-bone/75"
                        >
                          <span className="mt-2.5 h-1 w-3 shrink-0 bg-signal/70" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

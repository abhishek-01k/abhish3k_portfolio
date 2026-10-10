"use client"

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { RevealText } from "@/src/components/motion/reveal-text"
import { SectionLabel } from "@/src/components/section-label"
import { PROJECTS } from "@/src/config/constants"
import { getProjectHref, type Project } from "../project-utils"
import { ProjectMedia } from "./project-media"

const FEATURED = ["Ramenfi", "Omnitutor"]
const EASE = [0.16, 1, 0.3, 1] as const

const featured = FEATURED.map((t) =>
  PROJECTS.find((p) => p.title === t)
).filter((p): p is Project => Boolean(p))
const ledger = PROJECTS.filter((p) => !FEATURED.includes(p.title))

const indexOf = (p: Project) => String(PROJECTS.indexOf(p) + 1).padStart(2, "0")

/* ── Project card ─────────────────────────────────────────── */

export const ProjectCard = ({
  project,
  tall,
}: {
  project: Project
  tall?: boolean
}) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-8%", "8%"]
  )

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <Link
        ref={ref}
        href={getProjectHref(project)}
        data-cursor="View"
        className="group block"
      >
        <div
          className={`relative overflow-hidden rounded-md border border-line bg-ink-2 ${
            tall
              ? "aspect-[4/5] lg:aspect-[5/6]"
              : "aspect-[4/5] lg:aspect-[4/3]"
          }`}
        >
          <motion.div
            style={{ y }}
            className="absolute inset-x-0 -inset-y-[10%]"
          >
            <ProjectMedia
              project={project}
              className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
          <div className="absolute top-4 right-4 left-4 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-bone/80 uppercase">
            <span className="rounded-full border border-line-strong bg-ink/60 px-3 py-1 backdrop-blur">
              #{indexOf(project)} · {project.category}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-signal px-3 py-1 text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" /> Live
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <h3 className="text-4xl font-semibold tracking-[-0.04em] text-bone sm:text-6xl">
              {project.title}
            </h3>
            <ul className="mt-4 max-w-md space-y-1.5 text-sm text-bone/70">
              {project.bullets.slice(0, 2).map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── Ledger (all other projects) ───────────────────────────── */

const Ledger = () => {
  const [hovered, setHovered] = useState<Project | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 })

  // Rows slide out from under a still cursor while scrolling; drop the preview.
  useEffect(() => {
    if (!hovered) return
    const clear = () => setHovered(null)
    window.addEventListener("scroll", clear, { passive: true, once: true })
    return () => window.removeEventListener("scroll", clear)
  }, [hovered])

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX)
        y.set(e.clientY)
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <div className="grid grid-cols-[3rem_1fr_auto] gap-4 border-b border-line pb-3 font-mono text-[10px] tracking-[0.2em] text-muted-ink uppercase sm:grid-cols-[4rem_1.2fr_1fr_2fr_auto]">
        <span>#</span>
        <span>Project</span>
        <span className="hidden sm:block">Category</span>
        <span className="hidden sm:block">What it does</span>
        <span className="text-right">Status</span>
      </div>

      <ul>
        {ledger.map((project, i) => (
          <motion.li
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
          >
            <Link
              href={getProjectHref(project)}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return
                x.jump(e.clientX)
                y.jump(e.clientY)
                sx.jump(e.clientX)
                sy.jump(e.clientY)
                setHovered(project)
              }}
              className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-5 sm:grid-cols-[4rem_1.2fr_1fr_2fr_auto] sm:py-6"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <span className="relative font-mono text-xs text-muted-ink">
                {indexOf(project)}
              </span>
              <span className="relative text-2xl font-semibold tracking-[-0.03em] text-bone transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                {project.title}
              </span>
              <span className="relative hidden font-mono text-[11px] tracking-[0.16em] text-muted-ink uppercase sm:block">
                {project.category}
              </span>
              <span className="relative hidden text-sm text-muted-ink sm:line-clamp-1">
                {project.bullets[0]}
              </span>
              <span className="relative flex items-center justify-end gap-3">
                <span className="hidden font-mono text-[10px] tracking-[0.2em] text-signal uppercase md:inline">
                  ● confirmed
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-bone transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Floating preview that follows the cursor (desktop only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.title}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative translate-x-8 -translate-y-1/2 overflow-hidden rounded-md border border-line-strong bg-ink-2 shadow-2xl"
              style={{ width: 360, height: 230 }}
            >
              <ProjectMedia project={hovered} sizes="360px" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export const WorkSection = () => (
  <section id="work" className="relative py-24 sm:py-32">
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 lg:flex-row lg:items-end">
        <div>
          <SectionLabel>Work</SectionLabel>
          <h2 className="mt-5 text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-bone sm:text-7xl lg:text-8xl">
            <RevealText text="Things I’ve" />
            <RevealText
              text="shipped."
              className="font-serif font-normal text-signal italic"
              delay={0.12}
            />
          </h2>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted-ink">
          DEXes, wallets, AI tutors, explorers and dev tools — each one taken
          from a blank repo to real users. Every entry below is live.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <ProjectCard project={featured[0]} />
        </div>
        <div className="lg:col-span-5 lg:mt-32">
          <ProjectCard project={featured[1]} tall />
        </div>
      </div>

      <div className="mt-20 sm:mt-28">
        <div className="mb-6 flex items-end justify-between">
          <h3 className="font-serif text-3xl text-bone italic sm:text-4xl">
            The full ledger
          </h3>
          <Link
            href="/projects"
            className="font-mono text-[11px] tracking-[0.2em] text-muted-ink uppercase underline-offset-4 hover:text-bone hover:underline"
          >
            All projects →
          </Link>
        </div>
        <Ledger />
      </div>
    </div>
  </section>
)

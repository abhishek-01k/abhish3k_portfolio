"use client"

import Image from "next/image"
import Link from "next/link"
import type { CSSProperties } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

import { PROJECTS } from "@/src/config/constants"

// Featured projects in display order
const FEATURED_TITLES = [
  "Ramenfi",
  "Omnitutor",
  "Push Wallet",
  "Push Faucet",
  "Yield Farming V2",
]
const PREVIEW_ROWS = [2, 3]

export const ProjectsPreview = () => {
  const featuredProjects = useMemo(
    () =>
      FEATURED_TITLES.map((title) => PROJECTS.find((p) => p.title === title)!).filter(
        Boolean
      ),
    []
  )

  const rows = useMemo(() => {
    return PREVIEW_ROWS.map((size, rowIndex) => {
      const start = PREVIEW_ROWS.slice(0, rowIndex).reduce((total, rowSize) => total + rowSize, 0)
      const slice = featuredProjects.slice(start, start + size)
      return slice
    }).filter((row) => row.length > 0)
  }, [featuredProjects])

  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorFrame = useRef<number | null>(null)
  const cursorPosition = useRef({ x: 0, y: 0 })
  const [isCursorActive, setIsCursorActive] = useState(false)

  useEffect(
    () => () => {
      if (cursorFrame.current !== null) cancelAnimationFrame(cursorFrame.current)
    },
    []
  )

  const moveCursor = (x: number, y: number) => {
    cursorPosition.current = { x, y }
    if (cursorFrame.current !== null) return
    cursorFrame.current = requestAnimationFrame(() => {
      cursorFrame.current = null
      cursorRef.current?.style.setProperty(
        "transform",
        `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0) translate(-50%, -50%)`
      )
    })
  }

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden border-t border-neutral-800 bg-[#0e0e0e] text-white"
      onMouseMove={(e) => moveCursor(e.clientX, e.clientY)}
      onMouseLeave={() => setIsCursorActive(false)}
    >
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-50 hidden items-center justify-center rounded-full border border-white/35 bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-black shadow-2xl transition-opacity duration-150 md:flex ${
          isCursorActive ? "opacity-100" : "opacity-0"
        }`}
      >
        View
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-8 flex items-end justify-between gap-6 px-1 sm:mb-10 lg:mb-12">
          <div className="flex flex-col gap-3">
            <span className="self-start border border-[#e64a3b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#e64a3b]">
              {"// Projects"}
            </span>
            <h2
              className="font-bold leading-[1.06] tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Things I&apos;ve built.
            </h2>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="hidden font-mono text-sm text-neutral-600 sm:block">
              {String(featuredProjects.length).padStart(2, "0")} projects
            </span>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border border-neutral-700 px-3 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-[#e64a3b]/60 hover:text-white sm:px-5 sm:py-3 sm:text-sm"
            >
              View all projects
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {rows.map((row, rowIndex) => (
            <div
              key={`preview-row-${rowIndex}`}
              className="grid grid-cols-1 gap-4 md:auto-rows-[minmax(360px,42vw)] md:grid-cols-[repeat(var(--project-row-size),minmax(0,1fr))] lg:auto-rows-[minmax(420px,34vw)]"
              style={{ "--project-row-size": row.length } as CSSProperties}
            >
              {row.map((project, index) => {
                const globalIndex = PREVIEW_ROWS.slice(0, rowIndex).reduce(
                  (t, s) => t + s,
                  0
                ) + index
                return (
                  <ProjectTile
                    key={project.title}
                    project={project}
                    index={globalIndex}
                    className={globalIndex >= 3 ? "hidden md:block" : undefined}
                    onPointerEnter={() => setIsCursorActive(true)}
                    onPointerLeave={() => setIsCursorActive(false)}
                  />
                )
              })}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

interface Project {
  title: string
  bullets: string[]
  github: string
  live: string | null
  image: string
  category: string
}

const ProjectTile = ({
  project,
  index,
  className,
  onPointerEnter,
  onPointerLeave,
}: {
  project: Project
  index: number
  className?: string
  onPointerEnter: () => void
  onPointerLeave: () => void
}) => {
  const href = project.live ?? project.github
  const isVideo = /\.(mov|mp4)$/i.test(project.image)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`${className ?? ""} group relative min-h-[360px] cursor-none overflow-hidden bg-black outline-none ring-1 ring-white/10 transition duration-500 hover:ring-white/30 focus-visible:ring-2 focus-visible:ring-[#e64a3b] md:min-h-0`}
      aria-label={`View ${project.title}`}
    >
      {isVideo ? (
        <video
          src={project.image}
          className="absolute inset-0 h-full w-full object-contain opacity-80 grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain opacity-80 grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/25 to-black/92 transition duration-500 group-hover:from-black/5 group-hover:via-black/10 group-hover:to-black/82" />
      <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-transparent" />

      <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 sm:left-5 sm:right-5 sm:top-5">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{project.category}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-8">
        <div className="-m-5 max-w-2xl rounded-2xl border border-transparent bg-black/0 p-5 transition duration-300 group-hover:border-white/15 group-hover:bg-black/72 group-hover:shadow-2xl group-hover:backdrop-blur-md group-focus-visible:border-white/15 group-focus-visible:bg-black/72 group-focus-visible:shadow-2xl group-focus-visible:backdrop-blur-md">
          <h3 className="max-w-[11ch] text-xl font-bold leading-[0.9] tracking-[-0.06em] text-[#e64a3b] transition-colors duration-300 sm:text-3xl lg:text-4xl lg:text-white lg:group-hover:text-[#e64a3b]">
            {project.title}
          </h3>
          <ul className="mt-4 flex max-w-xl list-disc flex-col gap-1.5 pl-4 text-sm leading-relaxed text-white/72 transition duration-300 group-hover:translate-y-0 group-hover:text-white md:translate-y-2 md:opacity-0 md:group-hover:opacity-100">
            {project.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </a>
  )
}

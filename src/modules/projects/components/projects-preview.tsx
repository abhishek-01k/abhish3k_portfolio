"use client"

import Image from "next/image"
import Link from "next/link"
import type { CSSProperties } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from "@/src/components/scroll-reveal"
import { PROJECTS } from "@/src/config/constants"
import { getProjectHref } from "../project-utils"

const FEATURED_TITLES = [
  "Ramenfi",
  "Omnitutor",
  "Push Wallet",
  "Push Faucet",
  "Yield Farming V2",
]
const MOBILE_PREVIEW_ROWS  = [2]
const TABLET_PREVIEW_ROWS  = [3]
const DESKTOP_PREVIEW_ROWS = [2, 3]

type Project = (typeof PROJECTS)[number]
type ProjectRow = { project: Project; index: number }[]

const buildPreviewRows = (projects: Project[], rowSizes: number[]) =>
  rowSizes
    .map((size, rowIndex) => {
      const start = rowSizes
        .slice(0, rowIndex)
        .reduce((sum, s) => sum + s, 0)
      return projects.slice(start, start + size).map((project, i) => ({
        project,
        index: start + i,
      }))
    })
    .filter((row) => row.length > 0)

export const ProjectsPreview = () => {
  const featured = useMemo(
    () =>
      FEATURED_TITLES.map((t) => PROJECTS.find((p) => p.title === t)!).filter(
        Boolean
      ),
    []
  )

  const mobileRows  = useMemo(() => buildPreviewRows(featured, MOBILE_PREVIEW_ROWS),  [featured])
  const tabletRows  = useMemo(() => buildPreviewRows(featured, TABLET_PREVIEW_ROWS),  [featured])
  const desktopRows = useMemo(() => buildPreviewRows(featured, DESKTOP_PREVIEW_ROWS), [featured])

  const cursorRef      = useRef<HTMLDivElement>(null)
  const cursorFrame    = useRef<number | null>(null)
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
      {/* Custom cursor — desktop only */}
      <div
        ref={cursorRef}
        className={`project-view-cursor-radius pointer-events-none fixed left-0 top-0 z-50 hidden items-center justify-center rounded-full! border border-white/35 bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-black shadow-2xl transition-opacity duration-150 lg:flex ${
          isCursorActive ? "opacity-100" : "opacity-0"
        }`}
      >
        View
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

        {/* ── Header ────────────────────────────────────── */}
        <ScrollReveal className="mb-8 flex flex-col justify-between gap-6 sm:mb-10 sm:flex-row sm:items-end lg:mb-12">
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

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-sm text-neutral-600 sm:block">
              {String(featured.length).padStart(2, "0")} projects
            </span>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border border-neutral-700 px-3 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-[#e64a3b]/60 hover:text-white sm:px-5 sm:py-3 sm:text-sm"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* ── Mobile grid ───────────────────────────────── */}
        <div className="md:hidden">
          <ProjectRows
            rows={mobileRows}
            isDesktop={false}
            rowKeyPrefix="mobile"
            onPointerEnter={() => setIsCursorActive(true)}
            onPointerLeave={() => setIsCursorActive(false)}
          />
        </div>

        {/* ── Tablet grid ───────────────────────────────── */}
        <div className="hidden md:block lg:hidden">
          <ProjectRows
            rows={tabletRows}
            isDesktop={false}
            rowKeyPrefix="tablet"
            onPointerEnter={() => setIsCursorActive(true)}
            onPointerLeave={() => setIsCursorActive(false)}
          />
        </div>

        {/* ── Desktop grid ──────────────────────────────── */}
        <div className="hidden lg:block">
          <ProjectRows
            rows={desktopRows}
            isDesktop
            rowKeyPrefix="desktop"
            onPointerEnter={() => setIsCursorActive(true)}
            onPointerLeave={() => setIsCursorActive(false)}
          />
        </div>

      </div>
    </section>
  )
}

const ProjectRows = ({
  rows,
  isDesktop,
  rowKeyPrefix,
  onPointerEnter,
  onPointerLeave,
}: {
  rows: ProjectRow[]
  isDesktop: boolean
  rowKeyPrefix: string
  onPointerEnter: () => void
  onPointerLeave: () => void
}) => (
  <ScrollStagger className="space-y-4">
    {rows.map((row, rowIndex) => (
      <div
        key={`${rowKeyPrefix}-row-${rowIndex}`}
        className="grid grid-cols-1 gap-4 md:auto-rows-[minmax(360px,42vw)] md:grid-cols-[repeat(var(--project-row-size),minmax(0,1fr))] lg:auto-rows-[480px] xl:auto-rows-[440px] 2xl:auto-rows-[400px]"
        style={{ "--project-row-size": row.length } as CSSProperties}
      >
        {row.map(({ project, index }) => (
          <ScrollStaggerItem key={project.title} className="flex min-h-[360px] md:min-h-0">
            <ProjectTile
              project={project}
              index={index}
              isDesktop={isDesktop}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
            />
          </ScrollStaggerItem>
        ))}
      </div>
    ))}
  </ScrollStagger>
)

const ProjectTile = ({
  project,
  index,
  isDesktop,
  onPointerEnter,
  onPointerLeave,
}: {
  project: Project
  index: number
  isDesktop: boolean
  onPointerEnter: () => void
  onPointerLeave: () => void
}) => {
  const detailHref = getProjectHref(project)
  const isVideo    = /\.(mov|mp4)$/i.test(project.image)

  const handleClick = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) {
      e.preventDefault()
      window.open(project.live ?? project.github, "_blank", "noopener,noreferrer")
    }
  }

  const mediaClass = isDesktop
    ? "absolute inset-0 h-full w-full object-contain opacity-100 transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale"
    : "absolute inset-0 h-full w-full object-contain opacity-100 transition duration-700 ease-out group-hover:scale-[1.02]"

  return (
    <Link
      href={detailHref}
      onClick={handleClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`group relative h-full min-h-[360px] flex-1 overflow-hidden outline-none ring-1 ring-white/10 transition duration-500 hover:ring-white/30 focus-visible:ring-2 focus-visible:ring-[#e64a3b] md:min-h-0 ${
        isDesktop ? "cursor-none bg-black" : "cursor-pointer bg-neutral-950"
      }`}
      aria-label={`View ${project.title}`}
    >
      {/* Media */}
      {isVideo ? (
        <video
          src={project.image}
          className={mediaClass}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      ) : (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={mediaClass}
        />
      )}

      {/* Overlay */}
      {isDesktop ? (
        <>
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/25 to-black/92 transition duration-500 group-hover:from-black/5 group-hover:via-black/10 group-hover:to-black/82" />
          <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/0 to-black/50" />
      )}

      {/* Top meta */}
      <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 sm:left-5 sm:right-5 sm:top-5">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{project.category}</span>
      </div>

      {/* Bottom: title + one-liner */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-8">
        <div
          className={
            isDesktop
              ? "-m-5 max-w-2xl rounded-2xl border border-transparent bg-black/0 p-5 transition duration-300 group-hover:border-white/15 group-hover:bg-black/72 group-hover:shadow-2xl group-hover:backdrop-blur-md"
              : "-m-3 max-w-xl rounded-2xl border border-white/10 bg-[#101010]/82 p-4 shadow-xl backdrop-blur-sm sm:-m-4 sm:p-5"
          }
        >
          <h3
            className={
              isDesktop
                ? "max-w-[14ch] text-xl font-bold leading-[0.9] tracking-[-0.05em] text-[#e64a3b] transition-colors duration-300 sm:text-3xl lg:text-4xl lg:text-white lg:group-hover:text-[#e64a3b]"
                : "max-w-[14ch] text-xl font-bold leading-[0.95] tracking-[-0.05em] text-[#e64a3b] sm:text-2xl"
            }
          >
            {project.title}
          </h3>
          <p
            className={
              isDesktop
                ? "mt-2 line-clamp-1 max-w-md text-sm leading-relaxed text-white/70 transition duration-300 group-hover:text-white/90"
                : "mt-2 line-clamp-1 max-w-md text-xs leading-relaxed text-white/70 sm:text-sm"
            }
          >
            {project.bullets[0]}
          </p>
        </div>
      </div>
    </Link>
  )
}

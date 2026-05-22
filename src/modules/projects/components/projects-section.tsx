"use client"

import type { CSSProperties } from "react"
import { useEffect, useMemo, useRef, useState } from "react"

import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from "@/src/components/scroll-reveal"
import { PROJECTS } from "@/src/config/constants"
import ProjectTile from "./project-title"

const ROWS = [2, 3, 2, 3]
const ROW_STARTS = ROWS.map((_, index) =>
  ROWS.slice(0, index).reduce((total, size) => total + size, 0)
)

export const ProjectsSection = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorFrame = useRef<number | null>(null)
  const cursorPosition = useRef({ x: 0, y: 0 })
  const [isCursorActive, setIsCursorActive] = useState(false)

  const rows = useMemo(
    () =>
      ROWS.map((size, index) => {
        const start = ROW_STARTS[index]
        return PROJECTS.slice(start, start + size)
      }).filter((row) => row.length > 0),
    []
  )

  useEffect(
    () => () => {
      if (cursorFrame.current !== null) {
        cancelAnimationFrame(cursorFrame.current)
      }
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
      onMouseMove={(event) =>
        moveCursor(event.clientX, event.clientY)
      }
      onMouseLeave={() => setIsCursorActive(false)}
    >
      <div
        ref={cursorRef}
        className={`project-view-cursor-radius pointer-events-none fixed left-0 top-0 z-50 hidden items-center justify-center rounded-full! border border-white/35 bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-black shadow-2xl transition-opacity duration-150 lg:flex ${
          isCursorActive ? "opacity-100" : "opacity-0"
        }`}
      >
        View
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <ScrollReveal className="mb-8 flex items-end justify-between gap-6 px-1 text-white sm:mb-10 lg:mb-12">
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
          <span className="mb-1 hidden font-mono text-sm text-neutral-600 sm:block">
            {String(PROJECTS.length).padStart(2, "0")} projects
          </span>
        </ScrollReveal>

        <ScrollStagger className="space-y-4">
          {rows.map((row, rowIndex) => (
            <div
              key={`project-row-${rowIndex}`}
              className="grid grid-cols-1 gap-4 md:grid-cols-[repeat(var(--project-row-size),minmax(0,1fr))] lg:auto-rows-[minmax(420px,34vw)]"
              style={{ "--project-row-size": row.length } as CSSProperties}
            >
              {row.map((project) => (
                <ScrollStaggerItem key={project.title} className="flex min-h-[420px] lg:min-h-0">
                  <ProjectTile
                    project={project}
                    onPointerEnter={() => setIsCursorActive(true)}
                    onPointerLeave={() => setIsCursorActive(false)}
                  />
                </ScrollStaggerItem>
              ))}
            </div>
          ))}
        </ScrollStagger>
      </div>
    </section>
  )
}
"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowLeft } from "lucide-react"

import { TIMELINE } from "@/src/config/constants"

type TimelineEntry = (typeof TIMELINE)[number]

// ── Card ─────────────────────────────────────────────────────
const TimelineCard = ({
  item,
  index,
  isLeft,
  cardRef,
}: {
  item: TimelineEntry
  index: number
  isLeft: boolean
  // ref for the visual card shell — parent drives highlight via DOM
  cardRef: (el: HTMLDivElement | null) => void
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    // Outer div: entrance animation (translate + opacity)
    <div
      ref={wrapperRef}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-x-0 opacity-100"
          : isLeft
            ? "-translate-x-8 opacity-0"
            : "translate-x-8 opacity-0"
      }`}
    >
      {/* Inner div: visual card — highlight driven by scroll handler via cardRef */}
      <div
        ref={cardRef}
        className="border bg-[#111] p-6 transition-all duration-500 sm:p-7"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#e64a3b] uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-3 bg-neutral-700" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
            {item.period}
          </span>
          {index === 0 && (
            <>
              <span className="h-px w-3 bg-neutral-700" />
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e64a3b]" />
                <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
                  Current
                </span>
              </span>
            </>
          )}
        </div>

        <h3 className="text-xl font-bold tracking-tight text-white">{item.company}</h3>
        <p className="mt-1 text-sm font-semibold text-[#e64a3b]">{item.role}</p>

        <div className="my-4 h-px bg-gradient-to-r from-[#e64a3b]/40 via-white/10 to-transparent" />

        <ul className="space-y-2.5">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-neutral-400">
              <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e64a3b]" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ── Main timeline ────────────────────────────────────────────
export const ExperienceTimeline = () => {
  const bodyRef  = useRef<HTMLDivElement>(null)
  const fillRef  = useRef<HTMLDivElement>(null)
  const dotRefs  = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const n = TIMELINE.length

    const onScroll = () => {
      const body = bodyRef.current
      const fill = fillRef.current
      if (!body || !fill) return

      const rect      = body.getBoundingClientRect()
      const scrollable = Math.max(rect.height - window.innerHeight, 1)
      const p          = Math.max(0, Math.min(1, -rect.top / scrollable))

      // ── Fill line ─────────────────────────────────────────
      // Cap at the centre of the last dot so the line never
      // overshoots into the bottom padding below the final entry.
      const lastDot   = dotRefs.current[n - 1]
      const maxFillPx = lastDot
        ? lastDot.getBoundingClientRect().top
          + lastDot.offsetHeight / 2
          - rect.top          // rect.top = bodyRef.getBoundingClientRect().top
        : body.offsetHeight

      fill.style.height = `${Math.min(p * body.offsetHeight, maxFillPx)}px`

      // ── Active card index
      // Each dot/card sits at fraction i/n along the timeline.
      // The "current" card is the last one whose threshold is ≤ p.
      const activeIdx = Math.min(n - 1, Math.floor(p * n))

      // ── Dots ──────────────────────────────────────────────
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return
        const active = p >= i / n
        dot.style.backgroundColor = active ? "#e64a3b" : "#404040"
        dot.style.boxShadow = active
          ? "0 0 0 4px #0e0e0e, 0 0 0 7px rgba(230,74,59,0.3)"
          : "0 0 0 4px #0e0e0e"
      })

      // ── Cards ─────────────────────────────────────────────
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        if (i === activeIdx) {
          // Active: red border + brighter bg + soft glow
          card.style.borderColor     = "rgba(230,74,59,0.5)"
          card.style.backgroundColor = "#161616"
          card.style.boxShadow       = "0 0 0 1px rgba(230,74,59,0.08), 0 8px 40px rgba(230,74,59,0.07)"
          card.style.opacity         = "1"
        } else {
          // Inactive: dim border, standard bg, reduced opacity
          card.style.borderColor     = "rgba(255,255,255,0.08)"
          card.style.backgroundColor = "#111111"
          card.style.boxShadow       = "none"
          card.style.opacity         = "0.45"
        }
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="min-h-screen border-t border-neutral-800 bg-[#0e0e0e] text-white">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 pb-10 pt-12 sm:px-8 sm:pt-16 lg:px-10">
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>

        <span
          className="block border border-[#e64a3b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#e64a3b]"
          style={{ width: "fit-content" }}
        >
          {"// Experience"}
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Where I&apos;ve worked.
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
          4+ years across web3, AI, and consumer products — from junior to full-stack.
        </p>
      </div>

      {/* ── Entries ────────────────────────────────────────── */}
      <div
        ref={bodyRef}
        className="relative mx-auto max-w-5xl px-6 pb-24 sm:px-8 lg:px-10"
      >
        {/* Background line */}
        <div className="absolute bottom-0 left-3 top-0 w-px bg-neutral-800 md:left-1/2 md:-translate-x-px" />
        {/* Scroll-driven fill line */}
        <div
          ref={fillRef}
          className="absolute left-3 top-0 w-px bg-[#e64a3b] md:left-1/2 md:-translate-x-px"
          style={{ height: "0%", transition: "none" }}
        />

        {TIMELINE.map((item, index) => {
          const isLeft = index % 2 === 0

          return (
            <div
              key={`${item.company}-${item.role}-${item.year}`}
              className="relative grid grid-cols-[24px_1fr] gap-x-5 py-6 md:grid-cols-[1fr_56px_1fr] md:gap-x-8 md:py-10"
            >
              {/* Dot + year */}
              <div className="col-start-1 flex flex-col items-center pt-1 md:col-start-2 md:pt-4">
                <div
                  ref={(el) => { dotRefs.current[index] = el }}
                  className="relative z-10 h-3 w-3 rounded-full transition-all duration-500 md:h-4 md:w-4"
                  style={{ backgroundColor: "#404040", boxShadow: "0 0 0 4px #0e0e0e" }}
                />
                <span className="mt-2 hidden font-mono text-[10px] tracking-wider text-neutral-600 md:block">
                  {item.year}
                </span>
              </div>

              {/* Card */}
              <div
                className={`col-start-2 md:row-start-1 md:self-start ${
                  isLeft ? "md:col-start-1 md:pr-2" : "md:col-start-3 md:pl-2"
                }`}
              >
                <TimelineCard
                  item={item}
                  index={index}
                  isLeft={isLeft}
                  cardRef={(el) => { cardRefs.current[index] = el }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const ENTRIES = [
  {
    index: "01",
    year: 2026,
    company: "Push Chain",
    role: "Full Stack Developer",
    period: "Jun 2022 – Present",
    current: true,
    bullets: [
      "Built Ramenfi, the First Onchain Dex for Push Chain supporting 1000+ MAUs",
      "Designed multi-wallet identity across chains for thousands of active users.",
      "Built YieldFarming V2 for $16M+ TVL and 12,000+ Uni-V2 tokens.",
    ],
  },
  {
    index: "02",
    year: 2022,
    company: "Workspaceio",
    role: "React Developer",
    period: "Mar 2022 – Jun 2022",
    current: false,
    bullets: [
      "Shipped 3 customer-facing features end-to-end under a tight 10 week sprint.",
      "Worked in a cross-functional team of 5-8 engineers on client-facing projects.",
      "Owned frontend architecture across UI design, components, APIs, and Next.js.",
    ],
  },
  {
    index: "03",
    year: 2021,
    company: "BlockPay",
    role: "Blockchain Developer",
    period: "Dec 2021 – Mar 2022",
    current: false,
    bullets: [
      "Collaborated with a 4-member startup building a blockchain payment system.",
      "Developed authentication, registration flows, and the MVP UI.",
      "Implemented real-time transaction status using WebSockets.",
    ],
  },
]

const CARD_GAP = 16

const CardContent = ({
  e,
  isActive,
}: {
  e: (typeof ENTRIES)[0]
  isActive: boolean
}) => (
  <div
    className="relative grow overflow-hidden border bg-[#111] p-6 sm:p-8 transition-colors duration-300"
    style={{ borderColor: isActive ? "rgba(230,74,59,0.3)" : "rgb(38,38,38)" }}
  >
    {/* Decorative year watermark */}
    <div className="pointer-events-none absolute right-4 bottom-0 select-none text-[5rem] font-black leading-none tracking-[-0.08em] text-white/4 sm:text-[7rem]">
      {e.year}
    </div>
    {/* Red glow */}
    <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-[#e64a3b]/8 blur-3xl" />

    <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-10">
      {/* Left — identity */}
      <div className="flex flex-col">
        <span className="mb-4 font-mono text-[10px] tracking-[0.3em] text-[#e64a3b] uppercase">
          {e.year}
        </span>

        <h3 className="text-3xl font-black leading-none tracking-[-0.04em] text-white sm:text-4xl">
          {e.company}
        </h3>
        <p className="mt-3 text-base font-semibold text-[#e64a3b]">{e.role}</p>
        <p className="mt-2 font-mono text-[11px] tracking-[0.28em] text-neutral-500 uppercase">
          {e.period}
        </p>
      </div>

      {/* Right — bullets */}
      <div className="flex flex-col">
        <div className="mb-4 h-px bg-linear-to-r from-[#e64a3b]/40 via-white/10 to-transparent lg:hidden" />
        <ul className="space-y-3">
          {e.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-sm leading-relaxed text-neutral-400"
            >
              <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e64a3b]" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)

export const ExperiencePreview = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [offset, setOffset] = useState(0)
  const desktopWrapperRef = useRef<HTMLDivElement>(null)

  const computeOffset = useCallback((index: number) => {
    const w = desktopWrapperRef.current?.clientWidth ?? 0
    return index * (w * 0.8 + CARD_GAP)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(ENTRIES.length - 1, index))
      setActiveIndex(next)
      setOffset(computeOffset(next))
    },
    [computeOffset]
  )

  useEffect(() => {
    const onResize = () => setOffset(computeOffset(activeIndex))
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [activeIndex, computeOffset])

  return (
    <section
      id="experience"
      className="border-t border-neutral-800 bg-[#0e0e0e] text-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-18">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <span className="self-start border border-[#e64a3b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#e64a3b]">
              {"// Experience"}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Where I&apos;ve worked.
            </h2>
          </div>

          <Link
            href="/experience"
            className="group inline-flex items-center gap-2 border border-neutral-700 px-4 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-[#e64a3b]/60 hover:text-white"
          >
            Full experience
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── Mobile / Tablet: native scroll-snap carousel ── */}
        <div
          className="lg:hidden -mx-6 sm:-mx-8 overflow-x-auto [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-pl-6 sm:scroll-pl-8"
          style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          <div className="flex gap-4 px-6 sm:px-8">
            {ENTRIES.map((e) => (
              <div
                key={e.company}
                className="shrink-0 snap-start w-[calc(100vw-3.5rem)] sm:w-[calc(100vw-5rem)] flex flex-col"
              >
                <CardContent e={e} isActive />
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop: JS-controlled carousel ──────────── */}
        <div ref={desktopWrapperRef} className="hidden overflow-hidden lg:block">
          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {ENTRIES.map((e, i) => (
              <div
                key={e.company}
                className="flex min-h-[360px] w-[80%] shrink-0 flex-col transition-opacity duration-500 xl:min-h-[400px]"
                style={{ opacity: i === activeIndex ? 1 : 0.4 }}
              >
                <CardContent e={e} isActive={i === activeIndex} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Navigation — desktop only ─────────────────── */}
        <div className="hidden lg:flex mt-5 items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center border border-neutral-700 text-neutral-400 transition-colors hover:border-[#e64a3b]/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === ENTRIES.length - 1}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center border border-neutral-700 text-neutral-400 transition-colors hover:border-[#e64a3b]/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {ENTRIES.map((e, i) => (
              <button
                key={e.company}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${e.company}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-[#e64a3b]"
                    : "w-2 bg-neutral-700 hover:bg-neutral-500"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

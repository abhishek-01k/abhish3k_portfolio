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
      " Designed multi-wallet connection layer enabling unified on-chain identity across chains, serving thousands of active wallet users.",
      "Architected YieldFarming V2 that handled $16M+ TVL in staked PUSH tokens and 12,000+ Uni-V2 tokens with a sustained 15% APY.",
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

const CARD_GAP = 16 // px — matches gap-4

export const ExperiencePreview = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [offset, setOffset] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const computeOffset = useCallback((index: number) => {
    const w = wrapperRef.current?.clientWidth ?? 0
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

  // Recompute on resize so the offset stays accurate
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
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">

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

        {/* ── Carousel ───────────────────────────────────── */}
        <div ref={wrapperRef} className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {ENTRIES.map((e, i) => (
              <div
                key={e.company}
                className="w-[80%] shrink-0 transition-opacity duration-500"
                style={{ opacity: i === activeIndex ? 1 : 0.4 }}
              >
                <div className="relative h-[380px] overflow-hidden border border-neutral-800 bg-[#111] p-6 sm:p-8 lg:h-[320px]">

                  {/* Decorative year watermark */}
                  <div className="pointer-events-none absolute right-4 bottom-0 select-none text-[5rem] font-black leading-none tracking-[-0.08em] text-white/[0.04] sm:text-[7rem]">
                    {e.year}
                  </div>
                  {/* Red glow */}
                  <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-[#e64a3b]/8 blur-3xl" />

                  <div className="relative z-10 grid h-full gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-10">

                    {/* Left — identity */}
                    <div className="flex flex-col justify-center">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="font-mono text-[10px] tracking-[0.3em] text-[#e64a3b] uppercase">
                          {e.index}
                        </span>
                        {e.current && (
                          <>
                            <span className="h-px w-4 bg-neutral-700" />
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e64a3b]" />
                              <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
                                Current
                              </span>
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-3xl font-black leading-none tracking-[-0.04em] text-white sm:text-4xl">
                        {e.company}
                      </h3>
                      <p className="mt-3 text-base font-semibold text-[#e64a3b]">
                        {e.role}
                      </p>
                      <p className="mt-2 font-mono text-[11px] tracking-[0.28em] text-neutral-500 uppercase">
                        {e.period}
                      </p>
                    </div>

                    {/* Right — bullets */}
                    <div className="flex flex-col justify-center">
                      <div className="mb-4 h-px bg-gradient-to-r from-[#e64a3b]/40 via-white/10 to-transparent lg:hidden" />
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
              </div>
            ))}
          </div>
        </div>

        {/* ── Navigation ─────────────────────────────────── */}
        <div className="mt-5 flex items-center justify-between">
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

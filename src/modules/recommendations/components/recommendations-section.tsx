"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { RECOMMENDATIONS } from "@/src/config/constants"
import RecommendationCard from "./recommendation-card"

const CARD_GAP = 24 // px, matches gap-6

export const RecommendationsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [offset, setOffset] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const computeOffset = useCallback((index: number) => {
    const width = wrapperRef.current?.clientWidth ?? 0
    return index * (width + CARD_GAP)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(RECOMMENDATIONS.length - 1, index))
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
      id="recommendations"
      className="w-full overflow-hidden bg-[#f7f4ee] px-5 py-12 text-stone-950 sm:px-6 lg:py-18"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-right">
          <span className="border border-[#e64a3b] px-2 py-0.5 text-[10px] font-bold tracking-[0.35em] text-[#e64a3b] uppercase">
            {"// Recommendations"}
          </span>
        </div>
        <div className="mb-7 flex max-w-xl flex-col gap-3 sm:mb-8">
          <h2 className="mt-5 text-3xl leading-none font-black tracking-tighter text-stone-950 sm:text-4xl lg:text-5xl">
            What my co-workers say about me.
          </h2>
        </div>
        <div className="mx-auto mb-6 flex max-w-sm justify-center">
          <div className="flex -space-x-3">
            {RECOMMENDATIONS.map((rec) => (
              <div
                key={rec.name}
                className="recommendation-avatar-radius relative size-12 overflow-hidden rounded-full border-2 border-[#f7f4ee] shadow-sm"
              >
                <Image
                  src={rec.photo}
                  alt={rec.name}
                  fill
                  sizes="48px"
                  className="recommendation-avatar-radius object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] bg-white p-2.5 shadow-[0_22px_54px_rgba(28,25,23,0.12)] sm:rounded-[2rem] sm:p-3">
          <div ref={wrapperRef} className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {RECOMMENDATIONS.map((rec, index) => (
                <div
                  key={rec.name}
                  className="w-full shrink-0 transition-opacity duration-500"
                  style={{ opacity: index === activeIndex ? 1 : 0.35 }}
                >
                  <RecommendationCard rec={rec} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-4">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous recommendation"
              className="flex size-11 items-center justify-center rounded-full bg-stone-950 text-white shadow-[0_12px_24px_rgba(28,25,23,0.18)] transition-colors hover:bg-[#e64a3b] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === RECOMMENDATIONS.length - 1}
              aria-label="Next recommendation"
              className="flex size-11 items-center justify-center rounded-full bg-stone-950 text-white shadow-[0_12px_24px_rgba(28,25,23,0.18)] transition-colors hover:bg-[#e64a3b] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 pb-1">
            {RECOMMENDATIONS.map((rec, index) => (
              <button
                key={rec.name}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to ${rec.name}'s recommendation`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-[#e64a3b]"
                    : "w-2 bg-stone-300 hover:bg-stone-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

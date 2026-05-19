"use client"

import { useEffect, useRef, useState } from "react"

import { TIMELINE } from "@/src/config/constants"

type TimelineEntry = (typeof TIMELINE)[number]
type CompanyGroup = {
  company: string
  period: string
  entries: TimelineEntry[]
}

function buildGroups(): CompanyGroup[] {
  const groups: CompanyGroup[] = []

  for (const entry of TIMELINE) {
    const last = groups[groups.length - 1]
    if (last?.company === entry.company) {
      last.entries.push(entry)
    } else {
      groups.push({
        company: entry.company,
        period: entry.period,
        entries: [entry],
      })
    }
  }

  return groups
}

const GROUPS = buildGroups()

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [pinScrollDistance, setPinScrollDistance] = useState(1600)

  const activeItem = TIMELINE[activeIndex]

  const syncTimelineState = (container: HTMLDivElement) => {
    const maxScroll = container.scrollHeight - container.clientHeight
    const progress = maxScroll > 0 ? container.scrollTop / maxScroll : 0
    const nextIndex = Math.min(
      TIMELINE.length - 1,
      Math.round(progress * (TIMELINE.length - 1))
    )

    setActiveIndex(nextIndex)
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return undefined

    const measure = () => {
      const maxScroll = Math.max(
        container.scrollHeight - container.clientHeight,
        1
      )
      setPinScrollDistance(maxScroll)
      syncTimelineState(container)
    }

    measure()
    window.addEventListener("resize", measure)

    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    const handleWindowScroll = () => {
      const section = sectionRef.current
      const container = scrollRef.current
      if (!section || !container) return

      const sectionTop = section.offsetTop
      const scrollInsideSection = window.scrollY - sectionTop

      if (scrollInsideSection < 0 || scrollInsideSection > pinScrollDistance)
        return

      const maxScroll = container.scrollHeight - container.clientHeight
      const progress =
        pinScrollDistance > 0 ? scrollInsideSection / pinScrollDistance : 0
      container.scrollTop = Math.max(
        0,
        Math.min(maxScroll, progress * maxScroll)
      )
      syncTimelineState(container)
    }

    handleWindowScroll()
    window.addEventListener("scroll", handleWindowScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleWindowScroll)
  }, [pinScrollDistance])

  useEffect(() => {
    const handleWindowWheel = (event: globalThis.WheelEvent) => {
      const section = sectionRef.current
      if (!section) return

      const sectionTop = section.offsetTop
      const sectionEnd = sectionTop + pinScrollDistance
      const currentY = window.scrollY
      const nextY = currentY + event.deltaY
      const isScrollingDown = event.deltaY > 0
      const isScrollingUp = event.deltaY < 0
      const isInsidePinnedRange =
        currentY >= sectionTop && currentY <= sectionEnd
      const willEnterFromAbove =
        isScrollingDown && currentY < sectionTop && nextY >= sectionTop
      const willEnterFromBelow =
        isScrollingUp && currentY > sectionEnd && nextY <= sectionEnd

      if (!isInsidePinnedRange && !willEnterFromAbove && !willEnterFromBelow)
        return

      if (isScrollingDown && currentY >= sectionEnd) return
      if (isScrollingUp && currentY <= sectionTop) return

      event.preventDefault()

      const pinnedY = willEnterFromAbove
        ? sectionTop
        : willEnterFromBelow
          ? sectionEnd
          : Math.max(sectionTop, Math.min(sectionEnd, nextY))

      window.scrollTo({ top: pinnedY })
    }

    window.addEventListener("wheel", handleWindowWheel, { passive: false })

    return () => window.removeEventListener("wheel", handleWindowWheel)
  }, [pinScrollDistance])

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return

    syncTimelineState(container)
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative border-t border-neutral-800 bg-[#0e0e0e] text-white"
      style={{ height: `calc(100vh + ${pinScrollDistance}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 15% 10%, rgba(230,74,59,0.18), transparent 28%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.08), transparent 24%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[72px_72px] opacity-20" />

        <div className="relative mx-auto grid h-full w-full max-w-[1480px] gap-8 lg:grid-cols-[460px_minmax(0,1fr)] lg:gap-12">
          <aside className="h-full w-full lg:w-[460px]">
            <div className="flex h-full flex-col justify-between border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8 lg:p-10">
              <div>
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="border border-[#e64a3b] px-2 py-0.5 text-[10px] font-bold tracking-[0.35em] text-[#e64a3b] uppercase">
                    {"// Experience"}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-neutral-600">
                    {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;
                    {String(TIMELINE.length).padStart(2, "0")}
                  </span>
                </div>

                <p className="mb-4 font-mono text-[10px] tracking-[0.32em] text-neutral-500 uppercase">
                  Currently viewing
                </p>
                <div className="min-h-60">
                  <h2 className="max-w-xl text-xl leading-[0.95] font-bold tracking-[-0.07em] text-white sm:text-2xl md:text-3xl lg:text-4xl">
                    {activeItem.company}
                  </h2>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[#e64a3b] sm:text-xl">
                    {activeItem.role}
                  </p>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.28em] text-neutral-500 uppercase">
                    {activeItem.period}
                  </p>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-3 gap-3">
                  <Stat value={`4+`} label="Years" />
                  <Stat value={`${GROUPS.length}`} label="Companies" />
                  <Stat value={`${TIMELINE.length}`} label="Chapters" />
                </div>

                <div className="mt-10 space-y-3">
                  <p className="font-mono text-[10px] tracking-[0.32em] text-neutral-600 uppercase">
                    Companies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {GROUPS.map((group) => (
                      <span
                        key={group.company}
                        className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                          group.company === activeItem.company
                            ? "border-[#e64a3b]/50 bg-[#e64a3b]/10 text-white"
                            : "border-white/10 bg-black/30 text-neutral-300"
                        }`}
                      >
                        {group.company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-h-0 lg:h-[calc(100vh-4rem)]">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="min-h-[70vh] scrollbar-none overflow-y-auto lg:h-full lg:min-h-0 [&::-webkit-scrollbar]:hidden"
            >
              <div className="space-y-5 pb-8 sm:space-y-7">
                {TIMELINE.map((item, index) => (
                  <ExperienceTimelineCard
                    key={`${item.company}-${item.role}-${item.year}`}
                    item={item}
                    index={index}
                    isActive={index === activeIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
    <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
    <p className="mt-1 font-mono text-[9px] tracking-[0.25em] text-neutral-600 uppercase">
      {label}
    </p>
  </div>
)

const ExperienceTimelineCard = ({
  item,
  index,
  isActive,
}: {
  item: TimelineEntry
  index: number
  isActive: boolean
}) => (
  <article className="group relative">
    <div
      className={`relative overflow-hidden border p-5 transition duration-300 hover:-translate-y-1 hover:border-[#e64a3b]/45 hover:bg-[#141414] sm:p-7 lg:p-8 ${
        isActive
          ? "border-[#e64a3b]/45 bg-[#141414]"
          : "border-white/10 bg-[#111111]/90 opacity-75"
      }`}
    >
      <div
        className={`pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full bg-[#e64a3b]/10 blur-3xl transition duration-500 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
      <div className="pointer-events-none absolute right-5 bottom-0 text-[5rem] leading-none font-bold tracking-[-0.08em] text-white/2.5 select-none sm:text-[7rem]">
        {item.year}
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.28em] uppercase transition-colors ${
                  isActive
                    ? "border-[#e64a3b]/50 bg-[#e64a3b]/10 text-[#e64a3b]"
                    : "border-white/10 bg-black/20 text-neutral-500"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-600 uppercase">
                {item.period}
              </span>
            </div>
            <p className="max-w-md text-sm leading-7 text-neutral-400">
              {item.role} impact highlights
            </p>
          </div>

          <span className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-neutral-500">
            {item.year}
          </span>
        </div>

        <div className="h-px bg-linear-to-r from-[#e64a3b]/45 via-white/10 to-transparent" />

        <ul className="grid gap-3">
          {item.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-sm leading-7 text-neutral-300"
            >
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e64a3b]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </article>
)

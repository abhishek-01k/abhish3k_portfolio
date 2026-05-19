"use client"

import { useMemo, useState, useEffect } from "react"
import { ACHIEVEMENTS, type AchievementItem } from "@/src/config/constants"
import { FilterBar }     from "./filter-bar"
import { PinboardItem }  from "./pinboard-item"
import { ItemModal }     from "./item-modal"

// Collect unique tags across all items
const ALL_TAGS = Array.from(new Set(ACHIEVEMENTS.flatMap((a) => a.tags))).sort()

// Board dimensions — items use % positions relative to these
const BOARD_H = 920  // px, desktop only

export const AchievementsSection = () => {
  const [activeTag,    setActiveTag]    = useState("all")
  const [openItem,     setOpenItem]     = useState<AchievementItem | null>(null)
  const [isMobile,     setIsMobile]     = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const visible = useMemo(
    () =>
      new Set(
        ACHIEVEMENTS
          .filter((a) => activeTag === "all" || a.tags.includes(activeTag))
          .map((a) => a.id)
      ),
    [activeTag]
  )

  return (
    <section id="achievements" className="w-full bg-[#0e0e0e] text-white border-t border-neutral-800">
      <div className="mx-auto max-w-6xl">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 px-8 pt-8 pb-6 border-b border-neutral-800">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-3">
              <span className="self-start text-[10px] font-bold tracking-[0.35em] text-[#e64a3b] uppercase border border-[#e64a3b] px-2 py-0.5">
                {"// Achievements"}
              </span>
              <h2
                className="font-bold tracking-tight text-white leading-[1.06]"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                Wins &amp; milestones.
              </h2>
            </div>
            <span className="text-neutral-600 font-mono text-sm mb-1">
              {String(ACHIEVEMENTS.length).padStart(2, "0")} items
            </span>
          </div>

          {/* Filter chips */}
          <FilterBar tags={ALL_TAGS} active={activeTag} onChange={setActiveTag} />
        </div>

        {/* ── Board ──────────────────────────────────────────────── */}
        {isMobile ? (
          /* Mobile: 2-column masonry */
          <div className="px-4 py-8 columns-2 gap-4">
            {ACHIEVEMENTS.map((item) => (
              <div key={item.id} className="break-inside-avoid mb-4">
                <PinboardItem
                  item={item}
                  isActive={visible.has(item.id)}
                  onClick={() => setOpenItem(item)}
                  isMobile
                />
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: absolute pinboard collage */
          <div
            className="relative mx-8 my-8 rounded-xl overflow-hidden"
            style={{
              height:          `${BOARD_H}px`,
              backgroundColor: "#0c0c0c",
              backgroundImage:
                "radial-gradient(circle, #1e1e1e 1px, transparent 1px)",
              backgroundSize:  "24px 24px",
              boxShadow:       "inset 0 0 60px rgba(0,0,0,0.6)",
            }}
          >
            {ACHIEVEMENTS.map((item) => (
              <div
                key={item.id}
                className="absolute"
                style={{
                  left: `${item.position.x}%`,
                  top:  `${item.position.y}%`,
                }}
              >
                <PinboardItem
                  item={item}
                  isActive={visible.has(item.id)}
                  onClick={() => setOpenItem(item)}
                  isMobile={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ─────────────────────────────────────────────────── */}
      <ItemModal item={openItem} onClose={() => setOpenItem(null)} />
    </section>
  )
}

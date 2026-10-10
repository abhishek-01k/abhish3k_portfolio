"use client"

import { motion, useReducedMotion } from "framer-motion"
import { RotateCcw } from "lucide-react"
import { useRef, useState } from "react"

import { RevealText } from "@/src/components/motion/reveal-text"
import { SectionLabel } from "@/src/components/section-label"
import { ACHIEVEMENTS, type AchievementItem } from "@/src/config/constants"
import { cn } from "@/src/lib/utils"

const WIDTH: Record<AchievementItem["size"], number> = {
  sm: 210,
  md: 250,
  lg: 300,
}
const EASE = [0.16, 1, 0.3, 1] as const

/** Pull the headline result ("1st", "2nd", "Top 10", "Best") out of a title. */
const rankOf = (title: string) => {
  const m = title.match(
    /(\d+(?:st|nd|rd|th))|Top \d+|Best|Selected|\$\d+M|\d[\d,]* Users|\d+\+/i
  )
  return m ? m[0] : "★"
}

/* ── Fasteners ─────────────────────────────────────────────── */

const Pin = ({
  kind,
  color = "#e64a3b",
}: {
  kind: AchievementItem["pin"]
  color?: string
}) => {
  switch (kind) {
    case "thumbtack":
      return (
        <span
          className="absolute -top-2.5 left-1/2 z-10 h-5 w-5 -translate-x-1/2 rounded-full shadow-[0_3px_4px_rgba(0,0,0,0.35)]"
          style={{
            background: `radial-gradient(circle at 35% 35%, #fff8 0 15%, ${color} 40%)`,
          }}
        />
      )
    case "washi-tape":
      return (
        <span
          className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-3 opacity-80"
          style={{
            background: `repeating-linear-gradient(45deg, ${color}aa 0 6px, ${color}66 6px 12px)`,
          }}
        />
      )
    case "binder-clip":
      return (
        <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
          <span className="block h-4 w-12 rounded-sm bg-neutral-900 shadow-md" />
          <span className="absolute -top-2 left-2 h-3 w-8 rounded-t-full border-2 border-b-0 border-neutral-500" />
        </span>
      )
    case "paperclip":
      return (
        <span className="absolute -top-4 right-6 z-10 h-10 w-4 rounded-full border-2 border-neutral-400 shadow-sm">
          <span className="absolute inset-x-0.5 top-1.5 bottom-2 rounded-full border-2 border-neutral-400" />
        </span>
      )
  }
}

/* ── Card faces ────────────────────────────────────────────── */

const Face = ({ item }: { item: AchievementItem }) => {
  const rank = rankOf(item.title)

  if (item.type === "polaroid") {
    return (
      <div className="bg-[#fbfaf6] p-3 pb-4 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)]">
        <div className="relative grid aspect-square place-items-center overflow-hidden bg-ink">
          <div className="bg-grid absolute inset-0 opacity-70" />
          <span className="relative font-serif text-7xl text-signal italic">
            {rank}
          </span>
        </div>
        <p className="mt-3 font-serif text-lg leading-tight text-ink italic">
          {item.title}
        </p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-neutral-500 uppercase">
          {item.date}
        </p>
      </div>
    )
  }

  if (item.type === "note") {
    return (
      <div className="bg-[#f3e27a] p-5 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.4)] [clip-path:polygon(0_0,100%_0,100%_88%,88%_100%,0_100%)]">
        <p className="font-mono text-[10px] tracking-[0.18em] text-ink/60 uppercase">
          {item.date}
        </p>
        <p className="mt-2 font-serif text-2xl leading-tight text-ink italic">
          {item.title}
        </p>
        <p className="mt-3 text-[13px] leading-snug text-ink/75">
          {item.description}
        </p>
      </div>
    )
  }

  if (item.type === "ticket") {
    return (
      <div className="flex bg-ember text-ink shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)]">
        <div className="flex-1 p-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink/70 uppercase">
            Admit one · {item.date}
          </p>
          <p className="mt-2 text-lg leading-tight font-semibold tracking-tight">
            {item.title}
          </p>
          <p className="mt-2 line-clamp-3 text-[12px] leading-snug text-ink/80">
            {item.description}
          </p>
        </div>
        <div className="relative grid w-14 place-items-center border-l-2 border-dashed border-ink/40">
          <span className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-[#e9e4d8]" />
          <span className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-[#e9e4d8]" />
          <span className="-rotate-90 font-mono text-xs font-bold whitespace-nowrap">
            {rank}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-ink p-5 text-bone shadow-[0_18px_30px_-12px_rgba(0,0,0,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.18em] text-muted-ink uppercase">
          {item.date}
        </span>
        <span className="rounded-full bg-signal px-2 py-0.5 font-mono text-[10px] font-semibold text-ink uppercase">
          {rank}
        </span>
      </div>
      <p className="mt-3 text-xl leading-tight font-semibold tracking-tight">
        {item.title}
      </p>
      <p className="mt-2 text-[13px] leading-snug text-bone/65">
        {item.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.tags.map((t) => (
          <span
            key={t}
            className="border border-line-strong px-2 py-0.5 font-mono text-[9px] tracking-wider text-muted-ink uppercase"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Board ─────────────────────────────────────────────────── */

export const WinsWall = () => {
  const boardRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [order, setOrder] = useState(() => ACHIEVEMENTS.map((a) => a.id))
  const [resetKey, setResetKey] = useState(0)

  const bringToFront = (id: string) =>
    setOrder((o) => [...o.filter((x) => x !== id), id])

  return (
    <section
      id="wins"
      className="relative overflow-hidden bg-[#e9e4d8] py-24 text-ink sm:py-32"
    >
      {/* cork-ish texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,10,11,0.18) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:mb-6 lg:flex-row lg:items-end">
          <div>
            <SectionLabel className="border-ink/50 text-ink">Wins</SectionLabel>
            <h2 className="mt-5 text-5xl leading-[0.95] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-8xl">
              <RevealText text="The wall of" />
              <RevealText
                text="wins."
                className="font-serif font-normal text-ember italic"
                delay={0.12}
              />
            </h2>
          </div>
          <div className="flex max-w-sm flex-col gap-4 lg:items-end lg:text-right">
            <p className="text-[15px] leading-relaxed text-ink/70">
              10+ global hackathons, an accelerator, a seed round and a few
              milestones I&apos;m proud of.{" "}
              <span className="hidden lg:inline">
                Go on — pick them up and move them around.
              </span>
            </p>
            <button
              type="button"
              onClick={() => setResetKey((k) => k + 1)}
              className="hidden items-center gap-2 self-start rounded-full border border-ink/25 px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-bone lg:inline-flex lg:self-end"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Tidy up
            </button>
          </div>
        </div>

        {/* Desktop: free-form draggable board */}
        <div
          ref={boardRef}
          key={resetKey}
          className="relative hidden h-[1040px] lg:block"
        >
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.id}
              drag={!reduceMotion}
              dragConstraints={boardRef}
              dragElastic={0.12}
              dragMomentum
              onPointerDown={() => bringToFront(item.id)}
              whileDrag={{ scale: 1.06, rotate: 0, cursor: "grabbing" }}
              whileHover={{ scale: 1.02 }}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: -80, rotate: item.rotation * 3 }
              }
              whileInView={{ opacity: 1, y: 0, rotate: item.rotation }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 16,
                delay: i * 0.07,
              }}
              data-cursor="Drag"
              className="absolute cursor-grab touch-none select-none"
              style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                width: WIDTH[item.size],
                zIndex: order.indexOf(item.id) + 1,
              }}
            >
              <Pin kind={item.pin} color={item.pinColor} />
              <Face item={item} />
            </motion.div>
          ))}
        </div>

        {/* Mobile / tablet: a scattered stack */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:hidden">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
              className={cn(
                "relative mx-auto w-full max-w-[300px]",
                i % 2 ? "sm:mt-12" : ""
              )}
              style={{ rotate: item.rotation * 0.6 }}
            >
              <Pin kind={item.pin} color={item.pinColor} />
              <Face item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

import { markBootDone } from "./use-boot-ready"

const LINES = [
  "connecting to abhish3k.xyz",
  "syncing 4 years of blocks",
  "indexing 15+ shipped products",
  "verifying 10+ hackathon wins",
]
const DURATION = 1400
const KEY = "abhish3k:booted"

/**
 * One-time "node sync" intro. Shown once per browser session, skipped for
 * reduced motion. The page renders underneath, so content is never blocked.
 */
export const Preloader = () => {
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(KEY) === "1"
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (seen || reduce) {
      markBootDone()
      return
    }

    let start = 0
    let raf = 0
    const tick = (now: number) => {
      if (!start) {
        start = now
        setShow(true)
      }
      const p = Math.min(1, (now - start) / DURATION)
      setProgress(1 - Math.pow(1 - p, 2.2))
      if (p < 1) raf = requestAnimationFrame(tick)
      else
        window.setTimeout(() => {
          setShow(false)
          markBootDone()
          try {
            sessionStorage.setItem(KEY, "1")
          } catch {}
        }, 180)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const pct = Math.round(progress * 100)
  const visibleLines = Math.min(
    LINES.length,
    Math.floor(progress * LINES.length) + 1
  )

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-bone sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-muted-ink uppercase">
            <span>abhish3k / node</span>
            <span className="flex items-center gap-2 text-signal">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-signal" />
              syncing
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-xs text-muted-ink sm:text-sm">
            {LINES.slice(0, visibleLines).map((line, i) => (
              <p key={line}>
                <span className="text-signal">
                  {i < visibleLines - 1 || pct === 100 ? "✓" : "›"}
                </span>{" "}
                {line}
              </p>
            ))}
          </div>

          <div>
            <div className="flex items-end justify-between">
              <span className="font-serif text-2xl text-bone-2 italic sm:text-3xl">
                Abhishek
              </span>
              <span className="font-mono text-6xl font-medium tracking-tighter tabular-nums sm:text-8xl">
                {String(pct).padStart(3, "0")}
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-line">
              <div className="h-px bg-signal" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

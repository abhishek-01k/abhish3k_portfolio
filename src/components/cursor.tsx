"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

import { useMediaQuery } from "./use-media-query"

/**
 * Desktop-only cursor: a small dot that tracks exactly and a ring that lags
 * behind. The ring grows over interactive elements; elements can set
 * `data-cursor="Label"` to show a label inside it.
 */
export const Cursor = () => {
  const enabled = useMediaQuery(
    "(pointer: fine) and (prefers-reduced-motion: no-preference)"
  )
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add("has-custom-cursor")

    const last = { x: -1, y: -1 }

    // Resolve what's under the pointer; also re-run on scroll, since the
    // element under a stationary cursor changes while the page moves.
    const inspect = () => {
      if (last.x < 0) return
      const target = document.elementFromPoint(
        last.x,
        last.y
      ) as HTMLElement | null
      const labelled = target?.closest<HTMLElement>("[data-cursor]")
      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, label"
      )
      setLabel(labelled?.dataset.cursor ?? null)
      setHovering(Boolean(interactive || labelled))
    }

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      last.x = e.clientX
      last.y = e.clientY
      setHidden(false)
      inspect()
    }
    const onLeave = () => setHidden(true)

    window.addEventListener("pointermove", onMove)
    window.addEventListener("scroll", inspect, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", inspect)
      document.removeEventListener("pointerleave", onLeave)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = label ? 88 : hovering ? 52 : 28

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[90] flex items-center justify-center rounded-full border border-bone/60 mix-blend-difference"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: hidden ? 0 : 1,
          backgroundColor: label ? "rgba(200,255,61,1)" : "rgba(236,232,224,0)",
          borderColor: label ? "rgba(200,255,61,1)" : "rgba(236,232,224,0.6)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {label && (
          <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-ink uppercase mix-blend-normal">
            {label}
          </span>
        )}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[91] h-1.5 w-1.5 rounded-full bg-bone mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden || label ? 0 : 1 }}
      />
    </>
  )
}

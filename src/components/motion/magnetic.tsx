"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { useRef, type ReactNode } from "react"

/** Pulls its child slightly toward the cursor while hovered. */
export const Magnetic = ({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e: React.PointerEvent) => {
    if (reduceMotion || e.pointerType !== "mouse") return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.div>
  )
}

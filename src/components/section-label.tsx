"use client"

import { useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/src/lib/utils"

const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&@01"
const FRAME_MS = 32
const FRAMES_PER_CHAR = 2.2

const scramble = (target: string, frame: number) =>
  target
    .split("")
    .map((ch, i) => {
      if (ch === " ") return " "
      if (frame >= i * FRAMES_PER_CHAR + 6) return ch
      return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    })
    .join("")

type SectionLabelProps = {
  children: string
  className?: string
}

/**
 * The red `// Label` tag used above section headings.
 * Decodes from random glyphs the first time it scrolls into view.
 */
export const SectionLabel = ({ children, className }: SectionLabelProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reduceMotion = useReducedMotion()
  const text = `// ${children}`
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!inView || reduceMotion) return

    let frame = 0
    const total = text.length * FRAMES_PER_CHAR + 8
    const id = window.setInterval(() => {
      frame++
      setDisplay(scramble(text, frame))
      if (frame >= total) {
        window.clearInterval(id)
        setDisplay(text)
      }
    }, FRAME_MS)

    return () => window.clearInterval(id)
  }, [inView, reduceMotion, text])

  return (
    <span
      ref={ref}
      aria-label={text}
      className={cn(
        "inline-block self-start border border-signal/60 px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.35em] text-signal uppercase",
        className
      )}
    >
      <span aria-hidden>{display}</span>
    </span>
  )
}

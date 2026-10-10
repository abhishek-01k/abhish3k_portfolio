"use client"

import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/src/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

type RevealTextProps = {
  text: string
  /** Split into letters (display headings) or words (sentences). */
  by?: "letter" | "word"
  className?: string
  delay?: number
  stagger?: number
  /** Animate when `play` turns true instead of on scroll (above-the-fold). */
  immediate?: boolean
  play?: boolean
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

/**
 * Masked rise-in for headings: each letter/word slides up from behind a
 * clipping line. Screen readers get the plain string.
 */
export const RevealText = ({
  text,
  by = "word",
  className,
  delay = 0,
  stagger,
  immediate = false,
  play = true,
  as: Tag = "span",
}: RevealTextProps) => {
  const reduceMotion = useReducedMotion()
  const step = stagger ?? (by === "letter" ? 0.035 : 0.06)
  const words = text.split(" ")
  let unit = 0

  const trigger = immediate
    ? { animate: play ? ("show" as const) : ("hidden" as const) }
    : {
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.6 },
      }

  return (
    <Tag className={cn("block", className)} aria-label={text}>
      <motion.span
        aria-hidden
        className="block"
        initial={reduceMotion ? false : "hidden"}
        {...trigger}
      >
        {words.map((word, wi) => (
          <span
            key={`${word}-${wi}`}
            className="inline-block whitespace-nowrap"
          >
            {(by === "letter" ? word.split("") : [word]).map((piece, pi) => {
              const i = unit++
              return (
                <span
                  key={`${piece}-${pi}`}
                  className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={{
                      hidden: { y: "110%", rotate: 6 },
                      show: {
                        y: "0%",
                        rotate: 0,
                        transition: {
                          duration: 0.9,
                          ease: EASE,
                          delay: delay + i * step,
                        },
                      },
                    }}
                  >
                    {piece}
                  </motion.span>
                </span>
              )
            })}
            {wi < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

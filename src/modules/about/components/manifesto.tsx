"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { Code2, type LucideIcon, Mic2, PenTool, Rocket } from "lucide-react"
import { useRef } from "react"

import { SectionLabel } from "@/src/components/section-label"
import { AREAS } from "@/src/config/constants"

const MANIFESTO =
  "I wear a lot of hats — and I’ve made each one fit. I engineer systems that hold millions without blinking, design flows nobody has to think about, explain hard ideas in plain words, and start things from absolute zero."

const ICONS: LucideIcon[] = [Code2, PenTool, Mic2, Rocket]

const Word = ({
  word,
  range,
  progress,
}: {
  word: string
  range: [number, number]
  progress: MotionValue<number>
}) => {
  const opacity = useTransform(progress, range, [0.12, 1])
  const highlight = /hats|fit\.|millions|zero\./.test(word)
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span
        style={{ opacity }}
        className={highlight ? "font-serif text-signal italic" : undefined}
      >
        {word}
      </motion.span>
    </span>
  )
}

export const Manifesto = () => {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  })
  const words = MANIFESTO.split(" ")

  return (
    <section
      id="about"
      className="relative border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionLabel>About</SectionLabel>

        <p
          ref={ref}
          className="mt-8 max-w-[22ch] text-[2.4rem] leading-[1.05] font-semibold tracking-[-0.035em] text-bone sm:max-w-[24ch] sm:text-6xl lg:text-[5.5rem]"
        >
          {words.map((word, i) =>
            reduceMotion ? (
              <span key={i} className="mr-[0.25em] inline-block">
                {word}
              </span>
            ) : (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              />
            )
          )}
        </p>

        <div className="mt-20 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {AREAS.map(({ heading, body }, i) => {
            const Icon = ICONS[i]
            return (
              <motion.article
                key={heading}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden border-r border-b border-line p-6 sm:p-8"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <div className="relative flex items-start justify-between">
                  <Icon className="h-6 w-6 text-signal transition-colors duration-500 group-hover:text-ink" />
                  <span className="font-mono text-xs text-muted-ink transition-colors duration-500 group-hover:text-ink">
                    0{i + 1}
                  </span>
                </div>
                <div className="relative">
                  <h3 className="text-2xl font-semibold tracking-tight text-bone transition-colors duration-500 group-hover:text-ink">
                    {heading}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-ink transition-colors duration-500 group-hover:text-ink/80">
                    {body}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

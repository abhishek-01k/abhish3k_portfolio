"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { ArrowDownRight, Check, Copy } from "lucide-react"
import { useRef, useState } from "react"

import { Magnetic } from "@/src/components/motion/magnetic"
import { Marquee } from "@/src/components/motion/marquee"
import { RevealText } from "@/src/components/motion/reveal-text"
import { useBootReady } from "@/src/components/use-boot-ready"
import { ACHIEVEMENTS, PROJECTS, SITE } from "@/src/config/constants"
import { ReelFrame } from "./components/reel-frame"

const EASE = [0.16, 1, 0.3, 1] as const

const TICKER = [
  ...PROJECTS.slice(0, 6).map((p) => ({ kind: "shipped", text: p.title })),
  ...ACHIEVEMENTS.filter((a) => a.tags.includes("winner")).map((a) => ({
    kind: "won",
    text: a.title,
  })),
]

const CopyEmail = () => {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(SITE.email)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1800)
        } catch {
          window.location.href = `mailto:${SITE.email}`
        }
      }}
      className="group flex h-14 items-center gap-2 rounded-full border border-line-strong px-6 text-sm font-medium text-bone transition-colors hover:border-bone"
    >
      {copied ? (
        <Check className="h-4 w-4 text-signal" />
      ) : (
        <Copy className="h-4 w-4 transition-transform group-hover:-rotate-6" />
      )}
      {copied ? "Email copied" : "Copy email"}
    </button>
  )
}

const HomePage = () => {
  const ready = useBootReady()
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const nameY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduceMotion ? "0%" : "35%"]
  )
  const fade = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, reduceMotion ? 1 : 0.2]
  )

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE, delay },
  })

  return (
    <section
      ref={ref}
      id="home"
      data-home-hero
      className="relative flex min-h-svh flex-col overflow-hidden pt-20 sm:pt-24"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 sm:px-6 lg:px-8">
        {/* Meta row */}
        <motion.div
          {...fadeUp(0.1)}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 font-mono text-[11px] tracking-[0.18em] text-muted-ink uppercase"
        >
          <span>Portfolio — 2026</span>
          <span className="hidden sm:inline">Full-stack · AI · On-chain</span>
          <span className="flex items-center gap-2 text-signal">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-signal" />
            Open to new roles
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          style={{ y: nameY, opacity: fade }}
          className="pt-6 sm:pt-8"
        >
          <RevealText
            as="h1"
            text="Abhishek"
            by="letter"
            immediate
            play={ready}
            stagger={0.05}
            delay={0.15}
            className="-ml-[0.04em] text-[22.4vw] leading-[0.82] font-semibold tracking-[-0.065em] text-bone 2xl:text-[20.5rem]"
          />
        </motion.div>

        {/* Lower grid */}
        <div className="mt-8 grid flex-1 grid-cols-1 gap-10 pb-10 lg:mt-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div>
              <RevealText
                as="p"
                text="ships products from zero to mainnet."
                immediate
                play={ready}
                delay={0.55}
                className="font-serif text-4xl leading-[1.05] text-bone italic sm:text-5xl"
              />
              <motion.p
                {...fadeUp(0.8)}
                className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-ink"
              >
                Full-stack engineer at{" "}
                <span className="text-bone">Push Chain</span>, building AI
                products and on-chain protocols people actually use — a DEX with
                1,000+ MAUs, an AI tutor that hit 2,500 users in a day, and a
                yield engine securing $16M+.
              </motion.p>
            </div>

            <motion.div
              {...fadeUp(0.95)}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a
                  href="#work"
                  className="group flex h-14 items-center gap-2 rounded-full bg-signal pr-2 pl-6 text-sm font-semibold text-ink"
                >
                  See the work
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-signal transition-transform duration-500 group-hover:rotate-[-45deg]">
                    <ArrowDownRight className="h-4 w-4" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <CopyEmail />
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 40, clipPath: "inset(12% 0 0 0)" }
            }
            animate={
              ready
                ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }
                : undefined
            }
            transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
            className="lg:col-span-6 lg:col-start-7 lg:self-end"
          >
            <ReelFrame />
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <motion.div
        {...fadeUp(1.1)}
        className="relative border-y border-line bg-ink-2/60 py-3 font-mono text-xs tracking-[0.16em] uppercase"
      >
        <Marquee duration={55}>
          {TICKER.map((item, i) => (
            <span
              key={`${item.text}-${i}`}
              className="flex items-center gap-3 px-6 whitespace-nowrap"
            >
              <span
                className={
                  item.kind === "won" ? "text-signal" : "text-muted-ink"
                }
              >
                {item.kind === "won" ? "★ won" : "▲ shipped"}
              </span>
              <span className="text-bone">{item.text}</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  )
}

export default HomePage

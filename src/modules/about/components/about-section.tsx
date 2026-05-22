"use client"

import { Code2, type LucideIcon, Mic2, PenTool, Rocket } from "lucide-react"

import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from "@/src/components/scroll-reveal"
import { AREAS } from "@/src/config/constants"
import { EyeTracker } from "@/src/modules/home/components/eye-tracker"

const QUOTE = "I wear a lot of hats — and I’ve made each one fit."

const borders = [
  "",
  "border-l border-neutral-800",
  "border-t border-neutral-800",
  "border-l border-t border-neutral-800",
]

const AREA_IMAGES = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop",
]

const AREA_ICONS: LucideIcon[] = [Code2, PenTool, Mic2, Rocket]

export const AboutSection = () => {
  return (
    <section id="about" className="w-full bg-[#0e0e0e] text-white">
      <div className="mx-auto max-w-6xl border border-t-0 border-neutral-800">
        <ScrollReveal className="flex justify-end px-8 pt-8 pb-2">
          <span className="border border-[#e64a3b] px-2 py-0.5 text-[10px] font-bold tracking-[0.35em] text-[#e64a3b] uppercase">
            {"// Who am I?"}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <blockquote className="relative mx-8 mt-4 mb-8 border-y border-neutral-800 px-4 py-8 text-center">
            <h2
              className="mx-auto max-w-3xl leading-[1.12] font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 3rem)" }}
            >
              <span className="mr-1 align-baseline text-[#e64a3b]">&ldquo;</span>
              {QUOTE}
              <span className="ml-1 align-baseline text-[#e64a3b]">&rdquo;</span>
            </h2>
          </blockquote>
        </ScrollReveal>

        <div className="flex border-t border-neutral-800">
          <ScrollReveal className="hidden w-[38%] shrink-0 flex-col items-center justify-center border-r border-neutral-800 px-10 py-6 lg:flex">
            <EyeTracker />
          </ScrollReveal>

          <ScrollStagger className="grid flex-1 grid-cols-2">
            {AREAS.map(({ heading }, i) => {
              const Icon = AREA_ICONS[i]
              return (
                <ScrollStaggerItem
                  key={heading}
                  className={`group relative flex flex-col justify-between overflow-hidden px-8 py-10 lg:px-10 xl:px-12 ${borders[i]}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={AREA_IMAGES[i]}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover grayscale opacity-[0.15] transition-all duration-700 ease-out md:opacity-0 group-hover:scale-105 group-hover:opacity-35 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[#0e0e0e] opacity-0 transition-opacity duration-700 md:opacity-100 group-hover:opacity-60" />

                  <span className="relative z-10 self-end text-xs font-bold tracking-[0.28em] text-[#e64a3b]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10">
                    <Icon className="mb-3 h-6 w-6 text-[#e64a3b]/50 transition-colors duration-300 group-hover:text-[#e64a3b]" />
                    <h3 className="text-xl leading-snug font-bold text-white lg:text-2xl">
                      {heading}
                    </h3>
                  </div>
                </ScrollStaggerItem>
              )
            })}
          </ScrollStagger>
        </div>

        <ScrollReveal className="flex items-center justify-center border-t border-neutral-800 px-8 py-14 lg:hidden">
          <EyeTracker />
        </ScrollReveal>
      </div>
    </section>
  )
}

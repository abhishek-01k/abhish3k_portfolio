import { ArrowDownRight } from "lucide-react"

import { cn } from "@/src/lib/utils"
import InteractiveDots from "./components/dots-pattern"
import { StatCounter } from "./components/stat-counter"
import { TypewriterEffect } from "./components/typewriter-effect"

const stats = [
  { value: 4, prefix: "", suffix: "+", label: "Years of Experience",   dark: false },
  { value: 15, prefix: "",  suffix: "+",  label: "Products Built", dark: false },
  { value: 10, prefix: "",  suffix: "+",  label: "Hackathon Wins", dark: true  },
]

const HomePage = () => {
  return (
    <main>
      <section
        id="home"
        data-home-hero
        className="grid min-h-[calc(100svh-4rem)] grid-cols-1 border-t sm:min-h-[calc(100svh-5rem)] lg:grid-cols-2"
      >

        {/* ── Left column ───────────────────────────────────── */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r">

          {/* Top-left: interactive dots + name */}
          <div className="relative h-56 shrink-0 overflow-hidden border-b sm:h-72 lg:h-[42%]">
            <InteractiveDots
              backgroundColor="#F5F4EF"
              dotColor="#C0BDB8"
              gridSpacing={24}
            />
            <div className="pointer-events-none relative z-10 flex h-full items-end p-6 sm:p-8 lg:p-10">
              <h1
                className="font-black leading-none tracking-tighter text-neutral-900"
                style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
              >
                Abhishek
              </h1>
            </div>
          </div>

          {/* Bottom-left: typewriter + bio */}
          <div className="flex flex-1 flex-col justify-end p-6 sm:p-8 lg:p-10">
            <div>
              <h2 className="max-w-lg text-3xl font-light leading-snug tracking-tight text-neutral-900 lg:text-4xl xl:text-[2.6rem]">
                <TypewriterEffect />
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-500">
                I design and ship full-stack applications, AI-powered tools,
                and on-chain protocols — from zero to production.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="#work"
                className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
              >
                Explore my work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>

        {/* ── Right column ──────────────────────────────────── */}
        <div className="flex flex-col">

          {/* Top-right: video */}
          <div className="relative h-64 flex-1 overflow-hidden border-b bg-neutral-900 sm:h-80">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            >
              {/* <source src="/showreel.mp4" type="video/mp4" /> */}
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="h-px w-12 bg-neutral-600" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                Showreel
              </p>
              <div className="h-px w-12 bg-neutral-600" />
            </div>
          </div>

          {/* Bottom-right: animated stats */}
          <div className="grid grid-cols-3 divide-x">
            {stats.map(({ value, prefix, suffix, label, dark }) => (
              <div
                key={label}
                className={cn(
                  "flex flex-col justify-between px-5 py-6 sm:px-6 sm:py-7",
                  dark ? "bg-neutral-950" : "bg-background",
                )}
              >
                <StatCounter
                  value={value}
                  prefix={prefix}
                  suffix={suffix}
                  className={cn(
                    "text-2xl font-bold sm:text-3xl",
                    dark ? "text-white" : "text-neutral-900",
                  )}
                />
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-neutral-400">
                  {label}
                </p>
              </div>
            ))}
          </div>

        </div>

      </section>

    </main>
  )
}

export default HomePage

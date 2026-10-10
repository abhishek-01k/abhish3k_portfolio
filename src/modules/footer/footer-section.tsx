"use client"

import AsciiHero from "@/src/components/ascii-hero"
import { SITE } from "@/src/config/constants"

export const FooterSection = () => (
  <footer className="relative mt-24 border-t border-line sm:mt-32">
    <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-6 font-mono text-[11px] tracking-[0.16em] text-muted-ink uppercase sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <span>
        © {new Date().getFullYear()} {SITE.name} · All signals intentional
      </span>
      <span className="hidden md:inline">
        Designed &amp; engineered in Bangalore
      </span>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-fit text-bone transition-colors hover:text-signal"
      >
        Back to top ↑
      </button>
    </div>
    <div className="hidden h-[30vw] max-h-[460px] flex-col overflow-hidden border-t border-line lg:flex">
      <AsciiHero />
    </div>
  </footer>
)

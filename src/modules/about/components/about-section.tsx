"use client"

import { AREAS } from "@/src/config/constants"
import { EyeTracker } from "@/src/modules/home/components/eye-tracker"

const QUOTE = "The price of privacy is eternal vigilance - AI just raised the price."

const borders = [
  "",
  "border-l border-neutral-800",
  "border-t border-neutral-800",
  "border-l border-t border-neutral-800",
]

export const AboutSection = () => {
  return (
    <section id="about" className="w-full bg-[#0e0e0e] text-white">
      <div className="mx-auto max-w-6xl border border-t-0 border-neutral-800">
        <div className="flex justify-end px-8 pt-8 pb-2">
          <span className="border border-[#e64a3b] px-2 py-0.5 text-[10px] font-bold tracking-[0.35em] text-[#e64a3b] uppercase">
            {"// Who am I?"}
          </span>
        </div>

        <blockquote className="relative mx-8 mt-4 mb-8 border-y border-neutral-800 px-4 py-8 text-center">
          <h2
            className="mx-auto max-w-3xl leading-[1.12] font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 3rem)" }}
          >
            {QUOTE.split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 0 && (
                  <span className="mr-1 align-baseline text-[#e64a3b]">
                    &ldquo;
                  </span>
                )}
                {line}
                {i === QUOTE.split("\n").length - 1 && (
                  <span className="ml-1 align-baseline text-[#e64a3b]">
                    &rdquo;
                  </span>
                )}
              </span>
            ))}
          </h2>
        </blockquote>

        <div className="flex border-t border-neutral-800">
          <div className="hidden w-[38%] shrink-0 flex-col items-center justify-center border-r border-neutral-800 px-10 py-6 lg:flex">
            <EyeTracker />
          </div>

          <div className="grid flex-1 grid-cols-2">
            {AREAS.map(({ label, heading, body }, i) => (
              <div
                key={label}
                className={`flex flex-col gap-5 px-8 py-10 lg:px-10 xl:px-12 ${borders[i]}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-[0.28em] text-[#e64a3b] uppercase">
                    {label}
                  </span>
                  <span className="text-xs text-neutral-700">—</span>
                </div>

                <h3 className="text-lg leading-snug font-bold text-white lg:text-xl">
                  {heading}
                </h3>

                <p className="text-sm leading-relaxed text-neutral-500">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-neutral-800 px-8 py-14 lg:hidden">
          <EyeTracker />
        </div>
      </div>
    </section>
  )
}

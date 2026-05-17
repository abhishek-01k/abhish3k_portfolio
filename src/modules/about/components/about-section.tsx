import { AREAS } from "@/src/config/constants"
import { EyeTracker } from "../../home/components/eye-tracker"

const QUOTE = "You build the future.\nAnd everything you ship\nis watching."

const borders = [
  "",                                
  "border-l border-neutral-800",
  "border-t border-neutral-800",
  "border-l border-t border-neutral-800",
]

export const AboutSection = () => {
  return (
    <section id="about" className="bg-[#0e0e0e] text-white">

      {/* ── Label bar ──────────────────────────────────────────── */}
      <div className="border-b border-neutral-800 py-3 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#e64a3b]">
          {"// Who am I?"}
        </span>
      </div>

      {/* ── Main grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left: headline + orbital eye ───────────────────── */}
        <div className="flex flex-col justify-between border-b border-neutral-800 px-8 py-14 lg:border-b-0 lg:border-r lg:px-14 xl:px-20">

          {/* Headline */}
          <h2
            className="font-bold leading-[1.08] tracking-tight text-white"
            style={{ fontSize: "clamp(2.6rem, 4.5vw, 5rem)" }}
          >
            {QUOTE.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          {/* Orbital eye — centred, generous top space */}
          <div className="mt-16 flex items-center justify-center lg:mt-0">
            <EyeTracker />
          </div>

        </div>

        {/* ── Right: 2×2 card grid ────────────────────────────── */}
        <div className="grid grid-cols-2">
          {AREAS.map(({ label, heading, body }, i) => (
            <div
              key={label}
              className={`flex flex-col gap-5 px-8 py-10 lg:px-10 xl:px-12 ${borders[i]}`}
            >
              {/* Label + dash */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#e64a3b]">
                  {label}
                </span>
                <span className="text-neutral-700 text-xs">—</span>
              </div>

              {/* Heading */}
              <h3 className="text-lg font-bold leading-snug text-white lg:text-xl">
                {heading}
              </h3>

              {/* Body */}
              <p className="text-sm leading-relaxed text-neutral-500">
                {body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

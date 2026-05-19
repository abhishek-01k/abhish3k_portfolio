import { RECOMMENDATIONS } from "@/src/config/constants"

export const RecommendationsSection = () => (
  <section id="recommendations" className="w-full bg-[#0e0e0e] text-white border-t border-neutral-800">
    <div className="mx-auto max-w-6xl">

      {/* Header */}
      <div className="flex items-end justify-between px-8 pt-8 pb-6 border-b border-neutral-800">
        <div className="flex flex-col gap-3">
          <span className="self-start text-[10px] font-bold tracking-[0.35em] text-[#e64a3b] uppercase border border-[#e64a3b] px-2 py-0.5">
            {"// Recommendations"}
          </span>
          <h2
            className="font-bold tracking-tight text-white leading-[1.06]"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            What people say.
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="divide-y divide-neutral-800">
        {RECOMMENDATIONS.map((rec, i) => (
          <RecommendationCard key={i} rec={rec} index={i} />
        ))}
      </div>
    </div>
  </section>
)

// ─── Card ─────────────────────────────────────────────────────────────────────
interface Recommendation {
  quote: string
  name: string
  role: string
  company: string
}

const RecommendationCard = ({
  rec,
  index,
}: {
  rec: Recommendation
  index: number
}) => (
  <div className="flex flex-col lg:flex-row gap-8 px-8 py-10 hover:bg-neutral-900/20 transition-colors duration-200">

    {/* Index + person */}
    <div className="lg:w-56 shrink-0 flex flex-col gap-1">
      <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-neutral-700 uppercase mb-3">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="text-sm font-bold text-white">{rec.name}</p>
      <p className="text-xs text-neutral-500">{rec.role}</p>
      <p className="text-xs text-[#e64a3b] font-mono">{rec.company}</p>
    </div>

    {/* Divider (desktop) */}
    <div className="hidden lg:block w-px bg-neutral-800 self-stretch" />

    {/* Quote */}
    <div className="flex-1 flex items-start gap-4">
      <span className="text-3xl text-[#e64a3b] leading-none font-serif mt-1 shrink-0">&ldquo;</span>
      <p className="text-neutral-300 text-base leading-relaxed italic">{rec.quote}</p>
    </div>
  </div>
)

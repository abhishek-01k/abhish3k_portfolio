import { RECOMMENDATIONS } from "@/src/config/constants"

export const RecommendationsSection = () => {
  const [featuredRecommendation, ...supportingRecommendations] = RECOMMENDATIONS

  return (
    <section
      id="recommendations"
      className="relative w-full overflow-hidden border-t border-neutral-800 bg-[#0e0e0e] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(230,74,59,0.16),transparent_30%),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[auto,48px_48px,48px_48px]" />
      <div className="absolute right-0 top-0 h-56 w-56 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#e64a3b]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl border-x border-neutral-800 lg:grid-cols-[0.82fr_1.35fr]">
        <div className="flex flex-col justify-between border-b border-neutral-800 px-5 py-7 sm:px-6 md:flex-row md:items-end md:gap-8 lg:min-h-[560px] lg:flex-col lg:items-stretch lg:border-b-0 lg:border-r lg:px-8 lg:py-9">
          <div className="flex max-w-2xl flex-col gap-4 lg:max-w-none">
            <span className="self-start border border-[#e64a3b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#e64a3b]">
              {"// Recommendations"}
            </span>
            <h2
              className="max-w-xl font-bold leading-[1.02] tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.8rem)" }}
            >
              People who have seen the work up close.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
              Notes from collaborators, mentors, and engineering leaders across
              product, protocol, and startup work.
            </p>
          </div>

          <div className="mt-8 grid min-w-[220px] grid-cols-2 border border-neutral-800 bg-black/20 md:mt-0 lg:mt-10">
            <div className="border-r border-neutral-800 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                References
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {String(RECOMMENDATIONS.length).padStart(2, "0")}
              </p>
            </div>
            <div className="p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                Signal
              </p>
              <p className="mt-2 text-3xl font-bold text-[#e64a3b]">1:1</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 lg:p-6">
          {featuredRecommendation ? (
            <FeaturedRecommendationCard rec={featuredRecommendation} />
          ) : null}

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {supportingRecommendations.map((rec, index) => (
              <RecommendationCard key={rec.name} rec={rec} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
interface Recommendation {
  quote: string
  name: string
  role: string
  company: string
  initials: string
  relationship: string
  linkedin: string
}

const RecommendationCard = ({
  rec,
  index,
}: {
  rec: Recommendation
  index: number
}) => (
  <article className="group flex min-h-[250px] flex-col justify-between border border-neutral-800 bg-[#141414]/90 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#e64a3b]/50 hover:bg-[#181818] md:min-h-[280px] lg:min-h-[250px]">
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600">
          Ref {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-neutral-800 transition-colors duration-300 group-hover:bg-[#e64a3b]/50" />
      </div>

      <p className="text-sm font-medium leading-relaxed tracking-[-0.02em] text-neutral-300 sm:text-base">
        <span className="mr-1 text-[#e64a3b]">&ldquo;</span>
        {rec.quote}
        <span className="ml-1 text-[#e64a3b]">&rdquo;</span>
      </p>
    </div>

    <RecommendationAuthor rec={rec} compact className="mt-6" />
  </article>
)

const FeaturedRecommendationCard = ({ rec }: { rec: Recommendation }) => (
  <article className="relative overflow-hidden border border-neutral-800 bg-[#f7f4ee] p-5 text-stone-950 shadow-[0_24px_90px_rgba(0,0,0,0.24)] sm:p-6 lg:p-8">
    <div className="absolute right-0 top-0 h-36 w-36 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#e64a3b]/20 blur-2xl" />

    <div className="relative flex flex-col gap-7">
      <div className="flex items-start justify-between gap-6">
        <span className="border border-[#e64a3b] bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#e64a3b]">
          Featured
        </span>
        <span className="font-serif text-5xl leading-none text-[#e64a3b] sm:text-6xl">
          &ldquo;
        </span>
      </div>

      <p className="max-w-3xl text-xl font-bold leading-tight tracking-tighter text-stone-950 sm:text-2xl lg:text-3xl">
        {rec.quote}
      </p>

      <div className="border-t border-stone-300 pt-5">
        <RecommendationAuthor rec={rec} />
      </div>
    </div>
  </article>
)

const RecommendationAuthor = ({
  rec,
  compact = false,
  className = "",
}: {
  rec: Recommendation
  compact?: boolean
  className?: string
}) => (
  <div className={className}>
    <div className="flex items-center gap-3 sm:gap-4">
      <div
        className={`flex shrink-0 items-center justify-center rounded-full font-bold transition duration-300 ${
          compact
            ? "size-11 bg-white text-xs text-black group-hover:bg-[#e64a3b] group-hover:text-white"
            : "size-12 bg-stone-950 text-sm text-white"
        }`}
      >
        {rec.initials}
      </div>
      <div className="min-w-0">
        <h3
          className={`text-sm font-bold leading-tight sm:text-base ${
            compact ? "text-white" : "text-stone-950"
          }`}
        >
          {rec.name}
        </h3>
        <p
          className={`mt-1 text-xs leading-snug sm:text-sm ${
            compact ? "text-neutral-500" : "text-stone-600"
          }`}
        >
          {rec.role} · {rec.company}
        </p>
        <p
          className={`mt-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
            compact ? "text-neutral-600" : "text-stone-500"
          }`}
        >
          {rec.relationship}
        </p>
      </div>
    </div>

    <a
      href={rec.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e64a3b] focus-visible:ring-offset-4 ${
        compact
          ? "text-[#e64a3b] hover:text-white focus-visible:ring-offset-[#141414]"
          : "text-[#e64a3b] hover:text-stone-950 focus-visible:ring-offset-[#f7f4ee]"
      }`}
      aria-label={`View ${rec.name} on LinkedIn`}
    >
      View LinkedIn
      <span aria-hidden="true">-&gt;</span>
    </a>
  </div>
)

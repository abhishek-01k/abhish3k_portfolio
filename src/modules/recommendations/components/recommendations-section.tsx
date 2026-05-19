import { RECOMMENDATIONS } from "@/src/config/constants"

export const RecommendationsSection = () => (
  <section
    id="recommendations"
    className="relative w-full overflow-hidden border-t border-stone-200 bg-[#f7f4ee] text-stone-950"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,74,59,0.12),transparent_34%),linear-gradient(90deg,rgba(28,25,23,0.04)_1px,transparent_1px),linear-gradient(rgba(28,25,23,0.04)_1px,transparent_1px)] bg-size-[auto,48px_48px,48px_48px]" />

    <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-6 border-b border-stone-300 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-3">
          <span className="self-start border border-[#e64a3b] bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#e64a3b] shadow-sm">
            {"// Recommendations"}
          </span>
          <h2
            className="font-bold leading-[1.02] tracking-tight text-stone-950"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Words from people I&apos;ve built with.
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
            A few notes from collaborators, mentors, and engineering leaders who have
            seen the work up close.
          </p>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400">
          {String(RECOMMENDATIONS.length).padStart(2, "0")} references
        </span>
      </div>

      {/* Cards */}
      <div className="grid gap-5 lg:grid-cols-3">
        {RECOMMENDATIONS.map((rec, i) => (
          <RecommendationCard key={rec.name} rec={rec} index={i} />
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
  <article className="group flex min-h-[420px] flex-col justify-between border border-stone-300 bg-white/80 p-6 shadow-[0_20px_70px_rgba(28,25,23,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#e64a3b]/40 hover:shadow-[0_26px_80px_rgba(230,74,59,0.13)] sm:p-7">

    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-stone-300 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
          LinkedIn
        </span>
      </div>

      <span className="block font-serif text-3xl leading-none text-[#e64a3b]">
        &ldquo;
      </span>
      <p className="text-lg font-medium leading-relaxed tracking-[-0.02em] text-stone-800">
        {rec.quote}
      </p>
    </div>

    <div className="mt-10 border-t border-stone-200 pt-5">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-stone-950 text-sm font-bold text-white shadow-lg shadow-stone-300 transition duration-300 group-hover:bg-[#e64a3b]">
          {rec.initials}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-tight text-stone-950">
            {rec.name}
          </h3>
          <p className="mt-1 text-sm leading-snug text-stone-500">
            {rec.role} · {rec.company}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
            {rec.relationship}
          </p>
        </div>
      </div>

      <a
        href={rec.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#e64a3b] transition-colors hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e64a3b] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        aria-label={`View ${rec.name} on LinkedIn`}
      >
        View profile
        <span aria-hidden="true">-&gt;</span>
      </a>
    </div>
  </article>
)

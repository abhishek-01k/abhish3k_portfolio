import Image from "next/image"

interface Recommendation {
  quote: string
  name: string
  role: string
  company: string
  photo: string
  initials: string
  relationship?: string
  linkedin: string
}

const RecommendationCard = ({ rec }: { rec: Recommendation }) => (
  <article className="flex min-h-[300px] flex-col justify-between rounded-[1.5rem] bg-[#e9e9e9] p-5 text-stone-950 shadow-inner sm:min-h-[280px] sm:p-7">
    <div>
      <div className="flex items-center gap-4">
        <div className="recommendation-avatar-radius relative size-12 shrink-0 overflow-hidden rounded-full shadow-[0_10px_24px_rgba(28,25,23,0.18)]">
          <Image
            src={rec.photo}
            alt={rec.name}
            fill
            sizes="48px"
            className="recommendation-avatar-radius object-cover"
          />
        </div>
        <div>
          <h3 className="text-base font-bold text-stone-950">{rec.name}</h3>
          <p className="mt-1 text-sm text-stone-500">
            {rec.role}, {rec.company}
          </p>
        </div>
      </div>

      <p className="mt-7 max-w-2xl text-base font-medium leading-7 tracking-[-0.02em] text-stone-900 sm:text-lg sm:leading-8">
        &ldquo;{rec.quote}&rdquo;
      </p>
    </div>

    <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {rec.relationship && (
          <p className="text-sm text-stone-500">{rec.relationship}</p>
        )}
      </div>

      <a
        href={rec.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#e64a3b] transition-colors hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e64a3b] focus-visible:ring-offset-4 focus-visible:ring-offset-[#e9e9e9]"
        aria-label={`View ${rec.name} on LinkedIn`}
      >
        LinkedIn -&gt;
      </a>
    </div>
  </article>
)

export default RecommendationCard
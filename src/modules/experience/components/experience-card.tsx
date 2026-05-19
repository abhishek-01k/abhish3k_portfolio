import { TIMELINE } from "@/src/config/constants"

interface CardItem {
  year:    number
  company: string
  role:    string
  period:  string
  bullets: string[]
}

const ExperienceCard = ({
  item, index, cardW, isActive,
}: {
  item:     CardItem
  index:    number
  cardW:    number
  isActive: boolean
}) => (
  <div
    className="shrink-0 h-5/6 px-2 transition-all duration-300"
    style={{ width: `${cardW}px`, opacity: isActive ? 1 : 0.35 }}
  >
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl border bg-[#111111] flex flex-col px-8 py-7 transition-colors duration-300"
      style={{ borderColor: isActive ? "rgba(230,74,59,0.3)" : "rgb(38,38,38)" }}
    >
      {/* ── Meta row ─────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {isActive ? (
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e64a3b] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#e64a3b]" />
            </span>
          ) : (
            <span className="h-1.5 w-1.5 shrink-0" />
          )}
          <span
            className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase transition-colors duration-300"
            style={{ color: isActive ? "#e64a3b" : "#404040" }}
          >
            {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(TIMELINE.length).padStart(2, "0")}
          </span>
        </div>
        <span className="text-[9px] font-bold tracking-[0.28em] text-neutral-600 uppercase">
          {item.company}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-neutral-800 mb-6 shrink-0" />

      {/* ── 4 bullet points ──────────────────────────────────── */}
      <ul className="flex-1 space-y-4 min-h-0">
        {item.bullets.map((b, j) => (
          <li key={j} className="flex gap-4">
            <span className="text-[#e64a3b] shrink-0 mt-0.5 text-sm">—</span>
            <p className="text-neutral-300 text-sm leading-relaxed">{b}</p>
          </li>
        ))}
      </ul>

      {/* ── Year watermark — bottom-right ────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 right-5 select-none">
        <span
          className="font-bold leading-none tabular-nums"
          style={{ fontSize: "clamp(4rem, 8vw, 6.5rem)", color: "#1a1a1a" }}
        >
          {item.year}
        </span>
      </div>
    </div>
  </div>
)

export default ExperienceCard

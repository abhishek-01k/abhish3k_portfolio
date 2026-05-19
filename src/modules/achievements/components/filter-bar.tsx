"use client"

interface FilterBarProps {
  tags: string[]
  active: string
  onChange: (tag: string) => void
}

export const FilterBar = ({ tags, active, onChange }: FilterBarProps) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
    {["all", ...tags].map((tag) => (
      <button
        key={tag}
        onClick={() => onChange(tag)}
        className="shrink-0 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm border transition-colors duration-200 focus:outline-none"
        style={{
          borderColor:      active === tag ? "#e64a3b" : "rgb(38,38,38)",
          color:            active === tag ? "#e64a3b" : "#525252",
          backgroundColor:  active === tag ? "rgba(230,74,59,0.08)" : "transparent",
        }}
      >
        {tag}
      </button>
    ))}
  </div>
)

interface PinProps {
  type: "thumbtack" | "washi-tape" | "binder-clip" | "paperclip"
  color?: string
}

export const Pin = ({ type, color = "#e64a3b" }: PinProps) => {
  if (type === "thumbtack") {
    return (
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <div
          className="w-4 h-4 rounded-full shadow-lg ring-1 ring-black/20"
          style={{ backgroundColor: color }}
        />
        <div className="w-0.5 h-3 bg-neutral-600 opacity-50" />
      </div>
    )
  }

  if (type === "washi-tape") {
    return (
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-6 z-10"
        style={{ width: "60px", height: "18px" }}
      >
        <div
          className="w-full h-full rounded-sm opacity-60"
          style={{
            backgroundColor: color,
            backgroundImage:
              "repeating-linear-gradient(90deg,transparent,transparent 6px,rgba(0,0,0,0.08) 6px,rgba(0,0,0,0.08) 7px)",
          }}
        />
      </div>
    )
  }

  if (type === "binder-clip") {
    return (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
          <rect x="4" y="10" width="16" height="14" rx="1" fill="#555" stroke="#333" strokeWidth="1" />
          <rect x="8" y="10" width="8" height="14" fill="#666" />
          <path d="M7 10 C7 4 17 4 17 10" stroke="#444" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M9 10 C9 6.5 15 6.5 15 10" stroke="#333" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    )
  }

  if (type === "paperclip") {
    return (
      <div className="absolute -top-5 right-3 z-10 rotate-12">
        <svg width="14" height="32" viewBox="0 0 14 32" fill="none">
          <path
            d="M7 2 C10.5 2 13 4.5 13 8 L13 22 C13 27 9.5 30 5.5 30 C1.5 30 -1 27 -1 22 L-1 8"
            stroke="#666"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M7 6 C9 6 10 7.5 10 9 L10 22 C10 25.5 8 28 5.5 28 C3 28 1 25.5 1 22 L1 8"
            stroke="#888"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    )
  }

  return null
}

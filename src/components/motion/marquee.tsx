import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/src/lib/utils"

/** Infinite horizontal ticker. Content is rendered twice for a seamless loop. */
export const Marquee = ({
  children,
  duration = 40,
  reverse = false,
  className,
}: {
  children: ReactNode
  duration?: number
  reverse?: boolean
  className?: string
}) => (
  <div
    className={cn("marquee flex overflow-hidden", className)}
    style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
  >
    <div
      className="marquee-track flex shrink-0 items-center"
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden>
        {children}
      </div>
    </div>
  </div>
)

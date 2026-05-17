"use client"

import { useEffect, useRef, useState } from "react"

interface StatCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export const StatCounter = ({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  className,
}: StatCounterProps) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef<HTMLSpanElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    const el = nodeRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animatedRef.current) return
        animatedRef.current = true

        const startTime = performance.now()

        const tick = (now: number) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          // ease-out cubic — fast start, smooth finish
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * value))

          if (progress < 1) {
            requestAnimationFrame(tick)
          } else {
            setCount(value)
          }
        }

        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.6 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={nodeRef} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

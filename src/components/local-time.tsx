"use client"

import { useEffect, useState } from "react"

import { SITE } from "@/src/config/constants"

const format = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: SITE.timezone,
  }).format(new Date())

/** Live clock in Abhishek's timezone. Renders a placeholder until mounted. */
export const LocalTime = ({ seconds = false }: { seconds?: boolean }) => {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(format())
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const shown = time ? (seconds ? time : time.slice(0, 5)) : "--:--"
  return <span suppressHydrationWarning>{shown} IST</span>
}

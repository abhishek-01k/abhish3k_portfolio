"use client"

import { useEffect, useState } from "react"

const ROLES = ["Software Developer", "AI Engineer", "Blockchain Developer"]
const TYPE_SPEED = 65
const DELETE_SPEED = 35
const PAUSE_AFTER_TYPE = 1800
const PAUSE_AFTER_DELETE = 350

type Phase = "typing" | "deleting"

export const TypewriterEffect = () => {
  const [displayed, setDisplayed] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("typing")

  useEffect(() => {
    const current = ROLES[roleIndex]
    let timer: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timer = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          TYPE_SPEED
        )
      } else {
        timer = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE)
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(
          () => setDisplayed((d) => d.slice(0, -1)),
          DELETE_SPEED
        )
      } else {
        timer = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % ROLES.length)
          setPhase("typing")
        }, PAUSE_AFTER_DELETE)
      }
    }

    return () => clearTimeout(timer)
  }, [displayed, phase, roleIndex])

  return (
    <>
      {displayed}
      <span
        className="typewriter-cursor ml-0.5 inline-block w-[2px] bg-neutral-900 align-middle"
        style={{ height: "0.85em" }}
      />
    </>
  )
}

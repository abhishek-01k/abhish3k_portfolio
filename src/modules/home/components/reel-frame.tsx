"use client"

import { useEffect, useRef, useState } from "react"

import { REEL_SRC } from "@/src/config/constants"
import { AsciiField } from "./ascii-field"

const pad = (n: number) => String(n).padStart(2, "0")

const Timecode = () => {
  const [frames, setFrames] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const id = window.setInterval(() => {
      setFrames(Math.floor(((performance.now() - start) / 1000) * 24))
    }, 1000 / 24)
    return () => window.clearInterval(id)
  }, [])
  const s = Math.floor(frames / 24)
  return (
    <span className="tabular-nums">
      {pad(Math.floor(s / 3600))}:{pad(Math.floor(s / 60) % 60)}:{pad(s % 60)}:
      {pad(frames % 24)}
    </span>
  )
}

/**
 * Showreel slot. While REEL_SRC is null it shows an "in production" frame
 * over the live ASCII field; once a file is set it plays the reel.
 */
export const ReelFrame = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  return (
    <div
      data-cursor={REEL_SRC ? (muted ? "Sound" : "Mute") : "Soon"}
      className="group relative aspect-[16/10] w-full overflow-hidden rounded-md border border-line-strong bg-ink-2"
      onClick={() => {
        if (!REEL_SRC || !videoRef.current) return
        videoRef.current.muted = !muted
        setMuted(!muted)
      }}
    >
      {REEL_SRC ? (
        <video
          ref={videoRef}
          src={REEL_SRC}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <AsciiField />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,11,0.85)_100%)]" />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="font-serif text-4xl text-bone italic sm:text-5xl">
              Showreel
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.3em] text-muted-ink uppercase">
              In production · dropping soon
            </p>
          </div>
        </>
      )}

      {/* Viewfinder chrome */}
      <div className="pointer-events-none absolute inset-0 p-3 font-mono text-[10px] tracking-[0.2em] text-bone/70 uppercase sm:p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="live-dot h-2 w-2 rounded-full bg-ember text-ember" />
            {REEL_SRC ? "Playing" : "Rec"}
          </span>
          <Timecode />
        </div>
        <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
          reel_2026.mp4
        </span>
        <span className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4">
          4K · 24fps
        </span>
        {/* corner ticks */}
        {[
          "left-1.5 top-1.5 border-l border-t",
          "right-1.5 top-1.5 border-r border-t",
          "bottom-1.5 left-1.5 border-b border-l",
          "bottom-1.5 right-1.5 border-b border-r",
        ].map((pos) => (
          <span
            key={pos}
            className={`absolute h-3 w-3 border-bone/50 ${pos}`}
          />
        ))}
      </div>
    </div>
  )
}

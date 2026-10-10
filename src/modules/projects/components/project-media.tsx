"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

import { cn } from "@/src/lib/utils"
import type { Project } from "../project-utils"

const isVideoSrc = (src: string) => /\.(mov|mp4|webm)$/i.test(src)

/**
 * Project preview: video (played only while on screen), image, or a
 * typographic fallback when a project has no media yet.
 */
export const ProjectMedia = ({
  project,
  className,
  fit = "cover",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  controls = false,
}: {
  project: Project
  className?: string
  fit?: "cover" | "contain"
  sizes?: string
  priority?: boolean
  controls?: boolean
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const src = project.image

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = "auto"
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: "200px 0px" }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [src])

  const fitClass = fit === "cover" ? "object-cover" : "object-contain"

  if (!src) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-end overflow-hidden bg-ink-3 p-6",
          className
        )}
      >
        <div className="bg-grid absolute inset-0 opacity-60" />
        <span className="relative font-serif text-[clamp(3rem,8vw,7rem)] leading-none text-bone/15 italic">
          {project.title}
        </span>
      </div>
    )
  }

  if (isVideoSrc(src)) {
    return (
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        controls={controls}
        preload="metadata"
        className={cn("absolute inset-0 h-full w-full", fitClass, className)}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={`${project.title} preview`}
      fill
      sizes={sizes}
      priority={priority}
      className={cn(fitClass, className)}
    />
  )
}

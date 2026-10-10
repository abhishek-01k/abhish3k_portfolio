"use client"

import { useEffect, useRef } from "react"

const RAMP = " .,:;-~=+*xX#%$@"
const CELL_W = 11
const CELL_H = 16
const FONT = `500 12px ui-monospace, "Geist Mono", "SFMono-Regular", Menlo, monospace`
const FRAME_MS = 1000 / 30
const LENS_RADIUS = 150
const IDLE_MS = 2200

type Ripple = { x: number; y: number; t: number }

const ACCENT = { r: 230, g: 74, b: 59 }
const BASE = { r: 120, g: 116, b: 110 }

/**
 * A flowing field of ASCII glyphs. The cursor acts as a lens that brightens
 * nearby glyphs and tints them red; clicks send out a ripple. With no pointer
 * (touch devices, idle) the lens drifts on its own.
 */
export const AsciiField = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let cols = 0
    let rows = 0
    let width = 0
    let height = 0
    let raf = 0
    let last = 0
    let visible = true
    const start = performance.now()

    const pointer = { x: -9999, y: -9999, lastMove: 0 }
    const lens = { x: 0, y: 0 }
    let ripples: Ripple[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = FONT
      ctx.textBaseline = "top"
      cols = Math.ceil(width / CELL_W)
      rows = Math.ceil(height / CELL_H)
      lens.x = width * 0.62
      lens.y = height * 0.42
    }

    const draw = (now: number) => {
      const t = (now - start) / 1000

      // Lens follows the pointer, or drifts when idle.
      const idle = now - pointer.lastMove > IDLE_MS
      const tx = idle ? width * (0.5 + 0.32 * Math.sin(t * 0.37)) : pointer.x
      const ty = idle
        ? height * (0.5 + 0.28 * Math.sin(t * 0.53 + 1.3))
        : pointer.y
      lens.x += (tx - lens.x) * (idle ? 0.03 : 0.18)
      lens.y += (ty - lens.y) * (idle ? 0.03 : 0.18)

      ripples = ripples.filter((r) => t - r.t < 2.4)

      ctx.clearRect(0, 0, width, height)

      for (let row = 0; row < rows; row++) {
        const y = row * CELL_H
        for (let col = 0; col < cols; col++) {
          const x = col * CELL_W

          // Layered sines make a cheap, smooth flow field.
          let v =
            Math.sin(col * 0.11 + t * 0.9) * 0.35 +
            Math.sin(row * 0.17 - t * 0.7 + col * 0.05) * 0.35 +
            Math.sin((col + row) * 0.07 + t * 0.4) * 0.3
          v = (v + 1) / 2 // 0..1

          const dx = x - lens.x
          const dy = y - lens.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const lensK = Math.max(0, 1 - dist / LENS_RADIUS)
          const lensEase = lensK * lensK * (3 - 2 * lensK)

          let rippleK = 0
          for (const r of ripples) {
            const age = t - r.t
            const radius = age * 420
            const d = Math.hypot(x - r.x, y - r.y)
            const band = 1 - Math.abs(d - radius) / 46
            if (band > 0) rippleK += band * (1 - age / 2.4)
          }
          rippleK = Math.min(rippleK, 1)

          const energy = Math.min(1, v * 0.55 + lensEase * 0.9 + rippleK * 0.8)
          const ch =
            RAMP[Math.min(RAMP.length - 1, Math.floor(energy * RAMP.length))]
          if (ch === " ") continue

          const heat = Math.min(1, lensEase * 1.2 + rippleK)
          const r = Math.round(BASE.r + (ACCENT.r - BASE.r) * heat)
          const g = Math.round(BASE.g + (ACCENT.g - BASE.g) * heat)
          const b = Math.round(BASE.b + (ACCENT.b - BASE.b) * heat)
          const a = 0.18 + energy * 0.5 + heat * 0.32

          ctx.fillStyle = `rgba(${r},${g},${b},${a})`
          ctx.fillText(ch, x, y)
        }
      }
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || now - last < FRAME_MS) return
      last = now
      draw(now)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.lastMove = performance.now()
    }
    const onPointerLeave = () => {
      pointer.lastMove = 0
    }
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t: (performance.now() - start) / 1000,
      })
    }

    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    const onVisibility = () => {
      visible = document.visibilityState === "visible"
    }
    document.addEventListener("visibilitychange", onVisibility)

    resize()
    if (reduceMotion) {
      draw(start)
    } else {
      canvas.addEventListener("pointermove", onPointerMove)
      canvas.addEventListener("pointerleave", onPointerLeave)
      canvas.addEventListener("pointerdown", onPointerDown)
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerleave", onPointerLeave)
      canvas.removeEventListener("pointerdown", onPointerDown)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  )
}

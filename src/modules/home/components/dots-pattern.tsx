"use client"

import { useEffect, useRef } from "react"

interface InteractiveDotsProps {
  backgroundColor?: string
  dotColor?: string
  gridSpacing?: number
  animationSpeed?: number
}

type Dot = {
  x: number
  y: number
  vx: number
  vy: number
  originalX: number
  originalY: number
  phase: number
}

type Ripple = {
  x: number
  y: number
  time: number
  intensity: number
}

const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "")
  if (h.length !== 6) return { r: 170, g: 170, b: 170 }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

export const InteractiveDots = ({
  backgroundColor = "#F0EEE6",
  dotColor = "#666666",
  gridSpacing = 24,
  animationSpeed = 0.003,
}: InteractiveDotsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0 }
    let dots: Dot[] = []
    let ripples: Ripple[] = []
    let rafId: number
    let time = 0
    const { r, g, b } = hexToRgb(dotColor)

    const buildDots = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      dots = []
      for (let ox = gridSpacing / 2; ox < w; ox += gridSpacing) {
        for (let oy = gridSpacing / 2; oy < h; oy += gridSpacing) {
          dots.push({
            x: ox, y: oy, vx: 0, vy: 0,
            originalX: ox, originalY: oy,
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    const syncSize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      // Only rebuild if size actually changed
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        buildDots()
      }
    }

    const draw = () => {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      time += animationSpeed
      const now = Date.now()

      // Decay mouse velocity each frame
      mouse.vx *= 0.8
      mouse.vy *= 0.8

      // Prune expired ripples
      ripples = ripples.filter((rp) => now - rp.time < 3000)

      const w = canvas.width
      const h = canvas.height

      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, w, h)

      for (const dot of dots) {
        // Mouse influence (push away)
        const dmx = dot.originalX - mouse.x
        const dmy = dot.originalY - mouse.y
        const dist = Math.sqrt(dmx * dmx + dmy * dmy)
        const mouseInfluence = Math.max(0, 1 - dist / 160)

        // Ripple influence
        let rippleInfluence = 0
        for (const rp of ripples) {
          const age = now - rp.time
          const drx = dot.originalX - rp.x
          const dry = dot.originalY - rp.y
          const d = Math.sqrt(drx * drx + dry * dry)
          const radius = (age / 3000) * 280
          const ringWidth = 55
          if (Math.abs(d - radius) < ringWidth) {
            rippleInfluence +=
              ((1 - age / 3000) * rp.intensity * (1 - Math.abs(d - radius) / ringWidth))
          }
        }
        rippleInfluence = Math.min(rippleInfluence, 2)

        const totalInfluence = mouseInfluence + rippleInfluence

        // Push direction away from cursor
        const validDist = dist > 0
        const nx = validDist ? dmx / dist : Math.cos(dot.phase)
        const ny = validDist ? dmy / dist : Math.sin(dot.phase)

        // Wake: dots near cursor drift in the direction the cursor is moving
        const wake = mouseInfluence * 0.35
        const targetX = dot.originalX + nx * mouseInfluence * 36 + mouse.vx * wake
        const targetY = dot.originalY + ny * mouseInfluence * 36 + mouse.vy * wake

        // Spring physics toward target
        dot.vx = (dot.vx + (targetX - dot.x) * 0.16) * 0.74
        dot.vy = (dot.vy + (targetY - dot.y) * 0.16) * 0.74
        dot.x += dot.vx
        dot.y += dot.vy

        const size = 1.8 + totalInfluence * 4
        const opacity = 0.35 + totalInfluence * 0.45

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const nx = e.clientX - rect.left
      const ny = e.clientY - rect.top
      mouse.vx = nx - mouse.x
      mouse.vy = ny - mouse.y
      mouse.x = nx
      mouse.y = ny
    }

    const onMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, time: Date.now(), intensity: 2 })
    }

    const observer = new ResizeObserver(syncSize)
    observer.observe(canvas)

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
    }
  }, [backgroundColor, dotColor, gridSpacing, animationSpeed])

  return (
    <div
      className="absolute inset-0 h-full w-full overflow-hidden"
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}

export default InteractiveDots

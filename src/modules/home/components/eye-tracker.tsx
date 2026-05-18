"use client"

import { useCallback, useEffect, useId, useRef } from "react"

// ─── Geometry ─────────────────────────────────────────────────────────────────
const W = 500
const H = 260
const CX = 250
const CY = 130
const EL = 25
const ER = 475
const UPPER_OPEN  = 30
const UPPER_CLOSE = 230
const LOWER_CTRL  = 230
const MAX_DRIFT   = 18
const BG          = "#0e0e0e"

// ─── Orbital grid config ──────────────────────────────────────────────────────
const RING_RADII    = [72, 102, 132, 162, 196, 232]
const RING_STROKE   = "#1d1d1d"
const BRACKET_COLOR = "#242424"
const BRACKET_ARM   = 26
const OUTER_R       = 232   // outermost ring radius
// corner positions (in SVG user-space)
const CORNERS = [
  { x: CX - OUTER_R, y: CY - OUTER_R, sx:  1, sy:  1 },
  { x: CX + OUTER_R, y: CY - OUTER_R, sx: -1, sy:  1 },
  { x: CX - OUTER_R, y: CY + OUTER_R, sx:  1, sy: -1 },
  { x: CX + OUTER_R, y: CY + OUTER_R, sx: -1, sy: -1 },
] as const
const CARDINALS = [[1, 0], [0, 1], [-1, 0], [0, -1]] as const

// ─── Path helpers ─────────────────────────────────────────────────────────────
const smoothstep = (t: number) => t * t * (3 - 2 * t)

const eyeArc = (ctrlY: number) =>
  `M${EL},${CY}Q${CX},${ctrlY} ${ER},${CY}`

const upperCoverPath = (ctrlY: number) =>
  `${eyeArc(ctrlY)}L${ER},0L${EL},0Z`

const lowerCoverPath = () =>
  `M${EL},${CY}Q${CX},${LOWER_CTRL} ${ER},${CY}L${ER},${H}L${EL},${H}Z`


// ─── Component ────────────────────────────────────────────────────────────────
export const EyeTracker = () => {
  const uid    = useId().replace(/:/g, "")
  const clipId = `sc-${uid}`
  const irisId = `iris-${uid}`
  const glowId = `glow-${uid}`

  const containerRef   = useRef<HTMLDivElement>(null)
  const irisRef        = useRef<HTMLDivElement>(null)
  const upperCoverRef  = useRef<SVGPathElement>(null)
  const upperEdgeRef   = useRef<SVGPathElement>(null)
  const timerRef       = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef         = useRef<number | null>(null)

  // ── Blink ────────────────────────────────────────────────────────────────
  const blink = useCallback(() => {
    const cover = upperCoverRef.current
    const edge  = upperEdgeRef.current
    if (!cover || !edge) return

    const CLOSE_MS = 75, HOLD_MS = 50, OPEN_MS = 130
    const start = performance.now()
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const setCtrl = (ctrlY: number) => {
      cover.setAttribute("d", upperCoverPath(ctrlY))
      edge.setAttribute("d",  eyeArc(ctrlY))
    }

    const tick = (now: number) => {
      const el = now - start
      let ctrlY: number
      if (el < CLOSE_MS) {
        ctrlY = UPPER_OPEN + (UPPER_CLOSE - UPPER_OPEN) * smoothstep(el / CLOSE_MS)
      } else if (el < CLOSE_MS + HOLD_MS) {
        ctrlY = UPPER_CLOSE
      } else if (el < CLOSE_MS + HOLD_MS + OPEN_MS) {
        ctrlY = UPPER_CLOSE - (UPPER_CLOSE - UPPER_OPEN) * smoothstep((el - CLOSE_MS - HOLD_MS) / OPEN_MS)
      } else {
        setCtrl(UPPER_OPEN)
        timerRef.current = setTimeout(blink, 2800 + Math.random() * 3400)
        return
      }
      setCtrl(ctrlY)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    timerRef.current = setTimeout(blink, 1200 + Math.random() * 1800)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (rafRef.current)   cancelAnimationFrame(rafRef.current)
    }
  }, [blink])

  // ── Cursor tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const container = containerRef.current
      const iris      = irisRef.current
      if (!container || !iris) return
      const rect  = container.getBoundingClientRect()
      const ecx   = rect.left + rect.width  * (CX / W)
      const ecy   = rect.top  + rect.height * (CY / H)
      const dx    = e.clientX - ecx
      const dy    = e.clientY - ecy
      const dist  = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)
      const move  = Math.min(dist / 350, 1) * MAX_DRIFT * (rect.width / W)
      iris.style.transform = `translate(${(Math.cos(angle) * move).toFixed(2)}px,${(Math.sin(angle) * move).toFixed(2)}px)`
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div style={{ paddingTop: "28%", paddingBottom: "28%", width: "100%" }}>
      <div
        ref={containerRef}
        className="mx-auto w-full max-w-[460px] select-none"
        style={{ position: "relative" }}
      >
        {/* ── SVG defs ────────────────────────────────────────────────── */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d="M0.05,0.5 Q0.5,0.1154 0.95,0.5 Q0.5,0.8846 0.05,0.5 Z" />
            </clipPath>
            <radialGradient id={irisId} cx="50%" cy="45%" r="50%">
              <stop offset="0%"   stopColor="#3a1a0a" />
              <stop offset="40%"  stopColor="#1e0e05" />
              <stop offset="100%" stopColor="#0a0503" />
            </radialGradient>
            <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#e64a3b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#e64a3b" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* ── Layer 0: Orbital grid (behind iris and lids) ─────────────── */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
          aria-hidden
        >
          {RING_RADII.map((r) => (
            <g key={r}>
              <circle
                cx={CX} cy={CY} r={r}
                fill="none"
                stroke={RING_STROKE}
                strokeWidth="0.65"
              />
              {CARDINALS.map(([cos, sin], d) => (
                <circle
                  key={d}
                  cx={CX + r * cos}
                  cy={CY + r * sin}
                  r="2.2"
                  fill="#272727"
                />
              ))}
            </g>
          ))}

          {/* Corner reticle brackets */}
          {CORNERS.map(({ x, y, sx, sy }, i) => (
            <g key={i} stroke={BRACKET_COLOR} strokeWidth="1.4" strokeLinecap="square" fill="none">
              <line x1={x} y1={y} x2={x + sx * BRACKET_ARM} y2={y} />
              <line x1={x} y1={y} x2={x}                    y2={y + sy * BRACKET_ARM} />
            </g>
          ))}
        </svg>

        {/* ── Layer 1: Iris (clipped to eye shape) ────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `url(#${clipId})`,
            overflow: "hidden",
          }}
        >
          <div ref={irisRef} style={{ width: "100%", height: "100%" }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
              <ellipse cx={CX} cy={CY} rx="230" ry="105" fill="#ede5dc" />
              <ellipse cx={CX} cy={CY} rx="110" ry="110" fill={`url(#${glowId})`} />
              <circle  cx={CX} cy={CY} r="75"   fill={`url(#${irisId})`} />
              <circle  cx={CX} cy={CY} r="75"   fill="none" stroke="#5a2a10" strokeWidth="3"   opacity="0.6" />
              <circle  cx={CX} cy={CY} r="62"   fill="none" stroke="#7a3a18" strokeWidth="1.5" opacity="0.3" />
              <circle  cx={CX} cy={CY} r="36"   fill="#050202" />
              <circle  cx={CX - 22}  cy={CY - 22}  r="13" fill="white" opacity="0.55" />
              <circle  cx={CX + 18}  cy={CY + 14}  r="5"  fill="white" opacity="0.2"  />
            </svg>
          </div>
        </div>

        {/* ── Layer 2: Eyelid covers + lashes (top, BG fills mask rings) ─ */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ position: "relative", overflow: "visible" }}
          aria-hidden
        >
          <path d={lowerCoverPath()} fill={BG} />
          <path d={eyeArc(LOWER_CTRL)} fill="none" stroke="#2a1a0e" strokeWidth="2.0" />

          <path ref={upperCoverRef} d={upperCoverPath(UPPER_OPEN)} fill={BG} />
          <path ref={upperEdgeRef}  d={eyeArc(UPPER_OPEN)} fill="none" stroke="#2a1a0e" strokeWidth="2.0" />
        </svg>
      </div>
    </div>
  )
}

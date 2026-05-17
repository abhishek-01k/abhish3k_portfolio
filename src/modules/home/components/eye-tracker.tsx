"use client"

import { useCallback, useEffect, useId, useRef } from "react"

// ─── Geometry constants ───────────────────────────────────────────────────────
const W = 500
const H = 260
const CX = 250          // eye centre X
const CY = 130          // eye centre Y
const EL = 25           // left corner X
const ER = 475          // right corner X
const UPPER_OPEN = 30   // upper-lid bezier ctrl-Y  (eye open)
const UPPER_CLOSE = 230 // upper-lid bezier ctrl-Y  (eye closed)
const LOWER_CTRL = 230  // lower-lid bezier ctrl-Y  (static)
const IRIS_R = 74
const PUPIL_R = 34
const MAX_DRIFT = 18    // max iris offset in SVG units
const BG = "#0e0e0e"    // section background — must match AboutSection

const smoothstep = (t: number) => t * t * (3 - 2 * t)

// ─── SVG path helpers ─────────────────────────────────────────────────────────
const eyeArc = (ctrlY: number) =>
  `M${EL},${CY}Q${CX},${ctrlY} ${ER},${CY}`

const upperCoverPath = (ctrlY: number) =>
  `${eyeArc(ctrlY)}L${ER},0L${EL},0Z`

const scleraPath = () =>
  `M${EL},${CY}Q${CX},${UPPER_OPEN} ${ER},${CY}Q${CX},${LOWER_CTRL} ${EL},${CY}Z`

const lowerCoverPath = () =>
  `M${EL},${CY}Q${CX},${LOWER_CTRL} ${ER},${CY}L${ER},${H}L${EL},${H}Z`

// ─── Lash builder: positions + outward normals along a bezier ─────────────────
const buildLashes = (ctrlY: number, count = 21): string => {
  const segs: string[] = []
  for (let i = 0; i < count; i++) {
    const t = 0.05 + (i / (count - 1)) * 0.9   // t ∈ [0.05, 0.95]
    const mt = 1 - t
    const x = mt * mt * EL + 2 * mt * t * CX + t * t * ER
    const y = mt * mt * CY + 2 * mt * t * ctrlY + t * t * CY

    // Quadratic bezier tangent
    const tx = 2 * (1 - t) * (CX - EL) + 2 * t * (ER - CX)  // ≡ 440
    const ty = 2 * (1 - t) * (ctrlY - CY) + 2 * t * (CY - ctrlY)

    // Outward normal for UPPER lid: rotate tangent 90 ° clockwise → (ty, –tx)
    const nx = ty
    const ny = -tx
    const nLen = Math.sqrt(nx * nx + ny * ny)

    // Lash length: longest at centre arc, shorter at corners
    const lashLen = 10 + 13 * Math.sin(t * Math.PI)
    const ex = x + (nx / nLen) * lashLen
    const ey = y + (ny / nLen) * lashLen

    segs.push(`M${x.toFixed(1)},${y.toFixed(1)}L${ex.toFixed(1)},${ey.toFixed(1)}`)
  }
  return segs.join("")
}

// Lower lashes: shorter, sparser, normals rotated the other way
const buildLowerLashes = (count = 11): string => {
  const segs: string[] = []
  for (let i = 0; i < count; i++) {
    const t = 0.15 + (i / (count - 1)) * 0.7
    const mt = 1 - t
    const x = mt * mt * EL + 2 * mt * t * CX + t * t * ER
    const y = mt * mt * CY + 2 * mt * t * LOWER_CTRL + t * t * CY

    const tx = 2 * (1 - t) * (CX - EL) + 2 * t * (ER - CX)
    const ty = 2 * (1 - t) * (LOWER_CTRL - CY) + 2 * t * (CY - LOWER_CTRL)

    // Outward normal for LOWER lid: rotate CCW → (–ty, tx)
    const nx = -ty
    const ny = tx
    const nLen = Math.sqrt(nx * nx + ny * ny)
    const lashLen = 5 + 7 * Math.sin(t * Math.PI)
    const ex = x + (nx / nLen) * lashLen
    const ey = y + (ny / nLen) * lashLen
    segs.push(`M${x.toFixed(1)},${y.toFixed(1)}L${ex.toFixed(1)},${ey.toFixed(1)}`)
  }
  return segs.join("")
}

const LOWER_LASHES = buildLowerLashes()

// ─── Component ────────────────────────────────────────────────────────────────
export const EyeTracker = () => {
  const uid       = useId().replace(/:/g, "")
  const clipId    = `sc-${uid}`
  const irisGrad  = `ig-${uid}`
  const scleraGrad = `sg-${uid}`

  const containerRef    = useRef<HTMLDivElement>(null)
  const irisRef         = useRef<SVGGElement>(null)
  const upperCoverRef   = useRef<SVGPathElement>(null)
  const upperEdgeRef    = useRef<SVGPathElement>(null)
  const upperLashesRef  = useRef<SVGPathElement>(null)
  const timerRef        = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef          = useRef<number | null>(null)

  // ── Blink animation ──────────────────────────────────────────────────────
  const blink = useCallback(() => {
    const cover  = upperCoverRef.current
    const edge   = upperEdgeRef.current
    const lashes = upperLashesRef.current
    if (!cover || !edge || !lashes) return

    const CLOSE_MS = 75
    const HOLD_MS  = 50
    const OPEN_MS  = 130
    const start    = performance.now()

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const setCtrl = (ctrlY: number) => {
      cover.setAttribute("d",  upperCoverPath(ctrlY))
      edge.setAttribute("d",   eyeArc(ctrlY))
      lashes.setAttribute("d", buildLashes(ctrlY))
    }

    const tick = (now: number) => {
      const el = now - start
      let ctrlY: number

      if (el < CLOSE_MS) {
        ctrlY = UPPER_OPEN + (UPPER_CLOSE - UPPER_OPEN) * smoothstep(el / CLOSE_MS)
      } else if (el < CLOSE_MS + HOLD_MS) {
        ctrlY = UPPER_CLOSE
      } else if (el < CLOSE_MS + HOLD_MS + OPEN_MS) {
        const p = (el - CLOSE_MS - HOLD_MS) / OPEN_MS
        ctrlY = UPPER_CLOSE - (UPPER_CLOSE - UPPER_OPEN) * smoothstep(p)
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

  // ── Cursor tracking ──────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el    = containerRef.current
      const group = irisRef.current
      if (!el || !group) return

      const rect  = el.getBoundingClientRect()
      const ecx   = rect.left + rect.width  * (CX / W)
      const ecy   = rect.top  + rect.height * (CY / H)
      const dx    = e.clientX - ecx
      const dy    = e.clientY - ecy
      const dist  = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)
      const move  = Math.min(dist / 350, 1) * MAX_DRIFT

      group.setAttribute(
        "transform",
        `translate(${(Math.cos(angle) * move).toFixed(2)},${(Math.sin(angle) * move).toFixed(2)})`,
      )
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[460px] select-none">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full overflow-visible"
        aria-hidden
      >
        <defs>
          {/* Sclera clip — everything inside the eye opening */}
          <clipPath id={clipId}>
            <path d={scleraPath()} />
          </clipPath>

          {/* Iris: dark-centred radial gradient for depth */}
          <radialGradient id={irisGrad} cx="45%" cy="38%" r="65%">
            <stop offset="0%"   stopColor="#0a0500" />
            <stop offset="30%"  stopColor="#3b1d07" />
            <stop offset="60%"  stopColor="#6a3812" />
            <stop offset="82%"  stopColor="#7e421d" />
            <stop offset="100%" stopColor="#180c04" />
          </radialGradient>

          {/* Sclera: subtle warm-white gradient (brighter near pupil zone) */}
          <radialGradient id={scleraGrad} cx="50%" cy="50%" r="55%">
            <stop offset="0%"   stopColor="#f8f0e8" />
            <stop offset="100%" stopColor="#e8ddd4" />
          </radialGradient>
        </defs>

        {/* ── 1. Sclera (white of eye) ─────────────────────────── */}
        <path d={scleraPath()} fill={`url(#${scleraGrad})`} />

        {/* ── 2. Iris + pupil (cursor-tracked, clipped to sclera) ── */}
        <g ref={irisRef} clipPath={`url(#${clipId})`}>
          {/* Iris base */}
          <circle cx={CX} cy={CY} r={IRIS_R} fill={`url(#${irisGrad})`} />

          {/* Iris fibre texture — concentric rings */}
          <circle cx={CX} cy={CY} r={IRIS_R - 2}  stroke="#0d0600" strokeWidth="2"   fill="none" opacity="0.9" />
          <circle cx={CX} cy={CY} r={IRIS_R - 10} stroke="#4c2610" strokeWidth="0.8" fill="none" opacity="0.5" />
          <circle cx={CX} cy={CY} r={IRIS_R - 22} stroke="#2e1408" strokeWidth="0.6" fill="none" opacity="0.35" />
          <circle cx={CX} cy={CY} r={IRIS_R - 36} stroke="#1a0b04" strokeWidth="0.5" fill="none" opacity="0.25" />

          {/* Pupil */}
          <circle cx={CX} cy={CY} r={PUPIL_R} fill="#060301" />

          {/* Corneal highlight — large, soft, offset (main specular) */}
          <ellipse
            cx={CX + 19} cy={CY - 19}
            rx={14} ry={9}
            fill="white" opacity="0.78"
            transform={`rotate(-22,${CX + 19},${CY - 19})`}
          />
          {/* Small secondary reflection */}
          <circle cx={CX - 17} cy={CY + 21} r="5.5" fill="white" opacity="0.3" />
        </g>

        {/* ── 3. Limbal ring (darkens iris/sclera boundary) ─────── */}
        <circle
          cx={CX} cy={CY} r={IRIS_R}
          stroke="#0a0400" strokeWidth="3.5" fill="none"
          clipPath={`url(#${clipId})`}
        />

        {/* ── 4. Lower lid cover (dark fill below eye) ──────────── */}
        <path d={lowerCoverPath()} fill={BG} />

        {/* ── 5. Lower eyelid edge ──────────────────────────────── */}
        <path
          d={eyeArc(LOWER_CTRL)}
          fill="none" stroke="#1a1208" strokeWidth="2.2"
        />

        {/* ── 6. Lower lashes (static) ──────────────────────────── */}
        <path
          d={LOWER_LASHES}
          stroke="#1c130a" strokeWidth="1.6"
          strokeLinecap="round" fill="none"
        />

        {/* ── 7. Upper lid cover (animated — sweeps down on blink) ─ */}
        <path ref={upperCoverRef} d={upperCoverPath(UPPER_OPEN)} fill={BG} />

        {/* ── 8. Upper eyelid edge (animated with lid) ──────────── */}
        <path
          ref={upperEdgeRef}
          d={eyeArc(UPPER_OPEN)}
          fill="none" stroke="#120d07" strokeWidth="2.8"
        />

        {/* ── 9. Upper lashes (animated — follow lid during blink) ─ */}
        <path
          ref={upperLashesRef}
          d={buildLashes(UPPER_OPEN)}
          stroke="#1a1009" strokeWidth="1.9"
          strokeLinecap="round" fill="none"
        />
      </svg>
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"

const FONT_DEF: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
}

const TEXT = ["A", "B", "H", "I", "S", "H", "3", "K"]
const BG_POOL = ["x", "x", "x", "X", "X", "$", "+", ";", "."]
const FILL_POOL = ["$", "X", "x", "S", "#", "I", "I", "I", "$"]

const FONT_H = 7
const FONT_PX = 11
const LINE_H = 1
const ROW_H = FONT_PX * LINE_H // 11 px per row
const CHAR_PX = 7.2 // px per char (Courier New 11px + 0.5 letter-spacing)

const rndBg = () => BG_POOL[Math.floor(Math.random() * BG_POOL.length)]
const fillChar = (f: number, x: number, y: number) =>
  FILL_POOL[(f + x * 3 + y * 7) % FILL_POOL.length]

function buildMaps(containerW: number, containerH: number) {
  // Background grid spans the full container width
  const W = Math.max(60, Math.floor(containerW / CHAR_PX))
  const H = Math.max(10, Math.floor(containerH / ROW_H))

  // The text zone tracks the viewport so ABHISH3K grows as the screen grows.
  const zoneW = containerW // px
  const zoneChars = Math.max(40, Math.floor(zoneW / CHAR_PX)) // chars
  const zoneOffset = Math.floor((W - zoneChars) / 2) // left offset in chars

  // Scale text to fill ~96 % of the zone width and ~82 % of the height
  const SX = Math.max(4, Math.floor((zoneChars * 0.96) / (8 * 5 + 7)))
  const SY = Math.max(2, Math.floor((H * 0.82) / FONT_H))
  const GAP = Math.max(1, Math.round(SX / 4))

  const textW = TEXT.length * (5 * SX + GAP) - GAP
  const textH = FONT_H * SY
  // Centre text within the zone, then offset by the zone's left edge
  const startX = zoneOffset + Math.floor((zoneChars - textW) / 2)
  const startY = Math.floor((H - textH) / 2)

  const mask: boolean[][] = Array.from({ length: H }, () =>
    Array(W).fill(false)
  )

  TEXT.forEach((ch, li) => {
    const rows = FONT_DEF[ch]
    if (!rows) return
    const lx = startX + li * (5 * SX + GAP)
    for (let py = 0; py < FONT_H; py++) {
      for (let px = 0; px < 5; px++) {
        if (rows[py][px] !== "1") continue
        for (let sy = 0; sy < SY; sy++) {
          for (let sx = 0; sx < SX; sx++) {
            const gy = startY + py * SY + sy
            const gx = lx + px * SX + sx
            if (gy >= 0 && gy < H && gx >= 0 && gx < W) mask[gy][gx] = true
          }
        }
      }
    }
  })

  const centres = TEXT.map((_, li) => ({
    cx: startX + li * (5 * SX + GAP) + (5 * SX) / 2,
    cy: startY + textH / 2,
  }))
  const fadeR = SX * 1.8
  const shadowC = Math.max(10, Math.floor(W * 0.06))

  const zone: Uint8Array[] = Array.from({ length: H }, (_, y) =>
    new Uint8Array(W).map((_, x) => {
      if (mask[y][x]) return 0
      if (x > W - shadowC) return 2
      const minD = Math.min(
        ...centres.map(({ cx, cy }) => Math.sqrt((x - cx) ** 2 + (y - cy) ** 2))
      )
      return minD < fadeR ? 1 : 0
    })
  )

  return { W, H, mask, zone }
}

export default function AsciiHero() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    let frame = 0
    let raf = 0
    let timer = 0
    let active = true

    let W = 0,
      H = 0
    let mask: boolean[][] = []
    let zone: Uint8Array[] = []
    let grid: string[][] = []

    const init = (w: number, h: number) => {
      const viewportW = window.innerWidth
      const fullW = Math.max(w, viewportW)
      if (fullW < 10 || h < 10) return // skip until layout is ready
      ;({ W, H, mask, zone } = buildMaps(fullW, h))
      grid = Array.from({ length: H }, () => Array.from({ length: W }, rndBg))
    }

    const tick = () => {
      if (!active || !inner || H === 0) return
      frame++

      for (let i = 0; i < 60; i++) {
        const rx = Math.floor(Math.random() * W)
        const ry = Math.floor(Math.random() * H)
        if (!mask[ry]?.[rx]) grid[ry][rx] = rndBg()
      }

      let html = ""
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (mask[y][x]) {
            const pulse = Math.sin(frame * 0.08 + x * 0.3 + y * 0.5)
            const col =
              pulse > 0.3 ? "#c8ff3d" : pulse > -0.1 ? "#b4ec2a" : "#8fc21a"
            html += `<b style="color:${col};text-shadow:0 0 8px rgba(200,255,61,0.35)">${fillChar(frame, x, y)}</b>`
          } else {
            const wave = Math.round(Math.sin(frame * 0.06 + y * 0.32) * 3)
            const sx = (x + wave + W) % W
            const ch = grid[y][sx]
            const z = zone[y][x]
            if (z === 1) html += `<span style="color:#3a3a3d">${ch}</span>`
            else if (z === 2) html += `<span style="color:#2a2a2d">${ch}</span>`
            else html += ch
          }
        }
        if (y < H - 1) html += "\n"
      }
      inner.innerHTML = html

      timer = window.setTimeout(() => {
        raf = requestAnimationFrame(tick)
      }, 80)
    }

    // ResizeObserver fires once the flex-1 height is resolved by the browser,
    // then again on every window resize — this is the correct hook point.
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      init(width, height)
      frame = 0
      raf = requestAnimationFrame(tick)
    })
    ro.observe(outer)

    return () => {
      active = false
      ro.disconnect()
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      ref={outerRef}
      className="w-full flex-1 overflow-hidden select-none"
      style={{ background: "#0a0a0b" }}
    >
      <div
        ref={innerRef}
        aria-label="ASCII art animation spelling ABHISH3K"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: `${FONT_PX}px`,
          lineHeight: LINE_H,
          letterSpacing: "0.5px",
          whiteSpace: "pre",
          color: "#232326",
          background: "transparent",
          overflowX: "hidden",
          width: "100vw",
          boxSizing: "border-box",
          display: "block",
        }}
      />
    </div>
  )
}

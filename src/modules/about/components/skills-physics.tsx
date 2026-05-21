"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/src/lib/utils"

// ── Skill definitions ─────────────────────────────────────────
interface Skill { name: string; img: string; radius: number }

const SKILLS: Skill[] = [
  { name: "React",       img: "/skills/ReactJs.svg",      radius: 58 },
  { name: "Next.js",     img: "/skills/NextJs",           radius: 52 },
  { name: "TypeScript",  img: "/skills/typescript.webp",  radius: 56 },
  { name: "Tailwind",    img: "/skills/tailwindcss.webp", radius: 50 },
  { name: "Fastify",     img: "/skills/Fastify.webp",     radius: 46 },
  { name: "Figma",       img: "/skills/Figma.webp",       radius: 52 },
  { name: "GitHub",      img: "/skills/github.webp",      radius: 48 },
  { name: "Node.js",     img: "/skills/nodejs.webp",      radius: 56 },
  { name: "Python",      img: "/skills/python.webp",      radius: 54 },
  { name: "PostgreSQL",  img: "/skills/postgresql.webp",  radius: 50 },
  { name: "MongoDB",     img: "/skills/mongoDb.webp",     radius: 52 },
  { name: "Docker",      img: "/skills/docker.webp",      radius: 58 },
  { name: "LangChain",   img: "/skills/langchain.webp",   radius: 46 },
  { name: "Ollama",      img: "/skills/ollama.webp",      radius: 50 },
  { name: "C++",         img: "/skills/C++.webp",         radius: 48 },
  { name: "OpenAI",      img: "/skills/openai.webp",      radius: 54 },
  { name: "Anthropic",   img: "/skills/anthropic.webp",   radius: 60 },
  { name: "Postman",     img: "/skills/postman.webp",     radius: 52 },
]

// ── Golf-ball renderer ────────────────────────────────────────
// Draws a shiny white sphere with the skill logo as a centre sticker.
// All gradients are in world-space; only the logo rotates with the body.
function drawGolfBall(
  ctx:   CanvasRenderingContext2D,
  x:     number,
  y:     number,
  r:     number,
  angle: number,
  img:   HTMLImageElement | null
) {
  // ── 1. Base sphere — white-to-grey gradient mimicking a lit sphere ──
  // Light source: upper-left at ~(-0.38r, -0.40r)
  const baseGrad = ctx.createRadialGradient(
    x - r * 0.38, y - r * 0.40, r * 0.01,   // focal point (highlight)
    x + r * 0.12, y + r * 0.14, r * 1.04    // shadow centre (slightly offset)
  )
  baseGrad.addColorStop(0,    "#ffffff")
  baseGrad.addColorStop(0.22, "#f6f6f4")
  baseGrad.addColorStop(0.52, "#e4e4e0")
  baseGrad.addColorStop(0.78, "#b8b8b4")
  baseGrad.addColorStop(0.92, "#787874")
  baseGrad.addColorStop(1,    "#3c3c3a")

  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = baseGrad
  ctx.fill()
  ctx.restore()

  // ── 2. Subtle dimple hint — very faint dot grid, rotates with ball ──
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.globalAlpha = 0.045

  const step   = r * 0.30
  const dimR   = r * 0.055
  const bound2 = r * r * 0.68

  for (let xi = -3; xi <= 3; xi++) {
    for (let yi = -3; yi <= 3; yi++) {
      const dx = xi * step + (yi % 2 === 0 ? step * 0.5 : 0)
      const dy = yi * step
      if (dx * dx + dy * dy < bound2) {
        const dg = ctx.createRadialGradient(dx - dimR * 0.4, dy - dimR * 0.4, 0, dx, dy, dimR)
        dg.addColorStop(0, "#000")
        dg.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(dx, dy, dimR, 0, Math.PI * 2)
        ctx.fillStyle = dg
        ctx.fill()
      }
    }
  }

  ctx.globalAlpha = 1
  ctx.restore()

  // ── 3. Skill logo — sticker in centre, rotates with the ball ──────
  const sr = r * 0.54   // sticker radius

  if (img) {
    ctx.save()
    // Clip to sticker circle
    ctx.beginPath()
    ctx.arc(x, y, sr, 0, Math.PI * 2)
    ctx.clip()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.drawImage(img, -sr, -sr, sr * 2, sr * 2)

    // Dim the sticker edges so it looks inset into the sphere
    const inset = ctx.createRadialGradient(0, 0, sr * 0.45, 0, 0, sr)
    inset.addColorStop(0,   "rgba(0,0,0,0)")
    inset.addColorStop(0.75,"rgba(0,0,0,0)")
    inset.addColorStop(1,   "rgba(0,0,0,0.42)")
    ctx.beginPath()
    ctx.arc(0, 0, sr, 0, Math.PI * 2)
    ctx.fillStyle = inset
    ctx.fill()
    ctx.restore()
  }

  // ── 4. Primary specular — large, soft top-left blush ─────────────
  const spec1 = ctx.createRadialGradient(
    x - r * 0.28, y - r * 0.34, 0,
    x - r * 0.18, y - r * 0.22, r * 0.58
  )
  spec1.addColorStop(0,    "rgba(255,255,255,0.88)")
  spec1.addColorStop(0.35, "rgba(255,255,255,0.42)")
  spec1.addColorStop(0.75, "rgba(255,255,255,0.10)")
  spec1.addColorStop(1,    "rgba(255,255,255,0)")

  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = spec1
  ctx.fill()
  ctx.restore()

  // ── 5. Secondary specular — tight, super-bright "ping" point ─────
  const spec2 = ctx.createRadialGradient(
    x - r * 0.30, y - r * 0.36, 0,
    x - r * 0.26, y - r * 0.31, r * 0.20
  )
  spec2.addColorStop(0,    "rgba(255,255,255,1)")
  spec2.addColorStop(0.45, "rgba(255,255,255,0.80)")
  spec2.addColorStop(1,    "rgba(255,255,255,0)")

  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = spec2
  ctx.fill()
  ctx.restore()

  // ── 6. Bottom environment bounce — faint warm glow from below ────
  const envGlow = ctx.createRadialGradient(
    x + r * 0.18, y + r * 0.55, 0,
    x + r * 0.12, y + r * 0.45, r * 0.55
  )
  envGlow.addColorStop(0,    "rgba(255,255,255,0.14)")
  envGlow.addColorStop(1,    "rgba(255,255,255,0)")

  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = envGlow
  ctx.fill()
  ctx.restore()

  // ── 7. Thin outer rim to separate from dark background ───────────
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.strokeStyle = "rgba(255,255,255,0.18)"
  ctx.lineWidth   = 1
  ctx.stroke()
  ctx.restore()
}

// ── Image loader ──────────────────────────────────────────────
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload  = () => resolve(img)
    img.onerror = reject
    img.src     = src
  })
}

// ── Physics init ──────────────────────────────────────────────
function initPhysics(
  container: HTMLDivElement,
  Matter:    typeof import("matter-js"),
  images:    (HTMLImageElement | null)[]
): () => void {
  const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter

  const W = container.offsetWidth
  const H = container.offsetHeight

  const engine = Engine.create({ gravity: { y: 1.2 } })
  const runner  = Runner.create()

  const canvas = document.createElement("canvas")
  canvas.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;display:block;"
  container.appendChild(canvas)

  const render = Render.create({
    canvas,
    engine,
    options: { width: W, height: H, wireframes: false, background: "transparent" },
  })

  // Four walls — nothing escapes
  const T = 80
  const wall = {
    isStatic: true,
    render:   { fillStyle: "transparent", strokeStyle: "transparent", lineWidth: 0 },
  }
  Composite.add(engine.world, [
    Bodies.rectangle(W / 2,       H + T / 2,  W + 200, T,     wall),
    Bodies.rectangle(W / 2,       -T / 2,     W + 200, T,     wall),
    Bodies.rectangle(-T / 2,      H / 2,      T,       H * 3, wall),
    Bodies.rectangle(W + T / 2,   H / 2,      T,       H * 3, wall),
  ])

  // Sphere bodies — all circles
  const cols   = Math.max(4, Math.floor(W / 130))
  const bodies = SKILLS.map((skill, i) => {
    const col = i % cols
    const x   = (W / cols) * col + W / (cols * 2) + (Math.random() - 0.5) * 20
    const y   = skill.radius + 10 + i * 18 + Math.random() * 12

    return Bodies.circle(x, y, skill.radius, {
      restitution: 0.48,
      friction:    0.05,
      frictionAir: 0.014,
      render: { fillStyle: "transparent", strokeStyle: "transparent", lineWidth: 0 },
    })
  })
  Composite.add(engine.world, bodies)

  // Mouse — no scroll hijacking
  const mouse = Mouse.create(canvas)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const m = mouse as any
  m.element.removeEventListener("mousewheel",     m.mousewheel)
  m.element.removeEventListener("DOMMouseScroll", m.mousewheel)

  Composite.add(engine.world, MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.2, render: { visible: false } },
  }))
  render.mouse = mouse

  // Custom rendering — golf balls
  Events.on(render, "afterRender", () => {
    bodies.forEach((body, i) => {
      drawGolfBall(
        render.context,
        body.position.x,
        body.position.y,
        SKILLS[i].radius,
        body.angle,
        images[i]
      )
    })
  })

  Render.run(render)
  Runner.run(runner, engine)

  return () => {
    Runner.stop(runner)
    Render.stop(render)
    Engine.clear(engine)
    if (canvas.parentNode) canvas.remove()
  }
}

// ── Embeddable canvas ─────────────────────────────────────────
export const SkillsPhysicsCanvas = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let stopped   = false
    let cleanupFn: (() => void) | null = null

    const run = async () => {
      if (container.offsetWidth === 0 || container.offsetHeight === 0) {
        if (!stopped) requestAnimationFrame(() => run())
        return
      }

      const [Matter, imageResults] = await Promise.all([
        import("matter-js").then((m) => m.default),
        Promise.allSettled(SKILLS.map((s) => loadImage(s.img))),
      ])

      if (stopped) return

      cleanupFn = initPhysics(
        container,
        Matter,
        imageResults.map((r) => (r.status === "fulfilled" ? r.value : null))
      )
    }

    run()
    return () => { stopped = true; cleanupFn?.() }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("relative cursor-grab overflow-hidden active:cursor-grabbing", className)}
    />
  )
}

// ── Standalone section ────────────────────────────────────────
export const SkillsPhysics = () => (
  <section id="skills" className="border-t border-neutral-800 bg-[#0e0e0e] text-white">
    <div className="mx-auto max-w-6xl border-x border-neutral-800">
      <div className="flex items-end justify-between px-8 pt-8 pb-4">
        <div>
          <span className="border border-[#e64a3b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#e64a3b]">
            {"// Skills"}
          </span>
          <p className="mt-3 text-xs text-neutral-500">Drag and throw them around.</p>
        </div>
        <span className="hidden font-mono text-[11px] text-neutral-700 sm:block">
          {String(SKILLS.length).padStart(2, "0")} technologies
        </span>
      </div>
      <SkillsPhysicsCanvas className="h-[580px] sm:h-[660px] lg:h-[720px]" />
    </div>
  </section>
)

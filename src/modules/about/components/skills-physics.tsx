"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/src/lib/utils"

// ── Skill definitions ─────────────────────────────────────────
interface Skill { name: string; img: string; radius: number }

const SKILLS: Skill[] = [
  // xl
  { name: "React",        img: "/skill_balls/ReactJs.png",       radius: 75 },
  { name: "TypeScript",   img: "/skill_balls/Typescript.png",    radius: 70 },
  { name: "Docker",       img: "/skill_balls/Docker.png",        radius: 72 },
  // lg
  { name: "Next.js",      img: "/skill_balls/NextJs.png",        radius: 63 },
  { name: "Node.js",      img: "/skill_balls/NodeJs.png",        radius: 65 },
  { name: "Python",       img: "/skill_balls/Python.png",        radius: 62 },
  { name: "GCP",          img: "/skill_balls/GCP.png",           radius: 60 },
  // md
  { name: "MongoDB",      img: "/skill_balls/MongoDB.png",       radius: 52 },
  { name: "PostgreSQL",   img: "/skill_balls/PostgresQL.png",    radius: 50 },
  { name: "Firebase",     img: "/skill_balls/Firebase.png",      radius: 54 },
  { name: "Kubernetes",   img: "/skill_balls/Kubernetes.png",    radius: 52 },
  { name: "GraphQL",      img: "/skill_balls/graphql.png",       radius: 50 },
  { name: "React Query",  img: "/skill_balls/react query .png",  radius: 48 },
  // sm
  { name: "GitHub",       img: "/skill_balls/github.png",        radius: 42 },
  { name: "Redis",        img: "/skill_balls/redis.png",         radius: 40 },
  { name: "Redux",        img: "/skill_balls/redux.png",         radius: 38 },
  { name: "Vercel",       img: "/skill_balls/vercel.png",        radius: 42 },
  { name: "LangChain",    img: "/skill_balls/langchain.png",     radius: 40 },
  // xs
  { name: "Fastify",      img: "/skill_balls/Fastify.png",       radius: 33 },
  { name: "Postman",      img: "/skill_balls/postman.png",       radius: 32 },
  { name: "ChromaDB",     img: "/skill_balls/chromadb.png",      radius: 30 },
  { name: "C++",          img: "/skill_balls/C++.png",           radius: 35 },
]

// ── Ball renderer ─────────────────────────────────────────────
// Clips the pre-made skill_balls image to a circle — no extra shading.
function drawSkillBall(
  ctx:   CanvasRenderingContext2D,
  x:     number,
  y:     number,
  r:     number,
  angle: number,
  img:   HTMLImageElement | null
) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.clip()

  if (img) {
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.drawImage(img, -r, -r, r * 2, r * 2)
  } else {
    ctx.fillStyle = "#2a2a2a"
    ctx.fill()
  }

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

  const W   = container.offsetWidth
  const H   = container.offsetHeight
  const dpr = window.devicePixelRatio || 1

  const engine = Engine.create({ gravity: { y: 1.2 } })
  const runner  = Runner.create()

  const canvas = document.createElement("canvas")
  // Explicit px dimensions prevent CSS percentage from stretching
  // the canvas non-uniformly and turning circles into ovals.
  canvas.style.cssText = `position:absolute;top:0;left:0;width:${W}px;height:${H}px;display:block;mix-blend-mode:screen;`
  container.appendChild(canvas)

  const render = Render.create({
    canvas,
    engine,
    options: { width: W, height: H, pixelRatio: dpr, wireframes: false, background: "transparent" },
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
      drawSkillBall(
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
  <section id="skills" className="hidden border-t border-neutral-800 bg-[#0e0e0e] text-white lg:block">
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

"use client"

import { useEffect, useRef, useState } from "react"

import { ScrollReveal } from "@/src/components/scroll-reveal"

type SkillBall = {
  name: string
  src: string
}

type FlyingBall = {
  id: number
  skillIndex: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  angle: number
  spin: number
}

type SlashPoint = {
  x: number
  y: number
  time: number
}

type SlicePiece = {
  skillIndex: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  angle: number
  spin: number
  side: -1 | 1
  life: number
  maxLife: number
}

type Spark = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

const SKILL_BALLS: SkillBall[] = [
  { name: "React", src: "/skill_balls/ReactJs.png" },
  { name: "Next.js", src: "/skill_balls/NextJs.png" },
  { name: "TypeScript", src: "/skill_balls/Typescript.png" },
  { name: "Tailwind", src: "/skill_balls/tailwind.png" },
  { name: "Node.js", src: "/skill_balls/NodeJs.png" },
  { name: "Python", src: "/skill_balls/Python.png" },
  { name: "Docker", src: "/skill_balls/Docker.png" },
  { name: "Cloudflare", src: "/skill_balls/Cloudflare.png" },
  { name: "DigitalOcean", src: "/skill_balls/digitalocean.png" },
  { name: "Fastify", src: "/skill_balls/Fastify.png" },
  { name: "MongoDB", src: "/skill_balls/MongoDB.png" },
  { name: "PostgreSQL", src: "/skill_balls/PostgresQL.png" },
  { name: "GraphQL", src: "/skill_balls/graphql.png" },
  { name: "Redis", src: "/skill_balls/redis.png" },
  { name: "Redux", src: "/skill_balls/redux.png" },
  { name: "React Query", src: "/skill_balls/react_query.png" },
  { name: "LangChain", src: "/skill_balls/langchain.png" },
  { name: "OpenAI", src: "/skill_balls/OpenAI.png" },
  { name: "Postman", src: "/skill_balls/postman.png" },
  { name: "C++", src: "/skill_balls/C++.png" },
  { name: "Firebase", src: "/skill_balls/Firebase.png" },
  { name: "ChromaDB", src: "/skill_balls/chromadb.png" },
  { name: "Ethereum", src: "/skill_balls/Ethereum.png" },
  { name: "Solana", src: "/skill_balls/solana.png" },
  { name: "MetaMask", src: "/skill_balls/metamask.png" },
]

const GRAVITY = 980
const SLASH_MEMORY_MS = 130
const ROUND_DURATION_MS = 15_000
const SPAWN_START_DELAY_MS = 350
const SPAWN_END_PADDING_MS = 2_200
const SPAWN_INTERVAL_MS =
  (ROUND_DURATION_MS - SPAWN_START_DELAY_MS - SPAWN_END_PADDING_MS) / SKILL_BALLS.length

const getSkillRadius = (width: number) => {
  if (width >= 1024) return 72
  if (width >= 640) return 62

  return 52
}

const shuffleSkillIndexes = () => {
  const indexes = SKILL_BALLS.map((_, index) => index)

  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[indexes[index], indexes[swapIndex]] = [indexes[swapIndex], indexes[index]]
  }

  return indexes
}

const distanceToSegment = (
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
) => {
  const dx = bx - ax
  const dy = by - ay
  const lengthSquared = dx * dx + dy * dy

  if (lengthSquared === 0) {
    return Math.hypot(px - ax, py - ay)
  }

  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSquared))
  const closestX = ax + t * dx
  const closestY = ay + t * dy

  return Math.hypot(px - closestX, py - closestY)
}

const loadSkillImages = async () => {
  const results = await Promise.allSettled(
    SKILL_BALLS.map(
      (skill) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new window.Image()
          img.onload = () => resolve(img)
          img.onerror = reject
          img.src = skill.src
        })
    )
  )

  return results.map((result) => (result.status === "fulfilled" ? result.value : null))
}

const drawSkillBall = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  ball: Pick<FlyingBall, "x" | "y" | "radius" | "angle">
) => {
  const { x, y, radius, angle } = ball

  if (img) {
    const imageRatio = img.naturalWidth / img.naturalHeight
    const boxSize = radius * 2
    const drawWidth = imageRatio >= 1 ? boxSize : boxSize * imageRatio
    const drawHeight = imageRatio >= 1 ? boxSize / imageRatio : boxSize

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
    ctx.restore()
  }
}

const drawSlicePiece = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  piece: SlicePiece
) => {
  const alpha = Math.max(0, piece.life / piece.maxLife)

  ctx.save()
  ctx.globalAlpha = alpha
  ctx.translate(piece.x, piece.y)
  ctx.rotate(piece.angle)
  ctx.beginPath()
  ctx.rect(piece.side === -1 ? -piece.radius : 0, -piece.radius, piece.radius, piece.radius * 2)
  ctx.clip()
  ctx.translate(-piece.x, -piece.y)
  drawSkillBall(ctx, img, piece)
  ctx.restore()
}

const getFreefallRadius = (width: number) => {
  if (width >= 1024) return 42
  if (width >= 640) return 34

  return 26
}

type SkillFreefallCanvasProps = {
  cardRect: DOMRect | null
  images: (HTMLImageElement | null)[]
}

const SkillFreefallCanvas = ({ cardRect, images }: SkillFreefallCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    const run = async () => {
      const [Matter, freefallImages] = await Promise.all([
        import("matter-js").then((module) => module.default),
        images.length === SKILL_BALLS.length ? Promise.resolve(images) : loadSkillImages(),
      ])
      if (cancelled || !containerRef.current) return

      const { Engine, Runner, Render, Bodies, Body, Composite, Events } = Matter
      const width = container.clientWidth
      const height = container.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const radius = getFreefallRadius(width)
      const engine = Engine.create({ gravity: { x: 0, y: 1.15 } })
      const runner = Runner.create()
      const canvas = document.createElement("canvas")

      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;"
      container.appendChild(canvas)

      const render = Render.create({
        canvas,
        engine,
        options: {
          width,
          height,
          pixelRatio: dpr,
          wireframes: false,
          background: "transparent",
        },
      })

      const wallOptions = {
        isStatic: true,
        render: { fillStyle: "transparent", strokeStyle: "transparent" },
      }
      const wallThickness = 120
      const floor = Bodies.rectangle(
        width / 2,
        height + wallThickness / 2 - 22,
        width + wallThickness * 2,
        wallThickness,
        wallOptions
      )
      const leftWall = Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height * 2,
        wallOptions
      )
      const rightWall = Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 2,
        wallOptions
      )
      const cardBody = cardRect
        ? Bodies.rectangle(
            cardRect.left + cardRect.width / 2,
            cardRect.top + cardRect.height / 2,
            cardRect.width,
            cardRect.height,
            wallOptions
          )
        : null

      const cols = Math.min(SKILL_BALLS.length, width >= 900 ? 9 : width >= 560 ? 6 : 4)
      const bodies = SKILL_BALLS.map((_, index) => {
        const col = index % cols
        const row = Math.floor(index / cols)
        const x = ((col + 0.5) / cols) * width + ((index % 3) - 1) * radius * 0.34
        const y = -radius * (2.5 + row * 1.25)
        const body = Bodies.circle(x, y, radius, {
          restitution: 0.38,
          friction: 0.08,
          frictionAir: 0.012,
          density: 0.0018,
          render: { fillStyle: "transparent", strokeStyle: "transparent" },
        })

        Body.setAngularVelocity(body, ((index % 5) - 2) * 0.055)
        Body.setVelocity(body, {
          x: ((index % 7) - 3) * 0.8,
          y: 0.4 + row * 0.15,
        })

        return body
      })

      Composite.add(
        engine.world,
        [floor, leftWall, rightWall, cardBody, ...bodies].filter((body) => body !== null)
      )

      Events.on(render, "afterRender", () => {
        const ctx = render.context

        bodies.forEach((body, index) => {
          drawSkillBall(ctx, freefallImages[index], {
            x: body.position.x,
            y: body.position.y,
            radius,
            angle: body.angle,
          })
        })
      })

      Render.run(render)
      Runner.run(runner, engine)

      cleanup = () => {
        Runner.stop(runner)
        Render.stop(render)
        Composite.clear(engine.world, false)
        Engine.clear(engine)
        render.canvas.remove()
        render.textures = {}
      }
    }

    run()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [cardRect, images])

  return <div ref={containerRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
}

export const SkillSlashGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const idleCardRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[] | null>(null)
  const [idleCardRect, setIdleCardRect] = useState<DOMRect | null>(null)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [isRoundComplete, setIsRoundComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)

  useEffect(() => {
    let cancelled = false

    loadSkillImages().then((images) => {
      if (!cancelled) {
        imagesRef.current = images
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting)
      },
      { threshold: 0.18 }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isStarted) {
      setIdleCardRect(null)
      return
    }

    const section = sectionRef.current
    const card = idleCardRef.current
    if (!section || !card) return

    const measureCard = () => {
      const sectionRect = section.getBoundingClientRect()
      const cardViewportRect = card.getBoundingClientRect()

      setIdleCardRect(
        new DOMRect(
          cardViewportRect.left - sectionRect.left,
          cardViewportRect.top - sectionRect.top,
          cardViewportRect.width,
          cardViewportRect.height
        )
      )
    }

    measureCard()

    const resizeObserver = new ResizeObserver(measureCard)
    resizeObserver.observe(section)
    resizeObserver.observe(card)
    window.addEventListener("resize", measureCard)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", measureCard)
    }
  }, [isStarted, isRoundComplete])

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current

    if (!canvas || !section || !isStarted) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrame = 0
    let lastFrame = performance.now()
    let nextBallId = 1
    let spawnedCount = 0
    let remainingSeconds = 15
    let isPointerDown = false
    let destroyed = false
    const startTime = performance.now()
    const spawnQueue = shuffleSkillIndexes()

    const images = imagesRef.current ?? []
    const balls: FlyingBall[] = []
    const pieces: SlicePiece[] = []
    const sparks: Spark[] = []
    const slashPoints: SlashPoint[] = []

    const resize = () => {
      const rect = section.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawnBall = () => {
      const skillIndex = spawnQueue[spawnedCount]

      if (skillIndex === undefined) return

      const width = section.clientWidth
      const height = section.clientHeight
      const radius = getSkillRadius(width)
      const fromLeft = Math.random() < 0.5
      const x = width * (0.12 + Math.random() * 0.76)
      const vx = (fromLeft ? 1 : -1) * (160 + Math.random() * 300)
      const vy = -(960 + Math.random() * 300)

      balls.push({
        id: nextBallId,
        skillIndex,
        x,
        y: height + radius + 10,
        vx,
        vy,
        radius,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 5,
      })

      nextBallId += 1
      spawnedCount += 1
    }

    const addSlashBurst = (ball: FlyingBall) => {
      pieces.push(
        {
          skillIndex: ball.skillIndex,
          x: ball.x - ball.radius * 0.12,
          y: ball.y,
          vx: ball.vx - 160,
          vy: ball.vy * 0.35 - 90,
          radius: ball.radius,
          angle: ball.angle,
          spin: ball.spin - 4,
          side: -1,
          life: 620,
          maxLife: 620,
        },
        {
          skillIndex: ball.skillIndex,
          x: ball.x + ball.radius * 0.12,
          y: ball.y,
          vx: ball.vx + 160,
          vy: ball.vy * 0.35 - 90,
          radius: ball.radius,
          angle: ball.angle,
          spin: ball.spin + 4,
          side: 1,
          life: 620,
          maxLife: 620,
        }
      )

      for (let index = 0; index < 16; index += 1) {
        const angle = Math.random() * Math.PI * 2
        const speed = 70 + Math.random() * 260

        sparks.push({
          x: ball.x,
          y: ball.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 360 + Math.random() * 220,
          maxLife: 580,
          size: 2 + Math.random() * 3,
        })
      }
    }

    const testSlashHits = () => {
      if (slashPoints.length < 2) return

      const current = slashPoints[slashPoints.length - 1]
      const previous = slashPoints[slashPoints.length - 2]

      for (let index = balls.length - 1; index >= 0; index -= 1) {
        const ball = balls[index]
        const distance = distanceToSegment(
          ball.x,
          ball.y,
          previous.x,
          previous.y,
          current.x,
          current.y
        )

        if (distance <= ball.radius * 0.92) {
          addSlashBurst(ball)
          balls.splice(index, 1)
          setScore((value) => value + 1)
        }
      }
    }

    const addPointerPoint = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()

      slashPoints.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        time: performance.now(),
      })

      testSlashHits()
    }

    const onPointerDown = (event: PointerEvent) => {
      isPointerDown = true
      slashPoints.length = 0
      canvas.setPointerCapture(event.pointerId)
      addPointerPoint(event)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!isPointerDown) return
      addPointerPoint(event)
    }

    const onPointerUp = (event: PointerEvent) => {
      isPointerDown = false
      slashPoints.length = 0

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
    }

    const drawSlashTrail = (now: number) => {
      const visiblePoints = slashPoints.filter((point) => now - point.time < SLASH_MEMORY_MS)

      if (visiblePoints.length < 2) return

      ctx.save()
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      for (let index = 1; index < visiblePoints.length; index += 1) {
        const previous = visiblePoints[index - 1]
        const current = visiblePoints[index]
        const alpha = 1 - (now - current.time) / SLASH_MEMORY_MS

        ctx.beginPath()
        ctx.moveTo(previous.x, previous.y)
        ctx.lineTo(current.x, current.y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.lineWidth = 12 * alpha
        ctx.shadowColor = "rgba(230, 74, 59, 0.75)"
        ctx.shadowBlur = 18
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(previous.x, previous.y)
        ctx.lineTo(current.x, current.y)
        ctx.strokeStyle = `rgba(230, 74, 59, ${alpha})`
        ctx.lineWidth = 4 * alpha
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawBackground = () => {
      const width = section.clientWidth
      const height = section.clientHeight

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "#0e0e0e"
      ctx.fillRect(0, 0, width, height)

      const glow = ctx.createRadialGradient(
        width * 0.5,
        height * 1.08,
        0,
        width * 0.5,
        height * 1.08,
        width * 0.82
      )
      glow.addColorStop(0, "rgba(230, 74, 59, 0.24)")
      glow.addColorStop(0.42, "rgba(230, 74, 59, 0.08)")
      glow.addColorStop(1, "rgba(230, 74, 59, 0)")

      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)
    }

    const tick = (now: number) => {
      if (destroyed) return

      const delta = Math.min((now - lastFrame) / 1000, 0.033)
      const deltaMs = delta * 1000
      const width = section.clientWidth
      const height = section.clientHeight
      const elapsed = now - startTime
      const nextRemainingSeconds = Math.max(
        0,
        Math.ceil((ROUND_DURATION_MS - elapsed) / 1000)
      )

      lastFrame = now

      if (nextRemainingSeconds !== remainingSeconds) {
        remainingSeconds = nextRemainingSeconds
        setTimeLeft(nextRemainingSeconds)
      }

      if (elapsed >= ROUND_DURATION_MS) {
        setTimeLeft(0)
        setIsRoundComplete(true)
        setIsStarted(false)
        return
      }

      const firstVisibleSlashPoint = slashPoints.findIndex(
        (point) => now - point.time < SLASH_MEMORY_MS
      )

      if (firstVisibleSlashPoint > 0) {
        slashPoints.splice(0, firstVisibleSlashPoint)
      } else if (firstVisibleSlashPoint === -1) {
        slashPoints.length = 0
      }

      const targetSpawnCount = Math.min(
        spawnQueue.length,
        Math.floor(Math.max(0, elapsed - SPAWN_START_DELAY_MS) / SPAWN_INTERVAL_MS) + 1
      )

      while (spawnedCount < targetSpawnCount) {
        spawnBall()
      }

      for (let index = balls.length - 1; index >= 0; index -= 1) {
        const ball = balls[index]

        ball.vy += GRAVITY * delta
        ball.x += ball.vx * delta
        ball.y += ball.vy * delta
        ball.angle += ball.spin * delta

        if (ball.x < ball.radius) {
          ball.x = ball.radius
          ball.vx *= -0.75
        } else if (ball.x > width - ball.radius) {
          ball.x = width - ball.radius
          ball.vx *= -0.75
        }

        if (ball.y > height + ball.radius * 2 && ball.vy > 0) {
          balls.splice(index, 1)
        }
      }

      for (let index = pieces.length - 1; index >= 0; index -= 1) {
        const piece = pieces[index]

        piece.life -= deltaMs
        piece.vy += GRAVITY * delta
        piece.x += piece.vx * delta
        piece.y += piece.vy * delta
        piece.angle += piece.spin * delta

        if (piece.life <= 0) {
          pieces.splice(index, 1)
        }
      }

      for (let index = sparks.length - 1; index >= 0; index -= 1) {
        const spark = sparks[index]

        spark.life -= deltaMs
        spark.vy += GRAVITY * 0.55 * delta
        spark.x += spark.vx * delta
        spark.y += spark.vy * delta

        if (spark.life <= 0) {
          sparks.splice(index, 1)
        }
      }

      drawBackground()

      balls.forEach((ball) => drawSkillBall(ctx, images[ball.skillIndex], ball))
      pieces.forEach((piece) => drawSlicePiece(ctx, images[piece.skillIndex], piece))

      sparks.forEach((spark) => {
        const alpha = Math.max(0, spark.life / spark.maxLife)

        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 74, 59, ${alpha})`
        ctx.fill()
      })

      drawSlashTrail(now)
      animationFrame = requestAnimationFrame(tick)
    }

    resize()

    if (images.length > 0) {
      animationFrame = requestAnimationFrame(tick)
    } else {
      loadSkillImages().then((loadedImages) => {
        if (destroyed) return

        imagesRef.current = loadedImages
        images.push(...loadedImages)
        animationFrame = requestAnimationFrame(tick)
      })
    }

    window.addEventListener("resize", resize)
    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("pointerup", onPointerUp)
    canvas.addEventListener("pointercancel", onPointerUp)

    return () => {
      destroyed = true
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerup", onPointerUp)
      canvas.removeEventListener("pointercancel", onPointerUp)
    }
  }, [isStarted])

  return (
    <section
      id="skill-slash-game"
      className="w-full border-t border-neutral-800 bg-[#0e0e0e] text-white"
    >
      <div
        ref={sectionRef}
        className="relative isolate mx-auto h-[620px] max-w-6xl overflow-hidden border-x border-neutral-800 sm:h-[680px] lg:h-[760px]"
      >
        <canvas
          ref={canvasRef}
          aria-label="Slash the flying skill balls"
          className={`absolute inset-0 z-0 ${isStarted ? "touch-none" : "pointer-events-none"}`}
        />

        <ScrollReveal className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 px-3 pt-4 sm:px-5 sm:pt-6">
          <div>
            <span className="border border-[#e64a3b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#e64a3b]">
              {"// Skill Slash"}
            </span>
            <h2 className="mt-3 max-w-[9ch] text-3xl leading-none font-black tracking-tighter text-white sm:max-w-[11ch] sm:text-5xl">
              Slice the stack.
            </h2>
          </div>

          <div className="shrink-0 border border-white/15 bg-black/45 px-2 py-1.5 text-right backdrop-blur sm:px-3 sm:py-2">
            <p className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-[10px] sm:tracking-[0.28em]">
              Score / Time
            </p>
            <p className="font-mono text-2xl leading-none font-black text-[#e64a3b] tabular-nums sm:text-3xl">
              {String(score).padStart(2, "0")} / {String(timeLeft).padStart(2, "0")}
            </p>
          </div>
        </ScrollReveal>

        {isStarted ? (
          <button
            type="button"
            onClick={() => {
              setIsRoundComplete(true)
              setTimeLeft(0)
              setIsStarted(false)
            }}
            className="absolute right-5 bottom-7 z-20 border border-white/20 bg-black/55 px-4 py-3 text-[10px] font-black uppercase tracking-[0.28em] text-white backdrop-blur transition-colors active:border-[#e64a3b] active:bg-[#e64a3b]"
          >
            Stop Game
          </button>
        ) : null}

        {!isStarted ? (
          <div className="absolute inset-0 z-20 flex items-end justify-center bg-linear-to-t from-[#0e0e0e] via-[#0e0e0e]/78 to-transparent px-5 pb-12">
            {isSectionVisible && idleCardRect ? (
              <SkillFreefallCanvas cardRect={idleCardRect} images={imagesRef.current ?? []} />
            ) : null}

            <ScrollReveal
              ref={idleCardRef}
              className="relative z-10 w-full max-w-sm border border-neutral-800 bg-[#0e0e0e]/92 p-5 text-center shadow-2xl backdrop-blur"
            >
              {isRoundComplete ? (
                <p className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.28em] text-[#e64a3b]">
                  Final score: {score}/{SKILL_BALLS.length}
                </p>
              ) : null}
              <p className="text-sm leading-6 text-neutral-300">
                This 15-second mini game shows my skills as flying skill balls. Each skill appears
                once, so slash fast and score as many as you can.
              </p>
              <button
                type="button"
                onClick={() => {
                  setScore(0)
                  setTimeLeft(15)
                  setIsRoundComplete(false)
                  setIsStarted(true)
                }}
                className="mt-5 w-full border border-[#e64a3b] bg-[#e64a3b] px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-white transition-colors active:bg-white active:text-black"
              >
                {isRoundComplete ? "Play Again" : "Start Game"}
              </button>
            </ScrollReveal>
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-[#0e0e0e] to-transparent" />
      </div>
    </section>
  )
}

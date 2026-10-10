// Renders index.html frame-by-frame with headless Chromium and encodes with ffmpeg.
// Usage: node render.mjs [out.mp4] [--from=0] [--to=<duration>] [--audio=track.mp3]
import { spawn } from "node:child_process"
import { fileURLToPath, pathToFileURL } from "node:url"
import path from "node:path"
import { chromium } from "playwright"

const here = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const out = args.find((a) => !a.startsWith("--")) ?? path.join(here, "out", "reel.mp4")
const opt = (k) => args.find((a) => a.startsWith(`--${k}=`))?.split("=")[1]

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
})
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 })
await page.goto(pathToFileURL(path.join(here, "index.html")).href)
await page.evaluate(() => window.__ready)
const { duration, fps } = await page.evaluate(() => ({ duration: window.__DURATION, fps: window.__FPS }))
const from = Number(opt("from") ?? 0)
const to = Math.min(Number(opt("to") ?? duration), duration)
const frames = Math.round((to - from) * fps)
const audio = opt("audio")

const ffArgs = [
  "-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
  ...(audio ? ["-ss", String(from), "-i", audio, "-shortest", "-c:a", "aac", "-b:a", "192k"] : []),
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "18", "-movflags", "+faststart", out,
]
const ff = spawn("ffmpeg", ffArgs, { stdio: ["pipe", "ignore", "inherit"] })

for (let i = 0; i < frames; i++) {
  const t = from + i / fps
  await page.evaluate((t) => window.__seek(t), t)
  const buf = await page.screenshot({ type: "jpeg", quality: 95 })
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r))
  if (i % 30 === 0) process.stdout.write(`\rframe ${i}/${frames}`)
}
ff.stdin.end()
await new Promise((r) => ff.on("close", r))
await browser.close()
console.log(`\nwrote ${out}`)

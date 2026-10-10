// Quick visual check: node stills.mjs 1.5 4 5.8 ...  → out/still-<t>.png
import { fileURLToPath, pathToFileURL } from "node:url"
import path from "node:path"
import { chromium } from "playwright"
const here = path.dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
const errors = []
page.on("pageerror", (e) => errors.push(e.message))
page.on("console", (m) => m.type() === "error" && errors.push(m.text()))
await page.goto(pathToFileURL(path.join(here, "index.html")).href)
await page.evaluate(() => window.__ready)
for (const t of process.argv.slice(2).map(Number)) {
  await page.evaluate((t) => window.__seek(t), t)
  await page.screenshot({ path: path.join(here, "out", `still-${t}.png`) })
}
console.log("duration", await page.evaluate(() => window.__DURATION), "errors", errors)
await browser.close()

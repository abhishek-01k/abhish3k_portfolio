# Reel

Sticker-style motion-graphics reel (1080×1920, 30fps), built as an HTML page
animated with a GSAP timeline and rendered frame-by-frame with headless
Chromium + ffmpeg.

```bash
cd reel
npm install
npm run stills -- 2.2 8.6     # quick PNG checks at given seconds → out/
npm run render                # full video → out/reel.mp4
node render.mjs out/x.mp4 --from=7.5 --to=12 --audio=track.mp3
```

Open `index.html?play` in a browser for a live (real-time) preview.

- `index.html` — all scenes, styles and the master timeline
- `assets/` — avatar cutouts and props

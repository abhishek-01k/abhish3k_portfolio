# Abhishek Portfolio

Personal portfolio for Abhishek, a software developer, AI engineer, and
blockchain developer who designs and ships full-stack applications, AI-powered
tools, and on-chain protocols from idea to production.

The site highlights my projects, experience, skills, recommendations, and ways
to get in touch.

## Editing content

All copy lives in `src/config/constants.ts`:

- `SITE` — name, role, email, resume link and socials
- `PROJECTS` — the work section, the `/projects` page and each case study
- `ACHIEVEMENTS` — cards on the wins wall (`type`, `pin`, `rotation` and
  `position` control how each one is pinned to the board)
- `TIMELINE` — the experience changelog
- `RECOMMENDATIONS` — testimonials

### Adding the showreel

Drop the video into `public/` (e.g. `public/reel.mp4`) and set
`REEL_SRC = "/reel.mp4"` in `src/config/constants.ts`. Until then the hero
shows the "in production" reel frame.

## Development

```bash
npm install
npm run dev
npm run typecheck && npm run lint
```

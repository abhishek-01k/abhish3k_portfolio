/**
 * Set STATIC_EXPORT=1 (and optionally NEXT_PUBLIC_BASE_PATH) to build a fully
 * static site into `out/` — used for the GitHub Pages preview. Normal builds
 * (e.g. Vercel) are unaffected.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
  ...(isStaticExport && {
    output: "export",
    trailingSlash: true,
    basePath,
  }),
}

export default nextConfig

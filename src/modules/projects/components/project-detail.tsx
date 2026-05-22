import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { ProjectBackButton } from "./project-back-button"
import type { Project } from "../project-utils"

export const ProjectDetail = ({ project }: { project: Project }) => {
  const isVideo = /\.(mov|mp4)$/i.test(project.image)
  const hasGithubLink = /^https?:\/\//.test(project.github)
  const keyPoints = project.bullets.slice(0, 3)

  return (
    <section className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <ProjectBackButton />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] lg:items-start">

          {/* ── Left: sticky media ───────────────────────── */}
          <div className="sticky top-8 overflow-hidden border border-white/10 bg-black">
            <div className="relative aspect-video w-full">
              {isVideo ? (
                <video
                  src={project.image}
                  className="h-full w-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                />
              ) : (
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-contain"
                />
              )}
            </div>
          </div>

          {/* ── Right: content ───────────────────────────── */}
          <article className="flex flex-col gap-0 border border-white/10 bg-[#101010]">

            {/* Meta */}
            <div className="border-b border-white/8 px-6 py-5 sm:px-8">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                <span>{project.category}</span>
                <span className="h-px w-6 bg-neutral-700" />
                <span>Project</span>
              </div>
            </div>

            {/* Title + short summary */}
            <div className="border-b border-white/8 px-6 py-7 sm:px-8">
              <h1 className="text-4xl font-bold leading-[0.9] tracking-[-0.05em] text-[#e64a3b] sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                {project.bullets[0]}
              </p>
            </div>

            {/* About the project */}
            {"about" in project && project.about && (
              <div className="border-b border-white/8 px-6 py-7 sm:px-8">
                <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  About
                </h2>
                <p className="text-sm leading-7 text-neutral-300 sm:text-base sm:leading-8">
                  {project.about as string}
                </p>
              </div>
            )}

            {/* Key points */}
            <div className="border-b border-white/8 px-6 py-7 sm:px-8">
              <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Key Highlights
              </h2>
              <ul className="space-y-3">
                {keyPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7 text-neutral-300">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e64a3b]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Long description */}
            {"longDescription" in project && project.longDescription && (
              <div className="border-b border-white/8 px-6 py-7 sm:px-8">
                <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Deep Dive
                </h2>
                <p className="text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8">
                  {project.longDescription as string}
                </p>
              </div>
            )}

            {/* Problems tackled */}
            {"problemsTackled" in project && Array.isArray(project.problemsTackled) && project.problemsTackled.length > 0 && (
              <div className="border-b border-white/8 px-6 py-7 sm:px-8">
                <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Problems I Tackled
                </h2>
                <ul className="space-y-4">
                  {(project.problemsTackled as string[]).map((problem, i) => (
                    <li key={i} className="flex gap-4 text-sm leading-7 text-neutral-400">
                      <span className="mt-1 shrink-0 font-mono text-[10px] tracking-wider text-[#e64a3b]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="px-6 py-7 sm:px-8">
              <div className="flex flex-wrap gap-3">
                {project.live ? (
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#e64a3b]/70 bg-[#e64a3b] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d83f31]"
                  >
                    View live
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : null}

                {hasGithubLink ? (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-300 transition-colors hover:border-white/40 hover:text-white"
                  >
                    GitHub
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center border border-neutral-800 px-5 py-3 text-sm font-semibold text-neutral-500">
                    {project.github}
                  </span>
                )}
              </div>
            </div>

          </article>
        </div>
      </div>
    </section>
  )
}

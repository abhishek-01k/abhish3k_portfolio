import Image from "next/image"
import Link from "next/link"

import { getProjectHref, type Project } from "../project-utils"

const ProjectTile = ({
  project,
  onPointerEnter,
  onPointerLeave,
}: {
  project: Project
  onPointerEnter: () => void
  onPointerLeave: () => void
}) => {
  const href = getProjectHref(project)
  const isVideo = /\.(mov|mp4)$/i.test(project.image)
  const summary = project.bullets[0]

  return (
    <Link
      href={href}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="group relative overflow-hidden bg-neutral-950 outline-none ring-1 ring-white/10 transition duration-500 hover:ring-white/30 focus-visible:ring-2 focus-visible:ring-[#e64a3b] max-lg:flex max-lg:flex-col lg:block lg:min-h-0 lg:cursor-none lg:bg-black"
      aria-label={`View ${project.title}`}
    >
      <div className="relative aspect-video w-full bg-black lg:absolute lg:inset-0 lg:aspect-auto">
        {isVideo ? (
          <video
            src={project.image}
            className="h-full w-full object-contain opacity-100 transition duration-700 ease-out group-hover:scale-[1.02] lg:absolute lg:inset-0 lg:group-hover:scale-105 lg:group-hover:grayscale"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain opacity-100 transition duration-700 ease-out group-hover:scale-[1.02] lg:group-hover:scale-105 lg:group-hover:grayscale"
          />
        )}
      </div>

      <div className="absolute inset-0 hidden bg-linear-to-b from-black/20 via-black/25 to-black/92 transition duration-500 group-hover:from-black/5 group-hover:via-black/10 group-hover:to-black/82 lg:block" />
      <div className="absolute inset-0 hidden bg-black/20 transition duration-500 group-hover:bg-transparent lg:block" />

      <div className="p-4 sm:p-5 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:p-8">
        <div className="max-w-2xl rounded-2xl border border-white/10 bg-[#101010]/82 p-4 shadow-xl backdrop-blur-sm transition duration-300 sm:p-5 lg:-m-5 lg:border-transparent lg:bg-black/0 lg:shadow-none lg:backdrop-blur-none lg:group-hover:border-white/15 lg:group-hover:bg-black/72 lg:group-hover:shadow-2xl lg:group-hover:backdrop-blur-md lg:group-focus-visible:border-white/15 lg:group-focus-visible:bg-black/72 lg:group-focus-visible:shadow-2xl lg:group-focus-visible:backdrop-blur-md">
          <h3 className="max-w-[11ch] text-xl font-bold leading-[0.9] tracking-[-0.06em] text-[#e64a3b] transition-colors duration-300 sm:text-3xl lg:text-4xl lg:text-white lg:group-hover:text-[#e64a3b]">
            {project.title}
          </h3>
          <p className="mt-4 line-clamp-1 max-w-xl text-sm leading-relaxed text-white/72 transition duration-300 group-hover:text-white">
            {summary}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProjectTile
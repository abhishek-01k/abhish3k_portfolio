import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { RevealText } from "@/src/components/motion/reveal-text"
import { PROJECTS } from "@/src/config/constants"
import { getProjectHref, type Project } from "../project-utils"
import { ProjectMedia } from "./project-media"

const Block = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="grid gap-4 border-t border-line py-10 lg:grid-cols-12 lg:gap-8">
    <h2 className="font-mono text-[11px] tracking-[0.2em] text-muted-ink uppercase lg:col-span-3">
      {label}
    </h2>
    <div className="lg:col-span-8 lg:col-start-5">{children}</div>
  </div>
)

export const ProjectDetail = ({ project }: { project: Project }) => {
  const index = PROJECTS.indexOf(project)
  const next = PROJECTS[(index + 1) % PROJECTS.length]
  const hasGithubLink = /^https?:\/\//.test(project.github)
  const about = "about" in project ? (project.about as string) : null
  const longDescription =
    "longDescription" in project ? (project.longDescription as string) : null
  const problems =
    "problemsTackled" in project ? (project.problemsTackled as string[]) : []
  const tags = "tags" in project ? (project.tags as string[]) : []

  return (
    <article className="pt-28 pb-10 sm:pt-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-muted-ink uppercase">
          <Link
            href="/projects"
            className="group flex items-center gap-2 transition-colors hover:text-bone"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            All work
          </Link>
          <span>
            #{String(index + 1).padStart(2, "0")} /{" "}
            {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>

        <header className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="flex w-fit items-center gap-2 rounded-full border border-line-strong px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-bone/80 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              {project.category} · Live
            </span>
            <RevealText
              as="h1"
              text={project.title}
              by="letter"
              immediate
              className="mt-6 text-[15vw] leading-[0.85] font-semibold tracking-[-0.06em] text-bone sm:text-[11vw] lg:text-[9rem]"
            />
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-fit items-center gap-2 rounded-full bg-signal pr-1.5 pl-5 text-sm font-semibold text-ink"
              >
                Visit live
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-signal transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            )}
            {hasGithubLink ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-fit items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-bone transition-colors hover:border-bone"
              >
                Source <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="font-mono text-[11px] tracking-[0.2em] text-muted-ink uppercase">
                {project.github}
              </span>
            )}
          </div>
        </header>

        <div className="relative mt-12 aspect-video overflow-hidden rounded-md border border-line bg-ink-2">
          <ProjectMedia
            project={project}
            fit="contain"
            controls
            priority
            sizes="100vw"
          />
        </div>

        <div className="mt-16">
          <Block label="Overview">
            <p className="text-2xl leading-snug tracking-tight text-bone sm:text-3xl">
              {about ?? project.bullets[0]}
            </p>
            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line-strong px-3 py-1 font-mono text-[10px] tracking-wider text-muted-ink uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </Block>

          <Block label="Highlights">
            <ul className="space-y-4">
              {project.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-4 text-lg leading-relaxed text-bone/80"
                >
                  <span className="mt-3 h-1 w-4 shrink-0 bg-signal" />
                  {b}
                </li>
              ))}
            </ul>
          </Block>

          {longDescription && (
            <Block label="Deep dive">
              <p className="font-serif text-2xl leading-relaxed text-bone/85 sm:text-3xl">
                {longDescription}
              </p>
            </Block>
          )}

          {problems.length > 0 && (
            <Block label="Problems tackled">
              <ol className="divide-y divide-line border-y border-line">
                {problems.map((problem, i) => (
                  <li
                    key={problem}
                    className="grid grid-cols-[3rem_1fr] gap-4 py-6"
                  >
                    <span className="font-mono text-sm text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-relaxed text-bone/80">
                      {problem}
                    </p>
                  </li>
                ))}
              </ol>
            </Block>
          )}
        </div>

        <Link
          href={getProjectHref(next)}
          data-cursor="Next"
          className="group mt-16 block border-t border-line pt-10"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted-ink uppercase">
            Next project
          </span>
          <span className="mt-4 flex items-end justify-between gap-6">
            <span className="text-[12vw] leading-[0.85] font-semibold tracking-[-0.06em] text-bone/30 transition-colors duration-500 group-hover:text-bone lg:text-[8rem]">
              {next.title}
            </span>
            <span className="mb-4 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line-strong text-bone transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-signal group-hover:bg-signal group-hover:text-ink sm:h-20 sm:w-20">
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </span>
        </Link>
      </div>
    </article>
  )
}

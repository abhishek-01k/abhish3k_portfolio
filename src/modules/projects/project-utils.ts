import { PROJECTS } from "@/src/config/constants"

export type Project = (typeof PROJECTS)[number]

export const getProjectSlug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

export const getProjectHref = (project: Project) =>
  `/projects/${getProjectSlug(project.title)}`

export const getProjectBySlug = (slug: string) =>
  PROJECTS.find((project) => getProjectSlug(project.title) === slug)

import { notFound } from "next/navigation"

import { FooterSection } from "@/src/modules/footer/footer-section"
import { ProjectDetail } from "@/src/modules/projects/components/project-detail"
import {
  getProjectBySlug,
  getProjectSlug,
} from "@/src/modules/projects/project-utils"
import { PROJECTS } from "@/src/config/constants"

interface ProjectDetailRouteProps {
  params: Promise<{
    project_name: string
  }>
}

export const generateStaticParams = () =>
  PROJECTS.map((project) => ({
    project_name: getProjectSlug(project.title),
  }))

export const generateMetadata = async ({ params }: ProjectDetailRouteProps) => {
  const { project_name } = await params
  const project = getProjectBySlug(project_name)

  if (!project) {
    return {
      title: "Project not found",
    }
  }

  return {
    title: project.title,
    description: project.bullets[0],
  }
}

export default async function ProjectDetailRoute({
  params,
}: ProjectDetailRouteProps) {
  const { project_name } = await params
  const project = getProjectBySlug(project_name)

  if (!project) notFound()

  return (
    <main>
      <ProjectDetail project={project} />
      <FooterSection />
    </main>
  )
}

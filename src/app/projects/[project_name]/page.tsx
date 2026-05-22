import { notFound } from "next/navigation"

import { Footer } from "@/src/modules/footer/footer"
import { ProjectDetail } from "@/src/modules/projects/components/project-detail"
import { getProjectBySlug, getProjectSlug } from "@/src/modules/projects/project-utils"
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
      title: "Project Not Found - Abhishek",
    }
  }

  return {
    title: `${project.title} - Abhishek`,
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
    <main className="bg-[#0e0e0e]">
      <ProjectDetail project={project} />
      <Footer />
    </main>
  )
}

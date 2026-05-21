import { ProjectsSection } from "@/src/modules/projects/components/projects-section"
import { Footer } from "@/src/modules/footer/footer"

export const metadata = {
  title: "Projects — Abhishek",
  description: "All projects — DeFi, AI, Web3, and more.",
}

export default function ProjectsRoutePage() {
  return (
    <main className="bg-[#0e0e0e]">
      <ProjectsSection />
      <Footer />
    </main>
  )
}

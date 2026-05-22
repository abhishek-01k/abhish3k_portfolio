import AboutPage from "@/src/modules/about/about-page"
import { SkillSlashGame } from "@/src/modules/about/components/skill-slash-game"
import ContactPage from "@/src/modules/contact/contact-page"
import ExperiencePage from "@/src/modules/experience/experience-page"
import { FooterSection } from "@/src/modules/footer/footer-section"
import HomePage from "@/src/modules/home/home-page"
import ProjectsPage from "@/src/modules/projects/projects-page"
import RecommendationsPage from "@/src/modules/recommendations/recommendations-page"

export default function Page() {
  return (
    <>
      <HomePage />
      <AboutPage />
<SkillSlashGame />
      <ExperiencePage />
      <ProjectsPage />
      <RecommendationsPage />
      <ContactPage />
      <FooterSection />
    </>
  )
}

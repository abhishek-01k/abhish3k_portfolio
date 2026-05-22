import AboutPage from "@/src/modules/about/about-page"
import { SkillSlashGame } from "@/src/modules/about/components/skill-slash-game"
import ContactPage from "@/src/modules/contact/contact-page"
import ExperiencePage from "@/src/modules/experience/experience-page"
import { FooterSection } from "@/src/modules/footer/footer-section"
import HomePage from "@/src/modules/home/home-page"
import ProjectsPage from "@/src/modules/projects/projects-page"
import RecommendationsPage from "@/src/modules/recommendations/recommendations-page"
import { ScrollReveal } from "@/src/components/scroll-reveal"

export default function Page() {
  return (
    <>
      <ScrollReveal>
        <HomePage />
      </ScrollReveal>
      <ScrollReveal>
        <AboutPage />
      </ScrollReveal>
      <ScrollReveal>
        <SkillSlashGame />
      </ScrollReveal>
      <ScrollReveal>
        <ProjectsPage />
      </ScrollReveal>
      <ScrollReveal>
        <ExperiencePage />
      </ScrollReveal>
      <ScrollReveal>
        <RecommendationsPage />
      </ScrollReveal>
      <ScrollReveal>
        <ContactPage />
      </ScrollReveal>
      <ScrollReveal>
        <FooterSection />
      </ScrollReveal>
    </>
  )
}

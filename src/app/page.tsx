import HomePage            from "@/src/modules/home/home-page"
import AboutPage           from "@/src/modules/about/about-page"
import ExperiencePage      from "@/src/modules/experience/experience-page"
import ProjectsPage        from "@/src/modules/projects/projects-page"
import AchievementsPage    from "@/src/modules/achievements/achievements-page"
import RecommendationsPage from "@/src/modules/recommendations/recommendations-page"
import ContactPage         from "@/src/modules/contact/contact-page"
import { Footer }          from "@/src/modules/footer/footer"

export default function Page() {
  return (
    <>
      <HomePage />
      <AboutPage />
      <ExperiencePage />
      <ProjectsPage />
      <AchievementsPage />
      <RecommendationsPage />
      <ContactPage />
      <Footer />
    </>
  )
}

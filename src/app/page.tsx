import { Manifesto } from "@/src/modules/about/components/manifesto"
import { SkillSlashGame } from "@/src/modules/about/components/skill-slash-game"
import { ContactCta } from "@/src/modules/contact/components/contact-cta"
import { Changelog } from "@/src/modules/experience/components/changelog"
import { FooterSection } from "@/src/modules/footer/footer-section"
import HomePage from "@/src/modules/home/home-page"
import { WorkSection } from "@/src/modules/projects/components/work-section"
import { Testimonials } from "@/src/modules/recommendations/components/testimonials"
import { WinsWall } from "@/src/modules/wins/wins-wall"

export default function Page() {
  return (
    <main>
      <HomePage />
      <WorkSection />
      <WinsWall />
      <Changelog />
      <Manifesto />
      <SkillSlashGame />
      <Testimonials />
      <ContactCta />
      <FooterSection />
    </main>
  )
}

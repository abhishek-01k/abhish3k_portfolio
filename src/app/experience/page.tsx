import { ExperienceTimeline } from "@/src/modules/experience/components/experience-timeline"
import { Footer } from "@/src/modules/footer/footer"

export const metadata = {
  title: "Experience — Abhishek",
  description: "Full work history and detailed experience.",
}

export default function ExperienceRoutePage() {
  return (
    <main>
      <ExperienceTimeline />
      <Footer />
    </main>
  )
}

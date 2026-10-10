import { Changelog } from "@/src/modules/experience/components/changelog"
import { FooterSection } from "@/src/modules/footer/footer-section"

export const metadata = {
  title: "Experience",
  description:
    "Abhishek's full work history — from BlockPay to four years building at Push Chain.",
}

export default function ExperienceRoutePage() {
  return (
    <main className="pt-16">
      <Changelog />
      <FooterSection />
    </main>
  )
}

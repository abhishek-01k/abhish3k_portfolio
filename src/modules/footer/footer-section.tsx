import AsciiHero from "@/src/components/ascii-hero"
import { Footer } from "@/src/modules/footer/footer"

export const FooterSection = () => {
  return (
    <>
      <div className="lg:hidden">
        <Footer />
      </div>

      <div className="hidden h-[38vw] flex-col overflow-hidden lg:flex">
        <Footer />
        <AsciiHero />
      </div>
    </>
  )
}

import { RevealText } from "@/src/components/motion/reveal-text"
import { SectionLabel } from "@/src/components/section-label"
import { PROJECTS } from "@/src/config/constants"
import { FooterSection } from "@/src/modules/footer/footer-section"
import { ProjectCard } from "@/src/modules/projects/components/work-section"

export const metadata = {
  title: "Work",
  description:
    "Every product Abhishek has shipped — DEXes, wallets, AI tutors, explorers and developer tools.",
}

export default function ProjectsRoutePage() {
  return (
    <main className="pt-28 sm:pt-32">
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionLabel>Work</SectionLabel>
        <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h1 className="text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-bone sm:text-7xl lg:text-9xl">
            <RevealText text="Everything" immediate />
            <RevealText
              text="shipped."
              immediate
              delay={0.12}
              className="font-serif font-normal text-signal italic"
            />
          </h1>
          <p className="font-mono text-sm text-muted-ink">
            {String(PROJECTS.length).padStart(2, "0")} entries · all live
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <div key={project.title} className={i % 2 ? "md:mt-24" : undefined}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
      <FooterSection />
    </main>
  )
}

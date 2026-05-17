import { SKILLS } from "@/src/config/constants"


const Dot = () => (
  <span aria-hidden className="mx-6 text-[#e64a3b]">
    •
  </span>
)

export const SkillsMarquee = () => {
  return (
    <section
      aria-label="Skills"
      className="overflow-hidden border-y border-neutral-800 bg-[#0f0f0f] py-12"
    >
      <div className="flex animate-[marquee_35s_linear_infinite]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {SKILLS.map((skill) => (
              <li key={skill} className="flex items-center">
                <span className="whitespace-nowrap text-sm font-semibold text-white sm:text-base">
                  {skill}
                </span>
                <Dot />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}

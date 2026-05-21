import { MoveUpRight } from "lucide-react"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Recommendations", href: "#recommendations" },
  { label: "Contact", href: "#contact" },
]

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/abhishek-01k" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhishek-01k/" },
  { label: "Twitter", href: "https://x.com/abhish_3k" },
]

const PROTOCOL_LINKS = [
  { label: "Work", href: "#experience" },
  { label: "Builds", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export const Footer = () => (
  <>
    <section className="relative w-full overflow-hidden border-t border-neutral-800 bg-white text-black">
      <div className="mx-auto grid max-w-6xl gap-10 px-8 py-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-serif text-2xl leading-none font-bold">
            Abhishek <span className="text-[#e64a3b] italic">Singh</span>
          </h2>
          <p className="mt-5 max-w-md font-mono text-xs leading-6 tracking-[0.08em] text-neutral-600">
            Full-stack systems, protocol experiments, and AI products. Designed
            to be useful, resilient, and a little strange.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="mb-4 font-mono text-[9px] tracking-[0.35em] text-neutral-400 uppercase">
              Protocol
            </h3>
            <div className="flex flex-col gap-3">
              {PROTOCOL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-medium transition-colors hover:text-[#e64a3b]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[9px] tracking-[0.35em] text-neutral-400 uppercase">
              Elsewhere
            </h3>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium transition-colors hover:text-[#e64a3b]"
                >
                  <div className="flex items-center gap-1">
                    {label}
                    <MoveUpRight className="h-4 w-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-neutral-300 px-8 py-4 font-mono text-[10px] tracking-[0.08em] text-neutral-400 md:flex-row md:items-center md:justify-between">
        <span>© MMXXVI · All signals intentional.</span>
        <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
         Created with ❤️ by Abhishek
        </div>
      </div>
    </section>
  </>
)

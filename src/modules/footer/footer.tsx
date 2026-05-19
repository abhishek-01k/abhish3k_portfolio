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

const FOOTER_CODES = [
  "AIBuilder 0x775A...A42A",
  "Protocol 0x774C...A760",
  "Founder 0x9C7A...8F16",
]

const ASCII_ROWS = [
  "$$$$$$$$$$$$$$XXXXXXXXX.............:::::::....XXXXXXXXXXXX$$$$$$$$$$$$",
  "$$$$$$$$$$$$XXXXXXXX...........:::::.....:::::......XXXXXXXXXX$$$$$$$$",
  "$$$$$$$$$$XXXXXX.........::::::.............::::::......XXXXXXXX$$$$$",
  "$$$$$$$$XXXXX.......::::.....XXXXXXXXXXXXXX.....::::......XXXXXX$$$$",
  "$$$$$$XXXXX.....::::....XXXXXX$$$$$$$$$$$$XXXXXX....::::....XXXXX$$",
  "$$$$XXXXX....::::....XXXX$$$$$$$$$$$$$$$$$$$$XXXX....::::....XXXX$$",
  "$$$XXXXX...::::....XXX$$$$$$XXXXXXXXXXXX$$$$$$XXX....::::....XXXX$",
  "$$XXXX...::::....XXX$$$$XXXX............XXXX$$$$XXX....::::....XXX$",
  "$XXXX...::::....XX$$$$XXX......::::......XXX$$$$XX....::::....XXXX",
  "XXXX....::::....XX$$$$XX....XXXXXXXX....XX$$$$XX....::::....XXXXX",
  "XXX....::::....XXX$$$$XX...XX$$$$$$XX...XX$$$$XXX....::::....XXX",
  "XXXX....::::....XXXX$$$$XXXX$$$$$$$$XXXX$$$$XXXX....::::....XXXX",
  "$XXXX....::::.....XXXX$$$$$$$$$$$$$$$$$$$$XXXX.....::::....XXXXX$",
  "$$XXXXX....::::......XXXXXX$$$$$$$$$$$$XXXXXX......::::....XXXX$$",
  "$$$XXXXXX.....::::........XXXXXXXXXXXX........::::.....XXXXXX$$$$",
  "$$$$$XXXXXXX.......::::....................::::.......XXXXXXX$$$$",
  "$$$$$$$XXXXXXXXX........::::..........::::........XXXXXXXXX$$$$$$",
  "$$$$$$$$$XXXXXXXXXXX........................XXXXXXXXXXX$$$$$$$$$",
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
        <span>© MMXXVI · Abhishek · All signals intentional.</span>
        <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
          {FOOTER_CODES.map((code) => (
            <span key={code}>{code}</span>
          ))}
        </div>
      </div>

      <div className="relative h-[240px] overflow-hidden border-t border-neutral-200 sm:h-[300px]">
        {/* primary drift layer */}
        <div className="footer-ascii-drift absolute inset-0 flex flex-col items-center justify-center font-mono text-[9px] leading-[0.85] tracking-[0.22em] text-black/10 sm:text-[11px] md:text-[13px]">
          {ASCII_ROWS.map((row, index) => (
            <span
              key={`${row}-${index}`}
              className={index % 3 === 0 ? "text-black/20" : undefined}
            >
              {row}
            </span>
          ))}
        </div>
        {/* reverse-phase parallax layer */}
        <div className="footer-ascii-drift-slow absolute inset-0 flex flex-col items-center justify-center font-mono text-[8px] leading-[0.85] tracking-[0.22em] text-black/[0.04] sm:text-[10px] md:text-[12px]">
          {ASCII_ROWS.map((row, index) => (
            <span key={`slow-${row}-${index}`}>{row}</span>
          ))}
        </div>

        <div className="footer-ascii-glow absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,74,59,0.22),transparent_46%)]" />
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="footer-word-pulse font-mono text-[clamp(3.5rem,15vw,11rem)] leading-none font-black tracking-[-0.12em] text-[#e64a3b] uppercase">
            abhish3k
          </p>
        </div>
      </div>
    </section>
  </>
)

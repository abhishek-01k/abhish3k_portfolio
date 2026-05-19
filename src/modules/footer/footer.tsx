const NAV_LINKS = [
  { label: "About",           href: "#about"           },
  { label: "Experience",      href: "#experience"      },
  { label: "Projects",        href: "#projects"        },
  { label: "Recommendations", href: "#recommendations" },
  { label: "Contact",         href: "#contact"         },
]

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/abhish3k"           },
  { label: "LinkedIn", href: "https://linkedin.com/in/abhish3k"      },
  { label: "Twitter",  href: "https://twitter.com/abhish3k"          },
]

export const Footer = () => (
  <footer className="w-full bg-[#0e0e0e] text-white border-t border-neutral-800">
    <div className="mx-auto max-w-6xl px-8">

      {/* Top row */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 py-10 border-b border-neutral-800">

        {/* Logo / name */}
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold tracking-tight text-white">abhish3k</span>
          <span className="text-xs text-neutral-600 font-mono">Protocol Engineer · AI Builder · Founder</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-500 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
        <span className="text-xs text-neutral-700 font-mono">
          © {new Date().getFullYear()} Abhishek Singh. Built with Next.js & Tailwind.
        </span>
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-600 hover:text-[#e64a3b] transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

    </div>
  </footer>
)

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { LocalTime } from "@/src/components/local-time"
import { SITE } from "@/src/config/constants"
import { cn, withBasePath } from "@/src/lib/utils"

const NAV = [
  { label: "Work", id: "work" },
  { label: "Wins", id: "wins" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
]

const EASE = [0.76, 0, 0.24, 1] as const

const useActiveSection = (enabled: boolean) => {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const els = NAV.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    )
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [enabled])

  return active
}

const Header = () => {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const active = useActiveSection(isHome)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Tuck the bar away while scrolling down; bring it back on scroll up.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 240 && y > lastY + 4)
      if (y < lastY - 4 || y < 240) setHidden(false)
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [open])

  const hrefFor = (id: string) => (isHome ? `#${id}` : withBasePath(`/#${id}`))

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
          {/* Mark */}
          <Link
            href="/"
            aria-label="Abhishek — home"
            className="group flex h-11 items-center gap-2.5 rounded-full border border-line bg-ink/70 pr-4 pl-1.5 backdrop-blur-xl"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-bone font-serif text-lg leading-none text-ink italic transition-transform duration-500 group-hover:rotate-[360deg]">
              a
            </span>
            <span className="font-mono text-xs tracking-tight text-bone">
              {SITE.handle}
              <span className="text-signal">.xyz</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            aria-label="Main"
            className="hidden h-11 items-center gap-0.5 rounded-full border border-line bg-ink/70 p-1 backdrop-blur-xl lg:flex"
          >
            {NAV.map(({ label, id }) => {
              const isActive = isHome && active === id
              return (
                <a
                  key={id}
                  href={hrefFor(id)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-300",
                    isActive ? "text-ink" : "text-bone/70 hover:text-bone"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-signal"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              )
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <span className="hidden h-11 items-center gap-2 rounded-full border border-line bg-ink/70 px-4 font-mono text-[11px] tracking-wider text-muted-ink uppercase backdrop-blur-xl xl:flex">
              BLR <LocalTime />
            </span>
            <a
              href={SITE.resume}
              target="_blank"
              rel="noreferrer"
              className="group hidden h-11 items-center gap-1.5 rounded-full bg-bone px-5 text-[13px] font-semibold text-ink transition-colors hover:bg-signal sm:flex"
            >
              Resume
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 items-center gap-2 rounded-full border border-line bg-ink/70 px-4 text-[13px] font-medium text-bone backdrop-blur-xl lg:hidden"
            >
              <span className="relative block h-2.5 w-4">
                <span
                  className={cn(
                    "absolute top-0 left-0 h-px w-4 bg-bone transition-transform duration-300",
                    open && "translate-y-[5px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-4 bg-bone transition-transform duration-300",
                    open && "-translate-y-[4px] -rotate-45"
                  )}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pt-24 pb-8 lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.map(({ label, id }, i) => (
                <motion.a
                  key={id}
                  href={hrefFor(id)}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.06,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex items-baseline justify-between border-b border-line py-4"
                >
                  <span className="text-5xl font-semibold tracking-tighter text-bone transition-colors group-hover:text-signal">
                    {label}
                  </span>
                  <span className="font-mono text-xs text-muted-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <a
                href={SITE.resume}
                target="_blank"
                rel="noreferrer"
                className="flex h-14 items-center justify-center gap-2 rounded-full bg-signal text-base font-semibold text-ink"
              >
                Download resume <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="flex items-center justify-between font-mono text-[11px] tracking-wider text-muted-ink uppercase">
                <div className="flex gap-4">
                  {SITE.socials.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-bone"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
                <span>
                  BLR <LocalTime />
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header

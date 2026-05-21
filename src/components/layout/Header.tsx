"use client"

import { ArrowUp, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/src/components/ui/button"
import { GlitchButton } from "@/src/components/ui/glitch-button"
import { cn } from "@/src/lib/utils"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

const resumeLink =
  "https://drive.google.com/file/d/1bMG9fpr_DWppDePD5Yc1nWhrC7WUy_t7/view?usp=sharing"
const HEADER_H = "top-16 sm:top-20"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolledPastIntro, setHasScrolledPastIntro] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>("[data-home-hero]")
      const hideAt = hero
        ? Math.max(hero.offsetTop + hero.offsetHeight - 120, 0)
        : 120

      setHasScrolledPastIntro(window.scrollY > hideAt)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const shouldHideHeader = hasScrolledPastIntro && !isOpen

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const close = () => setIsOpen(false)

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-background/80 px-4 backdrop-blur transition-all duration-700 ease-in-out sm:h-20 sm:px-6 lg:px-8",
          shouldHideHeader
            ? "pointer-events-none -translate-y-full opacity-0"
            : "translate-y-0 opacity-100",
        )}
      >

        <Link href="/" aria-label="Go to home" className="flex items-center gap-2">
          <Image
            src="/Abhishek_logo.png"
            alt="Abhishek logo"
            width={44}
            height={44}
            priority
            className="h-10 w-auto sm:h-12"
          />
          <div className="flex flex-col leading-tight">
            <p className="text-sm font-medium">Abhishek</p>
            <p className="text-xs text-muted-foreground">Software Developer</p>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-4 lg:flex">
          {navLinks.map(({ label, href }) => (
            <Button key={href} variant="ghost" asChild>
              <a
                href={href}
                className="relative after:absolute after:bottom-1 after:left-2.5 after:h-px after:w-[calc(100%-1.25rem)] after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {label}
              </a>
            </Button>
          ))}
          <GlitchButton href={resumeLink} target="_blank" rel="noreferrer">
            Resume
          </GlitchButton>
        </nav>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

      </header>

      <div
        aria-hidden
        onClick={close}
        className={cn(
          "fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto bg-[#101010] px-6 py-10 text-white shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          HEADER_H,
          isOpen ? "translate-y-0" : "pointer-events-none translate-y-full",
        )}
      >
        <p className="mb-10 text-2xl font-medium tracking-tight">Menu</p>

        <nav aria-label="Mobile navigation" className="flex flex-col gap-6">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="text-4xl font-light tracking-tight text-white/50 transition-colors duration-200 hover:text-white sm:text-6xl"
            >
              {label}
            </a>
          ))}

          <div className="mt-6">
            <GlitchButton
              href={resumeLink}
              target="_blank"
              rel="noreferrer"
              onClick={close}
            >
              Resume
            </GlitchButton>
          </div>
        </nav>
      </div>

      <button
        type="button"
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/85 text-foreground shadow-lg backdrop-blur transition-all duration-700 ease-in-out hover:-translate-y-1 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14",
          hasScrolledPastIntro
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0",
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  )
}

export default Header

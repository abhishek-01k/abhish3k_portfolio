"use client"

import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/src/components/ui/button"
import { GlitchButton } from "@/src/components/ui/glitch-button"
import { cn } from "@/src/lib/utils"

const navLinks = [
  { label: "About",  href: "#about" },
  { label: "Work",  href: "#work" },
  { label: "Projects", href: "#projects" },
]

const HEADER_H = "top-16 sm:top-20"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-background/80 px-4 backdrop-blur sm:h-20 sm:px-6 lg:px-8">

        <Link href="/" aria-label="Go to home" className="flex items-center gap-2">
          <Image
            src="/abhishek_logo_new.png"
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
          <GlitchButton href="#contact">Contact</GlitchButton>
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
            <GlitchButton href="#contact" onClick={close}>
              Contact
            </GlitchButton>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header

"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import { useState } from "react"

import { LocalTime } from "@/src/components/local-time"
import { Magnetic } from "@/src/components/motion/magnetic"
import { RevealText } from "@/src/components/motion/reveal-text"
import { SectionLabel } from "@/src/components/section-label"
import { SITE } from "@/src/config/constants"

const Field = ({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="group block">
    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-ink uppercase">
      {label}
    </span>
    <input
      {...props}
      className="mt-2 w-full border-b border-line-strong bg-transparent pb-3 text-lg text-bone placeholder:text-bone/25 focus:border-signal focus:outline-none"
    />
  </label>
)

export const ContactCta = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [copied, setCopied] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${SITE.email}`
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line pt-24 sm:pt-32"
    >
      <div className="pointer-events-none absolute top-20 -right-40 h-[36rem] w-[36rem] rounded-full bg-signal/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="mt-6 text-[15vw] leading-[0.85] font-semibold tracking-[-0.06em] text-bone lg:text-[11rem]">
          <RevealText text="Let’s build" by="letter" stagger={0.025} />
          <RevealText
            text="something."
            by="letter"
            stagger={0.03}
            delay={0.25}
            className="font-serif font-normal tracking-[-0.03em] text-signal italic"
          />
        </h2>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${SITE.email}`}
            className="group relative w-fit text-xl text-bone sm:text-3xl"
          >
            {SITE.email}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100" />
          </a>
          <Magnetic>
            <button
              type="button"
              onClick={copy}
              className="flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 font-mono text-[11px] tracking-[0.16em] text-bone uppercase transition-colors hover:border-signal hover:text-signal"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </Magnetic>
        </div>

        <div className="mt-20 grid gap-16 border-t border-line pt-14 lg:grid-cols-12 lg:gap-8">
          {/* Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 lg:col-span-6"
          >
            <p className="font-serif text-3xl text-bone italic">
              Or send a note —
            </p>
            <div className="grid gap-8 sm:grid-cols-2">
              <Field
                label="Name"
                required
                value={form.name}
                placeholder="Satoshi"
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
              <Field
                label="Email"
                type="email"
                required
                value={form.email}
                placeholder="you@company.com"
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <label className="block">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-ink uppercase">
                Message
              </span>
              <textarea
                required
                rows={4}
                value={form.message}
                placeholder="What are you building?"
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="mt-2 w-full resize-none border-b border-line-strong bg-transparent pb-3 text-lg text-bone placeholder:text-bone/25 focus:border-signal focus:outline-none"
              />
            </label>
            <Magnetic>
              <button
                type="submit"
                className="group flex h-14 items-center gap-2 rounded-full bg-signal pr-2 pl-6 text-sm font-semibold text-ink"
              >
                Send message
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-signal transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </Magnetic>
          </motion.form>

          {/* Status */}
          <dl className="grid content-start gap-px overflow-hidden rounded-md border border-line bg-line lg:col-span-5 lg:col-start-8">
            {[
              ["Currently", `${SITE.role} @ ${SITE.company}`],
              [
                "Open to",
                "Protocol engineering, founding-engineer roles, ambitious side projects",
              ],
              ["Based in", "Indiranagar, Bangalore · remote-friendly"],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink p-5">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-ink uppercase">
                  {k}
                </dt>
                <dd className="mt-2 text-bone">{v}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between bg-ink p-5">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-ink uppercase">
                Local time
              </dt>
              <dd className="font-mono text-bone">
                <LocalTime seconds />
              </dd>
            </div>
            <div className="bg-ink p-2">
              {SITE.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded px-3 py-3 text-lg text-bone transition-colors hover:bg-ink-2"
                >
                  {s.label}
                  <ArrowUpRight className="h-4 w-4 text-muted-ink transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
                </a>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

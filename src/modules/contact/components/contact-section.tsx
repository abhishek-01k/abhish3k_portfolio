"use client"

import { useState } from "react"

const LINKS = [
  { label: "GitHub",   href: "https://github.com/abhish3k",                         mono: "github.com/abhish3k" },
  { label: "LinkedIn", href: "https://linkedin.com/in/abhish3k",                    mono: "linkedin.com/in/abhish3k" },
  { label: "Twitter",  href: "https://twitter.com/abhish3k",                        mono: "@abhish3k" },
  { label: "Email",    href: "mailto:abhishekkumar214567@gmail.com",                 mono: "abhishekkumar214567@gmail.com" },
]

export const ContactSection = () => {
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [form,    setForm]    = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder — wire up your preferred email service here
    setTimeout(() => { setSent(true); setLoading(false) }, 800)
  }

  return (
    <section id="contact" className="w-full bg-[#0e0e0e] text-white border-t border-neutral-800">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-neutral-800">
          <span className="text-[10px] font-bold tracking-[0.35em] text-[#e64a3b] uppercase border border-[#e64a3b] px-2 py-0.5">
            {"// Contact"}
          </span>
          <h2
            className="mt-3 font-bold tracking-tight text-white leading-[1.06]"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Let&apos;s build something.
          </h2>
          <p className="mt-3 text-neutral-500 text-sm max-w-md leading-relaxed">
            Open to protocol engineering roles, founding-engineer opportunities, and
            interesting side projects. Drop a message or reach out directly.
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row">

          {/* Links column */}
          <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-neutral-800 px-8 py-8 flex flex-col gap-6">
            {LINKS.map(({ label, href, mono }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-0.5"
              >
                <span className="text-[9px] font-bold tracking-[0.28em] text-neutral-700 uppercase group-hover:text-[#e64a3b] transition-colors">
                  {label}
                </span>
                <span className="text-sm font-mono text-neutral-400 group-hover:text-white transition-colors">
                  {mono}
                </span>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="flex-1 px-8 py-8">
            {sent ? (
              <div className="flex flex-col gap-3 items-start justify-center h-full">
                <span className="text-[#e64a3b] font-bold text-lg">Message sent.</span>
                <p className="text-neutral-500 text-sm">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Field
                  label="Name"
                  type="text"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="Your name"
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="you@example.com"
                  required
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold tracking-[0.28em] text-neutral-600 uppercase">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="What are you working on?"
                    className="w-full bg-transparent border border-neutral-800 rounded-sm px-4 py-3 text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-[#e64a3b] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="self-start text-[10px] font-bold tracking-[0.3em] uppercase px-6 py-3 border border-[#e64a3b] text-[#e64a3b] hover:bg-[#e64a3b] hover:text-black transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending…" : "Send message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Field helper ─────────────────────────────────────────────────────────────
const Field = ({
  label, type, value, onChange, placeholder, required,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  required?: boolean
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] font-bold tracking-[0.28em] text-neutral-600 uppercase">
      {label}
    </label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border border-neutral-800 rounded-sm px-4 py-3 text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-[#e64a3b] transition-colors"
    />
  </div>
)

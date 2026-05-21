"use client"

import { useState } from "react"

const CONTACT_EMAIL = "abhishekkumar214567@gmail.com"

export const ContactSection = () => {
  const [form,    setForm]    = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
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
            interesting side projects. Drop a message or reach out directly at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#e64a3b] underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Form */}
          <div className="border-b lg:border-b-0 lg:border-r border-neutral-800 px-8 py-8">
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
                className="self-start text-[10px] font-bold tracking-[0.3em] uppercase px-6 py-3 border border-[#e64a3b] text-[#e64a3b] hover:bg-[#e64a3b] hover:text-black transition-colors disabled:opacity-50"
              >
                Send email -&gt;
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="px-8 py-8">
            <div className="mb-5">
              <span className="text-[9px] font-bold tracking-[0.28em] text-neutral-600 uppercase">
                Location
              </span>
              <h3 className="mt-2 text-2xl font-bold text-white">Indiranagar, Bangalore</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Based in Indiranagar, Bangalore and available for remote-first collaborations.
              </p>
            </div>
            <RealMapCard />
          </div>
        </div>
      </div>
    </section>
  )
}

const RealMapCard = () => (
  <div className="relative h-[420px] overflow-hidden rounded-sm border border-neutral-800 bg-[#07090b] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
    <iframe
      title="Map of Indiranagar, Bangalore, India"
      src="https://www.google.com/maps?q=Indiranagar%2C%20Bangalore%2C%20India&z=14&output=embed"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="absolute inset-0 h-full w-full border-0 grayscale invert"
      allowFullScreen
    />
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,11,0.72),transparent_45%,rgba(7,9,11,0.35)),linear-gradient(180deg,rgba(7,9,11,0.2),rgba(7,9,11,0.78))]" />

    <div className="absolute left-5 top-5 rounded-sm border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-md">
      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#e64a3b]">Google Maps</p>
      <p className="mt-1 text-sm font-bold text-white">Indiranagar, Bangalore</p>
      <p className="mt-1 text-xs text-neutral-500">Live area map · India</p>
    </div>

    <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">Current waypoint</p>
        <p className="mt-1 text-3xl font-bold text-white">12.9784° N</p>
        <p className="text-sm text-neutral-500">77.6408° E · Available worldwide</p>
      </div>
      <a
        href="https://www.google.com/maps/search/?api=1&query=Indiranagar%2C%20Bangalore%2C%20India"
        target="_blank"
        rel="noreferrer"
        className="border border-[#e64a3b] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#e64a3b] transition-colors hover:bg-[#e64a3b] hover:text-black"
      >
        Open map
      </a>
    </div>
  </div>
)

const StudioMapCard = () => (
  <div className="relative h-[420px] overflow-hidden rounded-sm border border-neutral-800 bg-[#07090b] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(230,74,59,0.22),transparent_26%),radial-gradient(circle_at_78%_30%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_46px),linear-gradient(45deg,rgba(255,255,255,0.04)_0_1px,transparent_1px_34px)]" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,11,0.9),transparent_35%,rgba(7,9,11,0.58)),linear-gradient(180deg,transparent,rgba(7,9,11,0.88))]" />

    <svg
      viewBox="0 0 620 420"
      role="img"
      aria-label="Stylized Mapbox Studio inspired map of Indiranagar, Bangalore"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e64a3b" stopOpacity="0.15" />
          <stop offset="48%" stopColor="#e64a3b" />
          <stop offset="100%" stopColor="#f4a261" />
        </linearGradient>
        <filter id="routeGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d="M-40 112 C92 48 196 84 312 44 C432 3 520 32 676 -22" stroke="#27313a" strokeWidth="22" fill="none" opacity="0.5" />
      <path d="M-38 116 C90 58 198 96 314 55 C438 12 528 45 674 -12" stroke="#0b1015" strokeWidth="14" fill="none" opacity="0.9" />
      <path d="M36 394 C88 298 158 286 224 216 C298 138 396 136 560 62" stroke="#26343d" strokeWidth="16" fill="none" opacity="0.45" />
      <path d="M40 390 C92 304 162 292 230 220 C304 144 402 144 564 70" stroke="#10161c" strokeWidth="9" fill="none" opacity="0.9" />
      <path d="M86 12 C126 96 132 176 214 220 C298 266 380 246 470 330 C518 374 568 394 642 398" stroke="#2b343c" strokeWidth="10" fill="none" opacity="0.55" />
      <path d="M90 18 C130 100 138 176 218 216 C302 260 384 240 474 324 C522 366 572 386 644 390" stroke="#10161c" strokeWidth="5" fill="none" opacity="0.95" />

      <path
        d="M92 342 C144 302 172 244 236 232 C288 222 308 164 352 142 C406 116 444 148 498 104"
        stroke="url(#routeGradient)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        filter="url(#routeGlow)"
      />
      <path
        d="M92 342 C144 302 172 244 236 232 C288 222 308 164 352 142 C406 116 444 148 498 104"
        stroke="#ffe0d8"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />

      {[
        [86, 78, 32, 36],
        [134, 112, 22, 62],
        [188, 64, 36, 48],
        [392, 68, 42, 52],
        [456, 152, 24, 70],
        [514, 196, 38, 44],
        [116, 254, 28, 74],
        [184, 312, 44, 48],
        [360, 292, 28, 64],
        [420, 334, 54, 36],
      ].map(([x, y, width, height]) => (
        <g key={`${x}-${y}`} opacity="0.82">
          <rect x={x} y={y} width={width} height={height} fill="#141a20" stroke="#2a333b" strokeWidth="1" />
          <path d={`M${x} ${y} L${x + 10} ${y - 10} H${x + width + 10} L${x + width} ${y} Z`} fill="#202832" />
          <path d={`M${x + width} ${y} L${x + width + 10} ${y - 10} V${y + height - 10} L${x + width} ${y + height} Z`} fill="#0d1217" />
        </g>
      ))}

      <g transform="translate(322 176)">
        <circle r="38" fill="#e64a3b" opacity="0.12" />
        <circle r="18" fill="#e64a3b" opacity="0.22" />
        <path d="M0 -34 C18 -34 32 -20 32 -2 C32 22 0 52 0 52 C0 52 -32 22 -32 -2 C-32 -20 -18 -34 0 -34Z" fill="#e64a3b" />
        <circle r="10" fill="#0e0e0e" />
        <circle r="4" fill="#fff4ef" />
      </g>
    </svg>

    <div className="absolute left-5 top-5 rounded-sm border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-md">
      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#e64a3b]">Mapbox Studio</p>
      <p className="mt-1 text-sm font-bold text-white">Indiranagar base map</p>
      <p className="mt-1 text-xs text-neutral-500">3D buildings · low POI density · dusk palette</p>
    </div>

    <div className="absolute right-5 top-5 flex flex-col gap-2 rounded-sm border border-white/10 bg-black/35 p-2 backdrop-blur-md">
      {["Roads", "Terrain", "3D"].map((item) => (
        <span key={item} className="rounded-sm border border-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-neutral-300">
          {item}
        </span>
      ))}
    </div>

    <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">Current waypoint</p>
        <p className="mt-1 text-3xl font-bold text-white">12.9784° N</p>
        <p className="text-sm text-neutral-500">77.6408° E · Available worldwide</p>
      </div>
      <a
        href="https://www.google.com/maps/search/?api=1&query=Indiranagar%2C%20Bangalore%2C%20India"
        target="_blank"
        rel="noreferrer"
        className="border border-[#e64a3b] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#e64a3b] transition-colors hover:bg-[#e64a3b] hover:text-black"
      >
        Open map
      </a>
    </div>
  </div>
)

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

import type { ComponentPropsWithoutRef } from "react"

interface GlitchButtonProps extends Omit<ComponentPropsWithoutRef<"a">, "children"> {
  href: string
  children: string
  className?: string
}

export const GlitchButton = ({
  href,
  children,
  className,
  ...props
}: GlitchButtonProps) => {
  return (
    <a
      href={href}
      className={`glitch-btn group relative inline-block [--chamfer:12px] ${className ?? ""}`}
      {...props}
    >
      {/* Offset coral shadow — same chamfered shape */}
      <span
        aria-hidden
        className="absolute left-1.5 top-1.5 block h-full w-full bg-[#e64a3b] [clip-path:polygon(var(--chamfer)_0,100%_0,100%_calc(100%_-_var(--chamfer)),calc(100%_-_var(--chamfer))_100%,0_100%,0_var(--chamfer))]"
      />
      {/* Button face */}
      <span className="relative z-10 flex items-center bg-[#141414] px-7 py-3 transition-transform duration-100 [clip-path:polygon(var(--chamfer)_0,100%_0,100%_calc(100%_-_var(--chamfer)),calc(100%_-_var(--chamfer))_100%,0_100%,0_var(--chamfer))] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
        <span
          className="glitch-text relative font-mono text-base font-bold text-white"
          data-text={children}
        >
          {children}
        </span>
      </span>
    </a>
  )
}

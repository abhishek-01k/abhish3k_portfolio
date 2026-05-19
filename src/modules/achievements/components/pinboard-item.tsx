"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { AchievementItem } from "@/src/config/constants"
import { Pin } from "./pin"

interface PinboardItemProps {
  item:      AchievementItem
  isActive:  boolean   // passes filter
  onClick:   () => void
  isMobile:  boolean
}

// Size → pixel width mapping (board units)
const WIDTH: Record<AchievementItem["size"], number> = { sm: 180, md: 230, lg: 280 }

export const PinboardItem = ({ item, isActive, onClick, isMobile }: PinboardItemProps) => {
  const w = isMobile ? "100%" : WIDTH[item.size]

  const baseCard = "relative overflow-visible cursor-pointer focus:outline-none"
  const innerStyle: React.CSSProperties = {
    "--rot": `${item.rotation}deg`,
    transform: `rotate(var(--rot))`,
    width: typeof w === "number" ? `${w}px` : w,
  } as React.CSSProperties

  return (
    <motion.button
      layoutId={`card-${item.id}`}
      onClick={onClick}
      className={baseCard}
      style={innerStyle}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: isActive ? 1 : 0.18, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        opacity: 1,
        rotate: 0,
        y: -6,
        zIndex: 20,
        transition: { duration: 0.2 },
      }}
      animate={{ opacity: isActive ? 1 : 0.18 }}
    >
      <Pin type={item.pin} color={item.pinColor} />
      <ItemInner item={item} />
    </motion.button>
  )
}

// ─── Item type renderers ──────────────────────────────────────────────────────
const ItemInner = ({ item }: { item: AchievementItem }) => {
  if (item.type === "polaroid") return <PolaroidCard item={item} />
  if (item.type === "note")     return <NoteCard     item={item} />
  if (item.type === "ticket")   return <TicketCard   item={item} />
  return <DefaultCard item={item} />
}

const DefaultCard = ({ item }: { item: AchievementItem }) => (
  <div className="rounded-lg border border-neutral-800 bg-[#1a1a1a] overflow-hidden shadow-lg">
    <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
      <Image
        src={item.image}
        alt={`${item.type} — ${item.title}`}
        fill
        className="object-cover"
        sizes="(max-width:768px) 50vw, 280px"
      />
    </div>
    <div className="px-3 py-2.5">
      <p className="text-white text-xs font-bold leading-snug line-clamp-2">{item.title}</p>
      <p className="text-neutral-600 text-[10px] font-mono mt-0.5">{item.date}</p>
    </div>
  </div>
)

const PolaroidCard = ({ item }: { item: AchievementItem }) => (
  <div className="bg-[#1c1c1c] p-2 pb-7 shadow-xl rounded-sm border border-neutral-800">
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
      <Image
        src={item.image}
        alt={`polaroid — ${item.title}`}
        fill
        className="object-cover"
        sizes="(max-width:768px) 50vw, 230px"
      />
    </div>
    <p className="mt-3 text-center text-[11px] text-neutral-400 leading-snug px-1 line-clamp-2">
      {item.title}
    </p>
  </div>
)

const NoteCard = ({ item }: { item: AchievementItem }) => (
  <div
    className="rounded-sm border border-neutral-700 bg-[#14140e] px-4 py-3 shadow-md"
    style={{
      backgroundImage:
        "repeating-linear-gradient(transparent, transparent 22px, rgba(255,255,255,0.04) 22px, rgba(255,255,255,0.04) 23px)",
    }}
  >
    <p className="text-[10px] font-bold tracking-[0.2em] text-[#e64a3b] uppercase mb-2">
      {item.date}
    </p>
    <p className="text-white text-xs font-bold leading-snug mb-1.5 line-clamp-2">{item.title}</p>
    <p className="text-neutral-500 text-[10px] leading-relaxed line-clamp-3">
      {item.description}
    </p>
    <div className="mt-3 flex flex-wrap gap-1">
      {item.tags.slice(0, 2).map((t) => (
        <span key={t} className="text-[9px] text-[#e64a3b] font-mono">#{t}</span>
      ))}
    </div>
  </div>
)

const TicketCard = ({ item }: { item: AchievementItem }) => (
  <div className="relative overflow-hidden rounded-sm shadow-lg">
    {/* Perforated edge using radial-gradient cutouts */}
    <div
      className="absolute inset-y-0 left-0 w-3 bg-[#0e0e0e]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 0px 8px, #0e0e0e 5px, transparent 5px)",
        backgroundSize: "100% 16px",
      }}
    />
    <div
      className="absolute inset-y-0 right-0 w-3 bg-[#0e0e0e]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 12px 8px, #0e0e0e 5px, transparent 5px)",
        backgroundSize: "100% 16px",
      }}
    />
    <div className="border border-neutral-700 border-dashed bg-[#111] mx-3 px-4 py-3">
      <div className="relative w-full mb-3 overflow-hidden rounded-sm" style={{ aspectRatio: "16/9" }}>
        <Image
          src={item.image}
          alt={`ticket — ${item.title}`}
          fill
          className="object-cover opacity-80"
          sizes="(max-width:768px) 50vw, 230px"
        />
      </div>
      <p className="text-[10px] font-bold tracking-[0.2em] text-[#e64a3b] uppercase mb-1">
        {item.date}
      </p>
      <p className="text-white text-xs font-bold leading-snug line-clamp-2">{item.title}</p>
    </div>
  </div>
)

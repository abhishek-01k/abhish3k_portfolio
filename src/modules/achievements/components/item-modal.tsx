"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import type { AchievementItem } from "@/src/config/constants"

interface ItemModalProps {
  item: AchievementItem | null
  onClose: () => void
}

export const ItemModal = ({ item, onClose }: ItemModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!item) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            layoutId={`card-${item.id}`}
            className="fixed z-50 inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-lg rounded-2xl border border-neutral-800 bg-[#111111] overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {/* Image */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={item.image}
                alt={`${item.type} — ${item.title}`}
                fill
                className="object-cover"
                sizes="512px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
            </div>

            {/* Content */}
            <div className="px-7 pb-7 pt-2">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-bold tracking-[0.25em] uppercase px-2 py-0.5 border border-[#e64a3b]/30 text-[#e64a3b] rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h2 className="text-white font-bold text-lg leading-snug mb-1">{item.title}</h2>
              <p className="text-neutral-600 text-xs font-mono mb-4">{item.date}</p>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">{item.description}</p>

              <div className="flex items-center gap-3">
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#e64a3b] border border-[#e64a3b] px-4 py-2 hover:bg-[#e64a3b] hover:text-black transition-colors"
                  >
                    View Project →
                  </a>
                )}
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 border border-neutral-800 px-4 py-2 hover:text-white hover:border-neutral-600 transition-colors ml-auto focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

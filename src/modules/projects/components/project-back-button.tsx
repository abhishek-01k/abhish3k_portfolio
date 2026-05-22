"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export const ProjectBackButton = () => {
  const router = useRouter()
  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push("/projects")
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="group inline-flex items-center gap-2 border border-neutral-700 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-neutral-300 transition-colors hover:border-[#e64a3b]/60 hover:text-white"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Back
    </button>
  )
}

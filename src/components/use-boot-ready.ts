"use client"

import { useSyncExternalStore } from "react"

export const BOOT_EVENT = "abhish3k:boot-done"

export const markBootDone = () => {
  document.documentElement.dataset.booted = "1"
  window.dispatchEvent(new Event(BOOT_EVENT))
}

const subscribe = (onChange: () => void) => {
  window.addEventListener(BOOT_EVENT, onChange)
  return () => window.removeEventListener(BOOT_EVENT, onChange)
}

/** True once the intro preloader has finished (or was skipped). */
export const useBootReady = () =>
  useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.booted === "1",
    () => false
  )

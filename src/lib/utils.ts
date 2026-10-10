import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Prefix a root-relative public asset with the deploy base path. Empty in
 * production; set (e.g. "/abhish3k_portfolio") for the GitHub Pages preview.
 */
export const withBasePath = (path: string) =>
  path.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
    : path

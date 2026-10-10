import type { MetadataRoute } from "next"

import { PROJECTS, SITE } from "@/src/config/constants"
import { getProjectHref } from "@/src/modules/projects/project-utils"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE.url, lastModified: now, priority: 1 },
    { url: `${SITE.url}/projects`, lastModified: now, priority: 0.8 },
    { url: `${SITE.url}/experience`, lastModified: now, priority: 0.7 },
    ...PROJECTS.map((project) => ({
      url: `${SITE.url}${getProjectHref(project)}`,
      lastModified: now,
      priority: 0.6,
    })),
  ]
}

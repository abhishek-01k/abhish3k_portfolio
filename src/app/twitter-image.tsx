import { ImageResponse } from "next/og"

import { SITE } from "@/src/config/constants"

export const dynamic = "force-static"

export const alt = SITE.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0a0a0b",
        color: "#ece8e0",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#8b877e",
        }}
      >
        <span>abhish3k.xyz</span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#c8ff3d",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#c8ff3d",
            }}
          />
          open to roles
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 164,
            fontWeight: 700,
            letterSpacing: -8,
            lineHeight: 1,
          }}
        >
          Abhishek
        </div>
        <div style={{ fontSize: 40, color: "#d9d3c7", marginTop: 24 }}>
          Full-stack engineer shipping AI & on-chain products.
        </div>
      </div>
      <div style={{ display: "flex", gap: 48, fontSize: 26, color: "#8b877e" }}>
        <span>4+ yrs</span>
        <span>15+ products</span>
        <span>10+ hackathon wins</span>
        <span style={{ color: "#c8ff3d" }}>@ Push Chain</span>
      </div>
    </div>,
    size
  )
}

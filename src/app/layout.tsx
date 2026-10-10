import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import "./globals.css"
import { Cursor } from "@/src/components/cursor"
import { Preloader } from "@/src/components/preloader"
import { ScrollProgress } from "@/src/components/scroll-progress"
import { SITE } from "@/src/config/constants"
import { cn } from "@/src/lib/utils"
import { Header } from "../components/layout"
import { SmoothScroll } from "../components/smooth-scroll"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
})

const siteIcon = "/Abhishek_logo.png"

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  applicationName: SITE.name,
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  keywords: [
    "Abhishek",
    "abhish3k",
    "full-stack engineer",
    "web3 developer",
    "AI engineer",
    "Push Chain",
    "portfolio",
    "Bangalore",
  ],
  icons: { icon: siteIcon, shortcut: siteIcon, apple: siteIcon },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@abhish_3k",
    title: SITE.title,
    description: SITE.description,
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.role,
  worksFor: { "@type": "Organization", name: SITE.company },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  sameAs: SITE.socials.map((s) => s.href),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        fontMono.variable,
        fontSerif.variable
      )}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Preloader />
        <ScrollProgress />
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  )
}

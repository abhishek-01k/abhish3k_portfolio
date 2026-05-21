import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/src/lib/utils";
import { Header } from "../components/layout";
import { SmoothScroll } from "../components/smooth-scroll";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteLogo = "/Abhishek_logo.png"
const siteIcon = "/Abhishek_logo.png"

export const metadata: Metadata = {
  title: "Abhishek",
  applicationName: "Abhishek",
  description: "Abhishek",
  icons: {
    icon: siteIcon,
    shortcut: siteIcon,
    apple: siteIcon,
  },
  openGraph: {
    title: "Abhishek",
    description: "Abhishek",
    images: [siteLogo],
  },
  twitter: {
    card: "summary",
    title: "Abhishek",
    description: "Abhishek",
    images: [siteLogo],
  },
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
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}

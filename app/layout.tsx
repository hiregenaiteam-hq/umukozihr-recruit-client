import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { OnboardingProvider } from "@/components/OnboardingProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UmukoziHR - AI-First Hiring Platform",
  description:
    "Hiring shouldn't feel like guesswork. Describe what you need. Our AI finds the top 1% talent in minutes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OnboardingProvider>
          {children}
        </OnboardingProvider>
        <Toaster />
      </body>
    </html>
  )
}

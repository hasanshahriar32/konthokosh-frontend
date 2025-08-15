import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_Bengali, Alex_Brush as Kalpurush, Baloo_Da_2, Tiro_Bangla } from "next/font/google"
import "./globals.css"

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  display: "swap",
  variable: "--font-bengali",
})

const kalpurush = Kalpurush({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kalpurush",
  weight: ["400"],
})

const balooDa2 = Baloo_Da_2({
  subsets: ["bengali"],
  display: "swap",
  variable: "--font-baloo-da-2",
  weight: ["400", "500", "600", "700"],
})

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  display: "swap",
  variable: "--font-tiro-bangla",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "বাংলা সংস্কৃতি | Bengali Culture",
  description: "Celebrating the rich heritage and culture of Bengal",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="bn"
      className={`${notoSansBengali.variable} ${kalpurush.variable} ${balooDa2.variable} ${tiroBangla.variable}`}
    >
      <body className="font-bengali antialiased">{children}</body>
    </html>
  )
}

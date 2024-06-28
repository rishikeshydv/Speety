import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scail: Property, Investment, and More',
  description: 'Where Real Estate Flourish',
  manifest:"/manifest.json",
  icons:{
    icon:"/scail.ico",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
        <head>
        <link rel="icon" href="/scail.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

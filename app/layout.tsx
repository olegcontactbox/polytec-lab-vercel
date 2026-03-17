// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────
// ROOT LAYOUT — wraps every page on the site.
//
// Key Next.js concepts here:
//  • next/font/google  — fonts are loaded at build time, zero CLS, self-hosted
//  • Metadata API      — `export const metadata` sets <title> and <meta> tags
//  • Template string   — '%s | PolytecLab' means child pages can just set %s
//  • Server Component  — layout.tsx is a Server Component by default (no 'use client')
// ─────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import { Syne, IBM_Plex_Mono, Crimson_Pro } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// next/font automatically downloads & self-hosts the font — no external request at runtime
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
})

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

const crimson = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
})

// Static metadata for the root. Individual pages can override parts of this.
export const metadata: Metadata = {
  title: {
    template: '%s — PolytecLab',
    default: 'PolytecLab',
  },
  description: 'Handcrafted audio tools with analog soul. Independent music software by one person.',
  openGraph: {
    siteName: 'PolytecLab',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // CSS custom property vars injected here so every page can access them
      className={`${syne.variable} ${ibmMono.variable} ${crimson.variable}`}
    >
      <body className="bg-[#0c0a09] text-amber-50 min-h-screen flex flex-col antialiased">
        <Nav />
        {/* flex-1 pushes Footer to the bottom even on short pages */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

// components/Footer.tsx
// Server Component — no interactivity needed, no 'use client'

import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-800 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs tracking-widest uppercase text-stone-600">
          © {year} PolytecLab — music production tools
        </span>

        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="font-mono text-xs tracking-widest uppercase text-stone-600 hover:text-orange-500 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/#contact"
            className="font-mono text-xs tracking-widest uppercase text-stone-600 hover:text-orange-500 transition-colors"
          >
            Contact
          </Link>
          {/* Add GitHub or social links here */}
        </nav>
      </div>
    </footer>
  )
}

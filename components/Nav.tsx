'use client'
// components/Nav.tsx
// ─────────────────────────────────────────────────────────────────────────
// 'use client' makes this a Client Component — needed because we use
// useState for the mobile menu toggle. Everything else on the site can
// stay Server Components; interactivity is the only reason to go client.
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="border-b border-stone-800 sticky top-0 z-50 bg-[#0c0a09]/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-mono text-sm tracking-widest uppercase text-orange-500 hover:text-orange-400 transition-colors"
        >
          PolytecLab
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const isActive = href !== '/' && pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`font-mono text-xs tracking-widest uppercase transition-colors link-line ${
                  isActive
                    ? 'text-orange-500'
                    : 'text-stone-400 hover:text-amber-100'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block w-5 h-px bg-amber-100 transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-amber-100 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-amber-100 transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-800 bg-[#0c0a09]">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 font-mono text-xs tracking-widest uppercase text-stone-400 hover:text-orange-500 border-b border-stone-900 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

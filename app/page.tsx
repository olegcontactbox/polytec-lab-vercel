// app/page.tsx
// ─────────────────────────────────────────────────────────────────────────
// HOME PAGE — Server Component.
//
// Sections: Hero → Products teaser → About → Contact
// The contact form posts to /api/contact (our API Route).
// ─────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import Link from 'next/link'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import ContactForm from '@/components/ContactForm'

// Page-level metadata — overrides the template default title
export const metadata: Metadata = {
  title: 'PolytecLab',
  description:
    'Handcrafted audio tools with analog soul. Independent music software by one person.',
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative grain overflow-hidden border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-6 py-28 md:py-40">
          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none"
          />

          <p className="font-mono text-xs tracking-widest uppercase text-orange-500 mb-6">
            Music production tools
          </p>

          <h1 className="font-display text-4xl md:text-7xl sm:text-5xl font-extrabold leading-[0.95] tracking-tight text-amber-50 text-glow max-w-2xl">
            Analog-inspired
            <br />
            software
            <br />
            with a character
          </h1>

          <p className="mt-8 font-body text-lg md:text-xl text-stone-400 max-w-xl leading-relaxed italic">
            Digital instruments made to sound as good as analog gear.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-stone-950 font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors"
            >
              See the products
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/#about"
              className="font-mono text-xs tracking-widest uppercase text-stone-500 hover:text-amber-100 transition-colors link-line"
            >
              About
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS TEASER ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-amber-50">
            Current releases
          </h2>
          <Link
            href="/products"
            className="font-mono text-xs tracking-widest uppercase text-stone-500 hover:text-orange-500 transition-colors link-line"
          >
            All products →
          </Link>
        </div>

        {/* Grid — single item for now, but ready for more */}
        <div className="gap-px bg-stone-800">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="border-t border-stone-800 scroll-mt-14"
      >
        <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-orange-500 mb-2">
              About
            </p>
            <h2 className="font-display text-3xl font-bold text-amber-50">
              PolytecLab
            </h2>
          </div>

          <div className="font-body text-stone-400 text-lg leading-relaxed space-y-4">
            <p>
              PolytecLab is a one-person operation. I build audio tools because
              I use them, and because the ones I want don&apos;t always exist yet.
            </p>
            <p>
              Focus is on instruments and effects that have a character to them — not just clean and transparent, but with a bit of grit, warmth, or unpredictability.
              Also on making them as intuitive and fun to use as possible.
              So less menus, more knobs and sliders — the controls are designed to be meaningful and impactful, not just a checkbox on a list of features.
              {/* Most of what I make is analog-inspired — not as a nostalgia trip, */}
              {/* but because that era of hardware had a directness to it. Fewer */}
              {/* menus. More decisions per square inch. The software I build tries */}
              {/* to carry that forward. */}
            </p>
            <p>
              The goal is to be helpful to like-minded enthusiasts. If something is
              useful to you, that&apos;s the point.
            </p>
            {/* <p>
              Everything here is free unless stated otherwise. If something is
              useful to you, that&apos;s the point.
            </p> */}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="border-t border-stone-800 scroll-mt-14"
      >
        <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-orange-500 mb-2">
              Contact
            </p>
            <h2 className="font-display text-3xl font-bold text-amber-50">
              Get in touch
            </h2>
            <p className="font-body text-stone-500 text-sm mt-4 leading-relaxed">
              Bug reports, feedback, or just want to say something worked — I
              read everything.
            </p>
            <a href="mailto:olegcontactbox@gmail.com" className="font-body text-orange-500 text-md hover:underline mt-2 inline-block" >olegcontactbox@gmail.com</a>
          </div>

          {/* Commented out for a simplier implementation */}
          {/* <ContactForm /> */}
        </div>
      </section>
    </>
  )
}

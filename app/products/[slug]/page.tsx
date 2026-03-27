// app/products/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────
// DYNAMIC ROUTE — [slug] matches any URL segment after /products/
//
// Key Next.js concepts packed in here:
//
//  1. generateStaticParams()
//     Tells Next.js which slugs exist at BUILD TIME so it can pre-render
//     those pages as static HTML (SSG). If you hit a slug not in this list,
//     Next.js returns a 404 (because we set dynamicParams = false below).
//
//  2. generateMetadata()
//     Async function that receives the same params as the page component.
//     Returns per-page <title> and <meta> tags. Runs on the server.
//
//  3. notFound()
//     Triggers the nearest not-found.tsx (or Next's default 404 page).
//
//  4. Server Component + Client Component split
//     This page is a Server Component. AudioPlayer is 'use client'.
//
//  ⚠️  Next.js 15 change: params is now a Promise.
//      Both the page component and generateMetadata must await it.
//      In Next.js 14 params was a plain synchronous object.
// ─────────────────────────────────────────────────────────────────────────

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllProductSlugs, getProductBySlug } from '@/data/products'
import AudioPlayer from '@/components/AudioPlayer'

// ── 1. generateStaticParams ───────────────────────────────────────────────
export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }))
}

// Reject any slug not returned by generateStaticParams → 404
export const dynamicParams = false

// ── 2. generateMetadata ───────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>   // Next.js 15: params is a Promise
}): Promise<Metadata> {
  const { slug } = await params        // must await before use
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Not found' }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: 'website',
    },
  }
}

// ── Page component ────────────────────────────────────────────────────────
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>   // Next.js 15: params is a Promise
}) {
  const { slug } = await params        // must await before use
  const product = getProductBySlug(slug)

  if (!product) notFound()

  return (
    <article className="max-w-5xl mx-auto px-6 py-16">

      {/* Header */}
      <header className="mb-16 max-w-2xl">
        <div className="flex items-center gap-4 mb-4">
          {product.format.map((fmt) => (
            <span key={fmt} className="font-mono text-xs px-2 py-0.5 border border-stone-700 text-stone-500">
              {fmt}
            </span>
          ))}
          {product.free && (
            <span className="font-mono text-xs px-2 py-0.5 border border-orange-500/30 text-orange-400 bg-orange-500/5">
              FREE
            </span>
          )}
          <span className="font-mono text-xs text-stone-600">v{product.version}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-50 leading-none tracking-tight mb-4">
          {product.name}
        </h1>

        <p className="font-body text-xl italic text-orange-400/80">
          {product.tagline}
        </p>
      </header>

      {/* Two-column layout: main content + sidebar */}
      <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">

        {/* ── LEFT: Main content ─────────────────────────────────────── */}
        <div className="space-y-14 max-w-100" >

          {/* Image gallery placeholder */}
          <div className="space-y-3">
            <div className="aspect-video bg-stone-900 border border-stone-800 flex items-center justify-center">
              <p className="font-mono text-xs text-stone-600">
                <img src={product.images[0]} alt="Screenshot of the plugin interface" className="max-h-full" />
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {product.images.slice(1).map((n) => (
                <div key={n} className="aspect-video bg-stone-900 border border-stone-800 flex items-center justify-center">
                  <img src={n} alt={`Screenshot of the plugin interface #${n}`} className="max-h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Long description */}
          <div>
            <h2 className="font-display text-2xl font-bold text-amber-100 mb-4">
              About
            </h2>
            <div className="font-body text-stone-400 text-lg leading-relaxed space-y-4">
              {product.longDescription.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="font-display text-2xl font-bold text-amber-100 mb-4">
              Features
            </h2>
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 font-body text-stone-400">
                  <span className="text-orange-500 mt-1.5 shrink-0">—</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Audio demos — Client Component */}
          <div>
            <h2 className="font-display text-2xl font-bold text-amber-100 mb-4">
              Audio demos
            </h2>
            {/* Data fetched on server, passed as plain props to the client component */}
            <AudioPlayer demos={product.audioDemos} />
          </div>

        </div>

        {/* ── RIGHT: Sidebar ─────────────────────────────────────────── */}
        <aside className="space-y-8 md:sticky md:top-20 max-w-100">

          {/* Download CTA */}
          <div className="border border-stone-800 p-6 space-y-4">
            <div>
              <p className="font-display text-xl font-bold text-amber-50">
                {product.free ? 'Free download' : 'Get it'}
              </p>
              <p className="font-mono text-xs text-stone-600 mt-1">
                v{product.version} · {product.releaseDate}
              </p>
            </div>

            <a
              href={product.downloadUrl}
              data-umami-event="download"
              data-umami-event-slug={slug}
              className="block w-full text-center bg-orange-500 hover:bg-orange-400 text-stone-950 font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors"
            >
              Download
            </a>

            {/* Donation hook — uncomment and wire to Stripe/Ko-fi when ready */}
            {/* <p className="font-mono text-xs text-stone-600 text-center">
              or <a href="#" className="text-orange-500 hover:text-orange-400">leave a tip</a>
            </p> */}
          </div>

          {/* System requirements */}
          <div className="border border-stone-800 p-6">
            <h3 className="font-mono text-xs tracking-widest uppercase text-stone-500 mb-4">
              Requirements
            </h3>
            <ul className="space-y-2">
              {product.requirements.map((req) => (
                <li key={req} className="font-body text-stone-500 text-sm leading-snug">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* OS chips */}
          <div className="border border-stone-800 p-6">
            <h3 className="font-mono text-xs tracking-widest uppercase text-stone-500 mb-4">
              Platform
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.os.map((os) => (
                <span
                  key={os}
                  className="font-mono text-xs px-2 py-1 border border-stone-700 text-stone-400"
                >
                  {os}
                </span>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </article>
  )
}

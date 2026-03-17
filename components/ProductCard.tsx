// components/ProductCard.tsx
// Server Component — just renders data, no interactivity.

import Link from 'next/link'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block border border-stone-800 hover:border-orange-500/50 transition-colors duration-300 bg-stone-900/30 hover:bg-stone-900/60"
    >
      {/* Image placeholder — swap with next/image when you have real assets */}
      <div className="aspect-video bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder visual until real screenshots exist */}
          <div className="w-24 h-24 border border-stone-700 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-stone-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
              <path
                d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        {/* Format badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.format.map((fmt) => (
            <span
              key={fmt}
              className="font-mono text-xs px-2 py-0.5 bg-stone-950/80 border border-stone-700 text-stone-400"
            >
              {fmt}
            </span>
          ))}
        </div>
        {product.free && (
          <div className="absolute top-3 right-3">
            <span className="font-mono text-xs px-2 py-0.5 bg-orange-500/10 border border-orange-500/30 text-orange-400">
              FREE
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-amber-50 group-hover:text-orange-400 transition-colors">
          {product.name}
        </h3>
        <p className="font-mono text-xs text-orange-500/70 mt-1 mb-3 tracking-wide">
          v{product.version}
        </p>
        <p className="font-body text-stone-400 text-sm leading-relaxed">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-center gap-2 font-mono text-xs text-stone-500 group-hover:text-orange-500 transition-colors">
          <span>View details</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  )
}

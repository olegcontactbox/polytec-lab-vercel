// app/products/page.tsx
// Server Component — reads data and renders. No client JS needed.

import type { Metadata } from 'next'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Products',
  description: 'All audio tools from PolytecLab.',
}

export default function ProductsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl font-extrabold text-amber-50 mb-4">
        All releases
      </h1>
      <p className="font-body text-stone-400 text-lg italic mb-12 max-w-xl">
        {products.length === 1
          ? "One product so far. More when they're ready."
          : `${products.length} tools. More when they're ready.`}
      </p>

      <div className="gap-px bg-stone-800">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}

// app/products/layout.tsx
// ─────────────────────────────────────────────────────────────────────────
// NESTED LAYOUT — wraps /products and /products/[slug].
//
// This is one of the key App Router patterns: you can have multiple
// layouts stacked. Root layout (nav + footer) + this products layout.
//
// Use a nested layout when a section of the site needs:
//  • Shared UI (breadcrumb, sidebar, section header)
//  • Shared data fetching that applies to all child routes
//  • Slightly different chrome than the root
// ─────────────────────────────────────────────────────────────────────────

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Section header — visible on all /products/* routes */}
      <div className="border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className="font-mono text-xs tracking-widest uppercase text-orange-500">
            Products
          </p>
        </div>
      </div>

      {/* Child route renders here */}
      {children}
    </div>
  )
}

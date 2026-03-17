// app/products/[slug]/loading.tsx
// ─────────────────────────────────────────────────────────────────────────
// LOADING UI — Next.js automatically shows this file while the page is
// loading (React Suspense under the hood). No props, no setup needed.
//
// It wraps the page content at the same route level, so root layout
// and the products layout are still visible — only the page area streams in.
// ─────────────────────────────────────────────────────────────────────────

export default function ProductLoading() {
  const shimmer = 'bg-stone-800 animate-pulse rounded-sm'

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header skeleton */}
      <div className="mb-16 max-w-2xl space-y-4">
        <div className={`${shimmer} h-5 w-32`} />
        <div className={`${shimmer} h-14 w-3/4`} />
        <div className={`${shimmer} h-5 w-48`} />
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-12">
        {/* Main */}
        <div className="space-y-6">
          <div className={`${shimmer} aspect-video w-full`} />
          <div className="grid grid-cols-2 gap-3">
            <div className={`${shimmer} aspect-video`} />
            <div className={`${shimmer} aspect-video`} />
          </div>
          <div className="space-y-3 pt-4">
            <div className={`${shimmer} h-4 w-full`} />
            <div className={`${shimmer} h-4 w-5/6`} />
            <div className={`${shimmer} h-4 w-4/6`} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className={`${shimmer} h-36 w-full`} />
          <div className={`${shimmer} h-48 w-full`} />
        </div>
      </div>
    </div>
  )
}

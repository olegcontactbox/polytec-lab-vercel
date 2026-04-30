'use client'
// components/SubscribeButton.tsx
// Clickable text that opens a modal — user enters email, POSTs to /api/subscribe

import { useState, useRef, useEffect } from 'react'

type Status = 'idle' | 'sending' | 'done' | 'error' | 'duplicate'

export default function SubscribeButton() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when modal opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const close = () => {
    setOpen(false)
    setEmail('')
    setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.status === 409) { setStatus('duplicate'); return }
      if (!res.ok) { setStatus('error'); return }

      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Trigger — plain text link */}
      <button
        onClick={() => setOpen(true)}
        className="w-full text-center font-mono text-xs text-stone-600 hover:text-orange-500 transition-colors"
      >
        notify me about new releases
      </button>

      {/* Modal backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <div className="w-full max-w-sm bg-[#0c0a09] border border-stone-800 p-8 space-y-6">

            {status === 'done' ? (
              <div className="text-center space-y-2">
                <p className="font-mono text-xs tracking-widest uppercase text-orange-500">
                  You&apos;re in
                </p>
                <p className="font-body text-stone-400">
                  I&apos;ll reach out when something new drops.
                </p>
                <button
                  onClick={close}
                  className="mt-4 font-mono text-xs tracking-widest uppercase text-stone-600 hover:text-orange-500 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-orange-500 mb-1">
                    Stay in the loop
                  </p>
                  <h2 className="font-display text-xl font-bold text-amber-50">
                    New releases, nothing else.
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    ref={inputRef}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-stone-900/50 border border-stone-800 focus:border-orange-500/50 outline-none px-4 py-3 font-mono text-sm text-amber-100 placeholder:text-stone-600 transition-colors"
                  />

                  {status === 'duplicate' && (
                    <p className="font-mono text-xs text-stone-500">
                      Already subscribed.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="font-mono text-xs text-red-400">
                      Something went wrong — try again.
                    </p>
                  )}

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="bg-orange-500 hover:bg-orange-400 disabled:bg-stone-700 disabled:cursor-wait text-stone-950 font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors"
                    >
                      {status === 'sending' ? 'Saving…' : 'Subscribe'}
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="font-mono text-xs tracking-widest uppercase text-stone-600 hover:text-amber-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

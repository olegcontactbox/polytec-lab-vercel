'use client'
// components/ContactForm.tsx
// Client Component — manages form state and posts to /api/contact

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-stone-900/50 border border-stone-800 focus:border-orange-500/50 outline-none px-4 py-3 font-body text-amber-100 placeholder:text-stone-600 transition-colors text-sm'

  if (status === 'sent') {
    return (
      <div className="border border-stone-800 p-8 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-orange-500 mb-2">
          Message sent
        </p>
        <p className="font-body text-stone-400">
          Got it — I&apos;ll get back to you.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 font-mono text-xs tracking-widest uppercase text-stone-600 hover:text-orange-500 transition-colors link-line"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs tracking-widest uppercase text-stone-600 mb-2">
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-widest uppercase text-stone-600 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs tracking-widest uppercase text-stone-600 mb-2">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Bug report, feature idea, or anything else…"
        />
      </div>

      {status === 'error' && (
        <p className="font-mono text-xs text-red-400">
          Something went wrong. Try again or email directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 disabled:bg-stone-700 disabled:cursor-not-allowed text-stone-950 font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

// app/api/subscribe/route.ts
// ─────────────────────────────────────────────────────────────────────────
// POST /api/subscribe  — adds an email to the subscriber list in Vercel KV
// GET  /api/subscribe  — returns the full list (for your eyes only)
//
// Emails are stored as a KV set under the key "subscribers".
// A set automatically deduplicates — same email twice is a no-op.
//
// Check your list any time:
//   GET https://yoursite.com/api/subscribe
//   → { "subscribers": ["a@b.com", "c@d.com"], "count": 2 }
//
// Setup: Vercel project → Storage → Create KV Database
// Vercel injects KV_REST_API_URL and KV_REST_API_TOKEN automatically.
// For local dev: vercel env pull .env.local
// ─────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'

const KV_URL = process.env.KV_REST_API_URL!
const KV_TOKEN = process.env.KV_REST_API_TOKEN!

async function kvFetch(command: string[]): Promise<unknown> {
  const res = await fetch(`${KV_URL}/${command.join('/')}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`KV error: ${res.status}`)
  const json = await res.json() as { result: unknown }
  return json.result
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// POST — subscribe
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json() as { email: string }

    if (!email?.trim() || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    const normalised = email.toLowerCase().trim()

    // SADD adds to a set — returns 1 if added, 0 if already existed
    const added = await kvFetch(['SADD', 'subscribers', normalised])

    if (added === 0) {
      return NextResponse.json({ error: 'Already subscribed.' }, { status: 409 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[subscribe error]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

// GET — read the list
// export async function GET() {
//   try {
//     // SMEMBERS returns all members of the set
//     const subscribers = await kvFetch(['SMEMBERS', 'subscribers'])
//     const list = Array.isArray(subscribers) ? subscribers as string[] : []

//     return NextResponse.json({
//       count: list.length,
//       subscribers: list.sort(),
//     })
//   } catch (err) {
//     console.error('[subscribe list error]', err)
//     return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
//   }
// }

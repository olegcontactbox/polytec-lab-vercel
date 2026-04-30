// app/api/contact/route.ts
// ─────────────────────────────────────────────────────────────────────────
// API ROUTE — Next.js App Router style.
//
// Named exports correspond to HTTP methods: GET, POST, PUT, DELETE, etc.
// This file lives in the app directory but is never a page — it only
// handles HTTP requests and returns Response objects.
//
// CONTACT FORM IS NOT WIRED UP !!!
// To wire this up for real, replace the console.log with:
//  • Resend / Nodemailer  — send yourself an email
//  • A database insert    — store messages in Postgres / Supabase
//  • Slack webhook        — get a Slack DM on new submissions
// ─────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  email: string
  message: string
}

// Minimal validation helper
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json()
    const { name, email, message } = body

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // ── Replace this with real delivery logic ──────────────────────────
    console.log('[Contact form submission]', { name, email, message })
    // ──────────────────────────────────────────────────────────────────

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

// Reject non-POST methods gracefully
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}

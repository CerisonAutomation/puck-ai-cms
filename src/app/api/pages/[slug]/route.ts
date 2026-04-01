import { NextRequest, NextResponse } from 'next/server'
import { getPage, savePage, registerSlug } from '@/lib/storage'
import type { Data } from '@measured/puck'

type Context = { params: Promise<{ slug: string }> }

/**
 * @route GET /api/pages/[slug]
 * Returns the saved Puck page data for a slug.
 */
export async function GET(_req: NextRequest, { params }: Context) {
  const { slug } = await params
  const data = await getPage(slug)
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data }, { status: 200 })
}

/**
 * @route POST /api/pages/[slug]
 * Saves Puck page data for a slug.
 * Body: { data: Data }
 */
export async function POST(req: NextRequest, { params }: Context) {
  try {
    const { slug } = await params
    const body = await req.json()
    const { data } = body as { data: Data }
    if (!data) return NextResponse.json({ error: 'Missing data field' }, { status: 400 })
    await savePage(slug, data)
    await registerSlug(slug)
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[/api/pages] POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

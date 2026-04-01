import { NextRequest, NextResponse } from 'next/server'
import { getPage, savePage } from '@/lib/storage'
import type { Data } from '@puckeditor/core'

type Ctx = { params: Promise<{ slug: string }> }

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params
  const data = await getPage(slug)
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { slug } = await params
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  await savePage(slug, body as Data)
  return NextResponse.json({ ok: true })
}

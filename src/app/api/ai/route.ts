import { NextRequest, NextResponse } from 'next/server'
import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from 'zod'

/**
 * @route POST /api/ai
 * @description Uses Gemini to generate a Puck page layout from a text prompt.
 *
 * Requires env var: GOOGLE_GENERATIVE_AI_API_KEY
 * Body: { prompt: string; slug?: string }
 * Returns: { content: PuckContent[] }
 */

const BlockSchema = z.object({
  type: z.enum(['Hero', 'Text', 'Image', 'Card', 'Columns', 'Spacer', 'Divider', 'CallToAction']),
  props: z.record(z.unknown()),
})

const PageSchema = z.object({
  blocks: z.array(BlockSchema).min(1).max(12),
})

export async function POST(req: NextRequest) {
  try {
    const { prompt, slug: _slug } = (await req.json()) as { prompt: string; slug?: string }

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 3) {
      return NextResponse.json({ error: 'Prompt is too short' }, { status: 400 })
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json({ error: 'AI not configured — set GOOGLE_GENERATIVE_AI_API_KEY' }, { status: 503 })
    }

    const { object } = await generateObject({
      model: google('gemini-2.0-flash'),
      schema: PageSchema,
      prompt: [
        'You are a CMS page builder AI.',
        'Given the user prompt below, output a JSON page layout using only these block types:',
        'Hero, Text, Image, Card, Columns, Spacer, Divider, CallToAction.',
        'Each block must have a "type" and a "props" object matching the component fields.',
        'Keep props realistic, readable, and on-brand.',
        `User prompt: ${prompt.trim()}`,
      ].join('\n'),
    })

    // Attach stable IDs
    const content = object.blocks.map((block, i) => ({
      type: block.type,
      props: { id: `ai-${block.type.toLowerCase()}-${i}`, ...block.props },
    }))

    return NextResponse.json({ content }, { status: 200 })
  } catch (err) {
    console.error('[/api/ai] error:', err)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import { z } from 'zod'

const schema = z.object({
  prompt: z.string().min(1).max(500),
})

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { prompt } = parsed.data

  try {
    const { text } = await generateText({
      model: google('gemini-2.0-flash'),
      system: `You are a Puck CMS block generator. Given a user prompt, return a valid Puck Data JSON object with content blocks using only these component types: Hero, Text, Image, Card, Columns. Return only the raw JSON, no markdown fences.`,
      prompt,
    })

    const data = JSON.parse(text)
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Generation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * Simple in-memory + filesystem storage for page data.
 * In production swap this for your Payload CMS / Supabase adapter.
 */
import type { Data } from '@puckeditor/core'

// In-memory cache (survives hot reloads in dev via module cache)
const cache = new Map<string, Data>()

export async function getPage(slug: string): Promise<Data | null> {
  return cache.get(slug) ?? null
}

export async function savePage(slug: string, data: Data): Promise<void> {
  cache.set(slug, data)
}

/**
 * @file storage.ts
 * @description Vercel KV-backed page storage for Puck CMS.
 *
 * Requires env vars (set in Vercel dashboard → Storage → KV):
 *   KV_REST_API_URL
 *   KV_REST_API_TOKEN
 *
 * Falls back to in-memory cache when KV env vars are not set (local dev).
 */
import type { Data } from '@measured/puck'

// ─── Vercel KV lazy import ─────────────────────────────────────────────────
const isKvAvailable =
  typeof process.env.KV_REST_API_URL === 'string' &&
  typeof process.env.KV_REST_API_TOKEN === 'string'

type KvClient = { get: (key: string) => Promise<unknown>; set: (key: string, value: unknown) => Promise<unknown> }

async function getKv(): Promise<KvClient | null> {
  if (!isKvAvailable) return null
  const { kv } = await import('@vercel/kv')
  return kv as unknown as KvClient
}

// ─── Local fallback ────────────────────────────────────────────────────────
const localCache = new Map<string, Data>()

// ─── Key helper ───────────────────────────────────────────────────────────
const toKey = (slug: string) =>
  `puck:page:${slug.replace(/[^a-zA-Z0-9_\-\/]/g, '').slice(0, 200)}`

// ─── Public API ───────────────────────────────────────────────────────────

/**
 * Load a Puck page by slug.
 * Returns null when not found.
 */
export async function getPage(slug: string): Promise<Data | null> {
  const kv = await getKv()
  if (kv) {
    const raw = await kv.get(toKey(slug))
    return (raw as Data | null) ?? null
  }
  return localCache.get(slug) ?? null
}

/**
 * Persist a Puck page by slug.
 */
export async function savePage(slug: string, data: Data): Promise<void> {
  const kv = await getKv()
  if (kv) {
    await kv.set(toKey(slug), data)
    return
  }
  localCache.set(slug, data)
}

/**
 * List all saved page slugs (KV only; returns empty array in local dev).
 */
export async function listPages(): Promise<string[]> {
  const kv = await getKv()
  if (!kv) return Array.from(localCache.keys())
  // Vercel KV does not support KEYS natively — we maintain a slugs index.
  const { kv: rawKv } = await import('@vercel/kv')
  const slugs = await (rawKv as { smembers: (k: string) => Promise<string[]> }).smembers('puck:pages:index')
  return slugs ?? []
}

/**
 * Register a slug in the pages index (call after savePage).
 */
export async function registerSlug(slug: string): Promise<void> {
  if (!isKvAvailable) return
  const { kv: rawKv } = await import('@vercel/kv')
  await (rawKv as { sadd: (k: string, ...v: string[]) => Promise<unknown> }).sadd('puck:pages:index', slug)
}

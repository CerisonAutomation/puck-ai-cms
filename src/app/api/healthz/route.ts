import { NextResponse } from 'next/server'

/**
 * @route GET /api/healthz
 * @description Health check endpoint for Vercel uptime monitoring.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      ts: new Date().toISOString(),
      env: process.env.NODE_ENV ?? 'unknown',
      sha: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local',
      kv: typeof process.env.KV_REST_API_URL === 'string' ? 'connected' : 'local-fallback',
    },
    { status: 200 }
  )
}

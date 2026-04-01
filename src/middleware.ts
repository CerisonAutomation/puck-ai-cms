import { NextRequest, NextResponse } from 'next/server'

/**
 * @file middleware.ts
 * @description Edge middleware.
 * - Adds no-store + noindex to /editor/* routes.
 * - TODO: Add session/JWT check before /editor/* for production auth.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const res = NextResponse.next()

  if (pathname.startsWith('/editor')) {
    res.headers.set('Cache-Control', 'no-store, must-revalidate')
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return res
}

export const config = {
  matcher: ['/editor/:path*', '/api/pages/:path*'],
}

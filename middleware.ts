import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rewrite /{path}/edit → /puck/{path} (editor)
  if (req.method === 'GET' && pathname.endsWith('/edit')) {
    const withoutEdit = pathname.slice(0, -5) || '/';
    return NextResponse.rewrite(new URL(`/puck${withoutEdit}`, req.url));
  }

  // Block direct access to /puck/* — must use /edit suffix
  if (req.method === 'GET' && pathname.startsWith('/puck')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api|.*\..*).*)'],
};

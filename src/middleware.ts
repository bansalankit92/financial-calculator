import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add caching headers for static assets and pages
  const { pathname } = request.nextUrl

  // Cache static assets aggressively
  if (
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/static/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
    return response
  }

  // Cache pages with ISR-like behavior
  // Allow CDN to cache for 1 hour, serve stale while revalidating for 24 hours
  if (!pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    )
  }

  return response
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and API routes that need dynamic behavior
    '/((?!_next/image|_next/webpack-hmr|favicon.ico).*)',
  ],
}

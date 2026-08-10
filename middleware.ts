import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In-memory rate limit store (resets on server restart)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMITS = {
  '/api/chat': { limit: 20, window: 60 * 1000 }, // 20 requests per minute
  '/api/halal-scan': { limit: 10, window: 60 * 1000 }, // 10 per minute
  '/api/interview-questions': { limit: 10, window: 60 * 1000 },
  '/api/interview-feedback': { limit: 10, window: 60 * 1000 },
  '/api/generate-letter': { limit: 5, window: 60 * 1000 },
  '/api/ssw-questions': { limit: 10, window: 60 * 1000 },
  '/api/visa-document-check': { limit: 10, window: 60 * 1000 },
  '/api/bulk-inquiry': { limit: 3, window: 60 * 1000 },
  '/api/checkout': { limit: 5, window: 60 * 1000 },
}

function getIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return ip
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // API ルートのみ Rate Limit を適用
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Rate Limit 設定を取得
  const limitConfig = RATE_LIMITS[pathname as keyof typeof RATE_LIMITS]
  if (!limitConfig) {
    return NextResponse.next()
  }

  const ip = getIP(request)
  const key = `${ip}:${pathname}`
  const now = Date.now()

  // 既存のレコードを取得
  const record = rateLimit.get(key)

  if (!record || now > record.resetTime) {
    // 新しいウィンドウを開始
    rateLimit.set(key, { count: 1, resetTime: now + limitConfig.window })
    return NextResponse.next()
  }

  if (record.count >= limitConfig.limit) {
    // Rate Limit 超過
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((record.resetTime - now) / 1000).toString(),
          'X-RateLimit-Limit': limitConfig.limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': record.resetTime.toString(),
        },
      }
    )
  }

  // カウントを増やす
  record.count++
  rateLimit.set(key, record)

  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', limitConfig.limit.toString())
  response.headers.set('X-RateLimit-Remaining', (limitConfig.limit - record.count).toString())
  return response
}

export const config = {
  matcher: '/api/:path*',
}
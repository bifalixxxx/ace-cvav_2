import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_IP = "87.254.228.168"

export function middleware(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.ip ||
    "0.0.0.0"

  if (ip === ADMIN_IP) {
    const res = NextResponse.next()
    res.headers.set("x-admin", "true")
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/:path*",
}

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/auth", "/_next", "/favicon.ico", "/assets", "/images", "/api/public"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // allow public assets and the auth page through
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const token = req.cookies.get("hg_token")?.value

  // Not logged in → force to /auth
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = "/auth"
   // url.searchParams.set("next", pathname) // optional: preserve intended destination
    return NextResponse.redirect(url)
  }

  // Already logged in and trying to access /auth → send to /search
  if (pathname === "/auth") {
    const url = req.nextUrl.clone()
    url.pathname = "/search"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Protect everything under / (except the exempted PUBLIC_PATHS checked above)
  matcher: ["/((?!_next|favicon.ico|assets|images|api/public).*)"],
}

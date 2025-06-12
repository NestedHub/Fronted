import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // If user is authenticated and on root path, redirect to /user
    if (token && pathname === "/") {
      return NextResponse.redirect(new URL("/user", req.url))
    }

    // If user is authenticated and trying to access login/register pages, redirect to /user
    if (
      token &&
      (pathname.startsWith("/login") ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/propertyowner/signin"))
    ) {
      return NextResponse.redirect(new URL("/user", req.url))
    }

    // If user is not authenticated and trying to access protected routes, redirect to login
    if (!token && pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/login/signin", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // Let middleware handle the logic
    },
  },
)

export const config = {
  matcher: ["/", "/user/:path*", "/login/:path*", "/register/:path*", "/propertyowner/signin"],
}

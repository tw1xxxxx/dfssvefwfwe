import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for the admin section
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for auth cookie
    const token = request.cookies.get("admin_token");

    if (!token || token.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

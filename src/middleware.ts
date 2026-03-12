import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

/**
 * Global middleware for basic RBAC on portal routes.
 *
 * It enforces that:
 * - `/user/**`   can only be accessed by role `"user"`.
 * - `/vendor/**` can only be accessed by role `"vendor"`.
 * - `/admin/**`  can only be accessed by role `"admin"`.
 *
 * If there is no valid token:
 * - Requests to `/user/**`   are redirected to `/user/login`.
 * - Requests to `/vendor/**` are redirected to `/vendor/login`.
 * - Requests to `/admin/**`  are redirected to `/admin/login`.
 *
 * If the user has a different role than required for the route, they are
 * redirected to their own portal dashboard (e.g. vendor → `/vendor/dashboard`).
 */
const ROUTE_PERMISSIONS: Record<string, string[]> = {
  "/user":   ["user", "vendor", "admin"],
  "/vendor": ["user", "vendor", "admin"],
  "/admin":  ["admin"],
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Block /admin/signup permanently
  if (pathname === "/admin/signup") {
    return NextResponse.redirect(
      new URL("/", request.url)
    )
  }

  // Determine which portal this route belongs to
  let requiredRoles: string[] | null = null

  if (pathname.startsWith("/admin")) {
    requiredRoles = ROUTE_PERMISSIONS["/admin"]
  } else if (pathname.startsWith("/vendor")) {
    requiredRoles = ROUTE_PERMISSIONS["/vendor"]
  } else if (pathname.startsWith("/user")) {
    requiredRoles = ROUTE_PERMISSIONS["/user"]
  }

  // If not a protected route, allow through
  if (!requiredRoles) {
    return NextResponse.next()
  }

  // Get and verify token from cookie
  const token = request.cookies.get("token")?.value

  if (!token) {
    // Robust check for auth pages to prevent redirect loops
    const isAuthPage = pathname.endsWith("/login") || pathname.endsWith("/signup") || 
                       pathname.includes("/login/") || pathname.includes("/signup/");
    
    if (isAuthPage) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

  try {
    const payload = await verifyToken(token)

    if (!payload || !payload.role) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      )
    }

    const userRole = payload.role as string

    // Check if user's role is allowed for this route
    if (!requiredRoles.includes(userRole)) {
      // Redirect to their own dashboard if wrong portal
      const fallback = userRole === "admin"
        ? "/admin/dashboard"
        : userRole === "vendor"
        ? "/vendor/dashboard"
        : "/user/dashboard"

      return NextResponse.redirect(
        new URL(fallback, request.url)
      )
    }

    // Prevent logged-in users from seeing the login/signup pages again
    const isAuthPage = pathname.endsWith("/login") || pathname.endsWith("/signup") || 
                       pathname.includes("/login/") || pathname.includes("/signup/");

    if (isAuthPage) {
      const fallback = userRole === "admin"
        ? "/admin/dashboard"
        : userRole === "vendor"
        ? "/vendor/dashboard"
        : "/user/dashboard"
      return NextResponse.redirect(new URL(fallback, request.url));
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }
}

export const config = {
  matcher: ["/user/:path*", "/vendor/:path*", "/admin/:path*"],
};
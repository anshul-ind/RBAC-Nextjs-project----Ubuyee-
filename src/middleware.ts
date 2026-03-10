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
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect the three role-based portal prefixes.
  const isUserRoute = pathname.startsWith("/user");
  const isVendorRoute = pathname.startsWith("/vendor");
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isUserRoute && !isVendorRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  const buildRedirect = (path: string) => {
    const url = new URL(path, request.url);
    return NextResponse.redirect(url);
  };

  // No token: send to role-specific login.
  if (!token) {
    if (isUserRoute) return buildRedirect("/user/login");
    if (isVendorRoute) return buildRedirect("/vendor/login");
    if (isAdminRoute) return buildRedirect("/admin/login");
    return buildRedirect("/login");
  }

  try {
    const payload = verifyToken(token);

    // Determine required role based on route prefix.
    const requiredRole = isUserRoute ? "user" : isVendorRoute ? "vendor" : "admin";

    if (payload.role !== requiredRole) {
      // Logged in but wrong role: send them to their own dashboard.
      if (payload.role === "user") {
        return buildRedirect("/user/dashboard");
      }
      if (payload.role === "vendor") {
        return buildRedirect("/vendor/dashboard");
      }
      if (payload.role === "admin") {
        return buildRedirect("/admin/dashboard");
      }
    }

    return NextResponse.next();
  } catch {
    // Invalid token: clear it client-side by redirecting to login.
    if (isUserRoute) return buildRedirect("/user/login");
    if (isVendorRoute) return buildRedirect("/vendor/login");
    if (isAdminRoute) return buildRedirect("/admin/login");
    return buildRedirect("/login");
  }
}

export const config = {
  matcher: ["/user/:path*", "/vendor/:path*", "/admin/:path*"],
};
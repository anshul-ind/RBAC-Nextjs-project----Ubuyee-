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
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect the three role-based portal prefixes.
  const isUserRoute = pathname.startsWith("/user");
  const isVendorRoute = pathname.startsWith("/vendor");
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isUserRoute && !isVendorRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  console.log(`[Middleware] Path: ${pathname}`);


  const token = request.cookies.get("token")?.value;

  const buildRedirect = (path: string) => {
    const url = new URL(path, request.url);
    return NextResponse.redirect(url);
  };

  // No token: send to role-specific login.
  if (!token) {
    console.log(`[Middleware] No token found for ${pathname}`);
    // Robust check for auth pages to prevent redirect loops
    const isAuthPage = pathname.endsWith("/login") || pathname.endsWith("/signup") || 
                       pathname.includes("/login/") || pathname.includes("/signup/");

    if (isAuthPage) {
      console.log(`[Middleware] Allowing unauthenticated access to auth page: ${pathname}`);
      return NextResponse.next();
    }

    if (isUserRoute) return buildRedirect("/user/login");
    if (isVendorRoute) return buildRedirect("/vendor/login");
    if (isAdminRoute) return buildRedirect("/admin/login");
    return buildRedirect("/login");
  }

  try {
    const payload = await verifyToken(token);
    console.log(`[Middleware] Token verified. Role: ${payload.role}`);

    // Determine required role based on route prefix.
    const requiredRole = isUserRoute ? "user" : isVendorRoute ? "vendor" : "admin";

    // If the user's role does not match what the portal requires...
    if (payload.role !== requiredRole) {
      // OVERRIDE: Admins can view all portals. If they are an admin, let them through.
      if (payload.role === "admin") {
        return NextResponse.next();
      }

      // Check if they are on an auth page (login/signup)
      // If so, let them see it so they can sign in with a different account/role if they want.
      const isAuthPage = pathname.endsWith("/login") || pathname.endsWith("/signup") || 
                         pathname.includes("/login/") || pathname.includes("/signup/");

      if (isAuthPage) {
        return NextResponse.next();
      }

      // Otherwise, they are logged in but have the wrong role.
      // Redirect them to their own portal dashboard.
      if (payload.role === "user") {
        return buildRedirect("/user/dashboard");
      }
      if (payload.role === "vendor") {
        return buildRedirect("/vendor/dashboard");
      }
    }

    // Prevent logged-in users from seeing the login/signup pages again
    const isAuthPage = pathname.endsWith("/login") || pathname.endsWith("/signup") || 
                       pathname.includes("/login/") || pathname.includes("/signup/");

    if (isAuthPage) {
      return buildRedirect(`/${payload.role}/dashboard`);
    }

    return NextResponse.next();
  } catch (error) {
    console.error(`[Middleware] Token verification failed for ${pathname}:`, error);
    const isAuthPage = pathname.endsWith("/login") || pathname.endsWith("/signup") || 
                       pathname.includes("/login/") || pathname.includes("/signup/");

    if (isAuthPage) {
      return NextResponse.next();
    }

    if (isUserRoute) return buildRedirect("/user/login");
    if (isVendorRoute) return buildRedirect("/vendor/login");
    if (isAdminRoute) return buildRedirect("/admin/login");
    return buildRedirect("/login");
  }
}

export const config = {
  matcher: ["/user/:path*", "/vendor/:path*", "/admin/:path*"],
};
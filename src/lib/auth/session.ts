/**
 * Server-side session cookie helpers (Next.js 15+ async cookies API).
 *
 * NOTE: These helpers are designed for use in Server Components and Server
 * Actions only — never import from a Client Component.
 *
 * The project's API routes set the "token" cookie directly on the
 * NextResponse object, so these helpers are used only when you need to
 * read/clear the session from a Server Component or Server Action.
 */
import { cookies } from "next/headers";

/** The name of the auth cookie set by the login/signup API routes. */
const SESSION_COOKIE = "token";

/**
 * Persist a JWT token as an httpOnly cookie.
 * @param token - The signed JWT string from generateToken()
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    // Only send over HTTPS in production to prevent MITM attacks
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // 7 days in seconds — matches the JWT expiry
    maxAge: 60 * 60 * 24 * 7,
  });
}

/**
 * Clear the auth cookie (used on logout from a Server Action).
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}

/**
 * Read the current JWT token from the cookie store.
 * Returns null if no session cookie is present.
 */
export async function getSessionCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

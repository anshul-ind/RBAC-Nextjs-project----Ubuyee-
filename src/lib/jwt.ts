/**
 * Backwards-compatible JWT helpers.
 *
 * Existing code imports from `@/lib/jwt`. Internally, we delegate to the
 * canonical implementation in `@/lib/auth/jwt` to keep logic centralized.
 */
import { signJwt, verifyJwt, type JwtRole, type JwtPayload } from "./auth/jwt";

export async function generateToken(userId: string, role: JwtRole) {
  const payload: JwtPayload = { sub: userId, role };
  return await signJwt(payload);
}

export async function verifyToken(token: string) {
  return await verifyJwt(token);
}
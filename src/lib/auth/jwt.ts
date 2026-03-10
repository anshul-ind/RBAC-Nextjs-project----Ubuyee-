/**
 * Canonical JWT utilities for the application.
 *
 * NOTE:
 * - New code should import from `@/lib/auth/jwt`.
 * - `@/lib/jwt` remains as a thin wrapper for backwards compatibility.
 */
import jwt from "jsonwebtoken";

export type JwtRole = "user" | "vendor" | "admin";

export type JwtPayload = {
  sub: string;
  role: JwtRole;
};

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable.");
}

/**
 * Sign a JWT with the given payload.
 */
export function signJwt(payload: JwtPayload, expiresIn: string = "7d") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify a JWT and return the strongly typed payload.
 * Throws `JsonWebTokenError` / `TokenExpiredError` on failure.
 */
export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

/**
 * Canonical JWT utilities for the application.
 *
 * NOTE:
 * - We use 'jose' instead of 'jsonwebtoken' because middleware runs in 
 *   the Edge Runtime, which does not support Node.js 'crypto' or 'stream'.
 * - Verification is now asynchronous.
 */
import * as jose from "jose";

export type JwtRole = "user" | "vendor" | "admin";

export type JwtPayload = {
  sub: string;
  role: JwtRole;
};

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_keep_it_safe";
const secretKey = new TextEncoder().encode(JWT_SECRET);

/**
 * Sign a JWT with the given payload.
 */
export async function signJwt(payload: JwtPayload, expiresIn: string = "7d") {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

/**
 * Verify a JWT and return the strongly typed payload.
 * Throws on failure.
 */
export async function verifyJwt(token: string): Promise<JwtPayload> {
  const { payload } = await jose.jwtVerify(token, secretKey);
  return payload as unknown as JwtPayload;
}

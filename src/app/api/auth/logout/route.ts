import { NextResponse } from "next/server";

/**
 * Logout endpoint.
 *
 * Clears the auth cookie and returns a simple success response.
 */
export async function POST() {
  const response = NextResponse.json({ ok: true, message: "Logged out" });

  response.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

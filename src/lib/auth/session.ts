import { cookies } from "next/headers";

const SESSION_COOKIE = "session";

export function setSessionCookie(token: string) {
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function clearSessionCookie() {
  cookies().set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}

export function getSessionCookie() {
  return cookies().get(SESSION_COOKIE)?.value ?? null;
}

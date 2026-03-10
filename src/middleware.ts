import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
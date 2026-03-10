import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/user.model";

/**
 * Returns the currently authenticated user based on the `token` cookie.
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ ok: false, user: null }, { status: 401 });
    }

    let payload;
    try {
      payload = verifyToken(token);
    } catch {
      return NextResponse.json({ ok: false, user: null }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findById(payload.sub).select("_id email role name");

    if (!user) {
      return NextResponse.json({ ok: false, user: null }, { status: 404 });
    }

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("me error:", error);
    return NextResponse.json(
      { ok: false, user: null, error: "Internal server error." },
      { status: 500 },
    );
  }
}

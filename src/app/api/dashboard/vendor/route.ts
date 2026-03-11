import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

/**
 * Vendor dashboard data.
 *
 * Requires a valid JWT for a user with role "vendor".
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    let payload;
    try {
      payload = await verifyToken(token);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid token" },
        { status: 401 },
      );
    }

    if (payload.role !== "vendor") {
      return NextResponse.json(
        { ok: false, error: "Forbidden" },
        { status: 403 },
      );
    }

    const data = {
      stats: {
        totalSales: 3400,
        activeProducts: 18,
      },
    };

    return NextResponse.json({ ok: true, role: "vendor", data }, { status: 200 });
  } catch (error) {
    console.error("vendor dashboard error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

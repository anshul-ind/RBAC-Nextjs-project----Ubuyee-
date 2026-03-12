import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { UserModel as User } from "@/lib/db/models/User";

/**
 * Returns the currently authenticated user based on the `token` cookie.
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token" },
        { status: 401 }
      );
    }

    let payload;
    try {
      payload = await verifyToken(token);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const user = await User.findById(payload.sub).select("-password").lean();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (user._id as any).toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("me error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

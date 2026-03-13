import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserModel as User } from "@/lib/db/models/User";
import { hashPassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/jwt";

/**
 * Generic signup endpoint that can create a user with a specific role.
 *
 * It is similar to /api/auth/register, but allows the client to pass an explicit role.
 * For security, only the allowed roles ("user" | "vendor" | "admin") are accepted.
 */
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { name, email, password, role } = body;

    // BLOCK: No one can sign up as admin via API
    if (role === "admin") {
      return NextResponse.json(
        {
          success: false,
          error: "Admin accounts cannot be created through public registration.",
        },
        { status: 403 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 },
      );
    }

    const allowedRoles = ["user", "vendor", "admin"] as const;
    const requestedRole = (role as (typeof allowedRoles)[number]) ?? "user";

    if (!allowedRoles.includes(requestedRole)) {
      return NextResponse.json(
        { error: "Invalid role." },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 },
      );
    }

    const passwordHash = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      passwordHash,
      role: requestedRole,
    });

    // Auto-login after signup
    const token = await generateToken(newUser._id.toString(), newUser.role);
    
    const response = NextResponse.json(
      {
        message: "User signed up successfully.",
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      },
      { status: 201 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("DEBUG SIGNUP ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error during signup." },
      { status: 500 }
    );
  }
}

import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserModel as User } from "@/lib/db/models/User";
import { comparePassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { email, password, role: requestedRole } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!existingUser.passwordHash) {
      return NextResponse.json(
        { error: "This account has no password set (old schema). Please register again." },
        { status: 400 }
      );
    }

    const isMatch = await comparePassword(password, existingUser.passwordHash);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Role-Strict Enforcement: Check if the user is logging into the correct portal
    // EXCEPTION: Admins are allowed to log in via any portal
    if (requestedRole && existingUser.role !== requestedRole && existingUser.role !== "admin") {
      return NextResponse.json(
        { 
          error: `Access Denied: Your account is registered as a ${existingUser.role}. Please use the ${existingUser.role} login portal.` 
        },
        { status: 403 }
      );
    }

    const token = await generateToken(existingUser._id.toString(), existingUser.role);

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { id: existingUser._id, email: existingUser.email, role: existingUser.role },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (error) {
    console.error("DEBUG LOGIN ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error during login." },
      { status: 500 }
    );
  }
}
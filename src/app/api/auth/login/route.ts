import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserModel as User } from "@/lib/db/models/User";
import { comparePassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/jwt";

import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    console.log("LOGIN DB NAME:", mongoose.connection.name);

    const { email, password, portalOrigin } = await request.json();
    console.log("DEBUG LOGIN ATTEMPT:", { email, portalOrigin });

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
    console.log("DEBUG USER FOUND:", existingUser ? { email: existingUser.email, role: existingUser.role } : "NULL");

    if (!existingUser) {
      return NextResponse.json(
        { error: "Debug: User not found" },
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
        { error: "Debug: Password mismatch" },
        { status: 401 }
      );
    }

    // Portal Access Enforcement
    const userRole = existingUser.role;

    // RULE 1: User and Vendor roles CANNOT login from /admin/login
    if (portalOrigin === "admin" && userRole !== "admin") {
      return NextResponse.json(
        { 
          error: "Access denied. Admin credentials required." 
        },
        { status: 403 }
      );
    }

    const token = await generateToken(existingUser._id.toString(), existingUser.role);

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { 
          id: existingUser._id, 
          email: existingUser.email, 
          role: existingUser.role,
          name: existingUser.name 
        },
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
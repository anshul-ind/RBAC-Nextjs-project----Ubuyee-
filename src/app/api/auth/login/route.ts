import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { email, password } = await request.json();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken(existingUser._id.toString(), "user");

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: `login error: ${error}` },
      { status: 500 }
    );
  }
}
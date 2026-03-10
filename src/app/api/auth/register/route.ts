import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { hashPassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const { name, email, password } = await request.json();

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

        if (password.length < 6) {
          return NextResponse.json(
            { error: "Password must be at least 6 characters long." },
            { status: 400 }
          );
        }

       const existedUser = await User.findOne({ email });
       if (existedUser) {
           return  NextResponse.json(
             { error: "User already exists." },
             { status: 400 }
           );
       }

       const passwordHash = await hashPassword(password);

       const newUser = await User.create({
        name,
        email,
        passwordHash,
        role: "user",
       });

        // generate JWT token
    const token = generateToken(newUser._id.toString(), "user");

    const response = NextResponse.json(
      { message: "User registered", user: { id: newUser._id, email: newUser.email, role: newUser.role } },
      { status: 201 }
    );

    // set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

         
    



    } catch (error) {
          console.error("register error:", error);
          return NextResponse.json(
            { error: "Internal server error during registration." },
            { status: 500 }
        );
    }

}
import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import user from "../../../../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const { name, email, password } = await request.json();
        
        /*
        user validation through email and password
        **
        */
       const existedUser = await user.findOne({ email });
       if (existedUser) {
           return  NextResponse.json    
           ({ error: "User already exists" }, 
           {status: 400}
        )
             
       } 
        
       if (password.length < 6) {
        return NextResponse.json(
            { error: "Password must be at least 6 characters long" },
            { status: 400 }
        );
       } 
        
        
       const hashpassword = await bcrypt.hash(password , 10);

       const newUser = await user.create({
        name,email,password:hashpassword

       })

        // generate JWT token
    const token = generateToken(newUser._id.toString(), "user");

    const response = NextResponse.json(
      { message: "User registered", user: newUser },
      { status: 201 }
    );

    // set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

         
    



    } catch (error) {
          return NextResponse.json(
            { error: `register error: ${error} ` },
            { status: 500 }
        );
    }

}
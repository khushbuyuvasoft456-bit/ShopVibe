import { NextResponse } from "next/server";
import { findUserByEmail } from "@/utils/db";
import { signJwt } from "@/utils/jwt";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }
    
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }
    
    const { password: _, ...userWithoutPassword } = user;
    const token = signJwt({ email: user.email, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 });
    
    return NextResponse.json({
      success: true,
      message: "Logged in successfully!",
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred during login." },
      { status: 500 }
    );
  }
}

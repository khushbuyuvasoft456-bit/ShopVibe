import { NextResponse } from "next/server";
import { findUserByEmail } from "@/utils/db";

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email address is required." },
        { status: 400 }
      );
    }
    
    const user = findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email address." },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Password reset link sent to your email!"
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred during password reset request." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { findUserByEmail } from "@/utils/db";
import { verifyJwt } from "@/utils/jwt";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Access denied. No token provided." },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(" ")[1];
    const decoded = verifyJwt(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 401 }
      );
    }
    
    const user = findUserByEmail(decoded.email);
    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred fetching session profile." },
      { status: 500 }
    );
  }
}

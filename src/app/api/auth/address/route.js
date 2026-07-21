import { NextResponse } from "next/server";
import { findUserByEmail, updateUser } from "@/utils/db";
import { verifyJwt } from "@/utils/jwt";

export async function PUT(request) {
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
    
    const { type, address } = await request.json();
    if (!type || !address) {
      return NextResponse.json(
        { message: "Type and address are required." },
        { status: 400 }
      );
    }
    
    const addressKey = type === "shipping" ? "shippingAddress" : "billingAddress";
    const updated = updateUser(decoded.email, { [addressKey]: address });
    
    if (!updated) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }
    
    const { password: _, ...userWithoutPassword } = updated;
    return NextResponse.json({
      success: true,
      message: "Address updated successfully!",
      user: userWithoutPassword
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred during address update." },
      { status: 500 }
    );
  }
}

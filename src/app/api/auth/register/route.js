import { NextResponse } from "next/server";
import { addUser, findUserByEmail } from "@/utils/db";
import { signJwt } from "@/utils/jwt";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }
    
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }
    
    if (findUserByEmail(email)) {
      return NextResponse.json(
        { message: "User already exists with this email address." },
        { status: 409 }
      );
    }
    
    const newUser = {
      name,
      email,
      password,
      phone: "",
      shippingAddress: null,
      billingAddress: null
    };
    
    addUser(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    const token = signJwt({ email: newUser.email, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 });
    
    return NextResponse.json({
      success: true,
      message: "Registration successful!",
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred during registration." },
      { status: 500 }
    );
  }
}

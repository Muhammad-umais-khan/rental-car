import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

// Get valid password from environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Generate a secure random token
function generateSecureToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(request) {
  try {
    // Check if admin password is configured
    if (!ADMIN_PASSWORD) {
      console.error("ADMIN_PASSWORD environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (password === ADMIN_PASSWORD) {
      // Generate secure random token
      const token = generateSecureToken();
      
      // Set authentication cookie
      const cookieStore = await cookies();
      cookieStore.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

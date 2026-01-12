import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Valid passwords (must match login route)
const VALID_PASSWORDS = (process.env.ADMIN_PASSWORDS || "admin123").split(",").map(p => p.trim());

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  
  if (!session?.value) {
    return false;
  }

  try {
    // Decode and validate session
    const decoded = Buffer.from(session.value, "base64").toString("utf-8");
    const [password] = decoded.split(":");
    
    return VALID_PASSWORDS.includes(password);
  } catch {
    return false;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Check if trying to access protected routes
  if (pathname.startsWith("/dashboard")) {
    const authenticated = await isAuthenticated();
    
    if (!authenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  
  // If already authenticated and on login page, redirect to dashboard
  if (pathname === "/login") {
    const authenticated = await isAuthenticated();
    
    if (authenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

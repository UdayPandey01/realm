import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode("ssushddjiojqoj154");

const validateToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { role: string; userId: string };

  } catch (error) {
    console.error("JWT validation error:", error);
    return null;
  }
};

export default async function middleware(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = await validateToken(token);

  if (!decodedToken) {
    return NextResponse.json({ error: "Forbidden: Invalid or expired token" }, { status: 403 });
  }

  if (decodedToken.role !== "Admin") {
    return NextResponse.json({ error: "Forbidden: Admin access only" }, { status: 403 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/admin/:path*",
};

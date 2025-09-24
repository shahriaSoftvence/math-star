import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const is_premium = false; // 🔹 hardcoded for testing

  if (!is_premium) {
    return NextResponse.redirect(new URL("/dashboard/subscription", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
  "/dashboard/subtraction",
  "/dashboard/subtraction/:path*",
  "/dashboard/multiplication",
  "/dashboard/multiplication/:path*",
  "/dashboard/division",
  "/dashboard/division/:path*",
],

};

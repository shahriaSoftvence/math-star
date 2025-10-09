// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal files, API routes, and assets
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // -----------------------------
  // 1️⃣ Force German as default language
  const languageCookie = request.cookies.get("mathstar-language");
  
  if (!languageCookie) {
    const response = NextResponse.next();
    
    // Always set to German by default
    response.cookies.set({
      name: "mathstar-language",
      value: "de", // Force German
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    
    return response;
  }

  // -----------------------------
  // 2️⃣ Premium check (KEPT EXACTLY THE SAME)
  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken) {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_API}profile/`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) return NextResponse.next();

      const profile = await res.json();
      const is_premium = profile?.data?.is_premium === true;

      // Redirect non-premium users from premium routes
      if (!is_premium) {
        if (
          pathname.startsWith("/dashboard/subtraction") ||
          pathname.startsWith("/dashboard/multiplication") ||
          pathname.startsWith("/dashboard/division")
        ) {
          // Redirect to subscription page (no locale prefix)
          return NextResponse.redirect(
            new URL(`/dashboard/subscription`, request.url)
          );
        }
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*|public).*)"],
};
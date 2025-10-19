// middleware.ts

import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const languageCookie = request.cookies.get("mathstar-language");
  if (!languageCookie) {
    const response = NextResponse.next();

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

      if (!is_premium) {
        if (
          pathname.startsWith("/dashboard/subtraction") ||
          pathname.startsWith("/dashboard/multiplication") ||
          pathname.startsWith("/dashboard/division")
        ) {
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
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;


  if (!accessToken) {
    return NextResponse.redirect(new URL("auth/signin", request.url));
  }


  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}profile/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const profile = await res.json();
  const is_premium = profile?.is_premium === true;

  if (!is_premium) {
    if (
      pathname.startsWith("/dashboard/subtraction") ||
      pathname.startsWith("/dashboard/multiplication") ||
      pathname.startsWith("/dashboard/division")
    ) {
      return NextResponse.redirect(
        new URL("/dashboard/subscription", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

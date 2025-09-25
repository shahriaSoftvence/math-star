import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

if (!accessToken) {
  return NextResponse.redirect(new URL("auth/signin", request.url));
}

const url = `${process.env.NEXT_PUBLIC_BASE_API}profile/`;
const res = await fetch(url, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

if (!res.ok) {
  throw new Error(`API request failed with status ${res.status}`);
}

const profile = await res.json(); // ✅ already parsed object
console.log(profile, "res from server");

const is_premium = profile?.data?.is_premium === true;
console.log("is_premium:", is_premium);


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

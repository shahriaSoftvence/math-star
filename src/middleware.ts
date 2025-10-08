import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";


const locales = ["en", "de",]; 
const defaultLocale = "de";

function getLocale(request: NextRequest): string {
  // Get language from headers
  const acceptLanguage = request.headers.get("accept-language") || "";
  const headers = { "accept-language": acceptLanguage };
  const languages = new Negotiator({ headers }).languages();
  console.log("🚀 ~ getLocale ~ languages:", languages);

  return match(languages, locales, defaultLocale);
}


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

    // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // Redirect if there is no locale
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

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

const profile = await res.json(); 

const is_premium = profile?.data?.is_premium === true;
// console.log("is_premium:", is_premium);


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
  matcher: [    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|.*\\..*|public).*)"],
};
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

// Language configuration
const languages = ['en', 'de'] as const;
type Language = typeof languages[number];
const defaultLanguage: Language = 'de';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // ==================== LANGUAGE HANDLING ====================
  // Check if the pathname already includes a supported language
  const pathnameHasLanguage = languages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  // Redirect to default language if no language in path (except root)
  if (!pathnameHasLanguage && pathname !== '/') {
    url.pathname = `/${defaultLanguage}${pathname}`;
    return NextResponse.redirect(url);
  }

  // ==================== AUTHENTICATION HANDLING ====================
  // Skip auth check for public routes
  const isPublicRoute = 
    pathname === '/' ||
    pathname === '/en' || 
    pathname === '/de' ||
    pathname.startsWith('/en/auth/') ||
    pathname.startsWith('/de/auth/') ||
    (pathnameHasLanguage && pathname.split('/').length === 2); // Just /en or /de

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check authentication for protected routes (dashboard routes)
  const isDashboardRoute = 
    pathname.startsWith('/en/dashboard/') || 
    pathname.startsWith('/de/dashboard/') ||
    pathname === '/en/dashboard' ||
    pathname === '/de/dashboard';

  if (isDashboardRoute) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      // Redirect to signin - preserve language
      const language = pathname.startsWith('/en') ? 'en' : 'de';
      url.pathname = `/${language}/auth/signin`;
      return NextResponse.redirect(url);
    }

    // Verify token with API
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}profile/`;
      const res = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error('Token validation failed');
      }

      const profile = await res.json();
      const is_premium = profile?.data?.is_premium === true;

      // ==================== PREMIUM FEATURE CHECK ====================
      if (!is_premium) {
        const premiumRoutes = [
          '/dashboard/subtraction',
          '/dashboard/multiplication', 
          '/dashboard/division'
        ];

        const isPremiumRoute = premiumRoutes.some(route => 
          pathname.includes(route)
        );

        if (isPremiumRoute) {
          // Redirect to subscription page - preserve language
          const language = pathname.startsWith('/en') ? 'en' : 'de';
          url.pathname = `/${language}/dashboard/subscription`;
          return NextResponse.redirect(url);
        }
      }
    } catch (error) {
      // Token validation failed - redirect to signin
      const language = pathname.startsWith('/en') ? 'en' : 'de';
      url.pathname = `/${language}/auth/signin`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except internal paths and static files
    '/((?!_next|api|favicon.ico|images|icons|monitoring).*)',
  ],
};
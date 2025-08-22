// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // Define protected routes that require authentication
// const protectedRoutes = [
//   '/dashboard',
//   '/addition',
//   '/subtraction', 
//   '/multiplication',
//   '/division',
//   '/profile',
//   '/rewards',
//   '/settings',
//   '/subscription'
// ];

// // Define auth routes that should redirect authenticated users
// const authRoutes = ['/signin', '/signup', '/reset-password'];

// // Define public routes that should be accessible to everyone
// const publicRoutes = ['/', '/about', '/contact'];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
  
//   // Get token from cookies
//   const token = request.cookies.get('accessToken')?.value || 
//                 request.cookies.get('auth')?.value ||
//                 request.headers.get('authorization')?.replace('Bearer ', '');

//   // Check if user is authenticated
//   const isAuthenticated = !!token;

//   // If trying to access protected route without authentication
//   if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
//     const url = request.nextUrl.clone();
//     url.pathname = '/signin';
//     url.searchParams.set('redirect', pathname);
//     return NextResponse.redirect(url);
//   }

//   // If trying to access auth routes while authenticated
//   if (authRoutes.some(route => pathname.startsWith(route)) && isAuthenticated) {
//     const url = request.nextUrl.clone();
//     url.pathname = '/dashboard';
//     return NextResponse.redirect(url);
//   }

//   // Allow access to all other routes (including home route)
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
//   ],
// };











import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/addition',
  '/subtraction', 
  '/multiplication',
  '/division',
  '/profile',
  '/rewards',
  '/settings',
  '/subscription'
];

// Define auth routes that should redirect authenticated users
const authRoutes = ['/signin', '/signup', '/reset-password'];

// Define public routes that should be accessible to everyone
const publicRoutes = ['/', '/about', '/contact'];

export function middleware(request: NextRequest) {
  // All authentication and redirection logic is commented out to allow free access
  // during development.
  const { pathname } = request.nextUrl;
  
  // Get token from cookies
  const token = request.cookies.get('accessToken')?.value || 
                request.cookies.get('auth')?.value ||
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // If trying to access protected route without authentication
  // if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/signin';
  //   url.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(url);
  // }

  // If trying to access auth routes while authenticated
  // if (authRoutes.some(route => pathname.startsWith(route)) && isAuthenticated) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/dashboard';
  //   return NextResponse.redirect(url);
  // }

  // Allow access to all other routes (including home route)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
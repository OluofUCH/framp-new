import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log(`Middleware running for path: ${request.nextUrl.pathname}`);

 
 
  try {
    const sessionToken = request.cookies.get('session')?.value;


    if (!sessionToken) {
      console.log("No session token found in cookies, redirecting to login");
      return NextResponse.redirect(new URL('/login', request.url));
    }
  

    // Optional: Admin check
    // if (request.nextUrl.pathname.startsWith('/admin')) {
    //   if (result.role !== 'admin') {
    //     console.log("User is not admin, redirecting to dashboard");
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    //   }
    //   console.log("Admin access granted");
    // }

    console.log("Request authorized, proceeding");
    return NextResponse.next();
  } catch (err) {
    console.error("Error validating token:", err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/dashboard'],
};

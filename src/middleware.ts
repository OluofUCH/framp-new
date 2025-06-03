import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log(`Middleware running for path: ${request.nextUrl.pathname}`);

  // Get token from cookie
  const token = request.cookies.get('session')?.value;

  if (!token) {
    console.log("No auth token found, redirecting to login");
    return NextResponse.redirect(new URL('/login', request.url));
  }
 
  try {
  //   // Replace this URL with your actual API endpoint
  //   const res = await fetch('https://your-api.com/auth/validate', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-frontend-key': 'framp_6565fde02c6f0f3b052cf3b02daaea77cf8bd71247b0dae5939c3f7a9272af6f',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify({ token }),
  //   });

  //   const result = await res.json();
  //   console.log("Auth validation result:", result);

  //   if (!res.ok || !result.valid) {
  //     console.log("Token is invalid, redirecting to login");
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }

    // Optional: Admin check
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (result.role !== 'admin') {
        console.log("User is not admin, redirecting to dashboard");
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      console.log("Admin access granted");
    }

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

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log("LOGOUT API: Processing logout request");

    // Create response and clear relevant cookies
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );

    const cookiesToClear = [
      'session',
      'sb-access-token',
      'sb-refresh-token',
      'supabase-auth-token',
    ];

    cookiesToClear.forEach(cookieName => {
      response.cookies.set({
        name: cookieName,
        value: '',
        path: '/',
        maxAge: 0,
        expires: new Date(0),
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    });

    console.log("LOGOUT API: Cookies cleared successfully");
    return response;

  } catch (error) {
    console.error("LOGOUT API: Error during logout:", error);

    const response = NextResponse.json(
      { error: 'Logout failed, but cookies have been cleared' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );

    const cookiesToClear = [
      'session',
      'sb-access-token',
      'sb-refresh-token',
      'supabase-auth-token',
    ];

    cookiesToClear.forEach(cookieName => {
      response.cookies.set({
        name: cookieName,
        value: '',
        path: '/',
        maxAge: 0,
        expires: new Date(0),
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    });

    return response;
  }
}

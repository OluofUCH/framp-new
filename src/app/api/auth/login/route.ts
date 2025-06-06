import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {

  try {
    console.log("LOGIN API: Processing login request");

    // Parse email and password from request body
    const { email, password } = await request.json(); 

    if (!email || !password) {
      console.log("LOGIN API: Missing email or password");
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
 
    console.log(`LOGIN API: Attempting login with email: ${email}`);

    // Call external API to log in the user
    const res = await fetch('https://framp-backend.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-frontend-key": "framp_6565fde02c6f0f3b052cf3b02daaea77cf8bd71247b0dae5939c3f7a9272af6f"
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      console.error("LOGIN API: External API login failed:", errorBody);
      return NextResponse.json({ error: errorBody.message || 'Authentication failed' }, { status: 401 });
    }

    const responseJson = await res.json();

    // Extracting the fields
    const { auth: { access_token, refresh_token }, user } = responseJson;

    if (!access_token || !user) {
      console.error("LOGIN API: Missing tokens or user data");
      return NextResponse.json({ error: 'Invalid response from auth server' }, { status: 401 });
    }

    console.log(`LOGIN API: User authenticated successfully: ${user.id}`);

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role || 'user',
        profile: user.profile || null,
      }
    });

    // return NextResponse.json({
    //   user: {
    //     id: user.id,
    //     email: user.email,
    //     role: user.role || 'user',
    //     profile: user.profile || null,
    //   },
    //   access_token,
    //   refresh_token
    // });
    // Set auth cookies
    response.cookies.set({
      name: 'session',
      value: access_token,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',
    });

    response.cookies.set({
      name: 'refresh_token',
      value: refresh_token || '',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return response;
  } catch (error: any) {
    console.error('LOGIN API: Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

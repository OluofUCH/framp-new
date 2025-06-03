import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export async function POST(request: NextRequest) {
  try {
    const { email, password, name, wallet_address } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const ip_address = request.headers.get('x-forwarded-for') || null;
    const user_agent = request.headers.get('user-agent') || null;

    const apiResponse = await fetch('https://framp-backend.vercel.app/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-frontend-key": "framp_6565fde02c6f0f3b052cf3b02daaea77cf8bd71247b0dae5939c3f7a9272af6f"
      },
      body: JSON.stringify({
        email,
        password,
        ip_address,
        user_agent,
      }),
    });

    const apiData = await apiResponse.json();

    if (!apiResponse.ok || !apiData.access_token) {
      return NextResponse.json(
        { error: apiData.error || 'Failed to create user or missing access token' },
        { status: apiResponse.status }
      );
    }

    // Set access token in a secure cookie
    const response = NextResponse.json(
      {
        message: 'User created successfully via framp.xyz',
        data: apiData,
      },
      { status: 201 }
    );

    response.cookies.set({
      name: 'session',
      value: apiData.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Unexpected error in signup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

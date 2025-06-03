import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log("ME API: Checking user session");

    // Get session token from cookies
    const sessionToken = request.cookies.get('session')?.value;

    if (!sessionToken) {
      console.log("ME API: No session token found in cookies");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("ME API: Session token found, verifying with external API");

    // Call external API to validate the token and get user info
    const res = await fetch('https://framp-backend.vercel.app/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error("ME API: External API returned error", res.status);
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const apiResponse = await res.json();
console.log(apiResponse);
const userInfo = { 
  id: apiResponse.user.id,
  email: apiResponse.user.email,
  role: apiResponse.user.role || 'user',
  profile: apiResponse.user.profile || null,
};

    console.log(`ME API: Returning user:`, userInfo);

    return NextResponse.json({ user: userInfo });
  } catch (error: any) {
    console.error('Unexpected error in /api/auth/me:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

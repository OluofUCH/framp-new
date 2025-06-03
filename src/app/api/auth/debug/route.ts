import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log("DEBUG API: Starting diagnostics");
    const results: any = {};

    // 1. Check tables
    console.log("DEBUG API: Checking tables");
    try {
      const res = await fetch('https://your-api.com/api/tables');
      const tables = await res.json();
      results.tables = tables;
    } catch (e) {
      console.error("DEBUG API: Error checking tables:", e);
      results.tablesException = e;
    }

    // 2. Check profiles table
    console.log("DEBUG API: Checking profiles table");
    try {
      const res = await fetch('https://your-api.com/api/profiles?limit=10');
      const profiles = await res.json();
      results.profiles = profiles;
    } catch (e) {
      console.error("DEBUG API: Error checking profiles:", e);
      results.profilesException = e;
    }

    // 3. Check users table
    console.log("DEBUG API: Checking users table");
    try {
      const res = await fetch('https://your-api.com/api/users?limit=10');
      const users = await res.json();
      results.users = users;
    } catch (e) {
      console.error("DEBUG API: Error checking users:", e);
      results.usersException = e;
    }

    // 4. Check auth users
    console.log("DEBUG API: Checking auth users");
    try {
      const res = await fetch('https://your-api.com/api/auth/users');
      const authUsers = await res.json();
      results.authUsers = authUsers;
    } catch (e) {
      console.error("DEBUG API: Error checking auth users:", e);
      results.authUsersException = e;
    }

    return NextResponse.json({
      message: 'Debug diagnostics completed',
      results,
    });
  } catch (error: any) {
    console.error('Unexpected error in debug API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, userId, email, role } = await request.json();
    console.log(`DEBUG API: Performing action "${action}"`);

    if (action === "fix-profile") {
      if (!userId) {
        return NextResponse.json(
          { error: 'userId is required' },
          { status: 400 }
        );
      }

      // 1. Check if profile exists
      const checkRes = await fetch(`https://your-api.com/api/profiles/${userId}`);
      const existingProfile = await checkRes.json();

      if (existingProfile && existingProfile.id) {
        return NextResponse.json({
          message: 'Profile already exists',
          profile: existingProfile,
        });
      }

      // 2. Create profile
      const createRes = await fetch('https://your-api.com/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          email: email || 'unknown@example.com',
          role: role || 'user',
        }),
      });

      const profile = await createRes.json();

      if (!createRes.ok) {
        return NextResponse.json(
          { error: 'Failed to create profile', details: profile },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'Profile created successfully',
        profile,
      });
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Unexpected error in debug API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

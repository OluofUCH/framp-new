import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log("FIX-AUTH: Starting auth repair process");
    const results: any = {
      success: true,
      usersChecked: 0,
      profilesFixed: 0,
      adminsCreated: 0,
      errors: []
    };

    // 1. Get all authenticated users from your API
    const authRes = await fetch(`${process.env.API_BASE_URL}/auth-users`);
    if (!authRes.ok) {
      const err = await authRes.text();
      throw new Error(`Failed to fetch auth users: ${err}`);
    }
    const authUsers = await authRes.json();
    const users = authUsers.users || [];
    results.usersChecked = users.length;
    console.log(`FIX-AUTH: Found ${users.length} users`);

    // 2. Get existing profiles
    const profilesRes = await fetch(`${process.env.API_BASE_URL}/profiles`);
    const existingProfiles = profilesRes.ok ? await profilesRes.json() : [];
    const profileMap = new Map();
    existingProfiles.forEach(profile => profileMap.set(profile.id, profile));
    console.log(`FIX-AUTH: Found ${existingProfiles.length} existing profiles`);

    // 3. Process each user
    for (const user of users) {
      try {
        // If profile missing, create one
        if (!profileMap.has(user.id)) {
          const isFirstUser = users.indexOf(user) === 0;
          const role = isFirstUser ? 'admin' : 'user';
          if (isFirstUser) results.adminsCreated++;

          const profilePayload = {
            id: user.id,
            email: user.email,
            role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          const insertProfileRes = await fetch(`${process.env.API_BASE_URL}/profiles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profilePayload),
          });

          if (!insertProfileRes.ok) {
            const err = await insertProfileRes.text();
            results.errors.push(`Failed to create profile for ${user.email}: ${err}`);
          } else {
            results.profilesFixed++;
          }
        } else {
          console.log(`FIX-AUTH: User ${user.id} already has a profile`);
        }

        // Ensure user exists in "users" table
        const userRes = await fetch(`${process.env.API_BASE_URL}/users/${user.id}`);
        if (userRes.status === 404) {
          const userPayload = {
            id: user.id,
            email: user.email,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          const insertUserRes = await fetch(`${process.env.API_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userPayload),
          });

          if (!insertUserRes.ok) {
            const err = await insertUserRes.text();
            results.errors.push(`Failed to create user record for ${user.email}: ${err}`);
          }
        }
      } catch (userError) {
        console.error(`FIX-AUTH: Error processing user ${user.id}:`, userError);
        results.errors.push(`Error processing user ${user.email}`);
      }
    }

    console.log("FIX-AUTH: Auth repair process completed");
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("FIX-AUTH: Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error during auth repair',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

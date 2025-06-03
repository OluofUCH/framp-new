import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("AUTH-CHECK: Checking authentication status");

    // Extract cookies from the request
    const cookieStore = request.cookies;
    const cookieList = cookieStore.getAll();
    const cookies: Record<string, string> = {};
    for (const cookie of cookieList) {
      cookies[cookie.name] = cookie.value;
    }

    // Forward cookies to your backend API (like /api/me)
    // This example assumes your backend API is on the same domain and expects cookies for auth
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/me`, {
      method: "GET",
      headers: {
        cookie: cookieList.map(c => `${c.name}=${c.value}`).join("; "),
        // You can add other headers if needed
      },
    });

    if (!apiResponse.ok) {
      console.log("API /api/me returned error status", apiResponse.status);
      return NextResponse.json({ authenticated: false }, { status: apiResponse.status });
    }

    const userData = await apiResponse.json();

    // Customize this depending on what your /api/me returns
    // For example, your API might return { user: {...} } or { authenticated: true, userId: ... }
    const authenticated = Boolean(userData?.user);
    const userId = userData?.user?.id || null;

    return NextResponse.json({
      authenticated,
      userId,
      cookies: {
        hasAccessToken: !!cookies["sb-access-token"],
        hasRefreshToken: !!cookies["sb-refresh-token"],
        cookiesList: Object.keys(cookies),
      },
      userData,
    });
  } catch (error: any) {
    console.error("Unexpected error in auth check:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}

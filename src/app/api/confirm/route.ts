import { NextResponse } from "next/server";
import crypto from "crypto";

function generateToken(email: string) {
  return crypto.createHash("sha256").update(email).digest("hex");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse("Invalid or missing token.", { status: 400 });
  }

  try {
    // Fetch pending users from your external API
    const res = await fetch('https://framp-backend.vercel.app/api/confirm/pending');
    if (!res.ok) {
      return new NextResponse("Error fetching pending users.", { status: 500 });
    }

    const users = await res.json();

    // Match token to hashed email
    const user = users.find((user: any) => generateToken(user.email) === token);

    if (!user) {
      return new NextResponse("No matching user found or already confirmed.", { status: 404 });
    }

    // Send confirmation to backend
    const confirmRes = await fetch('https://framp-backend.vercel.app/api/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id }),
    });

    if (!confirmRes.ok) {
      return new NextResponse("Error confirming email.", { status: 500 });
    }

    return new NextResponse(
      "✅ Your email has been confirmed! You're now officially on the waitlist.",
      { status: 200 }
    );

  } catch (error) {
    console.error("Confirmation error:", error);
    return new NextResponse("Server error processing your confirmation.", { status: 500 });
  }
}

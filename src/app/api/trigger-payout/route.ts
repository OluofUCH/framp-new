import { NextRequest, NextResponse } from "next/server";

const TRIGGER_PAYOUT_API = "https://framp-backend.vercel.app/api/trigger-payout";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { request_id } = body;

    if (!request_id) {
      return NextResponse.json({ error: "Missing request_id" }, { status: 400 });
    }

    const response = await fetch(TRIGGER_PAYOUT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.error || "Payout failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      reference: result.reference || null,
      message: "Payout triggered successfully",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unexpected error occurred" },
      { status: 500 }
    );
  }
}

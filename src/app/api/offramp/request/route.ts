import { NextResponse } from "next/server";

const FRAMP_BACKEND_REQUEST_API = "https://framp-backend.vercel.app/api/offramp/request";

export async function POST(request: Request) {
  const body = await request.json();
  const { wallet, token, amount, bankName, accountNumber, accountName } = body;

  if (!wallet || !token || !amount || !bankName || !accountNumber) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const response = await fetch(FRAMP_BACKEND_REQUEST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet,
        token,
        amount,
        bank_name: bankName,
        account_number: accountNumber,
        account_name: accountName || null,
        status: "pending",
        created_at: new Date().toISOString(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Framp backend error:", data);
      return NextResponse.json({ error: "Failed to log offramp request", details: data }, { status: 500 });
    }

    return NextResponse.json({ message: "Offramp request received", data }, { status: 200 });
  } catch (err) {
    console.error("Request error:", err);
    return NextResponse.json({ error: "An unexpected error occurred", details: (err as Error).message }, { status: 500 });
  }
}

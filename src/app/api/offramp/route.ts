import { NextResponse } from "next/server";
import { getUSDStarExchangeRate } from "@/lib/perena/client";

// Get the off-ramp fee percentage from environment variables (default to 1%)
const OFFRAMP_FEE_PERCENTAGE = Number(process.env.NEXT_PUBLIC_OFFRAMP_FEE_PERCENTAGE || 1);
const DEV_MODE = true;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      userWallet, 
      amount, 
      token = "USD*", 
      bank_account_number, 
      bank_code, 
      bank_name,
      currency = "NGN",
      userId,
      signedTransaction
    } = body;

    if (!userWallet || !amount || !bank_account_number || !bank_code || !signedTransaction) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({ error: "Amount must be greater than 0" }, { status: 400 });
    }

    const fiatAmount = amount * (1 - OFFRAMP_FEE_PERCENTAGE / 100);

    if (DEV_MODE) {
      const response = await fetch("https://framp-backend.vercel.app/api/offramp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userWallet,
          amount,
          token,
          bank_account_number,
          bank_code,
          bank_name,
          currency,
          userId,
          signedTransaction,
          fiat_amount: fiatAmount,
          fee_percentage: OFFRAMP_FEE_PERCENTAGE
        })
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error from Framp API:", result);
        return NextResponse.json({ error: result.error || "External API failed" }, { status: response.status });
      }

      return NextResponse.json({
        success: true,
        message: result.message || "Off-ramp request submitted successfully",
        ...result
      });
    }

    // In production: handle token redemption and transfer logic here if needed
    const exchangeRate = await getUSDStarExchangeRate(currency);
    // Further actions can be added here if real-time transaction handling is required

    return NextResponse.json({
      success: true,
      message: "Off-ramp logic completed (production mode)",
      fiatAmount,
      exchangeRate
    });

  } catch (error) {
    console.error("Error in offramp POST API:", error);
    return NextResponse.json({ error: "Failed to process offramp request" }, { status: 500 });
  }
}

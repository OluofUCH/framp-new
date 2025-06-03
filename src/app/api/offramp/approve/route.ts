import { NextResponse } from "next/server";
import { initiateFlutterwaveTransfer } from "@/lib/fiat/transfer";

const FRAMP_BACKEND_API = "https://framp-backend.vercel.app/api/offramp/approve";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { requestId, adminNote } = body;

    if (!requestId) {
      return NextResponse.json(
        { error: "Missing request ID" },
        { status: 400 }
      );
    }

    // Fetch the request details from the Framp backend
    const fetchRes = await fetch(`${FRAMP_BACKEND_API}?id=${requestId}`);
    if (!fetchRes.ok) {
      const errData = await fetchRes.json();
      console.error("Error fetching off-ramp request:", errData);
      return NextResponse.json(
        { error: "Failed to fetch offramp request", details: errData },
        { status: 500 }
      );
    }

    const offrampRequest = await fetchRes.json();

    if (!["pending", "processing"].includes(offrampRequest.status)) {
      return NextResponse.json(
        { error: `Cannot approve request with status: ${offrampRequest.status}` },
        { status: 400 }
      );
    }

    // Initiate the fiat transfer
    try {
      const transferResponse = await initiateFlutterwaveTransfer({
        amount: offrampRequest.fiat_amount,
        account_number: offrampRequest.bank_account_number,
        bank_code: offrampRequest.bank_code,
        currency: "NGN",
        narration: `FRAMP off-ramp payment for ${offrampRequest.wallet}`
      });

      if (!transferResponse || !transferResponse.data) {
        throw new Error("Failed to initiate transfer");
      }

      // Update approval status on Framp backend
      const updateRes = await fetch(FRAMP_BACKEND_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          payout_reference: transferResponse.data.reference,
          adminNote: adminNote || `Approved and disbursed on ${new Date().toISOString()}`
        }),
      });

      const updateData = await updateRes.json();

      if (!updateRes.ok) {
        return NextResponse.json(
          { error: "Failed to update off-ramp status", details: updateData },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Off-ramp request approved and payout initiated",
        transferReference: transferResponse.data.reference,
        transferDetails: transferResponse.data,
        update: updateData
      });

    } catch (transferError) {
      console.error("Transfer error:", transferError);

      // Optionally notify Framp backend of failed disbursement attempt
      await fetch(FRAMP_BACKEND_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          adminNote: `Transfer failed: ${(transferError as Error).message}`
        }),
      });

      return NextResponse.json(
        { error: "Failed to initiate transfer", details: (transferError as Error).message },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: (error as Error).message },
      { status: 500 }
    );
  }
}

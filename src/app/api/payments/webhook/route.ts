import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// GET /api/payments/list
export async function GET() {
  try {
    // Example: collect last 10 payments
    const payments = await stripe.paymentIntents.list({
      limit: 10,
    });

    return NextResponse.json({ success: true, data: payments });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
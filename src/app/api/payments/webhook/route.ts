import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (!email) return NextResponse.json({ success: false, error: "Email required" }, { status: 400 });

    const payments = await stripe.paymentIntents.list({ limit: 50 });

    const userPayments = payments.data
      .filter((p) => p.metadata?.email === email)
      .map((p) => ({
        id: p.id,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        createdAt: new Date(p.created * 1000).toISOString(),
        email: p.metadata?.email || "",
      }));

    return NextResponse.json({ success: true, data: userPayments });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

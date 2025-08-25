import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const amountInCents = (body.amount || 20) * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: body.productName || "Sample Product" },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: { email: body.email }, 
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/cancel`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// POST /api/checkout
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Stripe expects amount in cents (USD = x100)
    const amountInCents = (body.amount || 20) * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: body.productName || "Sample Product",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Attach user email to metadata
      metadata: {
        email: body.email || "", // pass user email from frontend
      },

      
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/cancel`,
    });
console.log(session)
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

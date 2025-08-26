/* eslint-disable @typescript-eslint/no-explicit-any */
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, userId } = await req.json();

    if (!userId || !email) {
      return NextResponse.json(
        { message: "Missing userId or email" },
        { status: 400 }
      );
    }

    // Check if the user is already a customer in Stripe
    const customers = await stripe.customers.list({ email: email, limit: 1 });
    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      // Create a new customer in Stripe
      customer = await stripe.customers.create({
        email: email,
        metadata: {
          userId: userId,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription", // <-- Changed from 'payment' to 'subscription'
      customer: customer.id,
      line_items: [
        {
          // Provide the Price ID of the subscription plan from your Stripe Dashboard
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, // <-- Use a recurring Price ID from .env
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/cancel`,
      metadata: {
        userId,
      },
    });

    return NextResponse.json({
      url: session.url,
      message: "Checkout session created successfully",
    });
  } catch (error: any) {
    console.error("Error creating checkout session:", error.message);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
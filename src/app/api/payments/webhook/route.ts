/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") as string;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.mode === 'subscription') {
        const subscriptionId = session.subscription;
        const customerId = session.customer;
        const userId = session.metadata?.userId;

        // console.log(`Subscription created for user ${userId}. Sub ID: ${subscriptionId}`);
        // TODO: Save the customerId and subscriptionId to your user's record in your database.
        // For example: await db.user.update({ where: { id: userId }, data: { stripeCustomerId: customerId, stripeSubscriptionId: subscriptionId, subscriptionStatus: 'active' } });
      }
      break;

    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      // Handle subscription cancellation
      // TODO: Update user's subscription status in your database to 'canceled' or 'inactive'.
      // For example: await db.user.update({ where: { stripeSubscriptionId: subscription.id }, data: { subscriptionStatus: 'canceled' } });
      break;
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
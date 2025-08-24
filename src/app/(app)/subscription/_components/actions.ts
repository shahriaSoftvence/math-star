"use server";

import { stripe } from "@/lib/stripe";

export async function getPayments(userEmail?: string) {
  try {
    const sessions = await stripe.checkout.sessions.list({ limit: 50 });

    const filtered = userEmail
      ? sessions.data.filter(
          (s) => s.customer_email === userEmail || s.metadata?.email === userEmail
        )
      : sessions.data;

    return {
      success: true,
      data: filtered.map((s) => ({
        id: s.id,
        amount: s.amount_total || 0, 
        currency: s.currency || "usd",
        status: s.payment_status,
        created: s.created,
        email: s.customer_email || s.metadata?.email || "",
      })),
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

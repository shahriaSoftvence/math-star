"use server";

import { stripe } from "@/lib/stripe";

export async function getPayments(userEmail?: string) {
  try {
    const payments = await stripe.paymentIntents.list({ limit: 30 });

    // 🔹 MODIFIED: Filter payments by metadata.email
    const filtered = userEmail
      ? payments.data.filter((p) => p.metadata?.email === userEmail) 
      : payments.data;

    return {
      success: true,
      data: filtered.map((p) => ({
        id: p.id,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        created: p.created,
        email: p.metadata?.email || "",
      })),
    };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

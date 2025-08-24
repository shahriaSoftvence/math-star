// /pages/api/payments/history.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type PaymentResponse = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  cardType: string;
  last4: string;
  date: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ payments: PaymentResponse[] } | { error: string }>
) {
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
      expand: ["data.charges"], // make charges accessible
    });

    const payments: PaymentResponse[] = paymentIntents.data.map((pi: Stripe.PaymentIntent) => {
      const expandedPi = pi as Stripe.PaymentIntent & { charges?: { data?: Stripe.Charge[] } };
      const charge = (expandedPi.charges?.data?.[0] as Stripe.Charge | undefined);

      return {
        id: pi.id,
        amount: pi.amount,
        currency: pi.currency,
        status: pi.status,
        cardType: charge?.payment_method_details?.card?.brand ?? "Card",
        last4: charge?.payment_method_details?.card?.last4 ?? "****",
        date: new Date(pi.created * 1000).toISOString(),
      };
    });

    res.status(200).json({ payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
}

"use client";
import { CreditCard, Trash2 } from "lucide-react";


type Card = {
  id: number;
  type: string;
  last4: string;
  expires: string;
  isDefault?: boolean;
};

export default function CheckoutButton(card: Card) {
   const handleCheckout = async () => {
  const res = await fetch("/api/payments/checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productName: "Test Product",
      amount: 50,
    }),
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    console.error("No checkout URL returned:", data);
  }
};

  return (
    <div
      onClick={handleCheckout}
      key={card.id}
      className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex justify-center items-center">
          <CreditCard size={20} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-800 font-Nunito">
            {card.type} ending in {card.last4}
          </p>
          <p className="text-sm text-gray-600 font-Nunito">
            Expires {card.expires}
          </p>
        </div>
        {card.isDefault && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full font-Nunito">
            Default
          </span>
        )}
      </div>
      <button className="p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-100">
        <Trash2 size={20} />
      </button>
    </div>
  );
}

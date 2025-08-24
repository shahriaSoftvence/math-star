// Payment record from backend
export interface Payment {
  id: string;
  amount: number;           // in cents
  currency: string;         // e.g., 'usd'
  status: "pending" | "succeeded" | "failed";
  createdAt: string;        // ISO string, not a number
  email?: string;           // optional user email for grouping
}

// Card details
export interface Card {
  id?: number;
  type?: string;            // e.g., 'Visa'
  last4?: string;           // last 4 digits
  expires?: string;         // 'MM/YY'
  isDefault?: boolean;
  createdAt?: string;       // ISO timestamp
}

// Flattened payment response for UI
export interface PaymentResponse {
  id: string;
  amount: number;           // in cents
  currency: string;
  status: "pending" | "succeeded" | "failed";
  cardType?: string;        // e.g., 'Visa'
  last4?: string;           // last 4 digits
  date: string;             // formatted for display
  email?: string;           // optional, for showing user email
}

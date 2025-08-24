export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed";
  createdAt: string;
  email?: string;
}

export interface Card {
  id?: number;
  type?: string;
  last4?: string;
  expires?: string;
  isDefault?: boolean;
  createdAt?: string;
}

export interface PaymentResponse {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed";
  cardType?: string;
  last4?: string;
  date: string;
  email?: string;
}



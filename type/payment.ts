export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed";
  userId?: string;
  createdAt: string;
}

export interface Card {
  id: number;
  type: string;
  last4: string;
  expires: string;
  isDefault: boolean;
};


export interface PaymentResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
  cardType: string;
  last4: string;
  date: string;
};
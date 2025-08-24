"use client";

import React, { useEffect, useState } from "react";
import { getPayments } from "./actions"; // your server action
import { Payment } from "../../../../../type/payment";
import { ReceiptText } from "lucide-react";
import moment from "moment";
import { useGetProfileQuery } from "@/Redux/features/auth/authApi";

export default function GetPaymentData() {
  const { data: userData } = useGetProfileQuery();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userData?.data?.email) return;

    const loadPayments = async () => {
      try {
        const res = await getPayments(userData.data.email);
        if (res.success && res.data) {
          const formatted: Payment[] = res.data.map((p) => ({
            id: p.id,
            amount: p.amount,
            currency: p.currency,
            status: p.status as Payment["status"],
            createdAt: new Date(p.created * 1000).toISOString(),
          }));
          setPayments(formatted);
        } else {
          setError(res.error || "Failed to fetch payments");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [userData?.data?.email]);

  if (loading) return <p>Loading payments...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg">
      <h3 className="text-gray-800 text-xl font-bold font-Nunito mb-6">
        Billing History
      </h3>
      <div className="space-y-4">
        {payments.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex justify-center items-center">
                <ReceiptText size={24} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 font-Nunito">
                  Monthly
                </p>
                <p className="text-sm text-gray-600 font-Nunito">
                  {moment(item.createdAt).format("DD MMMM YY")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800 font-Nunito">
                {(item.amount / 100).toFixed(2)} {item.currency.toUpperCase()}
              </p>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full font-Nunito capitalize">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

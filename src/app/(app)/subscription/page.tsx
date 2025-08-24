// src/app/subscription/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Crown, 
  Calendar, 
  RefreshCw, 
  XCircle, 
  Plus,
  ReceiptText
} from 'lucide-react';
import CheckoutButton from './checkout';


// Reusable Toggle Switch Component
const ToggleSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  const [payments, setPayments] = useState<PaymentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(payments);

  useEffect(() => {
    fetch("/api/payments/history")
      .then((res) => res.json())
      .then((data) => {
        setPayments(data.payments);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading payment history...</p>;

  return (
    <button
      onClick={() => setIsEnabled(!isEnabled)}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
        isEnabled ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${
          isEnabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
};

// Data for Payment Methods and Billing History
const paymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expires: '12/28', isDefault: true },
  { id: 2, type: 'Mastercard', last4: '8888', expires: '06/27', isDefault: false },
];

const billingHistory = [
  { id: 1, plan: 'Premium Plan', date: 'Nov 15, 2024', amount: '৳599' },
  { id: 2, plan: 'Premium Plan', date: 'Oct 15, 2024', amount: '৳599' },
  { id: 3, plan: 'Basic Plan', date: 'Sep 15, 2024', amount: '৳299' },
];

export default function SubscriptionPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/profile" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-gray-800 text-3xl font-bold font-Nunito">Subscription</h1>
            <p className="text-gray-600 font-Nunito">Manage your plan and payments</p>
          </div>
        </div>

        {/* Current Subscription Banner */}
        <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl shadow-lg text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Crown size={32} className="text-yellow-300" />
              <div>
                <h2 className="text-xl font-bold font-Nunito">Current Subscription</h2>
                <p className="text-purple-100 font-Nunito">Premium Plan</p>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-2 text-sm text-purple-100 font-Nunito">
                <Calendar size={16} />
                <span>Renews on February 15, 2024</span>
              </div>
              <button className="px-3 py-2 bg-white text-red-500 text-sm font-medium font-Nunito rounded-md hover:bg-gray-100 transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl shadow-lg">
            <h3 className="text-gray-800 text-xl font-bold font-Nunito mb-4">Auto Renewal</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 font-Nunito">Automatically renew subscription</p>
                <p className="text-gray-500 text-sm font-Nunito">Next charge on Dec 15</p>
              </div>
              <ToggleSwitch />
            </div>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-lg">
            <h3 className="text-gray-800 text-xl font-bold font-Nunito mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-start gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100">
                <RefreshCw size={16} className="text-slate-950" />
                <span className="text-slate-950 text-sm font-medium font-Nunito">Renew Now</span>
              </button>
              <button className="w-full flex items-center justify-start gap-2 p-2.5 bg-slate-50 border border-red-200 rounded-md hover:bg-red-50">
                <XCircle size={16} className="text-red-600" />
                <span className="text-red-600 text-sm font-medium font-Nunito">Cancel Subscription</span>
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6 bg-white rounded-3xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-800 text-xl font-bold font-Nunito">Payment Methods</h3>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border text-[#000] border-slate-200 rounded-md text-sm font-medium hover:bg-slate-100">
              <Plus size={16} />
              Add Card
            </button>
          </div>
          <div className="space-y-4">
            {paymentMethods.map(card => (
              <CheckoutButton
                key={card.id}
                id={card.id}
                type={card.type}
                last4={card.last4}
                expires={card.expires}
                isDefault={card.isDefault}
              />
            ))}
          </div>
        </div>

        {/* Billing History */}
        <div className="p-6 bg-white rounded-3xl shadow-lg">
          <h3 className="text-gray-800 text-xl font-bold font-Nunito mb-6">Billing History</h3>
          <div className="space-y-4">
            {billingHistory.map(item => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex justify-center items-center">
                    <ReceiptText size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 font-Nunito">{item.plan}</p>
                    <p className="text-sm text-gray-600 font-Nunito">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 font-Nunito">{item.amount}</p>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full font-Nunito">Paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
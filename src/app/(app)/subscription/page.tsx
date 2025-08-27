/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Crown,
  Calendar,
  RefreshCw,
  XCircle,
  Plus,
} from "lucide-react";
import GetPaymentData from "./_components/getPaymentData";
import {
  useGetUserActivePlanQuery,
  useCancelSubscriptionMutation,
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
} from "@/Redux/features/subscription/subscriptionApi";
import { toast } from "sonner";

// Reusable Toggle Switch Component (Now purely presentational)
const ToggleSwitch = ({ isEnabled, onToggle }: { isEnabled: boolean; onToggle: () => void }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
        isEnabled ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${
          isEnabled ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
};

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  
  // Fetch subscription data using Redux APIs
  const { data: activePlan, isLoading: planLoading } = useGetUserActivePlanQuery();
  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  const [cancelSubscription] = useCancelSubscriptionMutation();
  const [addPaymentMethod] = useAddPaymentMethodMutation();
  
  // Derive subscription state from API data
  const subscription = {
    isActive: activePlan?.is_active || false,
    planName: activePlan?.plan?.name || "No Active Plan",
    renewsOn: activePlan?.end_date ? new Date(activePlan.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "",
    nextCharge: activePlan?.end_date ? new Date(activePlan.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "",
    autoRenew: activePlan?.is_recurring || false,
    stripeCustomerId: "cus_...", // This should come from user profile data
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/payments/manage-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId: subscription.stripeCustomerId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create Stripe portal session.");
      }

      const { url } = await response.json();
      window.location.href = url; // Redirect to Stripe Customer Portal
    } catch (error) {
      console.error("Error managing subscription:", error);
      alert("Could not open subscription management. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription({}).unwrap();
      toast.success("Subscription cancelled successfully");
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("Failed to cancel subscription");
    }
  };

  const handleAddPaymentMethod = async () => {
    try {
      await addPaymentMethod({}).unwrap();
      toast.success("Payment method added successfully");
    } catch (error) {
      console.error("Error adding payment method:", error);
      toast.error("Failed to add payment method");
    }
  };

  if (planLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!subscription.isActive) {
    // Render a view for users without an active subscription
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">No Active Subscription</h1>
                <p className="text-gray-600 mb-6">You do not have an active subscription. Please subscribe to access premium features.</p>
                <Link href="/pricing" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    View Plans
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-gray-800 text-3xl font-bold font-Nunito">
              Subscription
            </h1>
            <p className="text-gray-600 font-Nunito">
              Manage your plan and payments
            </p>
          </div>
        </div>

        {/* Current Subscription Banner */}
        <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl shadow-lg text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Crown size={32} className="text-yellow-300" />
              <div>
                <h2 className="text-xl font-bold font-Nunito">
                  Current Subscription
                </h2>
                <p className="text-purple-100 font-Nunito">{subscription.planName}</p>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-2 text-sm text-purple-100 font-Nunito">
                <Calendar size={16} />
                <span>Renews on {subscription.renewsOn}</span>
              </div>
              <button
                onClick={handleCancelSubscription}
                disabled={loading}
                className="px-3 py-2 bg-white text-red-500 text-sm font-medium font-Nunito rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50">
                {loading ? "Loading..." : "Cancel Subscription"}
              </button>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl shadow-lg">
            <h3 className="text-gray-800 text-xl font-bold font-Nunito mb-4">
              Auto Renewal
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 font-Nunito">
                  Automatically renew subscription
                </p>
                <p className="text-gray-500 text-sm font-Nunito">
                  Next charge on {subscription.nextCharge}
                </p>
              </div>
              <ToggleSwitch isEnabled={subscription.autoRenew} onToggle={handleManageSubscription} />
            </div>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-lg">
            <h3 className="text-gray-800 text-xl font-bold font-Nunito mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleManageSubscription}
                disabled={loading}
                className="w-full flex items-center justify-start gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 disabled:opacity-50">
                <RefreshCw size={16} className="text-slate-950" />
                <span className="text-slate-950 text-sm font-medium font-Nunito">
                  Manage Subscription
                </span>
              </button>
              <button
                onClick={handleManageSubscription}
                disabled={loading} 
                className="w-full flex items-center justify-start gap-2 p-2.5 bg-slate-50 border border-red-200 rounded-md hover:bg-red-50 disabled:opacity-50">
                <XCircle size={16} className="text-red-600" />
                <span className="text-red-600 text-sm font-medium font-Nunito">
                  Cancel Subscription
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6 bg-white rounded-3xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-800 text-xl font-bold font-Nunito">
              Payment Methods
            </h3>
            <button
              onClick={handleAddPaymentMethod}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 bg-slate-50 border text-[#000] border-slate-200 rounded-md text-sm font-medium hover:bg-slate-100 disabled:opacity-50">
              <Plus size={16} />
              Add Card
            </button>
          </div>
          <div className="space-y-4">
            {/* Display payment methods if available */}
            {paymentMethods && paymentMethods.length > 0 ? (
              paymentMethods.map((method) => (
                <div key={method.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{method.brand} •••• {method.last4}</p>
                    <p className="text-sm text-gray-500">Expires {method.exp_month}/{method.exp_year}</p>
                  </div>
                  {method.is_default && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Default</span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center font-Nunito">
                No payment methods on file. Add a card to continue your subscription.
              </p>
            )}
             <button
                onClick={handleManageSubscription}
                disabled={loading}
                className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? "Loading..." : "Open Payment Settings"}
            </button>
          </div>
        </div>
        
        {/* Billing History (now dynamically loaded) */}
        <div>
          <GetPaymentData />
        </div>
      </div>
    </div>
  );
}
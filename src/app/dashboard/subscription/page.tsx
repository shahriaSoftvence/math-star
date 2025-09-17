"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Crown,
  Calendar,
  RefreshCw,
  Plus,
} from "lucide-react";
import GetPaymentData from "./_components/getPaymentData";
import {
  useGetUserActivePlanQuery,
  useCancelSubscriptionMutation,
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
  useRenewSubscriptionMutation,
  useAutoRenewSubscriptionMutation,
} from "@/Redux/features/subscription/subscriptionApi";
import { toast } from "sonner";
import { PaymentMethodData } from "../../../../type/subscription";
import { IoStar } from "react-icons/io5";
import moment from "moment";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// Reusable Toggle Switch Component (Now purely presentational)
const ToggleSwitch = ({ isEnabled, onToggle }: { isEnabled: boolean; onToggle: () => void }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${isEnabled ? "bg-blue-500" : "bg-gray-300"
        }`}
    >
      <span
        className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${isEnabled ? "translate-x-5" : "translate-x-0.5"
          }`}
      />
    </button>
  );
};

export default function SubscriptionPage() {
  const { data: activePlan, isLoading: planLoading, refetch: refetchActivePlan } = useGetUserActivePlanQuery();
  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  const [cancelSubscription, { isLoading: cancelLoading }] = useCancelSubscriptionMutation();
  const [addPaymentMethod, { isLoading: addLoading }] = useAddPaymentMethodMutation();

  const [renewSubscription, { isLoading: renewLoading }] = useRenewSubscriptionMutation();
  const [autoRenewSubscription] = useAutoRenewSubscriptionMutation();
  const [subscriptionActive, setSubscriptionActive] = useState<boolean | null>(null);

  useEffect(() => {
    if (activePlan?.data?.[0]?.is_active !== undefined) {
      setSubscriptionActive(activePlan.data[0].is_active);
    }
  }, [activePlan]);

  const userActivePlan = activePlan?.data?.[0];
  const handleManageSubscription = async () => {
    try {
      const res = await renewSubscription({}).unwrap();
      toast.success(res?.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleToggleSubscription = async () => {
    try {
      const res = await autoRenewSubscription({}).unwrap();
      toast.success(res?.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription({}).unwrap();
      toast.success("Subscription cancelled successfully");
      setSubscriptionActive(false);
      await refetchActivePlan();
    } catch (error) {
      toast.error("Failed to cancel subscription");
    }
  };

  const handleAddPaymentMethod = async () => {
    try {
      const res = await addPaymentMethod({}).unwrap();

      if (res?.url) {
        // redirect to the returned URL
        window.location.href = res.url;
      } else {
        toast.success("Payment method added successfully");
      }
    } catch (error) {
      console.error("Error adding payment method:", error);
      toast.error("Failed to add payment method");
    }
  };


  if (planLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 flex justify-center items-center">
        <div className="text-center">
          <div role="status">
            <svg aria-hidden="true" className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
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
                <p className="text-purple-100 font-Nunito capitalize font-medium">{userActivePlan?.plan_name || "No Plan"}  {userActivePlan?.is_trial && "/ Free Trial"}</p>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-2 text-sm text-purple-100 font-Nunito">
                <Calendar size={16} />
                <span>Renews on : {userActivePlan?.end_date
                  ? moment(userActivePlan.end_date).format("Do MMM, YYYY")
                  : "N/A"}</span>
              </div>


              {
                subscriptionActive ? <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"outline"} className="text-red-500 hover:text-red-600">Cancel Subscription</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel your subscription?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-700 hover:bg-red-600" onClick={handleCancelSubscription}>{cancelLoading ? "Loading..." : "Continue"}</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog> : <Link href="/#pricing"><button
                  className="px-3 py-2 bg-white text-red-500 text-sm font-medium font-Nunito rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50">
                  Buy Subscription
                </button></Link>
              }
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl shadow-lg">
            <h3 className="text-gray-800 text-xl font-bold font-Nunito mb-4 ">
              Auto Renewal
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 font-Nunito">
                  Automatically renew subscription
                </p>
                {userActivePlan?.is_auto_renew &&
                  <p className="text-gray-500 text-sm font-Nunito">
                    Next charge on : {userActivePlan?.end_date
                      ? moment(userActivePlan.end_date).add(1, "day").format("Do MMM, YYYY")
                      : "N/A"}

                  </p>
                }
              </div>
              <ToggleSwitch isEnabled={userActivePlan?.is_auto_renew || false} onToggle={handleToggleSubscription} />
            </div>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-lg">
            <h3 className="text-gray-800 text-xl font-bold font-Nunito mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleManageSubscription}
                disabled={renewLoading}
                className="w-full flex items-center justify-start gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 disabled:opacity-50">
                <RefreshCw size={16} className="text-slate-950" />
                <span className="text-slate-950 text-sm font-medium font-Nunito">
                  {renewLoading? "Renewing your plan…" : "Renew Now"}
                </span>
              </button>
              {/* <button

                  disabled={loading}
                  className="w-full flex items-center justify-start gap-2 p-2.5 bg-slate-50 border border-red-200 rounded-md hover:bg-red-50 disabled:opacity-50">
                  <XCircle size={16} className="text-red-600" />
                  <span className="text-red-600 text-sm font-medium font-Nunito">
                    Cancel Subscription
                  </span>
                </button> */}
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
              disabled={addLoading}
              className="flex items-center gap-2 px-3 py-2 bg-slate-50 border text-[#000] border-slate-200 rounded-md text-sm font-medium hover:bg-slate-100 disabled:opacity-50">
              <Plus size={16} />
              Add Card
            </button>
          </div>
          <div className="space-y-4">
            {/* Display payment methods if available */}
            {paymentMethods?.data?.length ? (
              paymentMethods.data.map((method: PaymentMethodData) => (
                <div key={method.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium capitalize">{method.brand} •••• {method.last4}</p>
                    <p className="text-sm text-gray-500">
                      Expires {method.exp_month} /{method.exp_year}
                    </p>
                  </div>
                  {method.is_default && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center font-Nunito">
                No payment methods on file. Add a card to continue your subscription.
              </p>
            )}
            {/* <button
                onClick={handleManageSubscription}
                disabled={loading}
                className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Loading..." : "Open Payment Settings"}
              </button> */}
          </div>
        </div>

        <div>
          <GetPaymentData />
        </div>
      </div>
    </div>
  );
}
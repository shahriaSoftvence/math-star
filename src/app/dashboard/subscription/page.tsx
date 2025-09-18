"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  Plus,
  Trash2,
  ReceiptText,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  useGetUserActivePlanQuery,
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
  useRenewSubscriptionMutation,
  useAutoRenewSubscriptionMutation,
  useRemoveCardMutation,
  useGetBillingHistoryQuery,
} from "@/Redux/features/subscription/subscriptionApi";
import { toast } from "sonner";
import { PaymentMethodData } from "../../../../type/subscription";
import moment from "moment";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import visaIcon from '../../../../public/visa.svg'
import SubscriptionCard from "@/components/SubscriptionCard";
import { useIsPremium } from "@/Redux/hooks";

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
  const { data: activePlan, isLoading: planLoading } = useGetUserActivePlanQuery();
  const { data: paymentMethods } = useGetPaymentMethodsQuery();
  const [addPaymentMethod, { isLoading: addLoading }] = useAddPaymentMethodMutation();
  const [renewSubscription, { isLoading: renewLoading }] = useRenewSubscriptionMutation();
  const [removeCard] = useRemoveCardMutation();
  const [autoRenewSubscription] = useAutoRenewSubscriptionMutation();
  const { data: billingHistory } = useGetBillingHistoryQuery();
  const [showAll, setShowAll] = useState(false);

  const billingData = billingHistory?.data || [];
  const visibleData = showAll ? billingData : billingData.slice(0, 6);

  const isPremium = useIsPremium();

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
      toast.error("Failed to add payment method");
    }
  };


  const handleRemovePaymentMethod = async (payment_method_id: string) => {
    console.log(payment_method_id)
    try {
      const res = await removeCard(payment_method_id).unwrap();
      toast.success(res?.message || "Payment method removed successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to remove payment method");
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
            href="/dashboard/settings"
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

        <SubscriptionCard />
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
                {isPremium && userActivePlan?.is_auto_renew &&
                  <p className="text-gray-500 text-sm font-Nunito">
                    Next charge on : {userActivePlan?.end_date
                      ? moment(userActivePlan.end_date).add(1, "day").format("Do MMM, YYYY")
                      : "N/A"}

                  </p>
                }
              </div>
              <ToggleSwitch isEnabled={isPremium && userActivePlan?.is_auto_renew || false} onToggle={handleToggleSubscription} />
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
                  {renewLoading ? "Renewing your plan…" : "Renew Now"}
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
                  <div className="flex items-center gap-4">
                    <Image src={visaIcon} alt="visa" />
                    <div className="flex items-start gap-6">
                      <span>
                        <p className="font-semibold capitalize">{method.brand} •••• {method.last4}</p>
                        <p className="text-xs text-gray-500">
                          Expires on {method.exp_month} / {method.exp_year}
                        </p>
                      </span>
                      {method.is_default && (
                        <p className="text-xs ml-4 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          Default
                        </p>
                      )}
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="text-red-500 border-red-500 hover:text-red-600 hover:border-red-600" variant={"outline"}><Trash2 /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove this Card?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure want to remove this card?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemovePaymentMethod(method?.payment_method_id)} className="bg-red-700 hover:bg-red-600">Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

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
          <div className="p-6 bg-white rounded-3xl shadow-lg">
            <h3 className="text-gray-800 text-xl font-bold mb-6">Billing History</h3>
            <div className="space-y-4">
              {billingData.length > 0 ? (
                <>
                  {visibleData.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex justify-center items-center">
                          <ReceiptText size={24} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold capitalize text-gray-800">
                            {item?.plan_name || "Free Plan"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {moment(item?.billing_time).format("DD MMM YYYY, HH:mm")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{item?.amount} USD</p>
                        <p
                          className={`${item?.status === "succeeded"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            } px-3 py-1 text-sm font-medium rounded-full capitalize`}
                        >
                          {item?.status}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* See More / See Less button */}
                  {billingData.length > 6 && (
                    <div className="flex justify-center">
                      <Button variant={"link"}
                        onClick={() => setShowAll(!showAll)}
                        className="text-[#8354FF] font-semibold hover:underline mt-2"
                      >
                        {showAll ? "See Less" : "See More"} {showAll ? <ChevronUp /> : <ChevronDown />}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center text-gray-500 mt-4">
                  No Billing History Found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
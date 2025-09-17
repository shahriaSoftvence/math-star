"use client";

import React from "react";
import { ReceiptText } from "lucide-react";
import moment from "moment";
import { useGetBillingHistoryQuery, useGetPlansQuery } from "@/Redux/features/subscription/subscriptionApi";

export default function GetPaymentData() {
const {data: billingHistory } = useGetBillingHistoryQuery();
  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg">
      <h3 className="text-gray-800 text-xl font-bold mb-6">Billing History</h3>
      <div className="space-y-4">
        {billingHistory?.data && billingHistory.data.length > 0 ? (
  billingHistory.data.map((item, idx) => (
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
            {moment(item?.billing_time).format("DD MMM YYYY")}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-800">{item?.amount} USD</p>
        {item?.plan_name ? (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full capitalize">
            success
          </span>
        ) : (
          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full capitalize">
            cancelled
          </span>
        )}
      </div>
    </div>
  ))
) : (
  <p className="text-center text-gray-500 mt-4">No Billing History Found</p>
)}

      </div>
    </div>
  );
}

"use client";

import React from "react";
import { ReceiptText } from "lucide-react";
import moment from "moment";
import { useGetPlansQuery } from "@/Redux/features/subscription/subscriptionApi";

export default function GetPaymentData() {
const {data: payments } = useGetPlansQuery();
  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg">
      <h3 className="text-gray-800 text-xl font-bold mb-6">Billing History</h3>
      <div className="space-y-4">
        {payments?.data?.map((item) => (
          <div key={item.id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex justify-center items-center">
                <ReceiptText size={24} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{item?.plan_name}</p>
                <p className="text-sm text-gray-600">{moment(item.createdAt).format('DD MMM YYYY, h:mm a')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">{item.price} USD</p>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full capitalize">
                success
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

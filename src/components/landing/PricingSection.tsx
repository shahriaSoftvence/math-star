'use client';

import { Check } from 'lucide-react';
import React from 'react';
import { IoStar } from "react-icons/io5";
import { motion } from 'framer-motion';
import { useCreateSubscriptionMutation, useGetPlansQuery } from '@/Redux/features/subscription/subscriptionApi';
import { useAuth } from '@/Redux/hooks';
import { useRouter } from 'next/navigation';


const pricingFeatures = [
  "Access to all basic math exercises",
  "Progress tracking for 1 child",
  "Basic reward system",
  "Access to all challenges",
  "Monthly cancellation"
];

const PricingSection = () => {
  const { isAuthenticated, user } = useAuth();
const router = useRouter();
const { data: planLists } = useGetPlansQuery();
const [createSubscription] = useCreateSubscriptionMutation();

const handleCreateSubscription = async (planId: number) => {
  if (!isAuthenticated || !user) {
    router.push("/auth/signin");
    return; 
  }

  try {
    const res = await createSubscription( planId ).unwrap(); 

    console.log("Response:", res);

    if (res?.url) {
      window.location.href = res.url;
    }
  } catch (error: any) {
    console.error("Subscription error:", error?.data || error);
  }
};



  return (
    <section id="pricing" className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div className="text-center max-w-3xl">
          <h2 className="text-gray-800 text-4xl font-bold font-Quicksand leading-10">Our pricing policy</h2>
          <p className="text-gray-600 text-xl font-normal font-Open_Sans leading-7 mt-4">
            Money is not our motivation! Therefore, we want to make Math Star accessible to everybody at the lowest price possible.
          </p>
        </div>
        <motion.div
          className="w-full max-w-md mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >

          {
            planLists?.data?.map((plan) => <div key={plan?.id} className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <h3 className="text-gray-800 text-2xl font-bold font-Quicksand leading-loose capitalize">{plan?.plan_name}</h3>
                <div className="w-9 h-9  rounded-full flex items-center justify-center">
                  <IoStar size={38} className="fill-yellow-400" />
                </div>
              </div>
              <div className="flex items-end gap-1">
                <p className="text-gray-800 text-4xl font-bold font-Open_Sans leading-10">$ {plan?.price}</p>
                <p className="text-gray-600 text-base font-normal font-Open_Sans leading-normal">/month</p>
              </div>
              <div className="space-y-4">
                {pricingFeatures.map(feature => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                    <p className="text-gray-600 text-base font-normal font-Open_Sans leading-normal">{feature}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => handleCreateSubscription(plan?.id)} className="w-full py-3.5 bg-white rounded-lg border-2 border-blue-500 text-blue-500 text-base font-bold font-Open_Sans leading-normal hover:bg-blue-50 transition-colors">
                Start 3 Days Trial
              </button>
            </div>)
          }

          <div className="text-center mt-8">
            <p className="text-gray-600 text-base font-normal font-Open_Sans leading-normal">No credit card required to start.</p>
            <p className="text-gray-600 text-base font-normal font-Open_Sans leading-normal">
              Have questions? <a href="#" className="text-blue-500">Contact our support team</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
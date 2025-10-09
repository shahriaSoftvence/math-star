"use client"

import { useCreateSubscriptionMutation } from '@/Redux/features/subscription/subscriptionApi';
import { useAuth, useIsPremium } from '@/Redux/hooks';
import { useRouter } from 'next/navigation';
import React from 'react'

interface PricingBtnProps {
    planId: number;
    trial_button: string
    subscribed_button: string
}

export default function PricingBtn({ planId, subscribed_button, trial_button }: PricingBtnProps) {
    const { isAuthenticated, user } = useAuth();
    const [createSubscription] = useCreateSubscriptionMutation();
    const isPremium = useIsPremium();
    const router = useRouter();

    const handleCreateSubscription = async (planId: number) => {
        if (!isAuthenticated || !user) {
            router.push("/auth/signin");
            return;
        }

        try {
            const res = await createSubscription(planId).unwrap();

            // console.log("Response:", res);

            if (res?.url) {
                window.location.href = res.url;
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Subscription error:", error.message);
            } else {
                console.error("Subscription error:", error);
            }
        }

    };
    return (
        <div>
            {isPremium ? <button className="w-full py-3.5 bg-white rounded-lg border-2 border-yellow-500 text-yellow-500 text-base font-bold font-Open_Sans leading-normal">
                {subscribed_button}
            </button> :
                <button onClick={() => handleCreateSubscription(planId)} className="w-full py-3.5 bg-white rounded-lg border-2 border-blue-500 text-blue-500 text-base font-bold font-Open_Sans leading-normal hover:bg-blue-50 transition-colors">
                    {trial_button}
                </button>

            }
        </div>

    )
}

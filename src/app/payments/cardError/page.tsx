"use client";

import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import cancelLottieAnimation from "../../../../public/Error icon.json";
import Link from "next/link";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { useDictionary } from "@/hook/useDictionary";

export default function CardError() {
    const router = useRouter();

    const { dictionary, loading } = useDictionary();
    const payment_pages = dictionary?.subscription_card?.payment_pages?.card_error;

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/dashboard/subscription");
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    if (!payment_pages || loading) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <Card className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="flex flex-col items-center">
                    <Lottie className="size-64" animationData={cancelLottieAnimation} loop={true} />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mt-4">
                        {payment_pages?.title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                        {payment_pages?.message}
                    </p>
                </div>

                <div className="flex justify-center">
                    <Link href="/dashboard/subscription">
                        <Button className='bg-purple-700 hover:bg-purple-600' ><CreditCard /> Subscription</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}

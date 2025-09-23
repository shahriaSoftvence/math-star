"use client";

import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import cancelLottieAnimation from "../../../../public/Error icon.json";
import Link from "next/link";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";

export default function CardError() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/#pricing");
        }, 10000);

        return () => clearTimeout(timer);
    }, [router]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <Card className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="flex flex-col items-center">
                    <Lottie className="size-64" animationData={cancelLottieAnimation} loop={true} />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">
                        Payment Canceled
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                        Your payment was not completed. No charges have been made to your account.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <Link href="/#pricing">
                        <Button variant="default">Try Again</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}

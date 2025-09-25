"use client";

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import groovyWalkAnimation from '../../../../public/Success.json'
import { useRouter } from 'next/navigation';

export default function CardSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/subscription");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <Lottie animationData={groovyWalkAnimation} loop={true} />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">
            Card Added
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
            Your new payment method has been added successfully.
          </p>

        </div>
        <div className="flex justify-center">
          <Link href="/dashboard/subscription">
            <Button className='bg-purple-700 hover:bg-purple-600' ><CreditCard /> Subscription</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

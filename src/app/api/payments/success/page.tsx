"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful ✅
      </h1>
      <p className="mt-4">Thank you for your purchase!</p>
      <Link href={`${process.env.NEXT_PUBLIC_APP_URL}`}>
        <button className="px-5 py-2 rounded border font-semibold">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

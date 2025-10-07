import { Check } from 'lucide-react';
import React from 'react';
import { IoStar } from "react-icons/io5";
import PricingBtn from './PricingBtn';
import { Plan } from '../../../../type/subscription';
import Link from 'next/link';


const pricingFeatures = [
    // "Access to all Math Exercises",
    // "Reward System",
    // "Access to all Challenges",
    // "Monthly Cancellation"
    "Full Access to All Math Exercises",
    "To experience All the challenges",
    "Enjoyable Rewards and Achievements",
    "Flexible Monthly Cancellation"
];

const PricingSection = async () => {

    const url = `${process.env.NEXT_PUBLIC_BASE_API}plan-list/`;
    const res = await fetch(url);
    const text = await res.text();
    let planLists;
    try {
        planLists = JSON.parse(text);
    } catch {
        throw new Error("API did not return valid JSON");
    }


    return (
        <section id="pricing" className="py-24 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
                <div className="text-center max-w-3xl">
                    <h2 className="text-gray-800 text-2xl md:text-4xl font-bold font-Quicksand leading-10">Our pricing policy</h2>
                    <p className="text-gray-600 text-base md:text-xl font-normal font-Open_Sans leading-7 mt-4">
                        Money is not our motivation! Therefore, we want to make Math Star accessible to everybody at the lowest price possible.
                    </p>
                </div>
                <div
                    className="w-full max-w-md mt-12">

                    {
                        planLists?.data?.map((plan: Plan) => <div key={plan?.id} className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col gap-6 hover:scale-103 transition-transform">
                            <div className="flex justify-between items-start">
                                <h3 className="text-gray-800 text-2xl font-bold font-Quicksand leading-loose capitalize">
                                    {/* {plan?.plan_name} */}
                                    Math Star Plan
                                </h3>
                                <div className="w-9 h-9  rounded-full flex items-center justify-center">
                                    <IoStar size={38} className="fill-yellow-500" />
                                </div>
                            </div>
                            <div className="flex items-end gap-1">
                                <p className="text-gray-800 text-4xl font-bold font-Open_Sans leading-10">$ {plan?.price}</p>
                                <p className="text-gray-600 text-base font-normal font-Open_Sans leading-normal">/month</p>
                            </div>
                            <div className="space-y-4 my-1.5">
                                {pricingFeatures.map(feature => (
                                    <div key={feature} className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                            <Check size={12} className="text-white" />
                                        </div>
                                        <p className="text-gray-600 text-base font-normal font-Open_Sans leading-normal">{feature}</p>
                                    </div>
                                ))}
                            </div>
                            <PricingBtn planId={plan?.id} />
                        </div>)
                    }

                    <div className="text-center mt-8">
                        <p className="text-gray-600 text-base font-normal font-Open_Sans leading-normal">No credit card required to start.</p>
                        <p className="text-gray-600 text-base font-normal font-Open_Sans leading-normal">
                            Have questions? <Link className="text-blue-500 hover:text-blue-600" href="/contact">Contact Our Team</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
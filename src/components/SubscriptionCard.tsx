import { Calendar, Crown } from 'lucide-react'
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import Link from 'next/link'
import { useCancelSubscriptionMutation, useGetUserActivePlanQuery } from '@/Redux/features/subscription/subscriptionApi'
import { toast } from 'sonner'
import moment from 'moment'
import { useIsPremium } from '@/Redux/hooks'
import { useDictionary } from '@/hook/useDictionary'

export default function SubscriptionCard() {
    const [cancelSubscription, { isLoading: cancelLoading }] = useCancelSubscriptionMutation();
    const { data: activePlan } = useGetUserActivePlanQuery();
    const isPremium = useIsPremium();
    const userActivePlan = activePlan?.data?.[0];

    const { dictionary, loading } = useDictionary();
    const subscription_card = dictionary?.subscription_card;

    if (!subscription_card || loading) {
        return null;
    }
    const handleCancelSubscription = async () => {
        try {
            const res = await cancelSubscription({}).unwrap();
            toast.success(res?.message || "Subscription cancelled successfully");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to cancel subscription";
            toast.error(message);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl shadow-lg text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Crown size={32} className="text-yellow-300" />
                    <div>
                        <h2 className="text-xl font-bold font-Nunito">
                            {subscription_card?.title}
                        </h2>
                        <p className="text-purple-100 font-Nunito capitalize font-medium">{isPremium ? (
                            <>
                                {userActivePlan?.plan_name} {userActivePlan?.is_trial && "/ Free Trial"}
                            </>
                        ) : (
                            subscription_card?.no_plan
                        )}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                    {
                        isPremium && <div className="flex items-center gap-2 text-sm text-purple-100 font-Nunito">
                            <Calendar size={16} />
                            <span>{subscription_card?.renews_on} {userActivePlan?.end_date
                                ? moment(userActivePlan.end_date).format("Do MMM, YYYY")
                                : "N/A"}</span>
                        </div>
                    }
                    {
                        isPremium ? <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant={"outline"} className="text-red-500 hover:text-red-600">{subscription_card?.actions?.cancel_subscription}</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{subscription_card?.cancel_dialog?.title}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {subscription_card?.cancel_dialog?.description}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>{subscription_card?.cancel_dialog?.cancel}</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-700 hover:bg-red-600"
                                        onClick={handleCancelSubscription}>{cancelLoading ? subscription_card?.actions?.loading : subscription_card?.cancel_dialog?.confirm}</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog> : <Link href="/#pricing"><button
                            className="px-3 py-2 bg-white text-red-500 text-sm font-medium font-Nunito rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50">
                            {subscription_card?.actions?.buy_subscription}
                        </button></Link>
                    }
                </div>
            </div>
        </div>
    )
}

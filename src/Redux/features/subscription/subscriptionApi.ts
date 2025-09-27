import { BillingHistoryResponse, PaymentMethod, PlanResponse, UserActivePlan } from "../../../../type/subscription";
import { baseApi } from "../../api/baseApi";


const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all available plans
    getPlans: builder.query<PlanResponse, void>({
      query: () => ({
        url: "/plan-list/",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    // Get user's active plan
    getUserActivePlan: builder.query<UserActivePlan, void>({
      query: () => ({
        url: "/user-active-plan/",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    // Create a subscription
    createSubscription: builder.mutation({
      query: (planId: number) => ({
        url: `/create-subscription/?plan_id=${planId}`,
        method: "GET",
      }),
      invalidatesTags: ["Subscription"],
    }),

    // Cancel subscription
    cancelSubscription: builder.mutation({
      query: () => ({
        url: "/subscription-cancel/",
        method: "POST",
      }),
      // keep these so normal invalidation still applies
      invalidatesTags: ["Subscription", "auth"],
    }),

    getPaymentMethods: builder.query<PaymentMethod, void>({
      query: () => ({
        url: "/payment-method/",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    getBillingHistory: builder.query<BillingHistoryResponse, void>({
      query: () => ({
        url: "/billing-history/",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),


    addPaymentMethod: builder.mutation({
      query: (paymentMethodData) => ({
        url: "/add-card/",
        method: "POST",
        body: paymentMethodData,
      }),
      invalidatesTags: ["Subscription"],
    }),

    removeCard: builder.mutation({
      query: (payment_method_id) => ({
        url: "/remove-card/",
        method: "POST",
        body: { payment_method_id },
      }),
      invalidatesTags: ["Subscription"],
    }),


    // Renew subscription now
    renewSubscription: builder.mutation({
      query: () => ({
        url: "/renew-now/",
        method: "POST",
      }),
      invalidatesTags: ["Subscription", "auth"],
    }),
    autoRenewSubscription: builder.mutation({
      query: () => ({
        url: "/toggle-auto-renewal/",
        method: "POST",
      }),
      invalidatesTags: ["Subscription"],
    }),

    // Webhook endpoint
    webhook: builder.mutation({
      query: (webhookData) => ({
        url: "/webhook/",
        method: "POST",
        body: webhookData,
      }),
      invalidatesTags: ["Subscription", "auth"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetUserActivePlanQuery,
  useCreateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
  useRenewSubscriptionMutation,
  useWebhookMutation,
  useAutoRenewSubscriptionMutation,
  useGetBillingHistoryQuery,
  useRemoveCardMutation
} = subscriptionApi;
import { baseApi } from "../../api/baseApi";

interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
}

interface UserActivePlan {
  id: number;
  plan: Plan;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_recurring: boolean;
}

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all available plans
    getPlans: builder.query<Plan[], void>({
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
      invalidatesTags: ["Subscription"],
    }),

    // Get payment methods
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => ({
        url: "/payment-method/",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    // Add a new payment method
    addPaymentMethod: builder.mutation({
      query: (paymentMethodData) => ({
        url: "/add-card/",
        method: "POST",
        body: paymentMethodData,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // Renew subscription now
    renewSubscription: builder.mutation({
      query: () => ({
        url: "/renew-now/",
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
} = subscriptionApi;
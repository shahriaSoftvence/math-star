import { baseApi } from "@/Redux/api/baseApi";

const rewardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRewards: builder.query({
            query: () => ({
                url: "/rewards/",
                method: "GET",
            }),
            providesTags: ["rewards"],
        }),
        // Add this new endpoint to fetch all dashboard data at once
        getDailySummary: builder.query({
            query: () => ({
                url: "/daily-summary/", // Assuming this endpoint exists from your backend setup
                method: "GET",
            }),
            providesTags: ["rewards"],
        }),
    }), 
});


export const { useGetRewardsQuery, useGetDailySummaryQuery } = rewardApi;
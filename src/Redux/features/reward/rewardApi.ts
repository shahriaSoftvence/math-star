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
    }), 
});


export const { useGetRewardsQuery } = rewardApi;
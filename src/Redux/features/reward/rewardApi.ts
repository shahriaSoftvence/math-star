import { baseApi } from "@/Redux/api/baseApi";
import { AchievementsResponse } from "../../../../type/practise";

const rewardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRewards: builder.query({
        query: () => ({
            url: "/rewards/",
            method: "GET",
        }),
        providesTags: ["rewards"],
        }),

        getMyAchievements: builder.query<AchievementsResponse, void>({
        query: () => ({
            url: "/my-achievements/",
            method: "GET",
        }),
        providesTags: ["rewards"],
        }),
    }), 
});


export const { useGetRewardsQuery, useGetMyAchievementsQuery } = rewardApi;
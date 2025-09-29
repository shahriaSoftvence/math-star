import { baseApi } from "@/Redux/api/baseApi";
import { ProgressResponse } from "../../../type/progress";

const rewardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRewards: builder.query({
            query: () => ({
                url: "/rewards/",
                method: "GET",
            }),
            providesTags: ["rewards"],
        }),
        getProgress: builder.query<ProgressResponse, void>({
            query: () => ({
                url: "/progress-today/",
                method: "GET",
            }),
            providesTags: ["rewards", "Division", "Additions", "Multiplication", "Subtraction"],
        }),
    }), 
});


export const { useGetRewardsQuery, useGetProgressQuery } = rewardApi;
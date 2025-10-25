import { baseApi } from "@/Redux/api/baseApi";
import {
  AchievementsResponse,
  ProgressResponse,
} from "../../../../type/progress";

const rewardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRewards: builder.query({
      query: () => ({
        url: "/rewards/",
        method: "GET",
      }),
      providesTags: ["rewards"],
    }),
    getProgress: builder.query<ProgressResponse, string>({
      query: (lang) => {
        return {
          url: `/progress-today/?lang=${lang || "de"}`,
          method: "GET",
        };
      },
      providesTags: [
        "rewards",
        "Division",
        "Additions",
        "Multiplication",
        "Subtraction",
      ],
    }),

    getAchievement: builder.query<AchievementsResponse, void>({
      query: () => ({
        url: "/my-achievements/",
        method: "GET",
      }),
      providesTags: [
        "rewards",
        "Division",
        "Additions",
        "Multiplication",
        "Subtraction",
      ],
    }),
  }),
});

export const {
  useGetRewardsQuery,
  useGetProgressQuery,
  useGetAchievementQuery,
} = rewardApi;

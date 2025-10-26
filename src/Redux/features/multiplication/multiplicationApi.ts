import { baseApi } from "@/Redux/api/baseApi";
import { AdditionMultiplicationDivisionPayload, ChallengeTopScoresResponse } from "../../../../type/practise";

const multiplicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setMultiplication: builder.mutation<void, void>({
      query: () => ({
        url: "/practice/multiplication/",
        method: "POST",
      }),
      invalidatesTags: ["Multiplication"],
    }),

    addMultiplicationExercise: builder.mutation({
      query: (range_value: number[]) => ({
        url: "/practice/multiplication/no-carry/",
        method: "POST",
        body: { range_value },
      }),
      invalidatesTags: ["Multiplication"],
    }),

    addMultiplicationPractice: builder.mutation<void, AdditionMultiplicationDivisionPayload>({
      query: (data) => ({
        url: "/practice/multiplication/no-carry/questionset/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Multiplication"],
    }),

    addMultiplicationNoMistake: builder.mutation({
      query: (body) => ({
        url: "/practice/multiplication/challenge/no_mistake/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Multiplication"],
    }),

    addMultiplicationSpeedMode: builder.mutation({
      query: (body) => ({
        url: "/practice/multiplication/challenge/speed_mode/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Multiplication"],
    }),

    addMultiplication100Question: builder.mutation({
      query: (body) => ({
        url: "/practice/multiplication/challenge/100_questions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Multiplication"],
    }),

    addMultiplicationWhatsMissing: builder.mutation({
      query: (body) => ({
        url: "/practice/multiplication/challenge/whats_missing/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Multiplication"],
    }),

    getTopScoreMultiplication: builder.query<ChallengeTopScoresResponse, void>({
      query: () => ({
        url: "/challenge-top-scores/multiplication/",
        method: "GET",
      }),
      providesTags: ["Multiplication"],
    }),

  }),
});

export const {
  useSetMultiplicationMutation,
  useAddMultiplicationExerciseMutation,
  useAddMultiplicationPracticeMutation,
  useAddMultiplicationNoMistakeMutation,
  useAddMultiplicationSpeedModeMutation,
  useAddMultiplication100QuestionMutation,
  useAddMultiplicationWhatsMissingMutation,
  useGetTopScoreMultiplicationQuery,
} = multiplicationApi;

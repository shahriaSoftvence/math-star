import { baseApi } from "@/Redux/api/baseApi";
import { AdditionExercisePayload, ChallengeTopScoresResponse } from "../../../../type/practise";

const additionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setAddition: builder.mutation<void, void>({
      query: () => ({
        url: "/practice/addition/",
        method: "POST",
      }),
      invalidatesTags: ["Additions"],
    }),

    addNoCarryExercise: builder.mutation({
      query: (range_value: number) => ({
        url: "/practice/addition/no-carry/",
        method: "POST",
        body: { range_value },
      }),
      invalidatesTags: ["Additions"],
    }),

    addCarryExercise: builder.mutation({
      query: (range_value: number) => ({
        url: "/practice/addition/carry/",
        method: "POST",
        body: { range_value },
      }),
      invalidatesTags: ["Additions"],
    }),

    addNoCarryPractice: builder.mutation<void, AdditionExercisePayload>({
      query: (data) => ({
        url: "/practice/addition/no-carry/questionset/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Additions"],
    }),

    addCarryPractice: builder.mutation<void, AdditionExercisePayload>({
      query: (data) => ({
        url: "/practice/addition/carry/questionset/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Additions"],
    }),

    addAdditionNoMistake: builder.mutation({
      query: (body) => ({
        url: "/practice/addition/challenge/no_mistake/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Additions"],
    }),

    addAdditionSpeedMode: builder.mutation({
      query: (body) => ({
        url: "/practice/addition/challenge/speed_mode/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Additions"],
    }),

    addAddition100questions: builder.mutation({
      query: (body) => ({
        url: "/practice/addition/challenge/100_questions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Additions"],
    }),

    addAdditionWhatsMissing: builder.mutation({
      query: (body) => ({
        url: "/practice/addition/challenge/whats_missing/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Additions"],
    }),
    getTopScoreAddition: builder.query<ChallengeTopScoresResponse, void>({
      query: () => ({
        url: "/challenge-top-scores/addition/",
        method: "GET",
      }),
      providesTags: ["Additions"],
    }),
  }),
});

export const {
  useSetAdditionMutation,
  useAddAdditionNoMistakeMutation,
  useAddNoCarryExerciseMutation,
  useAddCarryExerciseMutation,
  useAddNoCarryPracticeMutation,
  useAddCarryPracticeMutation,
  useAddAdditionSpeedModeMutation,
  useAddAddition100questionsMutation,
  useAddAdditionWhatsMissingMutation,
  useGetTopScoreAdditionQuery
} = additionApi;

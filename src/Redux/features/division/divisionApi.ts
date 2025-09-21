import { baseApi } from "@/Redux/api/baseApi";
import { AdditionMultiplicationDivisionPayload } from "../../../../type/practise";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setDivision: builder.mutation<void, void>({
      query: () => ({
        url: "/practice/division/",
        method: "POST",
      }),
      invalidatesTags: ["Division"],
    }),

    addDivisionExercise: builder.mutation({
      query: (range_value: number[]) => ({
        url: "/practice/division/no-carry/",
        method: "POST",
        body: { range_value },
      }),
      invalidatesTags: ["Division"],
    }),

    addDivisionPractice: builder.mutation<void, AdditionMultiplicationDivisionPayload>({
      query: (data) => ({
        url: "/practice/division/no-carry/questionset/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Division"],
    }),

    addDivisionNoMistake: builder.mutation({
      query: (body) => ({
        url: "/practice/division/challenge/no_mistake/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Division"],
    }),

    addDivisionSpeedMode: builder.mutation({
      query: (body) => ({
        url: "/practice/division/challenge/speed_mode/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Division"],
    }),
    addDivision100Questions: builder.mutation({
      query: (body) => ({
        url: "/practice/division/challenge/100_questions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Division"],
    }),
    addDivisionWhatsMissing: builder.mutation({
      query: (body) => ({
        url: "/practice/division/challenge/whats_missing/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Division"],
    }),
  }),
});

export const {
  useSetDivisionMutation,
  useAddDivisionExerciseMutation,
  useAddDivisionPracticeMutation,
  useAddDivision100QuestionsMutation,
  useAddDivisionNoMistakeMutation,
  useAddDivisionSpeedModeMutation,
  useAddDivisionWhatsMissingMutation
} = divisionApi;

import { baseApi } from "@/Redux/api/baseApi";
import { AdditionExercisePayload } from "../../../../type/practise";

const subtractionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setSubtraction: builder.mutation<void, void>({
      query: () => ({
        url: "/practice/subtraction/",
        method: "POST",
      }),
      invalidatesTags: ["Subtraction"],
    }),

    addNoBorrowExercise: builder.mutation({
      query: (range_value: number) => ({
        url: "/practice/subtraction/no-carry/",
        method: "POST",
        body: { range_value },
      }),
      invalidatesTags: ["Subtraction"],
    }),

    addBorrowExercise: builder.mutation({
      query: (range_value: number) => ({
        url: "/practice/subtraction/carry/",
        method: "POST",
        body: { range_value },
      }),
      invalidatesTags: ["Subtraction"],
    }),

    addNoBorrowPractice: builder.mutation<void, AdditionExercisePayload>({
      query: (data) => ({
        url: "/practice/subtraction/no-carry/questionset/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subtraction"],
    }),

    addBorrowPractice: builder.mutation<void, AdditionExercisePayload>({
      query: (data) => ({
        url: "/practice/subtraction/carry/questionset/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subtraction"],
    }),

    addSubtractionNoMistake: builder.mutation({
      query: (data) => ({
        url: "/practice/subtraction/challenge/no_mistake/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subtraction"],
    }),

    addSubtractionSpeedMode: builder.mutation({
      query: (data) => ({
        url: "/practice/subtraction/challenge/speed_mode/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subtraction"],
    }),
    addSubtraction100Question: builder.mutation({
      query: (data) => ({
        url: "/practice/subtraction/challenge/100_questions/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subtraction"],
    }),
    addSubtractionWhatsMissing: builder.mutation({
      query: (data) => ({
        url: "/practice/subtraction/challenge/whats_missing/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subtraction"],
    }),
  }),
});

export const {
  useSetSubtractionMutation,
  useAddBorrowExerciseMutation,
  useAddNoBorrowExerciseMutation,
  useAddBorrowPracticeMutation,
  useAddNoBorrowPracticeMutation,
  useAddSubtractionNoMistakeMutation,
  useAddSubtractionSpeedModeMutation,
  useAddSubtraction100QuestionMutation,
  useAddSubtractionWhatsMissingMutation,
} = subtractionApi;

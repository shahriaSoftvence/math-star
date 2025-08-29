import { baseApi } from "@/Redux/api/baseApi";
import { AdditionExercisePayload } from "../../../../type/practise";

const additionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAdditionSettings: builder.mutation({
      query: (body) => ({
        url: "/practice/addition/no-carry/",
        method: "POST",
        body,
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
  }),
});

export const {
  useAddAdditionSettingsMutation,
  useAddAdditionNoMistakeMutation,
  useAddNoCarryExerciseMutation,
  useAddCarryExerciseMutation,
  useAddNoCarryPracticeMutation,
  useAddCarryPracticeMutation,
  useAddAdditionSpeedModeMutation,
  useAddAddition100questionsMutation,
    useAddAdditionWhatsMissingMutation,
} = additionApi;

import { baseApi } from "@/Redux/api/baseApi";

const multiplicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setMultiplication: builder.mutation<void, void>({
      query: () => ({
        url: "/practice/multiplication/",
        method: "POST",
      }),
      invalidatesTags: ["Multiplication"],
    }),

    
  }),
});

export const {
    useSetMultiplicationMutation
} = multiplicationApi;

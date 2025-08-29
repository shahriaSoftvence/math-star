import { baseApi } from "@/Redux/api/baseApi";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setDivision: builder.mutation<void, void>({
      query: () => ({
        url: "/practice/division/",
        method: "POST",
      }),
      invalidatesTags: ["Division"],
    }),

    
  }),
});

export const {
    useSetDivisionMutation
} = divisionApi;

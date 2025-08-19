
import { baseApi } from "../../api/baseApi";

const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all jobs
        getAllJobs: builder.query({
            query: () => ({
                url: '/jobs',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['jobs'],
        }),

        // Get single job
        getSingleJob: builder.query({
            query: (id: string) => ({
                url: `/jobs/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['jobs'],
        }),

        // Create job (admin only)
        createJob: builder.mutation({
            query: (jobData) => ({
                url: '/jobs/create-job',
                method: 'POST',
                body: jobData,
            }),
            invalidatesTags: ['jobs'],
        }),

        // Update job (admin only)
        updateJob: builder.mutation({
            query: ({ id, data }) => ({
                url: `/jobs/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['jobs'],
        }),

        // Delete job (admin only)
        deleteJob: builder.mutation({
            query: (id: string) => ({
                url: `/jobs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['jobs'],
        }),
    }),
});

export const {
    useGetAllJobsQuery,
    useGetSingleJobQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
} = jobsApi;

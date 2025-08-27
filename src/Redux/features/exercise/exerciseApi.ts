import { baseApi } from "../../api/baseApi";

interface PracticeCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface PracticeSession {
  id: number;
  category: number;
  mode: string;
  correct: number;
  total: number;
  stars_earned: number;
  duration_seconds: number;
  created_at: string;
}

interface DailyGoal {
  id: number;
  goal_minutes: number;
  minutes_done: number;
  date: string;
}

interface SessionResult {
  id: number;
  session: number;
  correct_answers: number;
  total_questions: number;
  stars_earned: number;
  duration: number;
  created_at: string;
}

const exerciseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all practice categories
    getPracticeCategories: builder.query<PracticeCategory[], void>({
      query: () => ({
        url: "/practice-categories/",
        method: "GET",
      }),
      providesTags: ["Exercise"],
    }),

    // Add a new practice category
    addPracticeCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/practice-categories/",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Exercise"],
    }),

    // Get all practice sessions
    getPracticeSessions: builder.query<PracticeSession[], void>({
      query: () => ({
        url: "/practice-sessions/",
        method: "GET",
      }),
      providesTags: ["Exercise"],
    }),

    // Add a new practice session
    addPracticeSession: builder.mutation({
      query: (sessionData) => ({
        url: "/practice-sessions/",
        method: "POST",
        body: sessionData,
      }),
      invalidatesTags: ["Exercise"],
    }),

    // Get daily goal
    getDailyGoal: builder.query<DailyGoal, void>({
      query: () => ({
        url: "/daily-goal/",
        method: "GET",
      }),
      providesTags: ["Exercise"],
    }),

    // Update daily goal
    updateDailyGoal: builder.mutation({
      query: (goalData) => ({
        url: "/daily-goal/",
        method: "PUT",
        body: goalData,
      }),
      invalidatesTags: ["Exercise"],
    }),

    // Get session results
    getSessionResults: builder.query<SessionResult, number>({
      query: (sessionId) => ({
        url: `/session-results/${sessionId}/`,
        method: "GET",
      }),
      providesTags: ["Exercise"],
    }),
  }),
});

export const {
  useGetPracticeCategoriesQuery,
  useAddPracticeCategoryMutation,
  useGetPracticeSessionsQuery,
  useAddPracticeSessionMutation,
  useGetDailyGoalQuery,
  useUpdateDailyGoalMutation,
  useGetSessionResultsQuery,
} = exerciseApi;
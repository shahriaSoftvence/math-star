import { UserData, UserResponse } from "../../../../type/userType";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/signin/",
        method: "POST",
        body: userInfo,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.success) {
            // Store tokens in localStorage - updated to match new API structure
            if (typeof window !== "undefined") {
              localStorage.setItem("accessToken", data?.data?.tokens?.access);
              localStorage.setItem("refreshToken", data?.data?.tokens?.refresh);
              // Also store in cookies for middleware
              document.cookie = `accessToken=${
                data?.data?.tokens?.access
              }; path=/; max-age=${60 * 60 * 24 * 7}`;
              document.cookie = `refreshToken=${
                data?.data?.tokens?.refresh
              }; path=/; max-age=${60 * 60 * 24 * 7}`;
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["auth"],
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "/api/auth/refresh-token/",
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.success) {
            if (typeof window !== "undefined") {
              localStorage.setItem("accessToken", data?.data?.tokens?.access);
              localStorage.setItem("refreshToken", data?.data?.tokens?.refresh);
              // Also store in cookies for middleware
              document.cookie = `accessToken=${
                data?.data?.tokens?.access
              }; path=/; max-age=${60 * 60 * 24 * 7}`;
              document.cookie = `refreshToken=${
                data?.data?.tokens?.refresh
              }; path=/; max-age=${60 * 60 * 24 * 7}`;
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/api/auth/logout/",
        method: "POST",
      }),
    }),

    // User registration
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/signup/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    // OTP verification for registration
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/signup/verify-otp/",
        method: "POST",
        body: otpData,
      }),
      invalidatesTags: ["users"],
    }),

    // Resend OTP
    resendOtp: builder.mutation({
      query: (emailData: { email: string }) => ({
        url: "/resend-otp/",
        method: "POST",
        body: emailData,
      }),
    }),

    // Signup celery check
    signupCeleryCheck: builder.query({
      query: () => ({
        url: "/signup-celery-check/",
        method: "GET",
      }),
    }),

    // Get user profile
    getProfile: builder.query<UserResponse, void>({
      query: () => ({
        url: "/profile/",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    updateProfile: builder.mutation<UserResponse, Partial<UserData> | FormData>(
      {
        query: (body) => {
          const isFormData = body instanceof FormData;
          return {
            url: "/profile/",
            method: "PUT",
            body,
            headers: !isFormData
              ? { "Content-Type": "application/json" }
              : undefined,
          };
        },
        invalidatesTags: ["auth"],
      }
    ),

    // Change password
    changePassword: builder.mutation({
      query: (passwordData: {
        old_password: string;
        new_password: string;
        confirm_password: string;
      }) => ({
        url: "/change-password/",
        method: "PUT",
        body: passwordData,
      }),
      invalidatesTags: ["auth"],
    }),

    // Request password reset
    requestPasswordReset: builder.mutation({
      query: (data: { email: string }) => ({
        url: "/password-reset/request/",
        method: "POST",
        body: data,
      }),
    }),

    // Verify OTP for password reset
    verifyOtpForReset: builder.mutation({
      query: (data: { email: string; otp: string }) => ({
        url: "/password-reset/verify-otp/",
        method: "POST",
        body: data,
      }),
    }),

    // Change password with reset token
    changePasswordWithResetToken: builder.mutation({
      query: (data: {
        reset_token: string;
        email: string;
        new_password: string;
        confirm_password: string;
      }) => ({
        url: "/password-reset/change-password/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useSignupCeleryCheckQuery,
  useGetProfileQuery,
  useChangePasswordMutation,
  useRequestPasswordResetMutation,
  useVerifyOtpForResetMutation,
  useChangePasswordWithResetTokenMutation,
  useUpdateProfileMutation,
} = authApi;

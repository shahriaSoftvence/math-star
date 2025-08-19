
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.success) {
                        // Store tokens in localStorage
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('accessToken', data?.data?.accessToken);
                            localStorage.setItem('refreshToken', data?.data?.refreshToken);
                            // Also store in cookies for middleware
                            document.cookie = `accessToken=${data?.data?.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
                            document.cookie = `refreshToken=${data?.data?.refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
                        }
                    }
                } catch (error) {
                   console.log(error);
                }
            },
            invalidatesTags: ['auth'],
        }),
        
        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'POST',
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.success) {
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('accessToken', data?.data?.accessToken);
                            localStorage.setItem('refreshToken', data?.data?.refreshToken);
                            // Also store in cookies for middleware
                            document.cookie = `accessToken=${data?.data?.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
                            document.cookie = `refreshToken=${data?.data?.refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
                        }
                    }
                } catch (error) {
                   console.log(error);
                }
            },
        }),

        logout: builder.mutation<{ success: boolean; message: string }, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),

        // User registration
        register: builder.mutation({
            query: (userInfo) => ({
                url: '/signup/',
                method: 'POST',
                body: userInfo,
            }),
            invalidatesTags: ['users'],
        }),

        // OTP verification for registration
        verifyOtp: builder.mutation({
            query: (otpData) => ({
                url: '/signup/verify-otp/',
                method: 'POST',
                body: otpData,
            }),
            invalidatesTags: ['users'],
        }),
       
    }),
})

export const { 
    useLoginMutation, 
    useRefreshTokenMutation,
    useLogoutMutation,
    useRegisterMutation,
    useVerifyOtpMutation
} = authApi;

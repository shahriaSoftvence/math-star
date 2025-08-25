import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { toast } from "sonner";
import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API || "http://127.0.0.1:8000",
  credentials: "include",
  prepareHeaders: (headers) => {
    // Get token from localStorage for client-side requests
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('accessToken');
    }
    
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// token expired hola new refresh token generate code
const baseQueryWithRefreshToken: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 404) {
    const errorData = result.error.data as { message?: string };
    toast.error(errorData?.message || 'Not found');
  }
  if (result?.error?.status === 403) {
    const errorData = result.error.data as { message?: string };
    toast.error(errorData?.message || 'Forbidden');
  }
  if (result?.error?.status === 401) {
    // Check if we're in the middle of a logout process
    const isLoggingOut = localStorage.getItem('isLoggingOut') === 'true';
    
    if (isLoggingOut) {
      // If we're logging out, don't try to refresh the token
      api.dispatch(logout());
      return result;
    }
    
    // Check if we're already trying to refresh a token
    const isRefreshing = localStorage.getItem('isRefreshing') === 'true';
    
    if (isRefreshing) {
      // If we're already refreshing, just return the original result
      return result;
    }
    
    // Check if we have a refreshToken in localStorage (client-side check)
    const hasRefreshToken = localStorage.getItem('refreshToken');
    
    if (!hasRefreshToken) {
      // No refresh token available, logout immediately
      api.dispatch(logout());
      return result;
    }
    
    try {
      // Set flag to prevent multiple simultaneous refresh attempts
      if (typeof window !== 'undefined') {
        localStorage.setItem('isRefreshing', 'true');
      }
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API || 'http://127.0.0.1:8000'}/api/auth/refresh-token/`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data?.data?.tokens?.access) {
        // Store the new token in localStorage - updated for new API structure
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', data.data.tokens.access);
          // Also update refreshToken if it's returned
          if (data.data.tokens.refresh) {
            localStorage.setItem('refreshToken', data.data.tokens.refresh);
          }
        }

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch (error) {
      console.error('Refresh token error:', error);
      api.dispatch(logout());
    } finally {
      // Clear the refreshing flag
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isRefreshing');
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["users", "jobs", "jobApplications", "auth", "rewards"],
  endpoints: () => ({}),
});

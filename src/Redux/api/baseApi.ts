import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
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
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// token expired hola new refresh token generate code
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => { // eslint-disable-line @typescript-eslint/no-explicit-any
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 404) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast.error((result?.error?.data as any)?.message);
  }
  if (result?.error?.status === 403) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast.error((result?.error?.data as any)?.message);
  }
  if (result?.error?.status === 401) {
    // Check if we're in the middle of a logout process
    const isLoggingOut = localStorage.getItem('isLoggingOut') === 'true';
    
    if (isLoggingOut) {
      // If we're logging out, don't try to refresh the token
      api.dispatch(logout());
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API || 'http://127.0.0.1:8000'}/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data?.data?.accessToken) {
        // Store the new token in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', data.data.accessToken);
          // Also update refreshToken if it's returned
          if (data.data.refreshToken) {
            localStorage.setItem('refreshToken', data.data.refreshToken);
          }
        }

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch (error) {
      console.error('Refresh token error:', error);
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["users", "jobs", "jobApplications", "auth"],
  endpoints: () => ({}),
});

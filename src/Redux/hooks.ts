import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useGetProfileQuery } from "./features/auth/authApi";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom auth hooks
export const useAuth = () => {
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
  
  return {
    user,
    token,
    isAuthenticated,
    isLoggedIn: !!token && !!user,
  };
};

export const useAuthActions = () => {
  const dispatch = useAppDispatch();
  
  return {
    setUser: (userData: { user: { id?: string; email: string; name?: string; profile_pic?: string | null; stars?: number; starStreak?: string; avatarUrl?: string }; token: string }) => 
      dispatch({ type: 'auth/setUser', payload: userData }),
    logout: () => dispatch({ type: 'auth/logout' }),
    updateUser: (userData: Partial<{ id?: string; email: string; name?: string; profile_pic?: string | null; stars?: number; starStreak?: string; avatarUrl?: string }>) => 
      dispatch({ type: 'auth/updateUser', payload: userData }),
    setToken: (token: string) => 
      dispatch({ type: 'auth/setToken', payload: token }),
    clearAuth: () => dispatch({ type: 'auth/clearAuth' }),
    setAuthenticated: (isAuth: boolean) => 
      dispatch({ type: 'auth/setAuthenticated', payload: isAuth }),
    setProfile: (profileData: { id?: string; email: string; name?: string; profile_pic?: string | null; stars?: number; starStreak?: string; avatarUrl?: string }) => 
      dispatch({ type: 'auth/setProfile', payload: profileData }),
  };
};

export const useIsPremium = ()=> {
  // Always call the hook
  const { data } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  return data?.data?.is_premium;
};


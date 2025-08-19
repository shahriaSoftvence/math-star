import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"

interface AuthState {
    user: any | null
    token: string | null
}

const initialState: AuthState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: any; token: string }>) => {
           const { user, token } = action.payload
           state.user = user
           state.token = token
        },
        logout: (state) => {
            state.user = null
            state.token = null
            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                // Clear all possible auth-related items
                localStorage.removeItem('user')
                localStorage.removeItem('auth')
                localStorage.removeItem('isLoggingOut')
                
                // Clear all cookies with proper domain and path
                const cookieNames = ['accessToken', 'refreshToken', 'auth', 'user'];
                const domains = ['', window.location.hostname, `.${window.location.hostname}`];
                const paths = ['/', '/api', '/auth', ''];
                
                cookieNames.forEach(name => {
                    domains.forEach(domain => {
                        paths.forEach(path => {
                            const domainPart = domain ? `; domain=${domain}` : '';
                            const pathPart = path ? `; path=${path}` : '';
                            document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainPart}`;
                            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainPart}${pathPart}`;
                        });
                    });
                });
                
                // Clear sessionStorage as well
                sessionStorage.clear()
                
                // Clear redux-persist storage
                localStorage.removeItem('persist:root')
                localStorage.removeItem('persist:auth')
            }
        },
        updateUser: (state, action: PayloadAction<Partial<any>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }
            }
        },
    },
})

export const { setUser, logout, updateUser } = authSlice.actions
export default authSlice.reducer
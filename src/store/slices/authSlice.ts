import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthRole = "user" | "vendor" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  role: AuthRole;
  name?: string | null;
};

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Set authenticated user and token after a successful login/signup.
     */
    setCredentials(
      state,
      action: PayloadAction<{ user: AuthUser; token: string | null }>,
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    /**
     * Clear all auth information on logout.
     */
    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;

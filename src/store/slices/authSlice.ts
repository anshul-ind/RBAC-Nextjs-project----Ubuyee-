import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  isLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // Application assumes it's loading auth until hydrated
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
      state.isLoading = false;
    },

    /**
     * Clear all auth information on logout or hydration failure.
     */
    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    });
  },
});

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("/api/auth/logout");
  } catch (err) {
    console.error("Logout failed:", err);
  }
});

export const { setCredentials, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;

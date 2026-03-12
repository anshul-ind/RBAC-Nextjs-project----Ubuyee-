import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export type AuthRole = "user" | "vendor" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  role: AuthRole;
  name?: string | null;
};

export type AuthState = {
  user: AuthUser | null;
  role: AuthRole | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  role: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

/**
 * Thunk to hydrate auth state from the session cookie.
 */
export const hydrateAuthThunk = createAsyncThunk(
  "auth/hydrate",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      if (!res.ok) {
        return rejectWithValue("Not authenticated");
      }
      const data = await res.json();
      return data.data; // returns { id, name, email, role }
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

/**
 * Thunk to handle login and set user state immediately.
 */
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string; portalOrigin: AuthRole },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.error ?? "Login failed");
      }
      return data.user || data.data; 
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (
    credentials: { name: string; email: string; password: string; role: AuthRole },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.error ?? "Signup failed");
      }
      return data.user || data.data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: AuthUser; token: string | null }>,
    ) {
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearAuth(state) {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Hydrate
      .addCase(hydrateAuthThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(hydrateAuthThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.role = action.payload.role;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(hydrateAuthThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
      })
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.role;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Signup
      .addCase(signupThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.role;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.role = null;
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
export const selectAuth = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;

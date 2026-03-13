import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ── Per-role dashboard stat shapes ────────────────────────────────────────────
// These types mirror the `data` field returned by each /api/dashboard/* route.

/** Stats returned by GET /api/dashboard/user */
export interface UserDashboardData {
  stats: {
    totalOrders: number;
    activeSubscriptions: number;
  };
}

/** Stats returned by GET /api/dashboard/vendor */
export interface VendorDashboardData {
  stats: {
    totalSales: number;
    activeProducts: number;
  };
}

/** Stats returned by GET /api/dashboard/admin */
export interface AdminDashboardData {
  stats: {
    totalUsers: number;
    totalVendors: number;
  };
}

/** Union of all possible dashboard payloads (null = not yet loaded) */
export type DashboardData =
  | UserDashboardData
  | VendorDashboardData
  | AdminDashboardData
  | null;

export interface DashboardState {
  data: DashboardData;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    /**
     * Start loading dashboard data.
     */
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },

    /**
     * Dashboard data successfully loaded.
     */
    setDashboardData(state, action: PayloadAction<DashboardData>) {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    /**
     * Dashboard loading failed.
     */
    setDashboardError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    /**
     * Clear dashboard state (e.g. on logout).
     */
    resetDashboard(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { startLoading, setDashboardData, setDashboardError, resetDashboard } =
  dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;

/**
 * UserDashboardClient — client component for /user/dashboard
 *
 * This is a "client island" — it lives inside the server-rendered dashboard
 * page and is responsible for:
 *  1. Reading auth state from Redux (who is logged in)
 *  2. Fetching /api/dashboard/user on mount
 *  3. Dispatching Redux actions: startLoading → setDashboardData | setDashboardError
 *  4. Rendering StatsCards from the API response
 *  5. Showing a loading skeleton while the request is in-flight
 *  6. Showing an error message if the request fails
 */
"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  startLoading,
  setDashboardData,
  setDashboardError,
} from "@/store/slices/dashboardSlice";
import type { UserDashboardData } from "@/store/slices/dashboardSlice";
import { StatsCard } from "@/components/shared/dashboard/StatsCard";
import axios from "axios";

export function UserDashboardClient() {
  const dispatch = useAppDispatch();

  // Read dashboard and auth state from the Redux store
  const { data, isLoading, error } = useAppSelector((s) => s.dashboard);
  const user = useAppSelector((s) => s.auth.user);

  // ── Fetch dashboard data on mount ────────────────────────────────────────
  useEffect(() => {
    // Signal to the store that we started loading
    dispatch(startLoading());

    axios
      .get("/api/dashboard/user")
      .then(({ data: res }) => {
        // Store the `data` field from the API response in Redux
        dispatch(setDashboardData(res.data));
      })
      .catch((err) => {
        // Store the error message so the UI can surface it
        const msg =
          axios.isAxiosError(err)
            ? err.response?.data?.error ?? "Failed to load dashboard."
            : "An unexpected error occurred.";
        dispatch(setDashboardError(msg));
      });
  }, [dispatch]); // only runs once on mount (dispatch is stable)

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <p style={{ color: "#f97316", fontSize: "0.9rem" }}>
        Loading dashboard…
      </p>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <p style={{ color: "#f87171", fontSize: "0.9rem" }}>⚠ {error}</p>
    );
  }

  // Cast to the user-specific type after the null check
  const stats = (data as UserDashboardData | null)?.stats;

  // ── Success state ─────────────────────────────────────────────────────────
  return (
    <section>
      {/* Stats grid — two cards from /api/dashboard/user */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <StatsCard
          title="Total Orders"
          value={stats?.totalOrders ?? "—"}
          subtitle="All time purchases"
        />
        <StatsCard
          title="Active Subscriptions"
          value={stats?.activeSubscriptions ?? "—"}
          subtitle="Currently active plans"
        />
      </div>
    </section>
  );
}

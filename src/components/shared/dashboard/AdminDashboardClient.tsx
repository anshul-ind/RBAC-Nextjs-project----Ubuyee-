/**
 * AdminDashboardClient — client component for /admin/dashboard
 *
 * Fetches GET /api/dashboard/admin on mount, dispatches Redux actions,
 * and renders admin-specific StatsCards (totalUsers, totalVendors).
 */
"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  startLoading,
  setDashboardData,
  setDashboardError,
} from "@/store/slices/dashboardSlice";
import type { AdminDashboardData } from "@/store/slices/dashboardSlice";
import { StatsCard } from "@/components/shared/dashboard/StatsCard";
import axios from "axios";

export function AdminDashboardClient() {
  const dispatch = useAppDispatch();

  // Read dashboard and auth state from the Redux store
  const { data, isLoading, error } = useAppSelector((s) => s.dashboard);
  const user = useAppSelector((s) => s.auth.user);

  // ── Fetch dashboard data on mount ────────────────────────────────────────
  useEffect(() => {
    dispatch(startLoading());

    axios
      .get("/api/dashboard/admin")
      .then(({ data: res }) => {
        dispatch(setDashboardData(res.data));
      })
      .catch((err) => {
        const msg =
          axios.isAxiosError(err)
            ? err.response?.data?.error ?? "Failed to load dashboard."
            : "An unexpected error occurred.";
        dispatch(setDashboardError(msg));
      });
  }, [dispatch]);

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
    return <p style={{ color: "#f87171", fontSize: "0.9rem" }}>⚠ {error}</p>;
  }

  const stats = (data as AdminDashboardData | null)?.stats;

  // ── Success state ─────────────────────────────────────────────────────────
  return (
    <section>
      {/* Welcome banner */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700, color: "#111827" }}>
          Admin Control Panel{user?.name ? ` — ${user.name}` : ""}
        </h1>
        <p style={{ margin: "0.3rem 0 0", fontSize: "1rem", color: "#6b7280" }}>
          Platform-wide stats and management
        </p>
      </div>

      {/* Stats grid — two cards from /api/dashboard/admin */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers ?? "—"}
          subtitle="Registered accounts"
        />
        <StatsCard
          title="Total Vendors"
          value={stats?.totalVendors ?? "—"}
          subtitle="Active seller accounts"
        />
      </div>
    </section>
  );
}

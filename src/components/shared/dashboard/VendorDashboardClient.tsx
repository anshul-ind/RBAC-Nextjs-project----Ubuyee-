/**
 * VendorDashboardClient — client component for /vendor/dashboard
 *
 * Fetches GET /api/dashboard/vendor on mount, dispatches Redux actions,
 * and renders vendor-specific StatsCards (totalSales, activeProducts).
 */
"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  startLoading,
  setDashboardData,
  setDashboardError,
} from "@/store/slices/dashboardSlice";
import type { VendorDashboardData } from "@/store/slices/dashboardSlice";
import { StatsCard } from "@/components/shared/dashboard/StatsCard";
import axios from "axios";

export function VendorDashboardClient() {
  const dispatch = useAppDispatch();

  // Read dashboard and auth state from the Redux store
  const { data, isLoading, error } = useAppSelector((s) => s.dashboard);
  const user = useAppSelector((s) => s.auth.user);

  // ── Fetch dashboard data on mount ────────────────────────────────────────
  useEffect(() => {
    dispatch(startLoading());

    axios
      .get("/api/dashboard/vendor")
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

  const stats = (data as VendorDashboardData | null)?.stats;

  // ── Success state ─────────────────────────────────────────────────────────
  return (
    <section>
      {/* Welcome banner */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700, color: "#111827" }}>
          Vendor Dashboard{user?.name ? ` — ${user.name}` : ""}
        </h1>
        <p style={{ margin: "0.3rem 0 0", fontSize: "1rem", color: "#6b7280" }}>
          Your sales performance overview
        </p>
      </div>

      {/* Stats grid — two cards from /api/dashboard/vendor */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <StatsCard
          title="Total Sales"
          value={`$${stats?.totalSales?.toLocaleString() ?? "—"}`}
          subtitle="Revenue to date"
        />
        <StatsCard
          title="Active Products"
          value={stats?.activeProducts ?? "—"}
          subtitle="Live listings"
        />
      </div>
    </section>
  );
}

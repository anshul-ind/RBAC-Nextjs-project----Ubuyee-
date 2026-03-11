"use client";

import { useAppSelector } from "@/store/hooks";
import { UserDashboardClient } from "@/components/shared/dashboard/UserDashboardClient";
import DealCarousel from "@/components/shared/dashboard/DealCarousel";
import InfoCards from "@/components/shared/dashboard/InfoCards";

export default function UserDashboardPage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "transparent",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Page content wrapper with generous padding */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "28px 32px" }}>
        {/* Welcome text section */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", margin: "0 0 8px 0" }}>
            Good morning, {user?.name || "Customer"} 👋
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Here is your overview
          </p>
        </div>

        {/* Carousel Section (padding: 0, margin-bottom: 48px) */}
        <div style={{ padding: 0, marginBottom: "48px", position: "relative" }}>
          <DealCarousel />
        </div>

        {/* InfoCards Section (margin-bottom: 40px) */}
        <div style={{ marginBottom: "40px" }}>
          <InfoCards />
        </div>

        {/* Stats cards row */}
        <UserDashboardClient />
        
        {/* Charts section spacer */}
        <div style={{ marginBottom: "32px" }} />
      </main>
    </div>
  );
}

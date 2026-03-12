"use client";

import { useAppSelector } from "@/store/hooks";
import DealCarousel from "@/components/shared/dashboard/DealCarousel";
import InfoCards from "@/components/shared/dashboard/InfoCards";
import BestProducts from "@/components/shared/dashboard/BestProducts";

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
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem 2rem" }}>
        {/* Welcome text section */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", margin: "0 0 8px 0" }}>
            Good morning, {user?.name || "Customer"} 👋
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Here is your overview
          </p>
        </div>

        {/* Carousel Section (margin-bottom: 2.5rem) */}
        <div style={{ marginBottom: "2.5rem" }}>
          <DealCarousel />
        </div>

        {/* InfoCards Section (margin-bottom: 2.5rem) */}
        <div style={{ marginBottom: "2.5rem" }}>
          <InfoCards />
        </div>

        {/* Best Products grid */}
        <BestProducts />
        
        {/* Extra space at bottom */}
        <div style={{ marginBottom: "2.5rem" }} />
      </main>
    </div>
  );
}

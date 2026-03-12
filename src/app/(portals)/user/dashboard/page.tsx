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
        paddingTop: "var(--nav-height)",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Page content wrapper with responsive spacing */}
      <main 
        style={{ 
          maxWidth: "var(--page-max-width)", 
          margin: "0 auto", 
          padding: "clamp(1rem, 4vw, 2.5rem)",
          width: "100%",
        }}
      >
        {/* Welcome text section */}
        <div style={{ marginBottom: "clamp(1rem, 3vw, 1.5rem)" }}>
          <h1 
            style={{ 
              fontSize: "clamp(1.25rem, 4vw, 1.875rem)", 
              fontWeight: 700, 
              color: "#111827", 
              margin: "0 0 8px 0" 
            }}
          >
            Good morning, {user?.name || "Customer"} 👋
          </h1>
          <p style={{ fontSize: "clamp(0.8rem, 2vw, 0.875rem)", color: "#6b7280", margin: 0 }}>
            Here is your overview
          </p>
        </div>

        {/* Carousel Section */}
        <div style={{ marginBottom: "clamp(1.5rem, 5vw, 2.5rem)" }}>
          <DealCarousel />
        </div>

        {/* InfoCards Section */}
        <div style={{ marginBottom: "clamp(1.5rem, 5vw, 2.5rem)" }}>
          <InfoCards />
        </div>

        {/* Best Products grid */}
        <BestProducts />
        
        {/* Extra space at bottom */}
        <div style={{ marginBottom: "clamp(1.5rem, 5vw, 2.5rem)" }} />
      </main>
    </div>
  );
}

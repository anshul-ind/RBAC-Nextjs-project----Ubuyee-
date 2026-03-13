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
        width: "100%",
        maxWidth: "var(--page-max-width)",
        margin: "0 auto",
        padding: "clamp(1rem, 3vw, 2rem)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Welcome text section */}
      <div style={{ marginBottom: "1rem" }}>
        <h1 
          style={{ 
            fontSize: "clamp(1.5rem, 5vw, 2.25rem)", 
            fontWeight: 600, 
            color: "#111827", 
            margin: "0 0 4px 0",
            letterSpacing: "-0.02em"
          }}
        >
          Good morning, {user?.name || "Customer"} 👋
        </h1>
        <p style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)", color: "#6b7280", margin: 0 }}>
          Here is your overview
        </p>
      </div>

      {/* Carousel Section */}
      <div 
        style={{ 
          width: "100%",
          maxWidth: "100%",
          marginBottom: "clamp(1.5rem, 4vw, 2.5rem)" 
        }}
      >
        <DealCarousel />
      </div>

      {/* InfoCards Section */}
      <div style={{ marginBottom: "clamp(1.5rem, 5vw, 2.5rem)" }}>
        <InfoCards />
      </div>

      {/* Best Products grid */}
      <BestProducts />
      
      {/* Spacer */}
      <div style={{ height: "2rem" }} />
    </div>
  );
}

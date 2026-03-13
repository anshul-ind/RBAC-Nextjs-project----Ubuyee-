"use client";

import { FiGrid } from "react-icons/fi";

const COLOR = "#3b82f6";

export default function ShopPage() {
  return (
    <div
      style={{
        padding: "clamp(1.5rem, 4vw, 2.5rem)",
        maxWidth: "var(--page-max-width)",
        margin: "0 auto",
        width: "100%",
        minHeight: "calc(100vh - var(--nav-height))",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
          marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid var(--color-100)",
        }}
      >
        <div
          style={{
            width: "2.75rem",
            height: "2.75rem",
            borderRadius: "var(--radius-xl)",
            background: COLOR + "15",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <FiGrid size={22} color={COLOR} />
        </div>
        <div>
          <h1
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 800,
              color: "var(--color-900)",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Shop
          </h1>
          <p
            style={{
              fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
              color: "var(--color-500)",
              margin: 0,
              marginTop: "0.2rem",
            }}
          >
            Browse all available products
          </p>
        </div>
      </div>

      {/* Coming Soon Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "40vh",
          background: "var(--color-0)",
          borderRadius: "var(--radius-2xl)",
          border: "1px solid var(--color-100)",
          padding: "clamp(2rem, 6vw, 4rem)",
          textAlign: "center",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          style={{
            width: "5rem",
            height: "5rem",
            borderRadius: "var(--radius-2xl)",
            background: COLOR + "15",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <FiGrid size={36} color={COLOR} />
        </div>
        <h2
          style={{
            fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
            fontWeight: 700,
            color: "var(--color-900)",
            marginBottom: "0.5rem",
          }}
        >
          Shop Coming Soon
        </h2>
        <p
          style={{
            fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
            color: "var(--color-500)",
            maxWidth: "360px",
            lineHeight: 1.6,
          }}
        >
          Our full product catalog is being set up. Check back soon for amazing
          deals.
        </p>
      </div>
    </div>
  );
}

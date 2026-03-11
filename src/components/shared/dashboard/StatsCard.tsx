"use client";

import React from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

/**
 * Task 3: Ubuyee StatsCard
 * White background, light border, soft shadow, and orange accents.
 */
export function StatsCard({ title, value, subtitle }: StatsCardProps) {
  const cardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    border: "1px solid #f3f4f6",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    color: "#6b7280", // Muted text
    marginBottom: "8px",
    fontWeight: 500,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#f97316", // Primary orange accent
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "0.8125rem",
    color: "#94a3b8",
    marginTop: "4px",
  };

  return (
    <section 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
      }}
    >
      <div style={titleStyle}>{title}</div>
      <div style={valueStyle}>{value}</div>
      {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
    </section>
  );
}

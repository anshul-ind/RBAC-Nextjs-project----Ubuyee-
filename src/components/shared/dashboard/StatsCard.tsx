"use client";

import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

/**
 * Task 3: Ubuyee StatsCard
 * White background, light border, soft shadow, and orange accents.
 */
export function StatsCard({ title, value, subtitle }: StatsCardProps) {
  const cardStyle: React.CSSProperties = {
    backgroundColor: "var(--color-0)",
    border: "1px solid var(--color-100)",
    borderRadius: "var(--radius-xl)",
    padding: "clamp(0.875rem, 3vw, 1.5rem)",
    boxShadow: "var(--shadow-sm)",
    transition: "transform 0.2s, box-shadow 0.2s",
    width: "100%",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(0.75rem, 2vw, 0.95rem)",
    color: "var(--color-500)",
    marginBottom: "clamp(0.25rem, 1vw, 0.5rem)",
    fontWeight: 500,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: "clamp(1.25rem, 4vw, 2rem)",
    fontWeight: 700,
    color: "var(--color-primary)",
    lineHeight: 1.1,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
    color: "var(--color-400)",
    marginTop: "4px",
  };

  return (
    <section 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      }}
    >
      <div style={titleStyle}>{title}</div>
      <div style={valueStyle}>{value}</div>
      {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
    </section>
  );
}

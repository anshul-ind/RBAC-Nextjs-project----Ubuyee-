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
    backgroundColor: "var(--color-0)",
    border: "1px solid var(--color-100)",
    borderRadius: "var(--radius-xl)",
    padding: "20px",
    boxShadow: "var(--shadow-sm)",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "var(--text-base)",
    color: "var(--color-500)",
    marginBottom: "8px",
    fontWeight: 500,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "var(--color-primary)",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "0.8125rem",
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

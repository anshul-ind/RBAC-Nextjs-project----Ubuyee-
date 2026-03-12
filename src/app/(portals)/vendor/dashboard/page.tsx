"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Edit2,
  ChevronDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/**
 * Task 4 & 6: Vendor Dashboard Page
 * Enterprise-grade overview with stats, products table, and charts.
 */

// Mock Data
const statsData = [
  { label: "Total Products", value: "48", trend: "+4 this week", icon: Package, color: "var(--primary-text)", bg: "var(--primary-bg)", trendColor: "#16a34a" },
  { label: "Total Sales", value: "312", trend: "+18.2% this month", icon: TrendingUp, color: "#22c55e", bg: "#f0fdf4", trendColor: "#16a34a" },
  { label: "Revenue", value: "₹28,400", trend: "+12.5% this month", icon: DollarSign, color: "#a855f7", bg: "#fdf4ff", trendColor: "#16a34a" },
  { label: "Pending Orders", value: "5", trend: "Needs attention", icon: Clock, color: "#f59e0b", bg: "#fffbeb", trendColor: "#d97706" },
];

const products = [
  { id: 1, name: "Premium Wireless Headphones", category: "Electronics", status: "Active", price: "₹2,499", sales: 48 },
  { id: 2, name: "Organic Green Tea Pack", category: "Food & Drink", status: "Active", price: "₹349", sales: 124 },
  { id: 3, name: "Cotton Kurta Set", category: "Clothing", status: "Pending", price: "₹899", sales: 31 },
  { id: 4, name: "Wooden Phone Stand", category: "Accessories", status: "Active", price: "₹199", sales: 87 },
  { id: 5, name: "Yoga Mat Pro", category: "Sports", status: "Rejected", price: "₹1,299", sales: 0 },
];

const salesData = [
  { day: "Mon", sales: 42 },
  { day: "Tue", sales: 58 },
  { day: "Wed", sales: 35 },
  { day: "Thu", sales: 71 },
  { day: "Fri", sales: 63 },
  { day: "Sat", sales: 85 },
  { day: "Sun", sales: 92 },
];

const revenueSplit = [
  { name: "Electronics", value: 65, color: "var(--primary-text)" },
  { name: "Clothing", value: 25, color: "#3b82f6" },
  { name: "Others", value: 10, color: "#22c55e" },
];

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div style={{ width: "100%" }}>
      {/* Section 1: Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "clamp(1rem, 4vw, 1.5rem)",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h2 style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", fontWeight: 700, color: "var(--color-900)", margin: 0 }}>
          My Store Overview
        </h2>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            style={{
              backgroundColor: "var(--color-0)",
              border: "1px solid var(--color-100)",
              color: "var(--color-700)",
              fontSize: "0.8rem",
              padding: "0.5rem 1rem",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Export ↓
          </button>
          <button
            style={{
              backgroundColor: "var(--color-900)",
              color: "white",
              fontSize: "0.8rem",
              fontWeight: 600,
              padding: "0.5rem 1rem",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Section 2: Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "clamp(0.75rem, 2vw, 1.25rem)",
          marginBottom: "clamp(1.5rem, 4vw, 2rem)",
        }}
      >
        {statsData.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.06)" }}
            style={{
              backgroundColor: "var(--color-0)",
              border: "1px solid var(--color-100)",
              borderRadius: "var(--radius-2xl)",
              padding: "clamp(1rem, 3vw, 1.5rem)",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "clamp(0.5rem, 2vw, 1rem)" }}>
              <div
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "10px",
                  backgroundColor: stat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                <stat.icon size={18} />
              </div>
            </div>
            <div style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: 700, color: "var(--color-900)", marginBottom: "2px" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "0.825rem", color: "var(--color-500)", fontWeight: 500, marginBottom: "0.375rem" }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "0.7rem", color: stat.trendColor, fontWeight: 600 }}>{stat.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Section 3: Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {["All", "Active", "Pending", "Rejected", "Closed"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: isActive ? 600 : 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                backgroundColor: isActive ? "var(--primary-bg)" : "transparent",
                color: isActive ? "var(--primary-text)" : "#374151",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = "var(--accent-bg)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {tab}
              <span
                style={{
                  backgroundColor: isActive ? "var(--primary-text)" : "#f3f4f6",
                  color: isActive ? "white" : "#6b7280",
                  fontSize: "0.7rem",
                  padding: "1px 6px",
                  borderRadius: "999px",
                  marginLeft: "4px",
                }}
              >
                {tab === "All" ? 12 : tab === "Active" ? 8 : 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Section 4: Results Table */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid var(--neutral-border)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--color-100)",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--color-500)" }}>Showing 1-5 of 12 results</span>
          <span style={{ fontSize: "0.75rem", color: "var(--color-500)", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
            Results per page: 5 <ChevronDown size={12} />
          </span>
        </div>

        <div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", minWidth: "800px", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--color-50)", borderBottom: "1px solid var(--color-100)" }}>
                <th style={{ padding: "1rem 1.5rem", textAlign: "left" }}><input type="checkbox" /></th>
                {["Product Name", "Category", "Status", "Price", "Sales", "Action"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-400)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((row) => (
                <tr
                  key={row.id}
                  style={{ borderBottom: "1px solid #f9fafb", transition: "background 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fffbf7")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td style={{ padding: "1rem 1.5rem" }}><input type="checkbox" /></td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>
                    {row.name}
                  </td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "#6b7280" }}>{row.category}</td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "999px",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        backgroundColor: row.status === "Active" ? "#f0fdf4" : row.status === "Pending" ? "#fffbeb" : "#fef2f2",
                        color: row.status === "Active" ? "#16a34a" : row.status === "Pending" ? "#d97706" : "#dc2626",
                        border: `1px solid ${row.status === "Active" ? "#bbf7d0" : row.status === "Pending" ? "#fde68a" : "#fecaca"}`,
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{row.price}</td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "#374151" }}>{row.sales}</td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <ActionButton icon={CheckCircle} color="#22c55e" />
                      <ActionButton icon={XCircle} color="#ef4444" />
                      <ActionButton icon={Edit2} color="var(--primary-text)" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 6: Recharts Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 100%, 500px), 1fr))",
          gap: "clamp(1rem, 3vw, 1.25rem)",
          marginTop: "clamp(1.5rem, 4vw, 2rem)",
        }}
      >
        <ChartCard title="Sales Trend">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip
                contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: "12px" }}
              />
              <Bar dataKey="sales" fill="var(--primary-text)" radius={[6, 6, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue Split">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={revenueSplit}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                strokeWidth={0}
              >
                {revenueSplit.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Custom Legend */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            {revenueSplit.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: item.color }} />
                <span style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>{item.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

const ActionButton = ({ icon: Icon, color }: { icon: any; color: string }) => (
  <button
    style={{
      width: "1.75rem",
      height: "1.75rem",
      borderRadius: "6px",
      border: "1px solid var(--neutral-border)",
      backgroundColor: "var(--accent-bg)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "#6b7280",
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = color === "var(--primary-text)" ? "var(--primary-bg)" : `${color}15`;
      e.currentTarget.style.color = color;
      e.currentTarget.style.transform = "scale(1.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "var(--accent-bg)";
      e.currentTarget.style.color = "#6b7280";
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    <Icon size={14} />
  </button>
);

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    style={{
      backgroundColor: "var(--color-0)",
      border: "1px solid var(--color-100)",
      borderRadius: "var(--radius-2xl)",
      padding: "clamp(1rem, 3vw, 1.5rem)",
      transition: "box-shadow 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
  >
    <h3 style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", fontWeight: 600, color: "var(--color-900)", marginBottom: "clamp(1rem, 3vw, 1.5rem)" }}>
      {title}
    </h3>
    <div style={{ width: "100%", overflow: "hidden" }}>
      {children}
    </div>
  </div>
);

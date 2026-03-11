"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth } from "@/store/slices/authSlice";
import { resetDashboard } from "@/store/slices/dashboardSlice";
import UbuyeeLogo from "@/components/shared/UbuyeeLogo";

interface TopNavProps {
  userName: string;
  role: "user" | "vendor" | "admin";
}

/**
 * Task 1: Ubuyee Top Navigation Bar
 * Features: Branded gradient logo, User info, Role badges, and Logout.
 */
export default function TopNav({ userName, role }: TopNavProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      // 1. Clear session on server
      await axios.post("/api/auth/logout");
      // 2. Clear Redux states
      dispatch(clearAuth());
      dispatch(resetDashboard());
      // 3. Redirect to login
      router.push("/login");
    } catch (err) {
      console.error("[TopNav] Logout failed:", err);
    }
  };

  // Inline styles based on design rules
  const navStyles: React.CSSProperties = {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
  };

  const logoStyles: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    cursor: "pointer",
  };

  const rightSideStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const userTextStyles: React.CSSProperties = {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#111827",
  };

  const getBadgeStyles = (roleName: string): React.CSSProperties => {
    let bgColor = "#06b6d4"; // Cyan for user
    if (roleName === "vendor") bgColor = "#a855f7"; // Purple for vendor
    if (roleName === "admin") bgColor = "#ef4444"; // Red for admin

    return {
      backgroundColor: bgColor,
      color: "#ffffff",
      fontSize: "0.75rem",
      fontWeight: "bold",
      padding: "2px 8px",
      borderRadius: "999px",
      textTransform: "capitalize",
    };
  };

  const logoutBtnStyles: React.CSSProperties = {
    backgroundColor: "#f97316",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  return (
    <nav style={navStyles}>
      {/* Left side: Logo */}
      <div 
        onClick={() => router.push("/")} 
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <UbuyeeLogo size="md" />
      </div>

      {/* Right side: User info & Logout */}
      <div style={rightSideStyles}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={userTextStyles}>{userName}</span>
          <span style={getBadgeStyles(role)}>{role}</span>
        </div>

        <button 
          onClick={handleLogout} 
          style={logoutBtnStyles}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fb923c")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f97316")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Menu, X, Bell, Search, LogOut } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { logoutThunk } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

interface VendorTopNavProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
  userName?: string | null;
}

export default function VendorTopNav({ onMenuClick, sidebarOpen, userName }: VendorTopNavProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.push("/login");
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        height: "4rem",
        backgroundColor: "var(--neutral-bg)",
        borderBottom: "1px solid var(--neutral-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
      }}
    >
      {/* Left Side: Hamburger & Title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMenuClick}
          style={{
            width: "2.25rem",
            height: "2.25rem",
            borderRadius: "10px",
            border: "1px solid var(--neutral-border)",
            backgroundColor: "var(--accent-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#374151",
            marginRight: "1rem",
            transition: "all 0.2s ease",
            overflow: "hidden"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-bg)";
            e.currentTarget.style.color = "var(--primary-text)";
            e.currentTarget.style.borderColor = "var(--primary-border)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent-bg)";
            e.currentTarget.style.color = "#374151";
            e.currentTarget.style.borderColor = "var(--neutral-border)";
          }}
        >
          <motion.div
            animate={{ rotate: sidebarOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.div>
        </motion.button>

        <h1 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#111827", margin: 0 }}>
          Vendor Dashboard
        </h1>
      </div>

      {/* Right Side: Search, Notifications, Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "0.875rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: "14rem",
              backgroundColor: "var(--accent-bg)",
              border: "1px solid var(--neutral-border)",
              borderRadius: "10px",
              padding: "0.375rem 0.875rem 0.375rem 2.25rem",
              fontSize: "0.875rem",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--primary-text)";
              e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.08)";
              e.target.style.backgroundColor = "var(--neutral-bg)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--neutral-border)";
              e.target.style.boxShadow = "none";
              e.target.style.backgroundColor = "var(--accent-bg)";
            }}
          />
        </div>

        {/* Notifications */}
        <div style={{ position: "relative", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <Bell size={20} style={{ color: "var(--neutral-muted)" }} />
          <div
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "6px",
              height: "6px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
              border: "1px solid white",
            }}
          />
        </div>

        {/* Divider */}
        <div style={{ width: "1px", height: "1.5rem", backgroundColor: "var(--neutral-border)" }} />

        {/* User Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "50%",
              backgroundColor: "var(--primary-bg)",
              border: "2px solid var(--primary-text)",
              color: "var(--primary-text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              fontWeight: 700,
            }}
          >
            {userName ? userName[0].toUpperCase() : "V"}
          </div>
          <div style={{ display: "none", flexDirection: "column", gap: "1px" }} className="md:flex">
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>
              {userName || "Vendor"}
            </span>
            <span
              style={{
                backgroundColor: "var(--primary-bg)",
                color: "var(--primary-text)",
                fontSize: "0.65rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "999px",
                width: "fit-content",
              }}
            >
              Vendor
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            marginLeft: "0.5rem",
            backgroundColor: "var(--primary-text)",
            color: "white",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-text)")}
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </nav>
  );
}

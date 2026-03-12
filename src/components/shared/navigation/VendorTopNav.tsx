"use client";

import React from "react";
import { motion } from "framer-motion";
import { Menu, X, Bell, Search, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutThunk, selectAuth } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

interface VendorTopNavProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function VendorTopNav({ onMenuClick, sidebarOpen }: VendorTopNavProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector(selectAuth);
  const userName = user?.name;
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
        height: "var(--nav-height)",
        backgroundColor: "var(--color-0)",
        borderBottom: "1px solid var(--color-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1rem, 3vw, 2rem)",
        boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
      }}
    >
      {/* Left Side: Portal Title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)", fontWeight: 700, color: "var(--color-900)", margin: 0, letterSpacing: "-0.02em" }}>
          {isMobile ? "Vendor" : "Vendor Portal"}
        </h1>
      </div>

      {/* Right Side: Search, Notifications, Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Search */}
        {!isMobile && (
          <div style={{ position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "0.875rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-400)",
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              style={{
                width: isTablet ? "clamp(8rem, 20vw, 12rem)" : "16rem",
                backgroundColor: "var(--color-50)",
                border: "1px solid var(--color-100)",
                borderRadius: "12px",
                padding: "0.5rem 0.875rem 0.5rem 2.25rem",
                fontSize: "0.875rem",
                transition: "all 0.2s ease",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-primary)";
                e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.08)";
                e.target.style.backgroundColor = "var(--color-0)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--color-100)";
                e.target.style.boxShadow = "none";
                e.target.style.backgroundColor = "var(--color-50)";
              }}
            />
          </div>
        )}

        {/* Notifications */}
        <div style={{ position: "relative", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <Bell size={20} style={{ color: "var(--color-600)" }} />
          <div
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "6px",
              height: "6px",
              backgroundColor: "var(--color-error)",
              borderRadius: "50%",
              border: "1px solid white",
            }}
          />
        </div>

        {/* Divider */}
        <div style={{ width: "1px", height: "1.5rem", backgroundColor: "var(--neutral-border)" }} />

        {/* User Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: "var(--color-primary-light)",
              border: "2px solid var(--color-primary)",
              color: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {userName ? userName[0].toUpperCase() : "V"}
          </div>
          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              <span style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--color-900)" }}>
                {userName ?? "Vendor"}
              </span>
              <span
                style={{
                  color: "var(--color-primary)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Store Pro
              </span>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            marginLeft: "0.25rem",
            backgroundColor: "var(--color-900)",
            color: "white",
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: isMobile ? "0.5rem" : "0.5rem 1rem",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-900)")}
        >
          <LogOut size={16} />
          {!isMobile && "Logout"}
        </button>

        {/* Hamburger Menu - Visible on ALL screens - FAR RIGHT */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMenuClick}
          style={{
            width: "2.25rem",
            height: "2.25rem",
            borderRadius: "10px",
            border: "1px solid #f3f4f6",
            backgroundColor: "#f9fafb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#374151",
            marginLeft: "0.5rem",
            flexShrink: 0,
            transition: "all 0.2s ease",
            overflow: "hidden"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#fff7ed";
            e.currentTarget.style.borderColor = "#fed7aa";
            e.currentTarget.style.color = "#f97316";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f9fafb";
            e.currentTarget.style.borderColor = "#f3f4f6";
            e.currentTarget.style.color = "#374151";
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
      </div>
    </nav>
  );
}

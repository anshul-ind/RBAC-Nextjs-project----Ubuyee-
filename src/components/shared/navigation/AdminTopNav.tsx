"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutThunk, selectAuth } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, Menu, X, LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface AdminTopNavProps {
  pageTitle: string;
  onMenuClick?: () => void;
  sidebarOpen?: boolean;
}

export default function AdminTopNav({ pageTitle, onMenuClick, sidebarOpen }: AdminTopNavProps) {
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
        zIndex: 30,
        height: "var(--nav-height)",
        backgroundColor: "var(--color-0)",
        borderBottom: "1px solid var(--color-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1rem, 3vw, 2rem)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Left side: Hamburger & Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {isTablet && (
          <button
            onClick={onMenuClick}
            style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "8px",
              border: "1px solid var(--color-100)",
              backgroundColor: "var(--color-50)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--color-700)",
            }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
        <h1
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
            fontWeight: 600,
            color: "var(--color-900)",
            margin: 0,
          }}
        >
          {isMobile ? "Admin" : pageTitle}
        </h1>
      </div>

        {!isMobile && (
          <div
            style={{
              marginLeft: isTablet ? "1rem" : "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "var(--color-50)",
              border: "1px solid var(--color-100)",
              borderRadius: "10px",
              padding: "0.375rem 0.875rem",
              width: isTablet ? "12rem" : "18rem",
              transition: "all 0.2s ease",
            }}
          >
            <Search size="1.0rem" style={{ color: "var(--color-400)" }} />
            <input
              type="text"
              placeholder="Search..."
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.875rem",
                color: "var(--color-900)",
                width: "100%",
              }}
            />
          </div>
        )}

      {/* Right side: Actions & User */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Notifications */}
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            width: "2.25rem",
            height: "2.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "var(--color-50)",
            color: "var(--color-600)",
          }}
        >
          <Bell size="1.1rem" />
          <div
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              width: "6px",
              height: "6px",
              backgroundColor: "var(--color-error)",
              borderRadius: "50%",
              border: "1px solid var(--color-0)",
            }}
          />
        </div>

        <div
          style={{
            width: "1px",
            height: "1.5rem",
            backgroundColor: "var(--neutral-border)",
            margin: "0 1.0rem",
          }}
        />

        {/* User Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: "var(--color-primary-light)",
              border: "2px solid var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-primary)",
            }}
          >
            {userName ? (userName as string).charAt(0).toUpperCase() : "A"}
          </div>
          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--color-900)" }}>
                {userName ?? "Admin"}
              </span>
              <span style={{ fontSize: "0.65rem", color: "var(--color-primary)", fontWeight: 600 }}>SYSTEM</span>
            </div>
          )}
          {!isMobile && <ChevronDown size="0.875rem" style={{ color: "var(--color-400)" }} />}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            marginLeft: "0.5rem",
            backgroundColor: "var(--color-900)",
            color: "white",
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: isMobile ? "0.5rem" : "0.5rem 1rem",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-900)")}
        >
          {isMobile ? <LogOut size={16} /> : "Logout"}
        </button>
      </div>
    </nav>
  );
}

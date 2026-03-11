"use client";

import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { logoutThunk } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown } from "lucide-react";

interface AdminTopNavProps {
  pageTitle: string;
  userName: string;
}

export default function AdminTopNav({ pageTitle, userName }: AdminTopNavProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.push("/login");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: "15.0rem",
        right: 0,
        height: "4.0rem",
        zIndex: 30,
        backgroundColor: "var(--neutral-bg)",
        borderBottom: "1px solid var(--neutral-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.0rem",
      }}
    >
      {/* Left side: Search & Title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--accent-text)",
            margin: 0,
          }}
        >
          {pageTitle}
        </h1>

        <div
          style={{
            marginLeft: "2.0rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "var(--accent-bg)",
            border: "1px solid var(--neutral-border)",
            borderRadius: "8px",
            padding: "0.375rem 0.875rem",
            width: "16.0rem",
          }}
        >
          <Search size="1.0rem" style={{ color: "var(--neutral-muted)" }} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "0.875rem",
              color: "var(--accent-text)",
              width: "100%",
            }}
          />
          <div
            style={{
              fontSize: "0.65rem",
              color: "var(--neutral-muted)",
              backgroundColor: "var(--neutral-border)",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            ⌘K
          </div>
        </div>
      </div>

      {/* Right side: Actions & User */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Notifications */}
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bell size="1.25rem" style={{ color: "var(--neutral-text)" }} />
          <div
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "8px",
              height: "8px",
              backgroundColor: "var(--error-text)",
              borderRadius: "50%",
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
              width: "2.0rem",
              height: "2.0rem",
              borderRadius: "50%",
              backgroundColor: "var(--primary-bg)",
              border: "2px solid var(--primary-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--primary-text)",
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-text)" }}>
              {userName}
            </span>
            <span style={{ fontSize: "0.70rem", color: "var(--neutral-muted)" }}>Admin</span>
          </div>
          <ChevronDown size="0.875rem" style={{ color: "var(--neutral-muted)" }} />
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            marginLeft: "1.0rem",
            backgroundColor: "var(--primary-text)",
            color: "white",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "0.375rem 1.0rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-text)")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

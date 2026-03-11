"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import AdminSidebar from "@/components/shared/navigation/AdminSidebar";
import AdminTopNav from "@/components/shared/navigation/AdminTopNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "var(--accent-bg)",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Sidebar - fixed left */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div
        style={{
          marginLeft: "15.0rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Top Navbar - fixed top */}
        <AdminTopNav
          pageTitle="Dashboard"
          userName={user?.name ?? "Admin"}
        />

        {/* Content Section */}
        <main
          style={{
            marginTop: "4.0rem",
            padding: "2.0rem",
            flex: 1,
            backgroundColor: "var(--accent-bg)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

"use client"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks"
import { selectAuth } from "@/store/slices/authSlice"
import AdminSidebar from "@/components/shared/navigation/AdminSidebar"
import AdminTopNav from "@/components/shared/navigation/AdminTopNav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAppSelector(selectAuth)
  const role = user?.role

  useEffect(() => {
    // Wait until loading is done
    if (isLoading) return

    // If not authenticated redirect to login
    if (!isAuthenticated) {
      router.replace("/admin/login")
      return
    }

    // If wrong role redirect to correct portal
    if (role !== "admin") {
      // Send them to their own dashboard
      const fallback = role === "vendor"
        ? "/vendor/dashboard"
        : "/user/dashboard"
      router.replace(fallback)
    }
  }, [isAuthenticated, isLoading, role, router])

  // CRITICAL: Show loading spinner while hydrating
  if (isLoading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "2.5rem",
            height: "2.5rem",
            border: "3px solid #f3f4f6",
            borderTop: "3px solid #f97316",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 1rem"
          }} />
          <p style={{
            fontSize: "0.875rem",
            color: "#6b7280"
          }}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    )
  }

  // Don't render children until authenticated
  if (!isAuthenticated) return null

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
        <AdminTopNav pageTitle="Dashboard" />

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
  )
}

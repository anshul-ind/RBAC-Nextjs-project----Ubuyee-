"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { selectAuth, hydrateAuthThunk } from "@/store/slices/authSlice"
import { motion, AnimatePresence } from "framer-motion"
import AdminSidebar from "@/components/shared/navigation/AdminSidebar"
import AdminTopNav from "@/components/shared/navigation/AdminTopNav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [checked, setChecked] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const { user, isAuthenticated, isLoading } = useAppSelector(selectAuth)
  const role = user?.role

  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= 1024)
      if (window.innerWidth >= 1024) setSidebarOpen(false)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const initAuth = async () => {
      if (!isAuthenticated) {
        await dispatch(hydrateAuthThunk())
      }
      setChecked(true)
    }
    initAuth()
  }, [])

  useEffect(() => {
    if (!checked) return

    if (!isAuthenticated) {
      router.replace("/admin/login")
      return
    }

    if (role !== "admin") {
      const fallback = role === "vendor"
        ? "/vendor/dashboard"
        : "/user/dashboard"
      router.replace(fallback)
    }
  }, [checked, isAuthenticated, role, router])

  // CRITICAL: Show loading spinner while hydrating
  if (!checked || isLoading) {
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
        backgroundColor: "var(--color-50)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
      }}
    >
      {/* 1. OVERLAY (for mobile/tablet drawer) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 40,
              backdropFilter: "blur(2px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. SIDEBAR (slides on mobile/tablet, fixed on desktop) */}
      <AnimatePresence>
        {(sidebarOpen || isDesktop) && (
          <AdminSidebar 
            isMobile={!isDesktop} 
            onClose={() => setSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* 3. MAIN CONTENT AREA */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <AdminTopNav 
          pageTitle="Admin Console" 
          onMenuClick={() => setSidebarOpen(true)}
          sidebarOpen={sidebarOpen}
        />

        <main
          style={{
            padding: "clamp(1rem, 4vw, 2.5rem)",
            flex: 1,
            backgroundColor: "transparent",
            width: "100%",
            maxWidth: "1600px",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

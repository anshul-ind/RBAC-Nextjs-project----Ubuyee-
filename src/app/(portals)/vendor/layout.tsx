"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { selectAuth, hydrateAuthThunk } from "@/store/slices/authSlice"
import { motion, AnimatePresence } from "framer-motion"
import VendorSidebar from "@/components/shared/navigation/VendorSidebar"
import VendorTopNav from "@/components/shared/navigation/VendorTopNav"

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const { user, isAuthenticated, isLoading } = useAppSelector(selectAuth)
  const role = user?.role

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
      router.replace("/vendor/login")
      return
    }

    const allowed = ["user", "vendor", "admin"]
    if (!allowed.includes(role ?? "")) {
      router.replace("/login")
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
        backgroundColor: "#fafafa",
        position: "relative",
      }}
    >
      {/* 1. OVERLAY (when sidebar open on mobile) */}
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
              zIndex: 30,
              backdropFilter: "blur(2px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. SIDEBAR (slides from right) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
            }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "15rem",
              height: "100vh",
              backgroundColor: "#ffffff",
              borderLeft: "1px solid var(--neutral-border)",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
            }}
          >
            <VendorSidebar onClose={() => setSidebarOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 3. MAIN CONTENT AREA */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <VendorTopNav
          onMenuClick={() => setSidebarOpen(true)}
          sidebarOpen={sidebarOpen}
        />
        <main
          style={{
            padding: "2rem",
            flex: 1,
            width: "100%",
            maxWidth: "1400px",
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

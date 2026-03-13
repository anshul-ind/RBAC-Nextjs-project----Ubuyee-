"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { selectAuth, hydrateAuthThunk } from "@/store/slices/authSlice"
import TopNav from "@/components/shared/navigation/TopNav"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [checked, setChecked] = useState(false)
  const { user, isAuthenticated, isLoading } = useAppSelector(selectAuth)
  const role = user?.role;

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
      router.replace("/user/login")
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
        minHeight: "100vh",
        backgroundColor: "var(--color-50)",
      }}
    >
      <TopNav />
      <main
        style={{
          paddingTop: "var(--nav-height)",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        {children}
      </main>
    </div>
  )
}

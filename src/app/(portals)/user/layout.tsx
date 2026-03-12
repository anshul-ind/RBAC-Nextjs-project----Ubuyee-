"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks"
import { selectAuth } from "@/store/slices/authSlice"
import TopNav from "@/components/shared/navigation/TopNav"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAppSelector(selectAuth)
  const role = user?.role;

  useEffect(() => {
    // Wait until loading is done
    if (isLoading) return

    // If not authenticated redirect to login
    if (!isAuthenticated) {
      router.replace("/user/login")
      return
    }

    // If wrong role redirect to correct portal
    const allowed = ["user", "vendor", "admin"]
    if (!allowed.includes(role ?? "")) {
      router.replace("/login")
    }
  }, [isAuthenticated, isLoading, role, router])

  // CRITICAL: Show loading spinner while hydrating
  // This prevents the flash of broken UI
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
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      <TopNav />
      <main
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1.5rem 2rem",
        }}
      >
        {children}
      </main>
    </div>
  )
}

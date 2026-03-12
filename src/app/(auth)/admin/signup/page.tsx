"use client"
import { useRouter } from "next/navigation"

export default function AdminSignupPage() {
  const router = useRouter()

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-0)",
    }}>
      <div style={{
        textAlign: "center",
        padding: "2rem",
      }}>
        <div style={{
          fontSize: "4rem",
          marginBottom: "1rem"
        }}>
          🔒
        </div>
        <h1 style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          color: "var(--color-900)",
          marginBottom: "0.5rem",
        }}>
          Access Restricted
        </h1>
        <p style={{
          fontSize: "0.875rem",
          color: "var(--color-500)",
          marginBottom: "1.5rem",
        }}>
          Admin accounts are created internally.
          This page is not publicly accessible.
        </p>
        <button
          onClick={() => router.push("/")}
          style={{
            background: "var(--color-primary)",
            color: "white",
            border: "none",
            padding: "0.625rem 1.5rem",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

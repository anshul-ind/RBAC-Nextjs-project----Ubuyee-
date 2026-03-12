"use client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FiLock } from "react-icons/fi"
import UbuyeeLogo from "@/components/shared/UbuyeeLogo"

export default function AdminSignupPage() {
  const router = useRouter()

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-0)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Effect */}
      <div style={{
        position: "absolute",
        top: "-10%",
        right: "-10%",
        width: "40vw",
        height: "40vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          textAlign: "center",
          padding: "clamp(2rem, 8vw, 4rem)",
          background: "var(--color-0)",
          border: "1px solid var(--color-100)",
          borderRadius: "24px",
          boxShadow: "0 12px 48px rgba(0,0,0,0.05)",
          width: "min(100%, 480px)",
          zIndex: 1
        }}
      >
        <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
          <UbuyeeLogo size="lg" />
        </div>
        
        <div style={{
          width: "4rem",
          height: "4rem",
          borderRadius: "50%",
          background: "#fef2f2",
          border: "2px solid #fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
          color: "#dc2626"
        }}>
          <FiLock size={24} />
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
          marginBottom: "2rem",
          lineHeight: 1.6
        }}>
          Admin accounts are provisioned internally by the system operator.
          Public registration is disabled for security purposes.
        </p>

        <button
          onClick={() => router.push("/")}
          style={{
            background: "var(--color-900)",
            color: "white",
            border: "none",
            padding: "0.75rem 2rem",
            borderRadius: "12px",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-primary)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--color-900)"}
        >
          Return to Hub
        </button>
      </motion.div>
    </main>
  )
}

"use client";

import Link from "next/link";
import { LoginForm } from "@/components/shared/auth/LoginForm";
import { FiShield } from "react-icons/fi";
import { motion } from "framer-motion";
import UbuyeeLogo from "@/components/shared/UbuyeeLogo";

/**
 * Admin Login Page — Redesigned for White Theme
 */

export default function AdminLoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background Orbs */}
      <div
        style={{
          position: "absolute",
          top: "-8%",
          left: "-8%",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-8%",
          right: "-8%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Auth card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background: "var(--color-0)",
          border: "1px solid #f3f4f6",
          borderRadius: "20px",
          padding: "2.5rem 2rem",
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
        }}
      >
        {/* Orange top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "3px",
            background: "linear-gradient(to right, #f97316, #fb923c)",
            borderRadius: "0 0 4px 4px",
          }}
        />

        {/* Heading Section */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "50%",
              background: "#fef2f2",
              border: "2px solid #fecaca",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              color: "#dc2626",
            }}
          >
            <FiShield size="1.5rem" />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <UbuyeeLogo size="md" />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-900)", margin: "0 0 0.375rem" }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-500)", margin: "0 0 2rem" }}>
            Authorized personnel only
          </p>
        </div>

        {/* LoginForm wired to Admin */}
        <LoginForm role="admin" portalOrigin="admin" submitButtonBackground="#1e293b" submitButtonHoverBackground="#334155" submitButtonText="Sign in as Admin &rarr;" />

        {/* Security Notice */}
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            background: "var(--color-50)",
            borderRadius: "8px",
            border: "1px solid var(--color-100)",
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              color: "var(--color-400)",
              textAlign: "center",
              margin: 0,
            }}
          >
            This is a restricted area. Unauthorized access attempts are monitored and logged.
          </p>
        </div>
      </motion.div>
    </main>
  );
}

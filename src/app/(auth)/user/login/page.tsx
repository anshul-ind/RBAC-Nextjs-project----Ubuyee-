"use client";

import Link from "next/link";
import { LoginForm } from "@/components/shared/auth/LoginForm";
import { FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";

/**
 * User Login Page — Redesigned for White Theme
 */

export default function UserLoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
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
          background: "#ffffff",
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
              background: "#fff7ed",
              border: "2px solid #fed7aa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              color: "#f97316",
            }}
          >
            <FiLogIn size="1.5rem" />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", margin: "0 0 0.375rem" }}>
            User Sign In
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0 0 2rem" }}>
            Access your Ubuyee account
          </p>
        </div>

        {/* LoginForm wired to User */}
        <LoginForm role="user" />

        {/* Footer Links */}
        <div style={{ marginTop: "1rem" }}>
          <p style={{ textAlign: "center", fontSize: "0.825rem", color: "#6b7280", margin: 0 }}>
            No account?{" "}
            <Link
              href="/user/signup"
              style={{ color: "#f97316", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Sign up
            </Link>
          </p>
          <div style={{ width: "100%", height: "1px", background: "#f3f4f6", margin: "0.875rem 0" }} />
          <p style={{ textAlign: "center", fontSize: "0.825rem", color: "#6b7280", margin: 0 }}>
            Not a user?{" "}
            <Link
              href="/login"
              style={{ color: "#f97316", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Choose a different role
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}

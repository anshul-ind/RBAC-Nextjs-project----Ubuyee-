"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupForm } from "@/components/shared/auth/SignupForm";
import { FiShoppingBag } from "react-icons/fi";
import { motion } from "framer-motion";
import UbuyeeLogo from "@/components/shared/UbuyeeLogo";

/**
 * Vendor Signup Page — Redesigned for White Theme
 */

export default function VendorSignupPage() {
  const router = useRouter();
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1rem, 4vw, 2.5rem)",
        position: "relative",
        overflowY: "auto",
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
          border: "1px solid var(--color-100)",
          borderRadius: "var(--radius-2xl)",
          padding: "clamp(1.25rem, 4vw, 2rem)",
          width: "clamp(300px, 88vw, 420px)",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
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
              background: "var(--color-primary-light)",
              border: "2px solid #fed7aa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              color: "var(--color-primary)",
            }}
          >
            <FiShoppingBag size="1.5rem" />
          </div>
          <div style={{ marginBottom: "clamp(0.75rem, 2vw, 1rem)", display: "flex", justifyContent: "center" }}>
            <UbuyeeLogo size="md" />
          </div>
          <h1 style={{ fontSize: "clamp(1.25rem, 4vw, 1.5rem)", fontWeight: "var(--font-extrabold)", color: "var(--color-900)", margin: "0 0 0.25rem" }}>
            Create Vendor Account
          </h1>
          <p style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)", color: "var(--color-500)", margin: "0 0 clamp(1rem, 3vw, 1.5rem)" }}>
            Start selling on Ubuyee today
          </p>
        </div>

        {/* SignupForm wired to Vendor */}
        <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem", color: "var(--color-500)" }}>Loading...</div>}>
          <SignupForm role="vendor" portalOrigin="vendor" />
        </Suspense>

        {/* Footer Links */}
        <div style={{ marginTop: "1rem", fontSize: "clamp(0.75rem, 2vw, 0.875rem)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <p style={{ margin: 0 }}>
            Already have an account?{" "}
            <Link
              href="/vendor/login"
              style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Sign in
            </Link>
          </p>
          <div style={{ width: "100%", height: "1px", background: "var(--color-100)", margin: "0.25rem 0" }} />
          <p style={{ margin: 0 }}>
            Do you want to sign up as a User?
            <span
              onClick={() => router.push("/user/signup")}
              style={{ color: "var(--color-primary)", fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Click here
            </span>
          </p>
          <div style={{ width: "100%", height: "1px", background: "var(--color-100)", margin: "0.25rem 0" }} />
          <p style={{ margin: 0 }}>
            <Link
              href="/login"
              style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Sign in with a different account &rarr;
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}

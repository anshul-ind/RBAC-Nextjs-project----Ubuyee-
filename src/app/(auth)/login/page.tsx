"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import UbuyeeLogo from "@/components/shared/UbuyeeLogo";

/**
 * Redesigned Login Selector Page - /login
 * Premium white/orange aesthetic with interactive role cards.
 */

interface RoleCardProps {
  title: string;
  icon: string;
  path: string;
  index: number;
}

const RoleCard = ({ title, icon, path, index }: RoleCardProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.15 + index * 0.12,
      }}
      whileHover={{
        y: -10,
        scale: 1.06,
        boxShadow: "0 20px 40px rgba(249,115,22,0.18)",
        borderColor: "var(--color-primary)",
      }}
      whileTap={{
        scale: 0.96,
        y: -4,
      }}
      onClick={() => router.push(path)}
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "var(--color-0)",
        border: "1.5px solid #f3f4f6",
        borderRadius: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        transition: "border-color 0.2s ease",
      }}
    >
      {/* Inner Glow on Hover */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "24px",
          background: "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Icon Wrapper */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }}
        whileHover={{
          rotate: [0, -8, 8, -4, 0],
        }}
        style={{
          width: "5rem",
          height: "5rem",
          borderRadius: "20px",
          backgroundColor: "var(--color-primary-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          zIndex: 1,
        }}
      >
        {icon}
      </motion.div>

      {/* Label */}
      <span
        style={{
          fontSize: "0.9rem",
          fontWeight: 700,
          color: "var(--color-900)",
          letterSpacing: "0.01em",
          zIndex: 1,
        }}
      >
        {title}
      </span>

      {/* Orange Dot Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          bottom: "16px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--color-primary)",
        }}
      />
    </motion.div>
  );
};

export default function LoginSelectorPage() {
  const router = useRouter();

  const backgroundOrbs = (
    <>
      {/* Orb 1: Top Left */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Orb 2: Bottom Right */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-0)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {backgroundOrbs}

      <div style={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            marginBottom: "2.5rem",
          }}
        >
          <UbuyeeLogo size="lg" onClick={() => router.push("/")} />
        </motion.div>

        {/* Heading Section */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              fontSize: "2.25rem",
              fontWeight: 800,
              color: "var(--color-900)",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Who are you today?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              fontSize: "1rem",
              color: "var(--color-500)",
              marginTop: "0.5rem",
            }}
          >
            Choose your portal to continue
          </motion.p>
        </div>

        {/* Roles Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem", maxWidth: "560px", margin: "0 auto" }}>
          <RoleCard index={0} title="Customer" icon="🛍️" path="/user/login" />
          <RoleCard index={1} title="Vendor" icon="🏪" path="/vendor/login" />
        </div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Divider */}
          <div
            style={{
              width: "24rem",
              height: "1px",
              background: "linear-gradient(to right, transparent, #e5e7eb, transparent)",
              margin: "2.5rem auto 1.5rem",
            }}
          />

          <div style={{ fontSize: "0.875rem", color: "var(--color-500)", display: "flex", gap: "0.5rem" }}>
            New to Ubuyee?
            <span
              onClick={() => router.push("/signup")}
              style={{
                color: "var(--color-primary)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "text-decoration 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Create an account →
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

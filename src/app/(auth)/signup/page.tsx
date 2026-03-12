"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import UbuyeeLogo from "@/components/shared/UbuyeeLogo";

interface RoleCardProps {
  title: string;
  description: string;
  icon: string;
  path: string;
  index: number;
}

const RoleCard = ({ title, description, icon, path, index }: RoleCardProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.15 + index * 0.12,
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
        borderColor: "var(--color-primary)",
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => router.push(path)}
      style={{
        backgroundColor: "var(--color-0)",
        border: "1.5px solid var(--color-100)",
        borderRadius: "24px",
        padding: "clamp(2rem, 5vw, 3rem) 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        transition: "all 0.3s ease",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "4.5rem",
          height: "4.5rem",
          borderRadius: "18px",
          backgroundColor: "var(--color-primary-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.25rem",
          marginBottom: "1.5rem",
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--color-900)", margin: "0 0 0.5rem" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.85rem", color: "var(--color-500)", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
        {description}
      </p>
    </motion.div>
  );
};

export default function SignupSelectorPage() {
  const router = useRouter();

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
      {/* Background Orbs */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          right: "-5%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "-5%",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "1200px", padding: "0 2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "3rem", textAlign: "center" }}
        >
          <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
            <UbuyeeLogo size="lg" />
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 6vw, 2.5rem)", fontWeight: 900, color: "var(--color-900)", margin: 0, letterSpacing: "-0.03em" }}>
            Join Ubuyee Ecosystem
          </h1>
          <p style={{ color: "var(--color-500)", marginTop: "0.5rem", fontSize: "1rem" }}>
            Choose your account type to get started
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            width: "100%",
            maxWidth: "960px",
          }}
        >
          <RoleCard
            index={0}
            title="Customer"
            description="Sign up to start shopping and discover unique deals across the globe."
            icon="🛍️"
            path="/user/signup"
          />
          <RoleCard
            index={1}
            title="Vendor"
            description="Open your digital storefront and reach millions of customers worldwide."
            icon="🏪"
            path="/vendor/signup"
          />
          <RoleCard
            index={2}
            title="Administrator"
            description="Internal portal for system management and operational oversight."
            icon="🛡️"
            path="/admin/signup"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: "3.5rem", textAlign: "center" }}
        >
          <p style={{ fontSize: "0.9rem", color: "var(--color-500)", margin: 0 }}>
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              style={{ color: "var(--color-primary)", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
            >
              Sign in
            </span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

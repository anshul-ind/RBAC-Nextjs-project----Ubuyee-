/**
 * Global Signup Role Selector — /signup
 *
 * Parallel to the login selector, this lets users choose what type of
 * account they want to create before routing them to the actual
 * role-specific signup form.
 */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupSelectorPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a", // Dark slate background
        fontFamily: "'DM Sans', sans-serif",
        padding: "2rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
          Create an Account
        </h1>
        <p style={{ color: "rgba(148,163,184,0.8)", marginTop: "0.5rem" }}>
          How would you like to join the platform?
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {/* User Card */}
        <RoleCard
          variants={itemVariants}
          href="/user/signup"
          title="Customer"
          description="Sign up to start shopping immediately"
          icon="🛍️"
          accentColor="#0ea5e9" // Sky blue
        />

        {/* Vendor Card */}
        <RoleCard
          variants={itemVariants}
          href="/vendor/signup"
          title="Vendor"
          description="Register your store and start selling"
          icon="🏪"
          accentColor="#f97316" // Orange
        />

        {/* Admin Card */}
        <RoleCard
          variants={itemVariants}
          href="/admin/signup"
          title="Administrator"
          description="Register an internal system account"
          icon="🛡️"
          accentColor="#8b5cf6" // Purple
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ marginTop: "3rem", color: "rgba(148,163,184,0.7)", fontSize: "0.9rem" }}
      >
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#f97316", textDecoration: "none", fontWeight: 600 }}>
          Sign in here
        </Link>
      </motion.div>
    </main>
  );
}

// ── Shared Card Component ───────────────────────────────────────────────────

function RoleCard({ href, title, description, icon, accentColor, variants }: any) {
  return (
    <motion.div variants={variants} whileHover={{ scale: 1.03, y: -5 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem 2rem",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "1.5rem",
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: accentColor,
            opacity: 0.8,
          }}
        />
        <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>{icon}</div>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 0.5rem 0" }}>
          {title}
        </h2>
        <p style={{ color: "rgba(148,163,184,0.8)", fontSize: "0.9rem", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
          {description}
        </p>
      </Link>
    </motion.div>
  );
}

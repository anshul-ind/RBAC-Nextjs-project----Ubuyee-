"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);
      // redirect based on role after API response
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Animation variants ──────────────────────────────────────────────────────

  /** Logo: drops in from top + fades, then gently bobs forever */
  const logoVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 },
    },
  };

 const logoFloatVariants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}
  /** Card: slides up + fades in */
  const cardVariants = {
    hidden: { opacity: 0, y: 48, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 22, delay: 0.3 },
    },
  };

  /** Staggered children inside the card */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.45 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  /** Orbs: subtle pulse */
  const orbVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // ────────────────────────────────────────────────────────────────────────────

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0d1117 0%, #0f1923 50%, #111827 100%)",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        padding: "1.5rem",
        gap: "1.75rem",
      }}
    >
      {/* ── Background glow orbs ── */}
      <motion.div
        variants={orbVariants}
        animate="animate"
        style={{
          position: "fixed",
          top: "10%",
          left: "8%",
          width: "26rem",
          height: "26rem",
          background:
            "radial-gradient(circle, rgba(251,146,60,0.09) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <motion.div
        variants={orbVariants}
        animate="animate"
        style={{
          position: "fixed",
          bottom: "10%",
          right: "8%",
          width: "20rem",
          height: "20rem",
          background:
            "radial-gradient(circle, rgba(30,58,138,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
{/* ── Logo ── */}
<motion.div
  variants={logoVariants}
  initial="hidden"
  animate="visible"
  style={{ zIndex: 1 }}
>
  {/* Bob forever after entering */}
  <motion.div
    variants={logoFloatVariants}
    animate="float"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // padding: "0.6rem 1.4rem",
      // background: "rgba(255,255,255,0.95)",
      // borderRadius: "1rem",
      boxShadow:
        "0 8px 32px rgba(251,146,60,0.22), 0 2px 8px rgba(0,0,0,0.18)",
      cursor: "default",
    }}
    whileHover={{
      scale: 1.05,
      boxShadow:
        "0 16px 40px rgba(251,146,60,0.32), 0 4px 12px rgba(0,0,0,0.2)",
      transition: { type: "spring", stiffness: 400, damping: 15 },
    }}
  >
    <Image
      src="/assets/logo.png"
      alt="logo"
      width={140}
      height={40}
      style={{ objectFit: "contain", display: "block" }}
      priority
    />
  </motion.div>
</motion.div>

      {/* ── Card ── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        style={{
          width: "100%",
          maxWidth: "26rem",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.25rem",
          padding: "2.5rem 2.25rem 2rem",
          boxShadow:
            "0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top accent line — brand orange */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "12%",
            right: "12%",
            height: "2.5px",
            background:
              "linear-gradient(90deg, transparent, #f97316, #fb923c, transparent)",
            borderRadius: "0 0 3px 3px",
          }}
        />

        {/* Staggered inner content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Header text */}
          <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "0.75rem" }}>
            <h1
              style={{
                margin: 0,
                fontSize: "1.45rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#f1f5f9",
              }}
            >
              Create Account
            </h1>
            <p
              style={{
                margin: "0.35rem 0 0",
                fontSize: "0.82rem",
                color: "rgba(148,163,184,0.7)",
              }}
            >
              Join Ubuyee — your smart shopping platform
            </p>
          </motion.div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Email field */}
            <motion.div
              variants={itemVariants}
              style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
            >
              <label
                htmlFor="email"
                style={{
                  fontSize: "0.775rem",
                  fontWeight: 500,
                  color: "rgba(148,163,184,0.9)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(251,146,60,0.75)",
                    display: "flex",
                    alignItems: "center",
                    pointerEvents: "none",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    padding: "0.72rem 1rem 0.72rem 2.5rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "0.6rem",
                    color: "#e2e8f0",
                    fontSize: "0.9rem",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxSizing: "border-box" as const,
                  }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.target.style.borderColor = "rgba(251,146,60,0.6)";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(251,146,60,0.12)";
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.09)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </motion.div>

            {/* Password field */}
            <motion.div
              variants={itemVariants}
              style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
            >
              <label
                htmlFor="password"
                style={{
                  fontSize: "0.775rem",
                  fontWeight: 500,
                  color: "rgba(148,163,184,0.9)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(251,146,60,0.75)",
                    display: "flex",
                    alignItems: "center",
                    pointerEvents: "none",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Min. 8 characters"
                  style={{
                    width: "100%",
                    padding: "0.72rem 2.75rem 0.72rem 2.5rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "0.6rem",
                    color: "#e2e8f0",
                    fontSize: "0.9rem",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxSizing: "border-box" as const,
                  }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.target.style.borderColor = "rgba(251,146,60,0.6)";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(251,146,60,0.12)";
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.09)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(148,163,184,0.5)",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={
                  !isLoading
                    ? {
                        scale: 1.02,
                        boxShadow: "0 14px 32px rgba(251,146,60,0.45)",
                      }
                    : {}
                }
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                style={{
                  marginTop: "0.25rem",
                  width: "100%",
                  padding: "0.8rem",
                  background: isLoading
                    ? "rgba(251,146,60,0.45)"
                    : "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
                  border: "none",
                  borderRadius: "0.65rem",
                  color: "#fff",
                  fontSize: "0.925rem",
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.02em",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  boxShadow: "0 8px 24px rgba(251,146,60,0.3)",
                  transition: "background 0.2s",
                }}
              >
                {isLoading ? "Creating account…" : "Create Account →"}
              </motion.button>
            </motion.div>
          </form>

          {/* Footer links */}
          <motion.div
            variants={itemVariants}
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
              marginTop: "0.25rem",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "rgba(148,163,184,0.8)",
              }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: "#fb923c",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Sign in
              </Link>
            </p>

            <Link
              href="/forgot-password"
              style={{
                fontSize: "0.75rem",
                color: "rgba(100,116,139,0.65)",
                textDecoration: "none",
              }}
            >
              Forgot your password?
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );  
}

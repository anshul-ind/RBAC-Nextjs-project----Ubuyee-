"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// ─── Ubuyee brand colors ───────────────────────────────────────────────────
// Orange: #f97316   Navy: #1e3a5f

 function WelcomePage() {
  const router = useRouter();

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: "#f8f4ef",
      }}
    >
      {/* ── Hazy / blurry background layers ────────────────────────────── */}

      {/* Large soft orange blob — top-left */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-8rem",
          left: "-8rem",
          width: "36rem",
          height: "36rem",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.35) 0%, rgba(249,115,22,0.08) 55%, transparent 75%)",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />

      {/* Large soft navy blob — bottom-right */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        style={{
          position: "absolute",
          bottom: "-10rem",
          right: "-8rem",
          width: "40rem",
          height: "40rem",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(30,58,95,0.28) 0%, rgba(30,58,95,0.06) 55%, transparent 75%)",
          filter: "blur(56px)",
          pointerEvents: "none",
        }}
      />

      {/* Soft mid accent — center bottom */}
      <motion.div
        animate={{ y: [0, -18, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute",
          bottom: "5%",
          left: "35%",
          width: "28rem",
          height: "14rem",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Frosted glass overlay — gives the "hazy" feel over everything */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.5rem",
          padding: "2rem",
        }}
      >
        {/* Logo card with float + entrance */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.15 }}
        >
          {/* Continuous gentle bob */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              scale: 1.06,
              transition: { type: "spring", stiffness: 350, damping: 14 },
            }}
            style={{
              padding: "1.2rem 2.4rem",
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "29rem",
              boxShadow:
                "0 8px 48px rgba(249,115,22,0.18), 0 2px 12px rgba(30,58,95,0.12), 0 0 0 1px rgba(249,115,22,0.12)",
              cursor: "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Logo — inline base64 so no /public setup needed */}
            <img
              src="/assets/harbour.png"
              alt="Ubuyee"
              width={160}
              height={56}
              style={{ objectFit: "contain", display: "block" }}
            />
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
          style={{
            margin: 0,
            fontSize: "1.05rem",
            fontWeight: 400,
            color: "rgba(30,58,95,0.65)",
            letterSpacing: "0.04em",
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Your smart shopping destination
        </motion.p>

        {/* Get Started button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.95,
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
        >
          <motion.button
            onClick={() => router.push("/register")}
            whileHover={{
              scale: 1.06,
              boxShadow: "0 16px 40px rgba(249,115,22,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.85rem 2rem",
              background: "#f97316",
              border: "none",
              borderRadius: "0.75rem",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
              cursor: "pointer",
              boxShadow: "0 8px 28px rgba(249,115,22,0.32)",
              transition: "background 0.2s",
            }}
          >
            Get Started
            {/* Arrow icon — inline SVG so no react-icons install needed in this file */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Already have account */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{
            margin: 0,
            fontSize: "0.82rem",
            color: "rgba(30,58,95,0.5)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            style={{
              color: "#f97316",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Sign in
          </span>
        </motion.p>
      </div>
    </main>
  );
};

export default WelcomePage;

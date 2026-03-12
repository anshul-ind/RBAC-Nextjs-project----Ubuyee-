"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import UbuyeeLogo from "./shared/UbuyeeLogo";

// ─── Food Icon SVGs ─────────────────────────────────────────────────────────

function PizzaIcon({ color }: { color: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 4 L36 34 L4 34 Z" />
      <path d="M11 14 Q20 8 29 14" />
      <path d="M18 34 Q18 38 20 39 Q22 38 22 34" />
      <circle cx="16" cy="22" r="2.5" fill={color} stroke="none" />
      <circle cx="24" cy="20" r="2" fill={color} stroke="none" />
      <circle cx="20" cy="28" r="2" fill={color} stroke="none" />
    </svg>
  );
}

function SodaIcon({ color }: { color: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="15" y="2" width="10" height="5" rx="2" />
      <path d="M15 7 L13 13 L13 34 Q13 38 20 38 Q27 38 27 34 L27 13 L25 7" />
      <line x1="13" y1="20" x2="27" y2="20" />
      <line x1="13" y1="26" x2="27" y2="26" />
      <line x1="16" y1="14" x2="16" y2="19" />
      <circle cx="32" cy="8" r="1.5" fill={color} stroke="none" />
      <circle cx="34" cy="14" r="1" fill={color} stroke="none" />
      <circle cx="8" cy="12" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

function BurgerIcon({ color }: { color: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 18 Q8 10 20 10 Q32 10 32 18" />
      <line x1="16" y1="12" x2="17" y2="13" />
      <line x1="21" y1="11" x2="22" y2="12" />
      <line x1="26" y1="13" x2="27" y2="14" />
      <rect x="7" y="18" width="26" height="5" rx="2" />
      <path d="M7 23 L7 27 Q7 30 20 30 Q33 30 33 27 L33 23" />
      <line x1="35" y1="8" x2="37" y2="6" />
      <line x1="36" y1="12" x2="38" y2="12" />
      <line x1="33" y1="6" x2="33" y2="4" />
    </svg>
  );
}

const icons = [
  { key: "pizza", Component: PizzaIcon, floatDelay: 0 },
  { key: "soda", Component: SodaIcon, floatDelay: 0.6 },
  { key: "burger", Component: BurgerIcon, floatDelay: 1.2 },
];

// ─── Headline lines config ───────────────────────────────────────────────────

const headlineLines = [
  {
    text: "Shop Smarter & Faster,",
    style: {
      fontSize: "clamp(1.8rem, 4.5vw, 4rem)", // clamp(1.8rem , 4vw , 3.5rem)
      fontWeight: 900,
      color: "#111827",
      lineHeight: 1.0,
      letterSpacing: "-0.05em",
      fontFamily: "'Soria'",
    },
    delay: 0.1,
  },
  {
    text: "Live Better.",
    style: {
      fontSize: "clamp(1.5rem, 6vw, 2.6rem)",
      fontWeight: 900,
      color: "var(--color-primary)",
      lineHeight: 1.05,
      letterSpacing: "-0.04em",
      marginTop: "0.25rem",
      fontFamily: "'Soria'",
    },
    delay: 0.2,
  },
  {
    text: "Everything you need,",
    style: {
      fontSize: "clamp(1rem, 2vw, 1.5rem)",
      fontWeight: 600,
      color: "#374151",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
      marginTop: "0.5rem",
    },
    delay: 0.3,
  },
  {
    text: "delivered to your door.",
    style: {
      fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
      fontWeight: 500,
      color: "#9ca3af",
      lineHeight: 1.4,
      marginTop: "0.25rem",
    },
    delay: 0.4,
  },
  {
    text: "Your smart shopping destination.",
    style: {
      fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
      fontWeight: 400,
      color: "#d1d5db",
      letterSpacing: "0.04em",
      textTransform: "uppercase" as const,
      marginTop: "0.75rem",
    },
    delay: 0.5,
  },
];

// ─── Welcome Page ────────────────────────────────────────────────────────────

export default function WelcomePage() {
  const router = useRouter();
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  // Animate only on first visit — prevents size flicker on return navigation
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

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
        background: "#ffffff",
      }}
    >
      {/* ── Background orbs ──────────────────────────────────────────────── */}
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

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "-10rem",
          right: "-8rem",
          width: "40rem",
          height: "40rem",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,146,60,0.2) 0%, rgba(251,146,60,0.05) 55%, transparent 75%)",
          filter: "blur(56px)",
          pointerEvents: "none",
        }}
      />

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

      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Main content column ──────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          maxWidth: "min(100%, 800px)",
          margin: "0 auto",
          padding: "clamp(1.5rem, 5vw, 3rem)",
        }}
      >
        {/* 1. Logo */}
        <motion.div
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          style={{ marginBottom: "1.5rem" }}
        >
          <div style={{ marginBottom: "clamp(0.75rem, 2vw, 1rem)" }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{
                scale: 1.06,
                transition: { type: "spring", stiffness: 350, damping: 14 },
              }}
              style={{
                background: "rgba(252, 239, 239, 0.9)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "29rem",
                boxShadow:
                  "0 8px 48px rgba(249,115,22,0.12), 0 2px 12px rgba(0,0,0,0.05), 0 0 0 1px #f3f4f6",
                cursor: "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.2em",
              }}
            >
              <UbuyeeLogo size="lg" />
            </motion.div>
          </div>
        </motion.div>

        {/* 2. Editorial headline — clamp sizes, nowrap, first-visit animation only */}
        <motion.div
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{ marginBottom: "2rem" }}
        >
          {headlineLines.map((line, i) => (
            <motion.span
              key={i}
              initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: line.delay }}
              style={{
                display: "block",
                whiteSpace: i < 2 ? "nowrap" : "normal",
                ...line.style,
              }}
            >
              {line.text}
            </motion.span>
          ))}
        </motion.div>

        {/* 3. Food icons row — floating motion + hover */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(1rem, 5vw, 2rem)",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {icons.map(({ key, Component, floatDelay }, index) => {
            const isHovered = hoveredIcon === index;
            return (
              <motion.div
                key={key}
                // Entry animation
                initial={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1 + 0.3,
                }}
              >
                {/* Floating motion wrapper */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 15 },
                  }}
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  style={{
                    width: "clamp(64px, 12vw, 72px)",
                    height: "clamp(64px, 12vw, 72px)",
                    borderRadius: "50%",
                    background: isHovered ? "var(--color-primary)" : "var(--color-50)",
                    border: `2px solid ${isHovered ? "var(--color-primary)" : "var(--color-100)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                    cursor: "pointer",
                    boxShadow: isHovered
                      ? "0 12px 24px rgba(249,115,22,0.25)"
                      : "none",
                  }}
                >
                  <Component color={isHovered ? "#ffffff" : "#f97316"} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* 4. Get Started button */}
        <motion.div
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <motion.button
            onClick={() => router.push("/login")}
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
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
              cursor: "pointer",
              boxShadow: "0 8px 28px rgba(249,115,22,0.32)",
              transition: "background 0.2s",
            }}
          >
            Get Started
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

        {/* 5. Already have account */}
        <motion.p
          initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          style={{
            margin: "1.25rem 0 0",
            fontSize: "0.9rem",
            color: "#6b7280",
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
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hooks";
import { loginThunk } from "@/store/slices/authSlice";
import { FiEye, FiEyeOff, FiArrowRight, FiLogIn, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { primary, neutral, radius, success, error as errorColors } from "@/theme";

/**
 * LoginForm – Redesigned for White Theme
 */

const ROLE_DASHBOARD: Record<string, string> = {
  user: "/user/dashboard",
  vendor: "/vendor/dashboard",
  admin: "/admin/dashboard",
};

interface LoginFormProps {
  role: "user" | "vendor" | "admin";
  portalOrigin: "user" | "vendor" | "admin";
  submitButtonBackground?: string;
  submitButtonHoverBackground?: string;
  submitButtonText?: string;
}

export function LoginForm({
  role,
  portalOrigin,
  submitButtonBackground = "var(--color-primary)",
  submitButtonHoverBackground = "var(--color-primary-hover)",
  submitButtonText
}: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("signup") === "success") {
      setSignupSuccess(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await dispatch(loginThunk({ email, password, portalOrigin }));

      if (loginThunk.fulfilled.match(result)) {
        toast.success("Login successful!", { id: "login-toast" });
        router.push(ROLE_DASHBOARD[portalOrigin]);
      } else {
        const errorMsg = (result.payload as string) ?? "Login failed. Please try again.";
        setError(errorMsg);
        
        // Suppress toast for access denied to avoid cluttering if the UI shows it clearly
        if (!errorMsg.includes("Access denied")) {
          toast.error(errorMsg, { id: "login-error-toast" });
        }
      }
    } catch (err: unknown) {
      const errorMsg = "An unexpected error occurred.";
      setError(errorMsg);
      toast.error(errorMsg, { id: "login-error-toast" });
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: neutral[50],
    border: `1.5px solid ${neutral[200]}`,
    borderRadius: "var(--radius-lg)",
    padding: "0.75rem 1rem",
    fontSize: "16px", // iOS zoom fix
    color: neutral[900],
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    marginBottom: "0.875rem",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: neutral[700],
    marginBottom: "0.375rem",
    display: "block",
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Email field */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label htmlFor={`email-${role}`} style={labelStyle}>
          Email Address
        </label>
        <input
          id={`email-${role}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          className="auth-input"
        />
      </div>

      {/* Password field */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label htmlFor={`password-${role}`} style={labelStyle}>
          Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            id={`password-${role}`}
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            className="auth-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "0.875rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: neutral[400],
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = primary.DEFAULT)}
            onMouseLeave={(e) => (e.currentTarget.style.color = neutral[400])}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      </div>

      {/* Success message from signup redirect */}
      {signupSuccess && !error && (
        <div
          style={{
            padding: "0.75rem",
            background: success.light,
            border: `1px solid ${success.border}`,
            borderRadius: radius.xl,
            color: success.text,
            fontSize: "0.85rem",
            textAlign: "center",
            marginBottom: "1.25rem",
          }}
        >
          Account created successfully! Please sign in.
        </div>
      )}

      {/* Inline error message */}
      {error && (
        <div
          style={{
            background: errorColors.light,
            border: `1px solid ${errorColors.border}`,
            borderRadius: radius.lg,
            padding: "0.75rem 1rem",
            color: errorColors.text,
            fontSize: "0.875rem",
            fontWeight: 500,
            textAlign: "center",
            marginTop: "0.5rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <FiAlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: "100%",
          background: submitButtonBackground,
          color: "var(--color-0)",
          fontSize: "0.95rem",
          fontWeight: 700,
          padding: "0.875rem 1.5rem",
          borderRadius: "var(--radius-xl)",
          border: "none",
          cursor: isLoading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "0.5rem",
          opacity: isLoading ? 0.75 : 1,
          transition: "all 0.2s ease",
          letterSpacing: "0.01em",
          height: "3.25rem",
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.background = submitButtonHoverBackground;
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.background = submitButtonBackground;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }}
          />
        ) : submitButtonText ? (
          <span dangerouslySetInnerHTML={{ __html: submitButtonText }} />
        ) : (
          <>
            Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
            <FiArrowRight size={18} />
          </>
        )}
      </button>

      {/* Shared Focus CSS logic */}
      <style jsx global>{`
        .auth-input:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.1) !important;
          background: var(--color-0) !important;
        }
      `}</style>
    </motion.form>
  );
}

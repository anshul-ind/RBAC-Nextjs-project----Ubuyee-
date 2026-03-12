"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiArrowRight, FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store/hooks";
import { signupThunk } from "@/store/slices/authSlice";

/**
 * SignupForm – Redesigned for White Theme
 */

const ROLE_DASHBOARD: Record<string, string> = {
  user: "/user/dashboard",
  vendor: "/vendor/dashboard",
  admin: "/admin/dashboard",
};

type SignupFormProps = {
  role: "user" | "vendor" | "admin";
  portalOrigin: "user" | "vendor" | "admin";
};

export function SignupForm({ role, portalOrigin }: SignupFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await dispatch(
        signupThunk({ name, email, password, role })
      );

      if (signupThunk.fulfilled.match(result)) {
        toast.success("Account created successfully!", { duration: 5000 });
        router.push(ROLE_DASHBOARD[portalOrigin] ?? "/login");
      } else {
        const errorMsg = (result.payload as string) ?? "Sign up failed. Please try again.";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: unknown) {
      const errorMsg = axios.isAxiosError(err)
        ? (err.response?.data?.error ?? "Sign up failed. Please try again.")
        : "An unexpected error occurred.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-50)",
    border: "1.5px solid var(--color-200)",
    borderRadius: "var(--radius-lg)",
    padding: "0.75rem 1rem",
    fontSize: "16px", // iOS zoom fix
    color: "var(--color-900)",
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
    color: "var(--color-700)",
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
      {/* Name field */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label htmlFor={`name-${role}`} style={labelStyle}>
          Full Name
        </label>
        <input
          id={`name-${role}`}
          type="text"
          required
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          className="auth-input"
        />
      </div>

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
            autoComplete="new-password"
            placeholder="Min. 6 characters"
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
              color: "var(--color-400)",
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-400)")}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      </div>

      {/* Inline error message */}
      {error && (
        <p style={{ color: "var(--color-error-text)", fontSize: "0.82rem", margin: "0 0 1.25rem 0", textAlign: "center" }}>
          ⚠ {error}
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: "100%",
          background: "var(--color-primary)",
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
            e.currentTarget.style.background = "var(--color-primary-hover)";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(249,115,22,0.35)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.background = "var(--color-primary)";
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
        ) : (
          <>
            Sign up as {role.charAt(0).toUpperCase() + role.slice(1)}
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

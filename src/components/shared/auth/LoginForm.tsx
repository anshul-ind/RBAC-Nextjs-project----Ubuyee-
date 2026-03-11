"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { FiEye, FiEyeOff, FiArrowRight, FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";

/**
 * LoginForm – Redesigned for White Theme
 */

const ROLE_DASHBOARD: Record<string, string> = {
  user: "/user/dashboard",
  vendor: "/vendor/dashboard",
  admin: "/admin/dashboard",
};

type LoginFormProps = {
  role: "user" | "vendor" | "admin";
};

export function LoginForm({ role }: LoginFormProps) {
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
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
        role,
      });

      dispatch(
        setCredentials({
          user: data.user,
          token: null,
        }),
      );

      toast.success("Login successful!", { id: "login-toast" });
      router.push(ROLE_DASHBOARD[role] ?? "/");
    } catch (err: unknown) {
      const errorMsg = axios.isAxiosError(err)
        ? (err.response?.data?.error ?? "Login failed. Please try again.")
        : "An unexpected error occurred.";
      setError(errorMsg);
      toast.error(errorMsg, { id: "login-error-toast" });
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#f9fafb",
    border: "1.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "0.75rem 1rem",
    fontSize: "0.9rem",
    color: "#111827",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#374151",
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
              color: "#9ca3af",
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f97316")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
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
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "12px",
            color: "#16a34a",
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
        <p style={{ color: "#ef4444", fontSize: "0.82rem", margin: "0 0 1.25rem 0", textAlign: "center" }}>
          ⚠ {error}
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: "100%",
          background: "#f97316",
          color: "#ffffff",
          fontSize: "0.95rem",
          fontWeight: 700,
          padding: "0.875rem 1.5rem",
          borderRadius: "12px",
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
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.background = "#ea6c0a";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(249,115,22,0.35)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.background = "#f97316";
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
            Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
            <FiArrowRight size={18} />
          </>
        )}
      </button>

      {/* Shared Focus CSS logic */}
      <style jsx global>{`
        .auth-input:focus {
          border-color: #f97316 !important;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.1) !important;
          background: #ffffff !important;
        }
      `}</style>
    </motion.form>
  );
}

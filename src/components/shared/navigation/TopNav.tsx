"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAuth, logoutThunk } from "@/store/slices/authSlice";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FiShoppingCart,
  FiLock,
  FiLogOut,
  FiUser,
  FiHome,
  FiGrid,
  FiPhone,
  FiInfo,
  FiMenu,
  FiX
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import UbuyeeLogo from "@/components/shared/UbuyeeLogo";
import { primary, neutral, radius, space } from "@/theme";

/**
 * TopNav Component - Refined for Ubuyee
 * Precise spacing, clean branding, and premium JS-based hover states.
 */
export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user, role } = useAppSelector(selectAuth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Navigation Links
  const navLinks = [
    { label: "Home", icon: FiHome, path: "/user/dashboard" },
    { label: "Shop", icon: FiGrid, path: "/user/shop" },
    { label: "Orders", icon: FiShoppingCart, path: "/user/orders" },
    { label: "Contact", icon: FiPhone, path: "/user/contact" },
    { label: "Services", icon: FiInfo, path: "/user/services" },
  ];

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.push("/login");
  };

  const checkActive = (path: string) => {
    if (path === "/user/dashboard") return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        backgroundColor: neutral[0],
        borderBottom: `1px solid ${neutral[100]}`,
        boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: space.pageMaxWidth,
          margin: "0 auto",
          padding: `0 ${space.pagePadding}`,
          height: space.navHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 0,
        }}
      >
        {/* TASK 1: LEFT SECTION - LOGO */}
        <div
          style={{
            flexShrink: 0,
          }}
        >
          <UbuyeeLogo
            size="md"
            onClick={() => router.push("/user/dashboard")}
          />
        </div>

        {/* TASK 3: CENTER SECTION - NAV LINKS (JS Hover) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
  const isHovered = hoveredLink === link.path;

  return (
    <Link
      key={link.path}
      href={link.path}
      onMouseEnter={() => setHoveredLink(link.path)}
      onMouseLeave={() => setHoveredLink(null)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.5rem 1rem",
        borderRadius: radius.lg,
        fontSize: "0.875rem",
        fontWeight: isHovered ? 600 : 500,
        color: isHovered ? primary.DEFAULT : neutral[500],
        textDecoration: "none",
        backgroundColor: isHovered ? primary.light : "transparent",
        transition: "all 0.15s ease",
        whiteSpace: "nowrap",
        transform: isHovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <link.icon
        size={16}
        color={isHovered ? "#f97316" : "#9ca3af"}
        style={{ transition: "color 0.15s ease" }}
      />
      <span>{link.label}</span>
    </Link>
  );
})}
        </div>

        {/* TASK 4: RIGHT SECTION - USER ACTIONS */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Cart Icon */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.25rem",
              height: "2.25rem",
              cursor: "pointer",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              const icon = e.currentTarget.querySelector('svg');
              if (icon) icon.style.color = "#f97316";
            }}
            onMouseLeave={(e) => {
              const icon = e.currentTarget.querySelector('svg');
              if (icon) icon.style.color = "#374151";
            }}
          >
            <FiShoppingCart size={20} color="#374151" style={{ transition: "color 0.15s ease" }} />
            <div
              style={{
                position: "absolute",
                top: "-2px",
                right: "-2px",
                minWidth: "16px",
                height: "16px",
                borderRadius: "999px",
                backgroundColor: "#f97316",
                color: "white",
                fontSize: "0.6rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 3px",
                border: "2px solid white",
              }}
            >
              2
            </div>
          </div>

          {/* Lock Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.25rem",
              height: "2.25rem",
              cursor: "pointer",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              const icon = e.currentTarget.querySelector('svg');
              if (icon) icon.style.color = "#f97316";
            }}
            onMouseLeave={(e) => {
              const icon = e.currentTarget.querySelector('svg');
              if (icon) icon.style.color = "#374151";
            }}
          >
            <FiLock size={18} color="#374151" style={{ transition: "color 0.15s ease" }} />
          </div>

          {/* Vertical Divider */}
          <div style={{ width: "1px", height: "1.5rem", backgroundColor: "#e5e7eb", flexShrink: 0 }} />

          {/* User Info Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              padding: "0.25rem 0.5rem",
              borderRadius: "999px",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                backgroundColor: "#fff7ed",
                border: "2px solid #f97316",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#f97316",
                flexShrink: 0,
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#374151",
                textTransform: "capitalize",
              }}
            >
              {role ?? "User"}
            </span>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 1.125rem",
              borderRadius: "10px",
              backgroundColor: "#f97316",
              color: "white",
              fontSize: "0.825rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#ea6c0a";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(249,115,22,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f97316";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FiLogOut size={14} />
            <span>Sign out</span>
          </button>

          {/* Mobile Menu Toggle (Visible only on small screens) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: "2.25rem",
              height: "2.25rem",
              border: "1px solid #f3f4f6",
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#374151",
            }}
            className="md:hidden"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              backgroundColor: "#ffffff",
              borderBottom: "1px solid #f3f4f6",
              overflow: "hidden",
            }}
            className="md:hidden"
          >
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {navLinks.map((link) => {
                const isActive = checkActive(link.path);
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      fontSize: "0.95rem",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#f97316" : "#4b5563",
                      textDecoration: "none",
                      backgroundColor: isActive ? "#fff7ed" : "transparent",
                    }}
                  >
                    <link.icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

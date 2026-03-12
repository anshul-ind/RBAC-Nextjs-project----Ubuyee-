"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingBag,
  BarChart2,
  Settings,
  HelpCircle,
  LucideIcon
} from "lucide-react";
import UbuyeeLogo from "@/components/shared/UbuyeeLogo";

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  path: string;
  isActive: boolean;
  onClick: (path: string) => void;
}

const NavItem = ({ label, icon: Icon, path, isActive, onClick }: NavItemProps) => {
  return (
    <div
      onClick={() => onClick(path)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.625rem 0.75rem",
        borderRadius: "8px",
        fontSize: "0.875rem",
        fontWeight: isActive ? 600 : 500,
        color: isActive ? "var(--primary-text)" : "var(--neutral-text)",
        backgroundColor: isActive ? "var(--primary-bg)" : "transparent",
        cursor: "pointer",
        transition: "all 0.15s ease",
        marginBottom: "0.125rem",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "var(--accent-bg)";
          e.currentTarget.style.color = "var(--accent-text)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--neutral-text)";
        }
      }}
    >
      <Icon
        size="1.125rem"
        style={{ opacity: isActive ? 1 : 0.7 }}
      />
      <span>{label}</span>
    </div>
  );
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <motion.aside
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        duration: 0.4
      }}
      style={{
        width: "15.0rem",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 40,
        backgroundColor: "var(--neutral-bg)",
        borderRight: "1px solid var(--neutral-border)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar Top: Logo */}
      <div
        style={{
          padding: "1.5rem 1.25rem",
          borderBottom: "1px solid var(--neutral-border)",
          height: "4rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <UbuyeeLogo size="sm" />
      </div>

      {/* Sidebar Navigation */}
      <div style={{ padding: "1rem 0.75rem", flex: 1 }}>
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--neutral-muted)",
            padding: "0 0.5rem",
            marginBottom: "0.5rem",
            marginTop: "1rem",
          }}
        >
          General
        </div>
        <NavItem
          label="Dashboard"
          icon={LayoutDashboard}
          path="/admin/dashboard"
          isActive={pathname === "/admin/dashboard"}
          onClick={handleNav}
        />
        <NavItem
          label="Users"
          icon={Users}
          path="/admin/users"
          isActive={pathname === "/admin/users"}
          onClick={handleNav}
        />
        <NavItem
          label="Vendors"
          icon={Store}
          path="/admin/vendors"
          isActive={pathname === "/admin/vendors"}
          onClick={handleNav}
        />
        <NavItem
          label="Orders"
          icon={ShoppingBag}
          path="/admin/orders"
          isActive={pathname === "/admin/orders"}
          onClick={handleNav}
        />
        <NavItem
          label="Analytics"
          icon={BarChart2}
          path="/admin/analytics"
          isActive={pathname === "/admin/analytics"}
          onClick={handleNav}
        />

        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--neutral-muted)",
            padding: "0 0.5rem",
            marginBottom: "0.5rem",
            marginTop: "2rem",
          }}
        >
          Others
        </div>
        <NavItem
          label="Settings"
          icon={Settings}
          path="/admin/settings"
          isActive={pathname === "/admin/settings"}
          onClick={handleNav}
        />
        <NavItem
          label="Need Help"
          icon={HelpCircle}
          path="/admin/help"
          isActive={pathname === "/admin/help"}
          onClick={handleNav}
        />
      </div>

      {/* Sidebar Bottom: Upgrade Card */}
      <div
        style={{
          margin: "1rem",
          padding: "1rem",
          backgroundColor: "var(--primary-bg)",
          border: "1px solid var(--primary-border)",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            fontSize: "0.80rem",
            fontWeight: 700,
            color: "var(--accent-text)",
            marginBottom: "0.375rem",
          }}
        >
          Upgrade to Pro 🚀
        </div>
        <div
          style={{
            fontSize: "0.70rem",
            color: "var(--neutral-muted)",
            lineHeight: 1.5,
            marginBottom: "0.75rem",
          }}
        >
          Unlock full features for your store.
        </div>
        <button
          style={{
            width: "100%",
            backgroundColor: "var(--primary-text)",
            color: "white",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            textAlign: "center",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-text)")}
        >
          Upgrade Plan
        </button>
      </div>
    </motion.aside>
  );
}

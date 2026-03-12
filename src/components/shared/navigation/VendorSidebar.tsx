"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  FileText,
  Settings,
  X,
  LucideIcon
} from "lucide-react";
import UbuyeeLogo from "@/components/shared/UbuyeeLogo";

interface VendorSidebarProps {
  onClose: () => void;
}

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
        padding: "0.625rem 1rem",
        borderRadius: "10px",
        margin: "0.125rem 0.5rem",
        fontSize: "0.875rem",
        fontWeight: isActive ? 600 : 500,
        color: isActive ? "var(--color-primary)" : "var(--color-700)",
        backgroundColor: isActive ? "var(--color-primary-light)" : "transparent",
        borderLeft: isActive ? "3px solid var(--color-primary)" : "none",
        paddingLeft: isActive ? "calc(1rem - 3px)" : "1rem",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "var(--color-50)";
          e.currentTarget.style.color = "var(--color-900)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--color-700)";
        }
      }}
    >
      <Icon size="1.125rem" />
      <span>{label}</span>
    </div>
  );
};

export default function VendorSidebar({ onClose }: VendorSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
    // On mobile we might want to close sidebar after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "var(--neutral-bg)",
      }}
    >
      {/* Sidebar Top */}
      <div
        style={{
          padding: "0 1rem",
          borderBottom: "1px solid var(--neutral-border)",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={onClose}
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "8px",
            backgroundColor: "var(--color-50)",
            border: "1px solid var(--neutral-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--color-700)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary-light)";
            e.currentTarget.style.color = "var(--color-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-50)";
            e.currentTarget.style.color = "var(--color-700)";
          }}
        >
          <X size={18} />
        </button>
        <div>
          <UbuyeeLogo size="sm" />
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div style={{ flex: 1, paddingTop: "1rem", overflowY: "auto" }}>
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#9ca3af",
            padding: "1rem 1rem 0.5rem",
          }}
        >
          Vendor Menu
        </div>
        <NavItem
          label="Dashboard"
          icon={LayoutDashboard}
          path="/vendor/dashboard"
          isActive={pathname === "/vendor/dashboard"}
          onClick={handleNav}
        />
        <NavItem
          label="My Products"
          icon={Package}
          path="/vendor/products"
          isActive={pathname === "/vendor/products"}
          onClick={handleNav}
        />
        <NavItem
          label="Orders"
          icon={ShoppingBag}
          path="/vendor/orders"
          isActive={pathname === "/vendor/orders"}
          onClick={handleNav}
        />
        <NavItem
          label="Sales"
          icon={TrendingUp}
          path="/vendor/sales"
          isActive={pathname === "/vendor/sales"}
          onClick={handleNav}
        />
        <NavItem
          label="Customers"
          icon={Users}
          path="/vendor/customers"
          isActive={pathname === "/vendor/customers"}
          onClick={handleNav}
        />
        <NavItem
          label="Invoices"
          icon={FileText}
          path="/vendor/invoices"
          isActive={pathname === "/vendor/invoices"}
          onClick={handleNav}
        />
        <NavItem
          label="Settings"
          icon={Settings}
          path="/vendor/settings"
          isActive={pathname === "/vendor/settings"}
          onClick={handleNav}
        />
      </div>

      {/* Sidebar Bottom: Vendor Info Card */}
      <div
        style={{
          margin: "1rem",
          padding: "1rem",
          background: "linear-gradient(135deg, var(--primary-bg), #ffedd5)",
          border: "1px solid var(--primary-border)",
          borderRadius: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.25rem" }}>🏪</span>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#111827" }}>My Store</div>
            <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>Vendor Portal</div>
          </div>
        </div>
        <button
          style={{
            width: "100%",
            marginTop: "0.75rem",
            backgroundColor: "var(--primary-text)",
            color: "white",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "0.5rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-text)")}
        >
          + Add Product
        </button>
      </div>
    </div>
  );
}

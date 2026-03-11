"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { motion, AnimatePresence } from "framer-motion";
import VendorSidebar from "@/components/shared/navigation/VendorSidebar";
import VendorTopNav from "@/components/shared/navigation/VendorTopNav";

/**
 * Task 1: Vendor Layout with Toggle Sidebar
 * Implements a slide-in sidebar for Vendor portal.
 */

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        position: "relative",
      }}
    >
      {/* 1. OVERLAY (when sidebar open on mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 30,
              backdropFilter: "blur(2px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. SIDEBAR (slides from left) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "15rem",
              height: "100vh",
              backgroundColor: "#ffffff",
              borderRight: "1px solid var(--neutral-border)",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 0 24px rgba(0,0,0,0.08)",
            }}
          >
            <VendorSidebar onClose={() => setSidebarOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 3. MAIN CONTENT AREA */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease",
        }}
      >
        <VendorTopNav
          onMenuClick={() => setSidebarOpen(true)}
          sidebarOpen={sidebarOpen}
          userName={user?.name}
        />
        <main
          style={{
            padding: "2rem",
            flex: 1,
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

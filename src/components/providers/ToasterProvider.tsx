"use client";

import { Toaster } from "react-hot-toast";

/**
 * Global Toaster configuration.
 * Using a separate component to keep it client-side.
 */
export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Define default options
        duration: 3000,
        style: {
          background: "#1e293b",
          color: "#f8fafc",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: "0.9rem",
          fontWeight: 500,
          borderRadius: "0.75rem",
          maxWidth: "400px",
          padding: "12px 20px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}

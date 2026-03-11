"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import TopNav from "@/components/shared/navigation/TopNav";

export default function UserPortalLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // If we are already on the login or signup page, don't trigger a redirect
    const path = window.location.pathname;
    if (path.endsWith("/login") || path.endsWith("/signup")) {
      return;
    }

    // If Redux is done loading and we still don't have an authenticated string
    if (!isLoading && !isAuthenticated) {
      router.push("/user/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const isAuthPage = typeof window !== "undefined" && (window.location.pathname.endsWith("/login") || window.location.pathname.endsWith("/signup"));

  if (isLoading && !isAuthPage) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#ffffff", color: "#f97316" }}>
        Loading user portal...
      </div>
    );
  }

  // Also catch edge case where a non-user sneaks past middleware (shouldn't happen, but good to check)
  if (!isAuthPage && user && user.role !== "user" && user.role !== "admin") {
    return null; // Will be kicked by middleware anyway
  }

  if (!isAuthPage && !isAuthenticated) return null;

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      {!isAuthPage && <TopNav userName={user?.name || user?.email || "User"} role={user?.role as any} />}
      <div style={{ padding: "0 24px 24px 24px" }}>
        {children}
      </div>
    </div>
  );
}

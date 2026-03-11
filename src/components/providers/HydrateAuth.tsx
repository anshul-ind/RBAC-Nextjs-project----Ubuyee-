"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, clearAuth } from "@/store/slices/authSlice";

/**
 * HydrateAuth — Invisible component rendered at the root layout.
 *
 * When a user refreshes the page, the Next.js server still knows they are
 * logged in (via the stateless HTTP cookie), but the client-side Redux store
 * gets wiped from memory.
 *
 * On initial mount, this queries the `/api/auth/me` endpoint. If the HTTP cookie
 * is valid, it retrieves their user data and dispatches it straight back into
 * the Redux store. While this happens, `auth.isLoading` remains `true`.
 */
export function HydrateAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function hydrate() {
      try {
        const res = await fetch("/api/auth/me");
        
        if (res.ok) {
          const data = await res.json();
          // The /api/auth/me endpoint doesn't return the raw JWT payload string
          // directly for security, so we pass token: null here. The middleware
          // continues relying entirely on the locked httpOnly cookie.
          dispatch(setCredentials({ user: data.user, token: null }));
        } else {
          // No valid cookie, or cookie expired.
          dispatch(clearAuth());
        }
      } catch (err) {
        console.error("Failed to hydrate auth state:", err);
        dispatch(clearAuth());
      }
    }

    hydrate();
  }, [dispatch]);

  return null;
}

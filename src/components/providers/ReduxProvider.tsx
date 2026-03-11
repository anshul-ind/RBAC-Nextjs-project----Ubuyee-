"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { HydrateAuth } from "./HydrateAuth";

/**
 * Client-side Redux Provider wrapper.
 *
 * This component safely provides the Redux store to the server-side Next.js
 * layout. It also includes the HydrateAuth component to automatically 
 * re-verify the HTTP cookie on hard browser reloads.
 */
export function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <HydrateAuth />
      {children}
    </Provider>
  );
}

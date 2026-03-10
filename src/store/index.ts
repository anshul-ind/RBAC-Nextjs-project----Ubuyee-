import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { dashboardReducer } from "./slices/dashboardSlice";

/**
 * Root Redux store configuration.
 */
export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      dashboard: dashboardReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

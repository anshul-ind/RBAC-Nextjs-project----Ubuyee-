import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./index";

/**
 * Typed versions of the standard React Redux hooks.
 *
 * Usage:
 *   const dispatch = useAppDispatch();
 *   const user = useAppSelector((state) => state.auth.user);
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

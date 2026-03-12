"use client"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { hydrateAuthThunk } from "@/store/slices/authSlice"

export function HydrateAuth() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Always run on mount — even if already authenticated
    // This syncs Redux with the httpOnly cookie
    dispatch(hydrateAuthThunk())
  }, [dispatch])

  return null
}

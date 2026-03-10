export type AppRole = "user" | "vendor" | "admin";

export function useRole() {
  return { role: null as AppRole | null };
}

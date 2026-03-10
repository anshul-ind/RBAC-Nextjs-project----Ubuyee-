export function useAuth() {
  return {
    isAuthenticated: false,
    user: null as null | { id: string; role: string; email?: string },
  };
}

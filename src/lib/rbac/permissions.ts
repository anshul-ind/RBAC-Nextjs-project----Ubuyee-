export type Role = "user" | "vendor" | "admin";

export type Permission =
  | "dashboard:read"
  | "user:read"
  | "user:write"
  | "vendor:read"
  | "vendor:write"
  | "admin:read"
  | "admin:write";

export const rolePermissions: Record<Role, Permission[]> = {
  user: ["dashboard:read", "user:read"],
  vendor: ["dashboard:read", "vendor:read", "vendor:write"],
  admin: ["dashboard:read", "admin:read", "admin:write", "user:read", "vendor:read"],
};

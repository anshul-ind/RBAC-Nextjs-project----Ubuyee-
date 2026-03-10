import type { Permission, Role } from "./permissions";
import { rolePermissions } from "./permissions";

export function rolePermissionCheck(role: Role, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

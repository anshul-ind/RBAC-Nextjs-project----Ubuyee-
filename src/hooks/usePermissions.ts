export type Permission = string;

export function usePermissions() {
  return { permissions: [] as Permission[] };
}

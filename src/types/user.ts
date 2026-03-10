import type { Role } from "./auth";

export type User = {
  id: string;
  email: string;
  role: Role;
};

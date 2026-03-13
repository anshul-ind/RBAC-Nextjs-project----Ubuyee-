import type { Role } from "./auth";

export interface User {
  id: string;
  email: string;
  role: Role;
}

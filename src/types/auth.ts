export type Role = "user" | "vendor" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}

export interface LoginRequest { email: string; password: string; role: Role }
export interface SignupRequest { email: string; password: string; role: Role }

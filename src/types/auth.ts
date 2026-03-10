export type Role = "user" | "vendor" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};

export type LoginRequest = { email: string; password: string; role: Role };
export type SignupRequest = { email: string; password: string; role: Role };

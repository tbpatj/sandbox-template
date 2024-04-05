import { StrapiError } from "./ErrorResources";

export interface AppUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// -------- Auth Hook Resources --------

export type AuthLoginFunc = (
  email: string,
  password: string,
  remember?: boolean
) => Promise<LoginResponse>;

export type AuthSignupFunc = (
  username: string,
  email: string,
  password: string
) => Promise<RegisterResponse>;

export type AuthStatus = "auth" | "loading" | "error" | "unauth";

// -------- Login User --------

export interface LoginResponseData {
  user: AppUser;
  jwt: string;
}

export interface LoginResponse {
  data: LoginResponseData | null;
  error?: StrapiError;
}

// -------- Register User --------

export interface RegisterResponseData {}

export interface RegisterResponse {
  data: RegisterResponseData | null;
  error?: StrapiError;
}

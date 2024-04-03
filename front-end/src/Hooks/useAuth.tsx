import { useState } from "react";
import useFetcher, { FetcherFunc } from "./useFetcher";

// interface AuthProps {}

export interface AuthHook {
  token: string;
  authStatus: AuthStatus;
  login: (email: string, password: string) => void;
  logout: () => void;
  fetcher: FetcherFunc;
}

type AuthStatus = "auth" | "loading" | "error" | "unauth";

export const defaultAuthHook: AuthHook = {
  token: "",
  authStatus: "loading",
  login: (email: string, password: string) => {},
  logout: () => {},
  fetcher: () => null,
};

const useAuth: () => AuthHook = () => {
  const [token, setToken] = useState<string>("");
  const [authStatus, setAuthStatus] = useState<AuthStatus>("auth");

  const { fetcher } = useFetcher({ token: token });

  const login = (email: string, password: string) => {
    // fetcher;
  };

  const logout = () => {
    setToken("");
    setAuthStatus("unauth");
  };

  return {
    token,
    authStatus,
    fetcher,
    login,
    logout,
  };
};

export default useAuth;

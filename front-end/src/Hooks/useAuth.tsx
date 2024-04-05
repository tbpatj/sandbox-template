import { useEffect, useState } from "react";
import useFetcher, { FetcherFunc } from "./useFetcher";
import {
  AppUser,
  AuthLoginFunc,
  AuthSignupFunc,
  AuthStatus,
  LoginResponse,
  RegisterResponse,
} from "../Resources/AuthResources";

// interface AuthProps {}

export interface AuthHook {
  token: string;
  authStatus: AuthStatus;
  user: AppUser;
  login: AuthLoginFunc;
  signup: AuthSignupFunc;
  logout: () => void;
  fetcher: FetcherFunc;
}

export const defaultAuthHook: AuthHook = {
  token: "",
  authStatus: "loading",
  user: {} as AppUser,
  login: async (email: string, password: string) => {
    return {} as LoginResponse;
  },
  signup: async (username: string, email: string, password: string) => {
    return {} as RegisterResponse;
  },
  logout: () => {},
  fetcher: () => null,
};

const useAuth: () => AuthHook = () => {
  const [token, setToken] = useState<string>("");
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AppUser | undefined>();

  const { fetcher } = useFetcher({ token: token });

  const login: AuthLoginFunc = async (
    email: string,
    password: string,
    remember?: boolean
  ) => {
    //when the user attempts to login we will hit the endpoint and get the token
    const response: LoginResponse = await fetcher(
      "http://localhost:1337/api/auth/local",
      {
        body: { identifier: email, password: password },
        method: "POST",
      }
    );
    if (!response?.error && response?.data?.jwt && response?.data?.user) {
      if (remember) localStorage.setItem("token", response.data?.jwt ?? "");
      setToken(response.data?.jwt ?? "");
      setUser(response.data?.user);
      setAuthStatus("auth");
    }
    return response;
  };

  const signup: AuthSignupFunc = async (
    username: string,
    email: string,
    password: string
  ) => {
    const response = await fetcher(
      "http://localhost:1337/api/auth/local/register",
      {
        body: { username, email, password },
        method: "POST",
      }
    );
    if (!response?.error && response?.data?.jwt && response?.data?.user) {
      localStorage.setItem("token", response.data?.jwt ?? "");
      setToken(response.data.jwt ?? "");
      setUser(response.data.user);
      setAuthStatus("auth");
    } else if (
      !response.error &&
      !response?.data?.jwt &&
      !response?.data?.user
    ) {
      response.error = { message: "Error signing up" };
    }
    return response;
  };

  const logout = async () => {
    setToken("");
    setUser(undefined);
    setAuthStatus("unauth");
  };

  useEffect(() => {
    setAuthStatus("unauth");
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token") as string);
      setAuthStatus("auth");
    }
  }, []);

  return {
    token,
    authStatus,
    fetcher,
    login,
    logout,
    user: user ?? ({} as AppUser),
    signup,
  };
};

export default useAuth;

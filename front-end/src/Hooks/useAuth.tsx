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

const serverURL = process.env.REACT_APP_BASE_URL ?? "";

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

/**
 * Custom hook for handling authentication logic.
 *
 * @returns An object containing the following properties:
 * - `token`: The authentication token.
 * - `authStatus`: Either "auth", "unauth", "loading", or "error"
 * - `fetcher`: A function for making authenticated API requests.
 * - `login`: A function for logging in a user.
 * - `logout`: A function for logging out a user.
 * - `user`: The authenticated user object.
 * - `signup`: A function for signing up a new user.
 */
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
      `${serverURL}/api/auth/local`,
      {
        body: { identifier: email, password: password },
        method: "POST",
      }
    );
    if (!response?.error && response?.data?.jwt && response?.data?.user) {
      //save the jwt token to the local storage only if the user wants it to be stored, then update the rest of the global context data
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
    const response = await fetcher(`${serverURL}/api/auth/local/register`, {
      body: { username, email, password },
      method: "POST",
    });
    // if we find no errors and there is a user and jwt then we successfully authenticated
    if (!response?.error && response?.data?.jwt && response?.data?.user) {
      //save the jwt token to the local storage, then update the rest of the global context data
      localStorage.setItem("token", response.data?.jwt ?? "");
      setToken(response.data.jwt ?? "");
      setUser(response.data.user);
      setAuthStatus("auth");
    } else if (
      // if we didn't receive an error but also didn't get the expected data, we have an error
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

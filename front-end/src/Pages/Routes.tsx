import { RouteObject } from "react-router-dom";
import Navbar from "./Navigation/Navbar";
import HomePage from "./Home/HomePage";
import SignUpPage from "./SignUp/SignUpPage";
import LoginPage from "./Login/LoginPage";
import ForgotPasswordPage from "./ForgotPassword/ForgotPasswordPage";
import Dashboard from "./Dashboard/Dashboard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navbar />,
    errorElement: <div>404</div>,
    children: [
      {
        errorElement: <div>404</div>,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignUpPage /> },
          { path: "/forgot-password", element: <ForgotPasswordPage /> },
          { path: "/dashboard", element: <Dashboard /> },
        ],
      },
    ],
  },
];

export default routes;

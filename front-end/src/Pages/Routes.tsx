import { RouteObject } from "react-router-dom";
import Navbar from "./Navigation/Navbar";
import HomePage from "./Home/HomePage";

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
          { path: "/test", element: "What" },
        ],
      },
    ],
  },
];

export default routes;

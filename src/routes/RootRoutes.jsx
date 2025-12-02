import { lazy, useContext } from "react";
import { useRoutes } from "react-router-dom";
import App from "../App";
import Posts from "../features/posts/Posts";
import RequireAuth from "../components/RequireAuth";
import { AuthContext } from "../context/AuthProvider";

const Register = lazy(() => import("../features/auth/Register"));
const Login = lazy(() => import("../features/auth/Login"));

export default function RootRoutes() {
  const { user } = useContext(AuthContext);

  const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          element: <RequireAuth user={user} />,
          children: [
            {
              index: true,
              element: <Posts />,
            },
          ],
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}

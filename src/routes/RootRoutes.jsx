import { lazy, useContext } from "react";
import { useRoutes } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import App from "../App";
import Posts from "../features/posts/Posts";
import RequireAuth from "../components/RequireAuth";

const Register = lazy(() => import("../features/auth/Register"));
const Login = lazy(() => import("../features/auth/Login"));
const User = lazy(() => import("../features/user/User"));
const NewPost = lazy(() => import("../features/newPost/NewPost"));
const Post = lazy(() => import("../features/post/Post"));

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
        {
          path: "/me",
          element: <User />,
        },
        {
          path: "/new",
          element: <NewPost />,
        },
        {
          path: ":postId",
          element: <Post />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}

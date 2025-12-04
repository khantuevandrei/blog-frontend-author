import { lazy, useContext } from "react";
import { useRoutes } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import App from "../App";
import Posts from "../features/Posts/Posts";
import RequireAuth from "../components/RequireAuth";

const ErrorPage = lazy(() => import("../features/ErrorPage/ErrorPage"));
const Register = lazy(() => import("../features/auth/Register"));
const Login = lazy(() => import("../features/auth/Login"));
const UpdateUser = lazy(() => import("../features/UpdateUser/UpdateUser"));
const NewPost = lazy(() => import("../features/NewPost/NewPost"));
const Post = lazy(() => import("../features/Post/Post"));
const EditPost = lazy(() => import("../features/editPost/EditPost"));

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
            {
              path: "me",
              element: <UpdateUser />,
            },
            {
              path: "new",
              element: <NewPost />,
            },
            {
              path: ":postId",
              element: <Post />,
            },
            {
              path: ":postId/edit",
              element: <EditPost />,
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
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}

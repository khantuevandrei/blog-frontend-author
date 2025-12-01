import { Suspense, lazy } from "react";
import App from "../App";
import Posts from "../features/posts/Posts";

const Register = lazy(() => import("../features/auth/Register"));

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Posts />,
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;

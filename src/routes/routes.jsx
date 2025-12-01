import App from "../App";
import Posts from "../components/Posts";
import ErrorPage from "../components/ErrorPage";
import Register from "../components/Register";
import Login from "../components/Login";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
];

export default routes;

import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },

  //   {
  //     path: "/login",
  //     element: <LogIn></LogIn>,
  //   },
  //   {
  //     path: "/register",
  //     element: <Register></Register>,
  //   },
]);

export default router;

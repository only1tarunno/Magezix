import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Error404 from "../pages/Error404.jsx/Error404";
import AllArticle from "../pages/AllArticle/AllArticle";
import AddArticle from "../pages/AddArticle/AddArticle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addArticles",
        element: <AddArticle></AddArticle>,
      },
      {
        path: "/allArticles",
        element: <AllArticle></AllArticle>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
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

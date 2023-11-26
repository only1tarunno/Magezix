import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Error404 from "../pages/Error404.jsx/Error404";
import AllArticle from "../pages/AllArticle/AllArticle";
import AddArticle from "../pages/AddArticle/AddArticle";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import PvtRoute from "./PvtRoute";
import Subscription from "../pages/Subscription/Subscription";
import Payment from "../pages/Payment/Payment";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import MyProfile from "../pages/MyProfile/MyProfile";
import Updateprofile from "../pages/MyProfile/Updateprofile";
import MyArticles from "../pages/MyArticles/MyArticles";
import UpdateArtice from "../pages/UpdateArtice/UpdateArtice";
import DashboardLayout from "../layout/DashboardLayout";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import EntireArticle from "../pages/Dashboard/EntireArticle/EntireArticle";

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
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/updateArticle/:id",
        element: (
          <PvtRoute>
            <UpdateArtice></UpdateArtice>
          </PvtRoute>
        ),
      },
      {
        path: "/allArticles",
        element: <AllArticle></AllArticle>,
      },
      {
        path: "/myProfile",
        element: (
          <PvtRoute>
            <MyProfile></MyProfile>
          </PvtRoute>
        ),
      },
      {
        path: "/updateProfile",
        element: (
          <PvtRoute>
            <Updateprofile></Updateprofile>
          </PvtRoute>
        ),
      },
      {
        path: "/myArticles",
        element: (
          <PvtRoute>
            <MyArticles></MyArticles>
          </PvtRoute>
        ),
      },
      {
        path: "/addArticle",
        element: (
          <PvtRoute>
            <AddArticle></AddArticle>
          </PvtRoute>
        ),
      },
      {
        path: "/allArticles/:id",
        element: (
          <PvtRoute>
            <ArticleDetails></ArticleDetails>
          </PvtRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PvtRoute>
            <Subscription></Subscription>
          </PvtRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PvtRoute>
            <Payment></Payment>
          </PvtRoute>
        ),
      },
      {
        path: "/premiumArticles",
        element: (
          <PvtRoute>
            <PremiumArticles></PremiumArticles>
          </PvtRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout></DashboardLayout>
      </AdminRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "addPublisher",
        element: <AddPublisher></AddPublisher>,
      },
      {
        path: "allArticles",
        element: <EntireArticle></EntireArticle>,
      },
      {
        path: "allUsers",
        element: <AllUser></AllUser>,
      },
    ],
  },
]);

export default router;

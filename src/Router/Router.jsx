import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Courses from "../Page/Courses/Courses";
import Admin_Dashboard from "../Admin_Dashboard/Admin_Dashboard";
import General_Setting from "../Admin_Dashboard/General_Setting/General_Setting";
import User_List from "../Admin_Dashboard/User_List/User_List";
import User_Role from "../Admin_Dashboard/User_Role/User_Role";
import Cart from "../Page/Cart/Cart";
import OrderDetails from "../Page/OrderDetails/OrderDetails";
import Checkout from "../Page/Checkout/Checkout";
import Search from "../Page/Search/Search";
import { AuthRoutes } from "../Page/Auth/Auth.route";
import SearchPurchaseFormData from "../Page/Checkout/SearchPurchaseFormData";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // auth routes
      ...AuthRoutes,
      {
        path: "/",
        element: <Courses />,
      },

      {
        path: "/course",
        element: <Courses />,
      },

      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/cart/checkout",
        element: <Checkout />,
      },

      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/course/search-purchase-data",
        element: <SearchPurchaseFormData />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/order-details",
        element: <OrderDetails />,
      },
      
    ],
  },
  {
    path: "admin-dashboard",
    element: <Admin_Dashboard />,
    children: [
      {
        path: "general-setting",
        element: <General_Setting />,
      },
      {
        path: "user-list",
        element: <User_List />,
      },
      {
        path: "user-role",
        element: <User_Role></User_Role>,
      },
    ],
  },
]);

export default Router;

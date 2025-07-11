import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import UserProfile from "../Pages/User/UserProfile";
import AddProduct from "../Pages/User/AddProduct";
import MyProducts from "../Pages/User/MyProducts";
import Products from "../Pages/products/Products";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRoute from "../Routs/PrivateRoute";
import DashboardRedirect from "../Context/DashboardRedirect";
import ReviewProducts from "../Pages/Moderator/ReviewProducts";
import ReportProducts from "../Pages/Moderator/ReportProducts";
import Status from "../Pages/Admin/Status";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Dashboard Layout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
      index: true,
      element: <DashboardRedirect />,
    },
      // 👤 User Routes
      {
        path: "/dashboard/profile",
        Component: UserProfile,
      },
      {
        path: "/dashboard/add-product",
        Component: AddProduct,
      },
      {
        path: "/dashboard/my-products",
        Component: MyProducts,
      },

      // 🛡️ Moderator Routes
      {
        path: "/dashboard/review-products",
        element: (
          
            <ReviewProducts />
          
        ),
      },
      {
        path: "/dashboard/report-products",
        element: (
      
            <ReportProducts />
          
        ),
      },
      {
        path: "/dashboard/report-products",
        element: (
      
            <ReportProducts />
          
        ),
      },

      // 👑 Admin Routes
      {
        path: "/dashboard/status",
        element: (
          <Status></Status>
        ),
      },
      // {
      //   path: "manage-users",
      //   element: (
      //     <RoleBasedRoute role="admin">
      //       <ManageUsers />
      //     </RoleBasedRoute>
      //   ),
      // },
      // {
      //   path: "manage-coupons",
      //   element: (
      //     <RoleBasedRoute role="admin">
      //       <ManageCoupons />
      //     </RoleBasedRoute>
      //   ),
      // },
    ],
  },
]);

export default router;

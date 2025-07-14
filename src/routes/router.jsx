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
import ManageUsers from "../Pages/Admin/ManageUsers";
import ManageCoupons from "../Pages/Admin/ManageCoupons";
import ErrorPage from "../Components/Error/Errorpage";
import RoleBasedRoute from "../Routs/RoleBasedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        element: (
          <RoleBasedRoute allowedRoles={["user"]}>
            <UserProfile />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <RoleBasedRoute allowedRoles={["user"]}>
            <AddProduct />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/dashboard/my-products",
        element: (
          <RoleBasedRoute allowedRoles={["user"]}>
            <MyProducts />
          </RoleBasedRoute>
        ),
      },

      // 🛡️ Moderator Routes
      {
        path: "/dashboard/review-products",
        element: (
          <RoleBasedRoute allowedRoles={["moderator"]}>
            <ReviewProducts />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/dashboard/report-products",
        element: (
          <RoleBasedRoute allowedRoles={["moderator"]}>
            <ReportProducts />,
          </RoleBasedRoute>
        ),
      },
      {
        path: "/dashboard/report-products",
        element: (
          <RoleBasedRoute allowedRoles={["moderator"]}>
            <ReportProducts />
          </RoleBasedRoute>
        ),
      },

      // 👑 Admin Routes
      {
        path: "/dashboard/status",
        element: (
          <RoleBasedRoute allowedRoles={["admin"]}>
            <Status></Status>
          </RoleBasedRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <RoleBasedRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/dashboard/manage-coupons",
        element: (
          <RoleBasedRoute allowedRoles={["admin"]}>
            <ManageCoupons />
          </RoleBasedRoute>
        ),
      },
    ],
  },
]);

export default router;

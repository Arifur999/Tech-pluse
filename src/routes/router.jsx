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
        Component: ProductDetails,
      },
    ],
  },

  // Dashboard Layout
  {
    path: "/dashboard",
    element: (
      // <PrivateRoute>
      <DashboardLayout />
      // </PrivateRoute>
    ),
    children: [
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
      // {
      //   path: "review-queue",
      //   element: (
      //     <RoleBasedRoute role="moderator">
      //       <ReviewQueue />
      //     </RoleBasedRoute>
      //   ),
      // },
      // {
      //   path: "reported-contents",
      //   element: (
      //     <RoleBasedRoute role="moderator">
      //       <ReportedContent />
      //     </RoleBasedRoute>
      //   ),
      // },

      // 👑 Admin Routes
      // {
      //   path: "statistics",
      //   element: (
      //     <RoleBasedRoute role="admin">
      //       <Statistics />
      //     </RoleBasedRoute>
      //   ),
      // },
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

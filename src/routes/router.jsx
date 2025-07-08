import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <NotFound />,
    children: [
      { 
        path: "/", 
        Component:Home,
    },
      { 
        path: "/login", 
        Component:Login,
    },
      { 
        path: "/register", 
        Component:Register,
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
      // { path: "my-profile", element: <MyProfile /> },
      // { path: "add-product", element: <AddProduct /> },
      // { path: "my-products", element: <MyProducts /> },

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

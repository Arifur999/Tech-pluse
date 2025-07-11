// import React from "react";

// const DashboardRedirect = ({ children }) => {
  
//   return <>{children}</>; 
// };

// export default DashboardRedirect;
import React, { useContext } from "react";
import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "./AuthContext";

const DashboardRedirect = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userRole = "user", isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role || "user";
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (userRole === "admin") {
    return <Navigate to="/dashboard/status" replace />;
  } else if (userRole === "moderator") {
    return <Navigate to="/dashboard/review-products" replace />;
  } else {
    return <Navigate to="/dashboard/profile" replace />;
  }
};

export default DashboardRedirect;

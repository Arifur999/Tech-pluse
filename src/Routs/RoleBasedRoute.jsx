import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading/Loading";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { user, loading, logout } = useContext(AuthContext);
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const { data: role = "", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role || "";
    },
  });

  if (isLoading) return <Loading />;

  if (!allowedRoles.includes(role)) {
    // If role mismatch, logout and redirect
    logout()
      .then(() => {
        Swal.fire({
          icon: "warning",
          title: "Unauthorized Access",
          text: "You were logged out due to unauthorized access.",
        });
      })
      .catch((err) => console.error(err));

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleBasedRoute;

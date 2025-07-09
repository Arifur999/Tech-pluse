import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    
    return <Loading />;
  }

  if (!user) {
    
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  
  return children;
};

export default PrivateRoute;

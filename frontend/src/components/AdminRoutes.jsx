import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  return <>{user && user.isAdmin ? <Outlet /> : <Navigate to="/" />}</>;
};

export default AdminRoutes;

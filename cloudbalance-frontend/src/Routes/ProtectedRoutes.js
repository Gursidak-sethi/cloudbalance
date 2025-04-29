import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ProtectedRoutes = ({ allowedRoles }) => {
  debugger;
  const { currentUser } = useSelector((state) => state.auth);
  console.log("Current user in Protected Routes: ", currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default ProtectedRoutes;

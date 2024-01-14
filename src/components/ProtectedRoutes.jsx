import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, user }) {
  console.log(user);
  if (user) {
    return children;
  } else {
    return <Navigate to="login" />;
  }
}

export default ProtectedRoutes;

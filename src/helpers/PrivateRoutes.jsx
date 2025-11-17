import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet  /> : <Navigate to="/" />;

  // expired token after 30 mins
   
   const tokenExpireTime = localStorage.getItem(3600000);

   return token && tokenExpireTime > Date.now() ? (
     <Outlet />
   ) : (
     <Navigate to="/" />
   );
};

export default PrivateRoute;

import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import HomeLayout from "./Layout/HomeLayout";
import Dashboard from "./Pages/Dashboard";
import ManagePlans from "./Pages/ManagePlans";
import Users from "./Pages/Users";
import Login from "./Pages/Login";
import PrivateRoute from "./helpers/PrivateRoutes";
import ChangePassword from "./Pages/ChangePassword";
import Numerology from "./Pages/Numerology";
import Notication from "./Pages/Notication";

function App() {
  return (
    <>
      <Routes>

        {/* Public Route */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<HomeLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="manage-plans" element={<ManagePlans />} />
            <Route path="users" element={<Users />} />
            <Route path="login" element={<Login />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="/dashboard/numerology" element={<Numerology />} />
            <Route path="/dashboard/notification" element={<Notication />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

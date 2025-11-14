import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeLayout from "./Layout/HomeLayout";
import Dashboard from "./Pages/Dashboard";
import ManagePlans from "./Pages/ManagePlans";
import Users from "./Pages/Users";
import Login from "./Pages/Login";
import PrivateRoute from "./helpers/PrivateRoutes";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<HomeLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-plans" element={<ManagePlans />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

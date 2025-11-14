import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeLayout from "./Layout/HomeLayout";
import Dashboard from "./Pages/Dashboard";
import ManagePlans from "./Pages/ManagePlans";
import Users from "./Pages/Users";
import Login from "./Pages/Login";

function App() {
  return (
    <Routes>
       <Route path="login" element={<Login />} />
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="manage-plans" element={<ManagePlans />} />
        <Route path="users" element={<Users />} />
      </Route> 
    </Routes>
  );
}

export default App;

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home, User, Settings, LogOut } from "lucide-react";
import profileImge from "../assets/members.png";

const HomeLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Aura</h2>
          <button className="md:hidden text-white" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1">
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-white hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>

          {/* Manage Plans */}
          <NavLink
            to="/dashboard/manage-plans"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-white hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <User size={20} />
            <span>Manage Plans</span>
          </NavLink>

          {/* Users */}
          <NavLink
            to="/dashboard/users"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-white hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <Settings size={20} />
            <span>Users</span>
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-0 w-full px-6">
          <NavLink
            to="/"
            onClick={() => {
              localStorage.removeItem("token");
              setIsOpen(false);
            }}
            className="flex items-center gap-3 px-6 py-3 text-white hover:bg-gray-700 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-gray-900 shadow p-4">
          <button className="md:hidden text-white" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>

          <h1 className="text-xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg">
            Aura Admin Panel
          </h1>

          <img className="w-10 rounded-full" src={profileImge} alt="Profile" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;

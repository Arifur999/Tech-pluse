import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import computer from "/computer.png";
import {
  FaHome,
  FaBoxOpen,
  FaPhoneAlt,
  FaTachometerAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={computer} className="h-8" alt="Logo" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            TECH<span className="text-blue-600">PULSE</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`flex items-center gap-1 ${
              isActive("/") ? "text-blue-600 font-semibold" : "text-gray-700 dark:text-white"
            } hover:text-blue-600 transition`}
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/products"
            className={`flex items-center gap-1 ${
              isActive("/products") ? "text-blue-600 font-semibold" : "text-gray-700 dark:text-white"
            } hover:text-blue-600 transition`}
          >
            <FaBoxOpen /> Products
          </Link>
          <Link
            to="/contact"
            className={`flex items-center gap-1 ${
              isActive("/contact") ? "text-blue-600 font-semibold" : "text-gray-700 dark:text-white"
            } hover:text-blue-600 transition`}
          >
            <FaPhoneAlt /> Contact
          </Link>
        </div>

        {/* Auth/Profile (Desktop) */}
        <div className="hidden md:block">
          {user ? (
            <div className="relative">
              <img
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full border cursor-pointer"
                src={user?.photoURL || "/default-user.png"}
                alt="Profile"
              />

              {profileOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{user.email}</p>
                  </div>
                  <ul className="text-sm">
                    <li>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        <FaTachometerAlt /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="flex items-center text-red-500 gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 dark:text-white hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-white bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 dark:text-white text-xl"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Drawer Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md md:hidden p-4 z-40">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={toggleMenu}
                className={`${
                  isActive("/") ? "text-blue-600 font-semibold" : "text-gray-700 dark:text-white"
                }`}
              >
                <FaHome className="inline" /> Home
              </Link>
              <Link
                to="/products"
                onClick={toggleMenu}
                className={`${
                  isActive("/products") ? "text-blue-600 font-semibold" : "text-gray-700 dark:text-white"
                }`}
              >
                <FaBoxOpen className="inline" /> Products
              </Link>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className={`${
                  isActive("/contact") ? "text-blue-600 font-semibold" : "text-gray-700 dark:text-white"
                }`}
              >
                <FaPhoneAlt className="inline" /> Contact
              </Link>

              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="text-gray-700 dark:text-white"
                  >
                    <FaSignInAlt className="inline" /> Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMenu}
                    className="text-gray-700 dark:text-white"
                  >
                    <FaUserCircle className="inline" /> Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    onClick={toggleMenu}
                    className="text-gray-700 dark:text-white"
                  >
                    <FaTachometerAlt className="inline" /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="text-gray-700 dark:text-white flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

import React, { useContext, useState } from "react";
import { Link } from "react-router";
import computer from "/computer.png";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-11/12 mx-auto flex items-center justify-between  py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={computer} className="h-8" alt="Logo" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            TECH<span className="text-blue-600">PULSE</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition"
          >
            Products
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 dark:text-white hover:text-blue-600 transition"
          >
            Contact
          </Link>
        </div>

        {/* Profile */}
        <div className="relative">
          <img
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full border cursor-pointer"
            src={user?.photoURL || "/default-user.png"}
            alt="Profile"
          />

          {menuOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                {user ? (
                  <>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {user.email}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Not Logged In
                  </p>
                )}
              </div>

              <ul className="text-sm text-gray-700 dark:text-gray-200">
                {user && (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {!user && (
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

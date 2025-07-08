import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import computer from "/computer.png";
import {
  FaUser,
  FaPlusCircle,
  FaShoppingBag,
  FaEye,
  FaFlag,
  FaChartBar,
  FaUsers,
  FaTicketAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const DashboardLayout = () => {
  const { user, userRole } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sticky Top Navbar (visible on mobile) */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow z-50 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src={computer} className="h-6" alt="Logo" />
          <span className="text-lg font-bold text-gray-800 dark:text-white">
            TECH<span className="text-blue-600">PULSE</span>
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 min-h-screen bg-gray-50 dark:bg-gray-800 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:static sm:block`}
      >
        <div className="px-3 py-4 mt-14 sm:mt-0">
          <Link to="/" className="hidden sm:flex items-center ps-2.5 mb-5">
            <img src={computer} className="h-6 me-3 sm:h-7" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              TECH<span className="text-blue-600">PULSE</span>
            </span>
          </Link>

          <ul className="space-y-2 font-medium">
            {/* User Routes */}
            <li>
              <Link
                to="/dashboard/profile"
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  isActive("/dashboard/profile")
                    ? "bg-blue-600 text-white"
                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FaUser className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ms-3">My Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-product"
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  isActive("/dashboard/add-product")
                    ? "bg-blue-600 text-white"
                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FaPlusCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ms-3">Add Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-products"
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  isActive("/dashboard/my-products")
                    ? "bg-blue-600 text-white"
                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <FaShoppingBag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ms-3">My Products</span>
              </Link>
            </li>

            {/* Moderator Routes */}
            {userRole === "moderator" && (
              <>
                <li>
                  <Link
                    to="/dashboard/review-products"
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      isActive("/dashboard/review-products")
                        ? "bg-blue-600 text-white"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FaEye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="ms-3">Product Review</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/report-products"
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      isActive("/dashboard/report-products")
                        ? "bg-blue-600 text-white"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FaFlag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="ms-3">Report Products</span>
                  </Link>
                </li>
              </>
            )}

            {/* Admin Routes */}
            {userRole === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/status"
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      isActive("/dashboard/status")
                        ? "bg-blue-600 text-white"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FaChartBar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="ms-3">Status</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-users"
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      isActive("/dashboard/manage-users")
                        ? "bg-blue-600 text-white"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FaUsers className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="ms-3">Manage Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-coupons"
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      isActive("/dashboard/manage-coupons")
                        ? "bg-blue-600 text-white"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FaTicketAlt className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="ms-3">Manage Coupons</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 sm:pt-4 ">
        <div className=" rounded-lg border-gray-300 dark:border-gray-700 ">
          
          {/* Dashboard content goes here */}
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

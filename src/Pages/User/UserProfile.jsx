import React, { useContext, useState } from "react";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  // Default subscription status
  const [status, setStatus] = useState("Unsubscribed");

  // Placeholder for button click (future use)
  const handleSubscribe = () => {
    setStatus("Subscribed");
    // You can also add backend call here
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-gray-100 dark:bg-gray-900">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="w-full mx-auto max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 text-center">
        {/* Profile Image */}
        {user?.photoURL ? (
          <img
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
            src={user.photoURL}
            alt="User"
          />
        ) : (
          <FaUserCircle className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-500" />
        )}

        {/* Name */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
          {user?.displayName || "Unknown User"}
        </h2>

        {/* Email */}
        <p className="text-gray-600 dark:text-gray-300 flex justify-center items-center gap-2 mt-1">
          <FaEnvelope />
          {user?.email || "Not Provided"}
        </p>

        {/* Subscription Status */}
        <div className="mt-4">
          <span className="inline-block px-4 py-1 text-sm rounded-full font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            Status:{" "}
            <span
              className={`font-semibold ${
                status === "Subscribed"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {status}
            </span>
          </span>
        </div>

        {/* Add Subscription Button */}
        <button
          onClick={handleSubscribe}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300"
        >
          Add Subscription
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
